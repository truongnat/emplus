import { useMutation } from "@tanstack/react-query";
import { AuthRepositoryImpl } from "@/src/data/repositories/auth.repository.impl";
import { LoginUseCase, RegisterUseCase } from "@/src/domain/usecases/auth";
import type { AuthModule } from "@/src/domain/entities/schemas";

// Repository and Use Cases are instantiated here (Simplified DI)
const authRepository = new AuthRepositoryImpl();
const loginUseCase = new LoginUseCase(authRepository);
const registerUseCase = new RegisterUseCase(authRepository);

/**
 * Hook for Login operation.
 */
export function useLogin() {
  return useMutation<AuthModule.LoginResponse, Error, AuthModule.LoginRequest>({
    mutationFn: (params) => loginUseCase.execute(params),
  });
}

/**
 * Hook for Register operation.
 */
export function useRegister() {
  return useMutation<AuthModule.RegisterResponse, Error, AuthModule.RegisterRequest>({
    mutationFn: (params) => registerUseCase.execute(params),
  });
}
