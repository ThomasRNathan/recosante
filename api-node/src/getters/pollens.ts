import { type CustomError } from '~/types/error';
import { z } from 'zod';
import prisma from '~/prisma';
import dayjs from 'dayjs';
import type { Indicator } from '~/types/api/indicator';
import {
  DataAvailabilityEnum,
  IndicatorsSlugEnum,
  type Municipality,
} from '@prisma/client';
import { indicatorsObject } from './indicators_list';
import utc from 'dayjs/plugin/utc';
import { capture } from '~/third-parties/sentry';
import { formatPollensAPIValues, getPollensStatus } from '~/utils/pollens';
dayjs.extend(utc);

async function getPollensFromMunicipalityAndDate({
  municipality_insee_code,
  date_UTC_ISO,
}: {
  municipality_insee_code: Municipality['COM'];
  date_UTC_ISO: string;
}) {
  try {
    z.object({
      municipality_insee_code: z.string().length(5),
      date_UTC_ISO: z.string().length(24),
      // matomo_id: z.string().length(16), // at least for auth
    }).parse({
      municipality_insee_code,
      date_UTC_ISO,
    });
  } catch (zodError) {
    const error = new Error(
      `Invalid request in getPollensFromMunicipalityAndDate ${
        zodError instanceof Error ? zodError.message : 'Unknown error'
      }`,
    ) as CustomError;
    error.status = 400;
    throw error;
  }

  const pollensJ0 = await prisma.pollenAllergyRisk.findFirst({
    where: {
      municipality_insee_code,
      data_availability: DataAvailabilityEnum.AVAILABLE,
      validity_start: {
        gte: dayjs(date_UTC_ISO).utc().startOf('day').toISOString(),
      },
    },
    orderBy: [{ diffusion_date: 'desc' }, { validity_start: 'asc' }],
  });

  if (!pollensJ0) {
    capture('No pollens found', {
      extra: {
        municipality_insee_code,
        date_UTC_ISO,
      },
    });
    return null;
  }

  const pollensIndicator: Indicator = {
    slug: IndicatorsSlugEnum.pollen_allergy,
    name: indicatorsObject[IndicatorsSlugEnum.pollen_allergy].name,
    short_name: indicatorsObject[IndicatorsSlugEnum.pollen_allergy].short_name,
    municipality_insee_code: pollensJ0.municipality_insee_code,
    about_title: 'à propos du pollen',
    about_description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut auctor, nisl eget ultricies aliquam, nunc nisl aliquet nunc, nec aliquam nisl nunc nec nisl.',
  };

  const formattedPollensJ0 = {
    id: pollensJ0.id,
    summary: {
      value: pollensJ0.total ?? 0,
      status: getPollensStatus(pollensJ0.total ?? 0),
      recommendations: [
        "La recommandation tirée au sort pile pour aujourd'hui, pour ces conditions d'indice, de saison, de date, de lieu",
      ],
    },
    validity_start: pollensJ0.validity_start.toISOString(),
    validity_end: pollensJ0.validity_end.toISOString(),
    diffusion_date: pollensJ0.diffusion_date.toISOString(),
    created_at: pollensJ0.created_at.toISOString(),
    updated_at: pollensJ0.updated_at.toISOString(),
    values: formatPollensAPIValues(pollensJ0),
  };

  pollensIndicator.j0 = formattedPollensJ0;

  if (
    dayjs()
      .utc()
      .add(1, 'day')
      .endOf('day')
      .isAfter(dayjs(pollensJ0.validity_end).utc())
  ) {
    const pollensJ1 = await prisma.pollenAllergyRisk.findFirst({
      where: {
        municipality_insee_code,
        data_availability: DataAvailabilityEnum.AVAILABLE,
        validity_start: {
          gte: dayjs(date_UTC_ISO)
            .utc()
            .add(1, 'day')
            .startOf('day')
            .toISOString(),
        },
      },
      orderBy: [{ diffusion_date: 'desc' }, { validity_start: 'asc' }],
    });
    if (pollensJ1) {
      pollensIndicator.j1 = {
        id: pollensJ1.id,
        summary: {
          value: pollensJ1.total ?? 0,
          status: getPollensStatus(pollensJ1.total ?? 0),
          recommendations: [
            "La recommandation tirée au sort pile pour aujourd'hui, pour ces conditions d'indice, de saison, de date, de lieu",
          ],
        },
        validity_start: pollensJ1.validity_start.toISOString(),
        validity_end: pollensJ1.validity_end.toISOString(),
        diffusion_date: pollensJ1.diffusion_date.toISOString(),
        created_at: pollensJ1.created_at.toISOString(),
        updated_at: pollensJ1.updated_at.toISOString(),
        values: formatPollensAPIValues(pollensJ1),
      };
    }
  } else {
    pollensIndicator.j1 = formattedPollensJ0;
  }

  return pollensIndicator;
}

export { getPollensFromMunicipalityAndDate };