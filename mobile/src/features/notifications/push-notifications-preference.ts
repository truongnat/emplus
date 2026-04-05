import AsyncStorage from "@react-native-async-storage/async-storage";
import appConfig from "@/src/core/config/app-config";

/**
 * Ý định bật thông báo đẩy (đồng bộ token lên server khi có quyền OS).
 * `null` trong storage = chưa từng chọn → giữ tương thích: coi như bật.
 */
export async function getPushNotificationsPreference(): Promise<boolean> {
  try {
    const raw = await AsyncStorage.getItem(
      appConfig.storage.pushNotificationsEnabled,
    );
    if (raw === null) {
      return true;
    }
    return raw === "1";
  } catch {
    return true;
  }
}

export async function setPushNotificationsPreference(
  enabled: boolean,
): Promise<void> {
  await AsyncStorage.setItem(
    appConfig.storage.pushNotificationsEnabled,
    enabled ? "1" : "0",
  );
}
