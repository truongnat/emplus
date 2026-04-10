---
title: "mobile/src/presentation/hooks/auth/useAuth.ts"
description: "The `useAuth` hook is responsible for managing authentication state and interactions."
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
  page: "reference/files/mobile/src/presentation/hooks/auth/useAuth.ts.md"
  relativePath: "mobile/src/presentation/hooks/auth/useAuth.ts"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/mobile/src/presentation/hooks/auth/useAuth.ts"
  module: "mobile/src/presentation/hooks/auth"
  workspace: "mobile"
  language: "TypeScript"
  symbolCount: 1
---

# mobile/src/presentation/hooks/auth/useAuth.ts

- Overview: [emplus Docs Wiki](../../../../../../../index.md)
- Summary: [SUMMARY](../../../../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../../../../features/index.md)
- Module: [mobile/src/presentation/hooks/auth](../../../../../../modules/mobile/src/presentation/hooks/auth.md)
- Workspace: [@emplus/mobile](../../../../../../../workspaces/mobile.md)

## Snapshot

- Language: TypeScript
- Source path: `/Users/truongdq/tx/GitHub/emplus/mobile/src/presentation/hooks/auth/useAuth.ts`
- Lines: 61
- Symbols: 1

## Related Features

- [Authentication Login](../../../../../../../features/auth-login.md) - Authentication Login captures the login workflow inside authentication. It spans 2 workspaces. Key flows include Auth login, Auth registration, Auth login.
- [User Management Login](../../../../../../../features/user-login.md) - User Management Login captures the login workflow inside user management. It spans 2 workspaces. Key flows include Auth login, Auth registration, Auth login.
- [Search Login](../../../../../../../features/search-login.md) - Search Login captures the login workflow inside search. It spans 2 workspaces. Key flows include Auth login, Auth registration, Auth login.
- [Integrations Login](../../../../../../../features/integration-login.md) - Integrations Login captures the login workflow inside integrations. It spans 2 workspaces. Key flows include Auth login, Auth registration, Auth login.

## AI Summary

The `useAuth` hook is responsible for managing authentication state and interactions.

### Usage Notes

- A hook that provides various methods to interact with the authentication system, such as logging in, registering, and logging out.

## Public API

- `function useAuth()`

## Symbols

### function `useAuth`

- Signature: `function useAuth()`
- Lines: 11-55
- Exported: yes

```ts
function useAuth() {
  const sessionCtx = useSession();

  const login = useLogin();
  const register = useRegister();
  const logout = useLogout({ showToast: false }); // Let caller decide

  return useMemo(
    () => ({
      // Session state
      user: sessionCtx.session?.user ?? null,
      session: sessionCtx.session,
      isAuthenticated: sessionCtx.isAuthenticated,
      isHydrated: sessionCtx.hydrated,
      isLoading: !sessionCtx.hydrated,

      // Auth actions
      login: login.mutate,
      register: register.mutate,
      logout: logout.logout,

      // Auth states
      isLoggingIn: login.isPending,
      isRegistering: register.isPending,
      isLoggingOut: logout.isLoggingOut,

      // Errors
      loginError: login.error,
      registerError: register.error,
      logoutError: logout.logoutError,

      // Reset functions
      resetLoginError: login.reset,
      resetRegisterError: register.reset,
      resetLogoutError: logout.reset,

      // Helper methods
      setSession: sessionCtx.setSession,
      clearSession: sessionCtx.clearSession,
      refreshAuth: sessionCtx.refreshAuth,
      withAccessToken: sessionCtx.withAccessToken,
    }),
    [sessionCtx, login, register, logout],
  );
}
```
