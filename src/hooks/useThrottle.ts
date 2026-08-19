'use client';
import { useState, useEffect, useRef } from 'react';

export function useThrottle<T>(value: T, limitMs: number): T {
  const [throttledValue, setThrottledValue] = useState<T>(value);
  const lastRan = useRef(Date.now());

  useEffect(() => {
    const handler = setTimeout(() => {
      if (Date.now() - lastRan.current >= limitMs) {
        setThrottledValue(value);
        lastRan.current = Date.now();
      }
    }, limitMs - (Date.now() - lastRan.current));

    return () => clearTimeout(handler);
  }, [value, limitMs]);

  return throttledValue;
}
