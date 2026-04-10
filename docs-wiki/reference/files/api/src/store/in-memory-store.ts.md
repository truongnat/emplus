---
title: "api/src/store/in-memory-store.ts"
description: "Provides 63 documented symbols in api/src/store/in-memory-store.ts."
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
  page: "reference/files/api/src/store/in-memory-store.ts.md"
  relativePath: "api/src/store/in-memory-store.ts"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/api/src/store/in-memory-store.ts"
  module: "api/src/store"
  workspace: "api"
  language: "TypeScript"
  symbolCount: 63
---

# api/src/store/in-memory-store.ts

- Overview: [emplus Docs Wiki](../../../../../index.md)
- Summary: [SUMMARY](../../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../../features/index.md)
- Module: [api/src/store](../../../../modules/api/src/store.md)
- Workspace: [@emplus/api](../../../../../workspaces/api.md)

## Snapshot

- Language: TypeScript
- Source path: `/Users/truongdq/tx/GitHub/emplus/api/src/store/in-memory-store.ts`
- Lines: 529
- Symbols: 63

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
- [Notifications Notify](../../../../../features/notification-notify.md) - Notifications Notify captures the notify workflow inside notifications. It spans 2 workspaces.
- [Order Management Login](../../../../../features/order-login.md) - Order Management Login captures the login workflow inside order management. It spans 2 workspaces. Key flows include Auth login, Auth login, Auth login.
- [Notifications Login](../../../../../features/notification-login.md) - Notifications Login captures the login workflow inside notifications. It spans 2 workspaces. Key flows include Auth login, Auth registration, Auth login.
- [Reporting Read / List](../../../../../features/reporting-list.md) - Reporting Read / List captures the read / list workflow inside reporting. It spans 2 workspaces.
- [Search Notify](../../../../../features/search-notify.md) - Search Notify captures the notify workflow inside search. It spans 2 workspaces.
- [Storage Login](../../../../../features/storage-login.md) - Storage Login captures the login workflow inside storage. It spans 2 workspaces. Key flows include Auth login, Auth registration, Auth login.
- [Administration Read / List](../../../../../features/admin-list.md) - Administration Read / List captures the read / list workflow inside administration. It spans 2 workspaces.
- [Integrations Login](../../../../../features/integration-login.md) - Integrations Login captures the login workflow inside integrations. It spans 2 workspaces. Key flows include Auth login, Auth registration, Auth login.
- [Integrations Notify](../../../../../features/integration-notify.md) - Integrations Notify captures the notify workflow inside integrations. It spans 2 workspaces.
- [Search Create](../../../../../features/search-create.md) - Search Create captures the create workflow inside search. It spans 2 workspaces.
- [User Management Notify](../../../../../features/user-notify.md) - User Management Notify captures the notify workflow inside user management. It spans 2 workspaces.
- [Administration Login](../../../../../features/admin-login.md) - Administration Login captures the login workflow inside administration. It spans 2 workspaces. Key flows include Auth login, Auth registration, Auth login.
- [Authentication Password Reset](../../../../../features/auth-reset.md) - Authentication Password Reset captures the password reset workflow inside authentication. It spans 3 workspaces. Key flows include Password reset, Password reset, Password reset.
- [Storage Notify](../../../../../features/storage-notify.md) - Storage Notify captures the notify workflow inside storage. It spans 2 workspaces.
- [User Management Create](../../../../../features/user-create.md) - User Management Create captures the create workflow inside user management. It spans 2 workspaces.
- [Order Management Read / List](../../../../../features/order-list.md) - Order Management Read / List captures the read / list workflow inside order management. It spans 2 workspaces.
- [Reporting Login](../../../../../features/reporting-login.md) - Reporting Login captures the login workflow inside reporting. It spans 2 workspaces. Key flows include Auth login, Auth registration, Auth login.
- [Administration Notify](../../../../../features/admin-notify.md) - Administration Notify captures the notify workflow inside administration. It spans 2 workspaces.
- [Order Management Notify](../../../../../features/order-notify.md) - Order Management Notify captures the notify workflow inside order management. It spans 2 workspaces.

## AI Summary

Provides 63 documented symbols in api/src/store/in-memory-store.ts.

## Public API

- `class InMemoryStore implements DataStore`
- `async reset(): Promise<void>`
- `async getUserByToken(token: string): Promise<User | undefined>`
- `async findUserByAuth(provider: AuthProvider, authId: string): Promise<User | undefined>`
- `async findUserByEmail(email: string): Promise<User | undefined>`
- `async saveUser(user: User): Promise<void>`
- `async saveSession(accessToken: string, userId: string, ttlSeconds: number): Promise<void>`
- `async deleteSession(accessToken: string): Promise<void>`
- `async saveRefreshSession(refreshToken: string, userId: string, ttlSeconds: number): Promise<void>`
- `async deleteRefreshSession(refreshToken: string): Promise<void>`
- `async consumeRefreshSession(refreshToken: string): Promise<User | undefined>`
- `async getActiveCoupleForUser(userId: string): Promise<Couple | undefined>`
- `async getPendingCoupleByCreator(userId: string): Promise<Couple | undefined>`
- `async createPendingCouple(creatorId: string): Promise<Couple>`
- `async issueInviteForCouple(coupleId: string, createdBy: string): Promise<Invite>`
- `async getInvite(code: string): Promise<Invite | undefined>`
- `async deleteInvite(code: string): Promise<void>`
- `async getCoupleById(coupleId: string): Promise<Couple | undefined>`
- `async userAlreadyInCouple(userId: string): Promise<boolean>`
- `async inviterHasOtherActiveCouple(inviterId: string, excludeCoupleId: string): Promise<boolean>`
- `async listMemoriesByCouple(coupleId: string, options?: { page?: number; limit?: number; order?: "asc" | "desc"; tag?: string; }): Promise<{ items: MemoryItem[]; total: number }>`
- `async saveMemory(memory: MemoryItem): Promise<void>`
- `async updateMemory(memory: MemoryItem): Promise<void>`
- `async getMemoryByCouple(coupleId: string, memoryId: string): Promise<MemoryItem | undefined>`
- `async deleteMemory(coupleId: string, memoryId: string): Promise<boolean>`
- `async listBudgetItemsByCouple(coupleId: string): Promise<BudgetItem[]>`
- `async getBudgetItem(id: string): Promise<BudgetItem | undefined>`
- `async saveBudgetItem(item: BudgetItem): Promise<void>`
- `async updateBudgetItem(item: BudgetItem): Promise<void>`
- `async deleteBudgetItem(id: string): Promise<void>`
- `async listAnniversariesByCouple(coupleId: string): Promise<Anniversary[]>`
- `async getAnniversary(id: string): Promise<Anniversary | undefined>`
- `async saveAnniversary(anniversary: Anniversary): Promise<void>`
- `async updateAnniversary(anniversary: Anniversary): Promise<void>`
- `async deleteAnniversary(id: string): Promise<void>`
- `async getUserById(userId: string): Promise<User | undefined>`
- `async getCycleByUserId(userId: string): Promise<EmotionalCycle | undefined>`
- `async saveCycle(cycle: EmotionalCycle): Promise<void>`
- `async getMoodByUserId(userId: string): Promise<UserMoodState | undefined>`
- `async upsertUserMood(userId: string, value: number): Promise<UserMoodState>`
- `async updateCouple(couple: Couple): Promise<void>`
- `async saveCouple(couple: Couple): Promise<void>`
- `async getHomeCache(coupleId: string): Promise<unknown | undefined>`
- `async setHomeCache(coupleId: string, payload: unknown, ttlSeconds: number): Promise<void>`
- `async invalidateHomeCache(coupleId: string): Promise<void>`
- `async saveOtp(email: string, otp: string, ttlSeconds: number): Promise<void>`
- `async getOtp(email: string): Promise<string | undefined>`
- `async deleteOtp(email: string): Promise<void>`
- `async incrementRateLimit(key: string, ttlSeconds: number): Promise<number>`
- `async getRateLimitCount(key: string): Promise<number>`
- `async deleteRateLimitCount(key: string): Promise<void>`
- `async listAllUsers(): Promise<User[]>`
- `async listAllCouples(): Promise<Couple[]>`
- `async countMemories(): Promise<number>`
- `async listNotificationsForUser( userId: string, options?: { page?: number; limit?: number; unreadOnly?: boolean }, ): Promise<{ items: InAppNotification[]; total: number }>`
- `async getNotificationForUser(userId: string, notificationId: string): Promise<InAppNotification | undefined>`
- `async createInAppNotification( input: Omit<InAppNotification, "id" | "createdAt"> & { id?: string; createdAt?: string }, ): Promise<InAppNotification>`
- `async markNotificationRead(userId: string, notificationId: string): Promise<InAppNotification | undefined>`
- `async markAllNotificationsRead(userId: string): Promise<number>`
- `async updateExpoPushToken(userId: string, token: string | null): Promise<void>`
- `async getExpoPushToken(userId: string): Promise<string | null>`

## Symbols

### class `InMemoryStore`

- Signature: `class InMemoryStore implements DataStore`
- Lines: 26-528
- Exported: yes

```ts
class InMemoryStore implements DataStore {
  users = new Map<string, User>();
  usersByAuth = new Map<string, string>();
  usersByEmail = new Map<string, string>();
  sessions = new Map<string, { userId: string; expiresAt: number }>();
  refreshSessions = new Map<string, { userId: string; expiresAt: number }>();
  couples = new Map<string, Couple>();
  invites = new Map<string, Invite>();
  memories = new Map<string, MemoryItem>();
  userMoods = new Map<string, UserMoodState>();
  budgetItems = new Map<string, BudgetItem>();
  anniversaries = new Map<string, Anniversary>();
  cycles = new Map<string, EmotionalCycle>();
  homeCache = new Map<string, { payload: unknown; expiresAt: number }>();
  otps = new Map<string, { otp: string; expiresAt: number }>();
  rateLimits = new Map<string, { count: number; expiresAt: number }>();
  inAppNotifications = new Map<string, InAppNotification>();
  expoPushTokens = new Map<string, string>();

  async reset(): Promise<void> {
    this.users.clear();
    this.usersByAuth.clear();
    this.usersByEmail.clear();
    this.sessions.clear();
    this.refreshSessions.clear();
    this.couples.clear();
    this.invites.clear();
    this.memories.clear();
    this.userMoods.clear();
    this.budgetItems.clear();
    this.anniversaries.clear();
    this.cycles.clear();
    this.homeCache.clear();
    this.otps.clear();
    this.rateLimits.clear();
    this.inAppNotifications.clear();
    this.expoPushTokens.clear();
  }

  async getUserByToken(token: string): Promise<User | undefined> {
    const session = this.sessions.get(token);
    if (!session) {
      return undefined;
    }

    if (session.expiresAt <= Date.now()) {
      this.sessions.delete(token);
      return undefined;
    }

    return this.users.get(session.userId);
  }

  async findUserByAuth(provider: AuthProvider, authId: string): Promise<User | undefined> {
    const userId = this.usersByAuth.get(`${provider}:${authId}`);
    if (!userId) {
      return undefined;
    }

    return this.users.get(userId);
  }

  async findUserByEmail(email: string): Promise<User | undefined> {
    const userId = this.usersByEmail.get(email.trim().toLowerCase());
    if (!userId) {
      return undefined;
    }

    return this.users.get(userId);
  }

  async saveUser(user: User): Promise<void> {
    const existing = this.users.get(user.id);
    if (existing) {
      this.usersByAuth.delete(`${existing.authProvider}:${existing.authId}`);
      this.usersByEmail.delete(existing.email.trim().toLowerCase());
    }

    this.users.set(user.id, user);
    this.usersByAuth.set(`${user.authProvider}:${user.authId}`, user.id);
    this.usersByEmail.set(user.email.trim().toLowerCase(), user.id);
  }

  async saveSession(accessToken: string, userId: string, ttlSeconds: number): Promise<void> {
    this.sessions.set(accessToken, {
      userId,
      expiresAt: Date.now() + ttlSeconds * 1000,
    });
  }

  async deleteSession(accessToken: string): Promise<void> {
    this.sessions.delete(accessToken);
  }

  async saveRefreshSession(refreshToken: string, userId: string, ttlSeconds: number): Promise<void> {
    this.refreshSessions.set(refreshToken, {
      userId,
      expiresAt: Date.now() + ttlSeconds * 1000,
    });
  }

  async deleteRefreshSession(refreshToken: string): Promise<void> {
    this.refreshSessions.delete(refreshToken);
  }

  async consumeRefreshSession(refreshToken: string): Promise<User | undefined> {
    const session = this.refreshSessions.get(refreshToken);
    if (!session) {
      return undefined;
    }

    this.refreshSessions.delete(refreshToken);
    if (session.expiresAt <= Date.now()) {
      return undefined;
    }

    return this.users.get(session.userId);
  }

  async getActiveCoupleForUser(userId: string): Promise<Couple | undefined> {
    return Array.from(this.couples.values()).find(
      (couple) =>
        (couple.partner1Id === userId || couple.partner2Id === userId) &&
        ACTIVE_COUPLE_STATUSES.has(couple.status),
    );
  }

  async getPendingCoupleByCreator(userId: string): Promise<Couple | undefined> {
    return Array.from(this.couples.values()).find(
      (couple) => couple.partner1Id === userId && !couple.partner2Id && couple.status === "CHO_GHEP_DOI",
    );
  }

  async createPendingCouple(creatorId: string): Promise<Couple> {
    const couple: Couple = {
      id: crypto.randomUUID(),
      partner1Id: creatorId,
      status: "CHO_GHEP_DOI",
      settings: {},
      createdAt: nowIso(),
    };

    this.couples.set(couple.id, couple);
    return couple;
  }

  async issueInviteForCouple(coupleId: string, createdBy: string): Promise<Invite> {
    const couple = this.couples.get(coupleId);
    if (!couple) {
      throw new Error("Không tìm thấy cặp đôi.");
    }

    if (couple.inviteCode) {
      this.invites.delete(couple.inviteCode);
    }

    const code = generateInviteCode(6);
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();
    const invite: Invite = {
      code,
      coupleId,
      createdBy,
      expiresAt,
    };

    couple.inviteCode = code;
    couple.inviteExpiresAt = expiresAt;

    this.couples.set(couple.id, couple);
    this.invites.set(code, invite);

    return invite;
  }

  async getInvite(code: string): Promise<Invite | undefined> {
    const invite = this.invites.get(code);
    if (!invite) {
      return undefined;
    }

    if (new Date(invite.expiresAt).getTime() < Date.now()) {
      this.invites.delete(code);
      return undefined;
    }

    return invite;
  }

  async deleteInvite(code: string): Promise<void> {
    this.invites.delete(code);
  }

  async getCoupleById(coupleId: string): Promise<Couple | undefined> {
    return this.couples.get(coupleId);
  }

  async userAlreadyInCouple(userId: string): Promise<boolean> {
    return Array.from(this.couples.values()).some(
      (couple) =>
        (couple.partner1Id === userId || couple.partner2Id === userId) && couple.status !== "DA_CHIA_TAY",
    );
  }

  async inviterHasOtherActiveCouple(inviterId: string, excludeCoupleId: string): Promise<boolean> {
    return Array.from(this.couples.values()).some(
      (entry) =>
        entry.id !== excludeCoupleId &&
        ACTIVE_COUPLE_STATUSES.has(entry.status) &&
        (entry.partner1Id === inviterId || entry.partner2Id === inviterId),
    );
  }

  async listMemoriesByCouple(coupleId: string, options?: {
    page?: number;
    limit?: number;
    order?: "asc" | "desc";
    tag?: string;
  }): Promise<{ items: MemoryItem[]; total: number }> {
    const page = Math.max(1, options?.page ?? 1);
    const limit = Math.min(50, Math.max(1, options?.limit ?? 10));
    const order = options?.order ?? "desc";

    let items = Array.from(this.memories.values()).filter((memory) => memory.coupleId === coupleId);

    // Filter by tag
    if (options?.tag && options.tag !== "tat-ca") {
      const tag = options.tag.toLowerCase();
      items = items.filter((m) => {
        const matches = m.tags?.some((t) => t.toLowerCase().includes(tag));
        if (tag === "ky-niem") {
          return matches || !m.tags || m.tags.length === 0;
        }
        return matches;
      });
    }

    // Sort
    items.sort((a, b) =>
      order === "asc"
        ? a.memoryDate.localeCompare(b.memoryDate)
        : b.memoryDate.localeCompare(a.memoryDate),
    );

    const total = items.length;
    const offset = (page - 1) * limit;

    return {
      items: items.slice(offset, offset + limit),
      total,
    };
  }

  async saveMemory(memory: MemoryItem): Promise<void> {
    this.memories.set(memory.id, memory);
  }

  async updateMemory(memory: MemoryItem): Promise<void> {
    const existing = this.memories.get(memory.id);
    if (!existing || existing.coupleId !== memory.coupleId) {
      return;
    }
    this.memories.set(memory.id, memory);
  }

  async getMemoryByCouple(coupleId: string, memoryId: string): Promise<MemoryItem | undefined> {
    const m = this.memories.get(memoryId);
    if (!m || m.coupleId !== coupleId) return undefined;
    return m;
  }

  async deleteMemory(coupleId: string, memoryId: string): Promise<boolean> {
    const m = this.memories.get(memoryId);
    if (!m || m.coupleId !== coupleId) return false;
    this.memories.delete(memoryId);
    return true;
  }

  async listBudgetItemsByCouple(coupleId: string): Promise<BudgetItem[]> {
    return Array.from(this.budgetItems.values()).filter((item) => item.coupleId === coupleId);
  }

  async getBudgetItem(id: string): Promise<BudgetItem | undefined> {
    return this.budgetItems.get(id);
  }

  async saveBudgetItem(item: BudgetItem): Promise<void> {
    this.budgetItems.set(item.id, item);
  }

  async updateBudgetItem(item: BudgetItem): Promise<void> {
    this.budgetItems.set(item.id, item);
  }

  async deleteBudgetItem(id: string): Promise<void> {
    this.budgetItems.delete(id);
  }

  async listAnniversariesByCouple(coupleId: string): Promise<Anniversary[]> {
    return Array.from(this.anniversaries.values()).filter((a) => a.coupleId === coupleId);
  }

  async getAnniversary(id: string): Promise<Anniversary | undefined> {
    return this.anniversaries.get(id);
  }

  async saveAnniversary(anniversary: Anniversary): Promise<void> {
    this.anniversaries.set(anniversary.id, anniversary);
  }

  async updateAnniversary(anniversary: Anniversary): Promise<void> {
    this.anniversaries.set(anniversary.id, anniversary);
  }

  async deleteAnniversary(id: string): Promise<void> {
    this.anniversaries.delete(id);
  }

  async getUserById(userId: string): Promise<User | undefined> {
    return this.users.get(userId);
  }

  async getCycleByUserId(userId: string): Promise<EmotionalCycle | undefined> {
    return this.cycles.get(userId);
  }

  async saveCycle(cycle: EmotionalCycle): Promise<void> {
    this.cycles.set(cycle.userId, cycle);
  }

  async getMoodByUserId(userId: string): Promise<UserMoodState | undefined> {
    return this.userMoods.get(userId);
  }

  async upsertUserMood(userId: string, value: number): Promise<UserMoodState> {
    const state: UserMoodState = {
      userId,
      value,
      updatedAt: nowIso(),
    };
    this.userMoods.set(userId, state);
    return state;
  }

  async updateCouple(couple: Couple): Promise<void> {
    this.couples.set(couple.id, couple);
  }

  async saveCouple(couple: Couple): Promise<void> {
    this.couples.set(couple.id, couple);
  }

  async getHomeCache(coupleId: string): Promise<unknown | undefined> {
    const cached = this.homeCache.get(coupleId);
    if (!cached) {
      return undefined;
    }

    if (cached.expiresAt <= Date.now()) {
      this.homeCache.delete(coupleId);
      return undefined;
    }

    return cached.payload;
  }

  async setHomeCache(coupleId: string, payload: unknown, ttlSeconds: number): Promise<void> {
    this.homeCache.set(coupleId, {
      payload,
      expiresAt: Date.now() + ttlSeconds * 1000,
    });
  }

  async invalidateHomeCache(coupleId: string): Promise<void> {
    this.homeCache.delete(coupleId);
  }

  async saveOtp(email: string, otp: string, ttlSeconds: number): Promise<void> {
    this.otps.set(email.toLowerCase(), {
      otp,
      expiresAt: Date.now() + ttlSeconds * 1000,
    });
  }

  async getOtp(email: string): Promise<string | undefined> {
    const data = this.otps.get(email.toLowerCase());
    if (!data || data.expiresAt <= Date.now()) {
      this.otps.delete(email.toLowerCase());
      return undefined;
    }
    return data.otp;
  }

  async deleteOtp(email: string): Promise<void> {
    this.otps.delete(email.toLowerCase());
  }

  async incrementRateLimit(key: string, ttlSeconds: number): Promise<number> {
    const data = this.rateLimits.get(key);
    if (!data || data.expiresAt <= Date.now()) {
      this.rateLimits.set(key, { count: 1, expiresAt: Date.now() + ttlSeconds * 1000 });
      return 1;
    }
    data.count += 1;
    return data.count;
  }

  async getRateLimitCount(key: string): Promise<number> {
    const data = this.rateLimits.get(key);
    if (!data || data.expiresAt <= Date.now()) {
      return 0;
    }
    return data.count;
  }

  async deleteRateLimitCount(key: string): Promise<void> {
    this.rateLimits.delete(key);
  }

  async listAllUsers(): Promise<User[]> {
    return Array.from(this.users.values());
  }

  async listAllCouples(): Promise<Couple[]> {
    return Array.from(this.couples.values());
  }

  async countMemories(): Promise<number> {
    return this.memories.size;
  }

  async listNotificationsForUser(
    userId: string,
    options?: { page?: number; limit?: number; unreadOnly?: boolean },
  ): Promise<{ items: InAppNotification[]; total: number }> {
    const page = Math.max(1, options?.page ?? 1);
    const limit = Math.min(50, Math.max(1, options?.limit ?? 20));
    const unreadOnly = options?.unreadOnly ?? false;
    let items = [...this.inAppNotifications.values()].filter((n) => n.userId === userId);
    if (unreadOnly) {
      items = items.filter((n) => !n.readAt);
    }
    items.sort((a, b) => (a.createdAt < b.createdAt ? 1 : a.createdAt > b.createdAt ? -1 : 0));
    const total = items.length;
    const offset = (page - 1) * limit;
    return { items: items.slice(offset, offset + limit), total };
  }

  async getNotificationForUser(userId: string, notificationId: string): Promise<InAppNotification | undefined> {
    const n = this.inAppNotifications.get(notificationId);
    if (!n || n.userId !== userId) {
      return undefined;
    }
    return n;
  }

  async createInAppNotification(
    input: Omit<InAppNotification, "id" | "createdAt"> & { id?: string; createdAt?: string },
  ): Promise<InAppNotification> {
    const id = input.id ?? crypto.randomUUID();
    const row: InAppNotification = {
      ...input,
      id,
      createdAt: input.createdAt ?? new Date().toISOString(),
      metadata: input.metadata ?? {},
    };
    this.inAppNotifications.set(id, row);
    return row;
  }

  async markNotificationRead(userId: string, notificationId: string): Promise<InAppNotification | undefined> {
    const n = this.inAppNotifications.get(notificationId);
    if (!n || n.userId !== userId) {
      return undefined;
    }
    const readAt = new Date().toISOString();
    const updated = { ...n, readAt };
    this.inAppNotifications.set(notificationId, updated);
    return updated;
  }

  async markAllNotificationsRead(userId: string): Promise<number> {
    let count = 0;
    for (const [id, n] of this.inAppNotifications) {
      if (n.userId === userId && !n.readAt) {
        this.inAppNotifications.set(id, { ...n, readAt: new Date().toISOString() });
        count += 1;
      }
    }
    return count;
  }

  async updateExpoPushToken(userId: string, token: string | null): Promise<void> {
    if (token === null || token === "") {
      this.expoPushTokens.delete(userId);
      return;
    }
    this.expoPushTokens.set(userId, token);
  }

  async getExpoPushToken(userId: string): Promise<string | null> {
    return this.expoPushTokens.get(userId) ?? null;
  }
}
```

### method `reset`

- Signature: `async reset(): Promise<void>`
- Lines: 45-63
- Exported: yes

```ts
async reset(): Promise<void> {
    this.users.clear();
    this.usersByAuth.clear();
    this.usersByEmail.clear();
    this.sessions.clear();
    this.refreshSessions.clear();
    this.couples.clear();
    this.invites.clear();
    this.memories.clear();
    this.userMoods.clear();
    this.budgetItems.clear();
    this.anniversaries.clear();
    this.cycles.clear();
    this.homeCache.clear();
    this.otps.clear();
    this.rateLimits.clear();
    this.inAppNotifications.clear();
    this.expoPushTokens.clear();
  }
```

### method `getUserByToken`

- Signature: `async getUserByToken(token: string): Promise<User | undefined>`
- Lines: 65-77
- Exported: yes

```ts
async getUserByToken(token: string): Promise<User | undefined> {
    const session = this.sessions.get(token);
    if (!session) {
      return undefined;
    }

    if (session.expiresAt <= Date.now()) {
      this.sessions.delete(token);
      return undefined;
    }

    return this.users.get(session.userId);
  }
```

### method `findUserByAuth`

- Signature: `async findUserByAuth(provider: AuthProvider, authId: string): Promise<User | undefined>`
- Lines: 79-86
- Exported: yes

```ts
async findUserByAuth(provider: AuthProvider, authId: string): Promise<User | undefined> {
    const userId = this.usersByAuth.get(`${provider}:${authId}`);
    if (!userId) {
      return undefined;
    }

    return this.users.get(userId);
  }
```

### method `findUserByEmail`

- Signature: `async findUserByEmail(email: string): Promise<User | undefined>`
- Lines: 88-95
- Exported: yes

```ts
async findUserByEmail(email: string): Promise<User | undefined> {
    const userId = this.usersByEmail.get(email.trim().toLowerCase());
    if (!userId) {
      return undefined;
    }

    return this.users.get(userId);
  }
```

### method `saveUser`

- Signature: `async saveUser(user: User): Promise<void>`
- Lines: 97-107
- Exported: yes

```ts
async saveUser(user: User): Promise<void> {
    const existing = this.users.get(user.id);
    if (existing) {
      this.usersByAuth.delete(`${existing.authProvider}:${existing.authId}`);
      this.usersByEmail.delete(existing.email.trim().toLowerCase());
    }

    this.users.set(user.id, user);
    this.usersByAuth.set(`${user.authProvider}:${user.authId}`, user.id);
    this.usersByEmail.set(user.email.trim().toLowerCase(), user.id);
  }
```

### method `saveSession`

- Signature: `async saveSession(accessToken: string, userId: string, ttlSeconds: number): Promise<void>`
- Lines: 109-114
- Exported: yes

```ts
async saveSession(accessToken: string, userId: string, ttlSeconds: number): Promise<void> {
    this.sessions.set(accessToken, {
      userId,
      expiresAt: Date.now() + ttlSeconds * 1000,
    });
  }
```

### method `deleteSession`

- Signature: `async deleteSession(accessToken: string): Promise<void>`
- Lines: 116-118
- Exported: yes

```ts
async deleteSession(accessToken: string): Promise<void> {
    this.sessions.delete(accessToken);
  }
```

### method `saveRefreshSession`

- Signature: `async saveRefreshSession(refreshToken: string, userId: string, ttlSeconds: number): Promise<void>`
- Lines: 120-125
- Exported: yes

```ts
async saveRefreshSession(refreshToken: string, userId: string, ttlSeconds: number): Promise<void> {
    this.refreshSessions.set(refreshToken, {
      userId,
      expiresAt: Date.now() + ttlSeconds * 1000,
    });
  }
```

### method `deleteRefreshSession`

- Signature: `async deleteRefreshSession(refreshToken: string): Promise<void>`
- Lines: 127-129
- Exported: yes

```ts
async deleteRefreshSession(refreshToken: string): Promise<void> {
    this.refreshSessions.delete(refreshToken);
  }
```

### method `consumeRefreshSession`

- Signature: `async consumeRefreshSession(refreshToken: string): Promise<User | undefined>`
- Lines: 131-143
- Exported: yes

```ts
async consumeRefreshSession(refreshToken: string): Promise<User | undefined> {
    const session = this.refreshSessions.get(refreshToken);
    if (!session) {
      return undefined;
    }

    this.refreshSessions.delete(refreshToken);
    if (session.expiresAt <= Date.now()) {
      return undefined;
    }

    return this.users.get(session.userId);
  }
```

### method `getActiveCoupleForUser`

- Signature: `async getActiveCoupleForUser(userId: string): Promise<Couple | undefined>`
- Lines: 145-151
- Exported: yes

```ts
async getActiveCoupleForUser(userId: string): Promise<Couple | undefined> {
    return Array.from(this.couples.values()).find(
      (couple) =>
        (couple.partner1Id === userId || couple.partner2Id === userId) &&
        ACTIVE_COUPLE_STATUSES.has(couple.status),
    );
  }
```

### method `getPendingCoupleByCreator`

- Signature: `async getPendingCoupleByCreator(userId: string): Promise<Couple | undefined>`
- Lines: 153-157
- Exported: yes

```ts
async getPendingCoupleByCreator(userId: string): Promise<Couple | undefined> {
    return Array.from(this.couples.values()).find(
      (couple) => couple.partner1Id === userId && !couple.partner2Id && couple.status === "CHO_GHEP_DOI",
    );
  }
```

### method `createPendingCouple`

- Signature: `async createPendingCouple(creatorId: string): Promise<Couple>`
- Lines: 159-170
- Exported: yes

```ts
async createPendingCouple(creatorId: string): Promise<Couple> {
    const couple: Couple = {
      id: crypto.randomUUID(),
      partner1Id: creatorId,
      status: "CHO_GHEP_DOI",
      settings: {},
      createdAt: nowIso(),
    };

    this.couples.set(couple.id, couple);
    return couple;
  }
```

### method `issueInviteForCouple`

- Signature: `async issueInviteForCouple(coupleId: string, createdBy: string): Promise<Invite>`
- Lines: 172-198
- Exported: yes

```ts
async issueInviteForCouple(coupleId: string, createdBy: string): Promise<Invite> {
    const couple = this.couples.get(coupleId);
    if (!couple) {
      throw new Error("Không tìm thấy cặp đôi.");
    }

    if (couple.inviteCode) {
      this.invites.delete(couple.inviteCode);
    }

    const code = generateInviteCode(6);
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();
    const invite: Invite = {
      code,
      coupleId,
      createdBy,
      expiresAt,
    };

    couple.inviteCode = code;
    couple.inviteExpiresAt = expiresAt;

    this.couples.set(couple.id, couple);
    this.invites.set(code, invite);

    return invite;
  }
```

### method `getInvite`

- Signature: `async getInvite(code: string): Promise<Invite | undefined>`
- Lines: 200-212
- Exported: yes

```ts
async getInvite(code: string): Promise<Invite | undefined> {
    const invite = this.invites.get(code);
    if (!invite) {
      return undefined;
    }

    if (new Date(invite.expiresAt).getTime() < Date.now()) {
      this.invites.delete(code);
      return undefined;
    }

    return invite;
  }
```

### method `deleteInvite`

- Signature: `async deleteInvite(code: string): Promise<void>`
- Lines: 214-216
- Exported: yes

```ts
async deleteInvite(code: string): Promise<void> {
    this.invites.delete(code);
  }
```

### method `getCoupleById`

- Signature: `async getCoupleById(coupleId: string): Promise<Couple | undefined>`
- Lines: 218-220
- Exported: yes

```ts
async getCoupleById(coupleId: string): Promise<Couple | undefined> {
    return this.couples.get(coupleId);
  }
```

### method `userAlreadyInCouple`

- Signature: `async userAlreadyInCouple(userId: string): Promise<boolean>`
- Lines: 222-227
- Exported: yes

```ts
async userAlreadyInCouple(userId: string): Promise<boolean> {
    return Array.from(this.couples.values()).some(
      (couple) =>
        (couple.partner1Id === userId || couple.partner2Id === userId) && couple.status !== "DA_CHIA_TAY",
    );
  }
```

### method `inviterHasOtherActiveCouple`

- Signature: `async inviterHasOtherActiveCouple(inviterId: string, excludeCoupleId: string): Promise<boolean>`
- Lines: 229-236
- Exported: yes

```ts
async inviterHasOtherActiveCouple(inviterId: string, excludeCoupleId: string): Promise<boolean> {
    return Array.from(this.couples.values()).some(
      (entry) =>
        entry.id !== excludeCoupleId &&
        ACTIVE_COUPLE_STATUSES.has(entry.status) &&
        (entry.partner1Id === inviterId || entry.partner2Id === inviterId),
    );
  }
```

### method `listMemoriesByCouple`

- Signature: `async listMemoriesByCouple(coupleId: string, options?: { page?: number; limit?: number; order?: "asc" | "desc"; tag?: string; }): Promise<{ items: MemoryItem[]; total: number }>`
- Lines: 238-276
- Exported: yes

```ts
async listMemoriesByCouple(coupleId: string, options?: {
    page?: number;
    limit?: number;
    order?: "asc" | "desc";
    tag?: string;
  }): Promise<{ items: MemoryItem[]; total: number }> {
    const page = Math.max(1, options?.page ?? 1);
    const limit = Math.min(50, Math.max(1, options?.limit ?? 10));
    const order = options?.order ?? "desc";

    let items = Array.from(this.memories.values()).filter((memory) => memory.coupleId === coupleId);

    // Filter by tag
    if (options?.tag && options.tag !== "tat-ca") {
      const tag = options.tag.toLowerCase();
      items = items.filter((m) => {
        const matches = m.tags?.some((t) => t.toLowerCase().includes(tag));
        if (tag === "ky-niem") {
          return matches || !m.tags || m.tags.length === 0;
        }
        return matches;
      });
    }

    // Sort
    items.sort((a, b) =>
      order === "asc"
        ? a.memoryDate.localeCompare(b.memoryDate)
        : b.memoryDate.localeCompare(a.memoryDate),
    );

    const total = items.length;
    const offset = (page - 1) * limit;

    return {
      items: items.slice(offset, offset + limit),
      total,
    };
  }
```

### method `saveMemory`

- Signature: `async saveMemory(memory: MemoryItem): Promise<void>`
- Lines: 278-280
- Exported: yes

```ts
async saveMemory(memory: MemoryItem): Promise<void> {
    this.memories.set(memory.id, memory);
  }
```

### method `updateMemory`

- Signature: `async updateMemory(memory: MemoryItem): Promise<void>`
- Lines: 282-288
- Exported: yes

```ts
async updateMemory(memory: MemoryItem): Promise<void> {
    const existing = this.memories.get(memory.id);
    if (!existing || existing.coupleId !== memory.coupleId) {
      return;
    }
    this.memories.set(memory.id, memory);
  }
```

### method `getMemoryByCouple`

- Signature: `async getMemoryByCouple(coupleId: string, memoryId: string): Promise<MemoryItem | undefined>`
- Lines: 290-294
- Exported: yes

```ts
async getMemoryByCouple(coupleId: string, memoryId: string): Promise<MemoryItem | undefined> {
    const m = this.memories.get(memoryId);
    if (!m || m.coupleId !== coupleId) return undefined;
    return m;
  }
```

### method `deleteMemory`

- Signature: `async deleteMemory(coupleId: string, memoryId: string): Promise<boolean>`
- Lines: 296-301
- Exported: yes

```ts
async deleteMemory(coupleId: string, memoryId: string): Promise<boolean> {
    const m = this.memories.get(memoryId);
    if (!m || m.coupleId !== coupleId) return false;
    this.memories.delete(memoryId);
    return true;
  }
```

### method `listBudgetItemsByCouple`

- Signature: `async listBudgetItemsByCouple(coupleId: string): Promise<BudgetItem[]>`
- Lines: 303-305
- Exported: yes

```ts
async listBudgetItemsByCouple(coupleId: string): Promise<BudgetItem[]> {
    return Array.from(this.budgetItems.values()).filter((item) => item.coupleId === coupleId);
  }
```

### method `getBudgetItem`

- Signature: `async getBudgetItem(id: string): Promise<BudgetItem | undefined>`
- Lines: 307-309
- Exported: yes

```ts
async getBudgetItem(id: string): Promise<BudgetItem | undefined> {
    return this.budgetItems.get(id);
  }
```

### method `saveBudgetItem`

- Signature: `async saveBudgetItem(item: BudgetItem): Promise<void>`
- Lines: 311-313
- Exported: yes

```ts
async saveBudgetItem(item: BudgetItem): Promise<void> {
    this.budgetItems.set(item.id, item);
  }
```

### method `updateBudgetItem`

- Signature: `async updateBudgetItem(item: BudgetItem): Promise<void>`
- Lines: 315-317
- Exported: yes

```ts
async updateBudgetItem(item: BudgetItem): Promise<void> {
    this.budgetItems.set(item.id, item);
  }
```

### method `deleteBudgetItem`

- Signature: `async deleteBudgetItem(id: string): Promise<void>`
- Lines: 319-321
- Exported: yes

```ts
async deleteBudgetItem(id: string): Promise<void> {
    this.budgetItems.delete(id);
  }
```

### method `listAnniversariesByCouple`

- Signature: `async listAnniversariesByCouple(coupleId: string): Promise<Anniversary[]>`
- Lines: 323-325
- Exported: yes

```ts
async listAnniversariesByCouple(coupleId: string): Promise<Anniversary[]> {
    return Array.from(this.anniversaries.values()).filter((a) => a.coupleId === coupleId);
  }
```

### method `getAnniversary`

- Signature: `async getAnniversary(id: string): Promise<Anniversary | undefined>`
- Lines: 327-329
- Exported: yes

```ts
async getAnniversary(id: string): Promise<Anniversary | undefined> {
    return this.anniversaries.get(id);
  }
```

### method `saveAnniversary`

- Signature: `async saveAnniversary(anniversary: Anniversary): Promise<void>`
- Lines: 331-333
- Exported: yes

```ts
async saveAnniversary(anniversary: Anniversary): Promise<void> {
    this.anniversaries.set(anniversary.id, anniversary);
  }
```

### method `updateAnniversary`

- Signature: `async updateAnniversary(anniversary: Anniversary): Promise<void>`
- Lines: 335-337
- Exported: yes

```ts
async updateAnniversary(anniversary: Anniversary): Promise<void> {
    this.anniversaries.set(anniversary.id, anniversary);
  }
```

### method `deleteAnniversary`

- Signature: `async deleteAnniversary(id: string): Promise<void>`
- Lines: 339-341
- Exported: yes

```ts
async deleteAnniversary(id: string): Promise<void> {
    this.anniversaries.delete(id);
  }
```

### method `getUserById`

- Signature: `async getUserById(userId: string): Promise<User | undefined>`
- Lines: 343-345
- Exported: yes

```ts
async getUserById(userId: string): Promise<User | undefined> {
    return this.users.get(userId);
  }
```

### method `getCycleByUserId`

- Signature: `async getCycleByUserId(userId: string): Promise<EmotionalCycle | undefined>`
- Lines: 347-349
- Exported: yes

```ts
async getCycleByUserId(userId: string): Promise<EmotionalCycle | undefined> {
    return this.cycles.get(userId);
  }
```

### method `saveCycle`

- Signature: `async saveCycle(cycle: EmotionalCycle): Promise<void>`
- Lines: 351-353
- Exported: yes

```ts
async saveCycle(cycle: EmotionalCycle): Promise<void> {
    this.cycles.set(cycle.userId, cycle);
  }
```

### method `getMoodByUserId`

- Signature: `async getMoodByUserId(userId: string): Promise<UserMoodState | undefined>`
- Lines: 355-357
- Exported: yes

```ts
async getMoodByUserId(userId: string): Promise<UserMoodState | undefined> {
    return this.userMoods.get(userId);
  }
```

### method `upsertUserMood`

- Signature: `async upsertUserMood(userId: string, value: number): Promise<UserMoodState>`
- Lines: 359-367
- Exported: yes

```ts
async upsertUserMood(userId: string, value: number): Promise<UserMoodState> {
    const state: UserMoodState = {
      userId,
      value,
      updatedAt: nowIso(),
    };
    this.userMoods.set(userId, state);
    return state;
  }
```

### method `updateCouple`

- Signature: `async updateCouple(couple: Couple): Promise<void>`
- Lines: 369-371
- Exported: yes

```ts
async updateCouple(couple: Couple): Promise<void> {
    this.couples.set(couple.id, couple);
  }
```

### method `saveCouple`

- Signature: `async saveCouple(couple: Couple): Promise<void>`
- Lines: 373-375
- Exported: yes

```ts
async saveCouple(couple: Couple): Promise<void> {
    this.couples.set(couple.id, couple);
  }
```

### method `getHomeCache`

- Signature: `async getHomeCache(coupleId: string): Promise<unknown | undefined>`
- Lines: 377-389
- Exported: yes

```ts
async getHomeCache(coupleId: string): Promise<unknown | undefined> {
    const cached = this.homeCache.get(coupleId);
    if (!cached) {
      return undefined;
    }

    if (cached.expiresAt <= Date.now()) {
      this.homeCache.delete(coupleId);
      return undefined;
    }

    return cached.payload;
  }
```

### method `setHomeCache`

- Signature: `async setHomeCache(coupleId: string, payload: unknown, ttlSeconds: number): Promise<void>`
- Lines: 391-396
- Exported: yes

```ts
async setHomeCache(coupleId: string, payload: unknown, ttlSeconds: number): Promise<void> {
    this.homeCache.set(coupleId, {
      payload,
      expiresAt: Date.now() + ttlSeconds * 1000,
    });
  }
```

### method `invalidateHomeCache`

- Signature: `async invalidateHomeCache(coupleId: string): Promise<void>`
- Lines: 398-400
- Exported: yes

```ts
async invalidateHomeCache(coupleId: string): Promise<void> {
    this.homeCache.delete(coupleId);
  }
```

### method `saveOtp`

- Signature: `async saveOtp(email: string, otp: string, ttlSeconds: number): Promise<void>`
- Lines: 402-407
- Exported: yes

```ts
async saveOtp(email: string, otp: string, ttlSeconds: number): Promise<void> {
    this.otps.set(email.toLowerCase(), {
      otp,
      expiresAt: Date.now() + ttlSeconds * 1000,
    });
  }
```

### method `getOtp`

- Signature: `async getOtp(email: string): Promise<string | undefined>`
- Lines: 409-416
- Exported: yes

```ts
async getOtp(email: string): Promise<string | undefined> {
    const data = this.otps.get(email.toLowerCase());
    if (!data || data.expiresAt <= Date.now()) {
      this.otps.delete(email.toLowerCase());
      return undefined;
    }
    return data.otp;
  }
```

### method `deleteOtp`

- Signature: `async deleteOtp(email: string): Promise<void>`
- Lines: 418-420
- Exported: yes

```ts
async deleteOtp(email: string): Promise<void> {
    this.otps.delete(email.toLowerCase());
  }
```

### method `incrementRateLimit`

- Signature: `async incrementRateLimit(key: string, ttlSeconds: number): Promise<number>`
- Lines: 422-430
- Exported: yes

```ts
async incrementRateLimit(key: string, ttlSeconds: number): Promise<number> {
    const data = this.rateLimits.get(key);
    if (!data || data.expiresAt <= Date.now()) {
      this.rateLimits.set(key, { count: 1, expiresAt: Date.now() + ttlSeconds * 1000 });
      return 1;
    }
    data.count += 1;
    return data.count;
  }
```

### method `getRateLimitCount`

- Signature: `async getRateLimitCount(key: string): Promise<number>`
- Lines: 432-438
- Exported: yes

```ts
async getRateLimitCount(key: string): Promise<number> {
    const data = this.rateLimits.get(key);
    if (!data || data.expiresAt <= Date.now()) {
      return 0;
    }
    return data.count;
  }
```

### method `deleteRateLimitCount`

- Signature: `async deleteRateLimitCount(key: string): Promise<void>`
- Lines: 440-442
- Exported: yes

```ts
async deleteRateLimitCount(key: string): Promise<void> {
    this.rateLimits.delete(key);
  }
```

### method `listAllUsers`

- Signature: `async listAllUsers(): Promise<User[]>`
- Lines: 444-446
- Exported: yes

```ts
async listAllUsers(): Promise<User[]> {
    return Array.from(this.users.values());
  }
```

### method `listAllCouples`

- Signature: `async listAllCouples(): Promise<Couple[]>`
- Lines: 448-450
- Exported: yes

```ts
async listAllCouples(): Promise<Couple[]> {
    return Array.from(this.couples.values());
  }
```

### method `countMemories`

- Signature: `async countMemories(): Promise<number>`
- Lines: 452-454
- Exported: yes

```ts
async countMemories(): Promise<number> {
    return this.memories.size;
  }
```

### method `listNotificationsForUser`

- Signature: `async listNotificationsForUser( userId: string, options?: { page?: number; limit?: number; unreadOnly?: boolean }, ): Promise<{ items: InAppNotification[]; total: number }>`
- Lines: 456-471
- Exported: yes

```ts
async listNotificationsForUser(
    userId: string,
    options?: { page?: number; limit?: number; unreadOnly?: boolean },
  ): Promise<{ items: InAppNotification[]; total: number }> {
    const page = Math.max(1, options?.page ?? 1);
    const limit = Math.min(50, Math.max(1, options?.limit ?? 20));
    const unreadOnly = options?.unreadOnly ?? false;
    let items = [...this.inAppNotifications.values()].filter((n) => n.userId === userId);
    if (unreadOnly) {
      items = items.filter((n) => !n.readAt);
    }
    items.sort((a, b) => (a.createdAt < b.createdAt ? 1 : a.createdAt > b.createdAt ? -1 : 0));
    const total = items.length;
    const offset = (page - 1) * limit;
    return { items: items.slice(offset, offset + limit), total };
  }
```

### method `getNotificationForUser`

- Signature: `async getNotificationForUser(userId: string, notificationId: string): Promise<InAppNotification | undefined>`
- Lines: 473-479
- Exported: yes

```ts
async getNotificationForUser(userId: string, notificationId: string): Promise<InAppNotification | undefined> {
    const n = this.inAppNotifications.get(notificationId);
    if (!n || n.userId !== userId) {
      return undefined;
    }
    return n;
  }
```

### method `createInAppNotification`

- Signature: `async createInAppNotification( input: Omit<InAppNotification, "id" | "createdAt"> & { id?: string; createdAt?: string }, ): Promise<InAppNotification>`
- Lines: 481-493
- Exported: yes

```ts
async createInAppNotification(
    input: Omit<InAppNotification, "id" | "createdAt"> & { id?: string; createdAt?: string },
  ): Promise<InAppNotification> {
    const id = input.id ?? crypto.randomUUID();
    const row: InAppNotification = {
      ...input,
      id,
      createdAt: input.createdAt ?? new Date().toISOString(),
      metadata: input.metadata ?? {},
    };
    this.inAppNotifications.set(id, row);
    return row;
  }
```

### method `markNotificationRead`

- Signature: `async markNotificationRead(userId: string, notificationId: string): Promise<InAppNotification | undefined>`
- Lines: 495-504
- Exported: yes

```ts
async markNotificationRead(userId: string, notificationId: string): Promise<InAppNotification | undefined> {
    const n = this.inAppNotifications.get(notificationId);
    if (!n || n.userId !== userId) {
      return undefined;
    }
    const readAt = new Date().toISOString();
    const updated = { ...n, readAt };
    this.inAppNotifications.set(notificationId, updated);
    return updated;
  }
```

### method `markAllNotificationsRead`

- Signature: `async markAllNotificationsRead(userId: string): Promise<number>`
- Lines: 506-515
- Exported: yes

```ts
async markAllNotificationsRead(userId: string): Promise<number> {
    let count = 0;
    for (const [id, n] of this.inAppNotifications) {
      if (n.userId === userId && !n.readAt) {
        this.inAppNotifications.set(id, { ...n, readAt: new Date().toISOString() });
        count += 1;
      }
    }
    return count;
  }
```

### method `updateExpoPushToken`

- Signature: `async updateExpoPushToken(userId: string, token: string | null): Promise<void>`
- Lines: 517-523
- Exported: yes

```ts
async updateExpoPushToken(userId: string, token: string | null): Promise<void> {
    if (token === null || token === "") {
      this.expoPushTokens.delete(userId);
      return;
    }
    this.expoPushTokens.set(userId, token);
  }
```

### method `getExpoPushToken`

- Signature: `async getExpoPushToken(userId: string): Promise<string | null>`
- Lines: 525-527
- Exported: yes

```ts
async getExpoPushToken(userId: string): Promise<string | null> {
    return this.expoPushTokens.get(userId) ?? null;
  }
```

### function `nowIso`

- Signature: `function nowIso(): string`
- Lines: 16-18
- Exported: no

```ts
function nowIso(): string {
  return new Date().toISOString();
}
```

### function `randomToken`

- Signature: `function randomToken(prefix: string): string`
- Lines: 20-22
- Exported: no

```ts
function randomToken(prefix: string): string {
  return `${prefix}_${crypto.randomUUID()}`;
}
```
