/**
 * Card - Container component for grouped content
 */

import React, { ReactNode } from "react";
import { View, ViewStyle, StyleSheet } from "react-native";
import { palette } from "@/src/theme/tokens";

export interface CardProps {
  children: ReactNode;
  style?: ViewStyle;
  variant?: "default" | "elevated" | "outlined";
}

export function Card({ children, style, variant = "default" }: CardProps) {
  return <View style={[styles.card, styles[variant], style]}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
  },
  default: {
    borderWidth: 1,
    borderColor: palette.zinc100,
  },
  elevated: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  outlined: {
    borderWidth: 1,
    borderColor: palette.zinc200,
    backgroundColor: "transparent",
  },
});
