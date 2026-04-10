---
title: "mobile/src/core/api/to-display-error.ts"
description: "Returns a human-readable error message based on the underlying exception"
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
  page: "reference/files/mobile/src/core/api/to-display-error.ts.md"
  relativePath: "mobile/src/core/api/to-display-error.ts"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/mobile/src/core/api/to-display-error.ts"
  module: "mobile/src/core/api"
  workspace: "mobile"
  language: "TypeScript"
  symbolCount: 1
---

# mobile/src/core/api/to-display-error.ts

- Overview: [emplus Docs Wiki](../../../../../../index.md)
- Summary: [SUMMARY](../../../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../../../features/index.md)
- Module: [mobile/src/core/api](../../../../../modules/mobile/src/core/api.md)
- Workspace: [@emplus/mobile](../../../../../../workspaces/mobile.md)

## Snapshot

- Language: TypeScript
- Source path: `/Users/truongdq/tx/GitHub/emplus/mobile/src/core/api/to-display-error.ts`
- Lines: 23
- Symbols: 1

## Related Features

- [Notifications Notify](../../../../../../features/notification-notify.md) - Notifications Notify captures the notify workflow inside notifications. It spans 2 workspaces.
- [Search Notify](../../../../../../features/search-notify.md) - Search Notify captures the notify workflow inside search. It spans 2 workspaces.
- [Integrations Notify](../../../../../../features/integration-notify.md) - Integrations Notify captures the notify workflow inside integrations. It spans 2 workspaces.
- [User Management Notify](../../../../../../features/user-notify.md) - User Management Notify captures the notify workflow inside user management. It spans 2 workspaces.
- [Storage Notify](../../../../../../features/storage-notify.md) - Storage Notify captures the notify workflow inside storage. It spans 2 workspaces.

## AI Summary

Returns a human-readable error message based on the underlying exception

### Responsibilities

- throws an error of type unknownError or ApiError
- returns an error string

### Usage Notes

- Must be called with an instance of ApiError or Error.

## Public API

- `function toDisplayError(error: unknown): string`

## Symbols

### function `toDisplayError`

- Signature: `function toDisplayError(error: unknown): string`
- Lines: 4-22
- Exported: yes

```ts
function toDisplayError(error: unknown): string {
  if (error instanceof ApiError) {
    return error.message;
  }

  if (error instanceof Error) {
    if (
      /fetch failed|failed to fetch|network request failed|network error|load failed/i.test(
        error.message,
      )
    ) {
      return MESSAGES_ERRORS.NETWORK_ERROR;
    }

    return error.message;
  }

  return MESSAGES_ERRORS.UNKNOWN_ERROR;
}
```
