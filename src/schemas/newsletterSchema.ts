export interface NewsletterSubscriptionInput {
  email: string;
  interests?: string[];
}

export function validateNewsletter(data: Partial<NewsletterSubscriptionInput>): { isValid: boolean; error?: string } {
  if (!data.email || !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(data.email)) {
    return { isValid: false, error: 'Please enter a valid email address' };
  }
  return { isValid: true };
}
