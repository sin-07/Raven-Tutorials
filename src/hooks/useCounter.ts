'use client';
import { useState, useCallback } from 'react';

export function useCounter(initialValue = 0, min = 0, max = Infinity) {
  const [count, setCount] = useState(initialValue);

  const increment = useCallback(() => {
    setCount(c => Math.min(max, c + 1));
  }, [max]);

  const decrement = useCallback(() => {
    setCount(c => Math.max(min, c - 1));
  }, [min]);

  const reset = useCallback(() => {
    setCount(initialValue);
  }, [initialValue]);

  return { count, increment, decrement, reset, setCount };
}
