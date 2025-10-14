/**
 * Raven Tutorials Web Vitals & Production Benchmarks
 * Real-user monitoring benchmarks (TTFB, FCP, LCP, CLS, FID).
 */
export interface WebVitalMetric {
  metricId: string;
  date: string;
  ttfbMs: number;
  lcpMs: number;
  clsScore: number;
}
export const webVitalMetrics: WebVitalMetric[] = [];
