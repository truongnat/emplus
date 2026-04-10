---
title: "api/src/services/couple.service.ts"
description: "An endpoint to generate an invite for joining a couple."
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
  page: "reference/files/api/src/services/couple.service.ts.md"
  relativePath: "api/src/services/couple.service.ts"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/api/src/services/couple.service.ts"
  module: "api/src/services"
  workspace: "api"
  language: "TypeScript"
  symbolCount: 4
---

# api/src/services/couple.service.ts

- Overview: [emplus Docs Wiki](../../../../../index.md)
- Summary: [SUMMARY](../../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../../features/index.md)
- Module: [api/src/services](../../../../modules/api/src/services.md)
- Workspace: [@emplus/api](../../../../../workspaces/api.md)

## Snapshot

- Language: TypeScript
- Source path: `/Users/truongdq/tx/GitHub/emplus/api/src/services/couple.service.ts`
- Lines: 134
- Symbols: 4

## AI Summary

An endpoint to generate an invite for joining a couple.

### Responsibilities

- To generate an invite for joining a couple.
- To ensure the couple is already paired with another user or has pending invitations to join.

## Public API

- `interface InviteResponse`
- `interface JoinResponse`
- `async function generateInvite(userId: string): Promise<InviteResponse>`
- `async function joinCouple(user: User, inviteCode: string): Promise<JoinResponse>`

## Symbols

### interface `InviteResponse`

- Signature: `interface InviteResponse`
- Lines: 14-17
- Exported: yes

```ts
interface InviteResponse {
  inviteCode: string;
  expiresIn: number;
}
```

### interface `JoinResponse`

- Signature: `interface JoinResponse`
- Lines: 19-27
- Exported: yes

```ts
interface JoinResponse {
  coupleId: string;
  status: string;
  partnerInfo: {
    id: string;
    fullName: string;
    gender: string;
  };
}
```

### function `generateInvite`

- Signature: `async function generateInvite(userId: string): Promise<InviteResponse>`
- Lines: 32-46
- Exported: yes

```ts
async function generateInvite(userId: string): Promise<InviteResponse> {
  const activeCouple = await store.getActiveCoupleForUser(userId);
  if (activeCouple) {
    throw new AppError(409, "COUPLE_ALREADY_PAIRED", "Bạn đã được ghép đôi trong một mối quan hệ khác.");
  }

  const pendingCouple = await store.getPendingCoupleByCreator(userId);
  const couple = pendingCouple ?? (await store.createPendingCouple(userId));
  const invite = await store.issueInviteForCouple(couple.id, userId);

  return {
    inviteCode: invite.code,
    expiresIn: INVITE_CODE_TTL_SECONDS,
  };
}
```

### function `joinCouple`

- Signature: `async function joinCouple(user: User, inviteCode: string): Promise<JoinResponse>`
- Lines: 51-133
- Exported: yes

```ts
async function joinCouple(user: User, inviteCode: string): Promise<JoinResponse> {
  const rawInviteCode = inviteCode.trim().toUpperCase();

  if (!rawInviteCode) {
    throw new AppError(400, "INVALID_INVITE_CODE", "Mã mời (inviteCode) là bắt buộc.");
  }

  const invite = await store.getInvite(rawInviteCode);
  if (!invite || new Date(invite.expiresAt).getTime() < Date.now()) {
    throw new AppError(404, "INVITE_NOT_FOUND", "Mã mời không tồn tại hoặc đã hết hạn.");
  }

  const couple = await store.getCoupleById(invite.coupleId);
  if (!couple || couple.status !== "CHO_GHEP_DOI") {
    throw new AppError(404, "INVITE_NOT_FOUND", "Mã mời không tồn tại hoặc đã hết hạn.");
  }
  if (couple.inviteCode !== rawInviteCode) {
    throw new AppError(404, "INVITE_NOT_FOUND", "Mã mời không tồn tại hoặc đã hết hạn.");
  }

  if (couple.partner1Id === user.id) {
    throw new AppError(400, "CANNOT_JOIN_OWN_CODE", "Không thể tự ghép đôi bằng mã của chính mình.");
  }

  if (await store.userAlreadyInCouple(user.id)) {
    throw new AppError(409, "COUPLE_ALREADY_PAIRED", "Bạn đang ở trong một mối quan hệ đang hoạt động khác.");
  }

  const inviterHasOtherActiveCouple = await store.inviterHasOtherActiveCouple(couple.partner1Id, couple.id);

  if (inviterHasOtherActiveCouple) {
    throw new AppError(409, "INVITER_ALREADY_PAIRED", "Người tạo mã đã ở trong mối quan hệ khác.");
  }

  const inviter = await store.getUserById(couple.partner1Id);
  if (!inviter) {
    throw new AppError(500, "USER_NOT_FOUND", "Không tìm thấy người dùng đã tạo mã mời.");
  }

  // Update couple
  couple.partner2Id = user.id;
  couple.status = "DANG_YEU";
  couple.loveStartDate = couple.loveStartDate ?? formatDate(todayUtc());
  couple.inviteCode = undefined;
  couple.inviteExpiresAt = undefined;

  // Update users
  inviter.coupleId = couple.id;
  inviter.updatedAt = new Date().toISOString();
  user.coupleId = couple.id;
  user.updatedAt = new Date().toISOString();

  await Promise.all([
    store.saveUser(inviter),
    store.saveUser(user),
    store.updateCouple(couple),
    store.deleteInvite(rawInviteCode),
    store.invalidateHomeCache(couple.id),
  ]);

  notify({
    userId: inviter.id,
    coupleId: couple.id,
    type: "pairing",
    title: "Lời mời ghép đôi đã được chấp nhận!",
    body: `${user.fullName} đã tham gia cùng bạn trên Em+.`,
    iconName: "people-outline",
    iconColor: "#7c3aed",
    iconBg: "#ede9fe",
    actionLabel: "Xem trang chủ",
    url: "/(tabs)/home",
  }).catch((err) => console.error("[Notify] Pairing notify failed:", err));

  return {
    coupleId: couple.id,
    status: hienThiTrangThaiCapDoi(couple.status),
    partnerInfo: {
      id: inviter.id,
      fullName: inviter.fullName,
      gender: hienThiGioiTinh(inviter.gender),
    },
  };
}
```
