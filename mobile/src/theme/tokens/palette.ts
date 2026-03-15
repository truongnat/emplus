/**
 * tokens/palette.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Primitive color palette - không import bất kỳ file nào khác.
 */

export const palette = {
  // Violet (brand)
  violet50: "#F5F3FF",
  violet100: "#EDE9FE",
  violet200: "#DDD6FE",
  violet300: "#C4B5FD",
  violet400: "#A78BFA",
  violet500: "#8B5CF6",
  violet600: "#7C3AED",
  violet700: "#6D28D9",
  violet800: "#5B21B6",
  violet900: "#4C1D95",

  // Zinc (neutral)
  zinc50: "#FAFAFA",
  zinc100: "#F4F4F5",
  zinc200: "#E4E4E7",
  zinc300: "#D4D4D8",
  zinc400: "#A1A1AA",
  zinc500: "#71717A",
  zinc600: "#52525B",
  zinc700: "#3F3F46",
  zinc800: "#27272A",
  zinc900: "#18181B",
  zinc950: "#09090B",

  // Status
  red50: "#FEF2F2",
  red500: "#EF4444",
  red600: "#DC2626",
  red900: "#7F1D1D",
  amber50: "#FFFBEB",
  amber500: "#F59E0B",
  amber600: "#D97706",
  amber900: "#78350F",
  green50: "#F0FDF4",
  green500: "#22C55E",
  green600: "#16A34A",
  green900: "#14532D",
  blue50: "#EFF6FF",
  blue500: "#3B82F6",
  blue600: "#2563EB",
  blue900: "#1E3A5F",

  // Pure
  white: "#FFFFFF",
  black: "#000000",
  transparent: "transparent",
} as const;

export type PaletteKey = keyof typeof palette;
