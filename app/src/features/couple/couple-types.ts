export interface CoupleProfile {
  id: string;
  loveStartDate?: string;
  status: "PENDING" | "DATING";
  inviteCode?: string;
  partner?: {
    id: string;
    fullName: string;
    gender: string;
  } | null;
}

export interface CoupleResponse {
  couple: CoupleProfile | null;
  status: "no_couple" | "pending" | "paired";
}

export interface CreateCouplePayload {
  loveStartDate: string;
  coupleNickname?: string;
}

export interface JoinCouplePayload {
  inviteCode: string;
}
