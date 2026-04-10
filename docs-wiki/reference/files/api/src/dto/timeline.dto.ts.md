---
title: "api/src/dto/timeline.dto.ts"
description: "TimelineQueryDto structure definitions."
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
  page: "reference/files/api/src/dto/timeline.dto.ts.md"
  relativePath: "api/src/dto/timeline.dto.ts"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/api/src/dto/timeline.dto.ts"
  module: "api/src/dto"
  workspace: "api"
  language: "TypeScript"
  symbolCount: 4
---

# api/src/dto/timeline.dto.ts

- Overview: [emplus Docs Wiki](../../../../../index.md)
- Summary: [SUMMARY](../../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../../features/index.md)
- Module: [api/src/dto](../../../../modules/api/src/dto.md)
- Workspace: [@emplus/api](../../../../../workspaces/api.md)

## Snapshot

- Language: TypeScript
- Source path: `/Users/truongdq/tx/GitHub/emplus/api/src/dto/timeline.dto.ts`
- Lines: 53
- Symbols: 4

## Related Features

- [Authentication Verification](../../../../../features/auth-verify.md) - Authentication Verification captures the verification workflow inside authentication. It spans 2 workspaces. Key flows include Credential validation, Auth login, Auth login.
- [Search Create](../../../../../features/search-create.md) - Search Create captures the create workflow inside search. It spans 2 workspaces.
- [User Management Create](../../../../../features/user-create.md) - User Management Create captures the create workflow inside user management. It spans 2 workspaces.
- [Notifications Verification](../../../../../features/notification-verify.md) - Notifications Verification captures the verification workflow inside notifications. It spans 2 workspaces. Key flows include Credential validation, Auth login, Auth login.
- [Storage Verification](../../../../../features/storage-verify.md) - Storage Verification captures the verification workflow inside storage. It spans 2 workspaces. Key flows include Credential validation, Auth login, Auth login.
- [Administration Verification](../../../../../features/admin-verify.md) - Administration Verification captures the verification workflow inside administration. It spans 2 workspaces. Key flows include Credential validation, Auth login, Auth login.
- [Integrations Verification](../../../../../features/integration-verify.md) - Integrations Verification captures the verification workflow inside integrations. It spans 2 workspaces. Key flows include Credential validation, Auth login, Auth login.
- [Reporting Verification](../../../../../features/reporting-verify.md) - Reporting Verification captures the verification workflow inside reporting. It spans 2 workspaces. Key flows include Credential validation, Auth login, Auth login.
- [Order Management Verification](../../../../../features/order-verify.md) - Order Management Verification captures the verification workflow inside order management. It spans 2 workspaces. Key flows include Credential validation, Auth login, Auth login.

## AI Summary

TimelineQueryDto structure definitions.

## Public API

- `type TimelineQueryDto = z.infer<typeof timelineQuerySchema>;`
- `type CreateMemoryDto = z.infer<typeof createMemorySchema>;`
- `function parseTimelineQueryParams(query: Record<string, string | undefined>): TimelineQueryDto`
- `function validateCreateMemoryInput(input: unknown): CreateMemoryDto`

## Symbols

### type `TimelineQueryDto`

- Signature: `type TimelineQueryDto = z.infer<typeof timelineQuerySchema>;`
- Lines: 39-39
- Exported: yes

```ts
type TimelineQueryDto = z.infer<typeof timelineQuerySchema>;
```

### type `CreateMemoryDto`

- Signature: `type CreateMemoryDto = z.infer<typeof createMemorySchema>;`
- Lines: 40-40
- Exported: yes

```ts
type CreateMemoryDto = z.infer<typeof createMemorySchema>;
```

### function `parseTimelineQueryParams`

- Signature: `function parseTimelineQueryParams(query: Record<string, string | undefined>): TimelineQueryDto`
- Lines: 42-46
- Exported: yes

```ts
function parseTimelineQueryParams(query: Record<string, string | undefined>): TimelineQueryDto {
  return parseWithSchema(timelineQuerySchema, query, {
    message: "Query timeline không hợp lệ.",
  });
}
```

### function `validateCreateMemoryInput`

- Signature: `function validateCreateMemoryInput(input: unknown): CreateMemoryDto`
- Lines: 48-52
- Exported: yes

```ts
function validateCreateMemoryInput(input: unknown): CreateMemoryDto {
  return parseWithSchema(createMemorySchema, input, {
    message: "Dữ liệu memory không hợp lệ.",
  });
}
```
