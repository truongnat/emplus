/**
 * Avatar Component - Shadcn-style
 * Displays user avatar with fallback initials
 */

import React, { memo } from 'react';
import { View, Text, Image, StyleSheet, ViewStyle } from 'react-native';
import { tokens } from '../tokens';
import { useTheme } from '../theme-provider';

interface AvatarProps {
  src?: string;
  alt?: string;
  fallback?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  shape?: 'circle' | 'square' | 'rounded';
  style?: ViewStyle;
}

export const Avatar = memo(function Avatar({
  src,
  alt,
  fallback = '',
  size = 'md',
  shape = 'circle',
  style,
}: AvatarProps) {
  const { theme } = useTheme();

  const sizeValue = tokens.size[size]?.value || tokens.size.md.value;
  const fontSize = sizeValue * 0.4;

  const borderRadius = shape === 'circle' 
    ? sizeValue 
    : shape === 'rounded' 
      ? tokens.radius.md.value 
      : tokens.radius.none.value;

  const styles = StyleSheet.create({
    container: {
      width: sizeValue,
      height: sizeValue,
      borderRadius,
      overflow: 'hidden',
      backgroundColor: theme.colors.backgroundMuted,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    image: {
      width: sizeValue,
      height: sizeValue,
    },
    fallback: {
      fontSize,
      fontWeight: '600',
      color: theme.colors.textMuted,
      textTransform: 'uppercase',
    },
  });

  if (src) {
    return (
      <View style={[styles.container, style]} accessibilityLabel={alt}>
        <Image source={{ uri: src }} style={styles.image} accessibilityRole="image" />
      </View>
    );
  }

  return (
    <View style={[styles.container, style]} accessibilityLabel={alt}>
      <Text style={styles.fallback}>{fallback.charAt(0).toUpperCase()}</Text>
    </View>
  );
});
