export function generateToken(length = 24): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let token = '';
  for (let i = 0; i < length; i++) {
    token += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return token;
}

export function maskEmail(email: string): string {
  const [user, domain] = email.split('@');
  if (!domain || user.length <= 2) return email;
  const maskedUser = user[0] + '*'.repeat(user.length - 2) + user[user.length - 1];
  return `${maskedUser}@${domain}`;
}

export function maskPhoneNumber(phone: string): string {
  if (phone.length < 6) return phone;
  return phone.slice(0, 2) + '*'.repeat(phone.length - 4) + phone.slice(-2);
}
