import React from "react";
import { View } from "react-native";
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { Text } from "@/src/components/atoms/Text";
import { useThemeColors, useThemeMode } from "@/src/theme";
import { useReducedMotion } from "@/src/hooks/use-reduced-motion";

import { forgotPasswordStyles as styles } from "../forgotPassword.styles";

export function ForgotPasswordHeroSection() {
  const reducedMotion = useReducedMotion();
  const { isDark } = useThemeMode();
  const colors = useThemeColors();

  const entering = reducedMotion
    ? FadeIn.duration(0)
    : FadeInDown.delay(40).springify().damping(22).stiffness(180);

  const circleSurface = isDark
    ? {
        backgroundColor: "rgba(255,255,255,0.08)",
        borderColor: "rgba(255,255,255,0.14)",
      }
    : {
        backgroundColor: "rgba(255,255,255,0.5)",
        borderColor: "rgba(255,107,129,0.22)",
      };

  return (
    <Animated.View
      style={styles.hero}
      entering={entering}
      accessibilityRole="header"
      accessibilityLabel="Quên mật khẩu"
    >
      <View style={[styles.iconCircle, circleSurface]}>
        <MaterialCommunityIcons
          name="lock-reset"
          size={40}
          color={colors.brand.default}
        />
      </View>
      <Text style={[styles.title, { color: colors.text.primary }]}>
        Quên mật khẩu?
      </Text>
      <Text style={[styles.subtitle, { color: colors.text.secondary }]}>
        Nhập email của bạn để nhận mã xác thực đặt lại mật khẩu.
      </Text>
    </Animated.View>
  );
}
