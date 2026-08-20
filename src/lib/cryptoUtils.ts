export function generateSecureToken(length = 32): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let token = '';
  for (let i = 0; i < length; i++) {
    token += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return token;
}

export function maskAadhaar(aadhaar: string): string {
  const cleaned = aadhaar.replace(/\D/g, '');
  if (cleaned.length !== 12) return aadhaar;
  return `•••• •••• ${cleaned.slice(-4)}`;
}
