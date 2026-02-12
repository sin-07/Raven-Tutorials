'use client';
import { useState, useEffect } from 'react';

export interface ScrollPosition {
  x: number;
  y: number;
  isScrolled: boolean;
  direction: 'up' | 'down' | null;
}

export function useScrollPosition(threshold = 20): ScrollPosition {
  const [position, setPosition] = useState<ScrollPosition>({
    x: 0,
    y: 0,
    isScrolled: false,
    direction: null
  });

  useEffect(() => {
    let lastY = window.scrollY;

    function handleScroll() {
      const currentY = window.scrollY;
      const currentX = window.scrollX;
      const dir = currentY > lastY ? 'down' : currentY < lastY ? 'up' : null;

      setPosition({
        x: currentX,
        y: currentY,
        isScrolled: currentY > threshold,
        direction: dir
      });
      lastY = currentY;
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  return position;
}
