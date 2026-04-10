---
title: "mobile/src/core/api/api-error.ts"
description: "Error class responsible for capturing and handling API errors."
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
  page: "reference/files/mobile/src/core/api/api-error.ts.md"
  relativePath: "mobile/src/core/api/api-error.ts"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/mobile/src/core/api/api-error.ts"
  module: "mobile/src/core/api"
  workspace: "mobile"
  language: "TypeScript"
  symbolCount: 7
---

# mobile/src/core/api/api-error.ts

- Overview: [emplus Docs Wiki](../../../../../../index.md)
- Summary: [SUMMARY](../../../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../../../features/index.md)
- Module: [mobile/src/core/api](../../../../../modules/mobile/src/core/api.md)
- Workspace: [@emplus/mobile](../../../../../../workspaces/mobile.md)

## Snapshot

- Language: TypeScript
- Source path: `/Users/truongdq/tx/GitHub/emplus/mobile/src/core/api/api-error.ts`
- Lines: 75
- Symbols: 7

## Related Features

- [Notifications Notify](../../../../../../features/notification-notify.md) - Notifications Notify captures the notify workflow inside notifications. It spans 2 workspaces.
- [Search Notify](../../../../../../features/search-notify.md) - Search Notify captures the notify workflow inside search. It spans 2 workspaces.
- [Integrations Notify](../../../../../../features/integration-notify.md) - Integrations Notify captures the notify workflow inside integrations. It spans 2 workspaces.
- [User Management Notify](../../../../../../features/user-notify.md) - User Management Notify captures the notify workflow inside user management. It spans 2 workspaces.
- [Storage Notify](../../../../../../features/storage-notify.md) - Storage Notify captures the notify workflow inside storage. It spans 2 workspaces.
- [Administration Notify](../../../../../../features/admin-notify.md) - Administration Notify captures the notify workflow inside administration. It spans 2 workspaces.

## AI Summary

Error class responsible for capturing and handling API errors.

### Responsibilities

- extends Error
- returns Error instance

## Public API

- `enum ApiErrorCode`
- `class ApiError extends Error`
- `constructor(input: { message: string; status: number; code?: string; details?: unknown[]; requestId?: string; })`
- `isNetworkError(): boolean`
- `isUnauthorized(): boolean`
- `shouldRetry(): boolean`
- `isForbidden(): boolean`

## Symbols

### enum `ApiErrorCode`

- Signature: `enum ApiErrorCode`
- Lines: 4-13
- Exported: yes

```ts
enum ApiErrorCode {
  NETWORK_ERROR = 0,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  BAD_REQUEST = 400,
  TIMEOUT = 408,
  SERVER_ERROR = 500,
  VALIDATION_ERROR = 422,
}
```

### class `ApiError`

- Signature: `class ApiError extends Error`
- Lines: 15-74
- Exported: yes

```ts
class ApiError extends Error {
  readonly status: number;
  readonly code?: string;
  readonly details: unknown[];
  readonly requestId?: string;

  constructor(input: {
    message: string;
    status: number;
    code?: string;
    details?: unknown[];
    requestId?: string;
  }) {
    super(input.message);
    this.name = "ApiError";
    this.status = input.status;
    this.code = input.code;
    this.details = input.details ?? [];
    this.requestId = input.requestId;
  }

  /**
   * Kiểm tra xem lỗi có phải do mất kết nối mạng không.
   */
  isNetworkError(): boolean {
    return (
      this.status === ApiErrorCode.NETWORK_ERROR ||
      this.status === ApiErrorCode.TIMEOUT
    );
  }

  /**
   * Kiểm tra lỗi xác thực (hết hạn session).
   */
  isUnauthorized(): boolean {
    return this.status === ApiErrorCode.UNAUTHORIZED;
  }

  /**
   * Kiểm tra xem lỗi này có nên cho phép TanStack Query thử lại (retry) không.
   */
  shouldRetry(): boolean {
    // Không retry nếu là lỗi Client (trừ Timeout)
    if (
      this.status >= 400 &&
      this.status < 500 &&
      this.status !== ApiErrorCode.TIMEOUT
    ) {
      return false;
    }
    return true;
  }

  /**
   * Kiểm tra xem session có bị khóa quyền truy cập không.
   */
  isForbidden(): boolean {
    return this.status === ApiErrorCode.FORBIDDEN;
  }
}
```

### method `constructor`

- Signature: `constructor(input: { message: string; status: number; code?: string; details?: unknown[]; requestId?: string; })`
- Lines: 21-34
- Exported: yes

```ts
constructor(input: {
    message: string;
    status: number;
    code?: string;
    details?: unknown[];
    requestId?: string;
  }) {
    super(input.message);
    this.name = "ApiError";
    this.status = input.status;
    this.code = input.code;
    this.details = input.details ?? [];
    this.requestId = input.requestId;
  }
```

### method `isNetworkError`

- Signature: `isNetworkError(): boolean`
- Lines: 39-44
- Exported: yes

```ts
isNetworkError(): boolean {
    return (
      this.status === ApiErrorCode.NETWORK_ERROR ||
      this.status === ApiErrorCode.TIMEOUT
    );
  }
```

### method `isUnauthorized`

- Signature: `isUnauthorized(): boolean`
- Lines: 49-51
- Exported: yes

```ts
isUnauthorized(): boolean {
    return this.status === ApiErrorCode.UNAUTHORIZED;
  }
```

### method `shouldRetry`

- Signature: `shouldRetry(): boolean`
- Lines: 56-66
- Exported: yes

```ts
shouldRetry(): boolean {
    // Không retry nếu là lỗi Client (trừ Timeout)
    if (
      this.status >= 400 &&
      this.status < 500 &&
      this.status !== ApiErrorCode.TIMEOUT
    ) {
      return false;
    }
    return true;
  }
```

### method `isForbidden`

- Signature: `isForbidden(): boolean`
- Lines: 71-73
- Exported: yes

```ts
isForbidden(): boolean {
    return this.status === ApiErrorCode.FORBIDDEN;
  }
```
