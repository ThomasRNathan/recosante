// @ts-ignore
import csv2json from 'csvjson-csv2json/csv2json.js';
import fs from 'fs';
import ftp, { FileInfo } from 'basic-ftp';
import dayjs from 'dayjs';
import { DataAvailabilityEnum } from '@prisma/client';
import prisma from '~/prisma';
import { DepartmentCode, MunicipalityJSON } from '~/types/municipality';

let now = Date.now();
function logStep(step: string) {
  console.log(Date.now() - now, step);
  now = Date.now();
}

const client = new ftp.Client();
client.ftp.verbose = false;

type IndiceUVRow = {
  insee: string | number;
  commune: string;
  date: string;
  UV_J0: number | '';
  UV_J1: number | '';
  UV_J2: number | '';
  UV_J3: number | '';
};

export async function getIndiceUVIndicator() {
  try {
    // Step1: Connect to FTP
    await client.access({
      host: process.env.FS_BUCKET_URL,
      user: process.env.FS_BUCKET_USERNAME,
      password: process.env.FS_BUCKET_PASSWORD,
      secure: true,
    });
    logStep('Connected to FTP');
    // Step2: Access to the file of the day
    // File name format: (YYYYMMDD.csv)
    const response = (await client.list()) as FileInfo[];
    const today_name = dayjs().format('YYYYMMDD');
    const file = response.find((file) => file.name.includes(today_name));

    if (!file) {
      throw new Error('No file found');
    }
    logStep('Found the file');
    // Step3: Download the file
    // create a file to stream archive data to.
    const folder = 'src/aggregators/_indice-uv-temp';
    const dir = `${folder}/${file.name}`;

    try {
      if (!fs.existsSync(folder)) {
        fs.mkdirSync(folder);
      }
    } catch (err) {
      console.error(err);
    }
    logStep('Created the folder');
    fs.writeFileSync(dir, '');
    await client.downloadTo(dir, file.name);
    logStep('Downloaded the file');
    const data = fs.readFileSync(dir, {
      encoding: 'utf8',
    });
    logStep('Closed the connection');
    client.close();

    // Step4: Format the file
    const rawFormatedJson = csv2json(data, {
      parseNumbers: true,
    }) as IndiceUVRow[];

    // TODO: validate data

    logStep('Formatted the file');
    // Step5: Check if the data exists in the database

    const date = rawFormatedJson[0].date;
    const diffusionDate = dayjs(date, 'DD/MM/YYYY').startOf('day').toDate();
    const validityEnd = dayjs(diffusionDate).endOf('day').toDate();

    logStep('Checked if the data exists in the database');
    const existingIndiceUVData = await prisma.indiceUv.count({
      where: {
        diffusion_date: diffusionDate,
      },
    });

    if (existingIndiceUVData > 0) {
      logStep(
        `Indice UV already fetched for diffusionDate ${date}: ${existingIndiceUVData} rows`,
      );
      fs.rmSync(folder, { recursive: true, force: true });
      logStep('Deleted the file');
      return;
    }
    // Step 6: grab the municipalities list
    logStep('formatting indice UV by department DONE');
    const municipalities: Array<MunicipalityJSON> = await new Promise(
      (resolve) => {
        fs.readFile('./data/municipalities.json', 'utf8', async (err, data) => {
          if (err) {
            console.error(err);
            return;
          }
          const municipalities = JSON.parse(data);
          resolve(municipalities);
        });
      },
    );
    // Step 7: format data by department to iterate quickly on municipalities
    const indiceUVByDepartment: Record<
      DepartmentCode,
      {
        UV_J0: number | null;
        UV_J1: number | null;
        UV_J2: number | null;
        UV_J3: number | null;
      }
    > = {};
    for (const row of rawFormatedJson) {
      // NOT SURE OF THIS ... !!
      if (!row.insee) {
        continue;
      }

      const formattedDepCode = row.insee.toString().slice(0, 2);
      // we need to format the department code to have a 2 digits string

      function formatUV(uv: number | '') {
        if (uv === '') {
          return null;
        }
        return uv;
      }
      indiceUVByDepartment[formattedDepCode] = {
        UV_J0: formatUV(row.UV_J0),
        UV_J1: formatUV(row.UV_J1),
        UV_J2: formatUV(row.UV_J2),
        UV_J3: formatUV(row.UV_J3),
      };
    }

    logStep('fetching municipalities DONE');
    // Step 8: loop on municipalities and create rows to insert
    const indiceUVByMunicipalityRows = [];
    for (const municipality of municipalities) {
      const indiceUvData = indiceUVByDepartment[municipality.DEP];

      // if no data for this department, we say that data is not available.
      if (!indiceUvData) {
        indiceUVByMunicipalityRows.push({
          diffusion_date: diffusionDate,
          validity_start: diffusionDate,
          validity_end: validityEnd,
          municipality_insee_code: municipality.COM,
          data_availability: DataAvailabilityEnum.NOT_AVAILABLE,
        });
        continue;
      }
      indiceUVByMunicipalityRows.push({
        diffusion_date: diffusionDate,
        validity_start: diffusionDate,
        validity_end: validityEnd,
        municipality_insee_code: municipality.COM,
        data_availability: DataAvailabilityEnum.AVAILABLE,
        uv_j0: indiceUvData.UV_J0,
        uv_j1: indiceUvData.UV_J1,
        uv_j2: indiceUvData.UV_J2,
        uv_j3: indiceUvData.UV_J3,
      });
    }
    // Step 9: insert data

    const result = await prisma.indiceUv.createMany({
      data: indiceUVByMunicipalityRows,
      skipDuplicates: true,
    });
    logStep(
      `DONE INSERTING INDICE UV : ${result.count} rows inserted upon ${municipalities.length} municipalities`,
    );
    // Step: Delete the file
    fs.rmSync(folder, { recursive: true, force: true });
    logStep('Deleted the file');
  } catch (err) {
    console.log(err);
  }
}