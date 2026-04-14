export interface ScholarshipApplicationInput {
  applicantName: string;
  email: string;
  phoneNumber: string;
  previousMarksPercent: number;
  annualFamilyIncome: number;
  category: string;
}

export function validateScholarship(data: Partial<ScholarshipApplicationInput>): { isValid: boolean; errors: Record<string, string> } {
  const errors: Record<string, string> = {};
  if (!data.applicantName) errors.applicantName = 'Name is required';
  if (data.previousMarksPercent === undefined || data.previousMarksPercent < 40 || data.previousMarksPercent > 100) {
    errors.previousMarksPercent = 'Marks must be between 40% and 100%';
  }
  return { isValid: Object.keys(errors).length === 0, errors };
}
