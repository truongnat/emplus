import { createHash } from "node:crypto";
import { computeUpcomingEvents } from "../engines/anniversary.ts";
import { store } from "../store.ts";
import type { Anniversary, Couple, UpcomingEvent } from "../types.ts";
import { daysUntil, formatDate, parseDate, setYearSafe, todayUtc } from "../utils/date.ts";
import { notify } from "./notification.service.ts";

type ReminderCandidate = {
  eventId: string;
  title: string;
  date: string;
  daysLeft: number;
  category: string;
  source: "system" | "anniversary";
  enabledOffsets: number[];
};

function reminderIdFor(userId: string, candidate: ReminderCandidate): string {
  const raw = `${userId}:${candidate.source}:${candidate.eventId}:${candidate.date}:d${candidate.daysLeft}`;
  const hex = createHash("sha1").update(raw).digest("hex").slice(0, 32);
  return [
    hex.slice(0, 8),
    hex.slice(8, 12),
    `5${hex.slice(13, 16)}`,
    `a${hex.slice(17, 20)}`,
    hex.slice(20, 32),
  ].join("-");
}

function recurrenceDateFor(anniversary: Anniversary, today: Date): Date | null {
  const baseDate = parseDate(anniversary.eventDate);

  if (anniversary.recurrenceType === "NONE") {
    return baseDate;
  }

  const year = today.getUTCFullYear();

  if (anniversary.recurrenceType === "YEARLY") {
    const thisYear = setYearSafe(baseDate, year);
    return thisYear < today ? setYearSafe(baseDate, year + 1) : thisYear;
  }

  if (anniversary.recurrenceType === "MONTHLY") {
    const candidate = new Date(Date.UTC(
      today.getUTCFullYear(),
      today.getUTCMonth(),
      baseDate.getUTCDate(),
    ));

    if (candidate >= today) {
      return candidate;
    }

    return new Date(Date.UTC(
      today.getUTCFullYear(),
      today.getUTCMonth() + 1,
      baseDate.getUTCDate(),
    ));
  }

  return null;
}

function anniversaryCandidates(anniversaries: Anniversary[], today: Date): ReminderCandidate[] {
  return anniversaries.flatMap((anniversary) => {
    const candidateDate = recurrenceDateFor(anniversary, today);
    if (!candidateDate) return [];

    const daysLeft = daysUntil(candidateDate, today);
    const enabledOffsets = [
      anniversary.notifySettings.t7 ? 7 : null,
      anniversary.notifySettings.t3 ? 3 : null,
      anniversary.notifySettings.t0 ? 0 : null,
    ].filter((value): value is number => value !== null);

    if (!enabledOffsets.includes(daysLeft)) {
      return [];
    }

    return [{
      eventId: anniversary.id,
      title: anniversary.title,
      date: formatDate(candidateDate),
      daysLeft,
      category: anniversary.category,
      source: "anniversary",
      enabledOffsets,
    }];
  });
}

function systemCandidates(couple: Couple, today: Date): ReminderCandidate[] {
  return computeUpcomingEvents(couple, today, 7)
    .filter((event) => [7, 3, 0].includes(event.daysLeft))
    .map((event: UpcomingEvent) => ({
      eventId: event.id,
      title: event.title,
      date: event.date,
      daysLeft: event.daysLeft,
      category: event.category,
      source: "system" as const,
      enabledOffsets: [7, 3, 0],
    }));
}

function buildReminderCopy(candidate: ReminderCandidate): { title: string; body: string } {
  if (candidate.daysLeft === 0) {
    return {
      title: `Hôm nay: ${candidate.title}`,
      body: "Đây là lúc tốt để nhắn một câu ngắn hoặc chuẩn bị một điều nhỏ.",
    };
  }

  return {
    title: `${candidate.title} còn ${candidate.daysLeft} ngày`,
    body: `Em+ nhắc bạn sớm để không bị muộn với mốc ${candidate.date}.`,
  };
}

export async function dispatchCoreReminders(now: Date = todayUtc()): Promise<{
  couplesScanned: number;
  remindersSent: number;
}> {
  const couples = await store.listAllCouples();
  let remindersSent = 0;

  for (const couple of couples) {
    if (couple.status !== "DATING" && couple.status !== "MARRIED") {
      continue;
    }

    const [partner1, partner2, anniversaries] = await Promise.all([
      store.getUserById(couple.partner1Id),
      couple.partner2Id ? store.getUserById(couple.partner2Id) : Promise.resolve(undefined),
      store.listAnniversariesByCouple(couple.id),
    ]);

    const users = [partner1, partner2].filter((value): value is NonNullable<typeof value> => Boolean(value));
    if (users.length === 0) {
      continue;
    }

    const candidates = [
      ...systemCandidates(couple, now),
      ...anniversaryCandidates(anniversaries, now),
    ];

    for (const candidate of candidates) {
      const copy = buildReminderCopy(candidate);

      for (const user of users) {
        await notify({
          id: reminderIdFor(user.id, candidate),
          userId: user.id,
          coupleId: couple.id,
          type: "reminder",
          title: copy.title,
          body: copy.body,
          iconName: candidate.category === "LOVE" ? "heart-outline" : "calendar-outline",
          iconColor: candidate.category === "LOVE" ? "#e11d48" : "#4f46e5",
          iconBg: candidate.category === "LOVE" ? "#ffe4e6" : "#eef2ff",
          actionLabel: "Xem nhắc nhở",
          metadata: {
            eventId: candidate.eventId,
            source: candidate.source,
            eventDate: candidate.date,
            daysLeft: candidate.daysLeft,
          },
          url: "/(tabs)/notifications",
        });
        remindersSent += 1;
      }
    }
  }

  return {
    couplesScanned: couples.length,
    remindersSent,
  };
}
