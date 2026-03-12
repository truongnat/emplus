import { AuthModule } from "../../entities/schemas";
import { AuthRepository } from "../../repositories/auth.repository";

/**
 * Use Case xử lý đăng nhập.
 */
export class LoginUseCase {
  constructor(private authRepository: AuthRepository) {}

  async execute(params: AuthModule.LoginRequest): Promise<AuthModule.LoginResponse> {
    return this.authRepository.login(params);
  }
}

/**
 * Use Case xử lý đăng ký.
 */
export class RegisterUseCase {
  constructor(private authRepository: AuthRepository) {}

  async execute(params: AuthModule.RegisterRequest): Promise<AuthModule.RegisterResponse> {
    return this.authRepository.register(params);
  }
}

/**
 * Use Case làm mới phiên đăng nhập.
 */
export class RefreshSessionUseCase {
  constructor(private authRepository: AuthRepository) {}

  async execute(refreshToken: string): Promise<AuthModule.RefreshResponse> {
    return this.authRepository.refresh({ refreshToken });
  }
}
