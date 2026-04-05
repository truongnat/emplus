/**
 * Chuẩn hoá ngày cho UI Việt Nam vs API (ISO date).
 */

/** Parse YYYY-MM-DD thành Date local (không UTC shift). */
export function parseIsoDate(iso: string | undefined | null): Date | null {
  if (!iso?.trim()) return null;
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso.trim());
  if (!m) return null;
  const y = Number(m[1]);
  const mo = Number(m[2]) - 1;
  const d = Number(m[3]);
  const dt = new Date(y, mo, d);
  if (
    dt.getFullYear() !== y ||
    dt.getMonth() !== mo ||
    dt.getDate() !== d
  ) {
    return null;
  }
  return dt;
}

/** Gửi API / lưu DB: YYYY-MM-DD */
export function toIsoDateString(d: Date): string {
  const y = d.getFullYear();
  const m = `${d.getMonth() + 1}`.padStart(2, "0");
  const day = `${d.getDate()}`.padStart(2, "0");
  return `${y}-${m}-${day}`;
}

/**
 * Hiển thị ngày sinh: D/M/YYYY (tháng/ngày không pad — vd. 17/6/2001).
 */
export function formatDobDisplayVn(iso: string | undefined | null): string {
  const d = parseIsoDate(iso);
  if (!d) return "";
  return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
}

/** HH:mm 24h từ Date */
export function formatTimeHmFromDate(d: Date): string {
  const h = `${d.getHours()}`.padStart(2, "0");
  const m = `${d.getMinutes()}`.padStart(2, "0");
  return `${h}:${m}`;
}

/** Parse "HH:mm" hoặc "H:mm" → { h, m } hoặc null */
export function parseTimeHm(s: string | undefined | null): {
  h: number;
  m: number;
} | null {
  if (!s?.trim()) return null;
  const m = /^(\d{1,2}):(\d{2})$/.exec(s.trim());
  if (!m) return null;
  const h = Number(m[1]);
  const min = Number(m[2]);
  if (h < 0 || h > 23 || min < 0 || min > 59) return null;
  return { h, m: min };
}

export function formatTimeHmNormalized(s: string | undefined | null): string {
  const p = parseTimeHm(s);
  if (!p) return "";
  return `${`${p.h}`.padStart(2, "0")}:${`${p.m}`.padStart(2, "0")}`;
}
