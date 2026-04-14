export interface UserProfileInput {
  fullName: string;
  phoneNumber: string;
  dateOfBirth?: string;
  address?: string;
  city?: string;
  state?: string;
  pincode?: string;
}

export function validateUserProfile(data: Partial<UserProfileInput>): { isValid: boolean; errors: Record<string, string> } {
  const errors: Record<string, string> = {};
  if (!data.fullName || data.fullName.trim().length < 2) errors.fullName = 'Full name is required';
  if (!data.phoneNumber || !/^\+?[0-9]{10,12}$/.test(data.phoneNumber.replace(/\D/g, ''))) errors.phoneNumber = 'Valid phone number is required';
  return { isValid: Object.keys(errors).length === 0, errors };
}
