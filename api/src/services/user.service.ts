/**
 * User service - handles user profile business logic
 */

import { store } from "../store.ts";
import type { User, Gender } from "../types.ts";
import { chuanHoaGioiTinhDauVao } from "../utils/presentation.ts";

export interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  nickname?: string;
  avatarUrl?: string;
  gender: Gender;
  dob?: string;
  timezone: string;
  isActive: boolean;
  isAdmin: boolean;
  createdAt: string;
  updatedAt: string;
  coupleId?: string;
}

/**
 * Get user profile by ID
 */
export async function getUserProfile(userId: string): Promise<UserProfile | null> {
  const user = await store.getUserById(userId);
  if (!user) {
    return null;
  }

  // Get couple ID if user is in a couple
  const couple = await store.getActiveCoupleForUser(userId);

  return {
    id: user.id,
    email: user.email,
    fullName: user.fullName,
    nickname: user.nickname,
    avatarUrl: user.avatarUrl,
    gender: user.gender,
    dob: user.dob,
    timezone: user.timezone,
    isActive: user.isActive,
    isAdmin: user.isAdmin || false,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
    coupleId: couple?.id,
  };
}

/**
 * Update user profile
 */
export async function updateUserProfile(
  userId: string,
  data: {
    fullName?: string;
    nickname?: string;
    avatarUrl?: string;
    gender?: string;
    dob?: string;
    timezone?: string;
  },
): Promise<UserProfile> {
  const user = await store.getUserById(userId);
  if (!user) {
    const error = new Error("Không tìm thấy người dùng.") as Error & { status: number; code: string };
    error.status = 404;
    error.code = "USER_NOT_FOUND";
    throw error;
  }

  const updatedUser: User = {
    ...user,
    fullName: data.fullName?.trim() ?? user.fullName,
    nickname: data.nickname !== undefined ? (data.nickname?.trim() || undefined) : user.nickname,
    avatarUrl: data.avatarUrl !== undefined ? (data.avatarUrl?.trim() || undefined) : user.avatarUrl,
    gender: data.gender ? chuanHoaGioiTinhDauVao(data.gender) : user.gender,
    dob: data.dob ?? user.dob,
    timezone: data.timezone ?? user.timezone,
    updatedAt: new Date().toISOString(),
  };

  await store.saveUser(updatedUser);

  // Get couple ID if user is in a couple
  const couple = await store.getActiveCoupleForUser(userId);

  return {
    id: updatedUser.id,
    email: updatedUser.email,
    fullName: updatedUser.fullName,
    nickname: updatedUser.nickname,
    avatarUrl: updatedUser.avatarUrl,
    gender: updatedUser.gender,
    dob: updatedUser.dob,
    timezone: updatedUser.timezone,
    isActive: updatedUser.isActive,
    isAdmin: updatedUser.isAdmin || false,
    createdAt: updatedUser.createdAt,
    updatedAt: updatedUser.updatedAt,
    coupleId: couple?.id,
  };
}
