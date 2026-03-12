/**
 * Badge Component - Shadcn-style
 * Displays status or category badges
 */

import React, { memo } from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { tokens } from '../tokens';
import { useTheme } from '../theme-provider';

type BadgeVariant = 'default' | 'secondary' | 'outline' | 'destructive' | 'success' | 'warning';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  size?: 'sm' | 'md';
  dot?: boolean;
  style?: ViewStyle;
  textStyle?: ViewStyle;
}

export const Badge = memo(function Badge({
  children,
  variant = 'default',
  size = 'md',
  dot = false,
  style,
  textStyle,
}: BadgeProps) {
  const { theme } = useTheme();

  const variantStyles = {
    default: {
      backgroundColor: theme.colors.primary,
      color: theme.colors.textInverse,
    },
    secondary: {
      backgroundColor: theme.colors.backgroundMuted,
      color: theme.colors.text,
    },
    outline: {
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: theme.colors.border,
      color: theme.colors.text,
    },
    destructive: {
      backgroundColor: theme.colors.danger,
      color: theme.colors.textInverse,
    },
    success: {
      backgroundColor: theme.colors.success,
      color: theme.colors.textInverse,
    },
    warning: {
      backgroundColor: theme.colors.warning,
      color: theme.colors.textInverse,
    },
  };

  const sizeStyles = {
    sm: {
      paddingHorizontal: tokens.space['2xs'].value,
      paddingVertical: tokens.space['3xs'].value,
      fontSize: tokens.typography.fontSize['1'].value,
    },
    md: {
      paddingHorizontal: tokens.space['2xs'].value,
      paddingVertical: tokens.space.xs.value,
      fontSize: tokens.typography.fontSize['2'].value,
    },
  };

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      borderRadius: tokens.radius.pill.value,
      ...variantStyles[variant],
      ...sizeStyles[size],
    },
    dot: {
      width: 6,
      height: 6,
      borderRadius: 3,
      backgroundColor: 'currentColor',
      marginRight: tokens.space['2xs'].value,
    },
    text: {
      fontWeight: '600',
      ...textStyle,
    },
  });

  return (
    <View style={[styles.container, style]}>
      {dot && <View style={styles.dot} />}
      <Text style={[styles.text, { color: variantStyles[variant].color }]}>{children}</Text>
    </View>
  );
});
