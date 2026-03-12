/**
 * Theme Provider - Manages theme state and context
 * Supports automatic light/dark mode detection and manual override
 */

import React, { createContext, useContext, useEffect, useState, useCallback, useMemo, PropsWithChildren } from 'react';
import { useColorScheme, Appearance, StyleSheet } from 'react-native';
import type { Theme, Themes, CSSVariables } from './types';
import { themes, getThemeCSSVariables } from './themes';

// ============================================================================
// Context Types
// ============================================================================

interface ThemeContextValue {
  /** Current active theme */
  theme: Theme;
  /** Theme name ('light' or 'dark') */
  themeName: 'light' | 'dark';
  /** All available themes */
  allThemes: Themes;
  /** Whether dark mode is active */
  isDark: boolean;
  /** Toggle between light and dark mode */
  toggleTheme: () => void;
  /** Set specific theme */
  setTheme: (name: 'light' | 'dark') => void;
  /** Get CSS variables for current theme */
  cssVariables: CSSVariables;
  /** Get themed color by key */
  getColor: (key: keyof Theme['colors']) => string;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

// ============================================================================
// Storage for theme preference
// ============================================================================

const THEME_STORAGE_KEY = '@emplus:theme-preference';

const storage = {
  getItem: async (key: string): Promise<string | null> => {
    try {
      const AsyncStorage = require('@react-native-async-storage/async-storage').default;
      if (AsyncStorage) {
        return await AsyncStorage.getItem(key);
      }
    } catch (error) {
      console.warn('Storage error:', error);
    }
    return null;
  },

  setItem: async (key: string, value: string): Promise<void> => {
    try {
      const AsyncStorage = require('@react-native-async-storage/async-storage').default;
      if (AsyncStorage) {
        await AsyncStorage.setItem(key, value);
      }
    } catch (error) {
      console.warn('Storage error:', error);
    }
  },
};

// ============================================================================
// Theme Provider Component
// ============================================================================

export function ThemeProvider({ children }: PropsWithChildren) {
  const systemColorScheme = useColorScheme();
  const [storedTheme, setStoredTheme] = useState<'light' | 'dark' | null>(null);
  const [mounted, setMounted] = useState(false);

  // Load stored theme preference on mount
  useEffect(() => {
    const loadTheme = async () => {
      const saved = await storage.getItem(THEME_STORAGE_KEY);
      if (saved === 'light' || saved === 'dark') {
        setStoredTheme(saved);
      }
      setMounted(true);
    };
    loadTheme();
  }, []);

  // Determine current theme
  const themeName: 'light' | 'dark' = useMemo(() => {
    if (!mounted) return 'light'; // Default to light during SSR/hydration
    return storedTheme || (systemColorScheme === 'dark' ? 'dark' : 'light');
  }, [storedTheme, systemColorScheme, mounted]);

  const theme = themes[themeName];
  const isDark = themeName === 'dark';

  // Toggle theme
  const toggleTheme = useCallback(async () => {
    const newTheme = themeName === 'light' ? 'dark' : 'light';
    setStoredTheme(newTheme);
    await storage.setItem(THEME_STORAGE_KEY, newTheme);
  }, [themeName]);

  // Set specific theme
  const setTheme = useCallback(async (name: 'light' | 'dark') => {
    setStoredTheme(name);
    await storage.setItem(THEME_STORAGE_KEY, name);
  }, []);

  // Get CSS variables for current theme
  const cssVariables = useMemo(() => getThemeCSSVariables(themeName), [themeName]);

  // Get themed color
  const getColor = useCallback((key: keyof Theme['colors']) => {
    return theme.colors[key];
  }, [theme]);

  // Memoize context value
  const value = useMemo<ThemeContextValue>(() => ({
    theme,
    themeName,
    allThemes: themes,
    isDark,
    toggleTheme,
    setTheme,
    cssVariables,
    getColor,
  }), [theme, themeName, isDark, toggleTheme, setTheme, cssVariables, getColor]);

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

// ============================================================================
// Hooks
// ============================================================================

/**
 * Use theme context
 */
export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    // Return default theme during SSR/hydration to prevent crash
    const colorScheme = Appearance.getColorScheme();
    const themeName = colorScheme === 'dark' ? 'dark' : 'light';
    return {
      theme: themes[themeName],
      themeName,
      allThemes: themes,
      isDark: themeName === 'dark',
      toggleTheme: () => {},
      setTheme: () => {},
      cssVariables: {},
      getColor: () => '#000000',
    };
  }
  return context;
}

/**
 * Check if dark mode is active
 */
export function useIsDark(): boolean {
  const { isDark } = useTheme();
  return isDark;
}

/**
 * Get a specific themed color
 */
export function useThemedColor(key: keyof Theme['colors']): string {
  const { getColor } = useTheme();
  return getColor(key);
}

/**
 * Get CSS variables as inline style
 */
export function useThemeVariables(): React.CSSProperties {
  const { cssVariables } = useTheme();
  return cssVariables as React.CSSProperties;
}

// ============================================================================
// Higher-Order Components
// ============================================================================

/**
 * HOC to inject theme props
 */
export function withTheme<P extends object>(
  Component: React.ComponentType<P & { theme: ThemeContextValue }>
): React.ComponentType<P> {
  return function ThemedComponent(props: P) {
    const theme = useTheme();
    return <Component {...props} theme={theme} />;
  };
}

// ============================================================================
// Utilities
// ============================================================================

/**
 * Convert theme colors to React Native StyleSheet compatible format
 */
export function createThemedStyles<T extends Record<string, any>>(
  styles: T | ((theme: Theme) => T)
): T {
  if (typeof styles === 'function') {
    // This will be called with current theme at runtime
    const { theme } = useTheme();
    return (styles as (theme: Theme) => T)(theme);
  }
  return styles;
}

/**
 * Get current theme without hooks (for non-React code)
 */
export function getCurrentTheme(): Theme {
  const colorScheme = Appearance.getColorScheme();
  return themes[colorScheme === 'dark' ? 'dark' : 'light'];
}
