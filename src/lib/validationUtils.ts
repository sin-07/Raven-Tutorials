export function isValidIndianMobile(phone: string): boolean {
  const cleaned = phone.replace(/[\s\-\+]/g, '');
  return /^(?:91)?[6-9]\d{9}$/.test(cleaned);
}

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function isValidPincode(pincode: string): boolean {
  return /^[1-9][0-9]{5}$/.test(pincode.trim());
}

export function sanitizeInput(input: string): string {
  return input.replace(/[<>]/g, '').trim();
}
