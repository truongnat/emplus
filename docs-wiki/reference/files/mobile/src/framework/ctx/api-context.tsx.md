---
title: "mobile/src/framework/ctx/api-context.tsx"
description: "The `ApiContext` file sets up a network listener and uses a configured query client to manage queries in the app's persistence layer."
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
  page: "reference/files/mobile/src/framework/ctx/api-context.tsx.md"
  relativePath: "mobile/src/framework/ctx/api-context.tsx"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/mobile/src/framework/ctx/api-context.tsx"
  module: "mobile/src/framework/ctx"
  workspace: "mobile"
  language: "TypeScript"
  symbolCount: 3
---

# mobile/src/framework/ctx/api-context.tsx

- Overview: [emplus Docs Wiki](../../../../../../index.md)
- Summary: [SUMMARY](../../../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../../../features/index.md)
- Module: [mobile/src/framework/ctx](../../../../../modules/mobile/src/framework/ctx.md)
- Workspace: [@emplus/mobile](../../../../../../workspaces/mobile.md)

## Snapshot

- Language: TypeScript
- Source path: `/Users/truongdq/tx/GitHub/emplus/mobile/src/framework/ctx/api-context.tsx`
- Lines: 129
- Symbols: 3

## AI Summary

The `ApiContext` file sets up a network listener and uses a configured query client to manage queries in the app's persistence layer.

### Responsibilities

- sets up network listener
- uses configured query client

### Usage Notes

- This file is responsible for managing queries in the app's persistence layer by setting up a network listener and using a configured query client. It provides a context for React applications to use their API endpoints.

## Public API

- `function ApiContext({ children }: PropsWithChildren)`

## Symbols

### function `ApiContext`

- Signature: `function ApiContext({ children }: PropsWithChildren)`
- Lines: 101-125
- Exported: yes

```tsx
function ApiContext({ children }: PropsWithChildren) {
  useEffect(() => {
    setupNetworkListener();
  }, []);

  const queryClient = useConfiguredQueryClient();

  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{
        persister: asyncStoragePersister,
        dehydrateOptions: {
          shouldDehydrateQuery: (query) => {
            const k = query.queryKey[0];
            // Bộ nhớ timeline lớn; dashboard có loveDays/sự kiện — không persist để tránh số liệu cũ khi mở app.
            return k !== "timelineMemories" && k !== "dashboard";
          },
        },
      }}
    >
      {children}
    </PersistQueryClientProvider>
  );
}
```

### function `setupNetworkListener`

- Signature: `function setupNetworkListener()`
- Lines: 21-27
- Exported: no
- Summary: sets up a network listener that tracks whether the user is online, connected, and has an internet connection.

```tsx
function setupNetworkListener() {
  onlineManager.setEventListener((setOnline) => {
    return NetInfo.addEventListener((state) => {
      setOnline(!!state.isConnected && !!state.isInternetReachable);
    });
  });
}
```

### function `useConfiguredQueryClient`

- Signature: `function useConfiguredQueryClient()`
- Lines: 40-99
- Exported: no
- Summary: uses a configured query client to manage queries in the app's persistence layer.

```tsx
function useConfiguredQueryClient() {
  const { showToast } = useToast();
  const { clearSession } = useSession();

  const onGlobalApiError = useCallback(
    (error: unknown) => {
      if (!(error instanceof ApiError)) return;
      if (error.isUnauthorized()) {
        notifySessionOrTokenFailure(error);
        void clearSession();
        return;
      }
      if (error.isNetworkError()) {
        showToast(
          "Mất kết nối Internet. Vui lòng kiểm tra lại.",
          "warning",
        );
        return;
      }
      if (error.status >= 500) {
        showToast(
          "Hệ thống đang gặp sự cố. Thử lại sau ít phút.",
          "error",
        );
        return;
      }
      if (error.isForbidden()) {
        showToast("Bạn không có quyền thực hiện hành động này.", "error");
      }
    },
    [showToast, clearSession],
  );

  return useMemo(() => {
    const queryClient = new QueryClient({
      queryCache: new QueryCache({
        onError: onGlobalApiError,
      }),
      mutationCache: new MutationCache({
        onError: onGlobalApiError,
      }),
      defaultOptions: {
        queries: {
          staleTime: appConfig.api.staleTime,
          gcTime: appConfig.api.gcTime,
          retry: (count, error: unknown) => {
            if (error instanceof ApiError)
              return error.shouldRetry() && count < 2;
            return count < 2;
          },
          refetchOnWindowFocus: false,
          refetchOnReconnect: "always",
          networkMode: "always",
        },
      },
    });

    return queryClient;
  }, [onGlobalApiError]);
}
```
