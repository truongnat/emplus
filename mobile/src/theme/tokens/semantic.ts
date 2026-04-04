/**
 * tokens/semantic.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Semantic tokens: map role → primitive.
 * Base definitions are BRAND-AGNOSTIC (using zinc/gray).
 */

import { palette } from "./palette";

export interface SemanticColors {
  background: {
    default: string;
    subtle: string;
    inverse: string;
  };
  surface: {
    default: string;
    raised: string;
    overlay: string;
    sunken: string;
  };
  border: {
    default: string;
    subtle: string;
    strong: string;
    inverse: string;
  };
  text: {
    primary: string;
    secondary: string;
    tertiary: string;
    disabled: string;
    inverse: string;
    link: string;
    onBrand: string;
  };
  brand: {
    default: string;
    subtle: string;
    muted: string;
    strong: string;
    text: string;
  };
  secondary: {
    default: string;
    subtle: string;
    muted: string;
    text: string;
  };
  accent: {
    default: string;
    subtle: string;
    muted: string;
    text: string;
  };
  status: {
    error: { bg: string; text: string; border: string; icon: string };
    warning: { bg: string; text: string; border: string; icon: string };
    success: { bg: string; text: string; border: string; icon: string };
    info: { bg: string; text: string; border: string; icon: string };
  };
  interactive: {
    primary: string;
    primaryHovered: string;
    primaryPressed: string;
    primaryDisabled: string;
    ghost: string;
    ghostHovered: string;
  };
  scrim: string;
}

// ─── Base Light (Agnostic Zinc) ───────────────────────────────────────────────

export const lightColors: SemanticColors = {
  background: {
    default: palette.white,
    subtle: palette.zinc50,
    inverse: palette.zinc950,
  },
  surface: {
    default: palette.white,
    raised: palette.white,
    overlay: palette.white,
    sunken: palette.zinc100,
  },
  border: {
    default: palette.zinc200,
    subtle: palette.zinc100,
    strong: palette.zinc900, 
    inverse: palette.zinc800,
  },
  text: {
    primary: palette.zinc900,
    secondary: palette.zinc500,
    tertiary: palette.zinc400,
    disabled: palette.zinc300,
    inverse: palette.white,
    link: palette.zinc900, 
    onBrand: palette.white,
  },
  brand: {
    default: palette.zinc900,
    subtle: palette.zinc800,
    muted: palette.zinc100,
    strong: palette.black,
    text: palette.zinc900,
  },
  secondary: {
    default: palette.indigo500,
    subtle: palette.indigo100,
    muted: palette.indigo50,
    text: palette.indigo600,
  },
  accent: {
    default: palette.teal500,
    subtle: palette.teal100,
    muted: palette.teal50,
    text: palette.teal600,
  },
  status: {
    error: { bg: palette.red50, text: palette.red600, border: palette.red500, icon: palette.red500 },
    warning: { bg: palette.amber50, text: palette.amber600, border: palette.amber500, icon: palette.amber500 },
    success: { bg: palette.green50, text: palette.green600, border: palette.green500, icon: palette.green500 },
    info: { bg: palette.indigo50, text: palette.indigo600, border: palette.indigo300, icon: palette.indigo500 },
  },
  interactive: {
    primary: palette.zinc900,
    primaryHovered: palette.zinc800,
    primaryPressed: palette.black,
    primaryDisabled: palette.zinc300,
    ghost: palette.transparent,
    ghostHovered: palette.zinc100,
  },
  scrim: "rgba(0,0,0,0.50)",
};

// ─── Base Dark (Agnostic Zinc) ────────────────────────────────────────────────

export const darkColors: SemanticColors = {
  background: {
    default: palette.zinc950,
    subtle: palette.zinc900,
    inverse: palette.zinc50,
  },
  surface: {
    default: palette.zinc900,
    raised: palette.zinc800,
    overlay: palette.zinc800,
    sunken: palette.zinc950,
  },
  border: {
    default: palette.zinc800,
    subtle: palette.zinc900,
    strong: palette.zinc100,
    inverse: palette.zinc200,
  },
  text: {
    primary: palette.zinc50,
    secondary: palette.zinc400,
    tertiary: palette.zinc500,
    disabled: palette.zinc700,
    inverse: palette.zinc950,
    link: palette.zinc50, 
    onBrand: palette.white,
  },
  brand: {
    default: palette.zinc100,
    subtle: palette.zinc200,
    muted: palette.zinc800,
    strong: palette.white,
    text: palette.zinc100,
  },
  secondary: {
    default: palette.indigo400,
    subtle: palette.indigo800,
    muted: palette.indigo900,
    text: palette.indigo300,
  },
  accent: {
    default: palette.teal400,
    subtle: palette.teal800,
    muted: palette.teal900,
    text: palette.teal300,
  },
  status: {
    error: { bg: "#450a0a", text: "#fecaca", border: "#7f1d1d", icon: palette.red500 },
    warning: { bg: "#451a03", text: "#fef3c7", border: "#78350f", icon: palette.amber500 },
    success: { bg: "#064e3b", text: "#d1fae5", border: "#065f46", icon: palette.green500 },
    info: { bg: palette.indigo900, text: palette.indigo200, border: palette.indigo700, icon: palette.indigo400 },
  },
  interactive: {
    primary: palette.zinc100,
    primaryHovered: palette.zinc200,
    primaryPressed: palette.white,
    primaryDisabled: palette.zinc700,
    ghost: palette.transparent,
    ghostHovered: palette.zinc800,
  },
  scrim: "rgba(0,0,0,0.70)",
};

export function buildComponentTokens(colors: SemanticColors) {
  return {
    button: {
      solid: {
        bg: colors.interactive.primary,
        bgHover: colors.interactive.primaryHovered,
        bgPressed: colors.interactive.primaryPressed,
        bgDisabled: colors.interactive.primaryDisabled,
        text: colors.text.onBrand,
        textDisabled: colors.text.disabled,
      },
      outline: {
        bg: "transparent",
        bgPressed: colors.brand.muted,
        border: colors.interactive.primary,
        text: colors.brand.text,
      },
      ghost: {
        bg: colors.interactive.ghost,
        bgPressed: colors.interactive.ghostHovered,
        text: colors.brand.text,
      },
      soft: {
        bg: colors.brand.muted,
        bgPressed: colors.brand.subtle + "22",
        text: colors.brand.text,
      },
      danger: {
        bg: colors.status.error.bg,
        border: colors.status.error.border,
        text: colors.status.error.text,
      },
    },
    input: {
      bg: colors.surface.sunken,
      bgFocus: colors.surface.default,
      border: colors.border.default,
      borderFocus: colors.border.strong,
      borderError: colors.status.error.border,
      borderSuccess: colors.status.success.border,
      text: colors.text.primary,
      placeholder: colors.text.tertiary,
      label: colors.text.secondary,
      labelFocus: colors.brand.text,
      labelError: colors.status.error.text,
      hint: colors.text.tertiary,
      error: colors.status.error.text,
    },
    card: {
      bg: colors.surface.default,
      bgElevated: colors.surface.raised,
      border: colors.border.subtle,
      text: colors.text.primary,
    },
    badge: {
      error: { bg: colors.status.error.bg, text: colors.status.error.text },
      warning: { bg: colors.status.warning.bg, text: colors.status.warning.text },
      success: { bg: colors.status.success.bg, text: colors.status.success.text },
      info: { bg: colors.status.info.bg, text: colors.status.info.text },
      default: { bg: colors.surface.sunken, text: colors.text.secondary },
    },
    avatar: {
      bg: colors.brand.muted,
      text: colors.brand.text,
      ring: colors.brand.default,
    },
    bottomSheet: {
      bg: colors.surface.overlay,
      handle: colors.border.default,
      overlay: colors.scrim,
    },
    toast: {
      bg: colors.surface.raised,
      text: colors.text.primary,
      border: colors.border.subtle,
    },
    tabBar: {
      bg: colors.surface.default,
      border: colors.border.subtle,
      activeIcon: colors.brand.default,
      inactiveIcon: colors.text.tertiary,
      activeLabel: colors.brand.text,
      inactiveLabel: colors.text.tertiary,
      indicator: colors.brand.default,
    },
    skeleton: {
      base: colors.surface.sunken,
      shimmer: colors.border.subtle,
    },
  } as const;
}

export type ComponentTokens = ReturnType<typeof buildComponentTokens>;
