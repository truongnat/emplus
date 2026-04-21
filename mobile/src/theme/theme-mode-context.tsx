/**
 * Theme Mode Context
 * Release V1 dùng một theme sáng duy nhất theo hướng LookAway.
 */

import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  ReactNode,
} from "react";

export type ColorScheme = "light" | "dark" | null;
export type ThemeName = "aura" | "telegram";

export type ThemePreference = "system" | "daylight" | "light" | "dark";
export function isLocalDaylight() {
  return true;
}

interface ThemeModeContextType {
/** Luôn `light` cho release hiện tại. */
  colorScheme: Exclude<ColorScheme, null>;
  manualColorScheme: ColorScheme;
  isDark: boolean;
  themePreference: ThemePreference;
  setThemePreference: (p: ThemePreference) => void;
  setColorScheme: (scheme: ColorScheme) => void;
  toggleColorScheme: () => void;
  themeName: ThemeName;
  setThemeName: (name: ThemeName) => void;
}

const ThemeModeContext = createContext<ThemeModeContextType | undefined>(
  undefined,
);

export function ThemeModeProvider({ children }: { children: ReactNode }) {
  const [themePreference] = useState<ThemePreference>("light");

  const setThemePreference = useCallback((p: ThemePreference) => {
    void p;
  }, []);
  const colorScheme: Exclude<ColorScheme, null> = "light";
  const isDark = false;

  const manualColorScheme: ColorScheme = useMemo(() => {
    return "light";
  }, [themePreference]);

  const setColorScheme = useCallback(
    (scheme: ColorScheme) => {
      void scheme;
    },
    [],
  );

  const toggleColorScheme = useCallback(() => {
    return;
  }, []);

  const [themeName, setThemeName] = useState<ThemeName>("aura");

  return (
    <ThemeModeContext.Provider
      value={{
        colorScheme,
        manualColorScheme,
        isDark,
        themePreference,
        setThemePreference,
        setColorScheme,
        toggleColorScheme,
        themeName,
        setThemeName,
      }}
    >
      {children}
    </ThemeModeContext.Provider>
  );
}

export function useThemeMode() {
  const context = useContext(ThemeModeContext);
  if (context === undefined) {
    throw new Error("useThemeMode must be used within ThemeModeProvider");
  }
  return context;
}
