/**
 * Couple service - handles couple-related business logic
 */

import { store } from "../store.ts";
import type { Couple, User } from "../types.ts";
import { INVITE_CODE_TTL_SECONDS } from "../constants/index.ts";
import { generateInviteCode } from "../shared/code.ts";
import { formatDate, todayUtc } from "../shared/date.ts";
import { hienThiGioiTinh, hienThiTrangThaiCapDoi } from "../utils/presentation.ts";

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
    const error = new Error("Bạn đã được ghép đôi trong một mối quan hệ khác.") as Error & { status: number; code: string };
    error.status = 409;
    error.code = "COUPLE_ALREADY_PAIRED";
    throw error;
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
    const error = new Error("Mã mời (inviteCode) là bắt buộc.") as Error & { status: number; code: string };
    error.status = 400;
    error.code = "INVALID_INVITE_CODE";
    throw error;
  }

  const invite = await store.getInvite(rawInviteCode);
  if (!invite || new Date(invite.expiresAt).getTime() < Date.now()) {
    const error = new Error("Mã mời không tồn tại hoặc đã hết hạn.") as Error & { status: number; code: string };
    error.status = 404;
    error.code = "INVITE_NOT_FOUND";
    throw error;
  }

  const couple = await store.getCoupleById(invite.coupleId);
  if (!couple || couple.status !== "CHO_GHEP_DOI") {
    const error = new Error("Mã mời không tồn tại hoặc đã hết hạn.") as Error & { status: number; code: string };
    error.status = 404;
    error.code = "INVITE_NOT_FOUND";
    throw error;
  }
  if (couple.inviteCode !== rawInviteCode) {
    const error = new Error("Mã mời không tồn tại hoặc đã hết hạn.") as Error & { status: number; code: string };
    error.status = 404;
    error.code = "INVITE_NOT_FOUND";
    throw error;
  }

  if (couple.partner1Id === user.id) {
    const error = new Error("Không thể tự ghép đôi bằng mã của chính mình.") as Error & { status: number; code: string };
    error.status = 400;
    error.code = "CANNOT_JOIN_OWN_CODE";
    throw error;
  }

  if (await store.userAlreadyInCouple(user.id)) {
    const error = new Error("Bạn đang ở trong một mối quan hệ đang hoạt động khác.") as Error & { status: number; code: string };
    error.status = 409;
    error.code = "COUPLE_ALREADY_PAIRED";
    throw error;
  }

  const inviterHasOtherActiveCouple = await store.inviterHasOtherActiveCouple(couple.partner1Id, couple.id);

  if (inviterHasOtherActiveCouple) {
    const error = new Error("Người tạo mã đã ở trong mối quan hệ khác.") as Error & { status: number; code: string };
    error.status = 409;
    error.code = "INVITER_ALREADY_PAIRED";
    throw error;
  }

  const inviter = await store.getUserById(couple.partner1Id);
  if (!inviter) {
    const error = new Error("Không tìm thấy người dùng đã tạo mã mời.") as Error & { status: number; code: string };
    error.status = 500;
    error.code = "USER_NOT_FOUND";
    throw error;
  }

  // Update couple
  couple.partner2Id = user.id;
  couple.status = "DANG_YEU";
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

  return {
    coupleId: couple.id,
    status: hienThiTrangThaiCapDoi(couple.status),
    partnerInfo: {
      id: inviter.id,
      fullName: inviter.fullName,
      gender: hienThiGioiTinh(inviter.gender),
    },
  };
}
