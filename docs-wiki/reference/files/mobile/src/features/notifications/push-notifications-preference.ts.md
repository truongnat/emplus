---
title: "mobile/src/features/notifications/push-notifications-preference.ts"
description: "gets the current push notification preference value from stored cache."
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
  page: "reference/files/mobile/src/features/notifications/push-notifications-preference.ts.md"
  relativePath: "mobile/src/features/notifications/push-notifications-preference.ts"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/mobile/src/features/notifications/push-notifications-preference.ts"
  module: "mobile/src/features/notifications"
  workspace: "mobile"
  language: "TypeScript"
  symbolCount: 2
---

# mobile/src/features/notifications/push-notifications-preference.ts

- Overview: [emplus Docs Wiki](../../../../../../index.md)
- Summary: [SUMMARY](../../../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../../../features/index.md)
- Module: [mobile/src/features/notifications](../../../../../modules/mobile/src/features/notifications.md)
- Workspace: [@emplus/mobile](../../../../../../workspaces/mobile.md)

## Snapshot

- Language: TypeScript
- Source path: `/Users/truongdq/tx/GitHub/emplus/mobile/src/features/notifications/push-notifications-preference.ts`
- Lines: 30
- Symbols: 2

## Related Features

- [Authentication Read / List](../../../../../../features/auth-list.md) - Authentication Read / List captures the read / list workflow inside authentication. It spans 3 workspaces.
- [Notifications Read / List](../../../../../../features/notification-list.md) - Notifications Read / List captures the read / list workflow inside notifications. It spans 2 workspaces.
- [Storage Read / List](../../../../../../features/storage-list.md) - Storage Read / List captures the read / list workflow inside storage. It spans 4 workspaces.

## AI Summary

gets the current push notification preference value from stored cache.

## Public API

- `async function getPushNotificationsPreference(): Promise<boolean>` — calls AsyncStorage.getItem to retrieve the raw storage value with key appConfig.storage.pushNotificationsEnabled.
- `async function setPushNotificationsPreference( enabled: boolean, ): Promise<void>` — sets the value of push notifications enabled in storage to the provided boolean value and caches it appropriately.

## Symbols

### function `getPushNotificationsPreference`

- Signature: `async function getPushNotificationsPreference(): Promise<boolean>`
- Lines: 8-20
- Exported: yes
- Summary: calls AsyncStorage.getItem to retrieve the raw storage value with key appConfig.storage.pushNotificationsEnabled.

```ts
async function getPushNotificationsPreference(): Promise<boolean> {
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
```

### function `setPushNotificationsPreference`

- Signature: `async function setPushNotificationsPreference( enabled: boolean, ): Promise<void>`
- Lines: 22-29
- Exported: yes
- Summary: sets the value of push notifications enabled in storage to the provided boolean value and caches it appropriately.

```ts
async function setPushNotificationsPreference(
  enabled: boolean,
): Promise<void> {
  await AsyncStorage.setItem(
    appConfig.storage.pushNotificationsEnabled,
    enabled ? "1" : "0",
  );
}
```
