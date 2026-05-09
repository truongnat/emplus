import { beforeEach, describe, expect, it } from "bun:test";
import { app } from "../app.ts";
import {
  calculateNextMilestone,
  combineMilestones,
  generateAutoMilestones,
} from "../engines/milestones.ts";
import { store } from "../store.ts";
import type { Couple, User } from "../types.ts";

function authHeaders(token: string) {
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
}

async function createAuthenticatedCouple(loveStartDate = "2024-01-01") {
  const user: User = {
    id: crypto.randomUUID(),
    email: `milestone-${crypto.randomUUID()}@example.com`,
    fullName: "Milestone User",
    gender: "MALE",
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
  const couple: Couple = {
    id: crypto.randomUUID(),
    partner1Id: user.id,
    loveStartDate,
    status: "DATING",
    settings: {},
    createdAt: new Date().toISOString(),
  };
  const token = `test_${crypto.randomUUID()}`;

  user.coupleId = couple.id;
  await store.saveUser(user);
  await store.saveCouple(couple);
  await store.saveSession(token, user.id, 900);

  return { user, couple, token };
}

describe("Milestone domain", () => {
  beforeEach(async () => {
    if (store.reset) {
      await store.reset();
    }
  });

  it("generates stable auto milestones from loveStartDate", () => {
    const milestones = generateAutoMilestones("2024-01-01");

    expect(milestones.some((milestone) => milestone.sourceKey === "day-7")).toBe(true);
    expect(milestones.find((milestone) => milestone.sourceKey === "day-30")?.date).toBe("2024-01-30");
    expect(milestones.find((milestone) => milestone.sourceKey === "day-1000")?.title).toBe(
      "Kỷ niệm 1000 ngày yêu",
    );
    expect(milestones.find((milestone) => milestone.sourceKey === "year-10")?.date).toBe("2034-01-01");
    expect(milestones.every((milestone) => milestone.type === "AUTO")).toBe(true);
    expect(milestones.every((milestone) => milestone.category === "ANNIVERSARY")).toBe(true);
  });

  it("calculates the next milestone across auto and custom milestones", () => {
    const autoMilestones = generateAutoMilestones("2024-01-01");
    const customMilestones = [
      {
        id: crypto.randomUUID(),
        coupleId: "couple-1",
        title: "Buổi hẹn riêng",
        milestoneDate: "2024-01-20",
        type: "CUSTOM" as const,
        category: "DATE" as const,
        remindBeforeDays: [1, 3, 7],
        isImportant: false,
        createdAt: "2024-01-01T00:00:00.000Z",
        updatedAt: "2024-01-01T00:00:00.000Z",
      },
    ];

    const next = calculateNextMilestone(
      combineMilestones(autoMilestones, customMilestones),
      new Date(Date.UTC(2024, 0, 19)),
    );

    expect(next?.type).toBe("CUSTOM");
    expect(next?.title).toBe("Buổi hẹn riêng");
  });

  it("supports custom milestone create, list, update and delete", async () => {
    const { token } = await createAuthenticatedCouple("2024-01-01");

    const createResponse = await app.request("http://localhost/v1/milestones", {
      method: "POST",
      headers: authHeaders(token),
      body: JSON.stringify({
        title: "Kỷ niệm buổi hẹn đầu",
        description: "Đi ăn tối cùng nhau.",
        milestoneDate: "2024-02-14",
        category: "DATE",
        remindBeforeDays: [7, 1, 3, 3],
        isImportant: true,
      }),
    });

    expect(createResponse.status).toBe(201);
    const createPayload = await createResponse.json();
    const milestoneId = createPayload.data.id as string;
    expect(createPayload.data.remindBeforeDays).toEqual([1, 3, 7]);

    const listResponse = await app.request("http://localhost/v1/milestones", {
      headers: { Authorization: `Bearer ${token}` },
    });
    expect(listResponse.status).toBe(200);
    const listPayload = await listResponse.json();
    expect(listPayload.data.autoMilestones.length).toBeGreaterThanOrEqual(18);
    expect(listPayload.data.customMilestones).toHaveLength(1);
    expect(listPayload.data.customMilestones[0].title).toBe("Kỷ niệm buổi hẹn đầu");
    expect(listPayload.data.nextMilestone).toBeDefined();

    const updateResponse = await app.request(`http://localhost/v1/milestones/${milestoneId}`, {
      method: "PATCH",
      headers: authHeaders(token),
      body: JSON.stringify({
        title: "Kỷ niệm Valentine đầu tiên",
        category: "ANNIVERSARY",
        remindBeforeDays: [14, 30],
        isImportant: false,
      }),
    });

    expect(updateResponse.status).toBe(200);
    const updatePayload = await updateResponse.json();
    expect(updatePayload.data.title).toBe("Kỷ niệm Valentine đầu tiên");
    expect(updatePayload.data.category).toBe("ANNIVERSARY");
    expect(updatePayload.data.remindBeforeDays).toEqual([14, 30]);
    expect(updatePayload.data.isImportant).toBe(false);

    const deleteResponse = await app.request(`http://localhost/v1/milestones/${milestoneId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    expect(deleteResponse.status).toBe(200);

    const listAfterDeleteResponse = await app.request("http://localhost/v1/milestones", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const listAfterDeletePayload = await listAfterDeleteResponse.json();
    expect(listAfterDeletePayload.data.customMilestones).toEqual([]);
  });

  it("rejects invalid custom milestone payloads", async () => {
    const { token } = await createAuthenticatedCouple();

    const response = await app.request("http://localhost/v1/milestones", {
      method: "POST",
      headers: authHeaders(token),
      body: JSON.stringify({
        title: "",
        milestoneDate: "2024-02-31",
        category: "INVALID",
        remindBeforeDays: [2],
      }),
    });

    expect(response.status).toBe(400);
  });
});
