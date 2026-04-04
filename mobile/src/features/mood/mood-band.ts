/** 0–100 stress slider: xanh (bình tĩnh) → hồng (căng). */
export type MoodBand = "calm" | "steady" | "worried" | "tense";

export function moodBandFromValue(value: number): MoodBand {
  const v = Math.min(100, Math.max(0, value));
  if (v < 25) return "calm";
  if (v < 50) return "steady";
  if (v < 75) return "worried";
  return "tense";
}

export const MOOD_BAND_LABEL_VI: Record<MoodBand, string> = {
  calm: "Yên tâm",
  steady: "Ổn định",
  worried: "Lo lắng",
  tense: "Căng thẳng",
};
