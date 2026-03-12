import appConfig from "../config/app-config";
import ApiError, { ApiErrorCode } from "./api-error";
import { endLog, startLog } from "./api-log";
import toMessageFromResponse from "./to-message-response";
import { tokenManager } from "./token-manager";

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  meta?: { requestId?: string; timestamp?: string };
}

export type ApiRequestOptions = {
  allowStatuses?: number[];
  headers?: Record<string, string>;
  timeoutMs?: number;
  skipAuth?: boolean; // Tùy chọn bỏ qua Token (ví dụ: login, register)
};

export class ApiClient {
  private static instance: ApiClient;
  private isRefreshing = false;
  private refreshPromise: Promise<string | null> | null = null;

  private constructor() {}

  public static getInstance(): ApiClient {
    if (!ApiClient.instance) ApiClient.instance = new ApiClient();
    return ApiClient.instance;
  }

  async request<T>(
    path: string,
    init?: RequestInit,
    options?: ApiRequestOptions,
    isRetry = false // Dùng để ngăn việc retry vô hạn
  ): Promise<T> {
    const url = `${appConfig.env.apiBase}${path}`;
    const method = init?.method ?? "GET";
    const timeout = options?.timeoutMs ?? appConfig.api.timeoutMs;

    // Tự động đính kèm Token nếu không skipAuth
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      ...(options?.headers ?? {}),
      ...(init?.headers as Record<string, string> ?? {}),
    };

    const token = tokenManager.getAccessToken();
    if (token && !options?.skipAuth) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    if (appConfig.env.isDevelopment) startLog(url, method, path, { ...init, headers });

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    const startTime = Date.now();
    try {
      const response = await fetch(url, { ...init, headers, signal: controller.signal });
      clearTimeout(timeoutId);
      
      const duration = Date.now() - startTime;
      let payload: unknown = null;
      const raw = await response.text();
      if (raw) {
        try { payload = JSON.parse(raw); } catch { payload = raw; }
      }

      if (appConfig.env.isDevelopment) endLog(method, path, response, payload, duration);

      // Xử lý Lỗi 401 (Hết hạn Token)
      if (response.status === ApiErrorCode.UNAUTHORIZED && !options?.skipAuth && !isRetry) {
        const nextToken = await this.handleTokenExpiration();
        if (nextToken) {
          // Thực hiện lại yêu cầu gốc với Token mới
          return this.request(path, init, options, true);
        }
      }

      const allowedStatuses = options?.allowStatuses ?? [];
      const isAcceptedStatus = response.ok || allowedStatuses.includes(response.status);

      if (!isAcceptedStatus) {
        const parsed = toMessageFromResponse(response.status, payload, "API Request Failed");
        throw new ApiError({
          message: parsed.message,
          status: response.status,
          code: parsed.code,
          details: parsed.details,
          requestId: parsed.requestId,
        });
      }

      return payload as T;
    } catch (error: any) {
      clearTimeout(timeoutId);
      if (error instanceof ApiError) throw error;

      if (error.name === 'AbortError') throw new ApiError({ message: "Request Timeout", status: ApiErrorCode.TIMEOUT });
      throw new ApiError({ message: "Network Error", status: ApiErrorCode.NETWORK_ERROR });
    }
  }

  /**
   * Xử lý việc hết hạn Token một cách tập trung và an toàn (concurrency safe).
   */
  private async handleTokenExpiration(): Promise<string | null> {
    if (this.isRefreshing && this.refreshPromise) {
      return this.refreshPromise;
    }

    this.isRefreshing = true;
    this.refreshPromise = tokenManager.refreshToken().finally(() => {
      this.isRefreshing = false;
      this.refreshPromise = null;
    });

    return this.refreshPromise;
  }

  get<T>(path: string, options?: ApiRequestOptions) {
    return this.request<T>(path, { method: "GET" }, options);
  }

  post<T>(path: string, body?: any, options?: ApiRequestOptions) {
    return this.request<T>(path, { method: "POST", body: body ? JSON.stringify(body) : undefined }, options);
  }
}

export const apiClient = ApiClient.getInstance();
