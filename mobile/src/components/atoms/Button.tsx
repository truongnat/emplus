/**
 * Button - Primary action button with animations
 */

import React, { ReactNode, useMemo, useRef, useCallback } from "react";
import {
  TouchableOpacity,
  TouchableOpacityProps,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  Animated,
} from "react-native";
import { useTheme } from "@/src/theme";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "danger";
type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends TouchableOpacityProps {
  label?: string;
  children?: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  style?: ViewStyle;
  /** Accessibility label for screen readers */
  accessibilityLabel?: string;
  /** Accessibility hint for screen readers */
  accessibilityHint?: string;
}

export function Button({
  label,
  children,
  variant = "primary",
  size = "md",
  loading = false,
  disabled = false,
  fullWidth = false,
  leftIcon,
  rightIcon,
  style,
  accessibilityLabel,
  accessibilityHint,
  onPress,
  onPressIn,
  onPressOut,
  ...props
}: ButtonProps) {
  const theme = useTheme();
  const isDisabled = disabled || loading;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = useCallback(
    (e: any) => {
      if (!isDisabled) {
        Animated.spring(scaleAnim, {
          toValue: 0.96,
          useNativeDriver: true,
          tension: 300,
          friction: 10,
        }).start();
      }
      onPressIn?.(e);
    },
    [isDisabled, scaleAnim, onPressIn],
  );

  const handlePressOut = useCallback(
    (e: any) => {
      if (!isDisabled) {
        Animated.spring(scaleAnim, {
          toValue: 1,
          useNativeDriver: true,
          tension: 300,
          friction: 10,
        }).start();
      }
      onPressOut?.(e);
    },
    [isDisabled, scaleAnim, onPressOut],
  );

  const dynamicStyles = useMemo(
    () =>
      StyleSheet.create({
        primary: {
          backgroundColor: theme.colors.brand.default,
          borderRadius: theme.radius.md,
          shadowColor: theme.colors.brand.default,
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.25,
          shadowRadius: 12,
          elevation: 6,
        },
        secondary: {
          backgroundColor: theme.colors.brand.muted,
          borderRadius: theme.radius.md,
          borderWidth: 1.5,
          borderColor: theme.colors.brand.subtle,
        },
        outline: {
          backgroundColor: "transparent",
          borderWidth: 1.5,
          borderColor: theme.colors.brand.default,
          borderRadius: theme.radius.md,
        },
        ghost: {
          backgroundColor: "transparent",
          borderRadius: theme.radius.md,
          paddingVertical: 8,
          paddingHorizontal: 12,
        },
        danger: {
          backgroundColor: theme.colors.status.error.bg,
          borderRadius: theme.radius.md,
          borderWidth: 1.5,
          borderColor: theme.colors.status.error.border,
        },
        primaryLabel: {
          color: theme.colors.text.onBrand,
        },
        secondaryLabel: {
          color: theme.colors.brand.text,
        },
        outlineLabel: {
          color: theme.colors.brand.default,
        },
        ghostLabel: {
          color: theme.colors.brand.default,
        },
        dangerLabel: {
          color: theme.colors.status.error.text,
        },
      }),
    [theme.colors],
  );

  return (
    <TouchableOpacity
      disabled={isDisabled}
      activeOpacity={0.7}
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel || label}
      accessibilityHint={accessibilityHint}
      accessibilityState={{ disabled: isDisabled }}
      style={[
        styles.button,
        styles[size],
        dynamicStyles[variant],
        fullWidth && styles.fullWidth,
        isDisabled && styles.disabled,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator
          color={
            variant === "secondary" || variant === "ghost"
              ? theme.colors.brand.default
              : theme.colors.text.onBrand
          }
          size="small"
        />
      ) : (
        <Animated.View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            transform: [{ scale: scaleAnim }],
          }}
        >
          {leftIcon}
          <Text
            style={[
              styles.label,
              dynamicStyles[`${variant}Label` as keyof typeof dynamicStyles],
              styles[`${size}Label` as keyof typeof styles],
            ]}
          >
            {label || children}
          </Text>
          {rightIcon}
        </Animated.View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 9999,
    overflow: "hidden",
  },
  sm: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    minHeight: 36,
  },
  md: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    minHeight: 52,
  },
  lg: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    minHeight: 60,
  },
  fullWidth: {
    width: "100%",
  },
  disabled: {
    opacity: 0.5,
  },
  label: {
    fontSize: 15,
    fontWeight: "600",
  },
  smLabel: {
    fontSize: 13,
  },
  mdLabel: {
    fontSize: 15,
  },
  lgLabel: {
    fontSize: 17,
  },
});
