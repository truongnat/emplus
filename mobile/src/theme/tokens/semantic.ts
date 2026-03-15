/**
 * tokens/semantic.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Semantic tokens: map role → primitive.
 * Mỗi token có 2 giá trị: light + dark.
 *
 * Rule: component code chỉ được reference semantic tokens,
 * KHÔNG reference palette trực tiếp.
 * Ví dụ sai:   backgroundColor: palette.violet600
 * Ví dụ đúng:  backgroundColor: theme.colors.primary
 *
 * Cấu trúc:
 *  colors
 *    ├── background.*
 *    ├── surface.*
 *    ├── border.*
 *    ├── text.*
 *    ├── brand.*
 *    └── status.{error|warning|success|info}.*
 */

import { palette } from "./palette";

// ─── Type definition ──────────────────────────────────────────────────────────

export interface SemanticColors {
  // Backgrounds (page level)
  background: {
    default: string; // page bg
    subtle: string; // slightly off-white
    inverse: string; // dark bg on light theme
  };

  // Surfaces (card / sheet level)
  surface: {
    default: string; // card bg
    raised: string; // elevated card
    overlay: string; // modal overlay bg
    sunken: string; // inset / input bg
  };

  // Borders
  border: {
    default: string;
    subtle: string; // dividers
    strong: string; // focused input
    inverse: string;
  };

  // Text
  text: {
    primary: string;
    secondary: string;
    tertiary: string;
    disabled: string;
    inverse: string;
    link: string;
    onBrand: string; // text on brand-colored bg
  };

  // Brand
  brand: {
    default: string;
    subtle: string; // hover / pressed tint
    muted: string; // bg tint (8% opacity equiv)
    strong: string; // darker variant
    text: string; // text in brand color
  };

  // Status
  status: {
    error: { bg: string; text: string; border: string; icon: string };
    warning: { bg: string; text: string; border: string; icon: string };
    success: { bg: string; text: string; border: string; icon: string };
    info: { bg: string; text: string; border: string; icon: string };
  };

  // Interactive (button, link states)
  interactive: {
    primary: string; // default
    primaryHovered: string;
    primaryPressed: string;
    primaryDisabled: string;
    ghost: string; // transparent
    ghostHovered: string;
  };

  // Overlay / scrim
  scrim: string;
}

// ─── Light theme colors ───────────────────────────────────────────────────────

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
    strong: palette.violet600,
    inverse: palette.zinc800,
  },

  text: {
    primary: palette.zinc900,
    secondary: palette.zinc500,
    tertiary: palette.zinc400,
    disabled: palette.zinc300,
    inverse: palette.white,
    link: palette.violet600,
    onBrand: palette.white,
  },

  brand: {
    default: palette.violet600,
    subtle: palette.violet500,
    muted: palette.violet100,
    strong: palette.violet800,
    text: palette.violet600,
  },

  status: {
    error: {
      bg: palette.red50,
      text: palette.red600,
      border: palette.red500,
      icon: palette.red500,
    },
    warning: {
      bg: palette.amber50,
      text: palette.amber600,
      border: palette.amber500,
      icon: palette.amber500,
    },
    success: {
      bg: palette.green50,
      text: palette.green600,
      border: palette.green500,
      icon: palette.green500,
    },
    info: {
      bg: palette.blue50,
      text: palette.blue600,
      border: palette.blue500,
      icon: palette.blue500,
    },
  },

  interactive: {
    primary: palette.violet600,
    primaryHovered: palette.violet500,
    primaryPressed: palette.violet700,
    primaryDisabled: palette.zinc300,
    ghost: palette.transparent,
    ghostHovered: palette.zinc100,
  },

  scrim: "rgba(0,0,0,0.50)",
};

// ─── Dark theme colors ────────────────────────────────────────────────────────

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
    strong: palette.violet400,
    inverse: palette.zinc200,
  },

  text: {
    primary: palette.zinc50,
    secondary: palette.zinc400,
    tertiary: palette.zinc500,
    disabled: palette.zinc700,
    inverse: palette.zinc950,
    link: palette.violet400,
    onBrand: palette.white,
  },

  brand: {
    default: palette.violet500,
    subtle: palette.violet400,
    muted: palette.violet900,
    strong: palette.violet300,
    text: palette.violet400,
  },

  status: {
    error: {
      bg: palette.red900,
      text: "#FCA5A5", // red300
      border: palette.red500,
      icon: "#F87171", // red400
    },
    warning: {
      bg: palette.amber900,
      text: "#FCD34D", // amber300
      border: palette.amber500,
      icon: "#FCD34D",
    },
    success: {
      bg: palette.green900,
      text: "#86EFAC", // green300
      border: palette.green500,
      icon: "#4ADE80", // green400
    },
    info: {
      bg: palette.blue900,
      text: "#93C5FD", // blue300
      border: palette.blue500,
      icon: "#60A5FA", // blue400
    },
  },

  interactive: {
    primary: palette.violet500,
    primaryHovered: palette.violet400,
    primaryPressed: palette.violet600,
    primaryDisabled: palette.zinc700,
    ghost: palette.transparent,
    ghostHovered: palette.zinc800,
  },

  scrim: "rgba(0,0,0,0.70)",
};

// ─── Component-level tokens ───────────────────────────────────────────────────
// Reference semantic tokens, scoped to component behavior.
// Keeps component code clean — no inline color decisions.

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
        bg: colors.surface.default,
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
      warning: {
        bg: colors.status.warning.bg,
        text: colors.status.warning.text,
      },
      success: {
        bg: colors.status.success.bg,
        text: colors.status.success.text,
      },
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
