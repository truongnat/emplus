/**
 * Skeleton Component
 * Loading placeholder with shimmer animation
 */

import React, { memo, useEffect, useRef } from "react";
import { View, Animated, StyleSheet, ViewStyle } from "react-native";
import { useTheme } from "@/src/theme";

export type SkeletonVariant = "text" | "circular" | "rounded" | "square";

export interface SkeletonProps {
  /** Skeleton variant */
  variant?: SkeletonVariant;
  /** Skeleton width */
  width?: number | string;
  /** Skeleton height */
  height?: number;
  /** Disable animation */
  animated?: boolean;
  /** Animation duration in ms */
  duration?: number;
  /** Additional style */
  style?: ViewStyle;
  /** Test ID */
  testID?: string;
  /** Accessibility label */
  accessibilityLabel?: string;
}

export const Skeleton = memo(function Skeleton({
  variant = "text",
  width = "100%",
  height = 16,
  animated = true,
  duration = 1000,
  style,
  testID,
  accessibilityLabel,
}: SkeletonProps) {
  const theme = useTheme();
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!animated) return;

    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration,
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration,
          useNativeDriver: true,
        }),
      ]),
    );

    animation.start();

    return () => animation.stop();
  }, [animated, duration, animatedValue]);

  const borderRadius = getBorderRadius(variant);
  const opacity = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0.5, 1],
  });

  return (
    <View
      style={[
        styles.container,
        {
          width,
          height,
          borderRadius,
          backgroundColor: theme.colors.surface.sunken,
        } as ViewStyle,
        style,
      ]}
      testID={testID}
      accessibilityRole="progressbar"
      accessibilityLabel={accessibilityLabel || "Loading"}
    >
      {animated && (
        <Animated.View
          style={[
            styles.shimmer,
            {
              opacity,
              borderRadius,
              backgroundColor: theme.colors.border.subtle,
            },
          ]}
        />
      )}
    </View>
  );
});

function getBorderRadius(variant: SkeletonVariant): number {
  switch (variant) {
    case "circular":
      return 9999;
    case "rounded":
      return 8;
    case "square":
      return 0;
    case "text":
    default:
      return 4;
  }
}

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
    position: "relative",
  },
  shimmer: {
    ...StyleSheet.absoluteFillObject,
  },
});
