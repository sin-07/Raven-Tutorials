export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

export function validateContactForm(data: Partial<ContactFormData>): Record<string, string> {
  const errors: Record<string, string> = {};
  if (!data.name?.trim()) errors.name = 'Name is required';
  if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.email = 'Valid email is required';
  if (!data.message?.trim()) errors.message = 'Message cannot be empty';
  return errors;
}
