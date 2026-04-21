/**
 * Em+ — product tokens layered on top of the semantic theme.
 * Updated for the cream + terracotta migration.
 */

import { radius, size as sizeScale } from "./tokens";

/** Chiều cao ô nhập theo size (đồng bộ size.input* trong tokens). */
export const emplusInputHeight = {
  sm: sizeScale.inputSm,
  md: sizeScale.inputMd,
  lg: sizeScale.inputLg,
} as const;

export type EmplusInputSize = keyof typeof emplusInputHeight;

/** Bo góc field — hơi lớn cho cảm giác mềm, hiện đại. */
export const emplusInputRadiusPx = 14;

/** Có thể dùng theme.radius.lg nếu muốn đồng bộ global. */
export const emplusInputRadius = radius.lg;

/** Viền khi focus — bark brown, calm hơn nhưng vẫn đủ contrast. */
export const emplusFocusBorder = {
  light: "#8F6A52",
  dark: "#C2A691",
} as const;

/** Scale nhấn nút (atoms/Button dùng Animated ~0.96). */
export const emplusMotion = {
  pressScale: 0.96,
} as const;

/** Khoảng cách label ↔ field và giữa các field (auth / form dài). */
export const emplusFormSpacing = {
  labelToField: 12,
  betweenFields: 12,
  sectionGap: 24,
} as const;

/**
 * Màn đăng nhập — bám spec Figma Devyn (Login Screen, node 12:3654), light.
 * Dark mode vẫn dùng theme; chỉ áp khi `isDark === false`.
 */
export const loginFigmaLight = {
  primary: "#B86A4A",
  titleDark: "#261F1B",
  subtitle: "#66564D",
  footerMuted: "#836F63",
  footerLink: "#3A302B",
  tagline: "#66564D",
  inputBg: "rgba(184, 106, 74, 0.06)",
  inputBorder: "rgba(102, 86, 77, 0.16)",
  /** Pill h-48 → bo ~24. */
  inputPillRadius: 24,
} as const;

/**
 * Surface mềm cho ô nhập trên GlassCard (login / OTP / pairing).
 * Dark mode bám Aura — đồng bộ ticket-55+.
 */
export const authSoftFieldSurface = {
  light: {
    backgroundColor: "rgba(255,253,252,0.82)",
    borderColor: "rgba(131,111,99,0.14)",
  },
  dark: {
    backgroundColor: "rgba(255,255,255,0.09)",
    borderColor: "rgba(194,166,145,0.20)",
  },
} as const;

/** expo-blur intensity cho GlassCard auth (light / dark). */
export const authGlassBlurIntensity = {
  light: 18,
  dark: 38,
} as const;

/**
 * Home trên lưới nền — dark: thẻ nổi bán trong + viền coral (đồng bộ auth Aura).
 * Light: dùng `colors.surface.*` trong component.
 */
export const homeDarkGridCard = {
  backgroundColor: "rgba(255,255,255,0.09)",
  borderColor: "rgba(194,166,145,0.18)",
} as const;

/** Ô lồng (icon tile, empty state) trên thẻ home dark. */
export const homeDarkGridInset = {
  backgroundColor: "rgba(255,255,255,0.07)",
  borderColor: "rgba(194,166,145,0.14)",
} as const;

/** Nút thông báo góc phải — dark. */
export const homeDarkChromeButton = {
  backgroundColor: "rgba(255,255,255,0.10)",
  borderColor: "rgba(194,166,145,0.16)",
} as const;
