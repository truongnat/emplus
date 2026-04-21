import { describe, it, expect } from "bun:test";
import { computeUpcomingEvents } from "../engines/anniversary";
import type { Couple } from "../types";
import { parseDate } from "../shared/date";

describe("Anniversary Engine", () => {
  const mockCouple: Couple = {
    id: "test-couple",
    partner1Id: "user-1",
    partner2Id: "user-2",
    status: "DATING",
    settings: {},
    createdAt: "2024-01-01T00:00:00Z",
  };

  it("should return empty array if loveStartDate is missing", () => {
    const today = new Date(Date.UTC(2024, 0, 1));
    const events = computeUpcomingEvents(mockCouple, today);
    expect(events).toEqual([]);
  });

  it("should identify upcoming day milestones within window", () => {
    // loveStartDate is 2024-01-01
    // today is 2024-01-25
    // 30-day milestone is 2024-01-30 (loveStartDate + 29 days)
    // 30 - 25 = 5 days left
    const couple = { ...mockCouple, loveStartDate: "2024-01-01" };
    const today = new Date(Date.UTC(2024, 0, 25));
    const events = computeUpcomingEvents(couple, today, 10);

    expect(events).toHaveLength(1);
    expect(events[0].title).toBe("Kỷ niệm 30 ngày yêu");
    expect(events[0].daysLeft).toBe(5);
    expect(events[0].priority).toBe("MEDIUM");
  });

  it("should identify upcoming year milestones", () => {
    // loveStartDate is 2023-01-01
    // today is 2023-12-25
    // 1-year anniversary is 2024-01-01
    // daysLeft: 25th (0), 26, 27, 28, 29, 30, 31, 1st -> 7 days
    const couple = { ...mockCouple, loveStartDate: "2023-01-01" };
    const today = new Date(Date.UTC(2023, 11, 25));
    const events = computeUpcomingEvents(couple, today, 30);

    const yearEvent = events.find(e => e.title.includes("1 năm"));
    expect(yearEvent).toBeDefined();
    expect(yearEvent?.daysLeft).toBe(7);
    expect(yearEvent?.priority).toBe("HIGH");
  });

  it("should handle window boundaries", () => {
    const couple = { ...mockCouple, loveStartDate: "2024-01-01" };
    const today = new Date(Date.UTC(2024, 0, 1)); // day 1

    // Milestone 30 is at day 30.
    // Day 1 to Day 30 is 29 days diff.
    const events = computeUpcomingEvents(couple, today, 29);
    expect(events.some(e => e.title.includes("30 ngày"))).toBe(true);

    const eventsOutside = computeUpcomingEvents(couple, today, 28);
    expect(eventsOutside.some(e => e.title.includes("30 ngày"))).toBe(false);
  });

  it("should handle leap years correctly (Feb 29 anniversary)", () => {
    // loveStartDate is 2024-02-29 (Leap year)
    const couple = { ...mockCouple, loveStartDate: "2024-02-29" };

    // In 2025 (not a leap year), it should fall on Feb 28 according to setYearSafe
    const today = new Date(Date.UTC(2025, 1, 15));
    const events = computeUpcomingEvents(couple, today, 30);

    const yearEvent = events.find(e => e.title.includes("1 năm"));
    expect(yearEvent).toBeDefined();
    expect(yearEvent?.date).toBe("2025-02-28");
    expect(yearEvent?.daysLeft).toBe(13);
  });

  it("should handle year-end wrap-around", () => {
    const couple = { ...mockCouple, loveStartDate: "2023-01-05" };
    const today = new Date(Date.UTC(2023, 11, 28)); // Dec 28
    const events = computeUpcomingEvents(couple, today, 30);

    const yearEvent = events.find(e => e.title.includes("1 năm"));
    expect(yearEvent).toBeDefined();
    expect(yearEvent?.date).toBe("2024-01-05");
    expect(yearEvent?.daysLeft).toBe(8);
  });

  it("should prioritize and sort events by daysLeft", () => {
    const couple = { ...mockCouple, loveStartDate: "2024-01-01" };
    // At some point we might have both a day milestone and a year milestone close together
    // Let's pick a date where 365 days (1 year) and maybe 400 days milestone might appear?
    // Actually day milestones are 30, 60, 100, 200, 300, 500, ...
    // 1 year (366 days in 2024) is close to 300 or 500? No.

    const today = new Date(Date.UTC(2024, 11, 15)); // Dec 15, 2024
    // 2024-01-01 to 2024-12-15 is ~350 days.
    // Next milestones: 1 year (2025-01-01), 500 days (2025-05-15?)

    const events = computeUpcomingEvents(couple, today, 60);

    // 1 year: 2025-01-01. Days from 2024-12-15 to 2025-01-01 = 17 days.
    expect(events[0].title).toBe("Kỷ niệm 1 năm yêu");
    expect(events[0].daysLeft).toBe(17);
  });

  it("should correctly identify high priority for day milestones >= 500", () => {
    const couple = { ...mockCouple, loveStartDate: "2020-01-01" };
    // 500 days from 2020-01-01
    // 2020 is leap year (366 days).
    // 500 - 366 = 134 days into 2021.
    // Jan (31), Feb (28), Mar (31), Apr (30) = 120.
    // May 14th 2021 is day 500.

    const today = new Date(Date.UTC(2021, 4, 10)); // May 10, 2021
    const events = computeUpcomingEvents(couple, today, 10);

    const milestone500 = events.find(e => e.title.includes("500 ngày"));
    expect(milestone500).toBeDefined();
    expect(milestone500?.priority).toBe("HIGH");

    // Milestone 300 should be MEDIUM
    const today300 = new Date(Date.UTC(2020, 9, 20)); // ~300 days from Jan 1
    const events300 = computeUpcomingEvents(couple, today300, 10);
    const milestone300 = events300.find(e => e.title.includes("300 ngày"));
    expect(milestone300?.priority).toBe("MEDIUM");
  });
});
