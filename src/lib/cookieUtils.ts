export const cookieHelper = {
  get(name: string): string | null {
    if (typeof document === 'undefined') return null;
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? decodeURIComponent(match[2]) : null;
  },
  set(name: string, value: string, days = 7): void {
    if (typeof document === 'undefined') return;
    const d = new Date();
    d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${encodeURIComponent(value)};path=/;expires=${d.toUTCString()};SameSite=Lax`;
  },
  remove(name: string): void {
    if (typeof document === 'undefined') return;
    document.cookie = `${name}=;path=/;expires=Thu, 01 Jan 1970 00:00:00 GMT`;
  }
};
