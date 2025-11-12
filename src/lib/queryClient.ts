export class QueryCache {
  private cache = new Map<string, { data: unknown; timestamp: number }>();

  async query<T>(key: string, fetcher: () => Promise<T>, ttlMs = 30000): Promise<T> {
    const cached = this.cache.get(key);
    if (cached && Date.now() - cached.timestamp < ttlMs) {
      return cached.data as T;
    }
    const fresh = await fetcher();
    this.cache.set(key, { data: fresh, timestamp: Date.now() });
    return fresh;
  }

  invalidate(key: string): void {
    this.cache.delete(key);
  }
}

export const queryCache = new QueryCache();
