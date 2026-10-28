import type { CalculationMode } from '@/types';

export const MODE_LABELS: Record<CalculationMode, string> = {
  operation: 'Individual Crystal Operation',
  point_group: 'Individual Point Group',
  all_groups_table: 'All Point Groups (Group → Components)',
  all_groups_inverse: 'All Point Groups (Component → Groups)',
  custom_group: 'Custom Group Selection',
};

export const MODE_VALUES: CalculationMode[] = [
  'operation',
  'point_group',
  'all_groups_table',
  'all_groups_inverse',
  'custom_group',
];
