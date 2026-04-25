import type { CoupleStatus, Gender } from "../types.ts";

export type DisplayGender = Gender;
export type DisplayCoupleStatus = "PENDING" | "DATING" | "MARRIED" | "SEPARATED";
export type DisplayDependencyStatus = "ACTIVE" | "ERROR" | "SKIPPED";

/**
 * Normalize gender input - accepts current Vietnamese values and legacy English values.
 */
export function normalizeGenderInput(value: string | undefined): Gender {
  const normalized = (value ?? "").trim().toUpperCase();

  if (normalized === "NAM" || normalized === "MALE") {
    return "NAM";
  }

  if (normalized === "NU" || normalized === "NỮ" || normalized === "FEMALE") {
    return "NU";
  }

  if (normalized === "KHAC" || normalized === "KHÁC" || normalized === "OTHER") {
    return "KHAC";
  }

  if (normalized === "KHONG_TIET_LO" || normalized === "KHÔNG_TIẾT_LỘ" || normalized === "PREFER_NOT_TO_SAY") {
    return "KHONG_TIET_LO";
  }

  return "KHAC";
}

/**
 * Display gender - returns the public API value.
 */
export function displayGender(gender: Gender): DisplayGender {
  return gender;
}

/**
 * Display couple status - now returns the same value since we use Vietnamese directly
 */
export function displayCoupleStatus(status: CoupleStatus): DisplayCoupleStatus {
  return status;
}

export function displayDependencyStatus(status: "up" | "down" | "skipped"): DisplayDependencyStatus {
  if (status === "up") {
    return "ACTIVE";
  }

  if (status === "down") {
    return "ERROR";
  }

  return "SKIPPED";
}
