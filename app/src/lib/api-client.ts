import { env } from "@/lib/env";
import { tokenStorage } from "@/lib/token-storage";
import type { ApiErrorEnvelope } from "@/types/api";

type HttpMethod = "GET" | "POST" | "PATCH" | "DELETE";
type QueryValue = string | number | boolean | null | undefined;

type ApiRequestOptions<TBody = unknown> = {
  body?: TBody;
  headers?: HeadersInit;
  signal?: AbortSignal;
  searchParams?: Record<string, QueryValue>;
  skipAuth?: boolean;
};

type ApiErrorInit = {
  status: number;
  statusText: string;
  method: HttpMethod;
  url: string;
  payload: unknown;
};

export class ApiError extends Error {
  status: number;
  statusText: string;
  method: HttpMethod;
  url: string;
  payload: unknown;
  code?: string;
  details?: unknown;

  constructor({ status, statusText, method, url, payload }: ApiErrorInit) {
    const errorPayload = normalizeErrorPayload(payload);

    super(errorPayload.message || statusText || "API request failed");
    this.name = "ApiError";
    this.status = status;
    this.statusText = statusText;
    this.method = method;
    this.url = url;
    this.payload = payload;
    this.code = errorPayload.code;
    this.details = errorPayload.details;
  }
}

function normalizeErrorPayload(payload: unknown): ApiErrorEnvelope {
  if (!payload || typeof payload !== "object") {
    return {};
  }

  const maybeEnvelope = payload as { error?: ApiErrorEnvelope };
  if (maybeEnvelope.error && typeof maybeEnvelope.error === "object") {
    return maybeEnvelope.error;
  }

  return payload as ApiErrorEnvelope;
}

function buildUrl(path: string, searchParams?: Record<string, QueryValue>) {
  const url = path.startsWith("http")
    ? new URL(path)
    : new URL(path.startsWith("/") ? path : `/${path}`, env.apiBaseUrl);

  if (searchParams) {
    Object.entries(searchParams).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        url.searchParams.set(key, String(value));
      }
    });
  }

  return url;
}

async function parseResponse(response: Response) {
  const text = await response.text();

  if (!text) {
    return null;
  }

  try {
    return JSON.parse(text) as unknown;
  } catch {
    return text;
  }
}

async function request<TResponse, TBody = unknown>(
  method: HttpMethod,
  path: string,
  options: ApiRequestOptions<TBody> = {},
): Promise<TResponse> {
  const url = buildUrl(path, options.searchParams);
  const headers = new Headers(options.headers);
  const accessToken = tokenStorage.getAccessToken();

  if (!headers.has("Accept")) {
    headers.set("Accept", "application/json");
  }

  if (options.body !== undefined && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  if (!options.skipAuth && accessToken) {
    headers.set("Authorization", `Bearer ${accessToken}`);
  }

  const response = await fetch(url, {
    method,
    headers,
    signal: options.signal,
    body: options.body === undefined ? undefined : JSON.stringify(options.body),
  });

  const payload = await parseResponse(response);

  if (!response.ok) {
    throw new ApiError({
      status: response.status,
      statusText: response.statusText,
      method,
      url: url.toString(),
      payload,
    });
  }

  return payload as TResponse;
}

export const apiClient = {
  get<TResponse>(path: string, options?: ApiRequestOptions<never>) {
    return request<TResponse>("GET", path, options);
  },

  post<TResponse, TBody = unknown>(
    path: string,
    body?: TBody,
    options?: Omit<ApiRequestOptions<TBody>, "body">,
  ) {
    return request<TResponse, TBody>("POST", path, { ...options, body });
  },

  patch<TResponse, TBody = unknown>(
    path: string,
    body?: TBody,
    options?: Omit<ApiRequestOptions<TBody>, "body">,
  ) {
    return request<TResponse, TBody>("PATCH", path, { ...options, body });
  },

  delete<TResponse>(path: string, options?: ApiRequestOptions<never>) {
    return request<TResponse>("DELETE", path, options);
  },
};
