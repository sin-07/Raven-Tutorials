export interface EnquiryFilterParams {
  searchTerm?: string;
  standard?: string;
  status?: 'all' | 'pending' | 'resolved';
  page?: number;
  limit?: number;
}

export function sanitizeFilterParams(params: EnquiryFilterParams): EnquiryFilterParams {
  return {
    searchTerm: params.searchTerm?.trim() || undefined,
    standard: params.standard || undefined,
    status: params.status || 'all',
    page: Math.max(1, Number(params.page) || 1),
    limit: Math.min(100, Math.max(10, Number(params.limit) || 20))
  };
}
