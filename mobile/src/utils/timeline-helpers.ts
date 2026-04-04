import { MemoryItem } from "../api";

export function toDateIso(input: Date): string {
  return input.toISOString().slice(0, 10);
}

export function formatGroupDate(dateString: string): string {
  const now = new Date();
  const today = now.toISOString().slice(0, 10);
  const yesterday = new Date(now.getTime() - 86400000)
    .toISOString()
    .slice(0, 10);

  if (dateString === today) return "HÔM NAY";
  if (dateString === yesterday) return "HÔM QUA";

  if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
    const [y, m, d] = dateString.split("-");
    return `${d}/${m}/${y}`;
  }
  return dateString;
}

function coerceUrl(entry: unknown): string | null {
  if (typeof entry === "string" && entry.trim().length > 0) {
    return entry.trim();
  }
  if (entry && typeof entry === "object" && "url" in entry) {
    const u = (entry as { url?: unknown }).url;
    if (typeof u === "string" && u.trim().length > 0) return u.trim();
  }
  return null;
}

export function parseMediaUrls(mediaUrlsInput: any): string[] {
  let raw: unknown[] = [];
  if (Array.isArray(mediaUrlsInput)) {
    raw = mediaUrlsInput;
  } else if (typeof mediaUrlsInput === "string") {
    try {
      const parsed = JSON.parse(mediaUrlsInput);
      raw = Array.isArray(parsed) ? parsed : [];
    } catch {
      raw = [];
    }
  }
  const out: string[] = [];
  for (const entry of raw) {
    const u = coerceUrl(entry);
    if (u) out.push(u);
  }
  return out;
}

export function getMemoryTime(createdAt?: string): string {
  if (!createdAt) return "Bây giờ";
  try {
    const dt = new Date(createdAt);
    return dt.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  } catch {
    return "Bây giờ";
  }
}

export function getAxisMonthYear(item: MemoryItem): string {
  try {
    const dt = new Date(item.createdAt || item.memoryDate);
    const dd = String(dt.getDate()).padStart(2, "0");
    const mm = String(dt.getMonth() + 1).padStart(2, "0");
    const yy = String(dt.getFullYear()).slice(-2);
    return `${dd}/${mm}/${yy}`;
  } catch {
    return "--/--/--";
  }
}
