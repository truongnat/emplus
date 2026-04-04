import React, { useCallback } from "react";
import { StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { PressableScale } from "@/src/ui-kit";
import { RingingBell } from "./HomeDecorations";
import { useThemeColors, useThemeMode } from "@/src/theme";
import { homeDarkChromeButton } from "@/src/theme/emplus-design-tokens";

/**
 * Nút thông báo góc phải — cùng baseline với wordmark "Em+" (home chrome).
 */
export function HomeChromeNotificationButton() {
  const colors = useThemeColors();
  const { isDark } = useThemeMode();
  const router = useRouter();

  const onPress = useCallback(() => {
    router.push("/notifications");
  }, [router]);

  return (
    <PressableScale
      style={[
        styles.button,
        isDark
          ? {
              backgroundColor: homeDarkChromeButton.backgroundColor,
              borderWidth: StyleSheet.hairlineWidth,
              borderColor: homeDarkChromeButton.borderColor,
            }
          : { backgroundColor: colors.surface.default },
      ]}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel="Mở thông báo"
    >
      <RingingBell />
    </PressableScale>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
});
