/**
 * Theme Switcher Hook
 * Switch between Telegram and Aura design systems
 * With manual dark/light mode override
 */

import { useColorScheme } from "react-native";
import {
  lightColors as telegramLight,
  darkColors as telegramDark,
  type SemanticColors,
} from "./tokens/semantic";
import {
  auraLightColors as auraLight,
  auraDarkColors as auraDark,
  type AuraColorTokens,
} from "./aura-colors";
import { useThemeMode } from "./theme-mode-context";

export type ThemeStyle = "telegram" | "aura";

export interface Theme {
  name: ThemeStyle;
  colors: SemanticColors | AuraColorTokens;
  isDark: boolean;
}

// Store current theme style
let currentThemeStyle: ThemeStyle = "telegram";

export function setThemeStyle(style: ThemeStyle) {
  currentThemeStyle = style;
}

export function getThemeStyle(): ThemeStyle {
  return currentThemeStyle;
}

export function useTheme(): Theme {
  const systemScheme = useColorScheme();
  const { colorScheme: manualScheme, isDark } = useThemeMode();

  // Use manual override if set, otherwise use system
  const effectiveScheme = manualScheme ?? systemScheme;
  const isDarkMode = isDark || effectiveScheme === "dark";

  // Get colors based on theme style and dark/light mode
  const colors =
    currentThemeStyle === "aura"
      ? isDarkMode
        ? auraDark
        : auraLight
      : isDarkMode
        ? telegramDark
        : telegramLight;

  return {
    name: currentThemeStyle,
    colors: colors,
    isDark: isDarkMode,
  };
}
