import type { Context } from "hono";
import type { ContentfulStatusCode } from "hono/utils/http-status";

export class AppError extends Error {
  status: ContentfulStatusCode;
  code: string;
  details: unknown[];

  constructor(status: ContentfulStatusCode, code: string, message: string, details: unknown[] = []) {
    super(message);
    this.status = status;
    this.code = code;
    this.details = details;
  }
}

export async function readJson<T>(context: Context): Promise<T> {
  try {
    return await context.req.json<T>();
  } catch {
    throw new AppError(400, "BAD_REQUEST", "Nội dung request phải là JSON hợp lệ.");
  }
}

export function success<T>(context: Context, data: T, status: ContentfulStatusCode = 200): Response {
  return context.json(
    {
      success: true,
      data,
      meta: {
        requestId: context.get("requestId") as string,
        timestamp: new Date().toISOString(),
      },
    },
    status,
  );
}

export function paginated<T>(
  context: Context,
  data: T[],
  pagination: {
    page: number;
    limit: number;
    totalItems: number;
  },
): Response {
  const totalPages = Math.max(1, Math.ceil(pagination.totalItems / pagination.limit));

  return context.json({
    success: true,
    data: {
      items: data,
      pagination: {
        page: pagination.page,
        limit: pagination.limit,
        totalItems: pagination.totalItems,
        totalPages,
        hasNext: pagination.page < totalPages,
      },
    },
    meta: {
      requestId: context.get("requestId") as string,
      timestamp: new Date().toISOString(),
    },
  });
}

export function fail(context: Context, error: AppError): Response {
  return context.json(
    {
      success: false,
      error: {
        code: error.code,
        message: error.message,
        details: error.details,
      },
      meta: {
        requestId: context.get("requestId") as string,
        timestamp: new Date().toISOString(),
      },
    },
    error.status,
  );
}
