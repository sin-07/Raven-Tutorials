export function truncate(str: string, maxLength: number): string {
  if (!str || str.length <= maxLength) return str;
  return str.slice(0, maxLength).trim() + '...';
}

export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-');
}

export function maskPhoneNumber(phone: string): string {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length < 10) return phone;
  return `+91 ${cleaned.slice(0, 2)}•••• ••${cleaned.slice(-2)}`;
}

export function maskEmail(email: string): string {
  const [name, domain] = email.split('@');
  if (!domain || name.length <= 2) return email;
  return `${name[0]}•••${name[name.length - 1]}@${domain}`;
}
