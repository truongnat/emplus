import { generateInviteCode } from "../shared/code.ts";
import type { Anniversary, AuthProvider, BudgetItem, Couple, EmotionalCycle, Invite, MemoryItem, User } from "../types.ts";
import type { DataStore } from "./contracts.ts";

function nowIso(): string {
  return new Date().toISOString();
}

function randomToken(prefix: string): string {
  return `${prefix}_${crypto.randomUUID()}`;
}

const ACTIVE_COUPLE_STATUSES = new Set<string>(["DANG_YEU", "DA_CUOI"]);

export class InMemoryStore implements DataStore {
  users = new Map<string, User>();
  usersByAuth = new Map<string, string>();
  usersByEmail = new Map<string, string>();
  sessions = new Map<string, { userId: string; expiresAt: number }>();
  refreshSessions = new Map<string, { userId: string; expiresAt: number }>();
  couples = new Map<string, Couple>();
  invites = new Map<string, Invite>();
  memories = new Map<string, MemoryItem>();
  budgetItems = new Map<string, BudgetItem>();
  anniversaries = new Map<string, Anniversary>();
  cycles = new Map<string, EmotionalCycle>();
  homeCache = new Map<string, { payload: unknown; expiresAt: number }>();
  otps = new Map<string, { otp: string; expiresAt: number }>();
  rateLimits = new Map<string, { count: number; expiresAt: number }>();

  async reset(): Promise<void> {
    this.users.clear();
    this.usersByAuth.clear();
    this.usersByEmail.clear();
    this.sessions.clear();
    this.refreshSessions.clear();
    this.couples.clear();
    this.invites.clear();
    this.memories.clear();
    this.budgetItems.clear();
    this.anniversaries.clear();
    this.cycles.clear();
    this.homeCache.clear();
    this.otps.clear();
    this.rateLimits.clear();
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
}

export function generateTokens(): { accessToken: string; refreshToken: string } {
  return {
    accessToken: randomToken("at"),
    refreshToken: randomToken("rt"),
  };
}
