---
title: "api/src/middleware/cors.ts"
description: "Check if the provided origin is localhost or 127.0.0.1 using its hostname"
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
  page: "reference/files/api/src/middleware/cors.ts.md"
  relativePath: "api/src/middleware/cors.ts"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/api/src/middleware/cors.ts"
  module: "api/src/middleware"
  workspace: "api"
  language: "TypeScript"
  symbolCount: 1
---

# api/src/middleware/cors.ts

- Overview: [emplus Docs Wiki](../../../../../index.md)
- Summary: [SUMMARY](../../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../../features/index.md)
- Module: [api/src/middleware](../../../../modules/api/src/middleware.md)
- Workspace: [@emplus/api](../../../../../workspaces/api.md)

## Snapshot

- Language: TypeScript
- Source path: `/Users/truongdq/tx/GitHub/emplus/api/src/middleware/cors.ts`
- Lines: 49
- Symbols: 1

## Related Features

- [Authentication Verification](../../../../../features/auth-verify.md) - Authentication Verification captures the verification workflow inside authentication. It spans 2 workspaces. Key flows include Credential validation, Auth login, Auth login.
- [Notifications Verification](../../../../../features/notification-verify.md) - Notifications Verification captures the verification workflow inside notifications. It spans 2 workspaces. Key flows include Credential validation, Auth login, Auth login.
- [Storage Verification](../../../../../features/storage-verify.md) - Storage Verification captures the verification workflow inside storage. It spans 2 workspaces. Key flows include Credential validation, Auth login, Auth login.
- [Administration Verification](../../../../../features/admin-verify.md) - Administration Verification captures the verification workflow inside administration. It spans 2 workspaces. Key flows include Credential validation, Auth login, Auth login.
- [Integrations Verification](../../../../../features/integration-verify.md) - Integrations Verification captures the verification workflow inside integrations. It spans 2 workspaces. Key flows include Credential validation, Auth login, Auth login.
- [Reporting Verification](../../../../../features/reporting-verify.md) - Reporting Verification captures the verification workflow inside reporting. It spans 2 workspaces. Key flows include Credential validation, Auth login, Auth login.
- [Order Management Verification](../../../../../features/order-verify.md) - Order Management Verification captures the verification workflow inside order management. It spans 2 workspaces. Key flows include Credential validation, Auth login, Auth login.

## AI Summary

Check if the provided origin is localhost or 127.0.0.1 using its hostname

### Responsibilities

- check origin

### Usage Notes

- [origin] should represent a valid URL (e.g., http://localhost, https://example.com)

## Symbols

### function `isLocalhostOrigin`

- Signature: `function isLocalhostOrigin(origin: string): boolean`
- Lines: 8-15
- Exported: no

```ts
function isLocalhostOrigin(origin: string): boolean {
  try {
    const target = new URL(origin);
    return target.hostname === "localhost" || target.hostname === "127.0.0.1";
  } catch {
    return false;
  }
}
```
