---
title: "mobile/src/presentation/hooks/auth/useForgotPasswordRequest.ts"
description: "Function to send forgotten password reset request."
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
  page: "reference/files/mobile/src/presentation/hooks/auth/useForgotPasswordRequest.ts.md"
  relativePath: "mobile/src/presentation/hooks/auth/useForgotPasswordRequest.ts"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/mobile/src/presentation/hooks/auth/useForgotPasswordRequest.ts"
  module: "mobile/src/presentation/hooks/auth"
  workspace: "mobile"
  language: "TypeScript"
  symbolCount: 1
---

# mobile/src/presentation/hooks/auth/useForgotPasswordRequest.ts

- Overview: [emplus Docs Wiki](../../../../../../../index.md)
- Summary: [SUMMARY](../../../../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../../../../features/index.md)
- Module: [mobile/src/presentation/hooks/auth](../../../../../../modules/mobile/src/presentation/hooks/auth.md)
- Workspace: [@emplus/mobile](../../../../../../../workspaces/mobile.md)

## Snapshot

- Language: TypeScript
- Source path: `/Users/truongdq/tx/GitHub/emplus/mobile/src/presentation/hooks/auth/useForgotPasswordRequest.ts`
- Lines: 15
- Symbols: 1

## Related Features

- [Authentication Login](../../../../../../../features/auth-login.md) - Authentication Login captures the login workflow inside authentication. It spans 2 workspaces. Key flows include Auth login, Auth registration, Auth login.
- [Search Login](../../../../../../../features/search-login.md) - Search Login captures the login workflow inside search. It spans 2 workspaces. Key flows include Auth login, Auth registration, Auth login.
- [Search Notify](../../../../../../../features/search-notify.md) - Search Notify captures the notify workflow inside search. It spans 2 workspaces.
- [Authentication Password Reset](../../../../../../../features/auth-reset.md) - Authentication Password Reset captures the password reset workflow inside authentication. It spans 3 workspaces. Key flows include Password reset, Password reset, Password reset.

## AI Summary

Function to send forgotten password reset request.

### Responsibilities

- unknown

### Usage Notes

- Request response is expected in a promise that resolves with an object containing a boolean.

## Public API

- `function useForgotPasswordRequest()`

## Symbols

### function `useForgotPasswordRequest`

- Signature: `function useForgotPasswordRequest()`
- Lines: 9-14
- Exported: yes

```ts
function useForgotPasswordRequest() {
  return useMutation({
    mutationFn: (email: string) =>
      dependencies.auth.requestPasswordReset.execute({ email }),
  });
}
```
