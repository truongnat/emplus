import React from "react";
import { View } from "react-native";
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";

import { Text } from "@/src/components/atoms/Text";
import { EmplusLottie } from "@/src/components/atoms/EmplusLottie";
import { useThemeColors } from "@/src/theme";
import { useReducedMotion } from "@/src/hooks/use-reduced-motion";
import { lottieInventory } from "@/src/lottie/inventory";

import {
  verifyOtpLottieHero,
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
      <View style={styles.lottieHeroWrap}>
        <EmplusLottie
          source={lottieInventory.verifyOtpPasswordAuth}
          style={verifyOtpLottieHero}
          loop
          speed={0.9}
        />
      </View>
      <Text style={[styles.title, { color: colors.text.primary }]}>
        Nhập mã xác nhận
      </Text>
      <Text style={[styles.subtitle, { color: colors.text.secondary }]}>
        Mã OTP đã được gửi đến email
      </Text>
      <Text style={[styles.emailText, { color: colors.brand.text }]}>
        {email || "—"}
      </Text>
    </Animated.View>
  );
}
