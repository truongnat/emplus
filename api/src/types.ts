export type Gender = "MALE" | "FEMALE" | "OTHER" | "PREFER_NOT_TO_SAY";
export type AuthProvider = "LOCAL" | "GOOGLE" | "APPLE";
export type CoupleStatus = "PENDING" | "DATING" | "MARRIED" | "SEPARATED";
export type AnniversaryCategory = "LOVE" | "BIRTHDAY" | "CUSTOM" | "HOLIDAY";
export type MilestoneType = "AUTO" | "CUSTOM";
export type MilestoneCategory = "ANNIVERSARY" | "DATE" | "MEMORY" | "GIFT" | "OTHER";
export type NudgeType =
  | "POKE"
  | "HUG"
  | "MISS_YOU"
  | "KISS"
  | "ANGRY"
  | "MAKE_UP"
  | "EAT_TOGETHER"
  | "CALL_ME";
export type GiftSuggestionCategory =
  | "ANNIVERSARY"
  | "BIRTHDAY"
  | "APOLOGY"
  | "RANDOM_SURPRISE"
  | "COUPLE_ITEM"
  | "HANDMADE";
export type GiftBudgetRange = "UNDER_100K" | "FROM_100K_TO_300K" | "FROM_300K_TO_700K" | "ABOVE_700K";
export type GiftPlatform = "TIKTOK" | "SHOPEE" | "OTHER";

export interface User {
  id: string;
  email: string;
  fullName: string;
  nickname?: string;
  avatarUrl?: string;
  /** Ảnh bìa / nền hồ sơ (URL công khai sau upload media). */
  profileBackgroundUrl?: string;
  gender: Gender;
  dob?: string;
  /** Giờ sinh HH:mm (24h). */
  birthTime?: string;
  authProvider: AuthProvider;
  authId: string;
  passwordHash?: string;
  timezone: string;
  /** Nhận thông báo qua email (worker gửi mail cần kiểm tra). */
  emailNotificationsEnabled: boolean;
  /** Hồ sơ riêng tư — giới hạn hiển thị theo policy (áp dụng ở luồng xem hồ sơ người khác). */
  profilePrivate: boolean;
  /** Hiển thị trạng thái online cho người khác (presence/heartbeat sau này). */
  showOnlineStatus: boolean;
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

export interface AutoMilestone {
  id: string;
  title: string;
  date: string;
  type: "AUTO";
  category: "ANNIVERSARY";
  sourceKey: string;
  isImportant: boolean;
}

export interface CustomMilestone {
  id: string;
  coupleId: string;
  title: string;
  description?: string;
  milestoneDate: string;
  type: "CUSTOM";
  category: MilestoneCategory;
  remindBeforeDays: number[];
  isImportant: boolean;
  createdById?: string;
  createdAt: string;
  updatedAt: string;
}

export type Milestone = AutoMilestone | CustomMilestone;

export interface Nudge {
  id: string;
  coupleId: string;
  fromUserId: string;
  toUserId: string;
  type: NudgeType;
  message: string;
  createdAt: string;
  readAt?: string;
}

export interface GiftSuggestion {
  id: string;
  title: string;
  description: string;
  category: GiftSuggestionCategory;
  budgetRange: GiftBudgetRange;
  platforms: GiftPlatform[];
  url: string;
  imageUrl?: string;
  tags: string[];
  suitableFor: string[];
}

export interface PartnerNote {
  id: string;
  userId: string;
  coupleId?: string;
  title: string;
  content: string;
  category?: string;
  createdAt: string;
  updatedAt: string;
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
