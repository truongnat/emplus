import type { Couple, UpcomingEvent } from "../types.ts";
import { addDays, daysUntil, diffDays, formatDate, parseDate, setYearSafe } from "../utils/date.ts";

function withinWindow(daysLeft: number, windowDays: number): boolean {
  return daysLeft >= 0 && daysLeft <= windowDays;
}

function dayMilestonePriority(daysMilestone: number): "MEDIUM" | "HIGH" {
  return daysMilestone >= 500 ? "HIGH" : "MEDIUM";
}

function getDayMilestoneCandidates(currentLoveDays: number, windowDays: number): number[] {
  const candidates = new Set<number>([30, 60, 100, 200, 300]);

  const maxDaysToInspect = currentLoveDays + windowDays + 500;
  for (let milestone = 500; milestone <= maxDaysToInspect; milestone += 500) {
    candidates.add(milestone);
  }

  return Array.from(candidates.values()).sort((a, b) => a - b);
}

export function computeUpcomingEvents(couple: Couple, today: Date, windowDays = 30): UpcomingEvent[] {
  if (!couple.loveStartDate) {
    return [];
  }

  const loveStartDate = parseDate(couple.loveStartDate);
  const currentLoveDays = diffDays(loveStartDate, today) + 1;
  const events: UpcomingEvent[] = [];

  for (const milestone of getDayMilestoneCandidates(currentLoveDays, windowDays)) {
    if (milestone <= currentLoveDays) {
      continue;
    }

    const eventDate = addDays(loveStartDate, milestone - 1);
    const daysLeft = daysUntil(eventDate, today);

    if (!withinWindow(daysLeft, windowDays)) {
      continue;
    }

    events.push({
      id: `system-day-${couple.id}-${milestone}`,
      title: `Kỷ niệm ${milestone} ngày yêu`,
      date: formatDate(eventDate),
      daysLeft,
      category: "LOVE",
      isSystem: true,
      priority: dayMilestonePriority(milestone),
    });
  }

  const thisYear = today.getUTCFullYear();
  const yearsSince = thisYear - loveStartDate.getUTCFullYear();

  for (const [yearOffset, numberTitle] of [
    [0, yearsSince],
    [1, yearsSince + 1],
  ] as const) {
    const anniversaryDate = setYearSafe(loveStartDate, thisYear + yearOffset);
    const daysLeft = daysUntil(anniversaryDate, today);

    if (!withinWindow(daysLeft, windowDays)) {
      continue;
    }

    if (numberTitle <= 0) {
      continue;
    }

    events.push({
      id: `system-year-${couple.id}-${numberTitle}`,
      title: `Kỷ niệm ${numberTitle} năm yêu`,
      date: formatDate(anniversaryDate),
      daysLeft,
      category: "LOVE",
      isSystem: true,
      priority: "HIGH",
    });
  }

  events.sort((a, b) => a.daysLeft - b.daysLeft);
  return events;
}
