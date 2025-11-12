export const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536
} as const;

export function matchesBreakpoint(bp: keyof typeof breakpoints): boolean {
  if (typeof window === 'undefined') return false;
  return window.innerWidth >= breakpoints[bp];
}
