export interface AppError {
  message: string;
  code?: string;
  statusCode?: number;
}

export function formatErrorMessage(error: unknown, fallback = 'An unexpected error occurred'): string {
  if (typeof error === 'string') return error;
  if (error instanceof Error) return error.message;
  if (error && typeof error === 'object' && 'message' in error) {
    return String((error as { message: unknown }).message);
  }
  return fallback;
}

export function isNetworkError(error: unknown): boolean {
  const msg = formatErrorMessage(error).toLowerCase();
  return msg.includes('network') || msg.includes('failed to fetch') || msg.includes('econnrefused');
}
