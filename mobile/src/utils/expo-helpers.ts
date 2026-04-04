import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";
import * as Sharing from "expo-sharing";
import * as WebBrowser from "expo-web-browser";
import * as Clipboard from "expo-clipboard";
import * as Notifications from "expo-notifications";
import { Platform } from "react-native";

/**
 * Image & Media Helpers
 */
/** Chọn nhiều ảnh từ thư viện (timeline / kỷ niệm). */
export async function pickMemoryImages(
  maxCount: number,
  options: ImagePicker.ImagePickerOptions = {},
): Promise<ImagePicker.ImagePickerAsset[]> {
  const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (status !== "granted") {
    throw new Error("Permission to access media library was denied");
  }

  const safeMax = Math.min(24, Math.max(1, maxCount));
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ["images"],
    allowsMultipleSelection: true,
    selectionLimit: safeMax,
    allowsEditing: false,
    quality: 0.75,
    exif: false,
    preferredAssetRepresentationMode:
      ImagePicker.UIImagePickerPreferredAssetRepresentationMode.Compatible,
    ...options,
  });

  if (result.canceled) return [];
  return result.assets ?? [];
}

export async function pickImage(options: ImagePicker.ImagePickerOptions = {}) {
  const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (status !== "granted") {
    throw new Error("Permission to access media library was denied");
  }

  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ["images"],
    allowsEditing: true,
    aspect: [1, 1],
    quality: 0.8,
    ...options,
  });

  return result.canceled ? null : result.assets[0];
}

export async function takePhoto(options: ImagePicker.ImagePickerOptions = {}) {
  const { status } = await ImagePicker.requestCameraPermissionsAsync();
  if (status !== "granted") {
    throw new Error("Permission to access camera was denied");
  }

  const result = await ImagePicker.launchCameraAsync({
    allowsEditing: true,
    aspect: [1, 1],
    quality: 0.8,
    ...options,
  });

  return result.canceled ? null : result.assets[0];
}

/**
 * File & Sharing Helpers
 */
export async function pickDocument(
  options: DocumentPicker.DocumentPickerOptions = {},
) {
  const result = await DocumentPicker.getDocumentAsync(options);
  return result.canceled ? null : result.assets[0];
}

export async function shareFile(url: string, title?: string) {
  const isAvailable = await Sharing.isAvailableAsync();
  if (!isAvailable) {
    throw new Error("Sharing is not available on this platform");
  }
  return Sharing.shareAsync(url, { dialogTitle: title });
}

/**
 * Browser & Web Helpers
 */
export async function openWebBrowser(url: string) {
  return WebBrowser.openBrowserAsync(url);
}

/**
 * Clipboard Helpers
 */
export async function copyToClipboard(text: string) {
  await Clipboard.setStringAsync(text);
  return true;
}

/**
 * Notification Helpers
 */
export async function requestNotificationPermissions() {
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== "granted") {
    return false;
  }

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  return true;
}

export async function getPushToken() {
  const hasPermission = await requestNotificationPermissions();
  if (!hasPermission) return null;

  const token = (await Notifications.getExpoPushTokenAsync()).data;
  return token;
}
