import type { CoupleStatus, Gender } from "../types.ts";

export type GioiTinhHienThi = "NAM" | "NU" | "KHAC" | "KHONG_TIET_LO";
export type TrangThaiCapDoiHienThi = "CHO_GHEP_DOI" | "DANG_YEU" | "DA_CUOI" | "DA_CHIA_TAY";
export type TrangThaiPhuThuocHienThi = "HOAT_DONG" | "SU_CO" | "BO_QUA";

/**
 * Normalize gender input - accepts both old and new formats
 */
export function chuanHoaGioiTinhDauVao(value: string | undefined): Gender {
  const normalized = (value ?? "").trim().toUpperCase();

  // Accept both old and new formats
  if (normalized === "NAM" || normalized === "MALE") {
    return "NAM";
  }

  if (normalized === "NU" || normalized === "NỮ" || normalized === "FEMALE") {
    return "NU";
  }

  if (normalized === "KHAC" || normalized === "OTHER") {
    return "KHAC";
  }

  if (normalized === "KHONG_TIET_LO" || normalized === "KHÔNG_TIẾT_LỘ" || normalized === "PREFER_NOT_TO_SAY") {
    return "KHONG_TIET_LO";
  }

  return "KHAC";
}

/**
 * Display gender - now returns the same value since we use Vietnamese directly
 */
export function hienThiGioiTinh(gender: Gender): GioiTinhHienThi {
  return gender;
}

/**
 * Display couple status - now returns the same value since we use Vietnamese directly
 */
export function hienThiTrangThaiCapDoi(status: CoupleStatus): TrangThaiCapDoiHienThi {
  return status;
}

export function hienThiTrangThaiPhuThuoc(status: "up" | "down" | "skipped"): TrangThaiPhuThuocHienThi {
  if (status === "up") {
    return "HOAT_DONG";
  }

  if (status === "down") {
    return "SU_CO";
  }

  return "BO_QUA";
}
