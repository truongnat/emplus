import { tokens } from './framework/design/tokens';

/**
 * Compatibility Palette for legacy code.
 */
export const palette = {
  primary: tokens.color.primary.value,
  'primary-deep': tokens.color.primaryDeep.value,
  'primary-soft': tokens.color.primarySoft.value,
  'primary-subtle': "rgba(236, 19, 52, 0.1)",
  'primary-ghost': "rgba(236, 19, 52, 0.05)",
  accent: tokens.color.accent.value,
  'accent-subtle': "rgba(37, 99, 235, 0.1)",
  secondary: tokens.color.secondary.value,
  'secondary-subtle': "rgba(123, 97, 255, 0.1)",
  ink: tokens.color.ink.value,
  muted: tokens.color.muted.value,
  white: tokens.color.white.value,
  black: tokens.color.black.value,
  'slate-50': tokens.color.slate['50'].value,
  'slate-100': tokens.color.slate['100'].value,
  'slate-200': tokens.color.slate['200'].value,
  'slate-300': tokens.color.slate['300'].value,
  'slate-400': tokens.color.slate['400'].value,
  'slate-500': tokens.color.slate['500'].value,
  'slate-600': tokens.color.slate['600'].value,
  'slate-700': tokens.color.slate['700'].value,
  'slate-800': tokens.color.slate['800'].value,
  'slate-900': tokens.color.slate['900'].value,
  danger: tokens.color.semantic.danger.value,
  success: tokens.color.semantic.success.value,
  warning: tokens.color.semantic.warning.value,
  info: tokens.color.semantic.info.value,
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
