import React, { memo } from "react";
import { View, StyleSheet } from "react-native";
import { useThemeColors } from "@/src/theme";

interface LiquidProgressBarProps {
  progress: number;
}

export const LiquidProgressBar = memo(function LiquidProgressBar({
  progress,
}: LiquidProgressBarProps) {
  const colors = useThemeColors();
  const clampedProgress = Math.min(100, Math.max(0, progress));

  let fillColor: string;
  if (clampedProgress < 50) {
    fillColor = colors.status.success.icon;
  } else if (clampedProgress < 75) {
    fillColor = colors.status.warning.icon;
  } else {
    fillColor = colors.status.error.icon;
  }

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: "rgba(255,255,255,0.55)" },
      ]}
    >
      <View
        style={[
          styles.fill,
          {
            width: `${clampedProgress}%`,
            backgroundColor: fillColor,
          },
        ]}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    height: 12,
    borderRadius: 6,
    overflow: "hidden",
  },
  fill: { height: "100%", borderRadius: 6 },
});
