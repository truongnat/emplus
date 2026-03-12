
export interface ApiMeta {
    requestId?: string;
    timestamp?: string;
}

export interface ApiSuccess<T> {
    success: true;
    data: T;
    meta?: ApiMeta;
}

export interface ApiFailure {
    success: false;
    error?: {
        code?: string;
        message?: string;
        details?: unknown[];
    };
    meta?: ApiMeta;
}

export interface PaginationMeta {
    page: number;
    limit: number;
    totalItems: number;
    totalPages: number;
    hasNext: boolean;
}

interface ApiPaginated<T> {
    success: true;
    data: T[];
    pagination: PaginationMeta;
}