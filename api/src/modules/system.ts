import { Hono } from "hono";
import type { AppEnv } from "../app-env.ts";
import { env } from "../config/env.ts";
import { getDependencyReport } from "../services/dependencies.ts";
import { success } from "../utils/http.ts";
import { hienThiTrangThaiPhuThuoc } from "../utils/presentation.ts";
import { requireAuth } from "../middleware/auth.ts";

export const systemRoutes = new Hono<AppEnv>();

// Protect system endpoints with authentication
systemRoutes.use("/*", requireAuth);

systemRoutes.get("/dependencies", async (context) => {
  const dependencies = await getDependencyReport();
  const hasDownService = Object.values(dependencies).some((entry) => entry.status === "down");
  const dependenciesHienThi = {
    database: {
      ...dependencies.database,
      status: hienThiTrangThaiPhuThuoc(dependencies.database.status),
    },
    readDatabase: {
      ...dependencies.readDatabase,
      status: hienThiTrangThaiPhuThuoc(dependencies.readDatabase.status),
    },
    redis: {
      ...dependencies.redis,
      status: hienThiTrangThaiPhuThuoc(dependencies.redis.status),
    },
    mail: {
      ...dependencies.mail,
      status: hienThiTrangThaiPhuThuoc(dependencies.mail.status),
    },
    minio: {
      ...dependencies.minio,
      status: hienThiTrangThaiPhuThuoc(dependencies.minio.status),
    },
  };

  return success(
    context,
    {
      environment: {
        nodeEnv: env.nodeEnv,
        storeMode: env.storeMode,
      },
      // Only expose config status (whether configured), not values
      config: {
        databaseConfigured: Boolean(env.databaseUrl),
        redisConfigured: Boolean(env.redisUrl),
        smtpConfigured: Boolean(env.smtpHost && env.smtpUser),
        minioConfigured: Boolean(env.minioEndpoint && env.minioAccessKey),
        swaggerEnabled: env.swaggerEnabled,
      },
      dependencies: dependenciesHienThi,
    },
    hasDownService ? 503 : 200,
  );
});
