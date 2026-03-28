/**
 * Aura Premium Color Tokens
 * A refined, romantic, and luxury palette.
 * Based on warm rose, champagne gold, and ivory.
 */

// ─── PRIMITIVE PALETTE ────────────────────────────────────
export const auraPalette = {
  // 1. PRIMARY: Velvet Rose (Deep, Luxury Romance)
  rose50: "#FFF1F3",
  rose100: "#FFE1E6",
  rose200: "#FEC4CF",
  rose300: "#FDA0B2",
  rose400: "#FB718A",
  rose500: "#F43F5E", // ← Primary Brand Accent
  rose600: "#E11D48",
  rose700: "#BE123C",
  rose800: "#9F1239",
  rose900: "#881337",
  rose950: "#4C0519",

  // 2. NEUTRAL: Warm Taupe (Eliminate eye strain, keep it warm)
  taupe50: "#FAFAF9",
  taupe100: "#F5F5F4",
  taupe200: "#E7E5E4",
  taupe300: "#D6D3D1",
  taupe400: "#A8A29E",
  taupe500: "#78716C",
  taupe600: "#57534E",
  taupe700: "#44403C",
  taupe800: "#292524",
  taupe900: "#1C1917", // Deep warm almost-black

  // 3. BACKGROUND & SURFACE: Cashmere & Cocoa
  lightBg: "#FCF9F8", // Cashmere (Rich off-white)
  darkBg: "#1A1416", // Cocoa Black (Warm, intimate dark)
  darkSurf: "#261C20", // Cocoa Surface
  darkBord: "#362A2E", // Visible border on dark surface

  // 4. ACCENT: Amethyst & Champagne (Special Highlights)
  champagne: "#FDE047",
  amethyst: "#A855F7",

  // Special/Legacy overrides mappings if needed
  superlike: "#A855F7", // Remapped to Amethyst for romance
  heart: "#F43F5E",

  // Gradients
  gradRose: ["#FB718A", "#E11D48"] as [string, string],
  gradChampagne: ["#FEF08A", "#FDE047"] as [string, string],
  gradDeep: ["#261C20", "#1A1416"] as [string, string],
} as const;

// ─── SEMANTIC COLOR MAPPINGS ──────────────────────────────
// These will be used in themes.ts

export const auraGradients = {
  primary: auraPalette.gradRose,
  premium: auraPalette.gradChampagne,
  surface: auraPalette.gradDeep,
};

// Avatar Gradients — warm romantic 6 options
export const auraAvatarGradients: [string, string][] = [
  ["#FDA4AF", "#E11D48"], // Rose
  ["#FDE047", "#A16207"], // Gold
  ["#C084FC", "#7E22CE"], // Purple
  ["#60A5FA", "#1D4ED8"], // Blue
  ["#FB923C", "#C2410C"], // Orange
  ["#4ADE80", "#15803D"], // Green
];

/**
 * Helper: Get avatar gradient from identifier
 */
export function getAuraAvatarGradient(id: string | number): [string, string] {
  const index = typeof id === 'number' ? id : (id.length % auraAvatarGradients.length);
  return auraAvatarGradients[index % auraAvatarGradients.length];
}
