/**
 * theme/themes.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Brand Theme Definitions.
 * Release V1 uses a quiet, light-first Em+ palette derived from LookAway discipline.
 */

import { createThemePair } from "./theme-builder";
import { auraPalette } from "./aura-colors";

// ─── Aura Theme (Em+ cream + terracotta, calm daily utility) ────────────────

export const auraTheme = createThemePair({
  light: {
    colors: {
      background: {
        default: auraPalette.lightBg,
        subtle: auraPalette.cream100,
        inverse: auraPalette.cream900,
      },
      surface: {
        default: "#F7F2EB",
        raised: "#F2EBE3",
        overlay: "#F7F2EB",
        sunken: auraPalette.cream100,
      },
      text: {
        primary: auraPalette.cream900,
        secondary: auraPalette.cream600,
        tertiary: auraPalette.cream500,
        disabled: auraPalette.cream300,
        inverse: "#FFFFFF",
        link: auraPalette.terracotta600,
        onBrand: "#FFFFFF",
      },
      brand: {
        default: auraPalette.terracotta500,
        subtle: auraPalette.terracotta100,
        muted: auraPalette.terracotta50,
        strong: auraPalette.terracotta700,
        text: auraPalette.terracotta600,
      },
      secondary: {
        default: auraPalette.warmBrown500,
        subtle: auraPalette.warmBrown100,
        muted: auraPalette.warmBrown50,
        text: auraPalette.warmBrown600,
      },
      accent: {
        default: auraPalette.sage500,
        subtle: auraPalette.sage100,
        muted: auraPalette.sage50,
        text: auraPalette.sage700,
      },
      border: {
        default: auraPalette.cream200,
        subtle: auraPalette.cream100,
        strong: auraPalette.terracotta200,
        inverse: auraPalette.cream900,
      },
      interactive: {
        primary: auraPalette.terracotta500,
        primaryHovered: auraPalette.terracotta400,
        primaryPressed: auraPalette.terracotta600,
        primaryDisabled: auraPalette.terracotta100,
        ghost: "transparent",
        ghostHovered: auraPalette.cream100,
      },
      status: {
        error: { bg: "#FBF0EC", text: "#9A4E36", border: "#E1B5A1", icon: "#A95E40" },
        warning: { bg: "#F9F3EA", text: "#8A6943", border: "#DCC29F", icon: "#B48A56" },
        success: { bg: "#F2F5F0", text: "#4C5B44", border: "#B7C4AE", icon: "#5E7053" },
        info: { bg: auraPalette.warmBrown50, text: auraPalette.warmBrown700, border: auraPalette.warmBrown200, icon: auraPalette.warmBrown500 },
      },
    },
  },
  dark: {
    colors: {
      background: {
        default: auraPalette.darkBg,
        subtle: auraPalette.cream900,
        inverse: auraPalette.cream50,
      },
      surface: {
        default: auraPalette.darkSurf,
        raised: "#3A2E28",
        overlay: "rgba(49, 39, 34, 0.84)",
        sunken: "#201915",
      },
      text: {
        primary: "#F7EEE8",
        secondary: "#C4B3A6",
        tertiary: "#A69388",
        disabled: auraPalette.cream600,
        inverse: auraPalette.cream900,
        link: auraPalette.terracotta300,
        onBrand: "#FFFFFF",
      },
      brand: {
        default: auraPalette.terracotta500,
        subtle: auraPalette.terracotta800,
        muted: "#472D22",
        strong: auraPalette.terracotta300,
        text: auraPalette.terracotta300,
      },
      secondary: {
        default: auraPalette.warmBrown400,
        subtle: auraPalette.warmBrown800,
        muted: auraPalette.warmBrown900,
        text: auraPalette.warmBrown300,
      },
      accent: {
        default: auraPalette.sage400,
        subtle: auraPalette.sage800,
        muted: auraPalette.sage900,
        text: auraPalette.sage300,
      },
      border: {
        default: auraPalette.darkBord,
        subtle: "#3B2F2A",
        strong: auraPalette.terracotta500,
        inverse: auraPalette.cream200,
      },
      interactive: {
        primary: auraPalette.terracotta500,
        primaryHovered: auraPalette.terracotta400,
        primaryPressed: auraPalette.terracotta600,
        primaryDisabled: "#4C3327",
        ghost: "transparent",
        ghostHovered: "rgba(184, 106, 74, 0.12)",
      },
      status: {
        error: { bg: "#402921", text: "#F0D7CC", border: "#6B4333", icon: "#D1896E" },
        warning: { bg: "#3F3427", text: "#EADBBE", border: "#6C5A42", icon: "#D8B88A" },
        success: { bg: "#2E372A", text: "#D7E0D0", border: "#4B5A42", icon: "#8EA47F" },
        info: { bg: auraPalette.warmBrown900, text: "#E3D4CA", border: auraPalette.warmBrown700, icon: auraPalette.warmBrown300 },
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
