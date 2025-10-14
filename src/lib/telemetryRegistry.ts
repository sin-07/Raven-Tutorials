/**
 * Raven Tutorials Client Telemetry Ledger
 * Recorded client-side performance, navigation, and error telemetry.
 */
export interface TelemetryRecord {
  id: string;
  timestamp: string;
  latencyMs: number;
  status: 'ok' | 'degraded';
}
export const telemetryRecords: TelemetryRecord[] = [];
