/**
 * Aura Dating App Color Tokens
 * Warm romantic palette - Alternative to Telegram blue
 */

// ─── PRIMITIVE PALETTE ────────────────────────────────────
export const auraPalette = {
  // Aura Rose (thay thế Telegram Blue)
  rose50: "rgba(232, 84, 122, 0.10)",
  rose100: "#FFD6E4",
  rose200: "#FF8FAB",
  rose400: "#E8547A", // ← ACCENT CHÍNH
  rose600: "#C73D60",
  rose800: "#8B2040",
  rose900: "#5C0E27",

  // Gold — Match / Premium / Super Like
  gold50: "rgba(242, 166, 90, 0.12)",
  gold200: "#FFCF91",
  gold400: "#F2A65A", // gold accent
  gold600: "#D4842A",

  // Super Like — giữ blue để tương phản
  skyBlue: "#5AC8FA",

  // Backgrounds LIGHT (warm ivory thay cold gray)
  ivoryWhite: "#FFFBF9", // bg — card, elevated
  blushLight: "#FFF3F0", // bg2 — page background
  blushMid: "#FFE8E3", // bg3 — pressed, input

  // Backgrounds DARK (warm dark thay cold dark)
  warmBlack: "#1C1014", // bg dark
  warmSurface: "#28181E", // bg2 dark
  warmPressed: "#351F28", // bg3 dark

  // Text LIGHT
  inkWarm: "#1C0F14", // text1 — primary
  dustyRose: "#6B4751", // text2 — secondary
  ashRose: "#A8808A", // text3 — muted

  // Text DARK
  creamWhite: "#FAF0F2", // text1 dark
  softCream: "#C4969E", // text2 dark
  mutedRose: "#7A5860", // text3 dark

  // Semantic
  systemGreen: "#34C759",
  systemOrange: "#FF9500",
  systemRed: "#FF3B30",

  // Avatar Gradients — warm romantic 6 màu
  gradRose: ["#FF8FAB", "#E8547A"] as [string, string],
  gradSunset: ["#FFB17A", "#F2784B"] as [string, string],
  gradLavender: ["#C8A4F8", "#9B72E8"] as [string, string],
  gradCoral: ["#FF9999", "#E85C5C"] as [string, string],
  gradGold: ["#FFD180", "#F2A046"] as [string, string],
  gradBerry: ["#E891C4", "#C84D9E"] as [string, string],
} as const;

// ─── SEMANTIC COLOR TOKENS ────────────────────────────────
export interface AuraColorTokens {
  accent: string;
  accentDeep: string;
  accentLight: string;
  accentGlow: string;

  gold: string;
  goldLight: string;
  superlike: string;
  heartColor: string;

  bg: string;
  bg2: string;
  bg3: string;

  text1: string;
  text2: string;
  text3: string;

  bubbleOut: string;
  bubbleOutText: string;
  bubbleIn: string;
  bubbleInText: string;

  success: string;
  warning: string;
  danger: string;

  border: string;
  borderMid: string;
  borderRose: string;
  divider: string;

  glassBg: string;
  glassBorder: string;

  avatarGradients: [string, string][];
}

export const auraLightColors: AuraColorTokens = {
  accent: auraPalette.rose400,
  accentDeep: auraPalette.rose600,
  accentLight: auraPalette.rose50,
  accentGlow: "rgba(232, 84, 122, 0.28)",

  gold: auraPalette.gold400,
  goldLight: auraPalette.gold50,
  superlike: auraPalette.skyBlue,
  heartColor: auraPalette.rose400,

  bg: auraPalette.ivoryWhite,
  bg2: auraPalette.blushLight,
  bg3: auraPalette.blushMid,

  text1: auraPalette.inkWarm,
  text2: auraPalette.dustyRose,
  text3: auraPalette.ashRose,

  bubbleOut: auraPalette.rose400,
  bubbleOutText: "#FFFFFF",
  bubbleIn: auraPalette.ivoryWhite,
  bubbleInText: auraPalette.inkWarm,

  success: auraPalette.systemGreen,
  warning: auraPalette.systemOrange,
  danger: auraPalette.systemRed,

  border: "rgba(232, 84, 122, 0.10)",
  borderMid: "rgba(232, 84, 122, 0.20)",
  borderRose: "rgba(232, 84, 122, 0.30)",
  divider: "rgba(232, 84, 122, 0.07)",

  glassBg: "rgba(255, 243, 240, 0.85)",
  glassBorder: "rgba(232, 84, 122, 0.15)",

  avatarGradients: [
    auraPalette.gradRose,
    auraPalette.gradSunset,
    auraPalette.gradLavender,
    auraPalette.gradCoral,
    auraPalette.gradGold,
    auraPalette.gradBerry,
  ],
};

export const auraDarkColors: AuraColorTokens = {
  accent: auraPalette.rose400,
  accentDeep: auraPalette.rose600,
  accentLight: "rgba(232, 84, 122, 0.15)",
  accentGlow: "rgba(232, 84, 122, 0.35)",

  gold: auraPalette.gold400,
  goldLight: "rgba(242, 166, 90, 0.15)",
  superlike: auraPalette.skyBlue,
  heartColor: auraPalette.rose400,

  bg: auraPalette.warmBlack,
  bg2: auraPalette.warmSurface,
  bg3: auraPalette.warmPressed,

  text1: auraPalette.creamWhite,
  text2: auraPalette.softCream,
  text3: auraPalette.mutedRose,

  bubbleOut: auraPalette.rose400,
  bubbleOutText: "#FFFFFF",
  bubbleIn: auraPalette.warmSurface,
  bubbleInText: auraPalette.creamWhite,

  success: auraPalette.systemGreen,
  warning: auraPalette.systemOrange,
  danger: auraPalette.systemRed,

  border: "rgba(232, 84, 122, 0.12)",
  borderMid: "rgba(232, 84, 122, 0.22)",
  borderRose: "rgba(232, 84, 122, 0.35)",
  divider: "rgba(232, 84, 122, 0.08)",

  glassBg: "rgba(28, 16, 20, 0.82)",
  glassBorder: "rgba(232, 84, 122, 0.18)",

  avatarGradients: auraLightColors.avatarGradients,
};

// Helper: Get avatar gradient from userId
export function getAuraAvatarGradient(
  userId: number | string,
): [string, string] {
  const list = auraLightColors.avatarGradients;
  const idx =
    typeof userId === "number"
      ? userId % list.length
      : (userId.charCodeAt(0) + userId.charCodeAt(userId.length - 1)) %
        list.length;
  return list[idx];
}
