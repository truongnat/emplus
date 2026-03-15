import React from "react";
import { View, StyleSheet, ViewStyle, StyleProp } from "react-native";
import {
  GlassView,
  GlassContainer,
  isLiquidGlassAvailable,
} from "expo-glass-effect";

export const isLiquidGlassSupported = isLiquidGlassAvailable();

interface LiquidGlassViewProps {
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  glassStyle?: "regular" | "clear" | "none";
  tintColor?: string;
  colorScheme?: "auto" | "light" | "dark";
  isInteractive?: boolean;
  animate?: boolean;
  animationDuration?: number;
  // Compatibility props
  interactive?: boolean;
  effect?: "regular" | "clear" | "none";
}

/**
 * LiquidGlassView - A wrapper for expo-glass-effect's GlassView
 * Provides native iOS "liquid glass" effects.
 * Falls back to a standard View on unsupported platforms.
 */
export function LiquidGlassView({
  children,
  style,
  glassStyle,
  effect,
  tintColor = "rgba(255, 255, 255, 0.3)",
  colorScheme = "auto",
  isInteractive,
  interactive,
  animate = true,
  animationDuration = 500,
}: LiquidGlassViewProps) {
  const finalStyle = glassStyle || effect || "regular";
  const finalInteractive = isInteractive ?? interactive ?? false;

  if (!isLiquidGlassSupported) {
    return <View style={[styles.fallback, style]}>{children}</View>;
  }

  return (
    <GlassView
      style={[styles.glass, style]}
      glassEffectStyle={{
        style: finalStyle,
        animate: animate,
        animationDuration: animationDuration,
      }}
      tintColor={tintColor}
      colorScheme={colorScheme}
      isInteractive={finalInteractive}
    >
      {children}
    </GlassView>
  );
}

interface LiquidGlassContainerProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  spacing?: number;
}

/**
 * LiquidGlassContainer - Groups multiple GlassView elements so they can "merge"
 */
export function LiquidGlassContainer({
  children,
  style,
  spacing = 20,
}: LiquidGlassContainerProps) {
  if (!isLiquidGlassSupported) {
    return <View style={[styles.container, style]}>{children}</View>;
  }

  return (
    <GlassContainer style={[styles.container, style]} spacing={spacing}>
      {children}
    </GlassContainer>
  );
}

const styles = StyleSheet.create({
  glass: {
    borderRadius: 24,
    overflow: "hidden",
  },
  fallback: {
    borderRadius: 24,
    overflow: "hidden",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  container: {
    flex: 1,
  },
});
