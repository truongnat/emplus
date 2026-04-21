/**
 * Em+ light-first palette after the LookAway-derived migration.
 * The app keeps warmth, but shifts away from glossy romantic energy:
 * - cream base instead of pure white
 * - terracotta as the main accent
 * - quieter support colors
 */

// ─── PRIMITIVE PALETTE ────────────────────────────────────
export const auraPalette = {
  // 1. PRIMARY: Terracotta / burnt sienna
  coral50: "#F2E6DD",
  coral100: "#E9DBD0",
  coral200: "#DFCFC2",
  coral300: "#D4B8A8",
  coral400: "#C8A090",
  coral500: "#B86A4A",
  coral600: "#A95E40",
  coral700: "#8F4E36",
  coral800: "#72402D",
  coral900: "#563123",

  // 2. SECONDARY: dusty bark / warm brown support
  indigo50: "#EFE5DC",
  indigo100: "#E3D7CD",
  indigo200: "#D6C5B5",
  indigo300: "#C4AF9D",
  indigo400: "#B09985",
  indigo500: "#8F6A52",
  indigo600: "#775644",
  indigo700: "#634638",
  indigo800: "#50382D",
  indigo900: "#3F2B23",

  // 3. ACCENT: muted sage support only
  teal50: "#E9EBE4",
  teal100: "#DCE0D5",
  teal200: "#C8CEC0",
  teal300: "#B0B8A8",
  teal400: "#98A48C",
  teal500: "#718764",
  teal600: "#5E7053",
  teal700: "#4C5B44",
  teal800: "#3C4937",
  teal900: "#313B2D",

  // 4. NEUTRAL: warm paper / ink
  taupe50: "#F5EDE5",
  taupe100: "#EBE3DB",
  taupe200: "#DFD3C7",
  taupe300: "#C9B8A8",
  taupe400: "#A89585",
  taupe500: "#7D6A5C",
  taupe600: "#62574B",
  taupe700: "#4D4239",
  taupe800: "#362E28",
  taupe900: "#231E1A",

  // 5. BACKGROUND & SURFACE
  lightBg: "#F5EDE5",
  darkBg: "#231E1A",
  darkSurf: "#2E2621",
  darkBord: "#463A34",

  // 6. SPECIAL: subdued highlights
  champagne: "#D8B88A",
  amethyst: "#8F6A52",

  superlike: "#8F6A52",
  heart: "#B86A4A",

  // Gradients
  gradCoral: ["#D1896E", "#A95E40"] as [string, string],
  gradIndigo: ["#C2A691", "#775644"] as [string, string],
  gradTeal: ["#ADBDA0", "#5E7053"] as [string, string],
  gradChampagne: ["#E7D3B5", "#D8B88A"] as [string, string],
  gradDeep: ["#312722", "#261F1B"] as [string, string],

  // Legacy aliases (deprecated — use coral* instead)
  /** @deprecated Use coral50 */
  rose50: "#F9EEEA",
  /** @deprecated Use coral100 */
  rose100: "#F4E2DA",
  /** @deprecated Use coral200 */
  rose200: "#EBCDC0",
  /** @deprecated Use coral300 */
  rose300: "#DFAF99",
  /** @deprecated Use coral400 */
  rose400: "#D1896E",
  /** @deprecated Use coral500 */
  rose500: "#B86A4A",
  /** @deprecated Use coral600 */
  rose600: "#A95E40",
  /** @deprecated Use coral700 */
  rose700: "#8F4E36",
  /** @deprecated Use coral800 */
  rose800: "#72402D",
  /** @deprecated Use coral900 */
  rose900: "#563123",
  /** @deprecated Use gradCoral */
  gradRose: ["#D1896E", "#A95E40"] as [string, string],
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
  ["#DFAF99", "#A95E40"],
  ["#E7D3B5", "#B48A56"],
  ["#C2A691", "#775644"],
  ["#CBD6C0", "#5E7053"],
  ["#EBCDC0", "#8F4E36"],
  ["#D5C3B6", "#66564D"],
];

export function getAuraAvatarGradient(id: string | number): [string, string] {
  const index = typeof id === 'number' ? id : (id.length % auraAvatarGradients.length);
  return auraAvatarGradients[index % auraAvatarGradients.length];
}
