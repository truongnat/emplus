/**
 * Gradient stops cho LinearGradient — theo Aura, tách light/dark.
 * Dùng: colors={gradients.hero} locations={gradientLocations.hero}
 */

import { auraPalette } from "./aura-colors";

export const gradientLocations = {
  hero: [0, 0.45, 1] as const,
  /** Home hero counter card — warm coral depth + indigo lift at end */
  heroCounter: [0, 0.38, 0.72, 1] as const,
  care: [0, 0.55, 1] as const,
  budget: [0, 1] as const,
  subtle: [0, 1] as const,
};

/**
 * LinearGradient cho `HeroCard` (vùng đếm ngày) — khác screen-level `screenGradientColors.hero`.
 */
export const heroCardGradient = {
  light: [
    auraPalette.coral50,
    auraPalette.coral100,
    auraPalette.coral300,
    auraPalette.coral500,
  ] as const,
  dark: [
    auraPalette.coral900,
    "#2A1F24",
    auraPalette.coral800,
    "#3D2430",
  ] as const,
} as const;

export type AuraGradientName = keyof typeof gradientLocations;

export const screenGradientColors = {
  light: {
    hero: [auraPalette.coral50, "#FFF5F5", auraPalette.taupe50] as const,
    care: [auraPalette.coral100, auraPalette.coral50, "#FFFBF7"] as const,
    budget: ["#F0FDFA", auraPalette.taupe50] as const,
    subtle: [auraPalette.taupe50, "#FFFFFF"] as const,
  },
  dark: {
    hero: [auraPalette.taupe900, "#1A1416", auraPalette.darkBg] as const,
    care: [auraPalette.coral900, auraPalette.taupe900, auraPalette.darkBg] as const,
    budget: [auraPalette.taupe900, "#0F1A18"] as const,
    subtle: [auraPalette.darkBg, auraPalette.taupe900] as const,
  },
} as const;

export function getScreenGradientColors(isDark: boolean) {
  return isDark ? screenGradientColors.dark : screenGradientColors.light;
}
