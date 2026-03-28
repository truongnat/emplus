/**
 * Badge Component
 * Status indicator with variants
 */

import React, { memo, ReactNode } from "react";
import { View, Text, StyleSheet, ViewStyle } from "react-native";
import { useThemeColors } from "@/src/theme";

export type BadgeVariant =
  | "default"
  | "primary"
  | "success"
  | "warning"
  | "error"
  | "info";
export type BadgeSize = "sm" | "md" | "lg";

export interface BadgeProps {
  /** Badge text content */
  children: ReactNode;
  /** Badge variant */
  variant?: BadgeVariant;
  /** Badge size */
  size?: BadgeSize;
  /** Show as dot only (no text) */
  dot?: boolean;
  /** Additional style */
  style?: ViewStyle;
  /** Test ID */
  testID?: string;
}

const sizeStyles: Record<
  BadgeSize,
  {
    paddingHorizontal: number;
    paddingVertical: number;
    fontSize: number;
    dotSize: number;
  }
> = {
  sm: { paddingHorizontal: 8, paddingVertical: 4, fontSize: 11, dotSize: 6 },
  md: { paddingHorizontal: 12, paddingVertical: 6, fontSize: 13, dotSize: 8 },
  lg: { paddingHorizontal: 16, paddingVertical: 8, fontSize: 15, dotSize: 10 },
};

export const Badge = memo(function Badge({
  children,
  variant = "default",
  size = "md",
  dot = false,
  style,
  testID,
}: BadgeProps) {
  const themeColors = useThemeColors();

  const variantStyles: Record<BadgeVariant, { bg: string; text: string }> = {
    default: {
      bg: themeColors.surface.sunken,
      text: themeColors.text.secondary,
    },
    primary: {
      bg: themeColors.brand.muted,
      text: themeColors.brand.text,
    },
    success: {
      bg: themeColors.status.success.bg,
      text: themeColors.status.success.text,
    },
    warning: {
      bg: themeColors.status.warning.bg,
      text: themeColors.status.warning.text,
    },
    error: {
      bg: themeColors.status.error.bg,
      text: themeColors.status.error.text,
    },
    info: {
      bg: themeColors.status.info.bg,
      text: themeColors.status.info.text,
    },
  };

  const colors = variantStyles[variant];
  const sizes = sizeStyles[size];

  if (dot) {
    return (
      <View
        style={[styles.dotContainer, { backgroundColor: colors.bg }, style]}
        testID={testID}
      >
        <View
          style={[
            styles.dot,
            {
              width: sizes.dotSize,
              height: sizes.dotSize,
              backgroundColor: colors.text,
            },
          ]}
        />
      </View>
    );
  }

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.bg,
          paddingHorizontal: sizes.paddingHorizontal,
          paddingVertical: sizes.paddingVertical,
        },
        style,
      ]}
      testID={testID}
    >
      <Text
        style={[styles.text, { fontSize: sizes.fontSize, color: colors.text }]}
      >
        {children}
      </Text>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 9999,
    alignSelf: "flex-start",
  },
  text: {
    fontWeight: "bold",
    lineHeight: 16,
  },
  dotContainer: {
    borderRadius: 9999,
    alignItems: "center",
    justifyContent: "center",
  },
  dot: {
    borderRadius: 9999,
  },
});
