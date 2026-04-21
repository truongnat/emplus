import React from "react";
import { View } from "react-native";
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";

import { EmplusLottie } from "@/src/components/atoms/EmplusLottie";
import { Text } from "@/src/components/atoms/Text";
import { useReducedMotion } from "@/src/hooks/use-reduced-motion";
import { lottieInventory } from "@/src/lottie/inventory";
import { useThemeColors } from "@/src/theme";

import { loginScreenStyles as styles } from "../loginScreen.styles";

export function LoginHeroSection() {
  const reducedMotion = useReducedMotion();
  const colors = useThemeColors();
  const enteringHero = reducedMotion
    ? FadeIn.duration(0)
    : FadeInDown.delay(40).springify().damping(22).stiffness(180);

  return (
    <Animated.View
      style={styles.header}
      entering={enteringHero}
      accessibilityRole="header"
      accessibilityLabel="Em+, đăng nhập"
    >
      <Text style={[styles.heroEyebrow, { color: colors.text.tertiary }]}>
        Bắt đầu nhẹ nhàng
      </Text>
      <View style={styles.logoMark}>
        <EmplusLottie
          source={lottieInventory.loginCatLove}
          style={styles.logoLottie}
          loop={false}
          speed={0.7}
        />
      </View>
      <Text style={[styles.heroTitle, { color: colors.text.primary }]}>
        Vào lại Em+
      </Text>
      <Text style={[styles.heroSubtitle, { color: colors.text.secondary }]}>
        Xem điều quan trọng sắp tới và tiếp tục dùng một mình trước khi ghép đôi khi cần.
      </Text>
    </Animated.View>
  );
}
