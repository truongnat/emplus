/**
 * theme/themes.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Brand Theme Definitions.
 * Focus: Premium Aura Theme (Romantic & Luxury)
 */

import { createThemePair } from "./theme-builder";
import { auraPalette } from "./aura-colors";

// ─── Aura Theme (Premium Romantic Rose & Champagne Gold) ─────────────────────

export const auraTheme = createThemePair({
  light: {
    colors: {
      background: {
        default: auraPalette.lightBg,
        subtle: auraPalette.taupe50,
        inverse: auraPalette.taupe900,
      },
      surface: {
        default: "#FFFFFF",
        raised: "#FFFFFF",
        overlay: "#FFFFFF",
        sunken: auraPalette.taupe100,
      },
      text: {
        primary: auraPalette.taupe900,
        secondary: auraPalette.taupe500,
        tertiary: auraPalette.rose400,
        disabled: auraPalette.taupe300,
        inverse: "#FFFFFF",
        link: auraPalette.rose600,
        onBrand: "#FFFFFF",
      },
      brand: {
        default: auraPalette.rose500,
        subtle: auraPalette.rose100,
        muted: auraPalette.rose50,
        strong: auraPalette.rose800,
        text: auraPalette.rose600,
      },
      border: {
        default: auraPalette.taupe200,
        subtle: auraPalette.taupe100,
        strong: auraPalette.rose200,
        inverse: auraPalette.taupe900,
      },
      interactive: {
        primary: auraPalette.rose500,
        primaryHovered: auraPalette.rose400,
        primaryPressed: auraPalette.rose600,
        primaryDisabled: auraPalette.rose100,
        ghost: "transparent",
        ghostHovered: auraPalette.rose50,
      },
      status: {
        error: { bg: "#FFF1F2", text: "#E11D48", border: "#FDA4AF", icon: "#E11D48" },
        warning: { bg: "#FFFBEB", text: "#D97706", border: "#FCD34D", icon: "#D97706" },
        success: { bg: "#ECFDF5", text: "#047857", border: "#A7F3D0", icon: "#10B981" },
        info: { bg: "#F3E8FF", text: "#7E22CE", border: "#E9D5FF", icon: "#A855F7" },
      },
    },
  },
  dark: {
    colors: {
      background: {
        default: auraPalette.darkBg,
        subtle: auraPalette.taupe900,
        inverse: auraPalette.taupe50,
      },
      surface: {
        default: auraPalette.darkSurf,
        raised: "#2F2327",
        overlay: "rgba(38, 28, 32, 0.8)",
        sunken: "#120D0F",
      },
      text: {
        primary: "#F4F0E6",
        secondary: auraPalette.taupe400,
        tertiary: auraPalette.rose400,
        disabled: auraPalette.taupe600,
        inverse: auraPalette.taupe900,
        link: auraPalette.rose400,
        onBrand: "#FFFFFF",
      },
      brand: {
        default: auraPalette.rose500,
        subtle: auraPalette.rose800,
        muted: auraPalette.rose900,
        strong: auraPalette.rose300,
        text: auraPalette.rose400,
      },
      border: {
        default: auraPalette.darkBord,
        subtle: "#2A2024",
        strong: auraPalette.rose500,
        inverse: auraPalette.taupe200,
      },
      interactive: {
        primary: auraPalette.rose500,
        primaryHovered: auraPalette.rose400,
        primaryPressed: auraPalette.rose600,
        primaryDisabled: auraPalette.rose900,
        ghost: "transparent",
        ghostHovered: "rgba(244, 63, 94, 0.1)",
      },
      status: {
        error: { bg: "#450a0a", text: "#fecaca", border: "#7f1d1d", icon: "#f87171" },
        warning: { bg: "#451a03", text: "#fef3c7", border: "#78350f", icon: "#fbbf24" },
        success: { bg: "#064e3b", text: "#d1fae5", border: "#065f46", icon: "#34d399" },
        info: { bg: "#2E1065", text: "#E9D5FF", border: "#581C87", icon: "#C084FC" },
      },
    },
  },
});

// ─── Telegram Theme (Classic Blue & Gray) ───────────────────────────────────

export const telegramTheme = createThemePair({
  light: {
    colors: {
      brand: {
        default: "#0088CC",
        subtle: "#0099DD",
        muted: "#E1F5FE",
        strong: "#0077BB",
        text: "#0088CC",
      },
      interactive: {
        primary: "#0088CC",
        primaryHovered: "#0099DD",
        primaryPressed: "#0077BB",
      },
      border: {
        strong: "#0088CC",
      },
      text: {
        link: "#0088CC",
      },
    },
  },
  dark: {
    colors: {
      background: {
        default: "#17212B",
        subtle: "#0E1621",
      },
      surface: {
        default: "#17212B",
        raised: "#242F3D",
        sunken: "#0E1621",
      },
      brand: {
        default: "#2EA6FF",
        subtle: "#54B9FF",
        muted: "#1D354E",
        strong: "#1D7EDD",
        text: "#2EA6FF",
      },
      interactive: {
        primary: "#2EA6FF",
        primaryHovered: "#54B9FF",
        primaryPressed: "#1D7EDD",
      },
      border: {
        default: "#0E1621",
        subtle: "#101921",
        strong: "#2EA6FF",
      },
      text: {
        primary: "#F5F5F5",
        secondary: "#8193A3",
        tertiary: "#5B6C7B",
        link: "#2EA6FF",
      },
    },
  },
});

// ─── Theme registry ───────────────────────────────────────────────────────────

export const themeRegistry = {
  aura: auraTheme,
  telegram: telegramTheme,
} as const;

export type ThemeName = keyof typeof themeRegistry;
