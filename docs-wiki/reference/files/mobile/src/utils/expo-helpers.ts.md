---
title: "mobile/src/utils/expo-helpers.ts"
description: "expo-utils"
layout: "doc"
outline: "deep"
editLink: false
lastUpdated: false
pageClass: "docs-wiki docs-wiki--file"
docsWiki:
  schemaVersion: "1.0.0"
  kind: "file"
  project: "emplus"
  template: "detailed"
  themePreset: "clean"
  generatedAt: "2026-04-10T00:09:32.387Z"
  page: "reference/files/mobile/src/utils/expo-helpers.ts.md"
  relativePath: "mobile/src/utils/expo-helpers.ts"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/mobile/src/utils/expo-helpers.ts"
  module: "mobile/src/utils"
  workspace: "mobile"
  language: "TypeScript"
  symbolCount: 10
---

# mobile/src/utils/expo-helpers.ts

- Overview: [emplus Docs Wiki](../../../../../index.md)
- Summary: [SUMMARY](../../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../../features/index.md)
- Module: [mobile/src/utils](../../../../modules/mobile/src/utils.md)
- Workspace: [@emplus/mobile](../../../../../workspaces/mobile.md)

## Snapshot

- Language: TypeScript
- Source path: `/Users/truongdq/tx/GitHub/emplus/mobile/src/utils/expo-helpers.ts`
- Lines: 159
- Symbols: 10

## Related Features

- [Authentication Read / List](../../../../../features/auth-list.md) - Authentication Read / List captures the read / list workflow inside authentication. It spans 3 workspaces.
- [Notifications Read / List](../../../../../features/notification-list.md) - Notifications Read / List captures the read / list workflow inside notifications. It spans 2 workspaces.
- [Storage Read / List](../../../../../features/storage-list.md) - Storage Read / List captures the read / list workflow inside storage. It spans 4 workspaces.

## AI Summary

expo-utils

### Responsibilities

- gets or sets images from media library

### Usage Notes

- uses ImagePicker for media library access and ImagePicker for image selection

## Public API

- `async function pickMemoryImages( maxCount: number, options: ImagePicker.ImagePickerOptions = {}, ): Promise<ImagePicker.ImagePickerAsset[]>` — gets the maximum number of images to pick,
- `async function pickImage(options: ImagePicker.ImagePickerOptions = {})` — picked image asset to return, or `null` if canceled
- `async function pickBannerImage( options: ImagePicker.ImagePickerOptions = {}, )` — gets the first banner image picked
- `async function takePhoto(options: ImagePicker.ImagePickerOptions = {})` — takes a photo from camera or gallery and returns it as an Expo asset
- `async function pickDocument( options: DocumentPicker.DocumentPickerOptions = {}, )` — gets the first supported document picked by DocumentPicker
- `async function shareFile(url: string, title?: string)` — shares a file on an Expo platform and opens it in openWebBrowser
- `async function openWebBrowser(url: string)` — opens the specified URL in openWebBrowser
- `async function copyToClipboard(text: string)` — copies text to clipboard and returns true
- `async function requestNotificationPermissions()` — gets notification access permissions and asks user to grant if necessary
- `async function getPushToken()` — gets Expo push token (not available on mobile platforms)

## Symbols

### function `pickMemoryImages`

- Signature: `async function pickMemoryImages( maxCount: number, options: ImagePicker.ImagePickerOptions = {}, ): Promise<ImagePicker.ImagePickerAsset[]>`
- Lines: 13-37
- Exported: yes
- Summary: gets the maximum number of images to pick,

```ts
async function pickMemoryImages(
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
```

### function `pickImage`

- Signature: `async function pickImage(options: ImagePicker.ImagePickerOptions = {})`
- Lines: 39-54
- Exported: yes
- Summary: picked image asset to return, or `null` if canceled

```ts
async function pickImage(options: ImagePicker.ImagePickerOptions = {}) {
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
```

### function `pickBannerImage`

- Signature: `async function pickBannerImage( options: ImagePicker.ImagePickerOptions = {}, )`
- Lines: 57-73
- Exported: yes
- Summary: gets the first banner image picked

```ts
async function pickBannerImage(
  options: ImagePicker.ImagePickerOptions = {},
) {
  const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (status !== "granted") {
    throw new Error("Permission to access media library was denied");
  }

  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ["images"],
    allowsEditing: false,
    quality: 0.85,
    ...options,
  });

  return result.canceled ? null : result.assets[0];
}
```

### function `takePhoto`

- Signature: `async function takePhoto(options: ImagePicker.ImagePickerOptions = {})`
- Lines: 75-89
- Exported: yes
- Summary: takes a photo from camera or gallery and returns it as an Expo asset

```ts
async function takePhoto(options: ImagePicker.ImagePickerOptions = {}) {
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
```

### function `pickDocument`

- Signature: `async function pickDocument( options: DocumentPicker.DocumentPickerOptions = {}, )`
- Lines: 94-99
- Exported: yes
- Summary: gets the first supported document picked by DocumentPicker

```ts
async function pickDocument(
  options: DocumentPicker.DocumentPickerOptions = {},
) {
  const result = await DocumentPicker.getDocumentAsync(options);
  return result.canceled ? null : result.assets[0];
}
```

### function `shareFile`

- Signature: `async function shareFile(url: string, title?: string)`
- Lines: 101-107
- Exported: yes
- Summary: shares a file on an Expo platform and opens it in openWebBrowser

```ts
async function shareFile(url: string, title?: string) {
  const isAvailable = await Sharing.isAvailableAsync();
  if (!isAvailable) {
    throw new Error("Sharing is not available on this platform");
  }
  return Sharing.shareAsync(url, { dialogTitle: title });
}
```

### function `openWebBrowser`

- Signature: `async function openWebBrowser(url: string)`
- Lines: 112-114
- Exported: yes
- Summary: opens the specified URL in openWebBrowser

```ts
async function openWebBrowser(url: string) {
  return WebBrowser.openBrowserAsync(url);
}
```

### function `copyToClipboard`

- Signature: `async function copyToClipboard(text: string)`
- Lines: 119-122
- Exported: yes
- Summary: copies text to clipboard and returns true

```ts
async function copyToClipboard(text: string) {
  await Clipboard.setStringAsync(text);
  return true;
}
```

### function `requestNotificationPermissions`

- Signature: `async function requestNotificationPermissions()`
- Lines: 127-150
- Exported: yes
- Summary: gets notification access permissions and asks user to grant if necessary

```ts
async function requestNotificationPermissions() {
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
```

### function `getPushToken`

- Signature: `async function getPushToken()`
- Lines: 152-158
- Exported: yes
- Summary: gets Expo push token (not available on mobile platforms)

```ts
async function getPushToken() {
  const hasPermission = await requestNotificationPermissions();
  if (!hasPermission) return null;

  const token = (await Notifications.getExpoPushTokenAsync()).data;
  return token;
}
```
