"use client";

import { create } from "zustand";
import { authApi } from "./auth-api";
import { tokenStorage } from "@/lib/token-storage";
import type { AuthPayload, AuthUser, LoginResult } from "./types";

type SessionStatus = "idle" | "loading" | "authenticated" | "unauthenticated";

type SessionState = {
  status: SessionStatus;
  user: AuthUser | null;
  pendingOtpEmail: string | null;
  bootstrap: () => Promise<void>;
  login: (email: string, password: string) => Promise<LoginResult>;
  register: (input: { email: string; password: string; fullName?: string; gender?: string }) => Promise<AuthUser>;
  verifyOtp: (email: string, otp: string) => Promise<AuthUser>;
  logout: () => Promise<void>;
};

function persistSession(payload: AuthPayload) {
  tokenStorage.setTokens({
    accessToken: payload.tokens.accessToken,
    refreshToken: payload.tokens.refreshToken,
  });
}

function clearSession() {
  tokenStorage.clearTokens();
}

export const useSessionStore = create<SessionState>((set, get) => ({
  status: "idle",
  user: null,
  pendingOtpEmail: null,

  async bootstrap() {
    const currentStatus = get().status;
    if (currentStatus === "loading" || currentStatus === "authenticated") {
      return;
    }

    const tokens = tokenStorage.getTokens();
    if (!tokens) {
      set({ status: "unauthenticated", user: null });
      return;
    }

    set({ status: "loading" });

    try {
      const user = await authApi.me();
      set({ status: "authenticated", user });
    } catch {
      clearSession();
      set({ status: "unauthenticated", user: null });
    }
  },

  async login(email, password) {
    set({ status: "loading" });

    try {
      const result = await authApi.login({ email, password });

      if (result.requiresOTP) {
        set({ status: "unauthenticated", user: null, pendingOtpEmail: email });
        return { status: "otp_required", email };
      }

      persistSession(result.data);
      set({ status: "authenticated", user: result.data.user, pendingOtpEmail: null });
      return { status: "authenticated", user: result.data.user };
    } catch (error) {
      set({ status: "unauthenticated", user: null });
      throw error;
    }
  },

  async register(input) {
    set({ status: "loading" });

    try {
      const payload = await authApi.register(input);
      persistSession(payload);
      set({ status: "authenticated", user: payload.user, pendingOtpEmail: null });
      return payload.user;
    } catch (error) {
      set({ status: "unauthenticated", user: null });
      throw error;
    }
  },

  async verifyOtp(email, otp) {
    set({ status: "loading" });

    try {
      const payload = await authApi.verifyOtp({ email, otp });
      persistSession(payload);
      set({ status: "authenticated", user: payload.user, pendingOtpEmail: null });
      return payload.user;
    } catch (error) {
      set({ status: "unauthenticated", user: null, pendingOtpEmail: email });
      throw error;
    }
  },

  async logout() {
    const accessToken = tokenStorage.getAccessToken();
    const refreshToken = tokenStorage.getRefreshToken();

    set({ status: "loading" });

    try {
      if (accessToken || refreshToken) {
        await authApi.logout(accessToken, refreshToken);
      }
    } finally {
      clearSession();
      set({ status: "unauthenticated", user: null, pendingOtpEmail: null });
    }
  },
}));
