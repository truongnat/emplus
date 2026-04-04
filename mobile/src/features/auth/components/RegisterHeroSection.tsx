import React from "react";
import { View } from "react-native";
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";

import { EmplusLottie } from "@/src/components/atoms/EmplusLottie";
import { useReducedMotion } from "@/src/hooks/use-reduced-motion";
import { lottieInventory } from "@/src/lottie/inventory";

import { registerScreenStyles as styles } from "../registerScreen.styles";

export function RegisterHeroSection() {
  const reducedMotion = useReducedMotion();
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
      <View style={styles.registerLogoMark}>
        <EmplusLottie
          source={lottieInventory.registerLoveHearts}
          style={styles.registerLogoLottie}
          loop
          speed={0.88}
        />
      </View>
    </Animated.View>
  );
}
