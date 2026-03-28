import Constants from "expo-constants";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { Platform } from "react-native";
import { dependencies } from "@/src/framework/di/dependencies";

const ANDROID_CHANNEL_ID = "default";

/**
 * Xin quyền (nếu cần), lấy Expo push token và gửi lên API.
 * Chỉ chạy trên thiết bị thật; web/simulator bỏ qua.
 */
export async function syncExpoPushTokenToServer(): Promise<void> {
  if (!Device.isDevice) {
    return;
  }

  const { status: existing } = await Notifications.getPermissionsAsync();
  let finalStatus = existing;
  if (finalStatus !== "granted") {
    const req = await Notifications.requestPermissionsAsync();
    finalStatus = req.status;
  }
  if (finalStatus !== "granted") {
    return;
  }

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync(ANDROID_CHANNEL_ID, {
      name: "Thông báo",
      importance: Notifications.AndroidImportance.DEFAULT,
    });
  }

  const extra = Constants.expoConfig?.extra as { eas?: { projectId?: string } } | undefined;
  const projectId = extra?.eas?.projectId ?? Constants.easConfig?.projectId;
  if (!projectId) {
    return;
  }

  const { data } = await Notifications.getExpoPushTokenAsync({ projectId });
  if (!data) {
    return;
  }

  await dependencies.auth.registerPushToken.execute({ expoPushToken: data });
}
