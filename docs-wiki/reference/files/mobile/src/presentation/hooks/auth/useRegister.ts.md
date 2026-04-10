---
title: "mobile/src/presentation/hooks/auth/useRegister.ts"
description: "The `useRegister` hook registers a user account in an authentication system."
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
  page: "reference/files/mobile/src/presentation/hooks/auth/useRegister.ts.md"
  relativePath: "mobile/src/presentation/hooks/auth/useRegister.ts"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/mobile/src/presentation/hooks/auth/useRegister.ts"
  module: "mobile/src/presentation/hooks/auth"
  workspace: "mobile"
  language: "TypeScript"
  symbolCount: 2
---

# mobile/src/presentation/hooks/auth/useRegister.ts

- Overview: [emplus Docs Wiki](../../../../../../../index.md)
- Summary: [SUMMARY](../../../../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../../../../features/index.md)
- Module: [mobile/src/presentation/hooks/auth](../../../../../../modules/mobile/src/presentation/hooks/auth.md)
- Workspace: [@emplus/mobile](../../../../../../../workspaces/mobile.md)

## Snapshot

- Language: TypeScript
- Source path: `/Users/truongdq/tx/GitHub/emplus/mobile/src/presentation/hooks/auth/useRegister.ts`
- Lines: 56
- Symbols: 2

## Related Features

- [Authentication Login](../../../../../../../features/auth-login.md) - Authentication Login captures the login workflow inside authentication. It spans 2 workspaces. Key flows include Auth login, Auth registration, Auth login.
- [User Management Login](../../../../../../../features/user-login.md) - User Management Login captures the login workflow inside user management. It spans 2 workspaces. Key flows include Auth login, Auth registration, Auth login.
- [Search Login](../../../../../../../features/search-login.md) - Search Login captures the login workflow inside search. It spans 2 workspaces. Key flows include Auth login, Auth registration, Auth login.
- [Integrations Login](../../../../../../../features/integration-login.md) - Integrations Login captures the login workflow inside integrations. It spans 2 workspaces. Key flows include Auth login, Auth registration, Auth login.

## AI Summary

The `useRegister` hook registers a user account in an authentication system.

## Public API

- `interface UseRegisterOptions`
- `function useRegister(options: UseRegisterOptions = {})`

## Symbols

### interface `UseRegisterOptions`

- Signature: `interface UseRegisterOptions`
- Lines: 8-15
- Exported: yes

```ts
interface UseRegisterOptions {
  /** Callback when registration succeeds */
  onSuccess?: (data: AuthModule.RegisterResponse) => void;
  /** Callback when registration fails */
  onError?: (error: Error) => void;
  /** Show toast notification */
  showToast?: boolean;
}
```

### function `useRegister`

- Signature: `function useRegister(options: UseRegisterOptions = {})`
- Lines: 30-55
- Exported: yes

```ts
function useRegister(options: UseRegisterOptions = {}) {
  const { onSuccess, onError, showToast = true } = options;
  const { setSession } = useSession();
  const { showToast: toast } = useToast();

  return useMutation<
    AuthModule.RegisterResponse,
    Error,
    AuthModule.RegisterRequest
  >({
    mutationFn: (params) => dependencies.auth.register.execute(params),
    onSuccess: (data) => {
      setSession(data);
      if (showToast) {
        toast("Đăng ký thành công", "success");
      }
      onSuccess?.(data);
    },
    onError: (error) => {
      if (showToast) {
        toast(toDisplayError(error), "error");
      }
      onError?.(error);
    },
  });
}
```
