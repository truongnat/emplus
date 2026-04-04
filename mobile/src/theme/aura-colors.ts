/**
 * Aura Premium Color Tokens
 * A refined, romantic, and luxury palette.
 * Based on warm coral, indigo, teal, champagne gold, and ivory.
 */

import { palette } from "./tokens/palette";

// ─── PRIMITIVE PALETTE ────────────────────────────────────
export const auraPalette = {
  // 1. PRIMARY: Warm Coral (Idea doc #FF6B81)
  coral50: palette.coral50,
  coral100: palette.coral100,
  coral200: palette.coral200,
  coral300: palette.coral300,
  coral400: palette.coral400,
  coral500: palette.coral500,   // ← Primary Brand Accent
  coral600: palette.coral600,
  coral700: palette.coral700,
  coral800: palette.coral800,
  coral900: palette.coral900,

  // 2. SECONDARY: Indigo (Idea doc #7B61FF)
  indigo50: palette.indigo50,
  indigo100: palette.indigo100,
  indigo200: palette.indigo200,
  indigo300: palette.indigo300,
  indigo400: palette.indigo400,
  indigo500: palette.indigo500,
  indigo600: palette.indigo600,
  indigo700: palette.indigo700,
  indigo800: palette.indigo800,
  indigo900: palette.indigo900,

  // 3. ACCENT: Teal (Idea doc #4FD1C5)
  teal50: palette.teal50,
  teal100: palette.teal100,
  teal200: palette.teal200,
  teal300: palette.teal300,
  teal400: palette.teal400,
  teal500: palette.teal500,
  teal600: palette.teal600,
  teal700: palette.teal700,
  teal800: palette.teal800,
  teal900: palette.teal900,

  // 4. NEUTRAL: Warm Taupe (Eliminate eye strain, keep it warm)
  taupe50: "#FAFAF9",
  taupe100: "#F5F5F4",
  taupe200: "#E7E5E4",
  taupe300: "#D6D3D1",
  taupe400: "#A8A29E",
  taupe500: "#78716C",
  taupe600: "#57534E",
  taupe700: "#44403C",
  taupe800: "#292524",
  taupe900: "#1C1917",

  // 5. BACKGROUND & SURFACE: Cashmere & Cocoa
  lightBg: "#FCF9F8",
  darkBg: "#1A1416",
  darkSurf: "#261C20",
  darkBord: "#362A2E",

  // 6. SPECIAL: Champagne & Amethyst (highlights)
  champagne: "#FDE047",
  amethyst: "#A855F7",

  superlike: "#A855F7",
  heart: palette.coral500,

  // Gradients
  gradCoral: ["#FF8FA3", "#E5556B"] as [string, string],
  gradIndigo: ["#A5B4FC", "#6D4AE6"] as [string, string],
  gradTeal: ["#5EEAD4", "#0D9488"] as [string, string],
  gradChampagne: ["#FEF08A", "#FDE047"] as [string, string],
  gradDeep: ["#261C20", "#1A1416"] as [string, string],

  // Legacy aliases (deprecated — use coral* instead)
  /** @deprecated Use coral50 */
  rose50: palette.coral50,
  /** @deprecated Use coral100 */
  rose100: palette.coral100,
  /** @deprecated Use coral200 */
  rose200: palette.coral200,
  /** @deprecated Use coral300 */
  rose300: palette.coral300,
  /** @deprecated Use coral400 */
  rose400: palette.coral400,
  /** @deprecated Use coral500 */
  rose500: palette.coral500,
  /** @deprecated Use coral600 */
  rose600: palette.coral600,
  /** @deprecated Use coral700 */
  rose700: palette.coral700,
  /** @deprecated Use coral800 */
  rose800: palette.coral800,
  /** @deprecated Use coral900 */
  rose900: palette.coral900,
  /** @deprecated Use gradCoral */
  gradRose: ["#FF8FA3", "#E5556B"] as [string, string],
} as const;

// ─── SEMANTIC COLOR MAPPINGS ──────────────────────────────

export const auraGradients = {
  primary: auraPalette.gradCoral,
  secondary: auraPalette.gradIndigo,
  accent: auraPalette.gradTeal,
  premium: auraPalette.gradChampagne,
  surface: auraPalette.gradDeep,
};

export const auraAvatarGradients: [string, string][] = [
  ["#FDA4AF", "#E5556B"], // Coral
  ["#FDE047", "#A16207"], // Gold
  ["#C084FC", "#7E22CE"], // Purple
  ["#60A5FA", "#1D4ED8"], // Blue
  ["#FB923C", "#C2410C"], // Orange
  ["#4ADE80", "#15803D"], // Green
];

export function getAuraAvatarGradient(id: string | number): [string, string] {
  const index = typeof id === 'number' ? id : (id.length % auraAvatarGradients.length);
  return auraAvatarGradients[index % auraAvatarGradients.length];
}
