export type AuthTokens = {
  accessToken: string;
  refreshToken: string;
  expiresIn?: number;
};

export type AuthUser = {
  id: string;
  email: string;
  fullName: string;
  gender?: string;
  isPaired?: boolean;
  isAdmin?: boolean;
};

export type AuthPayload = {
  user: AuthUser;
  tokens: AuthTokens;
};

export type RequiresOtpPayload = {
  requiresOTP: true;
};

export type LoginResult =
  | {
      status: "authenticated";
      user: AuthUser;
    }
  | {
      status: "otp_required";
      email: string;
    };
