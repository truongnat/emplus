import * as Minio from "minio";
import { env } from "../config/env.ts";

let client: Minio.Client | null = null;

function parseEndpoint(raw: string): {
  endPoint: string;
  port: number;
  useSSL: boolean;
} {
  const u = new URL(raw);
  const useSSL = u.protocol === "https:";
  const defaultPort = useSSL ? 443 : 80;
  const port = u.port ? Number(u.port) : defaultPort;
  return { endPoint: u.hostname, port, useSSL };
}

export function isMediaUploadEnabled(): boolean {
  return Boolean(
    env.minioEndpoint?.trim() &&
      env.minioAccessKey?.trim() &&
      env.minioSecretKey?.trim(),
  );
}

function getClient(): Minio.Client {
  if (!isMediaUploadEnabled()) {
    throw new Error("MinIO chưa được cấu hình.");
  }
  if (!client) {
    const { endPoint, port, useSSL } = parseEndpoint(env.minioEndpoint!.trim());
    client = new Minio.Client({
      endPoint,
      port,
      useSSL,
      accessKey: env.minioAccessKey!,
      secretKey: env.minioSecretKey!,
      region: env.minioRegion,
    });
  }
  return client;
}

/** Base URL không có dấu / cuối — client (app) dùng để tải ảnh (bucket public read). */
export function getMinioPublicBaseUrl(): string {
  const raw =
    env.minioPublicBaseUrl?.trim() || env.minioEndpoint?.trim() || "";
  if (!raw) {
    throw new Error("MINIO_ENDPOINT hoặc MINIO_PUBLIC_BASE_URL bắt buộc khi upload.");
  }
  return new URL(raw).origin.replace(/\/$/, "");
}

export function buildPublicObjectUrl(objectKey: string): string {
  const base = getMinioPublicBaseUrl();
  return `${base}/${env.minioBucket}/${objectKey}`;
}

const MAX_BYTES = 10 * 1024 * 1024;

export async function putTimelineObject(
  objectKey: string,
  buffer: Buffer,
  contentType: string,
): Promise<void> {
  if (buffer.length > MAX_BYTES) {
    throw new Error("FILE_TOO_LARGE");
  }
  const c = getClient();
  await c.putObject(env.minioBucket, objectKey, buffer, buffer.length, {
    "Content-Type": contentType,
  });
}
