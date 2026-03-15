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
