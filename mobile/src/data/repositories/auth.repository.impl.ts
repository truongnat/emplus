import { apiClient, ApiResponse } from "../../core/api";
import { AuthRepository } from "../../domain/repositories/auth.repository";
import { AuthModule, UserModule } from "../../domain/entities/schemas";

/**
 * Implementation của AuthRepository trong tầng Data.
 * Đảm bảo Type Safety 100%, không sử dụng "any".
 */
export class AuthRepositoryImpl implements AuthRepository {
  async register(
    params: AuthModule.RegisterRequest,
  ): Promise<AuthModule.RegisterResponse> {
    const response = await apiClient.post<
      ApiResponse<AuthModule.RegisterResponse>
    >("/auth/register", params);
    return response.data;
  }

  async login(
    params: AuthModule.LoginRequest,
  ): Promise<AuthModule.LoginResponse> {
    const response = await apiClient.post<
      ApiResponse<AuthModule.LoginResponse>
    >("/auth/login", params);
    return response.data;
  }

  async refresh(
    params: AuthModule.RefreshRequest,
  ): Promise<AuthModule.RefreshResponse> {
    /** Không gửi Bearer access token — tránh 401 khi access đã hết hạn (chỉ dùng refresh trong body). */
    const envelope = await apiClient.post<
      ApiResponse<
        | AuthModule.RefreshResponse
        | { user: AuthModule.User; tokens: AuthModule.RefreshResponse }
      >
    >("/auth/refresh", params, { skipAuth: true });
    const inner = envelope.data;
    /**
     * Backend trả AuthPayload `{ user, tokens }` trong `data` (giống verify-otp),
     * không phải chỉ TokenPair. Nếu gán cả object vào `session.tokens` thì
     * `accessToken` biến mất → reload mất đăng nhập.
     */
    if (
      inner &&
      typeof inner === "object" &&
      "tokens" in inner &&
      inner.tokens &&
      typeof inner.tokens === "object" &&
      "accessToken" in inner.tokens
    ) {
      return inner.tokens;
    }
    return inner as AuthModule.RefreshResponse;
  }

  async verifyOtp(
    params: AuthModule.VerifyOtpRequest,
  ): Promise<AuthModule.VerifyOtpResponse> {
    const response = await apiClient.post<
      ApiResponse<AuthModule.VerifyOtpResponse>
    >("/auth/verify-otp", params);
    return response.data;
  }

  async getProfile(): Promise<AuthModule.User> {
    const response = await apiClient.get<ApiResponse<AuthModule.User>>(
      "/users/me",
    );
    return response.data;
  }

  async forgotPassword(
    params: AuthModule.ForgotPasswordRequest,
  ): Promise<AuthModule.ForgotPasswordResponse> {
    const response = await apiClient.post<
      ApiResponse<AuthModule.ForgotPasswordResponse>
    >("/auth/forgot-password", params, { skipAuth: true });
    return response.data;
  }

  async resetPassword(
    params: AuthModule.ResetPasswordRequest,
  ): Promise<AuthModule.ResetPasswordResponse> {
    const response = await apiClient.post<
      ApiResponse<AuthModule.ResetPasswordResponse>
    >("/auth/reset-password", params, { skipAuth: true });
    return response.data;
  }

  async registerPushToken(
    params: UserModule.PushTokenRequest,
  ): Promise<UserModule.PushTokenResponse> {
    const response = await apiClient.post<
      ApiResponse<UserModule.PushTokenResponse>
    >("/users/push-token", params);
    return response.data;
  }
}
