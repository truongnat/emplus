/**
 * tokens/index.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Single source of truth cho toàn bộ design system.
 *
 * Nguyên tắc:
 *  1. Primitive tokens  → raw values (color hex, px numbers)
 *  2. Semantic tokens   → reference primitives by role (primary, surface...)
 *  3. Component tokens  → reference semantics (button.bg, input.border...)
 *
 * "as const" → TypeScript infer literal types, autocomplete đầy đủ.
 * Không import bất kỳ thứ gì từ React Native ở file này → pure data.
 */

// ─── 1. Primitive color palette ───────────────────────────────────────────────

import { palette } from "./palette";
export { palette };
export type { PaletteKey } from "./palette";

// ─── 2. Spacing scale (4pt grid) ─────────────────────────────────────────────

export const space = {
  0: 0,
  0.5: 2,
  1: 4,
  1.5: 6,
  2: 8,
  2.5: 10,
  3: 12,
  3.5: 14,
  4: 16,
  5: 20,
  6: 24,
  7: 28,
  8: 32,
  9: 36,
  10: 40,
  11: 44,
  12: 48,
  14: 56,
  16: 64,
  20: 80,
  24: 96,
  32: 128,
} as const;

export type SpaceKey = keyof typeof space;

// ─── 3. Typography ────────────────────────────────────────────────────────────

export const fontSize = {
  "2xs": 10,
  xs: 11,
  sm: 13,
  md: 15,
  lg: 17,
  xl: 20,
  "2xl": 24,
  "3xl": 30,
  "4xl": 36,
  "5xl": 48,
} as const;

export const fontWeight = {
  thin: "100",
  light: "300",
  regular: "400",
  medium: "500",
  semibold: "600",
  bold: "700",
  black: "900",
} as const;

export const lineHeight = {
  none: 1,
  tight: 1.2,
  snug: 1.375,
  normal: 1.5,
  relaxed: 1.625,
  loose: 2,
} as const;

export const letterSpacing = {
  tighter: -0.8,
  tight: -0.4,
  normal: 0,
  wide: 0.4,
  wider: 0.8,
  widest: 1.6,
} as const;

export const fontFamily = {
  sans: "System", // override per platform
  serif: "Georgia",
  mono: "Courier New",
} as const;

// ─── 4. Border radius ─────────────────────────────────────────────────────────

export const radius = {
  none: 0,
  xs: 4,
  sm: 6,
  md: 10,
  lg: 14,
  xl: 20,
  "2xl": 28,
  full: 9999,
} as const;

// ─── 5. Border width ──────────────────────────────────────────────────────────

export const borderWidth = {
  0: 0,
  thin: 0.5,
  sm: 1,
  md: 1.5,
  lg: 2,
  xl: 3,
} as const;

// ─── 6. Shadow (iOS + Android elevation) ─────────────────────────────────────

export const shadow = {
  none: {
    shadowColor: "transparent",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  xs: {
    shadowColor: palette.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  sm: {
    shadowColor: palette.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  md: {
    shadowColor: palette.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  lg: {
    shadowColor: palette.black,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.14,
    shadowRadius: 16,
    elevation: 10,
  },
  xl: {
    shadowColor: palette.black,
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.18,
    shadowRadius: 32,
    elevation: 20,
  },
  "2xl": {
    shadowColor: palette.black,
    shadowOffset: { width: 0, height: 24 },
    shadowOpacity: 0.22,
    shadowRadius: 48,
    elevation: 30,
  },
} as const;

// ─── 7. Motion ────────────────────────────────────────────────────────────────

export const duration = {
  instant: 0,
  fast: 150,
  normal: 250,
  slow: 400,
  slower: 600,
  slowest: 900,
} as const;

export const spring = {
  // For UI feedback (button press, toggle)
  snappy: { damping: 20, stiffness: 400, mass: 0.8 },
  // For layout transitions (sheet, modal)
  smooth: { damping: 28, stiffness: 350, mass: 0.9 },
  // For large components (bottom sheet close)
  gentle: { damping: 32, stiffness: 280, mass: 1.0 },
  // For micro-interactions (checkmark, success) - smooth without bounce
  bouncy: { damping: 25, stiffness: 300, mass: 0.9 },
  // No bounce (strict)
  stiff: { damping: 50, stiffness: 400, mass: 1.0 },
} as const;

// ─── 8. Z-index scale ─────────────────────────────────────────────────────────

export const zIndex = {
  hide: -1,
  base: 0,
  raised: 1,
  dropdown: 100,
  sticky: 200,
  overlay: 300,
  modal: 400,
  popover: 500,
  toast: 600,
  tooltip: 700,
} as const;

// ─── 9. Breakpoints ───────────────────────────────────────────────────────────

export const breakpoints = {
  sm: 375, // iPhone SE
  md: 430, // iPhone 15 Pro Max
  lg: 768, // iPad mini
  xl: 1024, // iPad Pro
  "2xl": 1280,
} as const;

// ─── 10. Size scale (component heights) ──────────────────────────────────────

export const size = {
  // Touch targets (minimum 44pt per Apple HIG)
  touchMin: 44,
  // Common heights
  inputSm: 36,
  inputMd: 48,
  inputLg: 56,
  buttonSm: 32,
  buttonMd: 44,
  buttonLg: 52,
  // Nav
  tabBar: 56,
  header: 56,
  // Avatar
  avatarXs: 24,
  avatarSm: 32,
  avatarMd: 44,
  avatarLg: 64,
  avatarXl: 96,
} as const;

// ─── 11. Icon size ────────────────────────────────────────────────────────────

export const iconSize = {
  xs: 12,
  sm: 16,
  md: 20,
  lg: 24,
  xl: 32,
} as const;

// ─── Master tokens export ─────────────────────────────────────────────────────

export const tokens = {
  palette,
  space,
  fontSize,
  fontWeight,
  lineHeight,
  letterSpacing,
  fontFamily,
  radius,
  borderWidth,
  shadow,
  duration,
  spring,
  zIndex,
  breakpoints,
  size,
  iconSize,
} as const;

export type Tokens = typeof tokens;

// Alias for backwards compatibility
export const fonts = fontFamily;
export type Fonts = typeof fontFamily;

export * from "./semantic";
