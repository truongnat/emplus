---
title: "api/src/db/seed-custom.ts"
description: "Seeds custom user accounts with hardcoded credentials."
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
  page: "reference/files/api/src/db/seed-custom.ts.md"
  relativePath: "api/src/db/seed-custom.ts"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/api/src/db/seed-custom.ts"
  module: "api/src/db"
  workspace: "api"
  language: "TypeScript"
  symbolCount: 1
---

# api/src/db/seed-custom.ts

- Overview: [emplus Docs Wiki](../../../../../index.md)
- Summary: [SUMMARY](../../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../../features/index.md)
- Module: [api/src/db](../../../../modules/api/src/db.md)
- Workspace: [@emplus/api](../../../../../workspaces/api.md)

## Snapshot

- Language: TypeScript
- Source path: `/Users/truongdq/tx/GitHub/emplus/api/src/db/seed-custom.ts`
- Lines: 92
- Symbols: 1

## Related Features

- [Authentication Password Reset](../../../../../features/auth-reset.md) - Authentication Password Reset captures the password reset workflow inside authentication. It spans 3 workspaces. Key flows include Password reset, Password reset, Password reset.

## AI Summary

Seeds custom user accounts with hardcoded credentials.

## Symbols

### function `run`

- Signature: `async function run()`
- Lines: 5-89
- Exported: no
- Summary: async function run()

```ts
async function run() {
    if (!env.databaseUrl) {
        console.error("Missing DATABASE_URL");
        process.exit(1);
    }

    const sql = postgres(env.databaseUrl, { max: 1 });

    try {
        console.log("Seeding custom users...");

        // 1. Create or Update User 1
        const user1Email = "truongdq.dev@gmail.com";
        const user1Password = "12345678";
        const user1Hash = hashPassword(user1Password);

        const [user1] = await sql`
      INSERT INTO users (
        id, email, full_name, nickname, gender, auth_provider, auth_id, password_hash, is_active
      ) VALUES (
        ${crypto.randomUUID()}, ${user1Email}, 'Truong DQ', 'Truong', 'NAM', 'LOCAL', ${user1Email}, ${user1Hash}, true
      )
      ON CONFLICT (email) DO UPDATE SET
        password_hash = EXCLUDED.password_hash,
        gender = 'NAM',
        is_active = true
      RETURNING id
    `;

        // 2. Create or Update User 2
        const user2Email = "ptttrang2k@gmail.com";
        const user2Password = "12345678";
        const user2Hash = hashPassword(user2Password);

        const [user2] = await sql`
      INSERT INTO users (
        id, email, full_name, nickname, gender, auth_provider, auth_id, password_hash, is_active
      ) VALUES (
        ${crypto.randomUUID()}, ${user2Email}, 'Trang PTT', 'Trang', 'NU', 'LOCAL', ${user2Email}, ${user2Hash}, true
      )
      ON CONFLICT (email) DO UPDATE SET
        password_hash = EXCLUDED.password_hash,
        gender = 'NU',
        is_active = true
      RETURNING id
    `;

        console.log(`Users logic done: ${user1.id}, ${user2.id}`);

        // 3. Ensure Couple
        const [existingCouple] = await sql`
      SELECT id FROM couples 
      WHERE (partner_1_id = ${user1.id} AND partner_2_id = ${user2.id})
         OR (partner_1_id = ${user2.id} AND partner_2_id = ${user1.id})
    `;

        let coupleId;
        if (existingCouple) {
            coupleId = existingCouple.id;
            await sql`
        UPDATE couples SET status = 'DANG_YEU', love_start_date = NOW() - INTERVAL '1 year'
        WHERE id = ${coupleId}
      `;
        } else {
            coupleId = crypto.randomUUID();
            await sql`
        INSERT INTO couples (
          id, partner_1_id, partner_2_id, status, love_start_date
        ) VALUES (
          ${coupleId}, ${user1.id}, ${user2.id}, 'DANG_YEU', NOW() - INTERVAL '1 year'
        )
      `;
        }

        console.log(`Pairing complete: Couple ID ${coupleId}`);
        console.log(`Email 1: ${user1Email} / 12345678`);
        console.log(`Email 2: ${user2Email} / 12345678`);

    } catch (error) {
        console.error("Seed failed:", error);
        process.exit(1);
    } finally {
        await sql.end();
    }
}
```
