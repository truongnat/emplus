import { useMutation } from "@tanstack/react-query";
import { AuthModule } from "@/src/domain/entities/schemas";
import { useSession } from "@/src/framework/ctx/session-context";
import { useToast } from "@/src/toast-context";
import { dependencies } from "@/src/framework/di/dependencies";
import { toDisplayError } from "@/src/core/api/to-display-error";

export interface UseLoginOptions {
  /** Callback when login succeeds */
  onSuccess?: (data: AuthModule.LoginResponse) => void;
  /** Callback when login fails */
  onError?: (error: Error) => void;
  /** Show toast notification */
  showToast?: boolean;
}

/**
 * Hook for handling user login
 * @example
 * ```tsx
 * const login = useLogin({
 *   onSuccess: () => navigation.navigate('home'),
 *   showToast: true
 * });
 *
 * // Usage
 * login.mutate({ email, password });
 * ```
 */
export function useLogin(options: UseLoginOptions = {}) {
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
      console.log("🔴 Login error:", error);
      const errorMessage = toDisplayError(error);
      console.log("📝 Error message:", errorMessage);

      if (showToast) {
        console.log("🍞 Calling toast with:", errorMessage);
        toast(errorMessage, "error");
      }
      onError?.(error);
    },
  });
}
