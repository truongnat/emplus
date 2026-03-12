import type { EmotionalCycle, MaleSuggestion } from "../types.ts";
import { diffDays, parseDate } from "../utils/date.ts";

export type EmotionalPhase = "MENSTRUATION" | "FOLLICULAR" | "OVULATION" | "LUTEAL_PMS";
export type NguCanhCamXucHienThi =
  | "KY_KINH"
  | "GIAI_DOAN_NANG_LUONG"
  | "RUNG_TRUNG"
  | "CUOI_CHU_KY_NHAY_CAM";

interface EmotionalContext {
  phase: EmotionalPhase;
  badge: string;
  suggestions: string[];
  action: MaleSuggestion["callToAction"];
}

const PHASE_MAP: Record<EmotionalPhase, EmotionalContext> = {
  MENSTRUATION: {
    phase: "MENSTRUATION",
    badge: "Cần quan tâm và dịu dàng",
    suggestions: [
      "Vài ngày tới {name} có thể hơi mệt. Hãy nhẹ nhàng và kiên nhẫn hơn một chút.",
      "Một ly đồ ấm và lời hỏi thăm đúng lúc sẽ giúp cô ấy thấy được quan tâm.",
    ],
    action: {
      label: "Gợi ý đồ uống ấm",
      actionType: "MO_TAB_QUA_TANG",
      icon: "warm-drink",
    },
  },
  FOLLICULAR: {
    phase: "FOLLICULAR",
    badge: "Năng lượng tích cực",
    suggestions: [
      "Hôm nay tâm trạng của {name} đang tích cực. Hợp để lên kế hoạch hẹn hò mới.",
      "Đây là thời điểm tốt để rủ cô ấy đi trải nghiệm ngoài trời hoặc workshop.",
    ],
    action: {
      label: "Gợi ý trải nghiệm gần bạn",
      actionType: "MO_TAB_TRAI_NGHIEM",
      icon: "activity",
    },
  },
  OVULATION: {
    phase: "OVULATION",
    badge: "Giai đoạn kết nối cao",
    suggestions: [
      "Đây là giai đoạn cả năng lượng và cảm xúc đều ở mức cao. Hãy tạo một buổi hẹn nhỏ thật chỉn chu.",
      "Một cử chỉ tinh tế, như bó hoa nhỏ hoặc bữa tối yên tĩnh, sẽ rất hiệu quả hôm nay.",
    ],
    action: {
      label: "Xem gợi ý quà tinh tế",
      actionType: "MO_TAB_QUA_TANG",
      icon: "gift",
    },
  },
  LUTEAL_PMS: {
    phase: "LUTEAL_PMS",
    badge: "Giai đoạn nhạy cảm",
    suggestions: [
      "Giai đoạn này {name} có thể nhạy cảm hơn bình thường. Hãy ưu tiên lắng nghe và tránh tranh luận.",
      "Một món ăn vặt hoặc lời nhắn ngắn quan tâm sẽ giúp cô ấy dễ chịu hơn nhiều.",
    ],
    action: {
      label: "Đặt đồ ăn nhẹ",
      actionType: "MO_TAB_DO_AN",
      icon: "cake-icon",
    },
  },
};

export function hienThiNguCanhCamXuc(phase: EmotionalPhase): NguCanhCamXucHienThi {
  if (phase === "MENSTRUATION") {
    return "KY_KINH";
  }

  if (phase === "FOLLICULAR") {
    return "GIAI_DOAN_NANG_LUONG";
  }

  if (phase === "OVULATION") {
    return "RUNG_TRUNG";
  }

  return "CUOI_CHU_KY_NHAY_CAM";
}

export function getEmotionalPhase(cycle: EmotionalCycle, today: Date): EmotionalPhase {
  const cycleStart = parseDate(cycle.startDate);
  const daysSinceStart = diffDays(cycleStart, today);
  const normalized = ((daysSinceStart % cycle.cycleDuration) + cycle.cycleDuration) % cycle.cycleDuration;
  const dayInCycle = normalized + 1;

  if (dayInCycle <= cycle.periodDuration) {
    return "MENSTRUATION";
  }

  if (dayInCycle <= 13) {
    return "FOLLICULAR";
  }

  if (dayInCycle <= 16) {
    return "OVULATION";
  }

  return "LUTEAL_PMS";
}

export function buildMaleSuggestions(partnerName: string, phase: EmotionalPhase): {
  emotionalStatusContext: NguCanhCamXucHienThi;
  suggestions: MaleSuggestion[];
  badge: string;
} {
  const context = PHASE_MAP[phase];

  const suggestions = context.suggestions.map((template, index) => ({
    priority: index + 1,
    text: template.replaceAll("{name}", partnerName),
    callToAction: context.action,
  }));

  return {
    emotionalStatusContext: hienThiNguCanhCamXuc(context.phase),
    suggestions,
    badge: context.badge,
  };
}
