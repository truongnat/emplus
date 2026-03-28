import { describe, it, expect, beforeEach } from "bun:test";
import { app } from "../app";

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
});
