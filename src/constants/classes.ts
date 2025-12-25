// Standard class options used throughout the application
export const STANDARDS = [
  '9th standard',
  '10th standard',
  '11th standard',
  '12th standard'
] as const;

export const STANDARD_LABELS: Record<string, string> = {
  '9th standard': '9th Standard',
  '10th standard': '10th Standard',
  '11th standard': '11th Standard',
  '12th standard': '12th Standard'
};

export type StandardType = typeof STANDARDS[number];
