import { expect, test, describe, spyOn } from "bun:test";
import { generateNumericCode, generateInviteCode } from "../shared/code.ts";

describe("Security Randomness", () => {
  test("generateNumericCode should not use Math.random", () => {
    const mathRandomSpy = spyOn(Math, "random");

    const code = generateNumericCode(6);

    expect(mathRandomSpy).not.toHaveBeenCalled();
    expect(code).toHaveLength(6);
    expect(/^[1-9][0-9]{5}$/.test(code)).toBe(true);

    mathRandomSpy.mockRestore();
  });

  test("generateInviteCode should not use Math.random", () => {
    const mathRandomSpy = spyOn(Math, "random");

    const code = generateInviteCode(6);

    expect(mathRandomSpy).not.toHaveBeenCalled();
    expect(code).toHaveLength(6);
    // Character set: ABCDEFGHJKLMNPQRSTUVWXYZ23456789
    expect(/^[ABCDEFGHJKLMNPQRSTUVWXYZ23456789]{6}$/.test(code)).toBe(true);

    mathRandomSpy.mockRestore();
  });

  test("generateInviteCode should produce reasonably unique codes", () => {
    const codes = new Set<string>();
    const iterations = 1000;

    for (let i = 0; i < iterations; i++) {
      codes.add(generateInviteCode(6));
    }

    // With 1000 iterations and ~1 billion possibilities (32^6), collisions are very unlikely but theoretically possible.
    // 32^6 = 1,073,741,824
    expect(codes.size).toBeGreaterThan(995);
  });

  test("generateNumericCode should produce reasonably unique codes", () => {
    const codes = new Set<string>();
    const iterations = 1000;

    for (let i = 0; i < iterations; i++) {
      codes.add(generateNumericCode(6));
    }

    // With 1000 iterations and 900,000 possibilities (100,000 to 999,999),
    // the probability of at least one collision is roughly 1 - e^(-1000^2 / (2 * 900000)) ≈ 1 - e^(-0.55) ≈ 0.42.
    // So collisions are expected.
    expect(codes.size).toBeGreaterThan(990);
  });
});
