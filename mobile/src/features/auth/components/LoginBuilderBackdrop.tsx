import React from "react";
import { View, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

/**
 * Nền tối giản (design-builder / shadcn): gradient rất nhẹ, không orb.
 */
export function LoginBuilderBackdrop({ isDark }: { isDark: boolean }) {
  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      {isDark ? (
        <LinearGradient
          colors={["#0c0e12", "#12151c", "#0c0e12"]}
          locations={[0, 0.5, 1]}
          style={StyleSheet.absoluteFill}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        />
      ) : (
        <LinearGradient
          colors={["#fafafa", "#f4f4f5", "#fafafa"]}
          locations={[0, 0.45, 1]}
          style={StyleSheet.absoluteFill}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        />
      )}
    </View>
  );
}
