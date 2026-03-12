import { Hono } from "hono";
import { fakerVI as faker } from '@faker-js/faker';
import type { AppEnv } from "../app-env.ts";
import { store } from "../store.ts";
import type { User } from "../types.ts";
import { hashPassword } from "../utils/password.ts";
import { requireAuth } from "../middleware/auth.ts";
import { AppError, fail, success } from "../utils/http.ts";
export const debugRoutes = new Hono<AppEnv>();

/**
 * Seed a random user for testing.
 * Returns email and password (default: password123).
 */
debugRoutes.post("/seed-user", async (context) => {
    const randomId = Math.random().toString(36).substring(7);
    const email = `test-${randomId}@example.com`;
    const password = "password123";
    const now = new Date().toISOString();

    const user: User = {
        id: crypto.randomUUID(),
        email,
        fullName: `Test User ${randomId}`,
        gender: "KHONG_TIET_LO",
        authProvider: "LOCAL",
        authId: email,
        passwordHash: hashPassword(password),
        timezone: "Asia/Ho_Chi_Minh",
        isActive: true,
        createdAt: now,
        updatedAt: now,
    };

    await store.saveUser(user);

    return success(context, {
        email,
        password,
        userId: user.id
    }, 201);
});

/**
 * Seed an invite code by creating a random user and generating an invite for them.
 * Useful for testing the "Join by Code" feature in the mobile app.
 */
debugRoutes.post("/seed-invite", async (context) => {
    const randomId = Math.random().toString(36).substring(7);
    const email = `inviter-${randomId}@example.com`;
    const now = new Date().toISOString();

    const inviter: User = {
        id: crypto.randomUUID(),
        email,
        fullName: `Inviter ${randomId}`,
        gender: "KHONG_TIET_LO",
        authProvider: "LOCAL",
        authId: email,
        passwordHash: hashPassword("password123"),
        timezone: "Asia/Ho_Chi_Minh",
        isActive: true,
        createdAt: now,
        updatedAt: now,
    };

    await store.saveUser(inviter);

    // Create pending couple and issue invite
    const couple = await store.createPendingCouple(inviter.id);
    const invite = await store.issueInviteForCouple(couple.id, inviter.id);

    return success(context, {
        inviterEmail: email,
        inviteCode: invite.code,
        expiresIn: 24 * 60 * 60,
    }, 201);
});

debugRoutes.post("/seed-happy-case", requireAuth, async (context) => {
    const user = context.get("user");
    let couple = await store.getActiveCoupleForUser(user.id);

    // If not paired, create a shadow partner and pair them automatically
    if (!couple) {
        const partnerEmail = `partner-${user.id.substring(0, 5)}@emplus.local`;
        const partnerId = crypto.randomUUID();
        const now = new Date().toISOString();

        const shadowPartner: User = {
            id: partnerId,
            email: partnerEmail,
            fullName: "Người Thương",
            gender: user.gender === "NAM" ? "NU" : "NAM",
            authProvider: "LOCAL",
            authId: partnerEmail,
            passwordHash: hashPassword("password123"),
            timezone: "Asia/Ho_Chi_Minh",
            isActive: true,
            createdAt: now,
            updatedAt: now,
        };

        await store.saveUser(shadowPartner);

        couple = {
            id: crypto.randomUUID(),
            partner1Id: user.id,
            partner2Id: partnerId,
            status: "DANG_YEU",
            loveStartDate: new Date(Date.now() - 86400000 * 365).toISOString().substring(0, 10), // 1 year ago
            settings: {},
            createdAt: now,
        };

        await store.saveCouple(couple);

        // Update user to have coupleId (denormalized for quick access in some stores)
        user.coupleId = couple.id;
        shadowPartner.coupleId = couple.id;
        await store.saveUser(user);
        await store.saveUser(shadowPartner);

        // Invalidate cache
        await store.invalidateHomeCache(couple.id);
    }

    const todayStr = new Date().toISOString().substring(0, 10);
    const yesterdayStr = new Date(Date.now() - 86400000).toISOString().substring(0, 10);
    const pastStr = new Date(Date.now() - 86400000 * 5).toISOString().substring(0, 10);

    const fixedImg = "https://fastly.picsum.photos/id/520/800/600.jpg?hmac=Yl8aFf9eyZR6g4T6_N8giCen61Q2_iWBumgB_WuJeDM";

    const memories = [
        {
            title: `Ảnh ${faker.commerce.productName()} tại Studio`,
            description: faker.lorem.sentence(),
            memoryDate: todayStr,
            tags: ["ky-niem"],
            mediaUrls: [fixedImg],
        },
        {
            title: "Cọc địa điểm nhà hàng",
            description: `Thanh toán cho nhà hàng ${faker.company.name()}`,
            memoryDate: todayStr,
            tags: ["chi-phi"],
            mediaUrls: [],
        },
        {
            title: "Đi chọn váy cưới",
            description: faker.lorem.sentence(),
            memoryDate: yesterdayStr,
            tags: ["ky-niem"],
            mediaUrls: [fixedImg, fixedImg],
        },
        {
            title: faker.helpers.arrayElement(["Gửi thiệp mời online", "Lên danh sách khách", "Chọn hoa cầm tay"]),
            description: `Hoàn thành lúc ${new Date().toLocaleTimeString()}`,
            memoryDate: yesterdayStr,
            tags: ["nhiem-vu"],
            mediaUrls: [],
        },
        {
            title: `Hẹn hò xem film ${faker.word.adjective()}`,
            description: faker.lorem.paragraph(1),
            memoryDate: pastStr,
            tags: ["ky-niem"],
            mediaUrls: [fixedImg],
        },
        {
            title: "Mua nhẫn cưới",
            description: faker.lorem.sentence(),
            memoryDate: pastStr,
            tags: ["nhiem-vu", "chi-phi"],
            mediaUrls: [],
        }
    ];

    for (const m of memories) {
        let createdAt = new Date().toISOString();
        if (m.memoryDate === yesterdayStr) {
            createdAt = new Date(Date.now() - 86400000).toISOString();
        } else if (m.memoryDate === pastStr) {
            createdAt = new Date(Date.now() - 86400000 * 5).toISOString();
        }

        await store.saveMemory({
            id: crypto.randomUUID(),
            coupleId: couple.id,
            createdById: user.id,
            title: m.title,
            description: m.description,
            memoryDate: m.memoryDate,
            mediaUrls: m.mediaUrls,
            tags: m.tags,
            createdAt: createdAt,
        });
    }

    const budgetItems = [
        { title: "Đặt cọc địa điểm", amount: 5000, category: "venue", status: "PAID", date: todayStr, place: "The Grand Hall" },
        { title: "Tiền cọc ăn uống", amount: 3200, category: "catering", status: "CHO_GHEP_DOI", date: todayStr, place: "Savor Co." },
        { title: "Thử váy cưới", amount: 850, category: "clothing", status: "PAID", date: yesterdayStr, place: "Bridal Boutique" },
        { title: "Phát sinh hoa tươi", amount: 1200, category: "other", status: "OVER_BUDGET", date: yesterdayStr, place: "Lily Flower" },
        { title: "Đặt cọc DJ", amount: 500, category: "music", status: "DRAFT", date: pastStr, place: "Soundwave" },
        { title: "Thợ chụp ảnh", amount: 3500, category: "photo", status: "PENDING", date: pastStr, place: "Lens & Light" },
    ];

    for (const b of budgetItems) {
        await store.saveBudgetItem({
            id: crypto.randomUUID(),
            coupleId: couple.id,
            createdById: user.id,
            title: b.title,
            amount: b.amount,
            category: b.category,
            date: b.date,
            place: b.place,
            status: b.status as any,
            createdAt: new Date().toISOString(),
        });
    }

    // Seed cycle for female user (either current user or partner 1)
    const femaleId = user.gender === "NU" ? user.id : couple.partner1Id === user.id ? couple.partner2Id : couple.partner1Id;
    if (femaleId) {
        await store.saveCycle({
            id: crypto.randomUUID(),
            userId: femaleId,
            startDate: new Date(Date.now() - 86400000 * 5).toISOString().substring(0, 10), // Period started 5 days ago
            cycleDuration: 28,
            periodDuration: 5,
            symptomNotes: ["Cramp", "Headache"],
            isTrackingActive: true,
        });
    }

    return success(context, {
        seededMemories: memories.length,
        seededBudget: budgetItems.length,
        autoPaired: !user.coupleId
    });
});
