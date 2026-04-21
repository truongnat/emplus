/**
 * Hero đăng nhập: dây treo + trái tim — nhịp thở nhẹ cho cả khối (romantic).
 */

import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useReducedMotion } from "@/src/hooks/use-reduced-motion";
import { LoginTopDecor } from "./LoginTopDecor";

export function LoginDreamHero({
  isDark,
  lottieSize = 128,
}: {
  isDark: boolean;
  lottieSize?: number;
}) {
  const reduced = useReducedMotion();
  const stringColor = isDark
    ? "rgba(255, 200, 210, 0.38)"
    : "rgba(255, 107, 129, 0.45)";

  const breath = useSharedValue(0);

  useEffect(() => {
    breath.value = withTiming(1, { duration: 800, easing: Easing.out(Easing.quad) });
  }, [breath]);

  const wrapStyle = useAnimatedStyle(() => ({
    opacity: breath.value,
  }));

  return (
    <Animated.View
      style={[styles.wrap, wrapStyle]}
      accessibilityElementsHidden
      importantForAccessibility="no"
    >
      <LoginTopDecor stringColor={stringColor} lottieSize={lottieSize} />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    alignItems: "center",
    width: "100%",
    marginBottom: 8,
  },
});
