"use client";

import { create } from "zustand";
import { coupleApi } from "./couple-api";
import type { CoupleProfile, CreateCouplePayload, JoinCouplePayload } from "./couple-types";

type CoupleState = {
  couple: CoupleProfile | null;
  status: "idle" | "loading" | "paired" | "pending" | "no_couple";
  inviteCode: string | null;
  isCreating: boolean;
  isJoining: boolean;
  error: string | null;

  fetchCouple: () => Promise<void>;
  createCouple: (payload: CreateCouplePayload) => Promise<void>;
  joinCouple: (payload: JoinCouplePayload) => Promise<void>;
  generateInviteCode: () => Promise<string>;
  clearError: () => void;
};

export const useCoupleStore = create<CoupleState>((set, get) => ({
  couple: null,
  status: "idle",
  inviteCode: null,
  isCreating: false,
  isJoining: false,
  error: null,

  async fetchCouple() {
    set({ status: "loading" });
    try {
      const response = await coupleApi.getMe();
      set({
        couple: response.couple,
        status: response.status as "no_couple" | "pending" | "paired",
        inviteCode: response.couple?.inviteCode || null,
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Không thể tải dữ liệu cặp đôi.";
      set({ error: message, status: "no_couple" });
    }
  },

  async createCouple(payload) {
    set({ isCreating: true, error: null });
    try {
      const response = await coupleApi.create(payload);
      const coupleData = response.couple || null;
      set({
        couple: coupleData,
        status: coupleData ? "pending" : "no_couple",
        inviteCode: coupleData?.inviteCode || null,
        isCreating: false,
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Không thể tạo cặp đôi.";
      set({ error: message, isCreating: false });
      throw err;
    }
  },

  async joinCouple(payload) {
    set({ isJoining: true, error: null });
    try {
      await coupleApi.join(payload);
      // Refetch couple info after joining
      await get().fetchCouple();
      set({ isJoining: false });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Không thể tham gia cặp đôi.";
      set({ error: message, isJoining: false });
      throw err;
    }
  },

  async generateInviteCode() {
    try {
      const response = await coupleApi.generateInvite();
      set({ inviteCode: response.inviteCode });
      return response.inviteCode;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Không thể tạo mã mời.";
      set({ error: message });
      throw err;
    }
  },

  clearError() {
    set({ error: null });
  },
}));
