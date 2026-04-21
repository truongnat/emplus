/**
 * Em+ LookAway-inspired color palette V2
 * 
 * Completely new design following LookAway discipline:
 * - Warm cream base that reduces glare while maintaining warmth
 * - Terracotta/burnt sienna as the single main accent
 * - Muted, calm support colors (sage, warm brown)
 * - Matte surfaces with thin warm borders
 * - Calm, quiet visual hierarchy
 * 
 * Designed from scratch to address glare issues while staying true to LookAway principles.
 */

// ─── PRIMITIVE PALETTE ────────────────────────────────────
export const auraPalette = {
  // 1. PRIMARY: Terracotta / burnt sienna (main accent only)
  terracotta50: "#F5E6DC",
  terracotta100: "#EAD5C6",
  terracotta200: "#DFC9B5",
  terracotta300: "#D4BAA4",
  terracotta400: "#C9A890",
  terracotta500: "#B86A4A",
  terracotta600: "#A95E40",
  terracotta700: "#8F4E36",
  terracotta800: "#72402D",
  terracotta900: "#563123",

  // 2. SECONDARY: Warm brown support (quiet, not competing)
  warmBrown50: "#F0E6DD",
  warmBrown100: "#E5D9CD",
  warmBrown200: "#D9CBB9",
  warmBrown300: "#C9B7A3",
  warmBrown400: "#B3A38D",
  warmBrown500: "#8F7A63",
  warmBrown600: "#766252",
  warmBrown700: "#5E4D40",
  warmBrown800: "#4A3B32",
  warmBrown900: "#362A24",

  // 3. ACCENT: Muted sage support (very subtle)
  sage50: "#E8EBE6",
  sage100: "#D8E0D6",
  sage200: "#C4CEC0",
  sage300: "#AAB8A8",
  sage400: "#8FA488",
  sage500: "#718764",
  sage600: "#5E7053",
  sage700: "#4C5B44",
  sage800: "#3C4937",
  sage900: "#313B2D",

  // 4. NEUTRAL: Warm cream / paper base (reduces glare)
  cream50: "#F2EBE3",
  cream100: "#E8DFD5",
  cream200: "#DCD1C5",
  cream300: "#CDBBA9",
  cream400: "#B8A692",
  cream500: "#9A8976",
  cream600: "#7D6E5C",
  cream700: "#62564A",
  cream800: "#4A4036",
  cream900: "#302A24",

  // 5. BACKGROUND & SURFACE
  lightBg: "#F2EBE3",
  darkBg: "#302A24",
  darkSurf: "#3B342E",
  darkBord: "#4D453E",

  // 6. SPECIAL: Subtle highlights
  champagne: "#D4B88A",
  warmGray: "#8F7A63",

  superlike: "#8F7A63",
  heart: "#B86A4A",

  // Gradients (subtle, not glossy)
  gradTerracotta: ["#C9A890", "#A95E40"] as [string, string],
  gradWarmBrown: ["#C9B7A3", "#766252"] as [string, string],
  gradSage: ["#AAB8A8", "#5E7053"] as [string, string],
  gradChampagne: ["#E2D3B5", "#D4B88A"] as [string, string],
  gradDeep: ["#3B342E", "#302A24"] as [string, string],

  // Legacy aliases (deprecated — use terracotta* instead)
  /** @deprecated Use terracotta50 */
  coral50: "#F5E6DC",
  /** @deprecated Use terracotta100 */
  coral100: "#EAD5C6",
  /** @deprecated Use terracotta200 */
  coral200: "#DFC9B5",
  /** @deprecated Use terracotta300 */
  coral300: "#D4BAA4",
  /** @deprecated Use terracotta400 */
  coral400: "#C9A890",
  /** @deprecated Use terracotta500 */
  coral500: "#B86A4A",
  /** @deprecated Use terracotta600 */
  coral600: "#A95E40",
  /** @deprecated Use terracotta700 */
  coral700: "#8F4E36",
  /** @deprecated Use terracotta800 */
  coral800: "#72402D",
  /** @deprecated Use terracotta900 */
  coral900: "#563123",
  /** @deprecated Use gradTerracotta */
  gradCoral: ["#C9A890", "#A95E40"] as [string, string],
  /** @deprecated Use gradWarmBrown */
  gradIndigo: ["#C9B7A3", "#766252"] as [string, string],
  /** @deprecated Use gradSage */
  gradTeal: ["#AAB8A8", "#5E7053"] as [string, string],
} as const;

// ─── SEMANTIC COLOR MAPPINGS ──────────────────────────────

export const auraGradients = {
  primary: auraPalette.gradTerracotta,
  secondary: auraPalette.gradWarmBrown,
  accent: auraPalette.gradSage,
  premium: auraPalette.gradChampagne,
  surface: auraPalette.gradDeep,
};

export const auraAvatarGradients: [string, string][] = [
  ["#D4BAA4", "#A95E40"],
  ["#E2D3B5", "#B48A56"],
  ["#C9B7A3", "#766252"],
  ["#C4CEC0", "#5E7053"],
  ["#DFC9B5", "#8F4E36"],
  ["#DCD1C5", "#7D6E5C"],
];

export function getAuraAvatarGradient(id: string | number): [string, string] {
  const index = typeof id === 'number' ? id : (id.length % auraAvatarGradients.length);
  return auraAvatarGradients[index % auraAvatarGradients.length];
}
