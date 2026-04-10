---
title: "api/src/dto/user.dto.ts"
description: "User Data Transfer Object (DTO) definitions for API endpoints"
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
  page: "reference/files/api/src/dto/user.dto.ts.md"
  relativePath: "api/src/dto/user.dto.ts"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/api/src/dto/user.dto.ts"
  module: "api/src/dto"
  workspace: "api"
  language: "TypeScript"
  symbolCount: 5
---

# api/src/dto/user.dto.ts

- Overview: [emplus Docs Wiki](../../../../../index.md)
- Summary: [SUMMARY](../../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../../features/index.md)
- Module: [api/src/dto](../../../../modules/api/src/dto.md)
- Workspace: [@emplus/api](../../../../../workspaces/api.md)

## Snapshot

- Language: TypeScript
- Source path: `/Users/truongdq/tx/GitHub/emplus/api/src/dto/user.dto.ts`
- Lines: 83
- Symbols: 5

## Related Features

- [Notifications Notify](../../../../../features/notification-notify.md) - Notifications Notify captures the notify workflow inside notifications. It spans 2 workspaces.
- [Search Notify](../../../../../features/search-notify.md) - Search Notify captures the notify workflow inside search. It spans 2 workspaces.
- [Authentication Verification](../../../../../features/auth-verify.md) - Authentication Verification captures the verification workflow inside authentication. It spans 2 workspaces. Key flows include Credential validation, Auth login, Auth login.
- [Integrations Notify](../../../../../features/integration-notify.md) - Integrations Notify captures the notify workflow inside integrations. It spans 2 workspaces.
- [User Management Notify](../../../../../features/user-notify.md) - User Management Notify captures the notify workflow inside user management. It spans 2 workspaces.
- [Storage Notify](../../../../../features/storage-notify.md) - Storage Notify captures the notify workflow inside storage. It spans 2 workspaces.
- [Notifications Verification](../../../../../features/notification-verify.md) - Notifications Verification captures the verification workflow inside notifications. It spans 2 workspaces. Key flows include Credential validation, Auth login, Auth login.
- [Storage Verification](../../../../../features/storage-verify.md) - Storage Verification captures the verification workflow inside storage. It spans 2 workspaces. Key flows include Credential validation, Auth login, Auth login.
- [Administration Notify](../../../../../features/admin-notify.md) - Administration Notify captures the notify workflow inside administration. It spans 2 workspaces.
- [Administration Verification](../../../../../features/admin-verify.md) - Administration Verification captures the verification workflow inside administration. It spans 2 workspaces. Key flows include Credential validation, Auth login, Auth login.
- [Integrations Verification](../../../../../features/integration-verify.md) - Integrations Verification captures the verification workflow inside integrations. It spans 2 workspaces. Key flows include Credential validation, Auth login, Auth login.
- [Reporting Verification](../../../../../features/reporting-verify.md) - Reporting Verification captures the verification workflow inside reporting. It spans 2 workspaces. Key flows include Credential validation, Auth login, Auth login.
- [Order Management Verification](../../../../../features/order-verify.md) - Order Management Verification captures the verification workflow inside order management. It spans 2 workspaces. Key flows include Credential validation, Auth login, Auth login.
- [Order Management Notify](../../../../../features/order-notify.md) - Order Management Notify captures the notify workflow inside order management. It spans 2 workspaces.

## AI Summary

User Data Transfer Object (DTO) definitions for API endpoints

### Responsibilities

- To be used as input for user profile updates and push tokens

### Usage Notes

- Typically contains the necessary metadata for updating a user's profile or pushing a token to their device

## Public API

- `type UpdateProfileDto = z.infer<typeof updateProfileSchema>;`
- `function validateUpdateProfileInput(input: unknown): UpdateProfileDto` — Validation function for update profile input
- `type PushTokenDto = z.infer<typeof pushTokenSchema>;`
- `function validatePushTokenInput(input: unknown): PushTokenDto`

## Symbols

### type `UpdateProfileDto`

- Signature: `type UpdateProfileDto = z.infer<typeof updateProfileSchema>;`
- Lines: 64-64
- Exported: yes

```ts
type UpdateProfileDto = z.infer<typeof updateProfileSchema>;
```

### function `validateUpdateProfileInput`

- Signature: `function validateUpdateProfileInput(input: unknown): UpdateProfileDto`
- Lines: 66-70
- Exported: yes
- Summary: Validation function for update profile input

```ts
function validateUpdateProfileInput(input: unknown): UpdateProfileDto {
  return parseWithSchema(updateProfileSchema, input, {
    message: "Dữ liệu cập nhật hồ sơ không hợp lệ.",
  });
}
```

### type `PushTokenDto`

- Signature: `type PushTokenDto = z.infer<typeof pushTokenSchema>;`
- Lines: 76-76
- Exported: yes

```ts
type PushTokenDto = z.infer<typeof pushTokenSchema>;
```

### function `validatePushTokenInput`

- Signature: `function validatePushTokenInput(input: unknown): PushTokenDto`
- Lines: 78-82
- Exported: yes

```ts
function validatePushTokenInput(input: unknown): PushTokenDto {
  return parseWithSchema(pushTokenSchema, input, {
    message: "Dữ liệu push token không hợp lệ.",
  });
}
```

### function `optionalHttpImageUrl`

- Signature: `function optionalHttpImageUrl(fieldLabel: string)`
- Lines: 18-38
- Exported: no

```ts
function optionalHttpImageUrl(fieldLabel: string) {
  return z.preprocess((value) => {
    if (value == null) {
      return undefined;
    }
    if (typeof value !== "string") {
      return value;
    }
    return value.trim();
  }, z
    .union([
      z.literal(""),
      z
        .string()
        .max(2000, `${fieldLabel} tối đa 2000 ký tự.`)
        .refine((s) => /^https?:\/\//i.test(s), {
          message: `${fieldLabel} phải là URL http hoặc https.`,
        }),
    ])
    .optional());
}
```
