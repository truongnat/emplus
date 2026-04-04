/**
 * Skeleton Component
 * Loading placeholder — shimmer quét ngang + tint brand (P4)
 */

import React, { memo, useEffect, useRef, useState } from "react";
import {
  View,
  Animated,
  StyleSheet,
  ViewStyle,
  LayoutChangeEvent,
} from "react-native";
import { useThemeColors } from "@/src/theme";

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
  /** Animation duration in ms (một vòng quét) */
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
  duration = 1400,
  style,
  testID,
  accessibilityLabel,
}: SkeletonProps) {
  const colors = useThemeColors();
  const [trackW, setTrackW] = useState(0);
  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!animated || trackW <= 0) return;

    const anim = Animated.loop(
      Animated.timing(progress, {
        toValue: 1,
        duration,
        useNativeDriver: true,
      }),
    );
    anim.start();
    return () => {
      anim.stop();
      progress.setValue(0);
    };
  }, [animated, duration, progress, trackW]);

  const onLayout = (e: LayoutChangeEvent) => {
    const w = e.nativeEvent.layout.width;
    if (w > 0) setTrackW(w);
  };

  const borderRadius = getBorderRadius(variant);
  const bandW = Math.max(48, trackW * 0.42);

  const translateX = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [-bandW, trackW + bandW * 0.25],
  });

  return (
    <View
      style={[
        styles.container,
        {
          width,
          height,
          borderRadius,
          backgroundColor: colors.surface.sunken,
        } as ViewStyle,
        style,
      ]}
      onLayout={onLayout}
      testID={testID}
      accessibilityRole="progressbar"
      accessibilityState={{ busy: true }}
      accessibilityLabel={accessibilityLabel || "Đang tải"}
    >
      {animated && trackW > 0 && (
        <Animated.View
          pointerEvents="none"
          style={[
            styles.shimmerBand,
            {
              width: bandW,
              borderRadius,
              opacity: 0.55,
              backgroundColor: colors.brand.muted,
              transform: [{ translateX }],
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
  shimmerBand: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
  },
});
