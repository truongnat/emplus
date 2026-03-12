/**
 * Theme Definitions - Light and Dark mode color mappings
 * These themes map tokens to semantic color roles
 */

import type { Themes } from './types';
import { tokens } from './tokens';

export const themes: Themes = {
  light: {
    name: 'light',
    colors: {
      // Backgrounds
      background: tokens.color.white.value,
      backgroundStrong: tokens.color.slate['50'].value,
      backgroundMuted: tokens.color.slate['100'].value,
      
      // Text
      text: tokens.color.ink.value,
      textMuted: tokens.color.muted.value,
      textInverse: tokens.color.white.value,
      
      // Borders
      border: tokens.color.slate['200'].value,
      borderMuted: tokens.color.slate['100'].value,
      
      // Brand colors
      primary: tokens.color.primary.value,
      primaryMuted: tokens.color.primarySoft.value,
      accent: tokens.color.accent.value,
      secondary: tokens.color.secondary.value,
      
      // Semantic colors
      danger: tokens.color.semantic.danger.value,
      dangerMuted: 'rgba(239, 68, 68, 0.1)',
      success: tokens.color.semantic.success.value,
      successMuted: 'rgba(16, 185, 129, 0.1)',
      warning: tokens.color.semantic.warning.value,
      warningMuted: 'rgba(245, 158, 11, 0.1)',
      info: tokens.color.semantic.info.value,
      infoMuted: 'rgba(59, 130, 246, 0.1)',
    },
  },
  
  dark: {
    name: 'dark',
    colors: {
      // Backgrounds - inverted for dark mode
      background: '#0f172a', // slate-900
      backgroundStrong: '#1e293b', // slate-800
      backgroundMuted: '#334155', // slate-700
      
      // Text - lighter for contrast
      text: tokens.color.slate['100'].value,
      textMuted: tokens.color.slate['400'].value,
      textInverse: tokens.color.ink.value,
      
      // Borders
      border: tokens.color.slate['700'].value,
      borderMuted: tokens.color.slate['800'].value,
      
      // Brand colors - adjusted for dark mode
      primary: '#ff4d5a', // Lighter primary for dark mode
      primaryMuted: 'rgba(255, 77, 90, 0.15)',
      accent: '#60a5fa', // Lighter accent
      secondary: '#a78bfa', // Lighter secondary
      
      // Semantic colors - adjusted for visibility
      danger: '#f87171',
      dangerMuted: 'rgba(248, 113, 113, 0.15)',
      success: '#34d399',
      successMuted: 'rgba(52, 211, 153, 0.15)',
      warning: '#fbbf24',
      warningMuted: 'rgba(251, 191, 36, 0.15)',
      info: '#60a5fa',
      infoMuted: 'rgba(96, 165, 250, 0.15)',
    },
  },
};

/**
 * Get theme by name
 */
export function getTheme(name: 'light' | 'dark') {
  return themes[name];
}

/**
 * Get CSS variables for a theme
 * These can be injected into a <style> tag or used with CSS-in-JS
 */
export function getThemeCSSVariables(theme: 'light' | 'dark'): Record<string, string> {
  const themeColors = themes[theme].colors;
  
  return {
    '--color-background': themeColors.background,
    '--color-background-strong': themeColors.backgroundStrong,
    '--color-background-muted': themeColors.backgroundMuted,
    '--color-text': themeColors.text,
    '--color-text-muted': themeColors.textMuted,
    '--color-text-inverse': themeColors.textInverse,
    '--color-border': themeColors.border,
    '--color-border-muted': themeColors.borderMuted,
    '--color-primary': themeColors.primary,
    '--color-primary-muted': themeColors.primaryMuted,
    '--color-accent': themeColors.accent,
    '--color-secondary': themeColors.secondary,
    '--color-danger': themeColors.danger,
    '--color-danger-muted': themeColors.dangerMuted,
    '--color-success': themeColors.success,
    '--color-success-muted': themeColors.successMuted,
    '--color-warning': themeColors.warning,
    '--color-warning-muted': themeColors.warningMuted,
    '--color-info': themeColors.info,
    '--color-info-muted': themeColors.infoMuted,
  };
}
