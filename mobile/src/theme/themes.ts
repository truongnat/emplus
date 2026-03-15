/**
 * theme/themes.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Pre-built brand theme pairs.
 * Mỗi theme chỉ override những gì khác với default.
 * Pattern: createThemePair({ light: {...}, dark: {...} })
 */

import { createThemePair } from "./engine";

// ─── Ocean (blue/cyan brand) - CALM & TRUST ───────────────────────────────────

export const oceanTheme = createThemePair({
  light: {
    colors: {
      brand: {
        default: "#0EA5E9", // sky-500: Clear ocean blue
        subtle: "#38BDF8", // sky-400: Bright foam
        muted: "#E0F2FE", // sky-100: Light water tint
        strong: "#0369A1", // sky-700: Deep ocean
        text: "#0284C7", // sky-600: Clear water
      },
      border: {
        strong: "#0EA5E9",
      },
      text: {
        link: "#0284C7",
      },
      interactive: {
        primary: "#0EA5E9",
        primaryHovered: "#38BDF8",
        primaryPressed: "#0284C7",
      },
    },
  },
  dark: {
    colors: {
      brand: {
        default: "#38BDF8", // sky-400: Glowing bioluminescence
        subtle: "#7DD3FC", // sky-300: Soft glow
        muted: "#082F49", // sky-950: Deep sea
        strong: "#7DD3FC", // sky-300: Bright accent
        text: "#38BDF8", // sky-400: Visible on dark
      },
      border: {
        strong: "#38BDF8",
      },
      text: {
        link: "#38BDF8",
      },
      interactive: {
        primary: "#38BDF8",
        primaryHovered: "#7DD3FC",
        primaryPressed: "#0EA5E9",
      },
    },
  },
});

// ─── Rose (pink/red brand) - DEFAULT ──────────────────────────────────────────

export const roseTheme = createThemePair({
  light: {
    colors: {
      brand: {
        default: "#F43F5E", // rose-500: Vibrant romantic red
        subtle: "#FB7185", // rose-400: Soft hover
        muted: "#FFE4E6", // rose-100: Light background tint
        strong: "#BE123C", // rose-700: Deep pressed
        text: "#E11D48", // rose-600: Text on light
      },
      border: {
        strong: "#F43F5E",
      },
      text: {
        link: "#E11D48",
      },
      interactive: {
        primary: "#F43F5E",
        primaryHovered: "#FB7185",
        primaryPressed: "#E11D48",
      },
    },
  },
  dark: {
    colors: {
      brand: {
        default: "#FB7185", // rose-400: Brighter on dark
        subtle: "#FDA4AF", // rose-300: Soft hover
        muted: "#4C0519", // rose-950: Deep background
        strong: "#FDA4AF", // rose-300: Bright pressed
        text: "#FB7185", // rose-400: Readable on dark
      },
      border: {
        strong: "#FB7185",
      },
      text: {
        link: "#FB7185",
      },
      interactive: {
        primary: "#FB7185",
        primaryHovered: "#FDA4AF",
        primaryPressed: "#F43F5E",
      },
    },
  },
});

// ─── Emerald (green brand) ────────────────────────────────────────────────────

export const emeraldTheme = createThemePair({
  light: {
    colors: {
      brand: {
        default: "#10B981",
        subtle: "#34D399",
        muted: "#D1FAE5",
        strong: "#047857",
        text: "#059669",
      },
      border: { strong: "#10B981" },
      text: { link: "#059669" },
      interactive: {
        primary: "#10B981",
        primaryHovered: "#34D399",
        primaryPressed: "#059669",
      },
    },
  },
  dark: {
    colors: {
      brand: {
        default: "#34D399",
        subtle: "#6EE7B7",
        muted: "#022C22",
        strong: "#6EE7B7",
        text: "#34D399",
      },
      border: { strong: "#34D399" },
      text: { link: "#34D399" },
      interactive: {
        primary: "#34D399",
        primaryHovered: "#6EE7B7",
        primaryPressed: "#10B981",
      },
    },
  },
});

// ─── Sunset (orange/coral brand) - WARM & ENERGETIC ───────────────────────────

export const sunsetTheme = createThemePair({
  light: {
    colors: {
      brand: {
        default: "#F97316", // orange-500: Vibrant sunset
        subtle: "#FB923C", // orange-400: Soft glow
        muted: "#FFEDD5", // orange-100: Warm light
        strong: "#C2410C", // orange-700: Deep ember
        text: "#EA580C", // orange-600: Warm accent
      },
      border: {
        strong: "#F97316",
      },
      text: {
        link: "#EA580C",
      },
      interactive: {
        primary: "#F97316",
        primaryHovered: "#FB923C",
        primaryPressed: "#EA580C",
      },
    },
  },
  dark: {
    colors: {
      brand: {
        default: "#FB923C", // orange-400: Glowing ember
        subtle: "#FDBA74", // orange-300: Soft warmth
        muted: "#431407", // orange-950: Deep night
        strong: "#FDBA74", // orange-300: Bright flare
        text: "#FB923C", // orange-400: Warm on dark
      },
      border: {
        strong: "#FB923C",
      },
      text: {
        link: "#FB923C",
      },
      interactive: {
        primary: "#FB923C",
        primaryHovered: "#FDBA74",
        primaryPressed: "#F97316",
      },
    },
  },
});

// ─── High contrast (accessibility) ───────────────────────────────────────────

export const highContrastTheme = createThemePair({
  light: {
    colors: {
      text: {
        primary: "#000000",
        secondary: "#1A1A1A",
        tertiary: "#333333",
        disabled: "#767676", // WCAG AA minimum
      },
      border: {
        default: "#767676",
        strong: "#000000",
      },
      brand: {
        default: "#0000EE",
        text: "#0000EE",
      },
    },
  },
  dark: {
    colors: {
      text: {
        primary: "#FFFFFF",
        secondary: "#E5E5E5",
        tertiary: "#CCCCCC",
        disabled: "#888888",
      },
      border: {
        default: "#888888",
        strong: "#FFFFFF",
      },
      brand: {
        default: "#6699FF",
        text: "#99BBFF",
      },
    },
  },
});

// ─── Theme registry ───────────────────────────────────────────────────────────

export const themeRegistry = {
  default: null, // use built-in (rose)
  rose: roseTheme, // Romantic red/pink
  ocean: oceanTheme, // Calm blue/cyan
  sunset: sunsetTheme, // Warm orange/coral
  emerald: emeraldTheme, // Fresh green
  highContrast: highContrastTheme,
} as const;

export type ThemeName = keyof typeof themeRegistry;
