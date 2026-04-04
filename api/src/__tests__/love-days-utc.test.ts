import { describe, expect, it } from "bun:test";
import { diffDays, parseDate, stripToUtcDay } from "../shared/date.ts";

/** Cùng công thức `dashboard.ts` và mobile `computeLoveDaysFromStart`. */
function loveDaysFromStart(loveStartYmd: string, now: Date): number {
  const start = parseDate(loveStartYmd.slice(0, 10));
  const today = stripToUtcDay(now);
  return diffDays(start, today) + 1;
}

describe("love days (UTC calendar)", () => {
  it("ngày đầu = 1", () => {
    const start = "2026-04-01";
    const noon = new Date(Date.UTC(2026, 3, 1, 12, 0, 0));
    expect(loveDaysFromStart(start, noon)).toBe(1);
  });

  it("tăng đúng qua từng ngày UTC", () => {
    const start = "2026-04-01";
    expect(
      loveDaysFromStart(start, new Date(Date.UTC(2026, 3, 2, 8, 0, 0))),
    ).toBe(2);
    expect(
      loveDaysFromStart(start, new Date(Date.UTC(2026, 3, 5, 23, 59, 0))),
    ).toBe(5);
  });
});
