/**
 * Theme Mode Context
 * system / daylight (giờ địa phương) / light / dark — có persist AsyncStorage.
 */

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  ReactNode,
} from "react";
import {
  AppState,
  type AppStateStatus,
  useColorScheme,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "emplus.theme.preference.v1";

export type ColorScheme = "light" | "dark" | null;
export type ThemeName = "aura" | "telegram";

/** `system` = theo OS; `daylight` = sáng/tối theo giờ địa phương (mặc định 6–19h). */
export type ThemePreference = "system" | "daylight" | "light" | "dark";

/** Sáng theo giờ máy: [dayStartHour, nightStartHour) — mặc định 6:00–19:00. */
export function isLocalDaylight(
  dayStartHour = 6,
  nightStartHour = 19,
): boolean {
  const h = new Date().getHours();
  return h >= dayStartHour && h < nightStartHour;
}

interface ThemeModeContextType {
  /** Luôn `light` | `dark` (đã resolve system / daylight / manual). */
  colorScheme: Exclude<ColorScheme, null>;
  /** `null` = không ép light/dark tĩnh (đang system hoặc daylight). */
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

function parseStoredPreference(raw: string | null): ThemePreference | null {
  if (
    raw === "system" ||
    raw === "daylight" ||
    raw === "light" ||
    raw === "dark"
  ) {
    return raw;
  }
  return null;
}

export function ThemeModeProvider({ children }: { children: ReactNode }) {
  const systemColorScheme = useColorScheme();
  const [themePreference, setThemePreferenceState] =
    useState<ThemePreference>("system");
  /** Bump khi cần tính lại chế độ daylight (phút / foreground). */
  const [daylightTick, setDaylightTick] = useState(0);

  useEffect(() => {
    let cancelled = false;
    AsyncStorage.getItem(STORAGE_KEY).then((raw) => {
      if (cancelled) return;
      const parsed = parseStoredPreference(raw);
      if (parsed) setThemePreferenceState(parsed);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const setThemePreference = useCallback((p: ThemePreference) => {
    setThemePreferenceState(p);
    AsyncStorage.setItem(STORAGE_KEY, p).catch(() => {});
  }, []);

  useEffect(() => {
    if (themePreference !== "daylight") return;
    const id = setInterval(() => {
      setDaylightTick((t) => t + 1);
    }, 60_000);
    return () => clearInterval(id);
  }, [themePreference]);

  useEffect(() => {
    if (themePreference !== "daylight") return;
    const sub = AppState.addEventListener("change", (next: AppStateStatus) => {
      if (next === "active") setDaylightTick((t) => t + 1);
    });
    return () => sub.remove();
  }, [themePreference]);

  const colorScheme: Exclude<ColorScheme, null> = useMemo(() => {
    if (themePreference === "light") return "light";
    if (themePreference === "dark") return "dark";
    if (themePreference === "daylight") {
      void daylightTick;
      return isLocalDaylight() ? "light" : "dark";
    }
    return systemColorScheme === "dark" ? "dark" : "light";
  }, [themePreference, systemColorScheme, daylightTick]);

  const isDark = colorScheme === "dark";

  const manualColorScheme: ColorScheme = useMemo(() => {
    if (themePreference === "light") return "light";
    if (themePreference === "dark") return "dark";
    return null;
  }, [themePreference]);

  const setColorScheme = useCallback(
    (scheme: ColorScheme) => {
      if (scheme === null) setThemePreference("system");
      else if (scheme === "light") setThemePreference("light");
      else setThemePreference("dark");
    },
    [setThemePreference],
  );

  const toggleColorScheme = useCallback(() => {
    setThemePreference(colorScheme === "dark" ? "light" : "dark");
  }, [colorScheme, setThemePreference]);

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
