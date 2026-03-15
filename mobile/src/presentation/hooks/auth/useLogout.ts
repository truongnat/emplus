import { useCallback } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "@/src/framework/ctx/session-context";
import { useToast } from "@/src/toast-context";
import { toDisplayError } from "@/src/core/api/to-display-error";

export interface UseLogoutOptions {
  /** Callback when logout succeeds */
  onSuccess?: () => void;
  /** Callback when logout fails */
  onError?: (error: Error) => void;
  /** Show toast notification */
  showToast?: boolean;
}

/**
 * Hook for handling user logout
 * Clears session, resets query cache, and handles cleanup
 */
export function useLogout(options: UseLogoutOptions = {}) {
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
