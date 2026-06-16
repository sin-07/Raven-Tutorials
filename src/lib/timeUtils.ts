export function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${String(secs).padStart(2, '0')}`;
}

export function hoursToDays(hours: number): string {
  const days = Math.floor(hours / 24);
  const rem = hours % 24;
  return days > 0 ? `${days}d ${rem}h` : `${rem}h`;
}

export function isUpcoming(dateStr: string): boolean {
  return new Date(dateStr).getTime() > Date.now();
}
