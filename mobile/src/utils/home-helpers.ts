import { palette } from "../theme";
import { Ionicons } from "@expo/vector-icons";

export const CYCLE_LABELS: Record<string, string> = {
  KY_KINH: "Kỳ kinh",
  RUNG_TRUNG: "Rụng trứng",
  CUOI_CHU_KY: "Nhạy cảm cuối chu kỳ",
  NANG_LUONG: "Giai đoạn năng lượng",
};

const CYCLE_LABEL_ENTRIES = Object.entries(CYCLE_LABELS);

export function normalizeCycleLabel(raw?: string): string {
  if (!raw) return "Giai đoạn năng lượng";
  const upper = raw.trim().toUpperCase();
  const found = CYCLE_LABEL_ENTRIES.find(([key]) => upper.includes(key));
  return found ? found[1] : "Giai đoạn năng lượng";
}

export type GreetingInfo = {
  greeting: string;
  subGreeting: string;
  iconName: React.ComponentProps<typeof Ionicons>["name"];
};

export function getTimeBasedGreeting(date: Date = new Date()): GreetingInfo {
  const hour = date.getHours();
  if (hour >= 5 && hour < 11) {
    return {
      greeting: "Chào buổi sáng!",
      subGreeting: "Ngày mới nhiều năng lượng",
      iconName: "sunny",
    };
  } else if (hour >= 11 && hour < 14) {
    return {
      greeting: "Chào buổi trưa!",
      subGreeting: "Nghỉ ngơi một chút nhé",
      iconName: "partly-sunny",
    };
  } else if (hour >= 14 && hour < 18) {
    return {
      greeting: "Chào buổi chiều!",
      subGreeting: "Làm việc thật hiệu quả",
      iconName: "partly-sunny",
    };
  } else if (hour >= 18 && hour < 22) {
    return {
      greeting: "Chào buổi tối!",
      subGreeting: "Thời gian thư giãn tuyệt vời",
      iconName: "moon",
    };
  } else {
    return {
      greeting: "Chào buổi đêm!",
      subGreeting: "Ngủ ngon mộng đẹp nhé",
      iconName: "moon",
    };
  }
}

const DAY_MS = 24 * 60 * 60 * 1000;

function stripToUtcDay(input: Date): Date {
  return new Date(
    Date.UTC(input.getUTCFullYear(), input.getUTCMonth(), input.getUTCDate()),
  );
}

function parseYmdUtc(ymd: string): Date | null {
  const part = ymd.slice(0, 10);
  const [y, m, d] = part.split("-").map((x) => Number(x));
  if (!y || !m || !d) return null;
  const parsed = new Date(Date.UTC(y, m - 1, d));
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

function diffDaysUtc(start: Date, end: Date): number {
  const a = stripToUtcDay(start).getTime();
  const b = stripToUtcDay(end).getTime();
  return Math.floor((b - a) / DAY_MS);
}

/**
 * Khớp `api/src/modules/dashboard.ts`: diffDays(loveStart, todayUtc) + 1.
 * Dùng trên client để số ngày cập nhật theo lịch dù React Query / Redis trả `loveDays` cũ.
 */
export function computeLoveDaysFromStart(
  loveStartDate: string | undefined,
  now: Date = new Date(),
): number | null {
  if (!loveStartDate) return null;
  const start = parseYmdUtc(loveStartDate);
  if (!start) return null;
  const today = stripToUtcDay(now);
  return diffDaysUtc(start, today) + 1;
}

export function formatLoveDate(dateString?: string): string {
  if (!dateString) return "Đang tải...";
  const d = new Date(dateString);
  if (isNaN(d.getTime())) return "Đang tải...";
  return `${d.getDate()} Tháng ${d.getMonth() + 1}, ${d.getFullYear()}`;
}

/** Màu có thật trong `palette` — tránh `(palette as any).primary` gây undefined → icon đen. */
export function getEventIcon(category?: string): {
  name: React.ComponentProps<typeof Ionicons>["name"];
  color: string;
} {
  switch (category) {
    case "LOVE":
      return { name: "heart", color: palette.coral600 };
    case "BIRTHDAY":
      return { name: "gift", color: palette.violet600 };
    case "HOLIDAY":
      return { name: "airplane", color: palette.teal600 };
    default:
      return { name: "calendar", color: palette.indigo500 };
  }
}

export function formatSoloDate(iso: string): string {
  const [year, month, day] = iso.split("-");
  if (!year || !month || !day) {
    return iso;
  }
  return `${day}/${month}/${year}`;
}

export function getSoloCountdown(iso: string): {
  label: string;
  suggestion: string;
} | null {
  const [year, month, day] = iso.split("-").map(Number);
  if (!year || !month || !day) {
    return null;
  }

  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  let next = new Date(today.getFullYear(), month - 1, day);

  if (next.getTime() < today.getTime()) {
    next = new Date(today.getFullYear() + 1, month - 1, day);
  }

  const diffMs = next.getTime() - today.getTime();
  const daysLeft = Math.round(diffMs / 86_400_000);

  if (daysLeft <= 0) {
    return {
      label: "Hôm nay",
      suggestion: "Đây là lúc tốt để nhắn một câu ngắn hoặc chuẩn bị một cử chỉ nhỏ.",
    };
  }

  if (daysLeft === 1) {
    return {
      label: "Còn 1 ngày",
      suggestion: "Ngày này ở rất gần rồi. Nếu cần, hãy bật thông báo để Em+ nhắc sớm hơn một chút.",
    };
  }

  if (daysLeft <= 7) {
    return {
      label: `Còn ${daysLeft} ngày`,
      suggestion: "Đây là khoảng thời gian đẹp để chuẩn bị sớm và tránh quên vào phút cuối.",
    };
  }

  return {
    label: `Còn ${daysLeft} ngày`,
    suggestion: "Bạn đã có một mốc để Em+ bắt đầu đếm ngược và nhắc bạn đúng lúc hơn.",
  };
}
