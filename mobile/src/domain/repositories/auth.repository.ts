import type { AuthModule } from "../entities/schemas";

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
}
