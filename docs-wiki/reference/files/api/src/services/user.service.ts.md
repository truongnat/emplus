---
title: "api/src/services/user.service.ts"
description: "Provides 3 documented symbols in api/src/services/user.service.ts."
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
  page: "reference/files/api/src/services/user.service.ts.md"
  relativePath: "api/src/services/user.service.ts"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/api/src/services/user.service.ts"
  module: "api/src/services"
  workspace: "api"
  language: "TypeScript"
  symbolCount: 3
---

# api/src/services/user.service.ts

- Overview: [emplus Docs Wiki](../../../../../index.md)
- Summary: [SUMMARY](../../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../../features/index.md)
- Module: [api/src/services](../../../../modules/api/src/services.md)
- Workspace: [@emplus/api](../../../../../workspaces/api.md)

## Snapshot

- Language: TypeScript
- Source path: `/Users/truongdq/tx/GitHub/emplus/api/src/services/user.service.ts`
- Lines: 146
- Symbols: 3

## Related Features

- [Authentication Read / List](../../../../../features/auth-list.md) - Authentication Read / List captures the read / list workflow inside authentication. It spans 3 workspaces.
- [Search Read / List](../../../../../features/search-list.md) - Search Read / List captures the read / list workflow inside search. It spans 3 workspaces.
- [Notifications Read / List](../../../../../features/notification-list.md) - Notifications Read / List captures the read / list workflow inside notifications. It spans 2 workspaces.
- [Storage Read / List](../../../../../features/storage-list.md) - Storage Read / List captures the read / list workflow inside storage. It spans 4 workspaces.
- [Integrations Read / List](../../../../../features/integration-list.md) - Integrations Read / List captures the read / list workflow inside integrations. It spans 3 workspaces.
- [User Management Read / List](../../../../../features/user-list.md) - User Management Read / List captures the read / list workflow inside user management. It spans 3 workspaces.
- [Notifications Notify](../../../../../features/notification-notify.md) - Notifications Notify captures the notify workflow inside notifications. It spans 2 workspaces.
- [Reporting Read / List](../../../../../features/reporting-list.md) - Reporting Read / List captures the read / list workflow inside reporting. It spans 2 workspaces.
- [Search Notify](../../../../../features/search-notify.md) - Search Notify captures the notify workflow inside search. It spans 2 workspaces.
- [Administration Read / List](../../../../../features/admin-list.md) - Administration Read / List captures the read / list workflow inside administration. It spans 2 workspaces.
- [Integrations Notify](../../../../../features/integration-notify.md) - Integrations Notify captures the notify workflow inside integrations. It spans 2 workspaces.
- [User Management Notify](../../../../../features/user-notify.md) - User Management Notify captures the notify workflow inside user management. It spans 2 workspaces.
- [Storage Notify](../../../../../features/storage-notify.md) - Storage Notify captures the notify workflow inside storage. It spans 2 workspaces.
- [Order Management Read / List](../../../../../features/order-list.md) - Order Management Read / List captures the read / list workflow inside order management. It spans 2 workspaces.
- [Administration Notify](../../../../../features/admin-notify.md) - Administration Notify captures the notify workflow inside administration. It spans 2 workspaces.
- [Order Management Notify](../../../../../features/order-notify.md) - Order Management Notify captures the notify workflow inside order management. It spans 2 workspaces.

## AI Summary

Provides 3 documented symbols in api/src/services/user.service.ts.

## Public API

- `interface UserProfile`
- `async function getUserProfile(userId: string): Promise<UserProfile | null>`
- `updateUserProfile`

```ts
async function updateUserProfile( userId: string, data: { fullName?: string; nickname?: string; avatarUrl?: string; profileBackgroundUrl?: string; gender?: string; dob?: string; birthTime?: string; timezone?: string; emailNotificationsEnabled?: boolean; profilePrivate?: boolean; showOnlineStatus?: boolean; }, ): Promise<UserProfile>
```


## Symbols

### interface `UserProfile`

- Signature: `interface UserProfile`
- Lines: 10-29
- Exported: yes

```ts
interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  nickname?: string;
  avatarUrl?: string;
  profileBackgroundUrl?: string;
  gender: Gender;
  dob?: string;
  birthTime?: string;
  timezone: string;
  emailNotificationsEnabled: boolean;
  profilePrivate: boolean;
  showOnlineStatus: boolean;
  isActive: boolean;
  isAdmin: boolean;
  createdAt: string;
  updatedAt: string;
  coupleId?: string;
}
```

### function `getUserProfile`

- Signature: `async function getUserProfile(userId: string): Promise<UserProfile | null>`
- Lines: 34-63
- Exported: yes

```ts
async function getUserProfile(userId: string): Promise<UserProfile | null> {
  const user = await store.getUserById(userId);
  if (!user) {
    return null;
  }

  // Get couple ID if user is in a couple
  const couple = await store.getActiveCoupleForUser(userId);

  return {
    id: user.id,
    email: user.email,
    fullName: user.fullName,
    nickname: user.nickname,
    avatarUrl: user.avatarUrl,
    profileBackgroundUrl: user.profileBackgroundUrl,
    gender: user.gender,
    dob: user.dob,
    birthTime: user.birthTime,
    timezone: user.timezone,
    emailNotificationsEnabled: user.emailNotificationsEnabled,
    profilePrivate: user.profilePrivate,
    showOnlineStatus: user.showOnlineStatus,
    isActive: user.isActive,
    isAdmin: user.isAdmin || false,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
    coupleId: couple?.id,
  };
}
```

### function `updateUserProfile`

- Signature:

```ts
async function updateUserProfile( userId: string, data: { fullName?: string; nickname?: string; avatarUrl?: string; profileBackgroundUrl?: string; gender?: string; dob?: string; birthTime?: string; timezone?: string; emailNotificationsEnabled?: boolean; profilePrivate?: boolean; showOnlineStatus?: boolean; }, ): Promise<UserProfile>
```
- Lines: 68-145
- Exported: yes

```ts
async function updateUserProfile(
  userId: string,
  data: {
    fullName?: string;
    nickname?: string;
    avatarUrl?: string;
    profileBackgroundUrl?: string;
    gender?: string;
    dob?: string;
    birthTime?: string;
    timezone?: string;
    emailNotificationsEnabled?: boolean;
    profilePrivate?: boolean;
    showOnlineStatus?: boolean;
  },
): Promise<UserProfile> {
  const user = await store.getUserById(userId);
  if (!user) {
    throw new AppError(404, "USER_NOT_FOUND", "Không tìm thấy người dùng.");
  }

  const updatedUser: User = {
    ...user,
    fullName: data.fullName?.trim() ?? user.fullName,
    nickname: data.nickname !== undefined ? (data.nickname?.trim() || undefined) : user.nickname,
    avatarUrl:
      data.avatarUrl === undefined
        ? user.avatarUrl
        : data.avatarUrl === ""
          ? undefined
          : data.avatarUrl.trim(),
    profileBackgroundUrl:
      data.profileBackgroundUrl === undefined
        ? user.profileBackgroundUrl
        : data.profileBackgroundUrl === ""
          ? undefined
          : data.profileBackgroundUrl.trim(),
    gender: data.gender ? chuanHoaGioiTinhDauVao(data.gender) : user.gender,
    dob: data.dob ?? user.dob,
    birthTime: data.birthTime !== undefined ? (data.birthTime?.trim() || undefined) : user.birthTime,
    timezone: data.timezone ?? user.timezone,
    emailNotificationsEnabled:
      data.emailNotificationsEnabled !== undefined
        ? data.emailNotificationsEnabled
        : user.emailNotificationsEnabled,
    profilePrivate:
      data.profilePrivate !== undefined ? data.profilePrivate : user.profilePrivate,
    showOnlineStatus:
      data.showOnlineStatus !== undefined ? data.showOnlineStatus : user.showOnlineStatus,
    updatedAt: new Date().toISOString(),
  };

  await store.saveUser(updatedUser);

  // Get couple ID if user is in a couple
  const couple = await store.getActiveCoupleForUser(userId);

  return {
    id: updatedUser.id,
    email: updatedUser.email,
    fullName: updatedUser.fullName,
    nickname: updatedUser.nickname,
    avatarUrl: updatedUser.avatarUrl,
    profileBackgroundUrl: updatedUser.profileBackgroundUrl,
    gender: updatedUser.gender,
    dob: updatedUser.dob,
    birthTime: updatedUser.birthTime,
    timezone: updatedUser.timezone,
    emailNotificationsEnabled: updatedUser.emailNotificationsEnabled,
    profilePrivate: updatedUser.profilePrivate,
    showOnlineStatus: updatedUser.showOnlineStatus,
    isActive: updatedUser.isActive,
    isAdmin: updatedUser.isAdmin || false,
    createdAt: updatedUser.createdAt,
    updatedAt: updatedUser.updatedAt,
    coupleId: couple?.id,
  };
}
```
