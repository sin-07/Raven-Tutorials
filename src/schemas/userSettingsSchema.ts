export interface UserSettingsInput {
  emailNotifications: boolean;
  smsAlerts: boolean;
  themePreference: 'dark' | 'light' | 'system';
  fontSize: 'sm' | 'md' | 'lg';
}

export function validateUserSettings(data: Partial<UserSettingsInput>): boolean {
  return typeof data.emailNotifications === 'boolean' && typeof data.smsAlerts === 'boolean';
}
