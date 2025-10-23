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
webVitalMetrics.push({ metricId: 'wv_2025_10_16_2', date: '2025-10-16', ttfbMs: 45, lcpMs: 307, clsScore: 0.01 });
webVitalMetrics.push({ metricId: 'wv_2025_10_17_2', date: '2025-10-17', ttfbMs: 40, lcpMs: 301, clsScore: 0.01 });
webVitalMetrics.push({ metricId: 'wv_2025_10_18_2', date: '2025-10-18', ttfbMs: 35, lcpMs: 295, clsScore: 0.01 });
webVitalMetrics.push({ metricId: 'wv_2025_10_19_2', date: '2025-10-19', ttfbMs: 55, lcpMs: 289, clsScore: 0.01 });
webVitalMetrics.push({ metricId: 'wv_2025_10_20_2', date: '2025-10-20', ttfbMs: 50, lcpMs: 283, clsScore: 0.01 });
webVitalMetrics.push({ metricId: 'wv_2025_10_21_2', date: '2025-10-21', ttfbMs: 45, lcpMs: 327, clsScore: 0.01 });
webVitalMetrics.push({ metricId: 'wv_2025_10_22_2', date: '2025-10-22', ttfbMs: 40, lcpMs: 321, clsScore: 0.01 });
webVitalMetrics.push({ metricId: 'wv_2025_10_23_2', date: '2025-10-23', ttfbMs: 35, lcpMs: 315, clsScore: 0.01 });
