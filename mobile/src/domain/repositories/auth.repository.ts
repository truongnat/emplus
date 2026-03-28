import type { AuthModule, UserModule } from "../entities/schemas";

/**
 * Domain layer interface for Authentication operations.
 * This defines WHAT the app can do, but not HOW (Implementation).
 */
export interface AuthRepository {
  /**
   * Registers a new user account.
   */
  register(
    params: AuthModule.RegisterRequest,
  ): Promise<AuthModule.RegisterResponse>;

  /**
   * Authenticates a user with email and password.
   */
  login(params: AuthModule.LoginRequest): Promise<AuthModule.LoginResponse>;

  /**
   * Refreshes the session using a refresh token.
   */
  refresh(
    params: AuthModule.RefreshRequest,
  ): Promise<AuthModule.RefreshResponse>;

  /**
   * Verifies the OTP and logs the user in.
   */
  verifyOtp(
    params: AuthModule.VerifyOtpRequest,
  ): Promise<AuthModule.VerifyOtpResponse>;

  /**
   * Retrieves the current user profile.
   */
  getProfile(): Promise<AuthModule.User>;

  /**
   * Sends OTP to email for password reset.
   */
  forgotPassword(
    params: AuthModule.ForgotPasswordRequest,
  ): Promise<AuthModule.ForgotPasswordResponse>;

  /**
   * Sets new password after OTP verification (reset flow).
   */
  resetPassword(
    params: AuthModule.ResetPasswordRequest,
  ): Promise<AuthModule.ResetPasswordResponse>;

  registerPushToken(
    params: UserModule.PushTokenRequest,
  ): Promise<UserModule.PushTokenResponse>;
}
