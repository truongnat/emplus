import React, { memo } from "react";
import { View, StyleSheet } from "react-native";
import { palette } from "@/src/theme/tokens";

interface LiquidProgressBarProps {
  progress: number;
}

const styles = StyleSheet.create({
  container: {
    height: 12,
    borderRadius: 6,
    backgroundColor: "rgba(255,255,255,0.6)",
    overflow: "hidden",
  },
  fill: { height: "100%", borderRadius: 6 },
});

export const LiquidProgressBar = memo(
  ({ progress }: LiquidProgressBarProps) => {
    const clampedProgress = Math.min(100, Math.max(0, progress));

    let fillColor: string;
    if (clampedProgress < 50) {
      fillColor = palette.green500;
    } else if (clampedProgress < 75) {
      fillColor = palette.amber500;
    } else {
      fillColor = palette.red500;
    }

    return (
      <View style={styles.container}>
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
  },
);
