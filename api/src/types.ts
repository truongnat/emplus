export type Gender = "NAM" | "NU" | "KHAC" | "KHONG_TIET_LO";
export type AuthProvider = "LOCAL" | "GOOGLE" | "APPLE";
export type CoupleStatus = "CHO_GHEP_DOI" | "DANG_YEU" | "DA_CUOI" | "DA_CHIA_TAY";
export type AnniversaryCategory = "LOVE" | "BIRTHDAY" | "CUSTOM" | "HOLIDAY";

export interface User {
  id: string;
  email: string;
  fullName: string;
  nickname?: string;
  avatarUrl?: string;
  gender: Gender;
  dob?: string;
  authProvider: AuthProvider;
  authId: string;
  passwordHash?: string;
  timezone: string;
  isActive: boolean;
  isAdmin?: boolean;
  createdAt: string;
  updatedAt: string;
  coupleId?: string;
}

export interface Couple {
  id: string;
  partner1Id: string;
  partner2Id?: string;
  loveStartDate?: string;
  weddingDate?: string;
  status: CoupleStatus;
  inviteCode?: string;
  inviteExpiresAt?: string;
  settings: Record<string, unknown>;
  createdAt: string;
}

export interface Invite {
  code: string;
  coupleId: string;
  createdBy: string;
  expiresAt: string;
}

export interface MemoryItem {
  id: string;
  coupleId: string;
  createdById: string;
  title: string;
  description?: string;
  memoryDate: string;
  mediaUrls: string[];
  tags: string[];
  createdAt: string;
}

export interface Anniversary {
  id: string;
  coupleId: string;
  title: string;
  eventDate: string;
  recurrenceType: "NONE" | "YEARLY" | "MONTHLY";
  category: AnniversaryCategory;
  isSystemGenerated: boolean;
  notifySettings: {
    t7: boolean;
    t3: boolean;
    t0: boolean;
  };
  createdAt: string;
}

export interface EmotionalCycle {
  id: string;
  userId: string;
  startDate: string;
  cycleDuration: number;
  periodDuration: number;
  symptomNotes: string[];
  isTrackingActive: boolean;
}

/** Nhịp tâm trạng 0–100 do user cập nhật; đồng bộ cho cặp đôi. */
export interface UserMoodState {
  userId: string;
  value: number;
  updatedAt: string;
}

export interface MaleSuggestion {
  priority: number;
  text: string;
  callToAction: {
    label: string;
    actionType?: string;
    actionUrl?: string;
    icon?: string;
  };
}

export interface UpcomingEvent {
  id: string;
  title: string;
  date: string;
  daysLeft: number;
  category: AnniversaryCategory;
  isSystem: boolean;
  priority: "MEDIUM" | "HIGH";
}
export interface BudgetItem {
  id: string;
  coupleId: string;
  createdById: string;
  title: string;
  amount: number;
  category: string; // e.g., "venue", "catering", "clothing"
  date: string;
  place?: string;
  status: "PAID" | "PENDING" | "OVER_BUDGET" | "DRAFT";
  note?: string;
  createdAt: string;
}

/** Thông báo trong ứng dụng (in-app), theo user */
export interface InAppNotification {
  id: string;
  userId: string;
  coupleId?: string;
  type: string;
  title: string;
  body?: string;
  iconName?: string;
  iconColor?: string;
  iconBg?: string;
  actionLabel?: string;
  metadata?: Record<string, unknown>;
  readAt?: string;
  createdAt: string;
}

export interface BudgetSummary {
  totalBudget: number;
  totalSpent: number;
  pendingAmount: number;
  remainingAmount: number;
  usagePercentage: number;
  projectedTotal: number;
}
