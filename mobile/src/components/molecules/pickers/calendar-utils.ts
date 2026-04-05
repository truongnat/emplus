/** Pure helpers — dùng cho lưới lịch, dễ test và tránh tạo Date thừa trong render. */

export function addDays(d: Date, n: number): Date {
  const x = new Date(d);
  x.setDate(x.getDate() + n);
  return x;
}

export function sameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export function startOfGrid(year: number, monthIndex: number): Date {
  const first = new Date(year, monthIndex, 1);
  const wd = first.getDay();
  const fromMonday = wd === 0 ? 6 : wd - 1;
  return new Date(year, monthIndex, 1 - fromMonday);
}

export function daysInMonth(year: number, monthIndex: number): number {
  return new Date(year, monthIndex + 1, 0).getDate();
}

/** Giữ ngày trong tháng hợp lệ khi đổi tháng/năm (vd. 31/1 → 28/2). */
export function clampDayInMonth(
  year: number,
  monthIndex: number,
  day: number,
): number {
  const max = daysInMonth(year, monthIndex);
  return Math.min(day, max);
}
