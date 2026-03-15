/**
 * Switch Component - Shadcn-style
 * Toggle switch for boolean values
 */

import React, { memo, forwardRef, useEffect, useRef } from "react";
import {
  TouchableOpacity,
  View,
  Animated,
  StyleSheet,
  ViewStyle,
} from "react-native";
import { useTheme } from "@/src/theme";

export interface SwitchProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
  style?: ViewStyle;
  testID?: string;
  accessibilityLabel?: string;
}

export const Switch = memo(
  forwardRef<View, SwitchProps>(function Switch(
    {
      checked,
      onCheckedChange,
      disabled = false,
      size = "md",
      style,
      testID,
      accessibilityLabel,
    },
    ref,
  ) {
    const theme = useTheme();
    const sizeValues = {
      sm: { width: 36, height: 20, thumb: 16 },
      md: { width: 44, height: 24, thumb: 20 },
      lg: { width: 52, height: 28, thumb: 24 },
    };

    const { width, height, thumb: thumbSize } = sizeValues[size];

    const animatedValue = useRef(new Animated.Value(checked ? 1 : 0)).current;

    useEffect(() => {
      Animated.timing(animatedValue, {
        toValue: checked ? 1 : 0,
        duration: 200,
        useNativeDriver: false,
      }).start();
    }, [checked, animatedValue]);

    const thumbPosition = animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [2, width - thumbSize - 2],
    });

    const handlePress = () => {
      if (disabled) return;
      onCheckedChange(!checked);
    };

    const styles = StyleSheet.create({
      container: {
        width,
        height,
        borderRadius: height / 2,
        justifyContent: "center",
        opacity: disabled ? 0.5 : 1,
      },
      thumb: {
        width: thumbSize,
        height: thumbSize,
        borderRadius: thumbSize / 2,
        backgroundColor: theme.colors.surface.default,
        shadowColor: theme.colors.text.primary,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 2,
      },
    });

    // Dynamic background color based on state
    const containerStyle = {
      ...styles.container,
      backgroundColor: checked
        ? theme.colors.brand.default
        : theme.colors.border.default,
    };

    return (
      <TouchableOpacity
        ref={ref}
        style={[containerStyle, style]}
        onPress={handlePress}
        disabled={disabled}
        testID={testID}
        activeOpacity={0.7}
        accessibilityRole="switch"
        accessibilityState={{ checked }}
        accessibilityLabel={accessibilityLabel}
      >
        <Animated.View
          style={[
            styles.thumb,
            {
              transform: [{ translateX: thumbPosition }],
            },
          ]}
        />
      </TouchableOpacity>
    );
  }),
);
