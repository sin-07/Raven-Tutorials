export interface AdmissionFormData {
  studentName: string;
  guardianName: string;
  email: string;
  phone: string;
  standard: string;
  stream?: string;
  schoolName?: string;
}

export function validateAdmissionForm(data: Partial<AdmissionFormData>): Record<string, string> {
  const errors: Record<string, string> = {};
  if (!data.studentName?.trim()) errors.studentName = 'Student name is required';
  if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.email = 'Valid email is required';
  if (!data.phone || data.phone.length < 10) errors.phone = '10-digit phone number is required';
  if (!data.standard) errors.standard = 'Please select a standard';
  return errors;
}
