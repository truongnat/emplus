import { store } from "../store.ts";
import { sendPushToUser } from "./push.ts";
import { sendNotificationEmail } from "./mail.ts";
import type { InAppNotification } from "../types.ts";

export interface NotifyInput {
  userId: string;
  coupleId?: string;
  type: string;
  title: string;
  body?: string;
  iconName?: string;
  iconColor?: string;
  iconBg?: string;
  actionLabel?: string;
  metadata?: Record<string, unknown>;
  /** Deep link path for push tap, e.g. "/(tabs)/notifications" */
  url?: string;
}

/**
 * Single entry point: creates in-app notification, sends push, optionally sends email.
 * Fire-and-forget push/email — failures are logged but never block the caller.
 */
export async function notify(input: NotifyInput): Promise<InAppNotification> {
  const notification = await store.createInAppNotification({
    userId: input.userId,
    coupleId: input.coupleId,
    type: input.type,
    title: input.title,
    body: input.body,
    iconName: input.iconName,
    iconColor: input.iconColor,
    iconBg: input.iconBg,
    actionLabel: input.actionLabel,
    metadata: input.metadata,
  });

  const user = await store.getUserById(input.userId);
  if (!user) return notification;

  const pushToken = await store.getExpoPushToken(input.userId);

  sendPushToUser(
    pushToken,
    input.title,
    input.body,
    { url: input.url ?? "/(tabs)/notifications", notificationId: notification.id },
  ).catch((err) => console.error("[Notify] Push failed:", err));

  if (user.emailNotificationsEnabled) {
    sendNotificationEmail(user.email, input.title, input.body).catch((err) =>
      console.error("[Notify] Email failed:", err),
    );
  }

  return notification;
}

/**
 * Notify the partner in a couple (the user who is NOT senderId).
 */
export async function notifyPartner(
  senderId: string,
  coupleId: string,
  input: Omit<NotifyInput, "userId" | "coupleId">,
): Promise<void> {
  const couple = await store.getCoupleById(coupleId);
  if (!couple) return;

  const partnerId = couple.partner1Id === senderId ? couple.partner2Id : couple.partner1Id;
  if (!partnerId) return;

  await notify({ ...input, userId: partnerId, coupleId });
}
