/**
 * Alert Component - Shadcn-style
 * Displays alert messages with variants
 */

import React, { memo } from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { tokens } from '../tokens';
import { useTheme } from '../theme-provider';
import { Ionicons } from '@expo/vector-icons';

type AlertVariant = 'default' | 'destructive' | 'success' | 'warning' | 'info';

interface AlertProps {
  title?: string;
  description?: string;
  variant?: AlertVariant;
  icon?: keyof typeof Ionicons.glyphMap;
  showIcon?: boolean;
  style?: ViewStyle;
  children?: React.ReactNode;
}

export const Alert = memo(function Alert({
  title,
  description,
  variant = 'default',
  icon,
  showIcon = true,
  style,
  children,
}: AlertProps) {
  const { theme } = useTheme();

  const variantStyles = {
    default: {
      backgroundColor: theme.colors.background,
      borderColor: theme.colors.border,
      icon: 'information-circle',
      iconColor: theme.colors.info,
    },
    destructive: {
      backgroundColor: theme.colors.dangerMuted,
      borderColor: theme.colors.danger,
      icon: 'alert-circle',
      iconColor: theme.colors.danger,
    },
    success: {
      backgroundColor: theme.colors.successMuted,
      borderColor: theme.colors.success,
      icon: 'checkmark-circle',
      iconColor: theme.colors.success,
    },
    warning: {
      backgroundColor: theme.colors.warningMuted,
      borderColor: theme.colors.warning,
      icon: 'warning',
      iconColor: theme.colors.warning,
    },
    info: {
      backgroundColor: theme.colors.infoMuted,
      borderColor: theme.colors.info,
      icon: 'information-circle',
      iconColor: theme.colors.info,
    },
  };

  const currentVariant = variantStyles[variant];
  const iconName = icon || currentVariant.icon;

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      borderRadius: tokens.radius.md.value,
      borderWidth: 1,
      borderColor: currentVariant.borderColor,
      backgroundColor: currentVariant.backgroundColor,
      padding: tokens.space.md.value,
      gap: tokens.space.sm.value,
    },
    iconContainer: {
      paddingTop: 2,
    },
    content: {
      flex: 1,
      gap: tokens.space['2xs'].value,
    },
    title: {
      fontSize: tokens.typography.fontSize['3'].value,
      fontWeight: '600',
      color: theme.colors.text,
    },
    description: {
      fontSize: tokens.typography.fontSize['2'].value,
      color: theme.colors.textMuted,
      lineHeight: tokens.typography.lineHeight['3'].value,
    },
  });

  return (
    <View style={[styles.container, style]}>
      {showIcon && (
        <View style={styles.iconContainer}>
          <Ionicons name={iconName} size={20} color={currentVariant.iconColor} />
        </View>
      )}
      <View style={styles.content}>
        {title && <Text style={styles.title}>{title}</Text>}
        {description && <Text style={styles.description}>{description}</Text>}
        {children}
      </View>
    </View>
  );
});
