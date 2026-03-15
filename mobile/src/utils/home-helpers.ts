import { palette } from "../theme";
import { Ionicons } from "@expo/vector-icons";

export const CYCLE_LABELS: Record<string, string> = {
  KY_KINH: "Kỳ kinh",
  RUNG_TRUNG: "Rụng trứng",
  CUOI_CHU_KY: "Nhạy cảm cuối chu kỳ",
  NANG_LUONG: "Giai đoạn năng lượng",
};

export function normalizeCycleLabel(raw?: string): string {
  if (!raw) return "Giai đoạn năng lượng";
  const upper = raw.trim().toUpperCase();
  const found = Object.entries(CYCLE_LABELS).find(([key]) =>
    upper.includes(key),
  );
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

export function formatLoveDate(dateString?: string): string {
  if (!dateString) return "Đang tải...";
  const d = new Date(dateString);
  if (isNaN(d.getTime())) return "Đang tải...";
  return `${d.getDate()} Tháng ${d.getMonth() + 1}, ${d.getFullYear()}`;
}

export function getEventIcon(category?: string): {
  name: React.ComponentProps<typeof Ionicons>["name"];
  color: string;
} {
  switch (category) {
    case "LOVE":
      return { name: "heart", color: (palette as any).primary };
    case "BIRTHDAY":
      return { name: "gift", color: (palette as any)["purple-600"] };
    case "HOLIDAY":
      return { name: "airplane", color: (palette as any).info };
    default:
      return { name: "calendar", color: (palette as any).success };
  }
}
