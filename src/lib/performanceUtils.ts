export function measureTime<T>(label: string, fn: () => T): T {
  const start = performance.now();
  const result = fn();
  const duration = performance.now() - start;
  if (process.env.NODE_ENV === 'development') {
    console.debug(`[Perf] ${label}: ${duration.toFixed(2)}ms`);
  }
  return result;
}
