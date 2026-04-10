---
title: "mobile/src/framework/ctx/session-context.tsx"
description: "SessionProvider uses SessionContext to manage authentication session and refresh API token."
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
  page: "reference/files/mobile/src/framework/ctx/session-context.tsx.md"
  relativePath: "mobile/src/framework/ctx/session-context.tsx"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/mobile/src/framework/ctx/session-context.tsx"
  module: "mobile/src/framework/ctx"
  workspace: "mobile"
  language: "TypeScript"
  symbolCount: 3
---

# mobile/src/framework/ctx/session-context.tsx

- Overview: [emplus Docs Wiki](../../../../../../index.md)
- Summary: [SUMMARY](../../../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../../../features/index.md)
- Module: [mobile/src/framework/ctx](../../../../../modules/mobile/src/framework/ctx.md)
- Workspace: [@emplus/mobile](../../../../../../workspaces/mobile.md)

## Snapshot

- Language: TypeScript
- Source path: `/Users/truongdq/tx/GitHub/emplus/mobile/src/framework/ctx/session-context.tsx`
- Lines: 212
- Symbols: 3

## Related Features

- [Authentication Login](../../../../../../features/auth-login.md) - Authentication Login captures the login workflow inside authentication. It spans 2 workspaces. Key flows include Auth login, Auth registration, Auth login.
- [Storage Login](../../../../../../features/storage-login.md) - Storage Login captures the login workflow inside storage. It spans 2 workspaces. Key flows include Auth login, Auth registration, Auth login.
- [Integrations Login](../../../../../../features/integration-login.md) - Integrations Login captures the login workflow inside integrations. It spans 2 workspaces. Key flows include Auth login, Auth registration, Auth login.

## AI Summary

SessionProvider uses SessionContext to manage authentication session and refresh API token.

## Public API

- `function SessionProvider({ children }: { children: ReactNode })`
- `useSession = () => { return useContext(SessionContext); }`

## Symbols

### function `SessionProvider`

- Signature: `function SessionProvider({ children }: { children: ReactNode })`
- Lines: 48-207
- Exported: yes

```tsx
function SessionProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<AuthModule.SessionPayload | null>(null);
  const [hydrated, setHydrated] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const refreshAuthRef = useRef<() => Promise<string | null>>(async () => null);

  /**
   * Đồng bộ token vào singleton ngay trong render (không chỉ useEffect).
   * Nếu chỉ dùng useEffect, effect con (Query, debounce, unmount flush) có thể
   * gọi API trước effect cha → ApiClient không có Bearer → 401/“Thiếu bearer token”.
   */
  tokenManager.setAccessToken(session?.tokens?.accessToken ?? null);

  const clearSession = useCallback(async () => {
    setSession(null);
    await storage.clearAllSession();
  }, []);

  const refreshAuth = useCallback(async (): Promise<string | null> => {
    if (isRefreshing) return null;

    setIsRefreshing(true);
    try {
      const currentTokens = await storage.auth.getTokens();
      const refreshToken = currentTokens?.refreshToken?.trim();
      if (!refreshToken) {
        await clearSession();
        return null;
      }
      const nextTokens = await refreshSessionUseCase.execute(refreshToken);
      setSession((prev) => (prev ? { ...prev, tokens: nextTokens } : null));
      return nextTokens.accessToken;
    } catch (error) {
      if (error instanceof ApiError) {
        if (error.isNetworkError() || error.status >= 500) {
          return null;
        }
        await clearSession();
        return null;
      }
      console.warn("refreshAuth unexpected error:", error);
      return null;
    } finally {
      setIsRefreshing(false);
    }
  }, [clearSession, isRefreshing]);

  refreshAuthRef.current = refreshAuth;

  useEffect(() => {
    tokenManager.setRefreshHandler(refreshAuth);
  }, [refreshAuth]);

  const withAccessToken = useCallback(
    async <T,>(operation: (token: string) => Promise<T>): Promise<T> => {
      const token = session?.tokens?.accessToken;
      if (!token) {
        throw new Error("No access token available - user must login");
      }
      return operation(token);
    },
    [session?.tokens?.accessToken],
  );

  useEffect(() => {
    let active = true;
    const init = async () => {
      try {
        const [tokens, meta] = await Promise.all([
          storage.auth.getTokens(),
          storage.user.getMetadata(),
        ]);
        if (__DEV__) console.log("Session init:", { hasTokens: !!tokens, hasMeta: !!meta });
        if (tokens && active) {
          const user = meta?.user || null;
          setSession({ user, tokens });

          try {
            await refreshAuthRef.current();
            const currentTokens = await storage.auth.getTokens();
            if (currentTokens?.accessToken && active) {
              try {
                const latestUser = await getProfileUseCase.execute();
                if (active) {
                  setSession((prev) =>
                    prev ? { ...prev, user: latestUser } : null,
                  );
                }
              } catch (err) {
                notifySessionOrTokenFailure(err);
                if (err instanceof ApiError && err.isUnauthorized()) {
                  void clearSession();
                }
              }
            }
          } catch (err) {
            notifySessionOrTokenFailure(err);
            if (err instanceof ApiError && err.isUnauthorized()) {
              void clearSession();
            }
          }
        }
      } catch (error) {
        console.error("Session init error:", error);
      } finally {
        if (active) setHydrated(true);
      }
    };
    void init();
    return () => {
      active = false;
    };
  }, [clearSession]);

  // Handle changes in session state (like auto-saving to storage)

  useEffect(() => {
    if (hydrated && session) {
      if (session.tokens) void storage.auth.setTokens(session.tokens);
      if (session.user) void storage.user.setMetadata({ user: session.user });
    }
  }, [session, hydrated]);

  useEffect(() => {
    const tokens = session?.tokens;
    if (!tokens?.expiresIn || !tokens?.accessToken) return;
    const delay = Math.max(
      0,
      tokens.expiresIn * 1000 - appConfig.auth.silentRefreshBufferMs,
    );
    const timer = setTimeout(() => void refreshAuth(), delay);
    return () => clearTimeout(timer);
  }, [session?.tokens, refreshAuth]);

  useEffect(() => {
    const sub = AppState.addEventListener("change", (state) => {
      if (state === "active" && session?.tokens?.refreshToken && !isRefreshing) {
        void refreshAuth();
      }
    });
    return () => sub.remove();
  }, [refreshAuth, session?.tokens?.refreshToken, isRefreshing]);

  const value = useMemo(
    () => ({
      session,
      hydrated,
      isAuthenticated: !!session?.tokens?.accessToken,
      setSession,
      clearSession,
      refreshAuth: async () => !!(await refreshAuth()),
      withAccessToken,
    }),
    [session, hydrated, clearSession, refreshAuth, withAccessToken],
  );

  return (
    <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
  );
}
```

### function `useSession`

- Signature: `useSession = () => { return useContext(SessionContext); }`
- Lines: 209-211
- Exported: yes

```tsx
useSession = () => {
  return useContext(SessionContext);
}
```

### interface `SessionContextValue`

- Signature: `interface SessionContextValue`
- Lines: 26-36
- Exported: no

```tsx
interface SessionContextValue {
  session: AuthModule.SessionPayload | null;
  hydrated: boolean;
  isAuthenticated: boolean;
  setSession: Dispatch<SetStateAction<AuthModule.SessionPayload | null>>;
  clearSession: () => void;
  refreshAuth: () => Promise<boolean>;
  withAccessToken: <T>(
    operation: (accessToken: string) => Promise<T>,
  ) => Promise<T>;
}
```
