---
title: "api/src/store/contracts.ts"
description: "API data store contract"
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
  page: "reference/files/api/src/store/contracts.ts.md"
  relativePath: "api/src/store/contracts.ts"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/api/src/store/contracts.ts"
  module: "api/src/store"
  workspace: "api"
  language: "TypeScript"
  symbolCount: 1
---

# api/src/store/contracts.ts

- Overview: [emplus Docs Wiki](../../../../../index.md)
- Summary: [SUMMARY](../../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../../features/index.md)
- Module: [api/src/store](../../../../modules/api/src/store.md)
- Workspace: [@emplus/api](../../../../../workspaces/api.md)

## Snapshot

- Language: TypeScript
- Source path: `/Users/truongdq/tx/GitHub/emplus/api/src/store/contracts.ts`
- Lines: 91
- Symbols: 1

## AI Summary

API data store contract

### Responsibilities

- manages user and session records

### Usage Notes

- Provides methods for resetting the data store, getting users by token or auth ID, consuming refresh sessions, finding users based on provider ID or email, saving users and sessions, deleting refresh sessions and pending ones, getting active couple information for a user, getting pending couple information from a creator, creating pending couples, issuing invitations, and getting invited pairs

## Public API

- `interface DataStore`

## Symbols

### interface `DataStore`

- Signature: `interface DataStore`
- Lines: 14-90
- Exported: yes

```ts
interface DataStore {
  reset?(): Promise<void>;
  getUserByToken(token: string): Promise<User | undefined>;
  consumeRefreshSession(refreshToken: string): Promise<User | undefined>;
  findUserByAuth(provider: AuthProvider, authId: string): Promise<User | undefined>;
  findUserByEmail(email: string): Promise<User | undefined>;
  saveUser(user: User): Promise<void>;
  saveSession(accessToken: string, userId: string, ttlSeconds: number): Promise<void>;
  deleteSession(accessToken: string): Promise<void>;
  saveRefreshSession(refreshToken: string, userId: string, ttlSeconds: number): Promise<void>;
  deleteRefreshSession(refreshToken: string): Promise<void>;
  getActiveCoupleForUser(userId: string): Promise<Couple | undefined>;
  getPendingCoupleByCreator(userId: string): Promise<Couple | undefined>;
  createPendingCouple(creatorId: string): Promise<Couple>;
  issueInviteForCouple(coupleId: string, createdBy: string): Promise<Invite>;
  getInvite(code: string): Promise<Invite | undefined>;
  deleteInvite(code: string): Promise<void>;
  getCoupleById(coupleId: string): Promise<Couple | undefined>;
  userAlreadyInCouple(userId: string): Promise<boolean>;
  inviterHasOtherActiveCouple(inviterId: string, excludeCoupleId: string): Promise<boolean>;
  listMemoriesByCouple(coupleId: string, options?: {
    page?: number;
    limit?: number;
    order?: "asc" | "desc";
    tag?: string;
  }): Promise<{ items: MemoryItem[]; total: number }>;
  saveMemory(memory: MemoryItem): Promise<void>;
  updateMemory(memory: MemoryItem): Promise<void>;
  getMemoryByCouple(coupleId: string, memoryId: string): Promise<MemoryItem | undefined>;
  deleteMemory(coupleId: string, memoryId: string): Promise<boolean>;
  listBudgetItemsByCouple(coupleId: string): Promise<BudgetItem[]>;
  getBudgetItem(id: string): Promise<BudgetItem | undefined>;
  saveBudgetItem(item: BudgetItem): Promise<void>;
  updateBudgetItem(item: BudgetItem): Promise<void>;
  deleteBudgetItem(id: string): Promise<void>;
  getUserById(userId: string): Promise<User | undefined>;
  getCycleByUserId(userId: string): Promise<EmotionalCycle | undefined>;
  saveCycle(cycle: EmotionalCycle): Promise<void>;
  getMoodByUserId(userId: string): Promise<UserMoodState | undefined>;
  upsertUserMood(userId: string, value: number): Promise<UserMoodState>;
  updateCouple(couple: Couple): Promise<void>;
  saveCouple(couple: Couple): Promise<void>;
  getHomeCache(coupleId: string): Promise<unknown | undefined>;
  setHomeCache(coupleId: string, payload: unknown, ttlSeconds: number): Promise<void>;
  saveOtp(email: string, otp: string, ttlSeconds: number): Promise<void>;
  getOtp(email: string): Promise<string | undefined>;
  deleteOtp(email: string): Promise<void>;
  incrementRateLimit(key: string, ttlSeconds: number): Promise<number>;
  getRateLimitCount(key: string): Promise<number>;
  deleteRateLimitCount(key: string): Promise<void>;
  invalidateHomeCache(coupleId: string): Promise<void>;

  // Anniversary methods
  listAnniversariesByCouple(coupleId: string): Promise<Anniversary[]>;
  getAnniversary(id: string): Promise<Anniversary | undefined>;
  saveAnniversary(anniversary: Anniversary): Promise<void>;
  updateAnniversary(anniversary: Anniversary): Promise<void>;
  deleteAnniversary(id: string): Promise<void>;

  // Admin methods
  listAllUsers?(): Promise<User[]>;
  listAllCouples?(): Promise<Couple[]>;
  countMemories?(): Promise<number>;

  listNotificationsForUser(
    userId: string,
    options?: { page?: number; limit?: number; unreadOnly?: boolean },
  ): Promise<{ items: InAppNotification[]; total: number }>;
  getNotificationForUser(userId: string, notificationId: string): Promise<InAppNotification | undefined>;
  createInAppNotification(
    input: Omit<InAppNotification, "id" | "createdAt"> & { id?: string; createdAt?: string },
  ): Promise<InAppNotification>;
  markNotificationRead(userId: string, notificationId: string): Promise<InAppNotification | undefined>;
  markAllNotificationsRead(userId: string): Promise<number>;
  updateExpoPushToken(userId: string, token: string | null): Promise<void>;
  getExpoPushToken(userId: string): Promise<string | null>;
}
```
