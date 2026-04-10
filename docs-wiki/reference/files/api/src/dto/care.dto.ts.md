---
title: "api/src/dto/care.dto.ts"
description: "SaveCycleDto and SaveMoodDto Data Transfer Objects (DTOs)"
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
  page: "reference/files/api/src/dto/care.dto.ts.md"
  relativePath: "api/src/dto/care.dto.ts"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/api/src/dto/care.dto.ts"
  module: "api/src/dto"
  workspace: "api"
  language: "TypeScript"
  symbolCount: 4
---

# api/src/dto/care.dto.ts

- Overview: [emplus Docs Wiki](../../../../../index.md)
- Summary: [SUMMARY](../../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../../features/index.md)
- Module: [api/src/dto](../../../../modules/api/src/dto.md)
- Workspace: [@emplus/api](../../../../../workspaces/api.md)

## Snapshot

- Language: TypeScript
- Source path: `/Users/truongdq/tx/GitHub/emplus/api/src/dto/care.dto.ts`
- Lines: 38
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

SaveCycleDto and SaveMoodDto Data Transfer Objects (DTOs)

### Responsibilities

- Validate input data from the application to ensure it conforms to expected schemas

### Usage Notes

- These DTOs are used to hold data that needs to be saved or updated in a database
- They provide a standardized way of representing this data, making it easier to integrate with different systems

## Public API

- `type SaveCycleDto = z.infer<typeof saveCycleSchema>;` — Type definition for SaveCycleDto
- `function validateSaveCycleInput(input: unknown): SaveCycleDto` — Validation function for SaveCycleDto
- `type SaveMoodDto = z.infer<typeof saveMoodSchema>;` — Type definition for SaveMoodDto
- `function validateSaveMoodInput(input: unknown): SaveMoodDto` — Validation function for SaveMoodDto

## Symbols

### type `SaveCycleDto`

- Signature: `type SaveCycleDto = z.infer<typeof saveCycleSchema>;`
- Lines: 16-16
- Exported: yes
- Summary: Type definition for SaveCycleDto

```ts
type SaveCycleDto = z.infer<typeof saveCycleSchema>;
```

### function `validateSaveCycleInput`

- Signature: `function validateSaveCycleInput(input: unknown): SaveCycleDto`
- Lines: 18-22
- Exported: yes
- Summary: Validation function for SaveCycleDto

```ts
function validateSaveCycleInput(input: unknown): SaveCycleDto {
  return parseWithSchema(saveCycleSchema, input, {
    message: "Dữ liệu chu kỳ không hợp lệ.",
  });
}
```

### type `SaveMoodDto`

- Signature: `type SaveMoodDto = z.infer<typeof saveMoodSchema>;`
- Lines: 31-31
- Exported: yes
- Summary: Type definition for SaveMoodDto

```ts
type SaveMoodDto = z.infer<typeof saveMoodSchema>;
```

### function `validateSaveMoodInput`

- Signature: `function validateSaveMoodInput(input: unknown): SaveMoodDto`
- Lines: 33-37
- Exported: yes
- Summary: Validation function for SaveMoodDto

```ts
function validateSaveMoodInput(input: unknown): SaveMoodDto {
  return parseWithSchema(saveMoodSchema, input, {
    message: "Dữ liệu tâm trạng không hợp lệ.",
  });
}
```
