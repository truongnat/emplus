---
title: "mobile/app/forgot-password.tsx"
description: "The ForgotPasswordScreen function component in the mobile/app/forgot-password.tsx file."
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
  page: "reference/files/mobile/app/forgot-password.tsx.md"
  relativePath: "mobile/app/forgot-password.tsx"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/mobile/app/forgot-password.tsx"
  module: "mobile/app"
  workspace: "mobile"
  language: "TypeScript"
  symbolCount: 1
---

# mobile/app/forgot-password.tsx

- Overview: [emplus Docs Wiki](../../../../index.md)
- Summary: [SUMMARY](../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../features/index.md)
- Module: [mobile/app](../../../modules/mobile/app.md)
- Workspace: [@emplus/mobile](../../../../workspaces/mobile.md)

## Snapshot

- Language: TypeScript
- Source path: `/Users/truongdq/tx/GitHub/emplus/mobile/app/forgot-password.tsx`
- Lines: 17
- Symbols: 1

## Related Features

- [Authentication Login](../../../../features/auth-login.md) - Authentication Login captures the login workflow inside authentication. It spans 2 workspaces. Key flows include Auth login, Auth registration, Auth login.
- [Storage Login](../../../../features/storage-login.md) - Storage Login captures the login workflow inside storage. It spans 2 workspaces. Key flows include Auth login, Auth registration, Auth login.
- [Authentication Password Reset](../../../../features/auth-reset.md) - Authentication Password Reset captures the password reset workflow inside authentication. It spans 3 workspaces. Key flows include Password reset, Password reset, Password reset.

## AI Summary

The ForgotPasswordScreen function component in the mobile/app/forgot-password.tsx file.

### Responsibilities

- renders a grid screen with a hero section, an auth form, and a login footer

## Public API

- `function ForgotPasswordScreen()`

## Symbols

### function `ForgotPasswordScreen`

- Signature: `function ForgotPasswordScreen()`
- Lines: 8-16
- Exported: yes

```tsx
function ForgotPasswordScreen() {
  return (
    <AuthGridScreenShell centerContent>
      <ForgotPasswordHeroSection />
      <ForgotPasswordAuthForm />
      <ForgotPasswordLoginFooter />
    </AuthGridScreenShell>
  );
}
```
