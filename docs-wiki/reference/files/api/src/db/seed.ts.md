---
title: "api/src/db/seed.ts"
description: "seed db function to generate and save seeds for couples."
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
  page: "reference/files/api/src/db/seed.ts.md"
  relativePath: "api/src/db/seed.ts"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/api/src/db/seed.ts"
  module: "api/src/db"
  workspace: "api"
  language: "TypeScript"
  symbolCount: 16
---

# api/src/db/seed.ts

- Overview: [emplus Docs Wiki](../../../../../index.md)
- Summary: [SUMMARY](../../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../../features/index.md)
- Module: [api/src/db](../../../../modules/api/src/db.md)
- Workspace: [@emplus/api](../../../../../workspaces/api.md)

## Snapshot

- Language: TypeScript
- Source path: `/Users/truongdq/tx/GitHub/emplus/api/src/db/seed.ts`
- Lines: 642
- Symbols: 16

## Related Features

- [Notifications Notify](../../../../../features/notification-notify.md) - Notifications Notify captures the notify workflow inside notifications. It spans 2 workspaces.
- [Search Notify](../../../../../features/search-notify.md) - Search Notify captures the notify workflow inside search. It spans 2 workspaces.
- [Integrations Notify](../../../../../features/integration-notify.md) - Integrations Notify captures the notify workflow inside integrations. It spans 2 workspaces.
- [Search Create](../../../../../features/search-create.md) - Search Create captures the create workflow inside search. It spans 2 workspaces.
- [User Management Notify](../../../../../features/user-notify.md) - User Management Notify captures the notify workflow inside user management. It spans 2 workspaces.
- [Authentication Password Reset](../../../../../features/auth-reset.md) - Authentication Password Reset captures the password reset workflow inside authentication. It spans 3 workspaces. Key flows include Password reset, Password reset, Password reset.
- [Storage Notify](../../../../../features/storage-notify.md) - Storage Notify captures the notify workflow inside storage. It spans 2 workspaces.
- [User Management Create](../../../../../features/user-create.md) - User Management Create captures the create workflow inside user management. It spans 2 workspaces.
- [Administration Notify](../../../../../features/admin-notify.md) - Administration Notify captures the notify workflow inside administration. It spans 2 workspaces.
- [Order Management Notify](../../../../../features/order-notify.md) - Order Management Notify captures the notify workflow inside order management. It spans 2 workspaces.

## AI Summary

seed db function to generate and save seeds for couples.

### Usage Notes

- This function will generate and save 1000+ couple seeds into the database. Please note that this is a seed file and not intended to be modified or used in production.

## Symbols

### interface `SeedUser`

- Signature: `interface SeedUser`
- Lines: 7-14
- Exported: no

```ts
interface SeedUser {
  fullName: string;
  email: string;
  gender: "MALE" | "FEMALE";
  password: string;
  nickname?: string;
  dob?: string;
}
```

### interface `SeedMemoryTemplate`

- Signature: `interface SeedMemoryTemplate`
- Lines: 16-20
- Exported: no

```ts
interface SeedMemoryTemplate {
  title: string;
  description: string;
  tags: string[];
}
```

### interface `SeedMemory`

- Signature: `interface SeedMemory`
- Lines: 22-32
- Exported: no

```ts
interface SeedMemory {
  id: string;
  coupleId: string;
  createdById: string;
  title: string;
  description: string;
  memoryDate: string;
  mediaUrls: string[];
  tags: string[];
  createdAt: string;
}
```

### type `DbClient`

- Signature: `type DbClient = Sql;`
- Lines: 34-34
- Exported: no

```ts
type DbClient = Sql;
```

### function `toIsoDate`

- Signature: `function toIsoDate(date: Date): string`
- Lines: 105-107
- Exported: no

```ts
function toIsoDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}
```

### function `toNoonIso`

- Signature: `function toNoonIso(date: Date): string`
- Lines: 109-112
- Exported: no

```ts
function toNoonIso(date: Date): string {
  const atNoon = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), 12, 0, 0));
  return atNoon.toISOString();
}
```

### function `addUtcDays`

- Signature: `function addUtcDays(date: Date, days: number): Date`
- Lines: 114-118
- Exported: no

```ts
function addUtcDays(date: Date, days: number): Date {
  const next = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
  next.setUTCDate(next.getUTCDate() + days);
  return next;
}
```

### function `subtractUtcYearsSafe`

- Signature: `function subtractUtcYearsSafe(date: Date, years: number): Date`
- Lines: 120-131
- Exported: no

```ts
function subtractUtcYearsSafe(date: Date, years: number): Date {
  const y = date.getUTCFullYear() - years;
  const m = date.getUTCMonth();
  const d = date.getUTCDate();
  const candidate = new Date(Date.UTC(y, m, d));

  if (candidate.getUTCMonth() === m) {
    return candidate;
  }

  return new Date(Date.UTC(y, m + 1, 0));
}
```

### function `diffUtcDays`

- Signature: `function diffUtcDays(fromDate: Date, toDate: Date): number`
- Lines: 133-137
- Exported: no

```ts
function diffUtcDays(fromDate: Date, toDate: Date): number {
  const start = Date.UTC(fromDate.getUTCFullYear(), fromDate.getUTCMonth(), fromDate.getUTCDate());
  const end = Date.UTC(toDate.getUTCFullYear(), toDate.getUTCMonth(), toDate.getUTCDate());
  return Math.floor((end - start) / (24 * 60 * 60 * 1000));
}
```

### function `upsertUser`

- Signature: `async function upsertUser(sql: DbClient, input: SeedUser): Promise<string>`
- Lines: 139-244
- Exported: no

```ts
async function upsertUser(sql: DbClient, input: SeedUser): Promise<string> {
  const normalizedEmail = input.email.trim().toLowerCase();
  const nextAuthId = normalizedEmail;
  const nextPasswordHash = hashPassword(input.password);
  const matches = await sql<
    {
      id: string;
      email: string;
      authProvider: "LOCAL" | "GOOGLE" | "APPLE";
      authId: string;
    }[]
  >`
    SELECT id,
           email,
           auth_provider AS "authProvider",
           auth_id AS "authId"
    FROM users
    WHERE (auth_provider = ${"LOCAL"} AND auth_id = ${nextAuthId})
       OR LOWER(email) = LOWER(${normalizedEmail})
    ORDER BY
      CASE WHEN auth_provider = ${"LOCAL"} AND auth_id = ${nextAuthId} THEN 0 ELSE 1 END,
      created_at ASC
  `;

  const authMatch = matches.find((row) => row.authProvider === "LOCAL" && row.authId === nextAuthId);
  const emailMatch = matches.find((row) => row.email.trim().toLowerCase() === normalizedEmail);
  const targetId = authMatch?.id ?? emailMatch?.id;

  if (targetId) {
    const canUpdateEmail = !emailMatch || emailMatch.id === targetId;

    if (canUpdateEmail) {
      const rows = await sql<{ id: string }[]>`
        UPDATE users
        SET email = ${normalizedEmail},
            full_name = ${input.fullName},
            nickname = ${input.nickname ?? null},
            dob = ${input.dob ?? null},
            gender = ${input.gender},
            auth_provider = ${"LOCAL"},
            auth_id = ${nextAuthId},
            password_hash = ${nextPasswordHash},
            timezone = ${"Asia/Ho_Chi_Minh"},
            is_active = true,
            updated_at = NOW()
        WHERE id = ${targetId}
        RETURNING id
      `;

      return rows[0].id;
    }

    const rows = await sql<{ id: string }[]>`
      UPDATE users
      SET full_name = ${input.fullName},
          nickname = ${input.nickname ?? null},
          dob = ${input.dob ?? null},
          gender = ${input.gender},
          auth_provider = ${"LOCAL"},
          auth_id = ${nextAuthId},
          password_hash = ${nextPasswordHash},
          timezone = ${"Asia/Ho_Chi_Minh"},
          is_active = true,
          updated_at = NOW()
      WHERE id = ${targetId}
      RETURNING id
    `;

    return rows[0].id;
  }

  const inserted = await sql<{ id: string }[]>`
    INSERT INTO users (
      id,
      email,
      full_name,
      nickname,
      dob,
      gender,
      auth_provider,
      auth_id,
      password_hash,
      timezone,
      is_active,
      created_at,
      updated_at
    ) VALUES (
      ${crypto.randomUUID()},
      ${normalizedEmail},
      ${input.fullName},
      ${input.nickname ?? null},
      ${input.dob ?? null},
      ${input.gender},
      ${"LOCAL"},
      ${nextAuthId},
      ${nextPasswordHash},
      ${"Asia/Ho_Chi_Minh"},
      true,
      NOW(),
      NOW()
    )
    RETURNING id
  `;

  return inserted[0].id;
}
```

### function `ensureCouple`

- Signature: `async function ensureCouple( sql: DbClient, partner1Id: string, partner2Id: string, loveStartDate: string, ): Promise<string>`
- Lines: 246-311
- Exported: no

```ts
async function ensureCouple(
  sql: DbClient,
  partner1Id: string,
  partner2Id: string,
  loveStartDate: string,
): Promise<string> {
  const existing = await sql<{ id: string }[]>`
    SELECT id
    FROM couples
    WHERE (partner_1_id = ${partner1Id} AND partner_2_id = ${partner2Id})
       OR (partner_1_id = ${partner2Id} AND partner_2_id = ${partner1Id})
    LIMIT 1
  `;

  const settings = {
    shared_theme: "light",
    relationship_story: "5_nam_hanh_phuc",
    love_languages: ["loi-noi-khich-le", "thoi-gian-chat-luong", "hanh-dong-quan-tam"],
    favorite_places: ["Da Lat", "Vung Tau", "Nha Sach", "Quan ca phe cuoi hem"],
    plans_this_year: ["Ky niem 5 nam", "Chuyen di bien 4 ngay", "Hoc mon moi cung nhau"],
  };

  if (existing[0]) {
    const coupleId = existing[0].id;

    await sql`
      UPDATE couples
      SET partner_1_id = ${partner1Id},
          partner_2_id = ${partner2Id},
          status = 'DANG_YEU',
          love_start_date = ${loveStartDate},
          wedding_date = NULL,
          invite_code = NULL,
          invite_expires_at = NULL,
          settings = ${JSON.stringify(settings)}::jsonb
      WHERE id = ${coupleId}
    `;

    return coupleId;
  }

  const inserted = await sql<{ id: string }[]>`
    INSERT INTO couples (
      id,
      partner_1_id,
      partner_2_id,
      love_start_date,
      wedding_date,
      status,
      settings,
      created_at
    ) VALUES (
      ${crypto.randomUUID()},
      ${partner1Id},
      ${partner2Id},
      ${loveStartDate},
      NULL,
      ${"DANG_YEU"},
      ${JSON.stringify(settings)}::jsonb,
      NOW()
    )
    RETURNING id
  `;

  return inserted[0].id;
}
```

### function `buildHappyMemories`

- Signature: `function buildHappyMemories( coupleId: string, maleId: string, femaleId: string, loveStart: Date, today: Date, ): SeedMemory[]`
- Lines: 313-421
- Exported: no

```ts
function buildHappyMemories(
  coupleId: string,
  maleId: string,
  femaleId: string,
  loveStart: Date,
  today: Date,
): SeedMemory[] {
  const daysTogether = diffUtcDays(loveStart, today) + 1;
  const maxOffset = Math.max(0, daysTogether - 1);

  const highlightOffsets = [
    0,
    6,
    14,
    30,
    60,
    100,
    180,
    270,
    365,
    500,
    730,
    900,
    1095,
    1300,
    1460,
    1600,
    maxOffset,
  ].filter((value, index, arr) => value <= maxOffset && arr.indexOf(value) === index);

  const highlightTitles = [
    "Ngày đầu hẹn hò",
    "Buổi xem phim đầu tiên",
    "Lần đầu nắm tay giữa phố",
    "Tròn 1 tháng yêu nhau",
    "Chuyến đi ngắn đầu tiên",
    "Kỷ niệm 100 ngày",
    "Đi biển cùng nhau",
    "Buổi tối ngắm thành phố",
    "Kỷ niệm 1 năm yêu",
    "Kỷ niệm 500 ngày yêu",
    "Kỷ niệm 2 năm yêu",
    "Mỗi ngày đều là một dịp đặc biệt",
    "Kỷ niệm 3 năm yêu",
    "Cùng nhau vượt qua một giai đoạn bận rộn",
    "Kỷ niệm 4 năm yêu",
    "Bắt đầu chuẩn bị cho cột mốc 5 năm",
    "Kỷ niệm tròn 5 năm yêu",
  ];

  const created: SeedMemory[] = [];
  const seenKey = new Set<string>();

  for (let i = 0; i < highlightOffsets.length; i += 1) {
    const offset = highlightOffsets[i];
    const date = addUtcDays(loveStart, offset);
    const title = highlightTitles[Math.min(i, highlightTitles.length - 1)];
    const key = `${toIsoDate(date)}|${title}`;
    if (seenKey.has(key)) {
      continue;
    }

    seenKey.add(key);
    const author = i % 2 === 0 ? maleId : femaleId;

    created.push({
      id: crypto.randomUUID(),
      coupleId,
      createdById: author,
      title,
      description: "Một cột mốc đáng nhớ, cả hai đều chọn ở cạnh nhau bằng sự dịu dàng và kiên định.",
      memoryDate: toIsoDate(date),
      mediaUrls: [],
      tags: ["cot-moc", "hanh-phuc", SEED_TAG],
      createdAt: toNoonIso(date),
    });
  }

  let index = 0;
  let cursor = addUtcDays(loveStart, 10);

  while (cursor <= today) {
    const template = MEMORY_TEMPLATES[index % MEMORY_TEMPLATES.length];
    const author = index % 2 === 0 ? maleId : femaleId;
    const dateIso = toIsoDate(cursor);
    const key = `${dateIso}|${template.title}`;

    if (!seenKey.has(key)) {
      seenKey.add(key);
      created.push({
        id: crypto.randomUUID(),
        coupleId,
        createdById: author,
        title: template.title,
        description: template.description,
        memoryDate: dateIso,
        mediaUrls: [],
        tags: [...template.tags, SEED_TAG],
        createdAt: toNoonIso(cursor),
      });
    }

    const jump = 21 + ((index * 7) % 16);
    cursor = addUtcDays(cursor, jump);
    index += 1;
  }

  return created.sort((a, b) => a.memoryDate.localeCompare(b.memoryDate));
}
```

### function `reseedMemories`

- Signature: `async function reseedMemories( sql: DbClient, coupleId: string, maleId: string, femaleId: string, loveStart: Date, today: Date, ): Promise<number>`
- Lines: 423-471
- Exported: no

```ts
async function reseedMemories(
  sql: DbClient,
  coupleId: string,
  maleId: string,
  femaleId: string,
  loveStart: Date,
  today: Date,
): Promise<number> {
  const rows = buildHappyMemories(coupleId, maleId, femaleId, loveStart, today);

  await sql`
    DELETE FROM memories
    WHERE id IN (${LEGACY_MEMORY_IDS[0]}, ${LEGACY_MEMORY_IDS[1]})
  `;

  await sql`
    DELETE FROM memories
    WHERE couple_id = ${coupleId}
      AND ${SEED_TAG} = ANY(tags)
  `;

  for (const memory of rows) {
    await sql`
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
        ${memory.description},
        ${memory.memoryDate},
        ${JSON.stringify(memory.mediaUrls)}::jsonb,
        ${memory.tags},
        ${memory.createdAt}
      )
    `;
  }

  return rows.length;
}
```

### function `reseedBudget`

- Signature: `async function reseedBudget( sql: DbClient, coupleId: string, maleId: string, todayStr: string, yesterdayStr: string, pastStr: string ): Promise<number>`
- Lines: 473-503
- Exported: no

```ts
async function reseedBudget(
  sql: DbClient,
  coupleId: string,
  maleId: string,
  todayStr: string,
  yesterdayStr: string,
  pastStr: string
): Promise<number> {
  const budgetItems = [
    { title: "Đặt cọc địa điểm", amount: 5000, category: "venue", status: "PAID", date: todayStr, place: "The Grand Hall" },
    { title: "Tiền cọc ăn uống", amount: 3200, category: "catering", status: "PENDING", date: todayStr, place: "Savor Co." },
    { title: "Thử váy cưới", amount: 850, category: "clothing", status: "PAID", date: yesterdayStr, place: "Bridal Boutique" },
    { title: "Phát sinh hoa tươi", amount: 1200, category: "other", status: "OVER_BUDGET", date: yesterdayStr, place: "Lily Flower" },
    { title: "Đặt cọc DJ", amount: 500, category: "music", status: "DRAFT", date: pastStr, place: "Soundwave" },
    { title: "Thợ chụp ảnh", amount: 3500, category: "photo", status: "PENDING", date: pastStr, place: "Lens & Light" },
  ];

  await sql`DELETE FROM budget_items WHERE couple_id = ${coupleId}`;

  for (const b of budgetItems) {
    await sql`
      INSERT INTO budget_items (
        id, couple_id, created_by_id, title, amount, category, date, place, status, created_at
      ) VALUES (
        ${crypto.randomUUID()}, ${coupleId}, ${maleId}, ${b.title}, ${b.amount}, ${b.category}, ${b.date}, ${b.place}, ${b.status}, NOW()
      )
    `;
  }

  return budgetItems.length;
}
```

### function `upsertCycle`

- Signature: `async function upsertCycle(sql: DbClient, femaleUserId: string, cycleStartDate: string): Promise<void>`
- Lines: 505-535
- Exported: no

```ts
async function upsertCycle(sql: DbClient, femaleUserId: string, cycleStartDate: string): Promise<void> {
  await sql`
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
      ${crypto.randomUUID()},
      ${femaleUserId},
      ${cycleStartDate},
      28,
      5,
      ${JSON.stringify(["ngu-ngon", "tam-trang-on-dinh", "nang-luong-tot"])}::jsonb,
      true,
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
```

### function `run`

- Signature: `async function run(): Promise<void>`
- Lines: 537-636
- Exported: no

```ts
async function run(): Promise<void> {
  if (!env.databaseUrl) {
    throw new Error("Thiếu DATABASE_URL nên không thể chạy seed.");
  }

  const sql = postgres(env.databaseUrl, { max: 1 });

  try {
    const today = new Date();
    const todayUtc = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate()));
    const loveStart = subtractUtcYearsSafe(todayUtc, 5);
    const loveStartDate = toIsoDate(loveStart);
    const cycleStartDate = toIsoDate(addUtcDays(todayUtc, -13));

    const maleId = await upsertUser(sql, {
      fullName: "Nguyen Quang Minh",
      email: "seed.minh@emplus.local",
      gender: "MALE",
      password: "Seed@123456",
      nickname: "Minh",
      dob: "1997-04-18",
    });

    const femaleId = await upsertUser(sql, {
      fullName: "Tran Ngoc Anh",
      email: "seed.ngoc@emplus.local",
      gender: "FEMALE",
      password: "Seed@123456",
      nickname: "Ngoc",
      dob: "1998-09-27",
    });

    const coupleId = await ensureCouple(sql, maleId, femaleId, loveStartDate);
    const seededMemoryCount = await reseedMemories(sql, coupleId, maleId, femaleId, loveStart, todayUtc);

    const yesterdayUtc = addUtcDays(todayUtc, -1);
    const pastUtc = addUtcDays(todayUtc, -5);
    const seededBudgetCount = await reseedBudget(
      sql,
      coupleId,
      maleId,
      toIsoDate(todayUtc),
      toIsoDate(yesterdayUtc),
      toIsoDate(pastUtc)
    );

    await upsertCycle(sql, femaleId, cycleStartDate);

    // Seed admin account (upsert)
    await sql`
      INSERT INTO users (
        id,
        email,
        full_name,
        nickname,
        dob,
        gender,
        auth_provider,
        auth_id,
        password_hash,
        timezone,
        is_active,
        is_admin,
        created_at,
        updated_at
      ) VALUES (
        ${crypto.randomUUID()},
        ${"admin@emplus.local"},
        ${"Admin User"},
        ${"Admin"},
        ${null},
        ${"MALE"},
        ${"LOCAL"},
        ${"admin@emplus.local"},
        ${hashPassword("Admin@123456")},
        ${"Asia/Ho_Chi_Minh"},
        true,
        true,
        NOW(),
        NOW()
      )
      ON CONFLICT (email) DO UPDATE SET
        full_name = EXCLUDED.full_name,
        is_admin = EXCLUDED.is_admin,
        updated_at = NOW()
    `;

    console.log("Seed hoàn tất.");
    console.log(`Cặp đôi: ${coupleId}`);
    console.log(`Bắt đầu yêu: ${loveStartDate} (đúng mốc 5 năm tính đến hôm nay).`);
    console.log(`Đã seed ${seededMemoryCount} kỷ niệm happy-case.`);
    console.log(`Đã seed ${seededBudgetCount} hạng mục ngân sách.`);
    console.log("Tài khoản mẫu:");
    console.log("- seed.minh@emplus.local / Seed@123456");
    console.log("- seed.ngoc@emplus.local / Seed@123456");
    console.log("- admin@emplus.local / Admin@123456 (admin)");
  } finally {
    await sql.end({ timeout: 5 });
  }
}
```
