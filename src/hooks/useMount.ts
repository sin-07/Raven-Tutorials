'use client';
import { useEffect, useRef } from 'react';

export function useMount(fn: () => void): void {
  const mounted = useRef(false);
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      fn();
    }
  }, [fn]);
}
