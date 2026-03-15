/**
 * LoadingOverlay - Full screen loading indicator
 */

import React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { useTheme } from "@/src/theme";

export interface LoadingOverlayProps {
  visible?: boolean;
  label?: string;
}

export function LoadingOverlay({
  visible = true,
  label = "Đang tải...",
}: LoadingOverlayProps) {
  const theme = useTheme();

  if (!visible) return null;

  return (
    <View
      style={[styles.overlay, { backgroundColor: theme.colors.scrim }]}
      accessibilityRole="progressbar"
      accessibilityLabel={label}
      accessibilityLiveRegion="polite"
    >
      <ActivityIndicator color={theme.colors.text.onBrand} size="large" />
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
  },
});
