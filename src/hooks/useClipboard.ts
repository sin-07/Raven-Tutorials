'use client';
import { useState } from 'react';

export function useClipboard(timeoutMs = 2000) {
  const [hasCopied, setHasCopied] = useState(false);

  const copy = async (text: string) => {
    if (typeof navigator === 'undefined' || !navigator.clipboard) return false;
    try {
      await navigator.clipboard.writeText(text);
      setHasCopied(true);
      setTimeout(() => setHasCopied(false), timeoutMs);
      return true;
    } catch {
      return false;
    }
  };

  return { copy, hasCopied };
}
