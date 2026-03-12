/**
 * Separator Component - Shadcn-style
 * Displays horizontal or vertical separators
 */

import React, { memo } from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { tokens } from './tokens';
import { useTheme } from './theme-provider';

interface SeparatorProps {
  orientation?: 'horizontal' | 'vertical';
  decorative?: boolean;
  style?: ViewStyle;
}

export const Separator = memo(function Separator({
  orientation = 'horizontal',
  decorative = true,
  style,
}: SeparatorProps) {
  const { theme } = useTheme();

  const styles = StyleSheet.create({
    horizontal: {
      height: 1,
      backgroundColor: theme.colors.border,
      width: '100%',
    },
    vertical: {
      width: 1,
      backgroundColor: theme.colors.border,
      height: '100%',
    },
  });

  return (
    <View
      style={[
        orientation === 'horizontal' ? styles.horizontal : styles.vertical,
        style,
      ]}
      accessible={decorative ? false : undefined}
      accessibilityRole={decorative ? undefined : 'separator'}
    />
  );
});
