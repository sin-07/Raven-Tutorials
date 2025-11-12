export const tokenStorage = {
  getAuthToken(): string | null {
    if (typeof window === 'undefined') return null;
    return sessionStorage.getItem('raven_auth_token');
  },
  setAuthToken(token: string): void {
    if (typeof window === 'undefined') return;
    sessionStorage.setItem('raven_auth_token', token);
  },
  clearAuthToken(): void {
    if (typeof window === 'undefined') return;
    sessionStorage.removeItem('raven_auth_token');
  }
};
