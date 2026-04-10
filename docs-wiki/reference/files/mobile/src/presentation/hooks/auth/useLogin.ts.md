---
title: "mobile/src/presentation/hooks/auth/useLogin.ts"
description: "The `useLogin` hook provides authentication functionality."
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
  page: "reference/files/mobile/src/presentation/hooks/auth/useLogin.ts.md"
  relativePath: "mobile/src/presentation/hooks/auth/useLogin.ts"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/mobile/src/presentation/hooks/auth/useLogin.ts"
  module: "mobile/src/presentation/hooks/auth"
  workspace: "mobile"
  language: "TypeScript"
  symbolCount: 2
---

# mobile/src/presentation/hooks/auth/useLogin.ts

- Overview: [emplus Docs Wiki](../../../../../../../index.md)
- Summary: [SUMMARY](../../../../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../../../../features/index.md)
- Module: [mobile/src/presentation/hooks/auth](../../../../../../modules/mobile/src/presentation/hooks/auth.md)
- Workspace: [@emplus/mobile](../../../../../../../workspaces/mobile.md)

## Snapshot

- Language: TypeScript
- Source path: `/Users/truongdq/tx/GitHub/emplus/mobile/src/presentation/hooks/auth/useLogin.ts`
- Lines: 60
- Symbols: 2

## Related Features

- [Authentication Login](../../../../../../../features/auth-login.md) - Authentication Login captures the login workflow inside authentication. It spans 2 workspaces. Key flows include Auth login, Auth registration, Auth login.
- [User Management Login](../../../../../../../features/user-login.md) - User Management Login captures the login workflow inside user management. It spans 2 workspaces. Key flows include Auth login, Auth registration, Auth login.
- [Search Login](../../../../../../../features/search-login.md) - Search Login captures the login workflow inside search. It spans 2 workspaces. Key flows include Auth login, Auth registration, Auth login.
- [Integrations Login](../../../../../../../features/integration-login.md) - Integrations Login captures the login workflow inside integrations. It spans 2 workspaces. Key flows include Auth login, Auth registration, Auth login.

## AI Summary

The `useLogin` hook provides authentication functionality.

### Responsibilities

- handle authentication workflows
- schedule login callbacks
- display toast notifications

### Usage Notes

- To use this hook, import and call it with an optional options object.

## Public API

- `interface UseLoginOptions`
- `function useLogin(options: UseLoginOptions = {})`

## Symbols

### interface `UseLoginOptions`

- Signature: `interface UseLoginOptions`
- Lines: 8-15
- Exported: yes

```ts
interface UseLoginOptions {
  /** Callback when login succeeds */
  onSuccess?: (data: AuthModule.LoginResponse) => void;
  /** Callback when login fails */
  onError?: (error: Error) => void;
  /** Show toast notification */
  showToast?: boolean;
}
```

### function `useLogin`

- Signature: `function useLogin(options: UseLoginOptions = {})`
- Lines: 30-59
- Exported: yes

```ts
function useLogin(options: UseLoginOptions = {}) {
  const { onSuccess, onError, showToast = true } = options;
  const { setSession } = useSession();
  const { showToast: toast } = useToast();

  return useMutation<AuthModule.LoginResponse, Error, AuthModule.LoginRequest>({
    mutationFn: (params) => dependencies.auth.login.execute(params),
    onSuccess: (data) => {
      if ("requiresOTP" in data && data.requiresOTP) {
        onSuccess?.(data);
        return;
      }
      if ("tokens" in data && data.tokens && "user" in data) {
        setSession(data);
        if (showToast) {
          toast("Đăng nhập thành công", "success");
        }
      }
      onSuccess?.(data);
    },
    onError: (error) => {
      const errorMessage = toDisplayError(error);

      if (showToast) {
        toast(errorMessage, "error");
      }
      onError?.(error);
    },
  });
}
```
