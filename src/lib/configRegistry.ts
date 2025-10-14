/**
 * Raven Tutorials Feature Flags & Rate Limit Configurations
 * Dynamic runtime parameters, rate limits, and feature toggles.
 */
export interface SystemConfig {
  key: string;
  rateLimitPerMin: number;
  enabled: boolean;
}
export const systemConfigs: SystemConfig[] = [];
