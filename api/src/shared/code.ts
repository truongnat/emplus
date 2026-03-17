/**
 * Random code generation utilities
 */

/**
 * Generate a random numeric code with specified length
 */
export function generateNumericCode(length: number): string {
  const digits = "0123456789";
  const firstDigits = "123456789";
  let code = "";
  const randomBytes = new Uint32Array(length);
  crypto.getRandomValues(randomBytes);

  // Ensure the first digit is not zero to maintain consistency with previous implementation
  code += firstDigits[randomBytes[0] % firstDigits.length];

  for (let i = 1; i < length; i++) {
    code += digits[randomBytes[i] % digits.length];
  }
  return code;
}

/**
 * Generate an alphanumeric invite code
 */
export function generateInviteCode(length: number = 8): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
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
