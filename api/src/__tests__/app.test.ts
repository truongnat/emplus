import { beforeEach, describe, expect, it } from "bun:test";

const { app } = await import("../app.ts");
const { store } = await import("../store.ts");

function dayOffsetIso(days: number): string {
  const date = new Date();
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().slice(0, 10);
}

async function register(profile: {
  fullName: string;
  gender: "NAM" | "NU";
  email: string;
  password: string;
}) {
  const response = await app.request("http://localhost/v1/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      fullName: profile.fullName,
      gender: profile.gender,
      email: profile.email,
      password: profile.password,
    }),
  });

  expect(response.status).toBe(201);
  const payload = await response.json();
  expect(payload.success).toBe(true);

  return payload.data.tokens as {
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
  };
}

describe("Em Plus API MVP", () => {
  beforeEach(async () => {
    if (store.reset) {
      await store.reset();
    }
  });

  it("uses a consistent access-token TTL between response and stored session", async () => {
    const startedAt = Date.now();
    const response = await app.request("http://localhost/v1/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fullName: "TTL User",
        gender: "NAM",
        email: "ttl@example.com",
        password: "Ttl@123456",
      }),
    });
    const endedAt = Date.now();

    expect(response.status).toBe(201);
    const payload = await response.json();
    expect(payload.success).toBe(true);
    expect(payload.data.tokens.expiresIn).toBe(900);

    const accessToken = payload.data.tokens.accessToken as string;
    const refreshToken = payload.data.tokens.refreshToken as string;
    const memoryStore = store as unknown as {
      sessions?: Map<string, { expiresAt: number }>;
      refreshSessions?: Map<string, { expiresAt: number }>;
    };
    if (memoryStore.sessions instanceof Map) {
      const session = memoryStore.sessions.get(accessToken);
      expect(session).toBeDefined();
      const minExpiresAt = startedAt + 900 * 1000 - 2000;
      const maxExpiresAt = endedAt + 900 * 1000 + 2000;
      expect(session!.expiresAt).toBeGreaterThanOrEqual(minExpiresAt);
      expect(session!.expiresAt).toBeLessThanOrEqual(maxExpiresAt);
    }
    if (memoryStore.refreshSessions instanceof Map) {
      const refreshSession = memoryStore.refreshSessions.get(refreshToken);
      expect(refreshSession).toBeDefined();
      const minExpiresAt = startedAt + 7 * 24 * 60 * 60 * 1000 - 2000;
      const maxExpiresAt = endedAt + 7 * 24 * 60 * 60 * 1000 + 2000;
      expect(refreshSession!.expiresAt).toBeGreaterThanOrEqual(minExpiresAt);
      expect(refreshSession!.expiresAt).toBeLessThanOrEqual(maxExpiresAt);
    }
  });

  it("allows email/password login after registration", async () => {
    await register({
      fullName: "Login User",
      gender: "NAM",
      email: "login.user@example.com",
      password: "Login@123456",
    });

    const response = await app.request("http://localhost/v1/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: "login.user@example.com",
        password: "Login@123456",
      }),
    });

    expect(response.status).toBe(200);
    const payload = await response.json();
    expect(payload.success).toBe(true);
    expect(payload.data.user.email).toBe("login.user@example.com");
  });

  it("refreshes token and rejects reused refresh token", async () => {
    const initialTokens = await register({
      fullName: "Refresh User",
      gender: "NAM",
      email: "refresh.user@example.com",
      password: "Refresh@123456",
    });

    const refreshResponse = await app.request("http://localhost/v1/auth/refresh", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        refreshToken: initialTokens.refreshToken,
      }),
    });

    expect(refreshResponse.status).toBe(200);
    const refreshPayload = await refreshResponse.json();
    expect(refreshPayload.success).toBe(true);
    expect(refreshPayload.data.tokens.accessToken).not.toBe(initialTokens.accessToken);
    expect(refreshPayload.data.tokens.refreshToken).not.toBe(initialTokens.refreshToken);

    const inviteResponse = await app.request("http://localhost/v1/couples/generate-invite", {
      method: "POST",
      headers: { Authorization: `Bearer ${refreshPayload.data.tokens.accessToken as string}` },
    });
    expect(inviteResponse.status).toBe(201);

    const reusedRefreshResponse = await app.request("http://localhost/v1/auth/refresh", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        refreshToken: initialTokens.refreshToken,
      }),
    });

    expect(reusedRefreshResponse.status).toBe(401);
  });

  it("supports pairing, care suggestions and timeline flow", async () => {
    const maleTokens = await register({
      fullName: "Minh",
      gender: "NAM",
      email: "minh@example.com",
      password: "Minh@123456",
    });
    const maleToken = maleTokens.accessToken;

    const femaleTokens = await register({
      fullName: "Ngoc",
      gender: "NU",
      email: "ngoc@example.com",
      password: "Ngoc@123456",
    });
    const femaleToken = femaleTokens.accessToken;

    const inviteResponse = await app.request("http://localhost/v1/couples/generate-invite", {
      method: "POST",
      headers: { Authorization: `Bearer ${maleToken}` },
    });

    expect(inviteResponse.status).toBe(201);
    const invitePayload = await inviteResponse.json();
    const inviteCode = invitePayload.data.inviteCode as string;
    expect(inviteCode.length).toBe(6);

    const joinResponse = await app.request("http://localhost/v1/couples/join", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${femaleToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ inviteCode }),
    });

    expect(joinResponse.status).toBe(200);

    const saveCycleResponse = await app.request("http://localhost/v1/care/female-cycle", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${femaleToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        lastPeriodStart: dayOffsetIso(-20),
        avgCycleLength: 28,
        avgPeriodLength: 5,
      }),
    });

    expect(saveCycleResponse.status).toBe(200);

    const careResponse = await app.request("http://localhost/v1/care/male-suggestions", {
      method: "GET",
      headers: { Authorization: `Bearer ${maleToken}` },
    });

    expect(careResponse.status).toBe(200);
    const carePayload = await careResponse.json();
    expect(carePayload.data.suggestions.length).toBeGreaterThan(0);

    const createMemoryResponse = await app.request("http://localhost/v1/timeline/memories", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${maleToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: "Chuyen di Da Lat",
        memoryDate: dayOffsetIso(-1),
        description: "Lan dau di cung nhau",
        mediaUrls: ["https://cdn.emplus.local/photo-1.jpg"],
        tags: ["travel"],
      }),
    });

    expect(createMemoryResponse.status).toBe(201);

    const timelineResponse = await app.request("http://localhost/v1/timeline/memories?page=1&limit=10", {
      headers: { Authorization: `Bearer ${maleToken}` },
    });

    expect(timelineResponse.status).toBe(200);
    const timelinePayload = await timelineResponse.json();
    expect(timelinePayload.data.items.length).toBe(1);

    const dashboardResponse = await app.request("http://localhost/v1/dashboard/home", {
      headers: { Authorization: `Bearer ${maleToken}` },
    });

    expect(dashboardResponse.status).toBe(200);
    const dashboardPayload = await dashboardResponse.json();
    expect(dashboardPayload.data.coupleContext.loveDays).toBeGreaterThanOrEqual(1);
    expect(Array.isArray(dashboardPayload.data.upcomingEvents)).toBe(true);
  });

  it("invalidates previous invite code after generating a new one", async () => {
    const maleTokens = await register({
      fullName: "Minh Invite",
      gender: "NAM",
      email: "minh.invite@example.com",
      password: "MinhInvite@123",
    });
    const maleToken = maleTokens.accessToken;

    const femaleTokens = await register({
      fullName: "Ngoc Invite",
      gender: "NU",
      email: "ngoc.invite@example.com",
      password: "NgocInvite@123",
    });
    const femaleToken = femaleTokens.accessToken;

    const firstInviteResponse = await app.request("http://localhost/v1/couples/generate-invite", {
      method: "POST",
      headers: { Authorization: `Bearer ${maleToken}` },
    });
    expect(firstInviteResponse.status).toBe(201);
    const firstInvitePayload = await firstInviteResponse.json();
    const firstCode = firstInvitePayload.data.inviteCode as string;

    let secondCode = firstCode;
    let retries = 0;
    while (secondCode === firstCode && retries < 3) {
      const secondInviteResponse = await app.request("http://localhost/v1/couples/generate-invite", {
        method: "POST",
        headers: { Authorization: `Bearer ${maleToken}` },
      });
      expect(secondInviteResponse.status).toBe(201);
      const secondInvitePayload = await secondInviteResponse.json();
      secondCode = secondInvitePayload.data.inviteCode as string;
      retries += 1;
    }

    expect(secondCode.length).toBe(6);

    if (secondCode !== firstCode) {
      const joinWithOldCode = await app.request("http://localhost/v1/couples/join", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${femaleToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ inviteCode: firstCode }),
      });
      expect(joinWithOldCode.status).toBe(404);
    }

    const joinWithLatestCode = await app.request("http://localhost/v1/couples/join", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${femaleToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ inviteCode: secondCode }),
    });
    expect(joinWithLatestCode.status).toBe(200);
  });
});
