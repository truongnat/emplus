export type ApiResponseEnvelope<TData> = {
  success?: boolean;
  data: TData;
  message?: string;
  meta?: Record<string, unknown>;
};

export type ApiErrorEnvelope = {
  error?: string;
  message?: string;
  code?: string;
  details?: unknown;
};

export type PaginationMeta = {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
};

export type PaginatedApiResponse<TItem> = ApiResponseEnvelope<TItem[]> & {
  meta: PaginationMeta & Record<string, unknown>;
};
