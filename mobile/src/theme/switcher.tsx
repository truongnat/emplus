import React, {
  createContext,
  memo,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  ReactNode,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  Easing,
} from "react-native-reanimated";
import { View, TouchableOpacity, Text as RNText } from "react-native";
import { ThemeProvider, ThemeMode } from "./engine";
import { themeRegistry, ThemeName } from "./themes";
import { useThemeColors, useThemeMode } from "./engine";

const STORAGE_KEY_MODE = "@theme/mode";
const STORAGE_KEY_BRAND = "@theme/brand";

interface ThemeSwitcherState {
  mode: ThemeMode;
  brand: ThemeName;
  isReady: boolean;
  setMode: (mode: ThemeMode) => void;
  setBrand: (brand: ThemeName) => void;
  toggleMode: () => void;
}

const ThemeSwitcherCtx = createContext<ThemeSwitcherState>({
  mode: "system",
  brand: "default",
  isReady: false,
  setMode: () => {},
  setBrand: () => {},
  toggleMode: () => {},
});

export const ThemeSwitcherProvider = memo(function ThemeSwitcherProvider({
  children,
  defaultMode = "system",
  defaultBrand = "default",
  persist = true,
  onThemeChange,
}: {
  children: ReactNode;
  defaultMode?: ThemeMode;
  defaultBrand?: ThemeName;
  persist?: boolean;
  onThemeChange?: (mode: "light" | "dark", brand: ThemeName) => void;
}) {
  const [mode, setModeState] = useState<ThemeMode>(defaultMode);
  const [brand, setBrandState] = useState<ThemeName>(defaultBrand);
  const [isReady, setIsReady] = useState(!persist);

  const fadeAnim = useSharedValue(1);
  const writeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!persist) return;
    AsyncStorage.multiGet([STORAGE_KEY_MODE, STORAGE_KEY_BRAND])
      .then(([[, savedMode], [, savedBrand]]) => {
        if (savedMode && isValidMode(savedMode))
          setModeState(savedMode as ThemeMode);
        if (savedBrand && isValidBrand(savedBrand))
          setBrandState(savedBrand as ThemeName);
      })
      .catch(() => {
        /* storage read failed — use defaults */
      })
      .finally(() => setIsReady(true));
  }, [persist]);

  const persistPrefs = useCallback(
    (m: ThemeMode, b: ThemeName) => {
      if (!persist) return;
      if (writeTimer.current) clearTimeout(writeTimer.current);
      writeTimer.current = setTimeout(() => {
        AsyncStorage.multiSet([
          [STORAGE_KEY_MODE, m],
          [STORAGE_KEY_BRAND, b],
        ]).catch(() => {
          /* silent fail */
        });
      }, 300);
    },
    [persist],
  );

  const transitionChange = useCallback((fn: () => void) => {
    fadeAnim.value = withTiming(0, {
      duration: 120,
      easing: Easing.in(Easing.ease),
    });
    setTimeout(() => {
      fn();
      fadeAnim.value = withTiming(1, {
        duration: 180,
        easing: Easing.out(Easing.ease),
      });
    }, 120);
  }, []);

  const setMode = useCallback(
    (m: ThemeMode) => {
      transitionChange(() => {
        setModeState(m);
        persistPrefs(m, brand);
      });
    },
    [brand, persistPrefs, transitionChange],
  );

  const setBrand = useCallback(
    (b: ThemeName) => {
      transitionChange(() => {
        setBrandState(b);
        persistPrefs(mode, b);
      });
    },
    [mode, persistPrefs, transitionChange],
  );

  const toggleMode = useCallback(() => {
    const next: ThemeMode =
      mode === "system" ? "dark" : mode === "dark" ? "light" : "system";
    setMode(next);
  }, [mode, setMode]);

  const themes = useMemo(() => {
    const entry = themeRegistry[brand];
    if (!entry) return undefined;
    return entry as { light: any; dark: any };
  }, [brand]);

  const fadeStyle = useAnimatedStyle(() => ({
    opacity: fadeAnim.value,
    flex: 1,
  }));

  const ctx = useMemo<ThemeSwitcherState>(
    () => ({
      mode,
      brand,
      isReady,
      setMode,
      setBrand,
      toggleMode,
    }),
    [mode, brand, isReady, setMode, setBrand, toggleMode],
  );

  if (!isReady) return null;

  return (
    <ThemeSwitcherCtx.Provider value={ctx}>
      <ThemeProvider
        mode={mode}
        themes={themes}
        onModeChange={(resolvedMode) => onThemeChange?.(resolvedMode, brand)}
      >
        <Animated.View style={fadeStyle}>{children}</Animated.View>
      </ThemeProvider>
    </ThemeSwitcherCtx.Provider>
  );
});

export function useThemeSwitcher() {
  return useContext(ThemeSwitcherCtx);
}

function isValidMode(s: string): s is ThemeMode {
  return ["light", "dark", "system"].includes(s);
}

function isValidBrand(s: string): s is ThemeName {
  return Object.keys(themeRegistry).includes(s);
}

export function ThemeToggleButton({ style }: { style?: object }) {
  const { toggleMode } = useThemeSwitcher();
  const { isDark } = useThemeMode();
  const colors = useThemeColors();

  return (
    <TouchableOpacity
      onPress={toggleMode}
      style={[
        {
          width: 44,
          height: 44,
          borderRadius: 22,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: colors.surface.sunken,
        },
        style,
      ]}
      accessibilityLabel={
        isDark ? "Switch to light mode" : "Switch to dark mode"
      }
      accessibilityRole="button"
    >
      <RNText style={{ fontSize: 20 }}>{isDark ? "☀️" : "🌙"}</RNText>
    </TouchableOpacity>
  );
}
