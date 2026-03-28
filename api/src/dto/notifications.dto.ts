export type ListNotificationsQuery = {
  page: number;
  limit: number;
  unreadOnly: boolean;
};

function parsePositiveInt(value: string | undefined, fallback: number, max?: number): number {
  const n = Number(value);
  if (!Number.isFinite(n) || n < 1) {
    return fallback;
  }
  const i = Math.floor(n);
  if (max !== undefined) {
    return Math.min(max, i);
  }
  return i;
}

export function parseListNotificationsQuery(input: {
  page?: string;
  limit?: string;
  unread_only?: string;
}): ListNotificationsQuery {
  const page = parsePositiveInt(input.page, 1);
  const limit = parsePositiveInt(input.limit, 20, 50);
  const u = input.unread_only?.toLowerCase();
  const unreadOnly = u === "true" || u === "1";
  return { page, limit, unreadOnly };
}
