import Constants from "expo-constants";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { Platform } from "react-native";
import { dependencies } from "@/src/framework/di/dependencies";
import { getPushNotificationsPreference } from "@/src/features/notifications/push-notifications-preference";

const ANDROID_CHANNEL_ID = "default";

export type ExpoPushEnableResult =
  | { ok: true }
  | {
      ok: false;
      reason:
        | "not_device"
        | "permission_denied"
        | "no_project_id"
        | "no_token";
    };

/** Gửi `null` lên API để xóa token — server không gửi push tới thiết bị này nữa. */
export async function clearExpoPushTokenOnServer(): Promise<void> {
  await dependencies.auth.registerPushToken.execute({ expoPushToken: null });
}

/**
 * Xin quyền (nếu cần), lấy Expo push token và gửi lên API.
 * Chỉ thiết bị thật; trả lý do khi thất bại để UI hiển thị.
 */
export async function enableExpoPushOnServer(): Promise<ExpoPushEnableResult> {
  if (!Device.isDevice) {
    return { ok: false, reason: "not_device" };
  }

  const { status: existing } = await Notifications.getPermissionsAsync();
  let finalStatus = existing;
  if (finalStatus !== "granted") {
    const req = await Notifications.requestPermissionsAsync();
    finalStatus = req.status;
  }
  if (finalStatus !== "granted") {
    return { ok: false, reason: "permission_denied" };
  }

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync(ANDROID_CHANNEL_ID, {
      name: "Thông báo",
      importance: Notifications.AndroidImportance.DEFAULT,
    });
  }

  const extra = Constants.expoConfig?.extra as
    | { eas?: { projectId?: string } }
    | undefined;
  const projectId = extra?.eas?.projectId ?? Constants.easConfig?.projectId;
  if (!projectId) {
    return { ok: false, reason: "no_project_id" };
  }

  const { data } = await Notifications.getExpoPushTokenAsync({ projectId });
  if (!data) {
    return { ok: false, reason: "no_token" };
  }

  await dependencies.auth.registerPushToken.execute({ expoPushToken: data });
  return { ok: true };
}

/**
 * Nếu người dùng đã tắt trong Cài đặt → không đăng ký lại token.
 * Ngược lại: hành vi như trước (xin quyền + đồng bộ).
 */
export async function syncExpoPushTokenToServer(): Promise<void> {
  try {
    const wantPush = await getPushNotificationsPreference();
    if (!wantPush) {
      return;
    }
    await enableExpoPushOnServer();
  } catch {
    // Giữ tương thích: caller thường bọc .catch(() => {})
  }
}
