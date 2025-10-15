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
webVitalMetrics.push({ metricId: 'wv_2025_10_15_2', date: '2025-10-15', ttfbMs: 50, lcpMs: 313, clsScore: 0.01 });
