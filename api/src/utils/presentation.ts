import type { CoupleStatus, Gender } from "../types.ts";

export type DisplayGender = Gender;
export type DisplayCoupleStatus = "PENDING" | "DATING" | "MARRIED" | "SEPARATED";
export type DisplayDependencyStatus = "ACTIVE" | "ERROR" | "SKIPPED";

/**
 * Normalize gender input - returns the English public contract while accepting legacy Vietnamese values.
 */
export function normalizeGenderInput(value: string | undefined): Gender {
  const normalized = (value ?? "").trim().toUpperCase();

  if (normalized === "MALE" || normalized === "NAM") {
    return "MALE";
  }

  if (normalized === "FEMALE" || normalized === "NU" || normalized === "NỮ") {
    return "FEMALE";
  }

  if (normalized === "OTHER" || normalized === "KHAC" || normalized === "KHÁC") {
    return "OTHER";
  }

  if (normalized === "PREFER_NOT_TO_SAY" || normalized === "KHONG_TIET_LO" || normalized === "KHÔNG_TIẾT_LỘ") {
    return "PREFER_NOT_TO_SAY";
  }

  return "OTHER";
}

/**
 * Display gender - returns the public API value.
 */
export function displayGender(gender: Gender): DisplayGender {
  return gender;
}

/**
 * Display couple status - returns the public API value.
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
