---
title: "api/src/dto/couples.dto.ts"
description: "Validates the input data for a couple relationship."
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
  page: "reference/files/api/src/dto/couples.dto.ts.md"
  relativePath: "api/src/dto/couples.dto.ts"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/api/src/dto/couples.dto.ts"
  module: "api/src/dto"
  workspace: "api"
  language: "TypeScript"
  symbolCount: 2
---

# api/src/dto/couples.dto.ts

- Overview: [emplus Docs Wiki](../../../../../index.md)
- Summary: [SUMMARY](../../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../../features/index.md)
- Module: [api/src/dto](../../../../modules/api/src/dto.md)
- Workspace: [@emplus/api](../../../../../workspaces/api.md)

## Snapshot

- Language: TypeScript
- Source path: `/Users/truongdq/tx/GitHub/emplus/api/src/dto/couples.dto.ts`
- Lines: 15
- Symbols: 2

## Related Features

- [Authentication Verification](../../../../../features/auth-verify.md) - Authentication Verification captures the verification workflow inside authentication. It spans 2 workspaces. Key flows include Credential validation, Auth login, Auth login.
- [Notifications Verification](../../../../../features/notification-verify.md) - Notifications Verification captures the verification workflow inside notifications. It spans 2 workspaces. Key flows include Credential validation, Auth login, Auth login.
- [Storage Verification](../../../../../features/storage-verify.md) - Storage Verification captures the verification workflow inside storage. It spans 2 workspaces. Key flows include Credential validation, Auth login, Auth login.
- [Administration Verification](../../../../../features/admin-verify.md) - Administration Verification captures the verification workflow inside administration. It spans 2 workspaces. Key flows include Credential validation, Auth login, Auth login.
- [Integrations Verification](../../../../../features/integration-verify.md) - Integrations Verification captures the verification workflow inside integrations. It spans 2 workspaces. Key flows include Credential validation, Auth login, Auth login.
- [Reporting Verification](../../../../../features/reporting-verify.md) - Reporting Verification captures the verification workflow inside reporting. It spans 2 workspaces. Key flows include Credential validation, Auth login, Auth login.
- [Order Management Verification](../../../../../features/order-verify.md) - Order Management Verification captures the verification workflow inside order management. It spans 2 workspaces. Key flows include Credential validation, Auth login, Auth login.

## AI Summary

Validates the input data for a couple relationship.

### Responsibilities

- Input validation logic

### Usage Notes

- Functionality for handling invalid couple inputs

## Public API

- `type JoinCoupleDto = z.infer<typeof joinCoupleSchema>;`
- `function validateJoinCoupleInput(input: unknown): JoinCoupleDto`

## Symbols

### type `JoinCoupleDto`

- Signature: `type JoinCoupleDto = z.infer<typeof joinCoupleSchema>;`
- Lines: 8-8
- Exported: yes

```ts
type JoinCoupleDto = z.infer<typeof joinCoupleSchema>;
```

### function `validateJoinCoupleInput`

- Signature: `function validateJoinCoupleInput(input: unknown): JoinCoupleDto`
- Lines: 10-14
- Exported: yes

```ts
function validateJoinCoupleInput(input: unknown): JoinCoupleDto {
  return parseWithSchema(joinCoupleSchema, input, {
    message: "Dữ liệu ghép đôi không hợp lệ.",
  });
}
```
