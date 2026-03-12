import { tokens } from './framework/design/tokens';

/**
 * Compatibility Palette for legacy code.
 */
export const palette = {
  primary: tokens.color.primary.val,
  'primary-deep': tokens.color.primaryDeep.val,
  'primary-soft': tokens.color.primarySoft.val,
  'primary-subtle': "rgba(236, 19, 52, 0.1)",
  'primary-ghost': "rgba(236, 19, 52, 0.05)",
  accent: tokens.color.accent.val,
  'accent-subtle': "rgba(37, 99, 235, 0.1)",
  secondary: tokens.color.secondary.val,
  'secondary-subtle': "rgba(123, 97, 255, 0.1)",
  ink: tokens.color.ink.val,
  muted: tokens.color.muted.val,
  white: tokens.color.white.val,
  black: tokens.color.black.val,
  'slate-50': tokens.color.slate50.val,
  'slate-100': tokens.color.slate100.val,
  'slate-200': tokens.color.slate200.val,
  'slate-300': tokens.color.slate300.val,
  'slate-400': tokens.color.slate400.val,
  'slate-500': tokens.color.slate500.val,
  'slate-600': tokens.color.slate600.val,
  'slate-700': tokens.color.slate700.val,
  'slate-800': tokens.color.slate800.val,
  'slate-900': tokens.color.slate900.val,
  danger: tokens.color.danger.val,
  success: tokens.color.success.val,
  warning: tokens.color.warning.val,
  info: tokens.color.info.val,
  placeholder: "#94a3b8",
  glass: "rgba(255, 255, 255, 0.4)",
  'glass-border': "rgba(255, 255, 255, 0.5)",
  'input-bg': "rgba(255, 255, 255, 0.5)",
  'soft-rose': "#fff1f2",
  violet: "#f5f3ff",
  cream: "#fffbeb",
  'amber-400': "#fbbf24",
  divider: "rgba(0,0,0,0.05)",
};

export const fonts = {
  body: "BeVietnamPro_400Regular",
  bold: "BeVietnamPro_700Bold",
  medium: "BeVietnamPro_500Medium",
  mono: "RobotoMono_400Regular",
  monoBold: "RobotoMono_700Bold",
  vietnamBold: "BeVietnamPro_700Bold",
  vietnamSemiBold: "BeVietnamPro_600SemiBold",
};

export const radii = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 18,
  xl: 24,
  '2xl': 32,
  pill: 9999,
};

export const shadows = {
  glass: {},
};

export const typography = new Proxy({}, {
  get: () => ({})
}) as any;

export type TypographyVariant = string;
