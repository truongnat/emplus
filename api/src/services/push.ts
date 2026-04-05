import { env } from "../config/env.ts";

const EXPO_PUSH_URL = "https://exp.host/--/api/v2/push/send";

export interface ExpoPushMessage {
  to: string;
  title: string;
  body?: string;
  data?: Record<string, unknown>;
  sound?: "default" | null;
  badge?: number;
  channelId?: string;
}

interface ExpoPushTicket {
  status: "ok" | "error";
  id?: string;
  message?: string;
  details?: { error?: string };
}

export async function sendExpoPush(messages: ExpoPushMessage[]): Promise<ExpoPushTicket[]> {
  if (messages.length === 0) return [];

  const validMessages = messages.filter((m) => m.to && m.to.startsWith("ExponentPushToken["));
  if (validMessages.length === 0) return [];

  try {
    const response = await fetch(EXPO_PUSH_URL, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Accept-Encoding": "gzip, deflate",
      },
      body: JSON.stringify(validMessages),
    });

    if (!response.ok) {
      console.error(`[Push] Expo API returned ${response.status}`);
      return [];
    }

    const result = (await response.json()) as { data: ExpoPushTicket[] };
    const tickets = result.data ?? [];

    for (const ticket of tickets) {
      if (ticket.status === "error") {
        console.error(`[Push] Ticket error: ${ticket.message}`, ticket.details);
      }
    }

    return tickets;
  } catch (error) {
    console.error("[Push] Failed to send:", error);
    return [];
  }
}

export async function sendPushToUser(
  expoPushToken: string | null | undefined,
  title: string,
  body?: string,
  data?: Record<string, unknown>,
): Promise<void> {
  if (!expoPushToken) return;

  await sendExpoPush([
    {
      to: expoPushToken,
      title,
      body,
      data,
      sound: "default",
    },
  ]);
}
