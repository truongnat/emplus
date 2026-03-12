/**
 * Random code generation utilities
 */

/**
 * Generate a random numeric code with specified length
 */
export function generateNumericCode(length: number): string {
  const min = Math.pow(10, length - 1);
  const max = Math.pow(10, length) - 1;
  return Math.floor(min + Math.random() * (max - min)).toString();
}

/**
 * Generate an alphanumeric invite code
 */
export function generateInviteCode(length: number = 8): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "";
  const randomBytes = new Uint32Array(length);
  crypto.getRandomValues(randomBytes);
  for (let i = 0; i < length; i++) {
    code += chars[randomBytes[i] % chars.length];
  }
  return code;
}

/**
 * Generate a random UUID
 */
export function generateId(): string {
  return crypto.randomUUID();
}
