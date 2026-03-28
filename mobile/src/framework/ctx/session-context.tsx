import { AppState } from "react-native";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { ReactNode } from "react";

import { storage } from "@/src/core/common/storage";
import appConfig from "@/src/core/config/app-config";
import { AuthModule } from "@/src/domain/entities/schemas";
import { AuthRepositoryImpl } from "@/src/data/repositories/auth.repository.impl";
import { RefreshSessionUseCase, GetProfileUseCase } from "@/src/domain/usecases/auth";
import { tokenManager } from "@/src/core/api/token-manager";

const authRepo = new AuthRepositoryImpl();
const refreshSessionUseCase = new RefreshSessionUseCase(authRepo);
const getProfileUseCase = new GetProfileUseCase(authRepo);

interface SessionContextValue {
  session: AuthModule.SessionPayload | null;
  hydrated: boolean;
  isAuthenticated: boolean;
  setSession: (session: AuthModule.SessionPayload | null) => void;
  clearSession: () => void;
  refreshAuth: () => Promise<boolean>;
  withAccessToken: <T>(
    operation: (accessToken: string) => Promise<T>,
  ) => Promise<T>;
}

const SessionContext = createContext<SessionContextValue>({
  session: null,
  hydrated: false,
  isAuthenticated: false,
  setSession: () => { },
  clearSession: async () => { },
  refreshAuth: async () => false,
  withAccessToken: async (op: any) => op(""),
});

export function SessionProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<AuthModule.SessionPayload | null>(null);
  const [hydrated, setHydrated] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    const token = session?.tokens?.accessToken;
    tokenManager.setAccessToken(token ?? null);
  }, [session?.tokens?.accessToken]);

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
    } catch {
      await clearSession();
      return null;
    } finally {
      setIsRefreshing(false);
    }
  }, [clearSession, isRefreshing]);

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
        console.log("Session init:", { hasTokens: !!tokens, hasMeta: !!meta });
        if (tokens && active) {
          let user = meta?.user || null;
          setSession({ user, tokens });

          // Refresh AFTER state update completes
          setTimeout(async () => {
            if (active) {
              try {
                // Try to refresh token first (ensure we are authenticated)
                await refreshAuth();
                const currentTokens = await storage.auth.getTokens();
                if (currentTokens?.accessToken && active) {
                  // Then fetch latest profile to sync coupleId
                  const latestUser = await getProfileUseCase.execute();
                  setSession((prev) =>
                    prev ? { ...prev, user: latestUser } : null,
                  );
                }
              } catch (err) {
                console.error("Sync profile error:", err);
              }
            }
          }, 100);
        }
      } catch (error) {
        console.error("Session init error:", error);
      } finally {
        if (active) setHydrated(true);
      }
    };
    init();
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

export const useSession = () => {
  return useContext(SessionContext);
};
