import React, { useMemo } from "react";
import { TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import { useThemeColors, useThemeMode } from "@/src/theme";
import { LoginBrandGradientTitle } from "./LoginBrandGradientTitle";
import { registerScreenStyles as regStyles } from "../registerScreen.styles";

export type RegisterTopBarProps = {
  top: number;
  left: number;
  right: number;
};

export function RegisterTopBar({ top, left, right }: RegisterTopBarProps) {
  const router = useRouter();
  const { isDark } = useThemeMode();
  const colors = useThemeColors();

  const backSurface = useMemo(
    () =>
      isDark
        ? {
            backgroundColor: "rgba(255,255,255,0.08)",
            borderColor: "rgba(255,255,255,0.14)",
          }
        : {
            backgroundColor: "rgba(255,255,255,0.45)",
            borderColor: "rgba(255,255,255,0.5)",
          },
    [isDark],
  );

  return (
    <View
      style={[regStyles.topBar, { top, left, right }]}
      pointerEvents="box-none"
    >
      <TouchableOpacity
        onPress={() => router.back()}
        style={[
          regStyles.backButton,
          backSurface,
        ]}
        accessibilityRole="button"
        accessibilityLabel="Quay lại"
        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
      >
        <Ionicons
          name="arrow-back"
          size={21}
          color={colors.text.primary}
        />
      </TouchableOpacity>
      <View style={regStyles.brandBesideBack} pointerEvents="none">
        <LoginBrandGradientTitle />
      </View>
    </View>
  );
}
