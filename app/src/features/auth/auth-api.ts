import { apiClient } from "@/lib/api-client";
import type { ApiResponseEnvelope } from "@/types/api";
import type { AuthPayload, AuthUser, RequiresOtpPayload } from "./types";

type LoginInput = {
  email: string;
  password: string;
};

type RegisterInput = LoginInput & {
  fullName?: string;
  gender?: string;
};

type VerifyOtpInput = {
  email: string;
  otp: string;
};

function isOtpRequired(payload: AuthPayload | RequiresOtpPayload): payload is RequiresOtpPayload {
  return "requiresOTP" in payload && payload.requiresOTP === true;
}

export const authApi = {
  async login(input: LoginInput) {
    const response = await apiClient.post<ApiResponseEnvelope<AuthPayload | RequiresOtpPayload>, LoginInput>(
      "/v1/auth/login",
      input,
      { skipAuth: true },
    );

    if (isOtpRequired(response.data)) {
      return {
        data: response.data,
        requiresOTP: true as const,
      };
    }

    return {
      data: response.data,
      requiresOTP: false as const,
    };
  },

  async register(input: RegisterInput) {
    const response = await apiClient.post<ApiResponseEnvelope<AuthPayload>, RegisterInput>(
      "/v1/auth/register",
      input,
      { skipAuth: true },
    );

    return response.data;
  },

  async verifyOtp(input: VerifyOtpInput) {
    const response = await apiClient.post<ApiResponseEnvelope<AuthPayload>, VerifyOtpInput>(
      "/v1/auth/verify-otp",
      input,
      { skipAuth: true },
    );

    return response.data;
  },

  async me() {
    const response = await apiClient.get<ApiResponseEnvelope<AuthUser>>("/v1/users/me");

    return response.data;
  },

  async logout(accessToken: string | null, refreshToken: string | null) {
    await apiClient.post<ApiResponseEnvelope<{ loggedOut: boolean }>>("/v1/auth/logout", {
      accessToken,
      refreshToken,
    });
  },
};
