import { pbkdf2Sync, randomBytes, timingSafeEqual } from "node:crypto";

const PASSWORD_SCHEME = "pbkdf2_sha256";
const DEFAULT_ITERATIONS = 210_000;
const KEY_LENGTH = 32;
const DIGEST = "sha256";

export function hashPassword(password: string): string {
  const salt = randomBytes(16).toString("hex");
  const hash = pbkdf2Sync(password, salt, DEFAULT_ITERATIONS, KEY_LENGTH, DIGEST).toString("hex");
  return `${PASSWORD_SCHEME}$${DEFAULT_ITERATIONS}$${salt}$${hash}`;
}

export function verifyPassword(password: string, encoded: string): boolean {
  const [scheme, iterationText, salt, expectedHash] = encoded.split("$");
  if (!scheme || !iterationText || !salt || !expectedHash) {
    return false;
  }

  if (scheme !== PASSWORD_SCHEME) {
    return false;
  }

  const iterations = Number(iterationText);
  if (!Number.isInteger(iterations) || iterations <= 0) {
    return false;
  }

  const computedHash = pbkdf2Sync(password, salt, iterations, KEY_LENGTH, DIGEST).toString("hex");
  const expectedBuffer = Buffer.from(expectedHash, "hex");
  const computedBuffer = Buffer.from(computedHash, "hex");

  if (expectedBuffer.length !== computedBuffer.length) {
    return false;
  }

  return timingSafeEqual(expectedBuffer, computedBuffer);
}
