---
title: "mobile/src/lib/sync-expo-push-token.ts"
description: "Provides functions for enabling and disabling Expo push notifications on the server-side"
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
  page: "reference/files/mobile/src/lib/sync-expo-push-token.ts.md"
  relativePath: "mobile/src/lib/sync-expo-push-token.ts"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/mobile/src/lib/sync-expo-push-token.ts"
  module: "mobile/src/lib"
  workspace: "mobile"
  language: "TypeScript"
  symbolCount: 4
---

# mobile/src/lib/sync-expo-push-token.ts

- Overview: [emplus Docs Wiki](../../../../../index.md)
- Summary: [SUMMARY](../../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../../features/index.md)
- Module: [mobile/src/lib](../../../../modules/mobile/src/lib.md)
- Workspace: [@emplus/mobile](../../../../../workspaces/mobile.md)

## Snapshot

- Language: TypeScript
- Source path: `/Users/truongdq/tx/GitHub/emplus/mobile/src/lib/sync-expo-push-token.ts`
- Lines: 84
- Symbols: 4

## AI Summary

Provides functions for enabling and disabling Expo push notifications on the server-side

### Responsibilities

- These exports provide functions to manage Expo push notifications, including enabling/disabling and syncing them with a Push Token.

### Usage Notes

- The following functions must be used correctly to avoid unexpected behavior: `clearExpoPushTokenOnServer` and `syncExpoPushTokenToServer`

## Public API

- `type ExpoPushEnableResult = | { ok: true } | { ok: false; reason: | "not_device" | "permission_denied" | "no_project_id" | "no_token"; };`
- `async function clearExpoPushTokenOnServer(): Promise<void>`
- `async function enableExpoPushOnServer(): Promise<ExpoPushEnableResult>`
- `async function syncExpoPushTokenToServer(): Promise<void>`

## Symbols

### type `ExpoPushEnableResult`

- Signature: `type ExpoPushEnableResult = | { ok: true } | { ok: false; reason: | "not_device" | "permission_denied" | "no_project_id" | "no_token"; };`
- Lines: 10-19
- Exported: yes

```ts
type ExpoPushEnableResult =
  | { ok: true }
  | {
      ok: false;
      reason:
        | "not_device"
        | "permission_denied"
        | "no_project_id"
        | "no_token";
    };
```

### function `clearExpoPushTokenOnServer`

- Signature: `async function clearExpoPushTokenOnServer(): Promise<void>`
- Lines: 22-24
- Exported: yes

```ts
async function clearExpoPushTokenOnServer(): Promise<void> {
  await dependencies.auth.registerPushToken.execute({ expoPushToken: null });
}
```

### function `enableExpoPushOnServer`

- Signature: `async function enableExpoPushOnServer(): Promise<ExpoPushEnableResult>`
- Lines: 30-67
- Exported: yes

```ts
async function enableExpoPushOnServer(): Promise<ExpoPushEnableResult> {
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
```

### function `syncExpoPushTokenToServer`

- Signature: `async function syncExpoPushTokenToServer(): Promise<void>`
- Lines: 73-83
- Exported: yes

```ts
async function syncExpoPushTokenToServer(): Promise<void> {
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
```
