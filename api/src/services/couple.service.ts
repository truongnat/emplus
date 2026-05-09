/**
 * Couple service - handles couple-related business logic
 */

import { store } from "../store.ts";
import type { Couple, User } from "../types.ts";
import { INVITE_CODE_TTL_SECONDS } from "../constants/index.ts";
import { generateInviteCode } from "../shared/code.ts";
import { formatDate, todayUtc } from "../shared/date.ts";
import { displayGender, displayCoupleStatus } from "../utils/presentation.ts";
import { notify } from "./notification.service.ts";
import { AppError } from "../utils/http.ts";
import type { CreateCoupleDto, UpdateCoupleDto } from "../dto/couples.dto.ts";

export interface InviteResponse {
  inviteCode: string;
  expiresIn: number;
}

export interface JoinResponse {
  coupleId: string;
  status: string;
  partnerInfo: {
    id: string;
    fullName: string;
    gender: string;
  };
}

/**
 * Generate invite code for a user
 */
export async function generateInvite(userId: string): Promise<InviteResponse> {
  const activeCouple = await store.getActiveCoupleForUser(userId);
  if (activeCouple) {
    throw new AppError(409, "COUPLE_ALREADY_PAIRED", "Bạn đã được ghép đôi trong một mối quan hệ khác.");
  }

  const pendingCouple = await store.getPendingCoupleByCreator(userId);
  const couple = pendingCouple ?? (await store.createPendingCouple(userId));
  const invite = await store.issueInviteForCouple(couple.id, userId);

  return {
    inviteCode: invite.code,
    expiresIn: INVITE_CODE_TTL_SECONDS,
  };
}

/**
 * Join a couple using invite code
 */
export async function joinCouple(user: User, inviteCode: string): Promise<JoinResponse> {
  const rawInviteCode = inviteCode.trim().toUpperCase();

  if (!rawInviteCode) {
    throw new AppError(400, "INVALID_INVITE_CODE", "Mã mời (inviteCode) là bắt buộc.");
  }

  const invite = await store.getInvite(rawInviteCode);
  if (!invite || new Date(invite.expiresAt).getTime() < Date.now()) {
    throw new AppError(404, "INVITE_NOT_FOUND", "Mã mời không tồn tại hoặc đã hết hạn.");
  }

  const couple = await store.getCoupleById(invite.coupleId);
  if (!couple || couple.status !== "PENDING") {
    throw new AppError(404, "INVITE_NOT_FOUND", "Mã mời không tồn tại hoặc đã hết hạn.");
  }
  if (couple.inviteCode !== rawInviteCode) {
    throw new AppError(404, "INVITE_NOT_FOUND", "Mã mời không tồn tại hoặc đã hết hạn.");
  }

  if (couple.partner1Id === user.id) {
    throw new AppError(400, "CANNOT_JOIN_OWN_CODE", "Không thể tự ghép đôi bằng mã của chính mình.");
  }

  if (await store.userAlreadyInCouple(user.id)) {
    throw new AppError(409, "COUPLE_ALREADY_PAIRED", "Bạn đang ở trong một mối quan hệ đang hoạt động khác.");
  }

  const inviterHasOtherActiveCouple = await store.inviterHasOtherActiveCouple(couple.partner1Id, couple.id);

  if (inviterHasOtherActiveCouple) {
    throw new AppError(409, "INVITER_ALREADY_PAIRED", "Người tạo mã đã ở trong mối quan hệ khác.");
  }

  const inviter = await store.getUserById(couple.partner1Id);
  if (!inviter) {
    throw new AppError(500, "USER_NOT_FOUND", "Không tìm thấy người dùng đã tạo mã mời.");
  }

  // Update couple
  couple.partner2Id = user.id;
  couple.status = "DATING";
  couple.loveStartDate = couple.loveStartDate ?? formatDate(todayUtc());
  couple.inviteCode = undefined;
  couple.inviteExpiresAt = undefined;

  // Update users
  inviter.coupleId = couple.id;
  inviter.updatedAt = new Date().toISOString();
  user.coupleId = couple.id;
  user.updatedAt = new Date().toISOString();

  await Promise.all([
    store.saveUser(inviter),
    store.saveUser(user),
    store.updateCouple(couple),
    store.deleteInvite(rawInviteCode),
    store.invalidateHomeCache(couple.id),
  ]);

  notify({
    userId: inviter.id,
    coupleId: couple.id,
    type: "pairing",
    title: "Lời mời ghép đôi đã được chấp nhận!",
    body: `${user.fullName} đã tham gia cùng bạn trên Em+.`,
    iconName: "people-outline",
    iconColor: "#7c3aed",
    iconBg: "#ede9fe",
    actionLabel: "Xem trang chủ",
    url: "/(tabs)/home",
  }).catch((err) => console.error("[Notify] Pairing notify failed:", err));

  return {
    coupleId: couple.id,
    status: displayCoupleStatus(couple.status),
    partnerInfo: {
      id: inviter.id,
      fullName: inviter.fullName,
      gender: displayGender(inviter.gender),
    },
  };
}

/**
 * Create a new couple with love start date
 */
export async function createCouple(userId: string, input: CreateCoupleDto): Promise<Couple> {
  const existingCouple = await store.getActiveCoupleForUser(userId);
  if (existingCouple) {
    throw new AppError(409, "COUPLE_ALREADY_EXISTS", "Bạn đã tạo cặp đôi.");
  }

  const inviteCode = generateInviteCode();
  const couple: Couple = {
    id: crypto.randomUUID(),
    partner1Id: userId,
    status: "PENDING",
    loveStartDate: input.loveStartDate,
    inviteCode: inviteCode,
    inviteExpiresAt: new Date(Date.now() + INVITE_CODE_TTL_SECONDS * 1000).toISOString(),
    settings: {},
    createdAt: new Date().toISOString(),
  };

  const user = await store.getUserById(userId);
  if (!user) {
    throw new AppError(404, "USER_NOT_FOUND", "Không tìm thấy người dùng.");
  }

  user.coupleId = couple.id;
  user.updatedAt = new Date().toISOString();

  await Promise.all([store.saveCouple(couple), store.saveUser(user)]);

  return couple;
}

/**
 * Update a couple's information
 */
export async function updateCouple(coupleId: string, input: UpdateCoupleDto): Promise<Couple> {
  const couple = await store.getCoupleById(coupleId);
  if (!couple) {
    throw new AppError(404, "COUPLE_NOT_FOUND", "Không tìm thấy cặp đôi.");
  }

  if (input.loveStartDate) {
    couple.loveStartDate = input.loveStartDate;
  }

  await store.updateCouple(couple);

  return couple;
}
