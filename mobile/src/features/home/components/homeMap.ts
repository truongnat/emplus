import { DashboardPayload } from "@/src/api";
import {
  computeLoveDaysFromStart,
  formatLoveDate,
  getTimeBasedGreeting,
  normalizeCycleLabel,
} from "@/src/utils/home-helpers";

let cachedGreeting = getTimeBasedGreeting();
let cachedMinute = new Date().getMinutes();

export function mapDashboardData(dashboard: DashboardPayload | null) {
  const now = new Date();
  const currentMinute = now.getMinutes();

  // Cache greeting per minute to avoid recalculating on every render
  if (cachedMinute !== currentMinute) {
    cachedMinute = currentMinute;
    cachedGreeting = getTimeBasedGreeting();
  }

  if (!dashboard) {
    return {
      greetingInfo: cachedGreeting,
      loveDays: 0,
      startDateLabel: "Chưa thêm ngày bắt đầu",
      cycleLabel: normalizeCycleLabel(undefined),
      upcomingEvents: [],
      nextDateLabel: "Chưa có sự kiện",
      focusTitle: "Nhắn một câu ngắn trước khi ngày khép lại",
      focusSubtitle: "Không cần dài. Chỉ cần đúng lúc và đủ thật.",
    };
  }

  const upcomingEvents = dashboard.upcomingEvents ?? [];
  const nextDateLabel =
    upcomingEvents.length > 0 ? upcomingEvents[0].title : "Chưa có sự kiện";

  const loveStart = dashboard.coupleContext?.loveStartDate;
  const recomputed = computeLoveDaysFromStart(loveStart, now);
  const loveDays =
    recomputed != null
      ? recomputed
      : (dashboard.coupleContext?.loveDays ?? 0);

  return {
    greetingInfo: cachedGreeting,
    loveDays,
    startDateLabel: formatLoveDate(dashboard.coupleContext?.loveStartDate),
    cycleLabel: normalizeCycleLabel(undefined),
    upcomingEvents,
    nextDateLabel,
    focusTitle: dashboard.careAdvice?.greeting || "Kết nối hôm nay",
    focusSubtitle:
      dashboard.careAdvice?.subGreeting || "Một điều nhỏ hôm nay vẫn tốt hơn đợi đến khi đã quá muộn.",
  };
}
