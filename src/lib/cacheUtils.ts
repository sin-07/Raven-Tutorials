export class SimpleCache<K, V> {
  private store = new Map<K, { val: V; exp: number }>();

  set(key: K, val: V, ttlMs = 60000): void {
    this.store.set(key, { val, exp: Date.now() + ttlMs });
  }

  get(key: K): V | null {
    const item = this.store.get(key);
    if (!item) return null;
    if (Date.now() > item.exp) {
      this.store.delete(key);
      return null;
    }
    return item.val;
  }

  clear(): void {
    this.store.clear();
  }
}
