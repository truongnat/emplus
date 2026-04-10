---
title: "mobile/src/domain/repositories/notifications.repository.ts"
description: "NotificationsRepository interface definition."
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
  page: "reference/files/mobile/src/domain/repositories/notifications.repository.ts.md"
  relativePath: "mobile/src/domain/repositories/notifications.repository.ts"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/mobile/src/domain/repositories/notifications.repository.ts"
  module: "mobile/src/domain/repositories"
  workspace: "mobile"
  language: "TypeScript"
  symbolCount: 1
---

# mobile/src/domain/repositories/notifications.repository.ts

- Overview: [emplus Docs Wiki](../../../../../../index.md)
- Summary: [SUMMARY](../../../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../../../features/index.md)
- Module: [mobile/src/domain/repositories](../../../../../modules/mobile/src/domain/repositories.md)
- Workspace: [@emplus/mobile](../../../../../../workspaces/mobile.md)

## Snapshot

- Language: TypeScript
- Source path: `/Users/truongdq/tx/GitHub/emplus/mobile/src/domain/repositories/notifications.repository.ts`
- Lines: 10
- Symbols: 1

## AI Summary

NotificationsRepository interface definition.

### Responsibilities

- Defines methods for managing notifications.

### Usage Notes

- - Provides a contract for implementing notification interfaces.

## Public API

- `interface NotificationsRepository`

## Symbols

### interface `NotificationsRepository`

- Signature: `interface NotificationsRepository`
- Lines: 3-9
- Exported: yes

```ts
interface NotificationsRepository {
  list(
    params: NotificationModule.ListQueryParams,
  ): Promise<NotificationModule.ListResponse>;
  markRead(id: string): Promise<NotificationModule.MarkReadResponse>;
  markAllRead(): Promise<NotificationModule.MarkAllReadResponse>;
}
```
