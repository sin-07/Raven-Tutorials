'use client';
import { useEffect } from 'react';

export function useScrollLock(locked = true) {
  useEffect(() => {
    if (!locked || typeof document === 'undefined') return;
    const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = `${scrollBarWidth}px`;

    return () => {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    };
  }, [locked]);
}
