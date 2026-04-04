import React from "react";
import { View, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";

import { Text } from "@/src/components/atoms/Text";
import { useThemeColors, useThemeMode } from "@/src/theme";
import { loginFigmaLight } from "@/src/theme/emplus-design-tokens";
import { useReducedMotion } from "@/src/hooks/use-reduced-motion";

import { LoginFooterSlot } from "./LoginFooterSlot";
import { loginScreenStyles as styles } from "../loginScreen.styles";

export function LoginSignUpFooter() {
  const router = useRouter();
  const { isDark } = useThemeMode();
  const colors = useThemeColors();
  const reducedMotion = useReducedMotion();
  const enteringFooter = reducedMotion
    ? FadeIn.duration(0)
    : FadeInDown.delay(260).springify().damping(24).stiffness(200);

  return (
    <Animated.View entering={enteringFooter}>
      <LoginFooterSlot>
        <View style={styles.signUpContainer}>
          <Text
            style={[
              styles.signUpLabel,
              {
                color: isDark
                  ? colors.text.secondary
                  : loginFigmaLight.footerMuted,
              },
            ]}
          >
            Chưa có tài khoản?
          </Text>
          <TouchableOpacity
            onPress={() => {
              router.push("/register");
            }}
            accessibilityRole="button"
            accessibilityLabel="Đăng ký tài khoản mới"
            hitSlop={{ top: 12, bottom: 12, left: 8, right: 8 }}
          >
            <Text
              style={[styles.signUpText, { color: colors.brand.text }]}
            >
              Đăng ký ngay
            </Text>
          </TouchableOpacity>
        </View>
      </LoginFooterSlot>
    </Animated.View>
  );
}
