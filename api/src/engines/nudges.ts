import type { NudgeType } from "../types.ts";

export const NUDGE_MESSAGES: Record<NudgeType, string> = {
  POKE: "Người ấy đang chọc bạn này 😝",
  HUG: "Người ấy gửi bạn một cái ôm 🤗",
  MISS_YOU: "Người ấy đang nhớ bạn đó 🥺",
  KISS: "Người ấy gửi bạn một nụ hôn gió 😘",
  ANGRY: "Người ấy đang dỗi bạn đó 😤",
  MAKE_UP: "Người ấy muốn làm hòa với bạn 🫶",
  EAT_TOGETHER: "Người ấy rủ bạn đi ăn đó 🍜",
  CALL_ME: "Người ấy muốn bạn gọi lại 📞",
};

export function messageForNudgeType(type: NudgeType): string {
  return NUDGE_MESSAGES[type];
}

export function secondsSince(dateIso: string, now = new Date()): number {
  return Math.floor((now.getTime() - new Date(dateIso).getTime()) / 1000);
}
