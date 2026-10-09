export interface LoginCredentials {
  email: string;
  password: string;
}

export function validateLogin(data: Partial<LoginCredentials>): Record<string, string> {
  const errors: Record<string, string> = {};
  if (!data.email?.trim()) errors.email = 'Email or Registration ID is required';
  if (!data.password || data.password.length < 6) errors.password = 'Password must be at least 6 characters';
  return errors;
}
