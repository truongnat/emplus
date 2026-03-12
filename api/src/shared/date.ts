/**
 * Date utilities
 */

const DAY_MS = 24 * 60 * 60 * 1000;

export function todayUtc(): Date {
  return stripToUtcDay(new Date());
}

export function stripToUtcDay(input: Date): Date {
  return new Date(Date.UTC(input.getUTCFullYear(), input.getUTCMonth(), input.getUTCDate()));
}

export function parseDate(date: string): Date {
  const [year, month, day] = date.split("-").map((part) => Number(part));
  if (!year || !month || !day) {
    throw new Error(`Invalid date format: ${date}`);
  }

  const parsed = new Date(Date.UTC(year, month - 1, day));
  if (Number.isNaN(parsed.getTime())) {
    throw new Error(`Invalid date value: ${date}`);
  }

  return parsed;
}

export function formatDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

export function addDays(date: Date, days: number): Date {
  return new Date(date.getTime() + days * DAY_MS);
}

export function diffDays(start: Date, end: Date): number {
  const startDay = stripToUtcDay(start).getTime();
  const endDay = stripToUtcDay(end).getTime();
  return Math.floor((endDay - startDay) / DAY_MS);
}

export function daysUntil(target: Date, from: Date): number {
  return diffDays(from, target);
}

export function setYearSafe(date: Date, year: number): Date {
  const month = date.getUTCMonth();
  const day = date.getUTCDate();
  const candidate = new Date(Date.UTC(year, month, day));

  if (candidate.getUTCMonth() === month) {
    return candidate;
  }

  return new Date(Date.UTC(year, month + 1, 0));
}
