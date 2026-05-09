import { apiClient } from "@/lib/api-client";
import type { CoupleResponse, CreateCouplePayload, JoinCouplePayload } from "./couple-types";

export const coupleApi = {
  getMe: () => apiClient.get<CoupleResponse>("/couples/me"),

  create: (payload: CreateCouplePayload) =>
    apiClient.post<{ couple: CoupleResponse["couple"] }>("/couples", payload),

  join: (payload: JoinCouplePayload) =>
    apiClient.post<{ coupleId: string; status: string; partnerInfo?: object }>("/couples/join", payload),

  generateInvite: () =>
    apiClient.post<{ inviteCode: string; expiresIn: number }>("/couples/invite"),

  update: (payload: Partial<CreateCouplePayload>) =>
    apiClient.patch<{ couple: CoupleResponse["couple"] }>("/couples/me", payload),
};
