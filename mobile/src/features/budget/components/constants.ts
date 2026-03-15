import { palette } from "@/src/theme/tokens";

export const CATEGORY_CONFIG: Record<
  string,
  { icon: any; bg: string; color: string; label: string }
> = {
  venue: {
    icon: "business-outline",
    bg: "#eef2ff",
    color: "#6366f1",
    label: "Địa điểm",
  },
  catering: {
    icon: "restaurant-outline",
    bg: "#fff7ed",
    color: "#f97316",
    label: "Ăn uống",
  },
  clothing: {
    icon: "shirt-outline",
    bg: "#fdf2f8",
    color: "#ec4899",
    label: "Trang phục",
  },
  music: {
    icon: "musical-note-outline",
    bg: "#f5f3ff",
    color: "#a855f7",
    label: "Âm nhạc",
  },
  photo: {
    icon: "camera-outline",
    bg: "#eff6ff",
    color: "#3b82f6",
    label: "Quay phim",
  },
  other: {
    icon: "cart-outline",
    bg: "#f1f5f9",
    color: "#64748b",
    label: "Khác",
  },
};

export const STATUS_MAP: Record<string, { label: string; color: any }> = {
  PAID: { label: "ĐÃ TRẢ", color: (palette as any).success },
  PENDING: { label: "ĐANG CHỜ", color: (palette as any).warning },
  OVER_BUDGET: { label: "VƯỢT MỨC", color: (palette as any).primary },
  DRAFT: { label: "BẢN NHÁP", color: (palette as any).muted },
};

export const FILTERS = ["Tất cả", "Đã trả", "Đang chờ", "Vượt ngân sách"];

export const BUDGET_STYLES = {
  shadowCard: {
    shadowColor: "#1f2687",
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 16,
    elevation: 4,
  },
  shadowSummary: {
    shadowColor: "#1f2687",
    shadowOpacity: 0.07,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 32,
    elevation: 6,
  },
  heroOverlay: {
    position: "absolute" as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.35,
  },
  whiteOverlay: {
    position: "absolute" as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(255,255,255,0.55)",
  },
};
