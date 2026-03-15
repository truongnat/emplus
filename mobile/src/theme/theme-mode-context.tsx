/**
 * Theme Mode Context
 * Allow manual override of system color scheme (light/dark)
 */

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";
import { useColorScheme } from "react-native";

export type ColorScheme = "light" | "dark" | null;
export type ThemeName = "telegram" | "aura" | "rose" | "ocean" | "sunset" | "emerald";

interface ThemeModeContextType {
  colorScheme: ColorScheme;
  isDark: boolean;
  setColorScheme: (scheme: ColorScheme) => void;
  toggleColorScheme: () => void;
  themeName: ThemeName;
  setThemeName: (name: ThemeName) => void;
}

const ThemeModeContext = createContext<ThemeModeContextType | undefined>(
  undefined,
);

export function ThemeModeProvider({ children }: { children: ReactNode }) {
  const systemColorScheme = useColorScheme();
  const [manualColorScheme, setManualColorScheme] = useState<ColorScheme>(null);
  const [themeName, setThemeName] = useState<ThemeName>("telegram");

  // Use manual override if set, otherwise use system
  const colorScheme: ColorScheme =
    manualColorScheme ?? (systemColorScheme === "dark" ? "dark" : "light");
  const isDark = colorScheme === "dark";

  const setColorScheme = useCallback((scheme: ColorScheme) => {
    setManualColorScheme(scheme);
  }, []);

  const toggleColorScheme = useCallback(() => {
    setManualColorScheme((prev) => (prev === "dark" ? "light" : "dark"));
  }, []);

  return (
    <ThemeModeContext.Provider
      value={{
        colorScheme,
        isDark,
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
