'use client';

import { useEffect } from 'react';
import { lockScroll, unlockScroll } from '@/lib/scrollLock';

/**
 * Custom React Hook to freeze the background webpage when a popup or modal is open.
 * Automatically increments and decrements the global scroll lock counter,
 * preventing layout shift and mobile background drag-scrolling.
 *
 * @param isLocked boolean indicating if the popup/modal is currently open
 */
export function useBodyScrollLock(isLocked: boolean): void {
  useEffect(() => {
    if (!isLocked) return;

    lockScroll();

    return () => {
      unlockScroll();
    };
  }, [isLocked]);
}

export default useBodyScrollLock;
