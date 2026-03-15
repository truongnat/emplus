/**
 * Glass Morphism Utilities
 * Telegram-style liquid glass effects
 */

import { ViewStyle } from "react-native";

interface GlassOptions {
  intensity?: number; // 0-100, blur intensity
  opacity?: number; // 0-1, background opacity
  borderOpacity?: number; // 0-1, border opacity
  shadow?: boolean; // Add shadow
  variant?: "light" | "dark" | "ultra";
}

/**
 * Create glass morphism style
 * @example
 * glass({ intensity: 60, opacity: 0.7 })
 */
export function glass(options: GlassOptions = {}): ViewStyle {
  const {
    intensity = 50,
    opacity = 0.7,
    borderOpacity = 0.5,
    shadow = true,
    variant = "light",
  } = options;

  const baseStyles: ViewStyle = {
    // Backdrop blur (requires expo-blur)
    // Note: Apply BlurView as parent for actual blur effect

    // Translucent background
    backgroundColor:
      variant === "dark"
        ? `rgba(20, 20, 30, ${opacity * 0.9})`
        : variant === "ultra"
          ? `rgba(255, 255, 255, ${opacity * 0.5})`
          : `rgba(255, 255, 255, ${opacity})`,

    // Subtle border
    borderWidth: 1,
    borderColor:
      variant === "dark"
        ? `rgba(255, 255, 255, ${borderOpacity * 0.3})`
        : `rgba(255, 255, 255, ${borderOpacity})`,

    // Smooth corners
    overflow: "hidden",
  };

  if (shadow) {
    return {
      ...baseStyles,
      // iOS shadow
      shadowColor: variant === "dark" ? "#000" : "#000",
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: variant === "dark" ? 0.3 : 0.1,
      shadowRadius: 24,
      // Android elevation
      elevation: 12,
    };
  }

  return baseStyles;
}

/**
 * Liquid gradient for backgrounds
 * Creates smooth, flowing gradient effect
 */
export function liquidGradient(colors: string[] = []): ViewStyle {
  const defaultColors = [
    "rgba(244, 63, 94, 0.15)", // Rose tint
    "rgba(255, 255, 255, 0.05)", // Clear
    "rgba(244, 63, 94, 0.08)", // Soft rose
  ];

  return {
    backgroundColor: "transparent",
  };
}

/**
 * Glass card preset
 * Ready-to-use glass card style
 */
export function glassCard(options?: GlassOptions): ViewStyle {
  return {
    ...glass({ ...options, intensity: 60, opacity: 0.75 }),
    borderRadius: 24,
    padding: 20,
  };
}

/**
 * Glass button preset
 * Ready-to-use glass button style
 */
export function glassButton(
  options?: GlassOptions & { pressed?: boolean },
): ViewStyle {
  const { pressed, ...rest } = options || {};

  return {
    ...glass({ ...rest, opacity: pressed ? 0.9 : 0.6 }),
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderWidth: pressed ? 1.5 : 1,
  };
}

/**
 * Glass input preset
 * Ready-to-use glass input style
 */
export function glassInput(options?: GlassOptions): ViewStyle {
  return {
    ...glass({ ...options, opacity: 0.5 }),
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderWidth: 1,
  };
}

/**
 * Floating glass orb effect
 * For decorative background elements
 */
export function glassOrb(size: number, color: string): ViewStyle {
  return {
    width: size,
    height: size,
    borderRadius: size / 2,
    backgroundColor: color,
    opacity: 0.3,
    // Soft glow
    shadowColor: color,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: size / 4,
    elevation: 8,
  };
}
