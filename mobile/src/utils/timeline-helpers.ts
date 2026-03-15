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

  // Format YYYY-MM-DD to more readable if needed, but the current app uses raw ISO string
  return dateString;
}

export function parseMediaUrls(mediaUrlsInput: any): string[] {
  if (Array.isArray(mediaUrlsInput)) {
    return mediaUrlsInput;
  }
  if (typeof mediaUrlsInput === "string") {
    try {
      return JSON.parse(mediaUrlsInput);
    } catch {
      return [];
    }
  }
  return [];
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
