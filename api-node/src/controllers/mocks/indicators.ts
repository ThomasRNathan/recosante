import type { Indicator } from '~/types/api/indicator';

export const indicatorsMock: Indicator[] = [
  {
    name: 'Eau de baignade',
    short_name: 'Eau de baignade',
    slug: 'bathing_water',
    municipality_insee_code: '12345',
    about_title: 'à propos de la qualité de l’eau de baignade',
    about_description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut auctor, nisl eget ultricies aliquam, nunc nisl aliquet nunc, nec aliquam nisl nunc nec nisl.',
    j0: {
      id: '1234',
      summary: {
        value: 3,
        status: 'Mauvais',
        recommendations: [
          "🚶‍♂️Lors de vos trajets à pied ou à vélo, préférez les chemins secondaires et les itinéraires moins fréquentés, ce qui vous permettra d'éviter les zones à fort trafic et de limiter votre exposition à la pollution atmosphérique.",
          "🏋️‍♂️ Limitez les activités physiques intenses en extérieur pendant les périodes de vigilance météo pour réduire l'exposition aux polluants atmosphériques et préserver votre santé.",
        ],
      },
      validity_start: '2020-01-01T00:00:00.000Z',
      validity_end: '2020-12-31T23:59:59.999Z',
      diffusion_date: '2020-01-01T00:00:00.000Z',
      created_at: '2020-01-01T00:00:00.000Z',
      updated_at: '2020-01-01T00:00:00.000Z',
    },
    j1: {
      id: '1234',
      summary: {
        value: 3,
        status: 'Mauvais',
        recommendations: ['blablabla'],
      },
      validity_start: '2020-01-01T00:00:00.000Z',
      validity_end: '2020-12-31T23:59:59.999Z',
      diffusion_date: '2020-01-01T00:00:00.000Z',
      created_at: '2020-01-01T00:00:00.000Z',
      updated_at: '2020-01-01T00:00:00.000Z',
    },
  },
  {
    name: 'Vigilance météo',
    short_name: 'Vigilance météo',
    slug: 'weather_alert',
    municipality_insee_code: '12345',
    about_description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut auctor, nisl eget ultricies aliquam, nunc nisl aliquet nunc, nec aliquam nisl nunc nec nisl.',
    about_title: "à propos de l'Alerte météo",
    j0: {
      id: '1234',
      summary: {
        value: 0,
        status: 'Nul',
        recommendations: [
          "🚶‍♂️Lors de vos trajets à pied ou à vélo, préférez les chemins secondaires et les itinéraires moins fréquentés, ce qui vous permettra d'éviter les zones à fort trafic et de limiter votre exposition à la pollution atmosphérique.",
          "🏋️‍♂️ Limitez les activités physiques intenses en extérieur pendant les périodes de vigilance météo pour réduire l'exposition aux polluants atmosphériques et préserver votre santé.",
        ],
      },
      validity_start: '2020-01-01T00:00:00.000Z',
      validity_end: '2020-12-31T23:59:59.999Z',
      diffusion_date: '2020-01-01T00:00:00.000Z',
      created_at: '2020-01-01T00:00:00.000Z',
      updated_at: '2020-01-01T00:00:00.000Z',
    },
    j1: {
      id: '1234',
      summary: {
        value: 3,
        status: 'Fort',
        recommendations: [
          "🚶‍♂️Lors de vos trajets à pied ou à vélo, préférez les chemins secondaires et les itinéraires moins fréquentés, ce qui vous permettra d'éviter les zones à fort trafic et de limiter votre exposition à la pollution atmosphérique.",
          "🏋️‍♂️ Limitez les activités physiques intenses en extérieur pendant les périodes de vigilance météo pour réduire l'exposition aux polluants atmosphériques et préserver votre santé.",
        ],
      },
      validity_start: '2020-01-01T00:00:00.000Z',
      validity_end: '2020-12-31T23:59:59.999Z',
      diffusion_date: '2020-01-01T00:00:00.000Z',
      created_at: '2020-01-01T00:00:00.000Z',
      updated_at: '2020-01-01T00:00:00.000Z',
    },
  },
];