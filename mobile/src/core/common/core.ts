export const GENDER = {
  NAM: "NAM",
  NU: "NU",
  KHAC: "KHAC",
  KHONG_TIET_LO: "KHONG_TIET_LO",
} as const;

export type Gender = (typeof GENDER)[keyof typeof GENDER];

export const EVENT_PRIORITY = {
  MEDIUM: "MEDIUM",
  HIGH: "HIGH",
} as const;

export type EventPriority =
  (typeof EVENT_PRIORITY)[keyof typeof EVENT_PRIORITY];

export const EVENT_CATEGORY = {
  LOVE: "LOVE",
  BIRTHDAY: "BIRTHDAY",
  CUSTOM: "CUSTOM",
  HOLIDAY: "HOLIDAY",
} as const;

export type EventCategory =
  (typeof EVENT_CATEGORY)[keyof typeof EVENT_CATEGORY];

/** Đệm đáy ScrollView: tab bar nổi + home indicator + margin (đồng bộ audit MOBILE). */
export const SCROLL_BOTTOM_TAB_CLEARANCE = 128;
export const SCROLL_BOTTOM_INSET_EXTRA = 100;

export function scrollPadBottomWithTabBar(insetsBottom: number): number {
  return Math.max(
    SCROLL_BOTTOM_TAB_CLEARANCE,
    insetsBottom + SCROLL_BOTTOM_INSET_EXTRA,
  );
}
