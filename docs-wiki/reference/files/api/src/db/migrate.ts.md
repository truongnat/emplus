---
title: "api/src/db/migrate.ts"
description: "A migration configuration system for PostgreSQL."
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
  page: "reference/files/api/src/db/migrate.ts.md"
  relativePath: "api/src/db/migrate.ts"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/api/src/db/migrate.ts"
  module: "api/src/db"
  workspace: "api"
  language: "TypeScript"
  symbolCount: 9
---

# api/src/db/migrate.ts

- Overview: [emplus Docs Wiki](../../../../../index.md)
- Summary: [SUMMARY](../../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../../features/index.md)
- Module: [api/src/db](../../../../modules/api/src/db.md)
- Workspace: [@emplus/api](../../../../../workspaces/api.md)

## Snapshot

- Language: TypeScript
- Source path: `/Users/truongdq/tx/GitHub/emplus/api/src/db/migrate.ts`
- Lines: 147
- Symbols: 9

## Related Features

- [Authentication Read / List](../../../../../features/auth-list.md) - Authentication Read / List captures the read / list workflow inside authentication. It spans 3 workspaces.
- [Search Read / List](../../../../../features/search-list.md) - Search Read / List captures the read / list workflow inside search. It spans 3 workspaces.
- [Notifications Read / List](../../../../../features/notification-list.md) - Notifications Read / List captures the read / list workflow inside notifications. It spans 2 workspaces.
- [Storage Read / List](../../../../../features/storage-list.md) - Storage Read / List captures the read / list workflow inside storage. It spans 4 workspaces.
- [Integrations Read / List](../../../../../features/integration-list.md) - Integrations Read / List captures the read / list workflow inside integrations. It spans 3 workspaces.
- [User Management Read / List](../../../../../features/user-list.md) - User Management Read / List captures the read / list workflow inside user management. It spans 3 workspaces.
- [Reporting Read / List](../../../../../features/reporting-list.md) - Reporting Read / List captures the read / list workflow inside reporting. It spans 2 workspaces.
- [Administration Read / List](../../../../../features/admin-list.md) - Administration Read / List captures the read / list workflow inside administration. It spans 2 workspaces.
- [Order Management Read / List](../../../../../features/order-list.md) - Order Management Read / List captures the read / list workflow inside order management. It spans 2 workspaces.

## AI Summary

A migration configuration system for PostgreSQL.

## Symbols

### interface `MigrationFile`

- Signature: `interface MigrationFile`
- Lines: 8-12
- Exported: no

```ts
interface MigrationFile {
  name: string;
  sql: string;
  checksum: string;
}
```

### interface `MigrationRow`

- Signature: `interface MigrationRow`
- Lines: 14-18
- Exported: no

```ts
interface MigrationRow {
  name: string;
  checksum: string;
  appliedAt: string | Date;
}
```

### function `checksum`

- Signature: `function checksum(content: string): string`
- Lines: 24-26
- Exported: no
- Summary: Compute a checksum for SQL code.

```ts
function checksum(content: string): string {
  return createHash("sha256").update(content).digest("hex");
}
```

### function `readMigrations`

- Signature: `function readMigrations(): MigrationFile[]`
- Lines: 28-42
- Exported: no
- Summary: Read and apply migrations.

```ts
function readMigrations(): MigrationFile[] {
  const files = readdirSync(migrationDir, { withFileTypes: true })
    .filter((entry) => entry.isFile() && entry.name.endsWith(".sql"))
    .map((entry) => entry.name)
    .sort((left, right) => left.localeCompare(right));

  return files.map((name) => {
    const sql = readFileSync(join(migrationDir, name), "utf8");
    return {
      name,
      sql,
      checksum: checksum(sql),
    };
  });
}
```

### function `ensureMigrationsTable`

- Signature: `async function ensureMigrationsTable(sql: postgres.Sql): Promise<void>`
- Lines: 44-53
- Exported: no
- Summary: Ensure the database table for migrations exists.

```ts
async function ensureMigrationsTable(sql: postgres.Sql): Promise<void> {
  await sql`
    CREATE TABLE IF NOT EXISTS schema_migrations (
      id BIGSERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL UNIQUE,
      checksum VARCHAR(64) NOT NULL,
      applied_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;
}
```

### function `readAppliedMigrations`

- Signature: `async function readAppliedMigrations(sql: postgres.Sql): Promise<Map<string, MigrationRow>>`
- Lines: 55-66
- Exported: no
- Summary: Read the applied migrations.

```ts
async function readAppliedMigrations(sql: postgres.Sql): Promise<Map<string, MigrationRow>> {
  const rows = await sql<MigrationRow[]>`
    SELECT
      name,
      checksum,
      applied_at AS "appliedAt"
    FROM schema_migrations
    ORDER BY name ASC
  `;

  return new Map(rows.map((row) => [row.name, row]));
}
```

### function `applyMigration`

- Signature: `async function applyMigration(sql: postgres.Sql, migration: MigrationFile): Promise<void>`
- Lines: 68-76
- Exported: no
- Summary: Apply a migration.

```ts
async function applyMigration(sql: postgres.Sql, migration: MigrationFile): Promise<void> {
  await sql.begin(async (transaction) => {
    await transaction.unsafe(migration.sql);
    await transaction.unsafe("INSERT INTO schema_migrations (name, checksum) VALUES ($1, $2)", [
      migration.name,
      migration.checksum,
    ]);
  });
}
```

### function `isStatusMode`

- Signature: `function isStatusMode(): boolean`
- Lines: 78-80
- Exported: no
- Summary: Check if the system is in status mode.

```ts
function isStatusMode(): boolean {
  return process.argv.slice(2).includes("--status");
}
```

### function `run`

- Signature: `async function run(): Promise<void>`
- Lines: 82-141
- Exported: no

```ts
async function run(): Promise<void> {
  if (!env.databaseUrl) {
    throw new Error("Thiếu DATABASE_URL nên không thể chạy migration.");
  }

  const migrations = readMigrations();
  if (migrations.length === 0) {
    throw new Error("Không tìm thấy file migration SQL nào trong thư mục migrations.");
  }

  const sql = postgres(env.databaseUrl, { max: 1 });

  try {
    await ensureMigrationsTable(sql);
    const applied = await readAppliedMigrations(sql);
    const statusMode = isStatusMode();

    let appliedCount = 0;

    for (const migration of migrations) {
      const already = applied.get(migration.name);

      if (already) {
        if (already.checksum !== migration.checksum) {
          throw new Error(
            `Checksum migration không khớp: ${migration.name}.\n` +
              "Bạn đã sửa migration cũ sau khi áp dụng. Hãy tạo migration mới thay vì chỉnh file đã chạy.",
          );
        }

        if (statusMode) {
          const appliedAt = already.appliedAt instanceof Date ? already.appliedAt.toISOString() : String(already.appliedAt);
          console.log(`Đã áp dụng: ${migration.name} (${appliedAt})`);
        }

        continue;
      }

      if (statusMode) {
        console.log(`Chưa áp dụng: ${migration.name}`);
        continue;
      }

      console.log(`Đang áp dụng migration: ${migration.name}`);
      await applyMigration(sql, migration);
      appliedCount += 1;
      console.log(`Đã áp dụng xong: ${migration.name}`);
    }

    if (!statusMode) {
      if (appliedCount === 0) {
        console.log("Không có migration mới. CSDL đã ở trạng thái mới nhất.");
      } else {
        console.log(`Hoàn tất migration. Đã áp dụng ${appliedCount} migration mới.`);
      }
    }
  } finally {
    await sql.end({ timeout: 5 });
  }
}
```
