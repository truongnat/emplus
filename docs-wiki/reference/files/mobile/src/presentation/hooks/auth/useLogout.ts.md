---
title: "mobile/src/presentation/hooks/auth/useLogout.ts"
description: "The `useLogout` hook provides a way to perform client-side logout functionality."
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
  page: "reference/files/mobile/src/presentation/hooks/auth/useLogout.ts.md"
  relativePath: "mobile/src/presentation/hooks/auth/useLogout.ts"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/mobile/src/presentation/hooks/auth/useLogout.ts"
  module: "mobile/src/presentation/hooks/auth"
  workspace: "mobile"
  language: "TypeScript"
  symbolCount: 2
---

# mobile/src/presentation/hooks/auth/useLogout.ts

- Overview: [emplus Docs Wiki](../../../../../../../index.md)
- Summary: [SUMMARY](../../../../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../../../../features/index.md)
- Module: [mobile/src/presentation/hooks/auth](../../../../../../modules/mobile/src/presentation/hooks/auth.md)
- Workspace: [@emplus/mobile](../../../../../../../workspaces/mobile.md)

## Snapshot

- Language: TypeScript
- Source path: `/Users/truongdq/tx/GitHub/emplus/mobile/src/presentation/hooks/auth/useLogout.ts`
- Lines: 57
- Symbols: 2

## Related Features

- [Authentication Login](../../../../../../../features/auth-login.md) - Authentication Login captures the login workflow inside authentication. It spans 2 workspaces. Key flows include Auth login, Auth registration, Auth login.
- [User Management Login](../../../../../../../features/user-login.md) - User Management Login captures the login workflow inside user management. It spans 2 workspaces. Key flows include Auth login, Auth registration, Auth login.
- [Search Login](../../../../../../../features/search-login.md) - Search Login captures the login workflow inside search. It spans 2 workspaces. Key flows include Auth login, Auth registration, Auth login.
- [Integrations Login](../../../../../../../features/integration-login.md) - Integrations Login captures the login workflow inside integrations. It spans 2 workspaces. Key flows include Auth login, Auth registration, Auth login.

## AI Summary

The `useLogout` hook provides a way to perform client-side logout functionality.

### Responsibilities

- to handle logout process
- to display toast notifications

### Usage Notes

- To use this hook, import it and call the `logout()` function.

## Public API

- `interface UseLogoutOptions`
- `function useLogout(options: UseLogoutOptions = {})`

## Symbols

### interface `UseLogoutOptions`

- Signature: `interface UseLogoutOptions`
- Lines: 7-14
- Exported: yes

```ts
interface UseLogoutOptions {
  /** Callback when logout succeeds */
  onSuccess?: () => void;
  /** Callback when logout fails */
  onError?: (error: Error) => void;
  /** Show toast notification */
  showToast?: boolean;
}
```

### function `useLogout`

- Signature: `function useLogout(options: UseLogoutOptions = {})`
- Lines: 20-56
- Exported: yes

```ts
function useLogout(options: UseLogoutOptions = {}) {
  const { onSuccess, onError, showToast = true } = options;
  const { clearSession } = useSession();
  const { showToast: toast } = useToast();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async () => {
      await clearSession();
      // Clear all queries from cache
      await queryClient.clear();
    },
    onSuccess: () => {
      if (showToast) {
        toast("Đăng xuất thành công", "success");
      }
      onSuccess?.();
    },
    onError: (error) => {
      if (showToast) {
        toast(toDisplayError(error), "error");
      }
      onError?.(error);
    },
  });

  const logout = useCallback(() => {
    mutation.mutate();
  }, [mutation]);

  return {
    logout,
    isLoggingOut: mutation.isPending,
    logoutError: mutation.error,
    reset: mutation.reset,
  };
}
```
