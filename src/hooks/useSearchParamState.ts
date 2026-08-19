'use client';
import { useState, useCallback } from 'react';

export function useSearchParamState(param: string, initialValue: string) {
  const [value, setValue] = useState<string>(() => {
    if (typeof window === 'undefined') return initialValue;
    const url = new URL(window.location.href);
    return url.searchParams.get(param) || initialValue;
  });

  const updateValue = useCallback((newValue: string) => {
    setValue(newValue);
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      if (newValue) {
        url.searchParams.set(param, newValue);
      } else {
        url.searchParams.delete(param);
      }
      window.history.replaceState({}, '', url.toString());
    }
  }, [param]);

  return [value, updateValue] as const;
}
