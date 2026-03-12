import { AppState } from "react-native";
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { useQueryClient } from "@tanstack/react-query";

import { storage } from "@/src/core/common/storage";
import appConfig from "@/src/core/config/app-config";
import { AuthModule } from "@/src/domain/entities/schemas";
import { AuthRepositoryImpl } from "@/src/data/repositories/auth.repository.impl";
import { RefreshSessionUseCase } from "@/src/domain/usecases/auth";
import { tokenManager } from "@/src/core/api/token-manager";

const authRepo = new AuthRepositoryImpl();
const refreshSessionUseCase = new RefreshSessionUseCase(authRepo);

interface SessionContextValue {
  session: AuthModule.LoginResponse | null;
  hydrated: boolean;
  isAuthenticated: boolean;
  setSession: (session: AuthModule.LoginResponse | null) => void;
  clearSession: () => void;
  refreshAuth: () => Promise<boolean>;
  /** @deprecated use UseCases or direct API calls, token is managed automatically */
  withAccessToken: <T>(operation: (accessToken: string) => Promise<T>) => Promise<T>;
}

const SessionContext = createContext<SessionContextValue | undefined>(undefined);

export function SessionProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<AuthModule.LoginResponse | null>(null);
  const [hydrated, setHydrated] = useState(false);
  const queryClient = useQueryClient();

  useEffect(() => {
    tokenManager.setAccessToken(session?.tokens.accessToken ?? null);
  }, [session?.tokens.accessToken]);

  const clearSession = useCallback(async () => {
    setSession(null);
    queryClient.clear();
    await storage.clearAllSession();
  }, [queryClient]);

  const refreshAuth = useCallback(async (): Promise<string | null> => {
    const currentTokens = await storage.auth.getTokens();
    const refreshToken = currentTokens?.refreshToken?.trim();
    if (!refreshToken) {
      await clearSession();
      return null;
    }
    try {
      const nextTokens = await refreshSessionUseCase.execute(refreshToken);
      setSession((prev) => (prev ? { ...prev, tokens: nextTokens } : null));
      return nextTokens.accessToken;
    } catch {
      await clearSession();
      return null;
    }
  }, [clearSession]);

  useEffect(() => {
    tokenManager.setRefreshHandler(refreshAuth);
  }, [refreshAuth]);

  /** Compatibility: withAccessToken passthrough */
  const withAccessToken = useCallback(async <T,>(operation: (token: string) => Promise<T>): Promise<T> => {
    const token = session?.tokens.accessToken || "";
    return operation(token);
  }, [session?.tokens.accessToken]);

  useEffect(() => {
    let active = true;
    const init = async () => {
      try {
        const [tokens, meta] = await Promise.all([storage.auth.getTokens(), storage.user.getMetadata()]);
        if (tokens && active) {
          const user = meta?.user || null;
          setSession({ user, tokens });
          if (tokens.refreshToken) await refreshAuth();
        }
      } catch { await clearSession(); } finally { if (active) setHydrated(true); }
    };
    init();
    return () => { active = false; };
  }, [clearSession, refreshAuth]);

  useEffect(() => {
    if (hydrated && session) {
      void storage.auth.setTokens(session.tokens);
      void storage.user.setMetadata({ user: session.user });
    }
  }, [session, hydrated]);

  useEffect(() => {
    const tokens = session?.tokens;
    if (!tokens?.expiresIn || !tokens?.accessToken) return;
    const delay = Math.max(0, tokens.expiresIn * 1000 - appConfig.auth.silentRefreshBufferMs);
    const timer = setTimeout(() => void refreshAuth(), delay);
    return () => clearTimeout(timer);
  }, [session?.tokens, refreshAuth]);

  useEffect(() => {
    const sub = AppState.addEventListener("change", (state) => {
      if (state === "active" && session?.tokens.refreshToken) {
        void refreshAuth();
      }
    });
    return () => sub.remove();
  }, [refreshAuth, session?.tokens.refreshToken]);

  const value = useMemo(
    () => ({
      session,
      hydrated,
      isAuthenticated: !!session?.tokens.accessToken,
      setSession,
      clearSession,
      refreshAuth: async () => !!(await refreshAuth()),
      withAccessToken
    }),
    [session, hydrated, clearSession, refreshAuth, withAccessToken]
  );

  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
}

export const useSession = () => {
  const context = useContext(SessionContext);
  if (!context) {
    // Return default value during SSR/hydration to prevent crash
    return {
      session: null,
      hydrated: false,
      isAuthenticated: false,
      setSession: () => {},
      clearSession: async () => {},
      refreshAuth: async () => false,
      withAccessToken: async (op: any) => op(''),
    };
  }
  return context;
};
