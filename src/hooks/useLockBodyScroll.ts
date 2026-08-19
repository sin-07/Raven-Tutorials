'use client';
import { useLayoutEffect } from 'react';

export function useLockBodyScroll(lock = true): void {
  useLayoutEffect(() => {
    if (!lock || typeof document === 'undefined') return;
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, [lock]);
}
