import type { CoupleStatus, Gender } from "../types.ts";

export type DisplayGender = "MALE" | "FEMALE" | "OTHER" | "PREFER_NOT_TO_SAY";
export type DisplayCoupleStatus = "PENDING" | "DATING" | "MARRIED" | "SEPARATED";
export type DisplayDependencyStatus = "ACTIVE" | "ERROR" | "SKIPPED";

/**
 * Normalize gender input - accepts English gender values
 */
export function normalizeGenderInput(value: string | undefined): Gender {
  const normalized = (value ?? "").trim().toUpperCase();

  if (normalized === "MALE") {
    return "MALE";
  }

  if (normalized === "FEMALE") {
    return "FEMALE";
  }

  if (normalized === "OTHER") {
    return "OTHER";
  }

  if (normalized === "PREFER_NOT_TO_SAY") {
    return "PREFER_NOT_TO_SAY";
  }

  return "OTHER";
}

/**
 * Display gender - now returns the same value since we use Vietnamese directly
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
