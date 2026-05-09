import { beforeEach, describe, expect, it } from "bun:test";
import { app } from "../app.ts";
import { store } from "../store.ts";
import type { Couple, CustomMilestone, User } from "../types.ts";

function createUser(): User {
  return {
    id: crypto.randomUUID(),
    email: `gift-${crypto.randomUUID()}@example.com`,
    fullName: "Gift User",
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

async function createAuthenticatedCouple() {
  const user = createUser();
  const couple: Couple = {
    id: crypto.randomUUID(),
    partner1Id: user.id,
    loveStartDate: "2024-01-01",
    status: "DATING",
    settings: {},
    createdAt: new Date().toISOString(),
  };
  const token = `gift_${crypto.randomUUID()}`;

  user.coupleId = couple.id;
  await store.saveUser(user);
  await store.saveCouple(couple);
  await store.saveSession(token, user.id, 900);

  return { user, couple, token };
}

describe("Gift suggestion domain", () => {
  beforeEach(async () => {
    if (store.reset) {
      await store.reset();
    }
  });

  it("lists static gift suggestions for an authenticated active couple", async () => {
    const { token } = await createAuthenticatedCouple();

    const response = await app.request("http://localhost/v1/gift-suggestions", {
      headers: { Authorization: `Bearer ${token}` },
    });

    expect(response.status).toBe(200);
    const payload = await response.json();
    expect(payload.data.items.length).toBeGreaterThanOrEqual(20);
    expect(payload.data.items[0]).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        title: expect.any(String),
        category: expect.any(String),
        budgetRange: expect.any(String),
        platforms: expect.any(Array),
        url: expect.any(String),
        tags: expect.any(Array),
        suitableFor: expect.any(Array),
      }),
    );
  });

  it("filters suggestions by category", async () => {
    const { token } = await createAuthenticatedCouple();

    const response = await app.request("http://localhost/v1/gift-suggestions?category=APOLOGY", {
      headers: { Authorization: `Bearer ${token}` },
    });

    expect(response.status).toBe(200);
    const payload = await response.json();
    expect(payload.data.items.length).toBeGreaterThan(0);
    expect(payload.data.items.every((item: { category: string }) => item.category === "APOLOGY")).toBe(true);
  });

  it("filters suggestions by budget range", async () => {
    const { token } = await createAuthenticatedCouple();

    const response = await app.request("http://localhost/v1/gift-suggestions?budgetRange=UNDER_100K", {
      headers: { Authorization: `Bearer ${token}` },
    });

    expect(response.status).toBe(200);
    const payload = await response.json();
    expect(payload.data.items.length).toBeGreaterThan(0);
    expect(
      payload.data.items.every((item: { budgetRange: string }) => item.budgetRange === "UNDER_100K"),
    ).toBe(true);
  });

  it("returns available gift suggestion categories and filter enums", async () => {
    const { token } = await createAuthenticatedCouple();

    const response = await app.request("http://localhost/v1/gift-suggestions/categories", {
      headers: { Authorization: `Bearer ${token}` },
    });

    expect(response.status).toBe(200);
    const payload = await response.json();
    expect(payload.data.categories).toContain("ANNIVERSARY");
    expect(payload.data.categories).toContain("HANDMADE");
    expect(payload.data.budgetRanges).toContain("ABOVE_700K");
    expect(payload.data.platforms).toContain("SHOPEE");
  });

  it("uses custom milestone context when milestoneId is provided", async () => {
    const { couple, token, user } = await createAuthenticatedCouple();
    const milestone: CustomMilestone = {
      id: crypto.randomUUID(),
      coupleId: couple.id,
      title: "Quà đôi nho nhỏ",
      description: "Một món matching dùng hằng ngày.",
      milestoneDate: "2024-02-14",
      type: "CUSTOM",
      category: "GIFT",
      remindBeforeDays: [1, 3, 7],
      isImportant: true,
      createdById: user.id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    await store.saveCustomMilestone(milestone);

    const response = await app.request(`http://localhost/v1/gift-suggestions?milestoneId=${milestone.id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    expect(response.status).toBe(200);
    const payload = await response.json();
    expect(payload.data.items.length).toBeGreaterThan(0);
    expect(payload.data.items.every((item: { category: string }) => item.category === "COUPLE_ITEM")).toBe(true);
  });
});
