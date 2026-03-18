export function isTouchDevice(): boolean {
  if (typeof window === 'undefined') return false;
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}

export function isMac(): boolean {
  if (typeof window === 'undefined') return false;
  return /(Mac|iPhone|iPod|iPad)/i.test(navigator.platform);
}

export function getShortcutKey(): '⌘' | 'Ctrl' {
  return isMac() ? '⌘' : 'Ctrl';
}
