import React, { useMemo } from "react";
import { TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import { useThemeColors } from "@/src/theme";
import { LoginBrandGradientTitle } from "./LoginBrandGradientTitle";
import { registerScreenStyles as regStyles } from "../registerScreen.styles";

export type RegisterTopBarProps = {
  top: number;
  left: number;
  right: number;
  /** Thay cho `router.back()` (vd. pairing → đăng xuất và về login). */
  onBackPress?: () => void;
  /** Mặc định true — register/forgot; pairing chỉ cần nút back. */
  showBrand?: boolean;
  accessibilityLabel?: string;
};

export function RegisterTopBar({
  top,
  left,
  right,
  onBackPress,
  showBrand = true,
  accessibilityLabel = "Quay lại",
}: RegisterTopBarProps) {
  const router = useRouter();
  const colors = useThemeColors();

  const backSurface = useMemo(
    () => ({
      backgroundColor: "rgba(255,255,255,0.45)",
      borderColor: "rgba(255,255,255,0.5)",
    }),
    [],
  );

  return (
    <View
      style={[regStyles.topBar, { top, left, right }]}
      pointerEvents="box-none"
    >
      <TouchableOpacity
        onPress={() => (onBackPress ? onBackPress() : router.back())}
        style={[
          regStyles.backButton,
          backSurface,
        ]}
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel}
        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
      >
        <Ionicons
          name="arrow-back"
          size={21}
          color={colors.text.primary}
        />
      </TouchableOpacity>
      {showBrand ? (
        <View style={regStyles.brandBesideBack} pointerEvents="none">
          <LoginBrandGradientTitle />
        </View>
      ) : null}
    </View>
  );
}
