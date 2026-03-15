import { apiClient, ApiResponse } from "../../core/api";
import { AuthRepository } from "../../domain/repositories/auth.repository";
import { AuthModule } from "../../domain/entities/schemas";

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
    const response = await apiClient.post<
      ApiResponse<AuthModule.RefreshResponse>
    >("/auth/refresh", params);
    return response.data;
  }

  async verifyOtp(
    params: AuthModule.VerifyOtpRequest,
  ): Promise<AuthModule.VerifyOtpResponse> {
    const response = await apiClient.post<
      ApiResponse<AuthModule.VerifyOtpResponse>
    >("/auth/verify-otp", params);
    return response.data;
  }
}
