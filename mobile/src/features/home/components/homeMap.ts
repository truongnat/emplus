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
      startDateLabel: formatLoveDate(undefined),
      cycleLabel: normalizeCycleLabel(undefined),
      upcomingEvents: [],
      nextDateLabel: "Chưa có sự kiện",
      focusTitle: "Kết nối hôm nay",
      focusSubtitle: "Một chạm nhỏ để hai bạn gần hơn.",
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
    cycleLabel: normalizeCycleLabel(dashboard.dailySuggestion?.actionType),
    upcomingEvents,
    nextDateLabel,
    focusTitle: dashboard.dailySuggestion?.actionHint || "Kết nối hôm nay",
    focusSubtitle:
      dashboard.dailySuggestion?.quote || "Một chạm nhỏ để hai bạn gần hơn.",
  };
}
