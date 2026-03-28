import Redis from "ioredis";
import postgres, { type Sql } from "postgres";
import { generateInviteCode } from "../shared/code.ts";
import type {
  Anniversary,
  AuthProvider,
  BudgetItem,
  Couple,
  EmotionalCycle,
  InAppNotification,
  Invite,
  MemoryItem,
  User,
} from "../types.ts";
import type { DataStore } from "./contracts.ts";

const SESSION_PREFIX = "sess:token:";
const REFRESH_SESSION_PREFIX = "sess:refresh:";
const INVITE_PREFIX = "pairing:code:";
const HOME_CACHE_PREFIX = "cache:home:";

function asDate(value: string | Date | null | undefined): string | undefined {
  if (!value) {
    return undefined;
  }

  if (value instanceof Date) {
    return value.toISOString().slice(0, 10);
  }

  return value.slice(0, 10);
}

function asIso(value: string | Date | null | undefined): string | undefined {
  if (!value) {
    return undefined;
  }

  if (value instanceof Date) {
    return value.toISOString();
  }

  return new Date(value).toISOString();
}

type UserRow = {
  id: string;
  email: string;
  fullName: string;
  nickname: string | null;
  avatarUrl: string | null;
  gender: User["gender"];
  dob: string | Date | null;
  authProvider: User["authProvider"];
  authId: string;
  passwordHash: string | null;
  timezone: string;
  isActive: boolean;
  isAdmin: boolean | null;
  createdAt: string | Date;
  updatedAt: string | Date;
};

type CoupleRow = {
  id: string;
  partner1Id: string;
  partner2Id: string | null;
  loveStartDate: string | Date | null;
  weddingDate: string | Date | null;
  status: Couple["status"];
  inviteCode: string | null;
  inviteExpiresAt: string | Date | null;
  settings: Record<string, unknown> | null;
  createdAt: string | Date;
};

type MemoryRow = {
  id: string;
  coupleId: string;
  createdById: string;
  title: string;
  description: string | null;
  memoryDate: string | Date;
  mediaUrls: string[];
  tags: string[] | null;
  createdAt: string | Date;
};

type CycleRow = {
  id: string;
  userId: string;
  startDate: string | Date;
  cycleDuration: number;
  periodDuration: number;
  symptomNotes: string[] | null;
  isTrackingActive: boolean;
};

type BudgetRow = {
  id: string;
  coupleId: string;
  createdById: string;
  title: string;
  amount: string | number;
  category: string;
  date: string | Date;
  place: string | null;
  status: BudgetItem["status"];
  note: string | null;
  createdAt: string | Date;
};

type AnniversaryRow = {
  id: string;
  coupleId: string;
  title: string;
  eventDate: string | Date;
  recurrenceType: string;
  category: string;
  isSystemGenerated: boolean;
  notifySettings: {
    t7: boolean;
    t3: boolean;
    t0: boolean;
  };
  createdAt: string | Date;
};

function fromUserRow(row: UserRow): User {
  return {
    id: row.id,
    email: row.email,
    fullName: row.fullName,
    nickname: row.nickname ?? undefined,
    avatarUrl: row.avatarUrl ?? undefined,
    gender: row.gender,
    dob: asDate(row.dob),
    authProvider: row.authProvider,
    authId: row.authId,
    passwordHash: row.passwordHash ?? undefined,
    timezone: row.timezone,
    isActive: row.isActive,
    isAdmin: row.isAdmin ?? undefined,
    createdAt: asIso(row.createdAt) ?? new Date().toISOString(),
    updatedAt: asIso(row.updatedAt) ?? new Date().toISOString(),
  };
}

function fromCoupleRow(row: CoupleRow): Couple {
  return {
    id: row.id,
    partner1Id: row.partner1Id,
    partner2Id: row.partner2Id ?? undefined,
    loveStartDate: asDate(row.loveStartDate),
    weddingDate: asDate(row.weddingDate),
    status: row.status,
    inviteCode: row.inviteCode ?? undefined,
    inviteExpiresAt: asIso(row.inviteExpiresAt),
    settings: row.settings ?? {},
    createdAt: asIso(row.createdAt) ?? new Date().toISOString(),
  };
}

function fromMemoryRow(row: MemoryRow): MemoryItem {
  return {
    id: row.id,
    coupleId: row.coupleId,
    createdById: row.createdById,
    title: row.title,
    description: row.description ?? undefined,
    memoryDate: asDate(row.memoryDate) ?? new Date().toISOString().slice(0, 10),
    mediaUrls: row.mediaUrls ?? [],
    tags: row.tags ?? [],
    createdAt: asIso(row.createdAt) ?? new Date().toISOString(),
  };
}

function fromCycleRow(row: CycleRow): EmotionalCycle {
  return {
    id: row.id,
    userId: row.userId,
    startDate: asDate(row.startDate) ?? new Date().toISOString().slice(0, 10),
    cycleDuration: row.cycleDuration,
    periodDuration: row.periodDuration,
    symptomNotes: row.symptomNotes ?? [],
    isTrackingActive: row.isTrackingActive,
  };
}

function fromBudgetRow(row: BudgetRow): BudgetItem {
  return {
    id: row.id,
    coupleId: row.coupleId,
    createdById: row.createdById,
    title: row.title,
    amount: Number(row.amount),
    category: row.category,
    date: asDate(row.date) ?? new Date().toISOString().slice(0, 10),
    place: row.place ?? undefined,
    status: row.status,
    note: row.note ?? undefined,
    createdAt: asIso(row.createdAt) ?? new Date().toISOString(),
  };
}

function fromAnniversaryRow(row: AnniversaryRow): Anniversary {
  return {
    id: row.id,
    coupleId: row.coupleId,
    title: row.title,
    eventDate: asDate(row.eventDate) ?? new Date().toISOString().slice(0, 10),
    recurrenceType: row.recurrenceType as Anniversary["recurrenceType"],
    category: row.category as Anniversary["category"],
    isSystemGenerated: row.isSystemGenerated,
    notifySettings: row.notifySettings,
    createdAt: asIso(row.createdAt) ?? new Date().toISOString(),
  };
}

type InAppNotificationRow = {
  id: string;
  userId: string;
  coupleId: string | null;
  type: string;
  title: string;
  body: string | null;
  iconName: string | null;
  iconColor: string | null;
  iconBg: string | null;
  actionLabel: string | null;
  metadata: Record<string, unknown> | null;
  readAt: string | Date | null;
  createdAt: string | Date;
};

function fromInAppNotificationRow(row: InAppNotificationRow): InAppNotification {
  return {
    id: row.id,
    userId: row.userId,
    coupleId: row.coupleId ?? undefined,
    type: row.type,
    title: row.title,
    body: row.body ?? undefined,
    iconName: row.iconName ?? undefined,
    iconColor: row.iconColor ?? undefined,
    iconBg: row.iconBg ?? undefined,
    actionLabel: row.actionLabel ?? undefined,
    metadata: row.metadata ?? {},
    readAt: row.readAt ? asIso(row.readAt) : undefined,
    createdAt: asIso(row.createdAt) ?? new Date().toISOString(),
  };
}

export class PostgresStore implements DataStore {
  private redisFallbackLogged = false;

  constructor(
    private readonly sql: Sql,
    private readonly readSql: Sql,
    private redis?: Redis,
  ) {
    if (this.redis) {
      // Tránh lỗi event không bắt được làm nhiễu log runtime.
      this.redis.on("error", () => {
        // Lỗi từng lệnh Redis đã được xử lý trong redisGet/redisSet/redisDel.
      });
    }
  }

  private sessionKey(token: string): string {
    return `${SESSION_PREFIX}${token}`;
  }

  private refreshSessionKey(token: string): string {
    return `${REFRESH_SESSION_PREFIX}${token}`;
  }

  private inviteKey(code: string): string {
    return `${INVITE_PREFIX}${code}`;
  }

  private homeCacheKey(coupleId: string): string {
    return `${HOME_CACHE_PREFIX}${coupleId}`;
  }

  private otpKey(email: string): string {
    return `auth:otp:${email.toLowerCase()}`;
  }

  private rateLimitKey(key: string): string {
    return `ratelimit:${key}`;
  }

  private disableRedis(): void {
    if (!this.redis) {
      return;
    }

    this.redis.disconnect();
    this.redis = undefined;
  }

  private handleRedisError(error: unknown): void {
    if (!this.redisFallbackLogged) {
      this.redisFallbackLogged = true;
      console.error("Redis không khả dụng. Chuyển sang luồng chỉ dùng DB cho cache/session.", error);
    }

    this.disableRedis();
  }

  private async redisGet(key: string): Promise<string | undefined> {
    if (!this.redis) {
      return undefined;
    }

    try {
      const value = await this.redis.get(key);
      return value ?? undefined;
    } catch (error) {
      this.handleRedisError(error);
      return undefined;
    }
  }

  private async redisSet(key: string, value: string, ttlSeconds?: number): Promise<void> {
    if (!this.redis) {
      return;
    }

    try {
      if (ttlSeconds && ttlSeconds > 0) {
        await this.redis.set(key, value, "EX", ttlSeconds);
        return;
      }

      await this.redis.set(key, value);
    } catch (error) {
      this.handleRedisError(error);
    }
  }

  private async redisDel(key: string): Promise<void> {
    if (!this.redis) {
      return;
    }

    try {
      await this.redis.del(key);
    } catch (error) {
      this.handleRedisError(error);
    }
  }

  async getUserByToken(token: string): Promise<User | undefined> {
    const cachedUserId = await this.redisGet(this.sessionKey(token));
    if (cachedUserId) {
      const cachedUser = await this.getUserById(cachedUserId);
      if (cachedUser) {
        return cachedUser;
      }
    }

    const rows = await this.sql<{ userId: string; ttlSeconds: number }[]>`
      SELECT user_id AS "userId",
             GREATEST(1, EXTRACT(EPOCH FROM (expires_at - NOW()))::INT) AS "ttlSeconds"
      FROM user_sessions
      WHERE access_token = ${token}
        AND expires_at > NOW()
      LIMIT 1
    `;

    const session = rows[0];
    if (!session) {
      return undefined;
    }

    await this.redisSet(this.sessionKey(token), session.userId, session.ttlSeconds);

    return this.getUserById(session.userId);
  }

  async findUserByAuth(provider: AuthProvider, authId: string): Promise<User | undefined> {
    const rows = await this.sql<UserRow[]>`
      SELECT id,
             email,
             full_name AS "fullName",
             nickname,
             avatar_url AS "avatarUrl",
             gender,
             dob,
             auth_provider AS "authProvider",
             auth_id AS "authId",
             password_hash AS "passwordHash",
             timezone,
             is_active AS "isActive",
             created_at AS "createdAt",
             updated_at AS "updatedAt"
      FROM users
      WHERE auth_provider = ${provider}
        AND auth_id = ${authId}
      LIMIT 1
    `;

    return rows[0] ? fromUserRow(rows[0]) : undefined;
  }

  async findUserByEmail(email: string): Promise<User | undefined> {
    const rows = await this.sql<UserRow[]>`
      SELECT id,
             email,
             full_name AS "fullName",
             nickname,
             avatar_url AS "avatarUrl",
             gender,
             dob,
             auth_provider AS "authProvider",
             auth_id AS "authId",
             password_hash AS "passwordHash",
             timezone,
             is_active AS "isActive",
             created_at AS "createdAt",
             updated_at AS "updatedAt"
      FROM users
      WHERE LOWER(email) = LOWER(${email})
      LIMIT 1
    `;

    return rows[0] ? fromUserRow(rows[0]) : undefined;
  }

  async saveUser(user: User): Promise<void> {
    await this.sql`
      INSERT INTO users (
        id,
        email,
        full_name,
        nickname,
        avatar_url,
        gender,
        dob,
        auth_provider,
        auth_id,
        password_hash,
        timezone,
        is_active,
        is_admin,
        created_at,
        updated_at
      ) VALUES (
        ${user.id},
        ${user.email},
        ${user.fullName},
        ${user.nickname ?? null},
        ${user.avatarUrl ?? null},
        ${user.gender},
        ${user.dob ?? null},
        ${user.authProvider},
        ${user.authId},
        ${user.passwordHash ?? null},
        ${user.timezone},
        ${user.isActive},
        ${user.isAdmin ?? false},
        ${user.createdAt},
        ${user.updatedAt}
      )
      ON CONFLICT (id)
      DO UPDATE SET
        email = EXCLUDED.email,
        full_name = EXCLUDED.full_name,
        nickname = EXCLUDED.nickname,
        avatar_url = EXCLUDED.avatar_url,
        gender = EXCLUDED.gender,
        dob = EXCLUDED.dob,
        password_hash = EXCLUDED.password_hash,
        timezone = EXCLUDED.timezone,
        is_active = EXCLUDED.is_active,
        is_admin = EXCLUDED.is_admin,
        updated_at = EXCLUDED.updated_at
    `;
  }

  async saveSession(accessToken: string, userId: string, ttlSeconds: number): Promise<void> {
    const expiresAt = new Date(Date.now() + ttlSeconds * 1000).toISOString();

    await this.sql`
      INSERT INTO user_sessions (access_token, user_id, expires_at)
      VALUES (${accessToken}, ${userId}, ${expiresAt})
      ON CONFLICT (access_token)
      DO UPDATE SET
        user_id = EXCLUDED.user_id,
        expires_at = EXCLUDED.expires_at
    `;

    await this.redisSet(this.sessionKey(accessToken), userId, ttlSeconds);
  }

  async deleteSession(accessToken: string): Promise<void> {
    await this.sql`
      DELETE FROM user_sessions
      WHERE access_token = ${accessToken}
    `;
    await this.redisDel(this.sessionKey(accessToken));
  }

  async saveRefreshSession(refreshToken: string, userId: string, ttlSeconds: number): Promise<void> {
    const expiresAt = new Date(Date.now() + ttlSeconds * 1000).toISOString();

    await this.sql`
      INSERT INTO user_refresh_sessions (refresh_token, user_id, expires_at)
      VALUES (${refreshToken}, ${userId}, ${expiresAt})
      ON CONFLICT (refresh_token)
      DO UPDATE SET
        user_id = EXCLUDED.user_id,
        expires_at = EXCLUDED.expires_at
    `;

    await this.redisSet(this.refreshSessionKey(refreshToken), userId, ttlSeconds);
  }

  async deleteRefreshSession(refreshToken: string): Promise<void> {
    await this.sql`
      DELETE FROM user_refresh_sessions
      WHERE refresh_token = ${refreshToken}
    `;
    await this.redisDel(this.refreshSessionKey(refreshToken));
  }

  async consumeRefreshSession(refreshToken: string): Promise<User | undefined> {
    const rows = await this.sql<{ userId: string }[]>`
      DELETE FROM user_refresh_sessions
      WHERE refresh_token = ${refreshToken}
        AND expires_at > NOW()
      RETURNING user_id AS "userId"
    `;

    await this.redisDel(this.refreshSessionKey(refreshToken));

    const userId = rows[0]?.userId;
    if (!userId) {
      return undefined;
    }

    return this.getUserById(userId);
  }

  async getActiveCoupleForUser(userId: string): Promise<Couple | undefined> {
    const rows = await this.sql<CoupleRow[]>`
      SELECT id,
             partner_1_id AS "partner1Id",
             partner_2_id AS "partner2Id",
             love_start_date AS "loveStartDate",
             wedding_date AS "weddingDate",
             status,
             invite_code AS "inviteCode",
             invite_expires_at AS "inviteExpiresAt",
             settings,
             created_at AS "createdAt"
      FROM couples
      WHERE (partner_1_id = ${userId} OR partner_2_id = ${userId})
        AND status IN ('DANG_YEU', 'DA_CUOI')
      LIMIT 1
    `;

    return rows[0] ? fromCoupleRow(rows[0]) : undefined;
  }

  async getPendingCoupleByCreator(userId: string): Promise<Couple | undefined> {
    const rows = await this.sql<CoupleRow[]>`
      SELECT id,
             partner_1_id AS "partner1Id",
             partner_2_id AS "partner2Id",
             love_start_date AS "loveStartDate",
             wedding_date AS "weddingDate",
             status,
             invite_code AS "inviteCode",
             invite_expires_at AS "inviteExpiresAt",
             settings,
             created_at AS "createdAt"
      FROM couples
      WHERE partner_1_id = ${userId}
        AND partner_2_id IS NULL
        AND status = 'CHO_GHEP_DOI'
      LIMIT 1
    `;

    return rows[0] ? fromCoupleRow(rows[0]) : undefined;
  }

  async createPendingCouple(creatorId: string): Promise<Couple> {
    const couple: Couple = {
      id: crypto.randomUUID(),
      partner1Id: creatorId,
      status: "CHO_GHEP_DOI",
      settings: {},
      createdAt: new Date().toISOString(),
    };

    await this.sql`
      INSERT INTO couples (id, partner_1_id, status, settings, created_at)
      VALUES (${couple.id}, ${couple.partner1Id}, ${couple.status}, ${JSON.stringify(couple.settings)}::jsonb, ${couple.createdAt})
    `;

    return couple;
  }

  async issueInviteForCouple(coupleId: string, createdBy: string): Promise<Invite> {
    const coupleRows = await this.sql<{ id: string; inviteCode: string | null }[]>`
      SELECT id,
             invite_code AS "inviteCode"
      FROM couples
      WHERE id = ${coupleId}
      LIMIT 1
    `;

    if (!coupleRows[0]) {
      throw new Error("Không tìm thấy cặp đôi.");
    }

    const previousInviteCode = coupleRows[0].inviteCode;

    for (let attempt = 0; attempt < 10; attempt += 1) {
      const code = generateInviteCode(6);
      const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();

      try {
        await this.sql`
          UPDATE couples
          SET invite_code = ${code},
              invite_expires_at = ${expiresAt}
          WHERE id = ${coupleId}
        `;

        const invite: Invite = {
          code,
          coupleId,
          createdBy,
          expiresAt,
        };

        if (previousInviteCode && previousInviteCode !== code) {
          await this.redisDel(this.inviteKey(previousInviteCode));
        }
        await this.redisSet(this.inviteKey(code), JSON.stringify(invite), 24 * 60 * 60);

        return invite;
      } catch (error: unknown) {
        if (
          typeof error === "object" &&
          error !== null &&
          "code" in error &&
          (error as { code?: string }).code === "23505"
        ) {
          continue;
        }

        throw error;
      }
    }

    throw new Error("Không thể tạo mã mời duy nhất sau nhiều lần thử.");
  }

  async getInvite(code: string): Promise<Invite | undefined> {
    const cached = await this.redisGet(this.inviteKey(code));
    if (cached) {
      try {
        const parsed = JSON.parse(cached) as Invite;

        const validRows = await this.sql<{ coupleId: string }[]>`
          SELECT id AS "coupleId"
          FROM couples
          WHERE id = ${parsed.coupleId}
            AND invite_code = ${code}
            AND invite_expires_at > NOW()
          LIMIT 1
        `;

        if (validRows[0]) {
          return parsed;
        }

        await this.redisDel(this.inviteKey(code));
      } catch {
        await this.redisDel(this.inviteKey(code));
      }
    }

    const rows = await this.sql<
      {
        coupleId: string;
        createdBy: string;
        expiresAt: string | Date;
      }[]
    >`
      SELECT id AS "coupleId",
             partner_1_id AS "createdBy",
             invite_expires_at AS "expiresAt"
      FROM couples
      WHERE invite_code = ${code}
        AND invite_expires_at > NOW()
      LIMIT 1
    `;

    const row = rows[0];
    if (!row) {
      return undefined;
    }

    const expiresAt = asIso(row.expiresAt) ?? new Date().toISOString();
    const invite: Invite = {
      code,
      coupleId: row.coupleId,
      createdBy: row.createdBy,
      expiresAt,
    };

    const ttlSeconds = Math.max(1, Math.floor((new Date(expiresAt).getTime() - Date.now()) / 1000));
    await this.redisSet(this.inviteKey(code), JSON.stringify(invite), ttlSeconds);

    return invite;
  }

  async deleteInvite(code: string): Promise<void> {
    await this.sql`
      UPDATE couples
      SET invite_code = NULL,
          invite_expires_at = NULL
      WHERE invite_code = ${code}
    `;

    await this.redisDel(this.inviteKey(code));
  }

  async getCoupleById(coupleId: string): Promise<Couple | undefined> {
    const rows = await this.sql<CoupleRow[]>`
      SELECT id,
             partner_1_id AS "partner1Id",
             partner_2_id AS "partner2Id",
             love_start_date AS "loveStartDate",
             wedding_date AS "weddingDate",
             status,
             invite_code AS "inviteCode",
             invite_expires_at AS "inviteExpiresAt",
             settings,
             created_at AS "createdAt"
      FROM couples
      WHERE id = ${coupleId}
      LIMIT 1
    `;

    return rows[0] ? fromCoupleRow(rows[0]) : undefined;
  }

  async userAlreadyInCouple(userId: string): Promise<boolean> {
    const rows = await this.sql<{ found: boolean }[]>`
      SELECT EXISTS(
        SELECT 1
        FROM couples
        WHERE (partner_1_id = ${userId} OR partner_2_id = ${userId})
          AND status IN ('DATING', 'MARRIED')
      ) AS found
    `;

    return rows[0]?.found ?? false;
  }

  async inviterHasOtherActiveCouple(inviterId: string, excludeCoupleId: string): Promise<boolean> {
    const rows = await this.sql<{ found: boolean }[]>`
      SELECT EXISTS(
        SELECT 1
        FROM couples
        WHERE id <> ${excludeCoupleId}
          AND status IN ('DATING', 'MARRIED')
          AND (partner_1_id = ${inviterId} OR partner_2_id = ${inviterId})
      ) AS found
    `;

    return rows[0]?.found ?? false;
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
    const offset = (page - 1) * limit;
    const orderBy = order === "asc" ? "ASC" : "DESC";

    // Get total count
    const countResult = await this.sql<{ count: string }[]>`
      SELECT COUNT(*) as count FROM memories WHERE couple_id = ${coupleId}
    `;
    const total = Number(countResult[0]?.count ?? 0);

    // Get paginated items
    const rows = await this.sql<MemoryRow[]>`
      SELECT id,
             couple_id AS "coupleId",
             created_by_id AS "createdById",
             title,
             description,
             memory_date AS "memoryDate",
             media_urls AS "mediaUrls",
             tags,
             created_at AS "createdAt"
      FROM memories
      WHERE couple_id = ${coupleId}
      ORDER BY memory_date ${this.sql.unsafe(orderBy)}, created_at ${this.sql.unsafe(orderBy)}
      LIMIT ${limit} OFFSET ${offset}
    `;

    let items = rows.map(fromMemoryRow);

    // Filter by tag in JS (for complex tag matching)
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

    return { items, total };
  }

  async saveMemory(memory: MemoryItem): Promise<void> {
    await this.sql`
      INSERT INTO memories (
        id,
        couple_id,
        created_by_id,
        title,
        description,
        memory_date,
        media_urls,
        tags,
        created_at
      ) VALUES (
        ${memory.id},
        ${memory.coupleId},
        ${memory.createdById},
        ${memory.title},
        ${memory.description ?? null},
        ${memory.memoryDate},
        ${JSON.stringify(memory.mediaUrls)}::jsonb,
        ${memory.tags},
        ${memory.createdAt}
      )
    `;
  }

  async listBudgetItemsByCouple(coupleId: string): Promise<BudgetItem[]> {
    const rows = await this.sql<BudgetRow[]>`
      SELECT id,
             couple_id AS "coupleId",
             created_by_id AS "createdById",
             title,
             amount,
             category,
             date,
             place,
             status,
             note,
             created_at AS "createdAt"
      FROM budget_items
      WHERE couple_id = ${coupleId}
      ORDER BY date DESC, created_at DESC
    `;
    return rows.map(fromBudgetRow);
  }

  async getBudgetItem(id: string): Promise<BudgetItem | undefined> {
    const rows = await this.sql<BudgetRow[]>`
      SELECT id,
             couple_id AS "coupleId",
             created_by_id AS "createdById",
             title,
             amount,
             category,
             date,
             place,
             status,
             note,
             created_at AS "createdAt"
      FROM budget_items
      WHERE id = ${id}
      LIMIT 1
    `;
    return rows[0] ? fromBudgetRow(rows[0]) : undefined;
  }

  async saveBudgetItem(item: BudgetItem): Promise<void> {
    await this.sql`
      INSERT INTO budget_items (
        id,
        couple_id,
        created_by_id,
        title,
        amount,
        category,
        date,
        place,
        status,
        note,
        created_at
      ) VALUES (
        ${item.id},
        ${item.coupleId},
        ${item.createdById},
        ${item.title},
        ${item.amount},
        ${item.category},
        ${item.date},
        ${item.place ?? null},
        ${item.status},
        ${item.note ?? null},
        ${item.createdAt}
      )
    `;
  }

  async updateBudgetItem(item: BudgetItem): Promise<void> {
    await this.sql`
      UPDATE budget_items
      SET title = ${item.title},
          amount = ${item.amount},
          category = ${item.category},
          date = ${item.date},
          place = ${item.place ?? null},
          status = ${item.status},
          note = ${item.note ?? null}
      WHERE id = ${item.id}
    `;
  }

  async deleteBudgetItem(id: string): Promise<void> {
    await this.sql`
      DELETE FROM budget_items
      WHERE id = ${id}
    `;
  }

  async listAnniversariesByCouple(coupleId: string): Promise<Anniversary[]> {
    const rows = await this.sql<AnniversaryRow[]>`
      SELECT id,
             couple_id AS "coupleId",
             title,
             event_date AS "eventDate",
             recurrence_type AS "recurrenceType",
             category,
             is_system_generated AS "isSystemGenerated",
             notify_settings AS "notifySettings",
             created_at AS "createdAt"
      FROM anniversaries
      WHERE couple_id = ${coupleId}
      ORDER BY event_date ASC
    `;
    return rows.map(fromAnniversaryRow);
  }

  async getAnniversary(id: string): Promise<Anniversary | undefined> {
    const rows = await this.sql<AnniversaryRow[]>`
      SELECT id,
             couple_id AS "coupleId",
             title,
             event_date AS "eventDate",
             recurrence_type AS "recurrenceType",
             category,
             is_system_generated AS "isSystemGenerated",
             notify_settings AS "notifySettings",
             created_at AS "createdAt"
      FROM anniversaries
      WHERE id = ${id}
      LIMIT 1
    `;
    return rows[0] ? fromAnniversaryRow(rows[0]) : undefined;
  }

  async saveAnniversary(anniversary: Anniversary): Promise<void> {
    await this.sql`
      INSERT INTO anniversaries (
        id,
        couple_id,
        title,
        event_date,
        recurrence_type,
        category,
        is_system_generated,
        notify_settings,
        created_at
      ) VALUES (
        ${anniversary.id},
        ${anniversary.coupleId},
        ${anniversary.title},
        ${anniversary.eventDate},
        ${anniversary.recurrenceType},
        ${anniversary.category},
        ${anniversary.isSystemGenerated},
        ${JSON.stringify(anniversary.notifySettings)}::jsonb,
        ${anniversary.createdAt}
      )
    `;
  }

  async updateAnniversary(anniversary: Anniversary): Promise<void> {
    await this.sql`
      UPDATE anniversaries SET
        title = ${anniversary.title},
        event_date = ${anniversary.eventDate},
        recurrence_type = ${anniversary.recurrenceType},
        category = ${anniversary.category},
        is_system_generated = ${anniversary.isSystemGenerated},
        notify_settings = ${JSON.stringify(anniversary.notifySettings)}::jsonb
      WHERE id = ${anniversary.id}
    `;
  }

  async deleteAnniversary(id: string): Promise<void> {
    await this.sql`
      DELETE FROM anniversaries
      WHERE id = ${id}
    `;
  }

  async getUserById(userId: string): Promise<User | undefined> {
    const rows = await this.sql<UserRow[]>`
      SELECT id,
             email,
             full_name AS "fullName",
             nickname,
             avatar_url AS "avatarUrl",
             gender,
             dob,
             auth_provider AS "authProvider",
             auth_id AS "authId",
             password_hash AS "passwordHash",
             timezone,
             is_active AS "isActive",
             is_admin AS "isAdmin",
             created_at AS "createdAt",
             updated_at AS "updatedAt"
      FROM users
      WHERE id = ${userId}
      LIMIT 1
    `;

    return rows[0] ? fromUserRow(rows[0]) : undefined;
  }

  async getCycleByUserId(userId: string): Promise<EmotionalCycle | undefined> {
    const rows = await this.sql<CycleRow[]>`
      SELECT id,
             user_id AS "userId",
             start_date AS "startDate",
             cycle_duration AS "cycleDuration",
             period_duration AS "periodDuration",
             symptom_notes AS "symptomNotes",
             is_tracking_active AS "isTrackingActive"
      FROM emotional_cycles
      WHERE user_id = ${userId}
      LIMIT 1
    `;

    return rows[0] ? fromCycleRow(rows[0]) : undefined;
  }

  async saveCycle(cycle: EmotionalCycle): Promise<void> {
    await this.sql`
      INSERT INTO emotional_cycles (
        id,
        user_id,
        start_date,
        cycle_duration,
        period_duration,
        symptom_notes,
        is_tracking_active,
        updated_at
      ) VALUES (
        ${cycle.id},
        ${cycle.userId},
        ${cycle.startDate},
        ${cycle.cycleDuration},
        ${cycle.periodDuration},
        ${JSON.stringify(cycle.symptomNotes)}::jsonb,
        ${cycle.isTrackingActive},
        NOW()
      )
      ON CONFLICT (user_id)
      DO UPDATE SET
        start_date = EXCLUDED.start_date,
        cycle_duration = EXCLUDED.cycle_duration,
        period_duration = EXCLUDED.period_duration,
        symptom_notes = EXCLUDED.symptom_notes,
        is_tracking_active = EXCLUDED.is_tracking_active,
        updated_at = NOW()
    `;
  }

  async updateCouple(couple: Couple): Promise<void> {
    await this.sql`
      UPDATE couples
      SET partner_1_id = ${couple.partner1Id},
          partner_2_id = ${couple.partner2Id ?? null},
          love_start_date = ${couple.loveStartDate ?? null},
          wedding_date = ${couple.weddingDate ?? null},
          status = ${couple.status},
          invite_code = ${couple.inviteCode ?? null},
          invite_expires_at = ${couple.inviteExpiresAt ?? null},
          settings = ${JSON.stringify(couple.settings)}::jsonb
      WHERE id = ${couple.id}
    `;
  }

  async saveCouple(couple: Couple): Promise<void> {
    await this.sql`
      INSERT INTO couples (
        id,
        partner_1_id,
        partner_2_id,
        love_start_date,
        wedding_date,
        status,
        invite_code,
        invite_expires_at,
        settings,
        created_at
      ) VALUES (
        ${couple.id},
        ${couple.partner1Id},
        ${couple.partner2Id ?? null},
        ${couple.loveStartDate ?? null},
        ${couple.weddingDate ?? null},
        ${couple.status},
        ${couple.inviteCode ?? null},
        ${couple.inviteExpiresAt ?? null},
        ${JSON.stringify(couple.settings)}::jsonb,
        ${couple.createdAt}
      )
      ON CONFLICT (id)
      DO UPDATE SET
        partner_1_id = EXCLUDED.partner_1_id,
        partner_2_id = EXCLUDED.partner_2_id,
        love_start_date = EXCLUDED.love_start_date,
        wedding_date = EXCLUDED.wedding_date,
        status = EXCLUDED.status,
        invite_code = EXCLUDED.invite_code,
        invite_expires_at = EXCLUDED.invite_expires_at,
        settings = EXCLUDED.settings
    `;
  }

  async getHomeCache(coupleId: string): Promise<unknown | undefined> {
    const cached = await this.redisGet(this.homeCacheKey(coupleId));
    if (!cached) {
      return undefined;
    }

    try {
      return JSON.parse(cached);
    } catch {
      await this.redisDel(this.homeCacheKey(coupleId));
      return undefined;
    }
  }

  async setHomeCache(coupleId: string, payload: unknown, ttlSeconds: number): Promise<void> {
    await this.redisSet(this.homeCacheKey(coupleId), JSON.stringify(payload), ttlSeconds);
  }

  async saveOtp(email: string, otp: string, ttlSeconds: number): Promise<void> {
    await this.redisSet(this.otpKey(email), otp, ttlSeconds);
  }

  async getOtp(email: string): Promise<string | undefined> {
    return this.redisGet(this.otpKey(email));
  }

  async deleteOtp(email: string): Promise<void> {
    await this.redisDel(this.otpKey(email));
  }

  async incrementRateLimit(key: string, ttlSeconds: number): Promise<number> {
    if (!this.redis) return 0;
    try {
      const redisKey = this.rateLimitKey(key);
      const count = await this.redis.incr(redisKey);
      if (count === 1) {
        await this.redis.expire(redisKey, ttlSeconds);
      }
      return count;
    } catch (error) {
      this.handleRedisError(error);
      return 0;
    }
  }

  async getRateLimitCount(key: string): Promise<number> {
    const val = await this.redisGet(this.rateLimitKey(key));
    return val ? parseInt(val, 10) : 0;
  }

  async deleteRateLimitCount(key: string): Promise<void> {
    await this.redisDel(this.rateLimitKey(key));
  }

  async invalidateHomeCache(coupleId: string): Promise<void> {
    await this.redisDel(this.homeCacheKey(coupleId));
  }

  async listAllUsers(): Promise<User[]> {
    const rows = await this.sql<UserRow[]>`
      SELECT id,
             email,
             full_name AS "fullName",
             nickname,
             avatar_url AS "avatarUrl",
             gender,
             dob,
             auth_provider AS "authProvider",
             auth_id AS "authId",
             password_hash AS "passwordHash",
             timezone,
             is_active AS "isActive",
             is_admin AS "isAdmin",
             created_at AS "createdAt",
             updated_at AS "updatedAt"
      FROM users
      ORDER BY created_at DESC
    `;
    return rows.map(fromUserRow);
  }

  async listAllCouples(): Promise<Couple[]> {
    const rows = await this.sql<CoupleRow[]>`
      SELECT id,
             partner_1_id AS "partner1Id",
             partner_2_id AS "partner2Id",
             love_start_date AS "loveStartDate",
             wedding_date AS "weddingDate",
             status,
             invite_code AS "inviteCode",
             invite_expires_at AS "inviteExpiresAt",
             settings,
             created_at AS "createdAt"
      FROM couples
      ORDER BY created_at DESC
    `;
    return rows.map(fromCoupleRow);
  }

  async countMemories(): Promise<number> {
    const rows = await this.sql<{ count: bigint }[]>`
      SELECT COUNT(*) as count FROM memories
    `;
    return Number(rows[0]?.count || 0);
  }

  async listNotificationsForUser(
    userId: string,
    options?: { page?: number; limit?: number; unreadOnly?: boolean },
  ): Promise<{ items: InAppNotification[]; total: number }> {
    const page = Math.max(1, options?.page ?? 1);
    const limit = Math.min(50, Math.max(1, options?.limit ?? 20));
    const offset = (page - 1) * limit;
    const unreadOnly = options?.unreadOnly ?? false;

    const countRows = unreadOnly
      ? await this.sql<{ count: string }[]>`
          SELECT COUNT(*)::text AS count
          FROM in_app_notifications
          WHERE user_id = ${userId} AND read_at IS NULL
        `
      : await this.sql<{ count: string }[]>`
          SELECT COUNT(*)::text AS count
          FROM in_app_notifications
          WHERE user_id = ${userId}
        `;
    const total = Number(countRows[0]?.count ?? 0);

    const rows = unreadOnly
      ? await this.sql<InAppNotificationRow[]>`
          SELECT id,
                 user_id AS "userId",
                 couple_id AS "coupleId",
                 type,
                 title,
                 body,
                 icon_name AS "iconName",
                 icon_color AS "iconColor",
                 icon_bg AS "iconBg",
                 action_label AS "actionLabel",
                 metadata,
                 read_at AS "readAt",
                 created_at AS "createdAt"
          FROM in_app_notifications
          WHERE user_id = ${userId} AND read_at IS NULL
          ORDER BY created_at DESC
          LIMIT ${limit} OFFSET ${offset}
        `
      : await this.sql<InAppNotificationRow[]>`
          SELECT id,
                 user_id AS "userId",
                 couple_id AS "coupleId",
                 type,
                 title,
                 body,
                 icon_name AS "iconName",
                 icon_color AS "iconColor",
                 icon_bg AS "iconBg",
                 action_label AS "actionLabel",
                 metadata,
                 read_at AS "readAt",
                 created_at AS "createdAt"
          FROM in_app_notifications
          WHERE user_id = ${userId}
          ORDER BY created_at DESC
          LIMIT ${limit} OFFSET ${offset}
        `;

    return { items: rows.map(fromInAppNotificationRow), total };
  }

  async getNotificationForUser(userId: string, notificationId: string): Promise<InAppNotification | undefined> {
    const rows = await this.sql<InAppNotificationRow[]>`
      SELECT id,
             user_id AS "userId",
             couple_id AS "coupleId",
             type,
             title,
             body,
             icon_name AS "iconName",
             icon_color AS "iconColor",
             icon_bg AS "iconBg",
             action_label AS "actionLabel",
             metadata,
             read_at AS "readAt",
             created_at AS "createdAt"
      FROM in_app_notifications
      WHERE id = ${notificationId} AND user_id = ${userId}
      LIMIT 1
    `;
    return rows[0] ? fromInAppNotificationRow(rows[0]) : undefined;
  }

  async createInAppNotification(
    input: Omit<InAppNotification, "id" | "createdAt"> & { id?: string },
  ): Promise<InAppNotification> {
    const id = input.id ?? crypto.randomUUID();
    const metadata = input.metadata ?? {};
    await this.sql`
      INSERT INTO in_app_notifications (
        id,
        user_id,
        couple_id,
        type,
        title,
        body,
        icon_name,
        icon_color,
        icon_bg,
        action_label,
        metadata,
        read_at
      ) VALUES (
        ${id},
        ${input.userId},
        ${input.coupleId ?? null},
        ${input.type},
        ${input.title},
        ${input.body ?? null},
        ${input.iconName ?? null},
        ${input.iconColor ?? null},
        ${input.iconBg ?? null},
        ${input.actionLabel ?? null},
        ${JSON.stringify(metadata)}::jsonb,
        ${input.readAt ?? null}
      )
    `;
    const created = await this.getNotificationForUser(input.userId, id);
    if (!created) {
      throw new Error("Không thể tạo thông báo.");
    }
    return created;
  }

  async markNotificationRead(userId: string, notificationId: string): Promise<InAppNotification | undefined> {
    const rows = await this.sql<InAppNotificationRow[]>`
      UPDATE in_app_notifications
      SET read_at = COALESCE(read_at, NOW())
      WHERE id = ${notificationId} AND user_id = ${userId}
      RETURNING id,
                user_id AS "userId",
                couple_id AS "coupleId",
                type,
                title,
                body,
                icon_name AS "iconName",
                icon_color AS "iconColor",
                icon_bg AS "iconBg",
                action_label AS "actionLabel",
                metadata,
                read_at AS "readAt",
                created_at AS "createdAt"
    `;
    return rows[0] ? fromInAppNotificationRow(rows[0]) : undefined;
  }

  async markAllNotificationsRead(userId: string): Promise<number> {
    const rows = await this.sql<{ id: string }[]>`
      UPDATE in_app_notifications
      SET read_at = NOW()
      WHERE user_id = ${userId} AND read_at IS NULL
      RETURNING id
    `;
    return rows.length;
  }

  async updateExpoPushToken(userId: string, token: string | null): Promise<void> {
    await this.sql`
      UPDATE users
      SET expo_push_token = ${token},
          updated_at = NOW()
      WHERE id = ${userId}
    `;
  }
}

export function createPostgresStore(databaseUrl: string, redisUrl?: string, readDatabaseUrl?: string): PostgresStore {
  const sql = postgres(databaseUrl, {
    max: 10,
    transform: {
      undefined: null,
    },
    debug: (connection, query, params, types) => {
      console.log(`[SQL Query]`, query);
      if (params && params.length > 0) {
        console.log(`[SQL Params]`, params);
      }
    },
  });
  const readSql =
    readDatabaseUrl && readDatabaseUrl !== databaseUrl
      ? postgres(readDatabaseUrl, {
        max: 10,
        transform: {
          undefined: null,
        },
        debug: (connection, query, params, types) => {
          console.log(`[READ SQL Query]`, query);
          if (params && params.length > 0) {
            console.log(`[READ SQL Params]`, params);
          }
        },
      })
      : sql;

  const redis = redisUrl
    ? new Redis(redisUrl, {
      lazyConnect: true,
      maxRetriesPerRequest: 1,
      enableOfflineQueue: false,
      retryStrategy: () => null,
    })
    : undefined;
  if (redis) {
    redis.connect().catch((error) => {
      console.error("Kết nối Redis ban đầu thất bại. Hệ thống sẽ dùng luồng DB cho cache/session.", error);
    });
  }

  return new PostgresStore(sql, readSql, redis);
}
