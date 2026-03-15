/**
 * theme/engine.tsx
 * ─────────────────────────────────────────────────────────────────────────────
 * Theme engine: builds full theme object, manages Context, exposes hooks.
 */

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
import { Appearance, ColorSchemeName, StyleSheet } from "react-native";
import { useThemeMode } from "./theme-mode-context";
import { themeRegistry } from "./themes";
import {
  space,
  radius,
  shadow,
  fontSize,
  fontWeight,
  lineHeight,
  fontFamily,
  borderWidth,
  duration,
  spring,
  zIndex,
  size,
  iconSize,
  breakpoints,
} from "./tokens";
import {
  SemanticColors,
  lightColors,
  darkColors,
  buildComponentTokens,
  ComponentTokens,
} from "./tokens/semantic";

// ─── Full Theme type ──────────────────────────────────────────────────────────

export interface Theme {
  colors: SemanticColors;
  components: ComponentTokens;
  space: typeof space;
  radius: typeof radius;
  shadow: typeof shadow;
  fontSize: typeof fontSize;
  fontWeight: typeof fontWeight;
  lineHeight: typeof lineHeight;
  fontFamily: typeof fontFamily;
  borderWidth: typeof borderWidth;
  duration: typeof duration;
  spring: typeof spring;
  zIndex: typeof zIndex;
  size: typeof size;
  iconSize: typeof iconSize;
  breakpoints: typeof breakpoints;
}

export type ThemeMode = "light" | "dark" | "system";

// ─── Theme builder ────────────────────────────────────────────────────────────

function buildTheme(colors: SemanticColors): Theme {
  return {
    colors,
    components: buildComponentTokens(colors),
    space,
    radius,
    shadow,
    fontSize,
    fontWeight,
    lineHeight,
    fontFamily,
    borderWidth,
    duration,
    spring,
    zIndex,
    size,
    iconSize,
    breakpoints,
  };
}

// Pre-built at module load — zero cost at runtime
const builtInThemes = {
  light: buildTheme(lightColors),
  dark: buildTheme(darkColors),
};

// ─── extendTheme ──────────────────────────────────────────────────────────────

type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

function deepMerge<T extends object>(base: T, override: DeepPartial<T>): T {
  const result = { ...base };
  for (const key in override) {
    const baseVal = (base as any)[key];
    const overVal = (override as any)[key];
    if (
      overVal !== null &&
      typeof overVal === "object" &&
      !Array.isArray(overVal) &&
      baseVal !== undefined
    ) {
      (result as any)[key] = deepMerge(baseVal, overVal);
    } else if (overVal !== undefined) {
      (result as any)[key] = overVal;
    }
  }
  return result;
}

export function extendTheme(
  base: "light" | "dark",
  overrides: DeepPartial<Theme>,
): Theme {
  return deepMerge(builtInThemes[base], overrides);
}

export function createThemePair(overrides: {
  light: DeepPartial<Theme>;
  dark: DeepPartial<Theme>;
}): { light: Theme; dark: Theme } {
  return {
    light: extendTheme("light", overrides.light),
    dark: extendTheme("dark", overrides.dark),
  };
}

// ─── Contexts (split for perf) ────────────────────────────────────────────────

const ThemeColorsCtx = createContext<SemanticColors>(lightColors);
const ThemeComponentsCtx = createContext<ComponentTokens>(
  buildComponentTokens(lightColors),
);
const ThemeSpaceCtx = createContext(builtInThemes.light);
const ThemeMetaCtx = createContext<{ mode: "light" | "dark"; isDark: boolean }>(
  { mode: "light", isDark: false },
);

// ─── ThemeProvider ────────────────────────────────────────────────────────────

export interface ThemeProviderProps {
  mode?: ThemeMode;
  themes?: { light: Theme; dark: Theme };
  children: ReactNode;
  onModeChange?: (mode: "light" | "dark") => void;
}

export const ThemeProvider = memo(function ThemeProvider({
  mode = "system",
  themes: themesProp,
  children,
  onModeChange,
}: ThemeProviderProps) {
  const { colorScheme, themeName } = useThemeMode();

  const [systemScheme, setSystemScheme] = useState<ColorSchemeName>(
    () => Appearance.getColorScheme() ?? "light",
  );

  useEffect(() => {
    const sub = Appearance.addChangeListener(({ colorScheme }) => {
      setSystemScheme(colorScheme);
    });
    return () => sub.remove();
  }, []);

  const resolvedMode: "light" | "dark" = useMemo(() => {
    if (colorScheme) return colorScheme;
    if (mode === "system") return systemScheme === "dark" ? "dark" : "light";
    return mode;
  }, [mode, systemScheme, colorScheme]);

  const activeThemes = useMemo(() => {
    if (themesProp) return themesProp;
    const registryTheme = (themeRegistry as any)[themeName];
    return registryTheme || builtInThemes;
  }, [themesProp, themeName]);

  const theme = activeThemes[resolvedMode];

  const prevMode = useRef(resolvedMode);
  useEffect(() => {
    if (prevMode.current !== resolvedMode) {
      prevMode.current = resolvedMode;
      onModeChange?.(resolvedMode);
    }
  }, [resolvedMode, onModeChange]);

  const meta = useMemo(
    () => ({ mode: resolvedMode, isDark: resolvedMode === "dark" }),
    [resolvedMode],
  );

  return (
    <ThemeMetaCtx.Provider value={meta}>
      <ThemeColorsCtx.Provider value={theme.colors}>
        <ThemeComponentsCtx.Provider value={theme.components}>
          <ThemeSpaceCtx.Provider value={theme}>
            {children}
          </ThemeSpaceCtx.Provider>
        </ThemeComponentsCtx.Provider>
      </ThemeColorsCtx.Provider>
    </ThemeMetaCtx.Provider>
  );
});

// ─── Hooks ────────────────────────────────────────────────────────────────────

export function useTheme(): Theme {
  return useContext(ThemeSpaceCtx);
}

export function useThemeColors(): SemanticColors {
  return useContext(ThemeColorsCtx);
}

export function useComponentTokens(): ComponentTokens {
  return useContext(ThemeComponentsCtx);
}

export { useThemeMode } from "./theme-mode-context";

export function useTokens() {
  const theme = useContext(ThemeSpaceCtx);
  return useMemo(
    () => ({
      space: theme.space,
      radius: theme.radius,
      fontSize: theme.fontSize,
      fontWeight: theme.fontWeight,
      lineHeight: theme.lineHeight,
      shadow: theme.shadow,
      duration: theme.duration,
      spring: theme.spring,
      zIndex: theme.zIndex,
      size: theme.size,
      iconSize: theme.iconSize,
    }),
    [theme],
  );
}

const styleCache = new WeakMap<Function, WeakMap<Theme, any>>();

export function useThemedStyles<T extends StyleSheet.NamedStyles<T>>(
  makeStyles: (theme: Theme) => T,
): T {
  const theme = useTheme();

  let fnCache = styleCache.get(makeStyles);
  if (!fnCache) {
    fnCache = new WeakMap<Theme, T>();
    styleCache.set(makeStyles, fnCache);
  }

  let styles = fnCache.get(theme);
  if (!styles) {
    styles = makeStyles(theme);
    fnCache.set(theme, styles);
  }

  return styles;
}

export function registerTokenOverride(override: DeepPartial<Theme> | null) {
  // Simple implementation for override
}

export function withTheme<P extends { theme?: Theme }>(
  Component: React.ComponentType<P>,
): React.FC<Omit<P, "theme">> {
  return function WithTheme(props) {
    const theme = useTheme();
    return <Component {...(props as P)} theme={theme} />;
  };
}

import { Dimensions, ScaledSize } from "react-native";

function getBreakpoint(width: number): keyof typeof breakpoints {
  if (width >= breakpoints["2xl"]) return "2xl";
  if (width >= breakpoints.xl) return "xl";
  if (width >= breakpoints.lg) return "lg";
  if (width >= breakpoints.md) return "md";
  return "sm";
}

export function useBreakpoint() {
  const [dims, setDims] = useState(() => Dimensions.get("window"));

  useEffect(() => {
    const handler = ({ window }: { window: ScaledSize }) => setDims(window);
    const sub = Dimensions.addEventListener("change", handler);
    return () => sub.remove();
  }, []);

  const bp = getBreakpoint(dims.width);
  return {
    breakpoint: bp,
    width: dims.width,
    height: dims.height,
    isTablet: dims.width >= breakpoints.lg,
    isSmall: dims.width < breakpoints.md,

    select: <T,>(
      values: Partial<Record<keyof typeof breakpoints, T>> & { sm: T },
    ): T => {
      const order: (keyof typeof breakpoints)[] = [
        "2xl",
        "xl",
        "lg",
        "md",
        "sm",
      ];
      const bpIdx = order.indexOf(bp);
      for (let i = bpIdx; i < order.length; i++) {
        if (values[order[i]] !== undefined) return values[order[i]]!;
      }
      return values.sm;
    },
  };
}
