export function formatCurrencyINR(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
}

export function formatMetricNumber(num: number): string {
  if (num >= 10000000) return (num / 10000000).toFixed(1).replace(/\.0$/, '') + ' Cr';
  if (num >= 100000) return (num / 100000).toFixed(1).replace(/\.0$/, '') + ' L';
  if (num >= 1000) return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'k';
  return num.toString();
}

export function formatStudentRollNumber(prefix: string, year: number, seq: number): string {
  return `${prefix}-${year}-${String(seq).padStart(4, '0')}`;
}

export function formatPercentage(val: number, precision: number = 1): string {
  return `${val.toFixed(precision)}%`;
}
