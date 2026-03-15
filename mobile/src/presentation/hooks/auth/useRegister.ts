import { useMutation } from "@tanstack/react-query";
import { AuthModule } from "@/src/domain/entities/schemas";
import { useSession } from "@/src/framework/ctx/session-context";
import { useToast } from "@/src/toast-context";
import { dependencies } from "@/src/framework/di/dependencies";
import { toDisplayError } from "@/src/core/api/to-display-error";

export interface UseRegisterOptions {
  /** Callback when registration succeeds */
  onSuccess?: (data: AuthModule.RegisterResponse) => void;
  /** Callback when registration fails */
  onError?: (error: Error) => void;
  /** Show toast notification */
  showToast?: boolean;
}

/**
 * Hook for handling user registration
 * @example
 * ```tsx
 * const register = useRegister({
 *   onSuccess: () => navigation.navigate('home'),
 *   showToast: true
 * });
 *
 * // Usage
 * register.mutate({ email, password, fullName });
 * ```
 */
export function useRegister(options: UseRegisterOptions = {}) {
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
