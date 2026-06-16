export function isEscapeKey(e: KeyboardEvent): boolean {
  return e.key === 'Escape';
}

export function isEnterKey(e: KeyboardEvent): boolean {
  return e.key === 'Enter';
}

export function preventDefaultIfMatch(e: KeyboardEvent, keys: string[]): void {
  if (keys.includes(e.key)) {
    e.preventDefault();
  }
}
