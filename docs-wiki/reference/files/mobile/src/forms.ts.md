---
title: "mobile/src/forms.ts"
description: "AuthFlowFields"
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
  page: "reference/files/mobile/src/forms.ts.md"
  relativePath: "mobile/src/forms.ts"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/mobile/src/forms.ts"
  module: "mobile/src"
  workspace: "mobile"
  language: "TypeScript"
  symbolCount: 5
---

# mobile/src/forms.ts

- Overview: [emplus Docs Wiki](../../../../index.md)
- Summary: [SUMMARY](../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../features/index.md)
- Module: [mobile/src](../../../modules/mobile/src.md)
- Workspace: [@emplus/mobile](../../../../workspaces/mobile.md)

## Snapshot

- Language: TypeScript
- Source path: `/Users/truongdq/tx/GitHub/emplus/mobile/src/forms.ts`
- Lines: 60
- Symbols: 5

## Related Features

- [Authentication Login](../../../../features/auth-login.md) - Authentication Login captures the login workflow inside authentication. It spans 2 workspaces. Key flows include Auth login, Auth registration, Auth login.
- [Notifications Notify](../../../../features/notification-notify.md) - Notifications Notify captures the notify workflow inside notifications. It spans 2 workspaces.
- [Notifications Login](../../../../features/notification-login.md) - Notifications Login captures the login workflow inside notifications. It spans 2 workspaces. Key flows include Auth login, Auth registration, Auth login.
- [Authentication Password Reset](../../../../features/auth-reset.md) - Authentication Password Reset captures the password reset workflow inside authentication. It spans 3 workspaces. Key flows include Password reset, Password reset, Password reset.

## AI Summary

AuthFlowFields

## Public API

- `type AuthFlowFields = z.infer<typeof AuthFlowSchema>;`
- `type OtpFields = z.infer<typeof OtpSchema>;`
- `type RegisterFields = z.infer<typeof RegisterSchema>;`
- `type ForgotPasswordFields = z.infer<typeof ForgotPasswordSchema>;`
- `type ResetPasswordFields = z.infer<typeof ResetPasswordSchema>;`

## Symbols

### type `AuthFlowFields`

- Signature: `type AuthFlowFields = z.infer<typeof AuthFlowSchema>;`
- Lines: 55-55
- Exported: yes

```ts
type AuthFlowFields = z.infer<typeof AuthFlowSchema>;
```

### type `OtpFields`

- Signature: `type OtpFields = z.infer<typeof OtpSchema>;`
- Lines: 56-56
- Exported: yes

```ts
type OtpFields = z.infer<typeof OtpSchema>;
```

### type `RegisterFields`

- Signature: `type RegisterFields = z.infer<typeof RegisterSchema>;`
- Lines: 57-57
- Exported: yes

```ts
type RegisterFields = z.infer<typeof RegisterSchema>;
```

### type `ForgotPasswordFields`

- Signature: `type ForgotPasswordFields = z.infer<typeof ForgotPasswordSchema>;`
- Lines: 58-58
- Exported: yes

```ts
type ForgotPasswordFields = z.infer<typeof ForgotPasswordSchema>;
```

### type `ResetPasswordFields`

- Signature: `type ResetPasswordFields = z.infer<typeof ResetPasswordSchema>;`
- Lines: 59-59
- Exported: yes

```ts
type ResetPasswordFields = z.infer<typeof ResetPasswordSchema>;
```
