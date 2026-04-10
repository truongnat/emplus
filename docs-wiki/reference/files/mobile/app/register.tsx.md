---
title: "mobile/app/register.tsx"
description: "The RegisterScreen function configuration"
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
  page: "reference/files/mobile/app/register.tsx.md"
  relativePath: "mobile/app/register.tsx"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/mobile/app/register.tsx"
  module: "mobile/app"
  workspace: "mobile"
  language: "TypeScript"
  symbolCount: 1
---

# mobile/app/register.tsx

- Overview: [emplus Docs Wiki](../../../../index.md)
- Summary: [SUMMARY](../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../features/index.md)
- Module: [mobile/app](../../../modules/mobile/app.md)
- Workspace: [@emplus/mobile](../../../../workspaces/mobile.md)

## Snapshot

- Language: TypeScript
- Source path: `/Users/truongdq/tx/GitHub/emplus/mobile/app/register.tsx`
- Lines: 17
- Symbols: 1

## Related Features

- [Authentication Login](../../../../features/auth-login.md) - Authentication Login captures the login workflow inside authentication. It spans 2 workspaces. Key flows include Auth login, Auth registration, Auth login.

## AI Summary

The RegisterScreen function configuration

## Public API

- `function RegisterScreen()`

## Symbols

### function `RegisterScreen`

- Signature: `function RegisterScreen()`
- Lines: 8-16
- Exported: yes

```tsx
function RegisterScreen() {
  return (
    <AuthGridScreenShell>
      <RegisterHeroSection />
      <RegisterAuthForm />
      <RegisterLoginFooter />
    </AuthGridScreenShell>
  );
}
```
