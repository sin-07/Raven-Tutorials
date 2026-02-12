'use client';
import { useState, useEffect, useRef } from 'react';

export function useIdleTimer(timeoutMs = 15 * 60 * 1000, onIdle?: () => void) {
  const [isIdle, setIsIdle] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleActivity = () => {
      setIsIdle(false);
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        setIsIdle(true);
        if (onIdle) onIdle();
      }, timeoutMs);
    };

    const events = ['mousemove', 'keydown', 'scroll', 'touchstart'];
    events.forEach(evt => window.addEventListener(evt, handleActivity));

    handleActivity();

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      events.forEach(evt => window.removeEventListener(evt, handleActivity));
    };
  }, [timeoutMs, onIdle]);

  return isIdle;
}
