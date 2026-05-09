import type { AutoMilestone, CustomMilestone, Milestone } from "../types.ts";
import { addDays, formatDate, parseDate, setYearSafe, todayUtc } from "../shared/date.ts";

const DAY_MILESTONES = [7, 30, 50, 100, 200, 365, 500, 1000] as const;
const MAX_YEARLY_ANNIVERSARY = 10;

function dayMilestoneKey(days: number): string {
  return `day-${days}`;
}

function yearlyMilestoneKey(year: number): string {
  return `year-${year}`;
}

function dayMilestoneTitle(days: number): string {
  return `Kỷ niệm ${days} ngày yêu`;
}

function yearlyMilestoneTitle(year: number): string {
  return `Kỷ niệm ${year} năm yêu`;
}

function isImportantDayMilestone(days: number): boolean {
  return days >= 100 || days === 30;
}

export function generateAutoMilestones(loveStartDate?: string): AutoMilestone[] {
  if (!loveStartDate) {
    return [];
  }

  const startDate = parseDate(loveStartDate);
  const milestones: AutoMilestone[] = [];

  for (const days of DAY_MILESTONES) {
    const sourceKey = dayMilestoneKey(days);
    milestones.push({
      id: `auto-${sourceKey}`,
      title: dayMilestoneTitle(days),
      date: formatDate(addDays(startDate, days - 1)),
      type: "AUTO",
      category: "ANNIVERSARY",
      sourceKey,
      isImportant: isImportantDayMilestone(days),
    });
  }

  for (let year = 1; year <= MAX_YEARLY_ANNIVERSARY; year += 1) {
    const sourceKey = yearlyMilestoneKey(year);
    milestones.push({
      id: `auto-${sourceKey}`,
      title: yearlyMilestoneTitle(year),
      date: formatDate(setYearSafe(startDate, startDate.getUTCFullYear() + year)),
      type: "AUTO",
      category: "ANNIVERSARY",
      sourceKey,
      isImportant: true,
    });
  }

  return milestones.sort((a, b) => a.date.localeCompare(b.date) || a.sourceKey.localeCompare(b.sourceKey));
}

function milestoneDate(milestone: Milestone): string {
  return milestone.type === "AUTO" ? milestone.date : milestone.milestoneDate;
}

export function calculateNextMilestone(
  milestones: Milestone[],
  fromDate: Date = todayUtc(),
): Milestone | null {
  const today = formatDate(fromDate);

  return milestones
    .filter((milestone) => milestoneDate(milestone) >= today)
    .sort((a, b) => milestoneDate(a).localeCompare(milestoneDate(b)))[0] ?? null;
}

export function combineMilestones(
  autoMilestones: AutoMilestone[],
  customMilestones: CustomMilestone[],
): Milestone[] {
  return [...autoMilestones, ...customMilestones].sort((a, b) =>
    milestoneDate(a).localeCompare(milestoneDate(b)),
  );
}
