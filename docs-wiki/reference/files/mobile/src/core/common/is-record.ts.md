---
title: "mobile/src/core/common/is-record.ts"
description: "Determines whether a value is of type `Record<string, unknown>`"
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
  page: "reference/files/mobile/src/core/common/is-record.ts.md"
  relativePath: "mobile/src/core/common/is-record.ts"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/mobile/src/core/common/is-record.ts"
  module: "mobile/src/core/common"
  workspace: "mobile"
  language: "TypeScript"
  symbolCount: 1
---

# mobile/src/core/common/is-record.ts

- Overview: [emplus Docs Wiki](../../../../../../index.md)
- Summary: [SUMMARY](../../../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../../../features/index.md)
- Module: [mobile/src/core/common](../../../../../modules/mobile/src/core/common.md)
- Workspace: [@emplus/mobile](../../../../../../workspaces/mobile.md)

## Snapshot

- Language: TypeScript
- Source path: `/Users/truongdq/tx/GitHub/emplus/mobile/src/core/common/is-record.ts`
- Lines: 4
- Symbols: 1

## Related Features

- [Notifications Notify](../../../../../../features/notification-notify.md) - Notifications Notify captures the notify workflow inside notifications. It spans 2 workspaces.
- [Search Notify](../../../../../../features/search-notify.md) - Search Notify captures the notify workflow inside search. It spans 2 workspaces.
- [Integrations Notify](../../../../../../features/integration-notify.md) - Integrations Notify captures the notify workflow inside integrations. It spans 2 workspaces.
- [User Management Notify](../../../../../../features/user-notify.md) - User Management Notify captures the notify workflow inside user management. It spans 2 workspaces.
- [Storage Notify](../../../../../../features/storage-notify.md) - Storage Notify captures the notify workflow inside storage. It spans 2 workspaces.

## AI Summary

Determines whether a value is of type `Record&lt;string, unknown&gt;`

### Responsibilities

- value can be of type `Record&lt;string, unknown&gt;`

### Usage Notes

- `isRecord` operator or the `Object.isRecord()` method are supported for consistency

## Public API

- `function isRecord(value: unknown): value is Record<string, unknown>`

## Symbols

### function `isRecord`

- Signature: `function isRecord(value: unknown): value is Record<string, unknown>`
- Lines: 1-3
- Exported: yes

```ts
function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}
```
