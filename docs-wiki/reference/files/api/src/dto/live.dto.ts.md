---
title: "api/src/dto/live.dto.ts"
description: "Provides 2 documented symbols in api/src/dto/live.dto.ts."
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
  page: "reference/files/api/src/dto/live.dto.ts.md"
  relativePath: "api/src/dto/live.dto.ts"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/api/src/dto/live.dto.ts"
  module: "api/src/dto"
  workspace: "api"
  language: "TypeScript"
  symbolCount: 2
---

# api/src/dto/live.dto.ts

- Overview: [emplus Docs Wiki](../../../../../index.md)
- Summary: [SUMMARY](../../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../../features/index.md)
- Module: [api/src/dto](../../../../modules/api/src/dto.md)
- Workspace: [@emplus/api](../../../../../workspaces/api.md)

## Snapshot

- Language: TypeScript
- Source path: `/Users/truongdq/tx/GitHub/emplus/api/src/dto/live.dto.ts`
- Lines: 16
- Symbols: 2

## Related Features

- [Authentication Login](../../../../../features/auth-login.md) - Authentication Login captures the login workflow inside authentication. It spans 2 workspaces. Key flows include Auth login, Auth registration, Auth login.
- [User Management Login](../../../../../features/user-login.md) - User Management Login captures the login workflow inside user management. It spans 2 workspaces. Key flows include Auth login, Auth registration, Auth login.
- [Search Login](../../../../../features/search-login.md) - Search Login captures the login workflow inside search. It spans 2 workspaces. Key flows include Auth login, Auth registration, Auth login.
- [Order Management Login](../../../../../features/order-login.md) - Order Management Login captures the login workflow inside order management. It spans 2 workspaces. Key flows include Auth login, Auth login, Auth login.
- [Notifications Login](../../../../../features/notification-login.md) - Notifications Login captures the login workflow inside notifications. It spans 2 workspaces. Key flows include Auth login, Auth registration, Auth login.
- [Storage Login](../../../../../features/storage-login.md) - Storage Login captures the login workflow inside storage. It spans 2 workspaces. Key flows include Auth login, Auth registration, Auth login.
- [Authentication Verification](../../../../../features/auth-verify.md) - Authentication Verification captures the verification workflow inside authentication. It spans 2 workspaces. Key flows include Credential validation, Auth login, Auth login.
- [Integrations Login](../../../../../features/integration-login.md) - Integrations Login captures the login workflow inside integrations. It spans 2 workspaces. Key flows include Auth login, Auth registration, Auth login.
- [Administration Login](../../../../../features/admin-login.md) - Administration Login captures the login workflow inside administration. It spans 2 workspaces. Key flows include Auth login, Auth registration, Auth login.
- [Reporting Login](../../../../../features/reporting-login.md) - Reporting Login captures the login workflow inside reporting. It spans 2 workspaces. Key flows include Auth login, Auth registration, Auth login.
- [Notifications Verification](../../../../../features/notification-verify.md) - Notifications Verification captures the verification workflow inside notifications. It spans 2 workspaces. Key flows include Credential validation, Auth login, Auth login.
- [Storage Verification](../../../../../features/storage-verify.md) - Storage Verification captures the verification workflow inside storage. It spans 2 workspaces. Key flows include Credential validation, Auth login, Auth login.
- [Administration Verification](../../../../../features/admin-verify.md) - Administration Verification captures the verification workflow inside administration. It spans 2 workspaces. Key flows include Credential validation, Auth login, Auth login.
- [Integrations Verification](../../../../../features/integration-verify.md) - Integrations Verification captures the verification workflow inside integrations. It spans 2 workspaces. Key flows include Credential validation, Auth login, Auth login.
- [Reporting Verification](../../../../../features/reporting-verify.md) - Reporting Verification captures the verification workflow inside reporting. It spans 2 workspaces. Key flows include Credential validation, Auth login, Auth login.
- [Order Management Verification](../../../../../features/order-verify.md) - Order Management Verification captures the verification workflow inside order management. It spans 2 workspaces. Key flows include Credential validation, Auth login, Auth login.

## AI Summary

Provides 2 documented symbols in api/src/dto/live.dto.ts.

## Public API

- `type WebsocketAuthQueryDto = z.infer<typeof websocketAuthQuerySchema>;`
- `function validateWebsocketAuthQuery(input: unknown): WebsocketAuthQueryDto`

## Symbols

### type `WebsocketAuthQueryDto`

- Signature: `type WebsocketAuthQueryDto = z.infer<typeof websocketAuthQuerySchema>;`
- Lines: 9-9
- Exported: yes

```ts
type WebsocketAuthQueryDto = z.infer<typeof websocketAuthQuerySchema>;
```

### function `validateWebsocketAuthQuery`

- Signature: `function validateWebsocketAuthQuery(input: unknown): WebsocketAuthQueryDto`
- Lines: 11-15
- Exported: yes

```ts
function validateWebsocketAuthQuery(input: unknown): WebsocketAuthQueryDto {
  return parseWithSchema(websocketAuthQuerySchema, input, {
    message: "Query xác thực websocket không hợp lệ.",
  });
}
```
