import React, { ReactNode } from "react";
import { View, StyleSheet, ViewStyle } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { EmplusLottie } from "@/src/components/atoms/EmplusLottie";
import { useThemeColors, useThemeMeta, getScreenGradientColors, gradientLocations } from "@/src/theme";
import type { EmplusLottieProps } from "@/src/components/atoms/EmplusLottie";

export interface LottieHeroProps {
  source: EmplusLottieProps["source"];
  children?: ReactNode;
  /** Chiều cao vùng Lottie (pt) */
  lottieHeight?: number;
  style?: ViewStyle;
}

/**
 * Hero auth / onboarding: gradient + Lottie lớn + slot nội dung phía dưới.
 */
export function LottieHero({
  source,
  children,
  lottieHeight = 200,
  style,
}: LottieHeroProps) {
  const colors = useThemeColors();
  const { isDark } = useThemeMeta();
  const grad = getScreenGradientColors(isDark);

  return (
    <LinearGradient
      colors={[...grad.hero]}
      locations={[...gradientLocations.hero]}
      style={[styles.gradient, style]}
    >
      <View style={[styles.lottieBlock, { height: lottieHeight }]}>
        <EmplusLottie
          source={source}
          style={{ width: lottieHeight, height: lottieHeight }}
          loop
          speed={0.9}
        />
      </View>
      {children ? (
        <View style={[styles.sheet, { backgroundColor: colors.surface.default }]}>
          {children}
        </View>
      ) : null}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  lottieBlock: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 8,
  },
  sheet: {
    flex: 1,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
});
