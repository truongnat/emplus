import React from "react";
import { View } from "react-native";
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { Text } from "@/src/components/atoms/Text";
import { useThemeColors } from "@/src/theme";
import { useReducedMotion } from "@/src/hooks/use-reduced-motion";

import { forgotPasswordStyles as styles } from "../forgotPassword.styles";

export function ForgotPasswordHeroSection() {
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
      accessibilityLabel="Quên mật khẩu"
    >
      <Text style={[styles.eyebrow, { color: colors.text.tertiary }]}>
        Đặt lại nhanh
      </Text>
      <View
        style={[
          styles.iconCircle,
          {
            backgroundColor: "rgba(255,253,252,0.82)",
            borderColor: "rgba(131,111,99,0.14)",
          },
        ]}
      >
        <MaterialCommunityIcons
          name="lock-reset"
          size={28}
          color={colors.brand.default}
        />
      </View>
      <Text style={[styles.title, { color: colors.text.primary }]}>
        Quên mật khẩu
      </Text>
      <Text style={[styles.subtitle, { color: colors.text.secondary }]}>
        Nhập email để nhận mã xác thực.
      </Text>
    </Animated.View>
  );
}
