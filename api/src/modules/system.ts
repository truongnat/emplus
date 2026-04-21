import { Hono } from "hono";
import type { AppEnv } from "../app-env.ts";
import { env } from "../config/env.ts";
import { getDependencyReport } from "../services/dependencies.ts";
import { dispatchCoreReminders } from "../services/reminder.service.ts";
import { success } from "../utils/http.ts";
import { displayDependencyStatus } from "../utils/presentation.ts";
import { requireAuth } from "../middleware/auth.ts";
import { isEncryptionEnabled } from "../services/crypto.ts";

export const systemRoutes = new Hono<AppEnv>();

// Protect system endpoints with authentication
systemRoutes.use("/*", requireAuth);

systemRoutes.get("/dependencies", async (context) => {
  const dependencies = await getDependencyReport();
  const hasDownService = Object.values(dependencies).some((entry) => entry.status === "down");
  const dependenciesDisplay = {
    database: {
      ...dependencies.database,
      status: displayDependencyStatus(dependencies.database.status),
    },
    readDatabase: {
      ...dependencies.readDatabase,
      status: displayDependencyStatus(dependencies.readDatabase.status),
    },
    redis: {
      ...dependencies.redis,
      status: displayDependencyStatus(dependencies.redis.status),
    },
    mail: {
      ...dependencies.mail,
      status: displayDependencyStatus(dependencies.mail.status),
    },
    minio: {
      ...dependencies.minio,
      status: displayDependencyStatus(dependencies.minio.status),
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
        encryptionEnabled: isEncryptionEnabled(),
      },
      dependencies: dependenciesDisplay,
    },
    hasDownService ? 503 : 200,
  );
});

systemRoutes.post("/dispatch-reminders", async (context) => {
  const result = await dispatchCoreReminders();
  return success(context, result);
});
