export function clamp(val: number, min: number, max: number): number {
  return Math.min(Math.max(val, min), max);
}

export function lerp(start: number, end: number, t: number): number {
  return start * (1 - t) + end * t;
}

export function roundTo(val: number, decimals = 2): number {
  const multiplier = Math.pow(10, decimals);
  return Math.round(val * multiplier) / multiplier;
}

export function percentage(part: number, total: number): number {
  if (total <= 0) return 0;
  return roundTo((part / total) * 100, 1);
}

export function randomInRange(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
