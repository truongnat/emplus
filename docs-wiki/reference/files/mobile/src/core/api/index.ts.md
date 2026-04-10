---
title: "mobile/src/core/api/index.ts"
description: "API Client"
layout: "doc"
outline: "deep"
editLink: false
lastUpdated: false
pageClass: "docs-wiki docs-wiki--file"
docsWiki:
  schemaVersion: "1.0.0"
  kind: "file"
  project: "emplus"
  template: "detailed"
  themePreset: "clean"
  generatedAt: "2026-04-10T00:09:32.387Z"
  page: "reference/files/mobile/src/core/api/index.ts.md"
  relativePath: "mobile/src/core/api/index.ts"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/mobile/src/core/api/index.ts"
  module: "mobile/src/core/api"
  workspace: "mobile"
  language: "TypeScript"
  symbolCount: 12
---

# mobile/src/core/api/index.ts

- Overview: [emplus Docs Wiki](../../../../../../index.md)
- Summary: [SUMMARY](../../../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../../../features/index.md)
- Module: [mobile/src/core/api](../../../../../modules/mobile/src/core/api.md)
- Workspace: [@emplus/mobile](../../../../../../workspaces/mobile.md)

## Snapshot

- Language: TypeScript
- Source path: `/Users/truongdq/tx/GitHub/emplus/mobile/src/core/api/index.ts`
- Lines: 202
- Symbols: 12

## Related Features

- [Authentication Login](../../../../../../features/auth-login.md) - Authentication Login captures the login workflow inside authentication. It spans 2 workspaces. Key flows include Auth login, Auth registration, Auth login.
- [Authentication Read / List](../../../../../../features/auth-list.md) - Authentication Read / List captures the read / list workflow inside authentication. It spans 3 workspaces.
- [User Management Login](../../../../../../features/user-login.md) - User Management Login captures the login workflow inside user management. It spans 2 workspaces. Key flows include Auth login, Auth registration, Auth login.
- [Search Read / List](../../../../../../features/search-list.md) - Search Read / List captures the read / list workflow inside search. It spans 3 workspaces.
- [Search Login](../../../../../../features/search-login.md) - Search Login captures the login workflow inside search. It spans 2 workspaces. Key flows include Auth login, Auth registration, Auth login.
- [Notifications Read / List](../../../../../../features/notification-list.md) - Notifications Read / List captures the read / list workflow inside notifications. It spans 2 workspaces.
- [Storage Read / List](../../../../../../features/storage-list.md) - Storage Read / List captures the read / list workflow inside storage. It spans 4 workspaces.
- [Integrations Read / List](../../../../../../features/integration-list.md) - Integrations Read / List captures the read / list workflow inside integrations. It spans 3 workspaces.
- [User Management Read / List](../../../../../../features/user-list.md) - User Management Read / List captures the read / list workflow inside user management. It spans 3 workspaces.
- [Notifications Notify](../../../../../../features/notification-notify.md) - Notifications Notify captures the notify workflow inside notifications. It spans 2 workspaces.
- [Notifications Login](../../../../../../features/notification-login.md) - Notifications Login captures the login workflow inside notifications. It spans 2 workspaces. Key flows include Auth login, Auth registration, Auth login.
- [Reporting Read / List](../../../../../../features/reporting-list.md) - Reporting Read / List captures the read / list workflow inside reporting. It spans 2 workspaces.
- [Search Notify](../../../../../../features/search-notify.md) - Search Notify captures the notify workflow inside search. It spans 2 workspaces.
- [Storage Login](../../../../../../features/storage-login.md) - Storage Login captures the login workflow inside storage. It spans 2 workspaces. Key flows include Auth login, Auth registration, Auth login.
- [Administration Read / List](../../../../../../features/admin-list.md) - Administration Read / List captures the read / list workflow inside administration. It spans 2 workspaces.
- [Integrations Login](../../../../../../features/integration-login.md) - Integrations Login captures the login workflow inside integrations. It spans 2 workspaces. Key flows include Auth login, Auth registration, Auth login.
- [Integrations Notify](../../../../../../features/integration-notify.md) - Integrations Notify captures the notify workflow inside integrations. It spans 2 workspaces.
- [Search Create](../../../../../../features/search-create.md) - Search Create captures the create workflow inside search. It spans 2 workspaces.
- [User Management Notify](../../../../../../features/user-notify.md) - User Management Notify captures the notify workflow inside user management. It spans 2 workspaces.
- [Administration Login](../../../../../../features/admin-login.md) - Administration Login captures the login workflow inside administration. It spans 2 workspaces. Key flows include Auth login, Auth registration, Auth login.
- [Storage Notify](../../../../../../features/storage-notify.md) - Storage Notify captures the notify workflow inside storage. It spans 2 workspaces.
- [User Management Create](../../../../../../features/user-create.md) - User Management Create captures the create workflow inside user management. It spans 2 workspaces.
- [Reporting Login](../../../../../../features/reporting-login.md) - Reporting Login captures the login workflow inside reporting. It spans 2 workspaces. Key flows include Auth login, Auth registration, Auth login.
- [Administration Notify](../../../../../../features/admin-notify.md) - Administration Notify captures the notify workflow inside administration. It spans 2 workspaces.

## AI Summary

API Client

### Responsibilities

- create API client instance
- execute HTTP requests

### Usage Notes

- This class provides a singleton interface to API calls with optional retry and refresh mechanisms.

## Public API

- `interface ApiResponse<T>`
- `type ApiRequestOptions = { allowStatuses?: number[]; headers?: Record<string, string>; timeoutMs?: number; skipAuth?: boolean; // Tùy chọn bỏ qua Token (ví dụ: login, register) };`
- `class ApiClient`
- `private constructor()`
- `public static getInstance(): ApiClient`
- `async request<T>( path: string, init?: RequestInit, options?: ApiRequestOptions, isRetry = false, // Dùng để ngăn việc retry vô hạn ): Promise<T>`
- `private async handleTokenExpiration(): Promise<string | null>`
- `get<T>(path: string, options?: ApiRequestOptions)`
- `post<T>(path: string, body?: unknown, options?: ApiRequestOptions)`
- `put<T>(path: string, body?: unknown, options?: ApiRequestOptions)`
- `patch<T>(path: string, body?: unknown, options?: ApiRequestOptions)`
- `delete<T>(path: string, options?: ApiRequestOptions)`

## Symbols

### interface `ApiResponse`

- Signature: `interface ApiResponse<T>`
- Lines: 7-11
- Exported: yes

```ts
interface ApiResponse<T> {
  success: boolean;
  data: T;
  meta?: { requestId?: string; timestamp?: string };
}
```

### type `ApiRequestOptions`

- Signature: `type ApiRequestOptions = { allowStatuses?: number[]; headers?: Record<string, string>; timeoutMs?: number; skipAuth?: boolean; // Tùy chọn bỏ qua Token (ví dụ: login, register) };`
- Lines: 13-18
- Exported: yes

```ts
type ApiRequestOptions = {
  allowStatuses?: number[];
  headers?: Record<string, string>;
  timeoutMs?: number;
  skipAuth?: boolean; // Tùy chọn bỏ qua Token (ví dụ: login, register)
};
```

### class `ApiClient`

- Signature: `class ApiClient`
- Lines: 20-199
- Exported: yes

```ts
class ApiClient {
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
    isRetry = false, // Dùng để ngăn việc retry vô hạn
  ): Promise<T> {
    const url = `${appConfig.env.apiBase}${path}`;
    const method = init?.method ?? "GET";
    const timeout = options?.timeoutMs ?? appConfig.api.timeoutMs;

    const body = init?.body;
    const isMultipart =
      body != null &&
      typeof body === "object" &&
      typeof (body as FormData).append === "function";

    // Tự động đính kèm Token nếu không skipAuth (multipart: không set Content-Type để RN gắn boundary)
    const headers: Record<string, string> = {
      ...(isMultipart ? {} : { "Content-Type": "application/json" }),
      ...(options?.headers ?? {}),
      ...((init?.headers as Record<string, string>) ?? {}),
    };

    const token = tokenManager.getAccessToken();
    if (token && !options?.skipAuth) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    if (appConfig.env.isDevelopment)
      startLog(url, method, path, { ...init, headers });

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    const startTime = Date.now();
    try {
      const response = await fetch(url, {
        ...init,
        headers,
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      const duration = Date.now() - startTime;
      let payload: unknown = null;
      const raw = await response.text();
      if (raw) {
        try {
          payload = JSON.parse(raw);
        } catch {
          payload = raw;
        }
      }

      if (appConfig.env.isDevelopment)
        endLog(method, path, response, payload, duration);

      // Xử lý Lỗi 401 (Hết hạn Token)
      if (
        response.status === ApiErrorCode.UNAUTHORIZED &&
        !options?.skipAuth &&
        !isRetry
      ) {
        const nextToken = await this.handleTokenExpiration();
        if (nextToken) {
          // Thực hiện lại yêu cầu gốc với Token mới
          return this.request(path, init, options, true);
        }
      }

      const allowedStatuses = options?.allowStatuses ?? [];
      const isAcceptedStatus =
        response.ok || allowedStatuses.includes(response.status);

      if (!isAcceptedStatus) {
        const parsed = toMessageFromResponse(
          response.status,
          payload,
          "API Request Failed",
        );
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

      if (error.name === "AbortError")
        throw new ApiError({
          message: "Request Timeout",
          status: ApiErrorCode.TIMEOUT,
        });
      throw new ApiError({
        message: "Network Error",
        status: ApiErrorCode.NETWORK_ERROR,
      });
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

  post<T>(path: string, body?: unknown, options?: ApiRequestOptions) {
    if (body != null && typeof body === "object" && typeof (body as FormData).append === "function") {
      return this.request<T>(
        path,
        { method: "POST", body: body as BodyInit },
        options,
      );
    }
    return this.request<T>(
      path,
      {
        method: "POST",
        body: body !== undefined && body !== null ? JSON.stringify(body) : undefined,
      },
      options,
    );
  }

  put<T>(path: string, body?: unknown, options?: ApiRequestOptions) {
    return this.request<T>(
      path,
      {
        method: "PUT",
        body: body !== undefined && body !== null ? JSON.stringify(body) : undefined,
      },
      options,
    );
  }

  patch<T>(path: string, body?: unknown, options?: ApiRequestOptions) {
    return this.request<T>(
      path,
      { method: "PATCH", body: body !== undefined ? JSON.stringify(body) : undefined },
      options,
    );
  }

  delete<T>(path: string, options?: ApiRequestOptions) {
    return this.request<T>(path, { method: "DELETE" }, options);
  }
}
```

### method `constructor`

- Signature: `private constructor()`
- Lines: 25-25
- Exported: yes

```ts
private constructor() {}
```

### method `getInstance`

- Signature: `public static getInstance(): ApiClient`
- Lines: 27-30
- Exported: yes

```ts
public static getInstance(): ApiClient {
    if (!ApiClient.instance) ApiClient.instance = new ApiClient();
    return ApiClient.instance;
  }
```

### method `request`

- Signature: `async request<T>( path: string, init?: RequestInit, options?: ApiRequestOptions, isRetry = false, // Dùng để ngăn việc retry vô hạn ): Promise<T>`
- Lines: 32-136
- Exported: yes

```ts
async request<T>(
    path: string,
    init?: RequestInit,
    options?: ApiRequestOptions,
    isRetry = false, // Dùng để ngăn việc retry vô hạn
  ): Promise<T> {
    const url = `${appConfig.env.apiBase}${path}`;
    const method = init?.method ?? "GET";
    const timeout = options?.timeoutMs ?? appConfig.api.timeoutMs;

    const body = init?.body;
    const isMultipart =
      body != null &&
      typeof body === "object" &&
      typeof (body as FormData).append === "function";

    // Tự động đính kèm Token nếu không skipAuth (multipart: không set Content-Type để RN gắn boundary)
    const headers: Record<string, string> = {
      ...(isMultipart ? {} : { "Content-Type": "application/json" }),
      ...(options?.headers ?? {}),
      ...((init?.headers as Record<string, string>) ?? {}),
    };

    const token = tokenManager.getAccessToken();
    if (token && !options?.skipAuth) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    if (appConfig.env.isDevelopment)
      startLog(url, method, path, { ...init, headers });

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    const startTime = Date.now();
    try {
      const response = await fetch(url, {
        ...init,
        headers,
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      const duration = Date.now() - startTime;
      let payload: unknown = null;
      const raw = await response.text();
      if (raw) {
        try {
          payload = JSON.parse(raw);
        } catch {
          payload = raw;
        }
      }

      if (appConfig.env.isDevelopment)
        endLog(method, path, response, payload, duration);

      // Xử lý Lỗi 401 (Hết hạn Token)
      if (
        response.status === ApiErrorCode.UNAUTHORIZED &&
        !options?.skipAuth &&
        !isRetry
      ) {
        const nextToken = await this.handleTokenExpiration();
        if (nextToken) {
          // Thực hiện lại yêu cầu gốc với Token mới
          return this.request(path, init, options, true);
        }
      }

      const allowedStatuses = options?.allowStatuses ?? [];
      const isAcceptedStatus =
        response.ok || allowedStatuses.includes(response.status);

      if (!isAcceptedStatus) {
        const parsed = toMessageFromResponse(
          response.status,
          payload,
          "API Request Failed",
        );
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

      if (error.name === "AbortError")
        throw new ApiError({
          message: "Request Timeout",
          status: ApiErrorCode.TIMEOUT,
        });
      throw new ApiError({
        message: "Network Error",
        status: ApiErrorCode.NETWORK_ERROR,
      });
    }
  }
```

### method `handleTokenExpiration`

- Signature: `private async handleTokenExpiration(): Promise<string | null>`
- Lines: 141-153
- Exported: yes

```ts
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
```

### method `get`

- Signature: `get<T>(path: string, options?: ApiRequestOptions)`
- Lines: 155-157
- Exported: yes

```ts
get<T>(path: string, options?: ApiRequestOptions) {
    return this.request<T>(path, { method: "GET" }, options);
  }
```

### method `post`

- Signature: `post<T>(path: string, body?: unknown, options?: ApiRequestOptions)`
- Lines: 159-175
- Exported: yes

```ts
post<T>(path: string, body?: unknown, options?: ApiRequestOptions) {
    if (body != null && typeof body === "object" && typeof (body as FormData).append === "function") {
      return this.request<T>(
        path,
        { method: "POST", body: body as BodyInit },
        options,
      );
    }
    return this.request<T>(
      path,
      {
        method: "POST",
        body: body !== undefined && body !== null ? JSON.stringify(body) : undefined,
      },
      options,
    );
  }
```

### method `put`

- Signature: `put<T>(path: string, body?: unknown, options?: ApiRequestOptions)`
- Lines: 177-186
- Exported: yes

```ts
put<T>(path: string, body?: unknown, options?: ApiRequestOptions) {
    return this.request<T>(
      path,
      {
        method: "PUT",
        body: body !== undefined && body !== null ? JSON.stringify(body) : undefined,
      },
      options,
    );
  }
```

### method `patch`

- Signature: `patch<T>(path: string, body?: unknown, options?: ApiRequestOptions)`
- Lines: 188-194
- Exported: yes

```ts
patch<T>(path: string, body?: unknown, options?: ApiRequestOptions) {
    return this.request<T>(
      path,
      { method: "PATCH", body: body !== undefined ? JSON.stringify(body) : undefined },
      options,
    );
  }
```

### method `delete`

- Signature: `delete<T>(path: string, options?: ApiRequestOptions)`
- Lines: 196-198
- Exported: yes

```ts
delete<T>(path: string, options?: ApiRequestOptions) {
    return this.request<T>(path, { method: "DELETE" }, options);
  }
```
