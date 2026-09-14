/**
 * Re-entrant Body and Background Scroll Lock Utility
 * Freezes the background webpage completely when any popup/modal appears,
 * prevents layout shift caused by missing scrollbars on Windows/desktop browsers,
 * blocks mobile/touch drag leak-through, and safely restores state when popups close.
 */

let lockCount = 0;
let originalBodyOverflow = '';
let originalHtmlOverflow = '';
let originalBodyPaddingRight = '';
let originalBodyTouchAction = '';

// Prevent mobile touchmove event propagation outside of scrollable modal containers
const preventTouchMove = (e: TouchEvent) => {
  const target = e.target as HTMLElement | null;
  if (!target) return;

  // If the target or any parent is scrollable within a modal, allow it to scroll
  const scrollableParent = target.closest(
    '.overflow-y-auto, .overflow-y-scroll, .overflow-auto, [data-allow-scroll="true"]'
  );

  if (!scrollableParent) {
    if (e.cancelable) {
      e.preventDefault();
    }
  }
};

/**
 * Lock scrolling on document.body and document.documentElement.
 * Supports multiple nested popups with an internal lock counter.
 */
export function lockScroll(): void {
  if (typeof window === 'undefined' || typeof document === 'undefined') return;

  lockCount++;

  // Only apply lock styling on the first active popup
  if (lockCount === 1) {
    const { documentElement, body } = document;

    // Save previous styles
    originalBodyOverflow = body.style.overflow;
    originalHtmlOverflow = documentElement.style.overflow;
    originalBodyPaddingRight = body.style.paddingRight;
    originalBodyTouchAction = body.style.touchAction;

    // Measure scrollbar width to prevent horizontal layout shift
    const scrollbarWidth = window.innerWidth - documentElement.clientWidth;
    if (scrollbarWidth > 0) {
      body.style.paddingRight = `${scrollbarWidth}px`;
      documentElement.style.setProperty('--scrollbar-width', `${scrollbarWidth}px`);
    }

    // Freeze html and body scrolling
    documentElement.style.overflow = 'hidden';
    body.style.overflow = 'hidden';
    body.style.touchAction = 'none';

    // Add CSS class hooks
    documentElement.classList.add('popup-frozen');
    body.classList.add('popup-frozen');

    // Attach non-passive touchmove blocker for mobile devices
    window.addEventListener('touchmove', preventTouchMove, { passive: false });
  }
}

/**
 * Unlock scrolling when a popup closes.
 * Only restores styles when all active popups have closed.
 */
export function unlockScroll(): void {
  if (typeof window === 'undefined' || typeof document === 'undefined') return;

  lockCount = Math.max(0, lockCount - 1);

  if (lockCount === 0) {
    const { documentElement, body } = document;

    // Restore previous styles
    body.style.overflow = originalBodyOverflow;
    documentElement.style.overflow = originalHtmlOverflow;
    body.style.paddingRight = originalBodyPaddingRight;
    body.style.touchAction = originalBodyTouchAction;
    documentElement.style.removeProperty('--scrollbar-width');

    // Remove CSS class hooks
    documentElement.classList.remove('popup-frozen');
    body.classList.remove('popup-frozen');

    // Remove touchmove blocker
    window.removeEventListener('touchmove', preventTouchMove);
  }
}

/**
 * Force reset scroll lock (useful on route navigation or emergency cleanup)
 */
export function resetScrollLock(): void {
  if (typeof window === 'undefined' || typeof document === 'undefined') return;

  lockCount = 0;
  const { documentElement, body } = document;

  body.style.overflow = '';
  documentElement.style.overflow = '';
  body.style.paddingRight = '';
  body.style.touchAction = '';
  documentElement.style.removeProperty('--scrollbar-width');

  documentElement.classList.remove('popup-frozen');
  body.classList.remove('popup-frozen');

  window.removeEventListener('touchmove', preventTouchMove);
}
