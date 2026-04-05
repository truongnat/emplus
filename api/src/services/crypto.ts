/**
 * AES-256-GCM encryption/decryption for sensitive data at rest.
 *
 * - Production: encrypts with DATA_ENCRYPTION_KEY (32-byte hex or base64).
 * - Development: passthrough (plaintext) unless DATA_ENCRYPTION_KEY is set.
 *
 * Format: iv(12 bytes hex):authTag(16 bytes hex):ciphertext(hex)
 */

import { createCipheriv, createDecipheriv, randomBytes } from "node:crypto";

const ALGO = "aes-256-gcm";
const IV_LEN = 12;
const AUTH_TAG_LEN = 16;

let encryptionKey: Buffer | null = null;

function resolveKey(): Buffer | null {
  if (encryptionKey !== null) return encryptionKey.length === 0 ? null : encryptionKey;

  const raw = process.env.DATA_ENCRYPTION_KEY?.trim();
  if (!raw) {
    const isProduction = (process.env.NODE_ENV ?? "").toLowerCase() === "production";
    if (isProduction) {
      console.error(
        "[crypto] DATA_ENCRYPTION_KEY is required in production. " +
          "Set a 64-char hex string (32 bytes).",
      );
      process.exit(1);
    }
    encryptionKey = Buffer.alloc(0);
    return null;
  }

  const buf =
    raw.length === 64 && /^[0-9a-fA-F]+$/.test(raw)
      ? Buffer.from(raw, "hex")
      : Buffer.from(raw, "base64");

  if (buf.length !== 32) {
    console.error(
      `[crypto] DATA_ENCRYPTION_KEY must be 32 bytes (got ${buf.length}). ` +
        "Provide a 64-char hex string or a 44-char base64 string.",
    );
    process.exit(1);
  }

  encryptionKey = buf;
  return buf;
}

/**
 * Encrypt a plaintext string.
 * Returns ciphertext envelope or the original string if encryption is disabled.
 */
export function encrypt(plaintext: string): string {
  const key = resolveKey();
  if (!key) return plaintext;

  const iv = randomBytes(IV_LEN);
  const cipher = createCipheriv(ALGO, key, iv);

  const encrypted = Buffer.concat([
    cipher.update(plaintext, "utf8"),
    cipher.final(),
  ]);
  const authTag = cipher.getAuthTag();

  return `${iv.toString("hex")}:${authTag.toString("hex")}:${encrypted.toString("hex")}`;
}

/**
 * Decrypt a ciphertext envelope.
 * Returns plaintext. If input is not an encrypted envelope, returns as-is (graceful fallback).
 */
export function decrypt(ciphertext: string): string {
  const key = resolveKey();
  if (!key) return ciphertext;

  const parts = ciphertext.split(":");
  if (parts.length !== 3) return ciphertext;

  const [ivHex, authTagHex, dataHex] = parts;

  if (
    ivHex.length !== IV_LEN * 2 ||
    authTagHex.length !== AUTH_TAG_LEN * 2 ||
    !dataHex
  ) {
    return ciphertext;
  }

  try {
    const iv = Buffer.from(ivHex, "hex");
    const authTag = Buffer.from(authTagHex, "hex");
    const data = Buffer.from(dataHex, "hex");

    const decipher = createDecipheriv(ALGO, key, iv);
    decipher.setAuthTag(authTag);

    return Buffer.concat([decipher.update(data), decipher.final()]).toString("utf8");
  } catch {
    return ciphertext;
  }
}

/**
 * Check whether encryption is active (key is loaded).
 */
export function isEncryptionEnabled(): boolean {
  return resolveKey() !== null;
}
