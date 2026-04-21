import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  Easing,
  useAnimatedReaction,
  cancelAnimation,
} from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";
import { palette, useThemeColors } from "@/src/theme";

export interface PulseStarProps {
  delay?: number;
  size?: number;
  color?: string;
  top?: number;
  left?: number;
  right?: number;
  bottom?: number;
  icon?: React.ComponentProps<typeof Ionicons>["name"];
}

export function PulseStar({
  delay = 0,
  size = 18,
  color = palette.amber500,
  top,
  left,
  right,
  bottom,
  icon = "star",
}: PulseStarProps) {
  const opacity = useSharedValue(0);
  const scale = useSharedValue(1);

  useEffect(() => {
    const timeout = setTimeout(() => {
      opacity.value = withTiming(1, { duration: 600, easing: Easing.out(Easing.quad) });
      scale.value = withTiming(1, { duration: 600, easing: Easing.out(Easing.quad) });
    }, delay);

    return () => {
      clearTimeout(timeout);
    };
  }, [delay]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [{ scale: scale.value }],
    };
  });

  return (
    <Animated.View
      style={[
        {
          position: "absolute",
          top,
          left,
          right,
          bottom,
        },
        animatedStyle,
      ]}
    >
      <Ionicons name={icon} size={size} color={color} />
    </Animated.View>
  );
}

export function RingingBell() {
  const colors = useThemeColors();
  const opacity = useSharedValue(0);

  useEffect(() => {
    opacity.value = withTiming(1, { duration: 300, easing: Easing.out(Easing.quad) });
  }, [opacity]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <Animated.View style={animatedStyle}>
      <Ionicons
        name="notifications-outline"
        size={24}
        color={colors.brand.default}
      />
      <View
        style={[
          styles.notificationDot,
          { borderColor: colors.surface.default },
        ]}
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  notificationDot: {
    position: "absolute",
    top: -2,
    right: -2,
    width: 12,
    height: 12,
    backgroundColor: palette.coral500,
    borderRadius: 9999,
    borderWidth: 2,
  },
});
