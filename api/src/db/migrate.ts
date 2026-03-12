import { createHash } from "node:crypto";
import { readdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import postgres from "postgres";
import { env } from "../config/env.ts";

interface MigrationFile {
  name: string;
  sql: string;
  checksum: string;
}

interface MigrationRow {
  name: string;
  checksum: string;
  appliedAt: string | Date;
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const migrationDir = join(__dirname, "migrations");

function checksum(content: string): string {
  return createHash("sha256").update(content).digest("hex");
}

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

async function applyMigration(sql: postgres.Sql, migration: MigrationFile): Promise<void> {
  await sql.begin(async (transaction) => {
    await transaction.unsafe(migration.sql);
    await transaction.unsafe("INSERT INTO schema_migrations (name, checksum) VALUES ($1, $2)", [
      migration.name,
      migration.checksum,
    ]);
  });
}

function isStatusMode(): boolean {
  return process.argv.slice(2).includes("--status");
}

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

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
