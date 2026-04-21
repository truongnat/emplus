import React from "react";
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";

import { Text } from "@/src/components/atoms/Text";
import { useReducedMotion } from "@/src/hooks/use-reduced-motion";
import { useThemeColors } from "@/src/theme";

import { registerScreenStyles as styles } from "../registerScreen.styles";

export function RegisterHeroSection() {
  const reducedMotion = useReducedMotion();
  const colors = useThemeColors();
  const enteringHero = reducedMotion
    ? FadeIn.duration(0)
    : FadeInDown.delay(40).springify().damping(22).stiffness(180);

  return (
    <Animated.View
      style={styles.registerHeader}
      entering={enteringHero}
      accessibilityRole="header"
      accessibilityLabel="Em+, tạo tài khoản"
    >
      <Text
        style={[styles.registerEyebrow, { color: colors.text.tertiary }]}
      >
        Bắt đầu một mình trước
      </Text>
      <Text style={[styles.registerTitle, { color: colors.text.primary }]}>
        Tạo tài khoản
      </Text>
    </Animated.View>
  );
}
