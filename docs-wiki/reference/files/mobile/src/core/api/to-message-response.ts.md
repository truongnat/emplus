---
title: "mobile/src/core/api/to-message-response.ts"
description: "An internal function to construct API response messages for error cases."
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
  page: "reference/files/mobile/src/core/api/to-message-response.ts.md"
  relativePath: "mobile/src/core/api/to-message-response.ts"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/mobile/src/core/api/to-message-response.ts"
  module: "mobile/src/core/api"
  workspace: "mobile"
  language: "TypeScript"
  symbolCount: 1
---

# mobile/src/core/api/to-message-response.ts

- Overview: [emplus Docs Wiki](../../../../../../index.md)
- Summary: [SUMMARY](../../../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../../../features/index.md)
- Module: [mobile/src/core/api](../../../../../modules/mobile/src/core/api.md)
- Workspace: [@emplus/mobile](../../../../../../workspaces/mobile.md)

## Snapshot

- Language: TypeScript
- Source path: `/Users/truongdq/tx/GitHub/emplus/mobile/src/core/api/to-message-response.ts`
- Lines: 26
- Symbols: 1

## Related Features

- [Notifications Notify](../../../../../../features/notification-notify.md) - Notifications Notify captures the notify workflow inside notifications. It spans 2 workspaces.
- [Search Notify](../../../../../../features/search-notify.md) - Search Notify captures the notify workflow inside search. It spans 2 workspaces.
- [Integrations Notify](../../../../../../features/integration-notify.md) - Integrations Notify captures the notify workflow inside integrations. It spans 2 workspaces.
- [User Management Notify](../../../../../../features/user-notify.md) - User Management Notify captures the notify workflow inside user management. It spans 2 workspaces.
- [Storage Notify](../../../../../../features/storage-notify.md) - Storage Notify captures the notify workflow inside storage. It spans 2 workspaces.
- [Administration Notify](../../../../../../features/admin-notify.md) - Administration Notify captures the notify workflow inside administration. It spans 2 workspaces.

## AI Summary

An internal function to construct API response messages for error cases.

### Responsibilities

- /Error/Response

### Usage Notes

- /api/v1/toMessageFromResponse

## Public API

- `function toMessageFromResponse( status: number, payload: unknown, fallback: string, ): { message: string; code?: string; details?: unknown[]; requestId?: string }` — The function to be used by default.

## Symbols

### function `toMessageFromResponse`

- Signature: `function toMessageFromResponse( status: number, payload: unknown, fallback: string, ): { message: string; code?: string; details?: unknown[]; requestId?: string }`
- Lines: 5-25
- Exported: yes
- Summary: The function to be used by default.

```ts
function toMessageFromResponse(
  status: number,
  payload: unknown,
  fallback: string,
): { message: string; code?: string; details?: unknown[]; requestId?: string } {
  if (!isRecord(payload)) {
    return { message: fallback };
  }

  const maybeFailure = payload as unknown as ApiFailure;
  const code = maybeFailure.error?.code;
  const message = maybeFailure.error?.message ?? fallback;
  const details = maybeFailure.error?.details;
  const requestId = maybeFailure.meta?.requestId;

  if (status >= 500 && message === fallback) {
    return { message: MESSAGES_ERRORS.SERVER_ERROR, code, details, requestId };
  }

  return { message, code, details, requestId };
}
```
