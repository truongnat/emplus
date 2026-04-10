---
title: "api/src/types.ts"
description: "API type and interface documentation."
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
  page: "reference/files/api/src/types.ts.md"
  relativePath: "api/src/types.ts"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/api/src/types.ts"
  module: "api/src"
  workspace: "api"
  language: "TypeScript"
  symbolCount: 16
---

# api/src/types.ts

- Overview: [emplus Docs Wiki](../../../../index.md)
- Summary: [SUMMARY](../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../features/index.md)
- Module: [api/src](../../../modules/api/src.md)
- Workspace: [@emplus/api](../../../../workspaces/api.md)

## Snapshot

- Language: TypeScript
- Source path: `/Users/truongdq/tx/GitHub/emplus/api/src/types.ts`
- Lines: 159
- Symbols: 16

## Related Features

- [Authentication Login](../../../../features/auth-login.md) - Authentication Login captures the login workflow inside authentication. It spans 2 workspaces. Key flows include Auth login, Auth registration, Auth login.
- [Authentication Read / List](../../../../features/auth-list.md) - Authentication Read / List captures the read / list workflow inside authentication. It spans 3 workspaces.
- [User Management Login](../../../../features/user-login.md) - User Management Login captures the login workflow inside user management. It spans 2 workspaces. Key flows include Auth login, Auth registration, Auth login.
- [Search Read / List](../../../../features/search-list.md) - Search Read / List captures the read / list workflow inside search. It spans 3 workspaces.
- [Search Login](../../../../features/search-login.md) - Search Login captures the login workflow inside search. It spans 2 workspaces. Key flows include Auth login, Auth registration, Auth login.
- [Notifications Read / List](../../../../features/notification-list.md) - Notifications Read / List captures the read / list workflow inside notifications. It spans 2 workspaces.
- [Storage Read / List](../../../../features/storage-list.md) - Storage Read / List captures the read / list workflow inside storage. It spans 4 workspaces.
- [Integrations Read / List](../../../../features/integration-list.md) - Integrations Read / List captures the read / list workflow inside integrations. It spans 3 workspaces.
- [User Management Read / List](../../../../features/user-list.md) - User Management Read / List captures the read / list workflow inside user management. It spans 3 workspaces.
- [Notifications Notify](../../../../features/notification-notify.md) - Notifications Notify captures the notify workflow inside notifications. It spans 2 workspaces.
- [Order Management Login](../../../../features/order-login.md) - Order Management Login captures the login workflow inside order management. It spans 2 workspaces. Key flows include Auth login, Auth login, Auth login.
- [Notifications Login](../../../../features/notification-login.md) - Notifications Login captures the login workflow inside notifications. It spans 2 workspaces. Key flows include Auth login, Auth registration, Auth login.
- [Reporting Read / List](../../../../features/reporting-list.md) - Reporting Read / List captures the read / list workflow inside reporting. It spans 2 workspaces.
- [Search Notify](../../../../features/search-notify.md) - Search Notify captures the notify workflow inside search. It spans 2 workspaces.
- [Storage Login](../../../../features/storage-login.md) - Storage Login captures the login workflow inside storage. It spans 2 workspaces. Key flows include Auth login, Auth registration, Auth login.
- [Administration Read / List](../../../../features/admin-list.md) - Administration Read / List captures the read / list workflow inside administration. It spans 2 workspaces.
- [Integrations Login](../../../../features/integration-login.md) - Integrations Login captures the login workflow inside integrations. It spans 2 workspaces. Key flows include Auth login, Auth registration, Auth login.
- [Integrations Notify](../../../../features/integration-notify.md) - Integrations Notify captures the notify workflow inside integrations. It spans 2 workspaces.
- [User Management Notify](../../../../features/user-notify.md) - User Management Notify captures the notify workflow inside user management. It spans 2 workspaces.
- [Administration Login](../../../../features/admin-login.md) - Administration Login captures the login workflow inside administration. It spans 2 workspaces. Key flows include Auth login, Auth registration, Auth login.
- [Authentication Password Reset](../../../../features/auth-reset.md) - Authentication Password Reset captures the password reset workflow inside authentication. It spans 3 workspaces. Key flows include Password reset, Password reset, Password reset.
- [Storage Notify](../../../../features/storage-notify.md) - Storage Notify captures the notify workflow inside storage. It spans 2 workspaces.
- [Order Management Read / List](../../../../features/order-list.md) - Order Management Read / List captures the read / list workflow inside order management. It spans 2 workspaces.
- [Reporting Login](../../../../features/reporting-login.md) - Reporting Login captures the login workflow inside reporting. It spans 2 workspaces. Key flows include Auth login, Auth registration, Auth login.
- [Administration Notify](../../../../features/admin-notify.md) - Administration Notify captures the notify workflow inside administration. It spans 2 workspaces.
- [Order Management Notify](../../../../features/order-notify.md) - Order Management Notify captures the notify workflow inside order management. It spans 2 workspaces.

## AI Summary

API type and interface documentation.

### Responsibilities

- Provides a comprehensive API for interacting with user data.
- Defines various interfaces for handling different use cases.

### Usage Notes

- The provided information can be used by developers to implement the required functionality.
- It's essential to carefully review each symbol's summary and signature to ensure accuracy and consistency.

## Public API

- `type Gender = "NAM" | "NU" | "KHAC" | "KHONG_TIET_LO";`
- `type AuthProvider = "LOCAL" | "GOOGLE" | "APPLE";`
- `type CoupleStatus = "CHO_GHEP_DOI" | "DANG_YEU" | "DA_CUOI" | "DA_CHIA_TAY";`
- `type AnniversaryCategory = "LOVE" | "BIRTHDAY" | "CUSTOM" | "HOLIDAY";`
- `interface User`
- `interface Couple`
- `interface Invite`
- `interface MemoryItem`
- `interface Anniversary`
- `interface EmotionalCycle`
- `interface UserMoodState`
- `interface MaleSuggestion`
- `interface UpcomingEvent`
- `interface BudgetItem`
- `interface InAppNotification`
- `interface BudgetSummary`

## Symbols

### type `Gender`

- Signature: `type Gender = "NAM" | "NU" | "KHAC" | "KHONG_TIET_LO";`
- Lines: 1-1
- Exported: yes

```ts
type Gender = "NAM" | "NU" | "KHAC" | "KHONG_TIET_LO";
```

### type `AuthProvider`

- Signature: `type AuthProvider = "LOCAL" | "GOOGLE" | "APPLE";`
- Lines: 2-2
- Exported: yes

```ts
type AuthProvider = "LOCAL" | "GOOGLE" | "APPLE";
```

### type `CoupleStatus`

- Signature: `type CoupleStatus = "CHO_GHEP_DOI" | "DANG_YEU" | "DA_CUOI" | "DA_CHIA_TAY";`
- Lines: 3-3
- Exported: yes

```ts
type CoupleStatus = "CHO_GHEP_DOI" | "DANG_YEU" | "DA_CUOI" | "DA_CHIA_TAY";
```

### type `AnniversaryCategory`

- Signature: `type AnniversaryCategory = "LOVE" | "BIRTHDAY" | "CUSTOM" | "HOLIDAY";`
- Lines: 4-4
- Exported: yes

```ts
type AnniversaryCategory = "LOVE" | "BIRTHDAY" | "CUSTOM" | "HOLIDAY";
```

### interface `User`

- Signature: `interface User`
- Lines: 6-33
- Exported: yes

```ts
interface User {
  id: string;
  email: string;
  fullName: string;
  nickname?: string;
  avatarUrl?: string;
  /** Ảnh bìa / nền hồ sơ (URL công khai sau upload media). */
  profileBackgroundUrl?: string;
  gender: Gender;
  dob?: string;
  /** Giờ sinh HH:mm (24h). */
  birthTime?: string;
  authProvider: AuthProvider;
  authId: string;
  passwordHash?: string;
  timezone: string;
  /** Nhận thông báo qua email (worker gửi mail cần kiểm tra). */
  emailNotificationsEnabled: boolean;
  /** Hồ sơ riêng tư — giới hạn hiển thị theo policy (áp dụng ở luồng xem hồ sơ người khác). */
  profilePrivate: boolean;
  /** Hiển thị trạng thái online cho người khác (presence/heartbeat sau này). */
  showOnlineStatus: boolean;
  isActive: boolean;
  isAdmin?: boolean;
  createdAt: string;
  updatedAt: string;
  coupleId?: string;
}
```

### interface `Couple`

- Signature: `interface Couple`
- Lines: 35-46
- Exported: yes

```ts
interface Couple {
  id: string;
  partner1Id: string;
  partner2Id?: string;
  loveStartDate?: string;
  weddingDate?: string;
  status: CoupleStatus;
  inviteCode?: string;
  inviteExpiresAt?: string;
  settings: Record<string, unknown>;
  createdAt: string;
}
```

### interface `Invite`

- Signature: `interface Invite`
- Lines: 48-53
- Exported: yes

```ts
interface Invite {
  code: string;
  coupleId: string;
  createdBy: string;
  expiresAt: string;
}
```

### interface `MemoryItem`

- Signature: `interface MemoryItem`
- Lines: 55-65
- Exported: yes

```ts
interface MemoryItem {
  id: string;
  coupleId: string;
  createdById: string;
  title: string;
  description?: string;
  memoryDate: string;
  mediaUrls: string[];
  tags: string[];
  createdAt: string;
}
```

### interface `Anniversary`

- Signature: `interface Anniversary`
- Lines: 67-81
- Exported: yes

```ts
interface Anniversary {
  id: string;
  coupleId: string;
  title: string;
  eventDate: string;
  recurrenceType: "NONE" | "YEARLY" | "MONTHLY";
  category: AnniversaryCategory;
  isSystemGenerated: boolean;
  notifySettings: {
    t7: boolean;
    t3: boolean;
    t0: boolean;
  };
  createdAt: string;
}
```

### interface `EmotionalCycle`

- Signature: `interface EmotionalCycle`
- Lines: 83-91
- Exported: yes

```ts
interface EmotionalCycle {
  id: string;
  userId: string;
  startDate: string;
  cycleDuration: number;
  periodDuration: number;
  symptomNotes: string[];
  isTrackingActive: boolean;
}
```

### interface `UserMoodState`

- Signature: `interface UserMoodState`
- Lines: 94-98
- Exported: yes

```ts
interface UserMoodState {
  userId: string;
  value: number;
  updatedAt: string;
}
```

### interface `MaleSuggestion`

- Signature: `interface MaleSuggestion`
- Lines: 100-109
- Exported: yes

```ts
interface MaleSuggestion {
  priority: number;
  text: string;
  callToAction: {
    label: string;
    actionType?: string;
    actionUrl?: string;
    icon?: string;
  };
}
```

### interface `UpcomingEvent`

- Signature: `interface UpcomingEvent`
- Lines: 111-119
- Exported: yes

```ts
interface UpcomingEvent {
  id: string;
  title: string;
  date: string;
  daysLeft: number;
  category: AnniversaryCategory;
  isSystem: boolean;
  priority: "MEDIUM" | "HIGH";
}
```

### interface `BudgetItem`

- Signature: `interface BudgetItem`
- Lines: 120-132
- Exported: yes

```ts
interface BudgetItem {
  id: string;
  coupleId: string;
  createdById: string;
  title: string;
  amount: number;
  category: string; // e.g., "venue", "catering", "clothing"
  date: string;
  place?: string;
  status: "PAID" | "PENDING" | "OVER_BUDGET" | "DRAFT";
  note?: string;
  createdAt: string;
}
```

### interface `InAppNotification`

- Signature: `interface InAppNotification`
- Lines: 135-149
- Exported: yes

```ts
interface InAppNotification {
  id: string;
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
  readAt?: string;
  createdAt: string;
}
```

### interface `BudgetSummary`

- Signature: `interface BudgetSummary`
- Lines: 151-158
- Exported: yes

```ts
interface BudgetSummary {
  totalBudget: number;
  totalSpent: number;
  pendingAmount: number;
  remainingAmount: number;
  usagePercentage: number;
  projectedTotal: number;
}
```
