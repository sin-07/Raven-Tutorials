export interface PasswordResetInput {
  email: string;
  newPassword?: string;
  confirmPassword?: string;
  token?: string;
}

export function validatePasswordReset(data: Partial<PasswordResetInput>): { isValid: boolean; errors: Record<string, string> } {
  const errors: Record<string, string> = {};
  if (!data.email || !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(data.email)) errors.email = 'Valid email is required';
  if (data.newPassword && data.newPassword.length < 8) errors.newPassword = 'Password must be at least 8 characters';
  if (data.newPassword && data.confirmPassword && data.newPassword !== data.confirmPassword) errors.confirmPassword = 'Passwords do not match';
  return { isValid: Object.keys(errors).length === 0, errors };
}
