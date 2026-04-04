/**
 * Glass Components
 * Telegram-style liquid glass morphism with expo-blur and expo-glass-effect
 */

import React from "react";
import {
  View,
  ViewStyle,
  StyleSheet,
  Pressable,
  StyleProp,
} from "react-native";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { LiquidGlassView, isLiquidGlassSupported } from "./LiquidGlassView";

interface GlassCardProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  intensity?: number;
  tint?: "light" | "dark" | "default";
  isLiquid?: boolean;
}

/**
 * GlassCard - Main glass container with blur effect
 */
export function GlassCard({
  children,
  style,
  intensity = 60,
  tint = "default",
  isLiquid = false,
}: GlassCardProps) {
  // Use LiquidGlassView if requested and supported
  if (isLiquid && isLiquidGlassSupported) {
    return (
      <LiquidGlassView
        style={[styles.liquidCardShell, style]}
        glassStyle={tint === "dark" ? "regular" : "clear"}
        colorScheme={tint === "dark" ? "dark" : "light"}
        tintColor={
          tint === "dark"
            ? "rgba(255, 255, 255, 0.08)"
            : "rgba(255, 255, 255, 0.45)"
        }
      >
        <View style={styles.cardContent}>{children}</View>
      </LiquidGlassView>
    );
  }

  // Default expo-blur version
  return (
    <BlurView
      intensity={intensity}
      tint={tint}
      style={[styles.blurContainer, style]}
    >
      <LinearGradient
        colors={
          tint === "dark"
            ? ["rgba(0, 0, 0, 0.4)", "rgba(0, 0, 0, 0.3)"]
            : ["rgba(255, 255, 255, 0.72)", "rgba(255, 255, 255, 0.65)"]
        }
        style={styles.gradient}
      >
        <View style={styles.cardContent}>{children}</View>
      </LinearGradient>
    </BlurView>
  );
}

/**
 * GlassButton - Button with glass effect
 */
interface GlassButtonProps {
  children: React.ReactNode;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  isLiquid?: boolean;
}

export function GlassButton({
  children,
  onPress,
  style,
  isLiquid = false,
}: GlassButtonProps) {
  if (isLiquid && isLiquidGlassSupported) {
    return (
      <Pressable onPress={onPress}>
        <LiquidGlassView
          style={[styles.button, style]}
          isInteractive
          glassStyle="clear"
        >
          {children}
        </LiquidGlassView>
      </Pressable>
    );
  }

  return (
    <Pressable onPress={onPress}>
      <BlurView
        intensity={50}
        tint="light"
        style={[styles.blurContainer, { borderRadius: 16 }, style]}
      >
        <LinearGradient
          colors={["rgba(255, 255, 255, 0.6)", "rgba(255, 255, 255, 0.5)"]}
          style={styles.gradient}
        >
          <View style={styles.buttonContent}>{children}</View>
        </LinearGradient>
      </BlurView>
    </Pressable>
  );
}

/**
 * GlassOrb - Decorative floating glass orb
 */
interface GlassOrbProps {
  size?: number;
  color?: string;
  style?: StyleProp<ViewStyle>;
}

export function GlassOrb({ size = 100, color, style }: GlassOrbProps) {
  return (
    <View style={[styles.orbContainer, { width: size, height: size }, style]}>
      <BlurView intensity={80} tint="light" style={StyleSheet.absoluteFill}>
        <LinearGradient
          colors={[
            color || "rgba(244, 63, 94, 0.3)",
            color || "rgba(244, 63, 94, 0.1)",
            "transparent",
          ]}
          style={StyleSheet.absoluteFill}
        />
      </BlurView>
    </View>
  );
}

const styles = StyleSheet.create({
  blurContainer: {
    overflow: "hidden",
    borderRadius: 24,
  },
  gradient: {
    flex: 1,
  },
  cardContent: {
    padding: 20,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
  },
  card: {
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
  },
  /** Không padding ở đây — `cardContent` giống nhánh blur. */
  liquidCardShell: {
    borderRadius: 24,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
  },
  buttonContent: {
    paddingVertical: 14,
    paddingHorizontal: 24,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.4)",
  },
  button: {
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 24,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.4)",
  },
  orbContainer: {
    borderRadius: 9999,
    overflow: "hidden",
  },
});
