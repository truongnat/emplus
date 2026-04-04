import React from "react";
import { View } from "react-native";
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";

import { EmplusLottie } from "@/src/components/atoms/EmplusLottie";
import { useReducedMotion } from "@/src/hooks/use-reduced-motion";
import { lottieInventory } from "@/src/lottie/inventory";

import { loginScreenStyles as styles } from "../loginScreen.styles";

export function LoginHeroSection() {
  const reducedMotion = useReducedMotion();
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
      <View style={styles.logoMark}>
        <EmplusLottie
          source={lottieInventory.loginCatLove}
          style={styles.logoLottie}
          loop
          speed={0.82}
        />
      </View>
    </Animated.View>
  );
}
