export function getPrintOrientation(type: 'idcard' | 'receipt' | 'marksheet'): 'portrait' | 'landscape' {
  if (type === 'idcard') return 'portrait';
  if (type === 'receipt') return 'portrait';
  return 'landscape';
}
