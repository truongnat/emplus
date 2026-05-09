import { beforeEach, describe, expect, it } from "bun:test";
import { app } from "../app.ts";
import { store } from "../store.ts";
import type { Couple, User } from "../types.ts";

function authHeaders(token: string) {
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
}

function createUser(name: string): User {
  return {
    id: crypto.randomUUID(),
    email: `${name.toLowerCase()}-${crypto.randomUUID()}@example.com`,
    fullName: name,
    gender: "OTHER",
    authProvider: "LOCAL",
    authId: crypto.randomUUID(),
    passwordHash: "test-hash",
    timezone: "Asia/Ho_Chi_Minh",
    emailNotificationsEnabled: true,
    profilePrivate: false,
    showOnlineStatus: true,
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

async function createPairedUsers() {
  const sender = createUser("Sender");
  const partner = createUser("Partner");
  const couple: Couple = {
    id: crypto.randomUUID(),
    partner1Id: sender.id,
    partner2Id: partner.id,
    loveStartDate: "2024-01-01",
    status: "DATING",
    settings: {},
    createdAt: new Date().toISOString(),
  };
  const senderToken = `sender_${crypto.randomUUID()}`;
  const partnerToken = `partner_${crypto.randomUUID()}`;

  sender.coupleId = couple.id;
  partner.coupleId = couple.id;

  await store.saveUser(sender);
  await store.saveUser(partner);
  await store.saveCouple(couple);
  await store.saveSession(senderToken, sender.id, 900);
  await store.saveSession(partnerToken, partner.id, 900);

  return { sender, partner, couple, senderToken, partnerToken };
}

describe("Nudge domain", () => {
  beforeEach(async () => {
    if (store.reset) {
      await store.reset();
    }
  });

  it("creates a nudge and resolves the partner automatically", async () => {
    const { sender, partner, senderToken, couple } = await createPairedUsers();

    const response = await app.request("http://localhost/v1/nudges", {
      method: "POST",
      headers: authHeaders(senderToken),
      body: JSON.stringify({ type: "MISS_YOU" }),
    });

    expect(response.status).toBe(201);
    const payload = await response.json();
    expect(payload.data.coupleId).toBe(couple.id);
    expect(payload.data.fromUserId).toBe(sender.id);
    expect(payload.data.toUserId).toBe(partner.id);
    expect(payload.data.type).toBe("MISS_YOU");
    expect(payload.data.message).toBe("Người ấy đang nhớ bạn đó 🥺");
  });

  it("returns recent nudges for the current user", async () => {
    const { senderToken, partnerToken } = await createPairedUsers();

    const createResponse = await app.request("http://localhost/v1/nudges", {
      method: "POST",
      headers: authHeaders(senderToken),
      body: JSON.stringify({ type: "HUG" }),
    });
    expect(createResponse.status).toBe(201);

    const partnerRecentResponse = await app.request("http://localhost/v1/nudges/recent", {
      headers: { Authorization: `Bearer ${partnerToken}` },
    });
    expect(partnerRecentResponse.status).toBe(200);
    const partnerRecentPayload = await partnerRecentResponse.json();
    expect(partnerRecentPayload.data.items).toHaveLength(1);
    expect(partnerRecentPayload.data.items[0].message).toBe("Người ấy gửi bạn một cái ôm 🤗");

    const senderRecentResponse = await app.request("http://localhost/v1/nudges/recent", {
      headers: { Authorization: `Bearer ${senderToken}` },
    });
    const senderRecentPayload = await senderRecentResponse.json();
    expect(senderRecentPayload.data.items).toEqual([]);
  });

  it("marks a received nudge as read", async () => {
    const { senderToken, partnerToken } = await createPairedUsers();

    const createResponse = await app.request("http://localhost/v1/nudges", {
      method: "POST",
      headers: authHeaders(senderToken),
      body: JSON.stringify({ type: "CALL_ME" }),
    });
    const createPayload = await createResponse.json();
    const nudgeId = createPayload.data.id as string;

    const readResponse = await app.request(`http://localhost/v1/nudges/${nudgeId}/read`, {
      method: "POST",
      headers: { Authorization: `Bearer ${partnerToken}` },
    });

    expect(readResponse.status).toBe(200);
    const readPayload = await readResponse.json();
    expect(readPayload.data.id).toBe(nudgeId);
    expect(readPayload.data.readAt).toBeDefined();
  });

  it("prevents self nudge when a malformed active couple points to the same user", async () => {
    const user = createUser("Self");
    const token = `self_${crypto.randomUUID()}`;
    const couple: Couple = {
      id: crypto.randomUUID(),
      partner1Id: user.id,
      partner2Id: user.id,
      status: "DATING",
      settings: {},
      createdAt: new Date().toISOString(),
    };

    user.coupleId = couple.id;
    await store.saveUser(user);
    await store.saveCouple(couple);
    await store.saveSession(token, user.id, 900);

    const response = await app.request("http://localhost/v1/nudges", {
      method: "POST",
      headers: authHeaders(token),
      body: JSON.stringify({ type: "POKE" }),
    });

    expect(response.status).toBe(400);
    const payload = await response.json();
    expect(payload.error.code).toBe("SELF_NUDGE_NOT_ALLOWED");
  });

  it("rate limits repeated nudges from the same user", async () => {
    const { senderToken } = await createPairedUsers();

    const firstResponse = await app.request("http://localhost/v1/nudges", {
      method: "POST",
      headers: authHeaders(senderToken),
      body: JSON.stringify({ type: "POKE" }),
    });
    expect(firstResponse.status).toBe(201);

    const secondResponse = await app.request("http://localhost/v1/nudges", {
      method: "POST",
      headers: authHeaders(senderToken),
      body: JSON.stringify({ type: "KISS" }),
    });

    expect(secondResponse.status).toBe(429);
    const payload = await secondResponse.json();
    expect(payload.error.code).toBe("NUDGE_RATE_LIMITED");
    expect(payload.error.details[0].retryAfterSeconds).toBeGreaterThan(0);
  });
});
