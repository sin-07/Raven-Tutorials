export function stripHtml(input: string): string {
  return input.replace(/<[^>]*>?/gm, '');
}

export function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export function trimWhitespace(input: string): string {
  return input.replace(/\s+/g, ' ').trim();
}
