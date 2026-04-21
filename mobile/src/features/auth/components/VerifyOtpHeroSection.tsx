import React from "react";
import { View } from "react-native";
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";

import { Text } from "@/src/components/atoms/Text";
import { useThemeColors } from "@/src/theme";
import { useReducedMotion } from "@/src/hooks/use-reduced-motion";

import {
  verifyOtpScreenStyles as styles,
} from "../verifyOtpScreen.styles";

export type VerifyOtpHeroSectionProps = {
  email: string;
};

export function VerifyOtpHeroSection({ email }: VerifyOtpHeroSectionProps) {
  const reducedMotion = useReducedMotion();
  const colors = useThemeColors();

  const entering = reducedMotion
    ? FadeIn.duration(0)
    : FadeInDown.delay(40).springify().damping(22).stiffness(180);

  return (
    <Animated.View
      style={styles.hero}
      entering={entering}
      accessibilityRole="header"
      accessibilityLabel="Xác minh mã OTP"
    >
      <Text style={[styles.eyebrow, { color: colors.text.tertiary }]}>
        Chỉ còn một bước nữa
      </Text>
      <Text style={[styles.title, { color: colors.text.primary }]}>
        Xác minh mã OTP
      </Text>
      <Text style={[styles.subtitle, { color: colors.text.secondary }]}>
        Nhập mã đã gửi đến email của bạn để tiếp tục.
      </Text>
      <Text style={[styles.emailText, { color: colors.brand.text }]}>
        {email || "—"}
      </Text>
    </Animated.View>
  );
}
