---
title: "api/src/modules/care.ts"
description: "Function to retrieve a partner from the system."
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
  page: "reference/files/api/src/modules/care.ts.md"
  relativePath: "api/src/modules/care.ts"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/api/src/modules/care.ts"
  module: "api/src/modules"
  workspace: "api"
  language: "TypeScript"
  symbolCount: 2
---

# api/src/modules/care.ts

- Overview: [emplus Docs Wiki](../../../../../index.md)
- Summary: [SUMMARY](../../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../../features/index.md)
- Module: [api/src/modules](../../../../modules/api/src/modules.md)
- Workspace: [@emplus/api](../../../../../workspaces/api.md)

## Snapshot

- Language: TypeScript
- Source path: `/Users/truongdq/tx/GitHub/emplus/api/src/modules/care.ts`
- Lines: 160
- Symbols: 2

## Related Features

- [Authentication Login](../../../../../features/auth-login.md) - Authentication Login captures the login workflow inside authentication. It spans 2 workspaces. Key flows include Auth login, Auth registration, Auth login.
- [Authentication Read / List](../../../../../features/auth-list.md) - Authentication Read / List captures the read / list workflow inside authentication. It spans 3 workspaces.
- [User Management Login](../../../../../features/user-login.md) - User Management Login captures the login workflow inside user management. It spans 2 workspaces. Key flows include Auth login, Auth registration, Auth login.
- [Search Read / List](../../../../../features/search-list.md) - Search Read / List captures the read / list workflow inside search. It spans 3 workspaces.
- [Search Login](../../../../../features/search-login.md) - Search Login captures the login workflow inside search. It spans 2 workspaces. Key flows include Auth login, Auth registration, Auth login.
- [Notifications Read / List](../../../../../features/notification-list.md) - Notifications Read / List captures the read / list workflow inside notifications. It spans 2 workspaces.
- [Storage Read / List](../../../../../features/storage-list.md) - Storage Read / List captures the read / list workflow inside storage. It spans 4 workspaces.
- [Integrations Read / List](../../../../../features/integration-list.md) - Integrations Read / List captures the read / list workflow inside integrations. It spans 3 workspaces.
- [User Management Read / List](../../../../../features/user-list.md) - User Management Read / List captures the read / list workflow inside user management. It spans 3 workspaces.
- [Order Management Login](../../../../../features/order-login.md) - Order Management Login captures the login workflow inside order management. It spans 2 workspaces. Key flows include Auth login, Auth login, Auth login.
- [Notifications Login](../../../../../features/notification-login.md) - Notifications Login captures the login workflow inside notifications. It spans 2 workspaces. Key flows include Auth login, Auth registration, Auth login.
- [Reporting Read / List](../../../../../features/reporting-list.md) - Reporting Read / List captures the read / list workflow inside reporting. It spans 2 workspaces.
- [Storage Login](../../../../../features/storage-login.md) - Storage Login captures the login workflow inside storage. It spans 2 workspaces. Key flows include Auth login, Auth registration, Auth login.
- [Administration Read / List](../../../../../features/admin-list.md) - Administration Read / List captures the read / list workflow inside administration. It spans 2 workspaces.
- [Integrations Login](../../../../../features/integration-login.md) - Integrations Login captures the login workflow inside integrations. It spans 2 workspaces. Key flows include Auth login, Auth registration, Auth login.
- [Administration Login](../../../../../features/admin-login.md) - Administration Login captures the login workflow inside administration. It spans 2 workspaces. Key flows include Auth login, Auth registration, Auth login.
- [Order Management Read / List](../../../../../features/order-list.md) - Order Management Read / List captures the read / list workflow inside order management. It spans 2 workspaces.
- [Reporting Login](../../../../../features/reporting-login.md) - Reporting Login captures the login workflow inside reporting. It spans 2 workspaces. Key flows include Auth login, Auth registration, Auth login.

## AI Summary

Function to retrieve a partner from the system.

### Responsibilities

- Returns a pair consisting of a user and their couple.
- Holds promises for synchronizing user data with the system.

## Symbols

### function `getPartner`

- Signature: `async function getPartner(current: User): Promise<{ partner: User; coupleId: string }>`
- Lines: 12-25
- Exported: no

```ts
async function getPartner(current: User): Promise<{ partner: User; coupleId: string }> {
  const couple = await store.getActiveCoupleForUser(current.id);
  if (!couple || !couple.partner2Id) {
    throw new AppError(404, "COUPLE_NOT_FOUND", "Bạn chưa có mối quan hệ đang hoạt động.");
  }

  const partnerId = couple.partner1Id === current.id ? couple.partner2Id : couple.partner1Id;
  const partner = await store.getUserById(partnerId);
  if (!partner) {
    throw new AppError(404, "PARTNER_NOT_FOUND", "Không tìm thấy đối tác.");
  }

  return { partner, coupleId: couple.id };
}
```

### function `getPartnerOptional`

- Signature: `async function getPartnerOptional( current: User, ): Promise<{ partner: User; coupleId: string } | null>`
- Lines: 27-40
- Exported: no

```ts
async function getPartnerOptional(
  current: User,
): Promise<{ partner: User; coupleId: string } | null> {
  const couple = await store.getActiveCoupleForUser(current.id);
  if (!couple?.partner2Id) {
    return null;
  }
  const partnerId = couple.partner1Id === current.id ? couple.partner2Id : couple.partner1Id;
  const partner = await store.getUserById(partnerId);
  if (!partner) {
    return null;
  }
  return { partner, coupleId: couple.id };
}
```
