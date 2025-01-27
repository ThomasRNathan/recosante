import {
  PollensRiskNumberEnum,
  PollensRiskStatusEnum,
} from '~/types/api/pollens';
import type { PollenAllergyRisk } from '@prisma/client';
import type { IndicatorByPeriodValues } from '~/types/api/indicator';

export function getPollensStatus(
  pollensRiskNumber: PollensRiskNumberEnum,
): PollensRiskStatusEnum {
  switch (pollensRiskNumber) {
    case PollensRiskNumberEnum.VERY_LOW:
      return PollensRiskStatusEnum.VERY_LOW;
    case PollensRiskNumberEnum.LOW:
      return PollensRiskStatusEnum.LOW;
    case PollensRiskNumberEnum.MODERATE:
      return PollensRiskStatusEnum.MODERATE;
    case PollensRiskNumberEnum.HIGH:
      return PollensRiskStatusEnum.HIGH;
    case PollensRiskNumberEnum.VERY_HIGH:
      return PollensRiskStatusEnum.VERY_HIGH;
    case PollensRiskNumberEnum.NO_RISK:
    default:
      return PollensRiskStatusEnum.NO_RISK;
  }
}

const treeKeys = [
  'cypres',
  'noisetier',
  'aulne',
  'peuplier',
  'saule',
  'frene',
  'charme',
  'bouleau',
  'platane',
  'chene',
  'olivier',
  'tilleul',
  'chataignier',
  'rumex',
  'graminees',
  'plantain',
  'urticacees',
  'armoises',
  'ambroisies',
];

export function formatPollensAPIValues(
  pollens: PollenAllergyRisk,
): IndicatorByPeriodValues {
  const values = treeKeys
    .map((treeKey) => {
      const value = (pollens as any)[treeKey];
      return {
        slug: treeKey,
        name: treeKey,
        value,
      };
    })
    .filter((pollen) => pollen.value > 0)
    .sort((a, b) => b.value - a.value);

  return values;
}
