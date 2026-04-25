import { describe, it, expect, beforeEach } from "bun:test";
import { app } from "../app";
import type { Couple, User } from "../types.ts";
import { hashPassword } from "../utils/password.ts";

describe("Notifications (in-app)", () => {
  let accessToken: string;
  let userId: string;

  beforeEach(async () => {
    const email = `notif-${Date.now()}@example.com`;
    const reg = await app.request("/v1/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        password: "password123",
        fullName: "Notif Test",
      }),
    });
    expect(reg.status).toBe(201);
    const body = await reg.json();
    accessToken = body.data.tokens.accessToken;
    userId = body.data.user.id;
  });

  it("lists empty notifications", async () => {
    const res = await app.request("/v1/notifications?page=1&limit=10", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.success).toBe(true);
    expect(json.data.items).toEqual([]);
    expect(json.data.pagination.totalItems).toBe(0);
  });

  it("lists and marks read when notifications exist", async () => {
    const { store } = await import("../store.ts");
    const n = await store.createInAppNotification({
      userId,
      type: "TEST",
      title: "Thử nghiệm",
      body: "Nội dung",
      iconName: "heart",
      iconColor: "#E48B9B",
      iconBg: "#FAF0F2",
    });

    const list = await app.request("/v1/notifications", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    expect(list.status).toBe(200);
    const listJson = await list.json();
    expect(listJson.data.items.length).toBe(1);
    expect(listJson.data.items[0].id).toBe(n.id);

    const patch = await app.request(`/v1/notifications/${n.id}/read`, {
      method: "PATCH",
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    expect(patch.status).toBe(200);
    const patchJson = await patch.json();
    expect(patchJson.data.readAt).toBeDefined();

    const unread = await app.request("/v1/notifications?unread_only=true", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    const unreadJson = await unread.json();
    expect(unreadJson.data.pagination.totalItems).toBe(0);

    const readAll = await app.request("/v1/notifications/read-all", {
      method: "POST",
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    expect(readAll.status).toBe(200);
  });

  it("dispatches core reminders idempotently for upcoming system milestones", async () => {
    const { store } = await import("../store.ts");
    const now = new Date();
    const today = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
    const loveStartDate = new Date(today);
    loveStartDate.setUTCDate(loveStartDate.getUTCDate() - 26);
    const partnerId = crypto.randomUUID();
    const partnerEmail = `partner-${Date.now()}@example.com`;
    const isoNow = new Date().toISOString();

    const partner: User = {
      id: partnerId,
      email: partnerEmail,
      fullName: "Partner Reminder",
      gender: "MALE",
      authProvider: "LOCAL",
      authId: partnerEmail,
      passwordHash: hashPassword("password123"),
      timezone: "Asia/Ho_Chi_Minh",
      emailNotificationsEnabled: true,
      profilePrivate: false,
      showOnlineStatus: true,
      isActive: true,
      createdAt: isoNow,
      updatedAt: isoNow,
    };
    await store.saveUser(partner);

    const couple: Couple = {
      id: crypto.randomUUID(),
      partner1Id: userId,
      partner2Id: partnerId,
      loveStartDate: loveStartDate.toISOString().slice(0, 10),
      status: "DATING",
      settings: {},
      createdAt: isoNow,
    };
    await store.saveCouple(couple);

    const firstDispatch = await app.request("/v1/system/dispatch-reminders", {
      method: "POST",
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    expect(firstDispatch.status).toBe(200);
    const firstPayload = await firstDispatch.json();
    expect(firstPayload.data.remindersSent).toBeGreaterThan(0);

    const listAfterFirst = await app.request("/v1/notifications", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    const firstListPayload = await listAfterFirst.json();
    expect(firstListPayload.data.items.length).toBe(1);
    expect(firstListPayload.data.items[0].type).toBe("reminder");

    const secondDispatch = await app.request("/v1/system/dispatch-reminders", {
      method: "POST",
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    expect(secondDispatch.status).toBe(200);

    const listAfterSecond = await app.request("/v1/notifications", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    const secondListPayload = await listAfterSecond.json();
    expect(secondListPayload.data.items.length).toBe(1);
  });
});
