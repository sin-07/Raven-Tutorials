export function calculateAttendancePercentage(present: number, total: number): number {
  if (total <= 0) return 0;
  return Math.min(100, Math.round((present / total) * 1000) / 10);
}

export function calculatePercentile(rank: number, totalCandidates: number): number {
  if (totalCandidates <= 0 || rank <= 0) return 0;
  return Math.max(0, Math.round(((totalCandidates - rank) / totalCandidates) * 1000) / 10);
}

export function clamp(val: number, min: number, max: number): number {
  return Math.min(Math.max(val, min), max);
}
