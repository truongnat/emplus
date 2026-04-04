import { AuthModule, UserModule } from "../../entities/schemas";
import { AuthRepository } from "../../repositories/auth.repository";

/**
 * Use Case xử lý đăng nhập.
 */
export class LoginUseCase {
  constructor(private authRepository: AuthRepository) { }

  async execute(
    params: AuthModule.LoginRequest,
  ): Promise<AuthModule.LoginResponse> {
    return this.authRepository.login(params);
  }
}

/**
 * Use Case xử lý đăng ký.
 */
export class RegisterUseCase {
  constructor(private authRepository: AuthRepository) { }

  async execute(
    params: AuthModule.RegisterRequest,
  ): Promise<AuthModule.RegisterResponse> {
    return this.authRepository.register(params);
  }
}

/**
 * Use Case làm mới phiên đăng nhập.
 */
export class RefreshSessionUseCase {
  constructor(private authRepository: AuthRepository) { }

  async execute(refreshToken: string): Promise<AuthModule.RefreshResponse> {
    return this.authRepository.refresh({ refreshToken });
  }
}

/**
 * Use Case xác thực OTP.
 */
export class VerifyOtpUseCase {
  constructor(private authRepository: AuthRepository) { }

  async execute(
    params: AuthModule.VerifyOtpRequest,
  ): Promise<AuthModule.VerifyOtpResponse> {
    return this.authRepository.verifyOtp(params);
  }
}

/**
 * Use Case lấy thông tin profile người dùng.
 */
export class GetProfileUseCase {
  constructor(private authRepository: AuthRepository) { }

  async execute(): Promise<AuthModule.User> {
    return this.authRepository.getProfile();
  }
}

export class UpdateProfileUseCase {
  constructor(private authRepository: AuthRepository) { }

  async execute(
    params: UserModule.UpdateProfileRequest,
  ): Promise<AuthModule.User> {
    return this.authRepository.updateProfile(params);
  }
}

export class RequestPasswordResetUseCase {
  constructor(private authRepository: AuthRepository) { }

  async execute(
    params: AuthModule.ForgotPasswordRequest,
  ): Promise<AuthModule.ForgotPasswordResponse> {
    return this.authRepository.forgotPassword(params);
  }
}

export class ResetPasswordUseCase {
  constructor(private authRepository: AuthRepository) { }

  async execute(
    params: AuthModule.ResetPasswordRequest,
  ): Promise<AuthModule.ResetPasswordResponse> {
    return this.authRepository.resetPassword(params);
  }
}

export class RegisterPushTokenUseCase {
  constructor(private authRepository: AuthRepository) { }

  async execute(
    params: UserModule.PushTokenRequest,
  ): Promise<UserModule.PushTokenResponse> {
    return this.authRepository.registerPushToken(params);
  }
}
