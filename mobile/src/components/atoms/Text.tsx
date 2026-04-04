/**
 * Text - Base text component with theme support
 */

import React, { ReactNode, useMemo } from "react";
import {
  Text as RNText,
  TextStyle,
  StyleSheet,
  type AccessibilityProps,
} from "react-native";
import { useTheme } from "@/src/theme";
import { palette } from "@/src/theme/tokens";

type TextVariant =
  | "h1"
  | "h2"
  | "h3"
  | "body"
  | "caption"
  | "label"
  | "bodyBold"
  | "captionBold";
type TextColor = keyof typeof palette | string;

type TextAccessibilityProps = Pick<
  AccessibilityProps,
  | "accessible"
  | "accessibilityRole"
  | "accessibilityLabel"
  | "accessibilityHint"
  | "importantForAccessibility"
  | "accessibilityElementsHidden"
>;

export interface TextProps extends Partial<TextAccessibilityProps> {
  children: ReactNode;
  variant?: TextVariant;
  color?: TextColor;
  style?: TextStyle | TextStyle[];
  numberOfLines?: number;
  onPress?: () => void;
}

export function Text({
  children,
  variant = "body",
  color,
  style,
  numberOfLines,
  onPress,
  accessible,
  accessibilityRole,
  accessibilityLabel,
  accessibilityHint,
  importantForAccessibility,
  accessibilityElementsHidden,
}: TextProps) {
  const theme = useTheme();

  const dynamicStyles = useMemo(
    () =>
      StyleSheet.create({
        text: {
          color:
            color && color in palette
              ? palette[color as keyof typeof palette]
              : theme.colors.text.primary,
        },
      }),
    [theme.colors, color],
  );

  return (
    <RNText
      style={[styles[variant], dynamicStyles.text, style]}
      numberOfLines={numberOfLines}
      onPress={onPress}
      accessible={accessible}
      accessibilityRole={accessibilityRole}
      accessibilityLabel={accessibilityLabel}
      accessibilityHint={accessibilityHint}
      importantForAccessibility={importantForAccessibility}
      accessibilityElementsHidden={accessibilityElementsHidden}
    >
      {children}
    </RNText>
  );
}

const styles = StyleSheet.create({
  h1: {
    fontSize: 28,
    fontWeight: "800",
    color: palette.zinc900,
  },
  h2: {
    fontSize: 24,
    fontWeight: "700",
    color: palette.zinc900,
  },
  h3: {
    fontSize: 20,
    fontWeight: "600",
    color: palette.zinc900,
  },
  body: {
    fontSize: 15,
    fontWeight: "400",
    color: palette.zinc700,
  },
  bodyBold: {
    fontSize: 15,
    fontWeight: "600",
    color: palette.zinc700,
  },
  caption: {
    fontSize: 13,
    fontWeight: "400",
    color: palette.zinc500,
  },
  captionBold: {
    fontSize: 13,
    fontWeight: "600",
    color: palette.zinc500,
  },
  label: {
    fontSize: 15,
    fontWeight: "600",
    color: palette.zinc700,
  },
});

// Backward compatibility
export const AppText = Text;
