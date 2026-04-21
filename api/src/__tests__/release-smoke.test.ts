import { beforeEach, describe, expect, it } from "bun:test";

const { app } = await import("../app.ts");
const { store } = await import("../store.ts");

function uniqueEmail(seed: string): string {
  return `${seed}.${Date.now()}.${Math.random().toString(36).slice(2, 8)}@example.com`;
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
    body: JSON.stringify(profile),
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

describe("Release smoke", () => {
  beforeEach(async () => {
    if (store.reset) {
      await store.reset();
    }
  });

  it("covers auth, pairing status, and reminder basics", async () => {
    const ownerEmail = uniqueEmail("smoke.owner");
    const partnerEmail = uniqueEmail("smoke.partner");
    const password = "Smoke@123456";

    const ownerTokens = await register({
      fullName: "Smoke Owner",
      gender: "NAM",
      email: ownerEmail,
      password,
    });

    const loginResponse = await app.request("http://localhost/v1/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: ownerEmail,
        password,
      }),
    });
    expect(loginResponse.status).toBe(200);

    const owner = await store.findUserByEmail(ownerEmail);
    expect(owner).toBeDefined();

    const savePushTokenResponse = await app.request("http://localhost/v1/users/push-token", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${ownerTokens.accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        expoPushToken: "ExponentPushToken[release-smoke-token]",
      }),
    });
    expect(savePushTokenResponse.status).toBe(200);
    expect(await store.getExpoPushToken(owner!.id)).toBe("ExponentPushToken[release-smoke-token]");

    const clearPushTokenResponse = await app.request("http://localhost/v1/users/push-token", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${ownerTokens.accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        expoPushToken: null,
      }),
    });
    expect(clearPushTokenResponse.status).toBe(200);
    expect(await store.getExpoPushToken(owner!.id)).toBeNull();

    const statusBeforePairing = await app.request("http://localhost/v1/couples/status", {
      headers: { Authorization: `Bearer ${ownerTokens.accessToken}` },
    });
    expect(statusBeforePairing.status).toBe(200);
    const statusBeforePayload = await statusBeforePairing.json();
    expect(statusBeforePayload.data).toEqual({ paired: false });

    const partnerTokens = await register({
      fullName: "Smoke Partner",
      gender: "NU",
      email: partnerEmail,
      password,
    });

    const inviteResponse = await app.request("http://localhost/v1/couples/generate-invite", {
      method: "POST",
      headers: { Authorization: `Bearer ${ownerTokens.accessToken}` },
    });
    expect(inviteResponse.status).toBe(201);
    const invitePayload = await inviteResponse.json();
    const inviteCode = invitePayload.data.inviteCode as string;

    const joinResponse = await app.request("http://localhost/v1/couples/join", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${partnerTokens.accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ inviteCode }),
    });
    expect(joinResponse.status).toBe(200);

    const statusAfterPairing = await app.request("http://localhost/v1/couples/status", {
      headers: { Authorization: `Bearer ${ownerTokens.accessToken}` },
    });
    expect(statusAfterPairing.status).toBe(200);
    const statusAfterPayload = await statusAfterPairing.json();
    expect(statusAfterPayload.data.paired).toBe(true);
    expect(statusAfterPayload.data.partner?.fullName).toBe("Smoke Partner");

    const couple = await store.getActiveCoupleForUser(owner!.id);
    expect(couple).toBeDefined();

    const adjustedLoveStartDate = new Date();
    adjustedLoveStartDate.setUTCDate(adjustedLoveStartDate.getUTCDate() - 26);
    await store.saveCouple({
      ...couple!,
      loveStartDate: adjustedLoveStartDate.toISOString().slice(0, 10),
    });

    const dispatchResponse = await app.request("http://localhost/v1/system/dispatch-reminders", {
      method: "POST",
      headers: { Authorization: `Bearer ${ownerTokens.accessToken}` },
    });
    expect(dispatchResponse.status).toBe(200);
    const dispatchPayload = await dispatchResponse.json();
    expect(dispatchPayload.data.remindersSent).toBeGreaterThan(0);

    const notificationsResponse = await app.request("http://localhost/v1/notifications", {
      headers: { Authorization: `Bearer ${ownerTokens.accessToken}` },
    });
    expect(notificationsResponse.status).toBe(200);
    const notificationsPayload = await notificationsResponse.json();
    expect(notificationsPayload.data.items.length).toBeGreaterThan(0);
    expect(notificationsPayload.data.items.some((item: { type: string }) => item.type === "reminder")).toBe(true);
  });
});
