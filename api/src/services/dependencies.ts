import { createConnection } from "node:net";
import Redis from "ioredis";
import postgres from "postgres";
import { env } from "../config/env.ts";

export type DependencyStatus = "up" | "down" | "skipped";

export interface DependencyHealth {
  status: DependencyStatus;
  latencyMs?: number;
  details?: string;
}

export interface DependencyReport {
  database: DependencyHealth;
  readDatabase: DependencyHealth;
  redis: DependencyHealth;
  mail: DependencyHealth;
  minio: DependencyHealth;
}

function elapsedMs(start: number): number {
  return Number((performance.now() - start).toFixed(2));
}

function normalizeHttpEndpoint(input: string, forceSsl: boolean): string {
  const trimmed = input.trim();
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
    return trimmed.replace(/\/+$/, "");
  }

  const protocol = forceSsl ? "https" : "http";
  return `${protocol}://${trimmed}`.replace(/\/+$/, "");
}

async function checkDatabase(url: string | undefined, name: string): Promise<DependencyHealth> {
  if (!url) {
    return {
      status: "skipped",
      details: `Chưa cấu hình URL cho ${name}.`,
    };
  }

  const sql = postgres(url, { max: 1, connect_timeout: 3 });
  const start = performance.now();

  try {
    await sql`SELECT 1`;
    return {
      status: "up",
      latencyMs: elapsedMs(start),
    };
  } catch (error) {
    return {
      status: "down",
      latencyMs: elapsedMs(start),
      details: error instanceof Error ? error.message : "Lỗi không xác định khi kết nối cơ sở dữ liệu.",
    };
  } finally {
    await sql.end({ timeout: 1 }).catch(() => undefined);
  }
}

async function checkRedis(url: string | undefined): Promise<DependencyHealth> {
  if (!url) {
    return {
      status: "skipped",
      details: "Chưa cấu hình REDIS_URL.",
    };
  }

  const client = new Redis(url, {
    lazyConnect: true,
    maxRetriesPerRequest: 1,
    enableOfflineQueue: false,
    retryStrategy: () => null,
    connectTimeout: 3000,
  });

  const start = performance.now();

  try {
    await client.connect();
    await client.ping();
    return {
      status: "up",
      latencyMs: elapsedMs(start),
    };
  } catch (error) {
    return {
      status: "down",
      latencyMs: elapsedMs(start),
      details: error instanceof Error ? error.message : "Lỗi không xác định khi kết nối Redis.",
    };
  } finally {
    client.disconnect();
  }
}

async function checkMail(host: string, port: number): Promise<DependencyHealth> {
  const start = performance.now();

  return await new Promise<DependencyHealth>((resolve) => {
    const socket = createConnection({ host, port });
    socket.setTimeout(3000);

    const complete = (result: DependencyHealth): void => {
      socket.removeAllListeners();
      socket.end();
      resolve(result);
    };

    socket.once("connect", () => {
      complete({
        status: "up",
        latencyMs: elapsedMs(start),
      });
    });

    socket.once("timeout", () => {
      complete({
        status: "down",
        latencyMs: elapsedMs(start),
        details: `Kết nối SMTP ${host}:${port} bị quá thời gian chờ.`,
      });
    });

    socket.once("error", (error) => {
      complete({
        status: "down",
        latencyMs: elapsedMs(start),
        details: error.message,
      });
    });
  });
}

async function checkMinio(endpoint: string | undefined, useSsl: boolean): Promise<DependencyHealth> {
  if (!endpoint) {
    return {
      status: "skipped",
      details: "Chưa cấu hình MINIO_ENDPOINT.",
    };
  }

  const normalizedEndpoint = normalizeHttpEndpoint(endpoint, useSsl);
  const start = performance.now();

  try {
    const response = await fetch(`${normalizedEndpoint}/minio/health/live`, { method: "GET" });

    if (!response.ok) {
      return {
        status: "down",
        latencyMs: elapsedMs(start),
        details: `MinIO trả về mã kiểm tra sức khỏe ${response.status}.`,
      };
    }

    return {
      status: "up",
      latencyMs: elapsedMs(start),
    };
  } catch (error) {
    return {
      status: "down",
      latencyMs: elapsedMs(start),
      details: error instanceof Error ? error.message : "Lỗi không xác định khi kết nối MinIO.",
    };
  }
}

export async function getDependencyReport(): Promise<DependencyReport> {
  const [database, readDatabase, redis, mail, minio] = await Promise.all([
    checkDatabase(env.databaseUrl, "DATABASE_URL"),
    env.readDatabaseUrl && env.readDatabaseUrl !== env.databaseUrl
      ? checkDatabase(env.readDatabaseUrl, "READ_DATABASE_URL")
      : Promise.resolve<DependencyHealth>({
          status: "skipped",
          details: env.readDatabaseUrl
            ? "READ_DATABASE_URL đang trỏ cùng máy chủ với cơ sở dữ liệu chính."
            : "Chưa cấu hình READ_DATABASE_URL.",
        }),
    checkRedis(env.redisUrl),
    checkMail(env.smtpHost, env.smtpPort),
    checkMinio(env.minioEndpoint, env.minioUseSsl),
  ]);

  return {
    database,
    readDatabase,
    redis,
    mail,
    minio,
  };
}
