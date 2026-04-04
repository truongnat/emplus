/**
 * Em Plus — token sản phẩm (form, focus) bổ sung cho primitives trong tokens/index.
 * Màu focus tách khỏi brand coral để đủ contrast / a11y.
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

/** Viền khi focus — indigo, không trùng brand. */
export const emplusFocusBorder = {
  light: "#6366F1",
  dark: "#818CF8",
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
  primary: "#FF8FA3",
  titleDark: "#2C3E50",
  subtitle: "#8A94A6",
  footerMuted: "#6D6D6D",
  footerLink: "#2C2C2C",
  tagline: "#6D6D6D",
  inputBg: "rgba(28, 40, 51, 0.1)",
  inputBorder: "rgba(28, 40, 51, 0.2)",
  /** Pill h-48 → bo ~24. */
  inputPillRadius: 24,
} as const;
