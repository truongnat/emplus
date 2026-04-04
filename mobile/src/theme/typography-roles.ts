/**
 * Typography roles — font đã load trong app/_layout (Be Vietnam Pro + Roboto Mono).
 */

import { TextStyle } from "react-native";
import { fontSize, lineHeight, letterSpacing } from "./tokens";

const be = {
  regular: "BeVietnamPro_400Regular",
  medium: "BeVietnamPro_500Medium",
  semibold: "BeVietnamPro_600SemiBold",
  bold: "BeVietnamPro_700Bold",
  extrabold: "BeVietnamPro_800ExtraBold",
} as const;

const mono = {
  regular: "RobotoMono_400Regular",
  bold: "RobotoMono_700Bold",
} as const;

export const typographyRoles = {
  display: {
    fontFamily: be.extrabold,
    fontSize: fontSize["4xl"],
    lineHeight: fontSize["4xl"] * lineHeight.tight,
    letterSpacing: letterSpacing.tight,
  } satisfies TextStyle,
  title: {
    fontFamily: be.bold,
    fontSize: fontSize["2xl"],
    lineHeight: fontSize["2xl"] * lineHeight.snug,
    letterSpacing: letterSpacing.tight,
  } satisfies TextStyle,
  titleSm: {
    fontFamily: be.semibold,
    fontSize: fontSize.xl,
    lineHeight: fontSize.xl * lineHeight.snug,
  } satisfies TextStyle,
  body: {
    fontFamily: be.regular,
    fontSize: fontSize.md,
    lineHeight: fontSize.md * lineHeight.normal,
  } satisfies TextStyle,
  bodyMedium: {
    fontFamily: be.medium,
    fontSize: fontSize.md,
    lineHeight: fontSize.md * lineHeight.normal,
  } satisfies TextStyle,
  caption: {
    fontFamily: be.regular,
    fontSize: fontSize.sm,
    lineHeight: fontSize.sm * lineHeight.normal,
    letterSpacing: letterSpacing.wide,
  } satisfies TextStyle,
  numeric: {
    fontFamily: mono.bold,
    fontSize: fontSize.xl,
    lineHeight: fontSize.xl * lineHeight.tight,
  } satisfies TextStyle,
  numericSm: {
    fontFamily: mono.regular,
    fontSize: fontSize.md,
    lineHeight: fontSize.md * lineHeight.normal,
  } satisfies TextStyle,
} as const;

export type TypographyRole = keyof typeof typographyRoles;
