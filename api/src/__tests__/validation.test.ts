import { beforeEach, describe, expect, it } from "bun:test";

const { app } = await import("../app.ts");
const { store } = await import("../store.ts");

async function registerAndGetAccessToken(profile: {
  fullName: string;
  gender: "NAM" | "NU";
  email: string;
  password: string;
}): Promise<string> {
  const response = await app.request("http://localhost/v1/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(profile),
  });

  expect(response.status).toBe(201);
  const payload = await response.json();
  expect(payload.success).toBe(true);

  return payload.data.tokens.accessToken as string;
}

async function seedHappyCase(accessToken: string): Promise<void> {
  const response = await app.request("http://localhost/v1/debug/seed-happy-case", {
    method: "POST",
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  expect(response.status).toBe(200);
}

describe("Backend Zod validation", () => {
  beforeEach(async () => {
    if (store.reset) {
      await store.reset();
    }
  });

  it("returns 400 for invalid auth register input", async () => {
    const response = await app.request("http://localhost/v1/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: "not-an-email",
        password: "123",
      }),
    });

    expect(response.status).toBe(400);
    const payload = await response.json();
    expect(payload.success).toBe(false);
    expect(payload.error.code).toBe("VALIDATION_ERROR");
    expect(Array.isArray(payload.error.details)).toBe(true);
  });

  it("returns 403 for male user accessing female cycle endpoint", async () => {
    const accessToken = await registerAndGetAccessToken({
      fullName: "Minh",
      gender: "NAM",
      email: "cycle.validation@example.com",
      password: "Minh@123456",
    });

    const response = await app.request("http://localhost/v1/care/female-cycle", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        lastPeriodStart: "2026-03-01",
        avgCycleLength: 12,
        avgPeriodLength: 5,
      }),
    });

    expect(response.status).toBe(403);
    const payload = await response.json();
    expect(payload.success).toBe(false);
    expect(payload.error.code).toBe("FORBIDDEN");
  });

  it("returns 400 for invalid timeline memory payload", async () => {
    const accessToken = await registerAndGetAccessToken({
      fullName: "Timeline User",
      gender: "NAM",
      email: "timeline.validation@example.com",
      password: "Timeline@123456",
    });
    await seedHappyCase(accessToken);

    const response = await app.request("http://localhost/v1/timeline/memories", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: "Ky niem",
        memoryDate: "2026-02-31",
      }),
    });

    expect(response.status).toBe(400);
    const payload = await response.json();
    expect(payload.success).toBe(false);
    expect(payload.error.code).toBe("VALIDATION_ERROR");
  });

  it("returns 400 for invalid budget payload", async () => {
    const accessToken = await registerAndGetAccessToken({
      fullName: "Budget User",
      gender: "NAM",
      email: "budget.validation@example.com",
      password: "Budget@123456",
    });
    await seedHappyCase(accessToken);

    const response = await app.request("http://localhost/v1/budget/expenses", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: "Dat coc",
        amount: -10,
        date: "2026-03-09",
      }),
    });

    expect(response.status).toBe(400);
    const payload = await response.json();
    expect(payload.success).toBe(false);
    expect(payload.error.code).toBe("VALIDATION_ERROR");
  });
});
