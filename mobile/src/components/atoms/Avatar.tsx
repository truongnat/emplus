/**
 * Avatar Component
 * User avatar with fallback initial
 */

import React, { memo } from "react";
import { View, Text, StyleSheet, Image, ViewStyle } from "react-native";
import { palette } from "@/src/theme/tokens";

export interface AvatarProps {
  /** User's name for fallback initial */
  name?: string;
  /** Avatar image URL */
  src?: string;
  /** Avatar size */
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  /** Additional style */
  style?: ViewStyle;
  /** Test ID */
  testID?: string;
}

const sizeMap = {
  xs: { container: 24, text: 10 },
  sm: { container: 32, text: 12 },
  md: { container: 44, text: 16 },
  lg: { container: 64, text: 24 },
  xl: { container: 96, text: 36 },
};

export const Avatar = memo(function Avatar({
  name = "",
  src,
  size = "md",
  style,
  testID,
}: AvatarProps) {
  const { container: containerSize, text: textSize } = sizeMap[size];

  const initial = name.trim().charAt(0).toUpperCase();

  const backgroundColor = getColorFromName(name);

  if (src) {
    return (
      <View
        style={[
          styles.container,
          { width: containerSize, height: containerSize },
          style,
        ]}
        testID={testID}
      >
        <Image source={{ uri: src }} style={styles.image} resizeMode="cover" />
      </View>
    );
  }

  return (
    <View
      style={[
        styles.container,
        {
          width: containerSize,
          height: containerSize,
          backgroundColor,
        },
        style,
      ]}
      testID={testID}
    >
      <Text style={[styles.initial, { fontSize: textSize }]}>{initial}</Text>
    </View>
  );
});

/**
 * Generate consistent background color from name
 */
function getColorFromName(name: string): string {
  const colors = [
    palette.violet500,
    palette.blue500,
    palette.green500,
    palette.amber500,
    palette.red500,
    palette.zinc500,
  ];

  if (!name.trim()) {
    return palette.zinc300;
  }

  const hash = name
    .trim()
    .split("")
    .reduce((acc, char) => acc + char.charCodeAt(0), 0);

  return colors[hash % colors.length];
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 9999,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  initial: {
    fontWeight: "bold",
    color: palette.white,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 9999,
  },
});
