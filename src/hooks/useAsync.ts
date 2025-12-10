'use client';
import { useState, useCallback } from 'react';

export function useAsync<T>() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);

  const execute = useCallback(async (asyncFn: () => Promise<T>) => {
    setLoading(true);
    setError(null);
    try {
      const res = await asyncFn();
      setData(res);
      return res;
    } catch (e) {
      setError(e instanceof Error ? e : new Error(String(e)));
      throw e;
    } finally {
      setLoading(false);
    }
  }, []);

  return { loading, data, error, execute };
}
