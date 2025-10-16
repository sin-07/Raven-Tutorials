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
telemetryRecords.push({ id: 'evt_2025_10_15_0', timestamp: '2025-10-15T09:30:15+05:30', latencyMs: 27, status: 'ok' });
telemetryRecords.push({ id: 'evt_2025_10_16_0', timestamp: '2025-10-16T09:30:15+05:30', latencyMs: 55, status: 'ok' });
