import { useMutation } from "@tanstack/react-query";

import { dependencies } from "@/src/framework/di/dependencies";

/**
 * Request OTP / reset flow for forgot password (API skipAuth).
 * Toast + navigation belong in the screen / form caller.
 */
export function useForgotPasswordRequest() {
  return useMutation({
    mutationFn: (email: string) =>
      dependencies.auth.requestPasswordReset.execute({ email }),
  });
}
