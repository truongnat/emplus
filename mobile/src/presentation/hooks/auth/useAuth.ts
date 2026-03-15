import { useMemo } from "react";
import { useSession } from "@/src/framework/ctx/session-context";
import { useLogout } from "./useLogout";
import { useLogin } from "./useLogin";
import { useRegister } from "./useRegister";

/**
 * Unified Auth Hook - Provides complete authentication functionality
 * Combines session state, login, register, and logout in one hook
 */
export function useAuth() {
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

/**
 * @deprecated Use useAuth() instead. Will be removed in next major version.
 */
export const useAuthLegacy = useAuth;
