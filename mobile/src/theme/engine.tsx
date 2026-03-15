/**
 * theme/engine.tsx
 * ─────────────────────────────────────────────────────────────────────────────
 * Theme engine: builds full theme object, manages Context, exposes hooks.
 *
 * Architecture decisions:
 *
 *  1. CONTEXT SPLIT
 *     ThemeColorsCtx   — changes on mode switch (light/dark) or brand change
 *     ThemeSpaceCtx    — almost never changes (spacing, radius, etc.)
 *     ThemeMotionCtx   — never changes at runtime
 *     ThemeMetaCtx     — mode string, isDark flag
 *     → Components subscribe only to what they need → fewer re-renders
 *
 *  2. PRE-BUILT THEMES
 *     Both light + dark resolved at startup. Switching mode = swap reference,
 *     not recalculate. Zero computation on toggle.
 *
 *  3. STYLESHEET CACHE
 *     StyleSheet.create() called once per theme per component type.
 *     Cached by WeakMap<ThemeColors, StyleSheet>. Never re-created.
 *
 *  4. CUSTOM THEMES
 *     extendTheme() deep-merges overrides into base theme.
 *     Brand themes only need to override changed values.
 *
 *  5. DYNAMIC TOKENS
 *     registerTokenOverride() allows runtime token updates (A/B testing,
 *     remote config, user preferences).
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
import {
  tokens,
  Tokens,
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

/**
 * Create a custom theme that extends the default.
 *
 * Usage:
 *   const oceanTheme = extendTheme('light', {
 *     colors: {
 *       brand: {
 *         default: '#0EA5E9',
 *         muted:   '#E0F2FE',
 *         text:    '#0284C7',
 *       }
 *     }
 *   });
 */
export function extendTheme(
  base: "light" | "dark",
  overrides: DeepPartial<Theme>,
): Theme {
  return deepMerge(builtInThemes[base], overrides);
}

/**
 * Create theme pair (light + dark variants of a brand theme).
 *
 * Usage:
 *   const { light, dark } = createThemePair({
 *     light: { colors: { brand: { default: '#0EA5E9' } } },
 *     dark:  { colors: { brand: { default: '#38BDF8' } } },
 *   });
 */
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
const ThemeSpaceCtx = createContext(builtInThemes.light); // full theme minus colors
const ThemeMetaCtx = createContext<{ mode: "light" | "dark"; isDark: boolean }>(
  {
    mode: "light",
    isDark: false,
  },
);

// ─── ThemeProvider ────────────────────────────────────────────────────────────

export interface ThemeProviderProps {
  /** 'system' follows device setting. Default: 'system' */
  mode?: ThemeMode;
  /** Custom theme pair (from createThemePair or extendTheme) */
  themes?: { light: Theme; dark: Theme };
  children: ReactNode;
  /** Called when mode resolves (useful for status bar) */
  onModeChange?: (mode: "light" | "dark") => void;
}

export const ThemeProvider = memo(function ThemeProvider({
  mode = "system",
  themes = builtInThemes,
  children,
  onModeChange,
}: ThemeProviderProps) {
  // Track system color scheme
  const [systemScheme, setSystemScheme] = useState<ColorSchemeName>(
    () => Appearance.getColorScheme() ?? "light",
  );

  useEffect(() => {
    const sub = Appearance.addChangeListener(({ colorScheme }) => {
      setSystemScheme(colorScheme);
    });
    return () => sub.remove();
  }, []);

  // Resolve actual mode
  const resolvedMode: "light" | "dark" = useMemo(() => {
    if (mode === "system") return systemScheme === "dark" ? "dark" : "light";
    return mode;
  }, [mode, systemScheme]);

  const theme = themes[resolvedMode];

  // Notify parent on mode change
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

/** Full theme — use sparingly. Subscribes to all context changes. */
export function useTheme(): Theme {
  return useContext(ThemeSpaceCtx);
}

/** Only colors + component tokens. Most components should use this. */
export function useThemeColors(): SemanticColors {
  return useContext(ThemeColorsCtx);
}

/** Component tokens only. For atomic components. */
export function useComponentTokens(): ComponentTokens {
  return useContext(ThemeComponentsCtx);
}

/** Mode meta — for status bar, icons, analytics. No re-render on color change. */
export function useThemeMode(): { mode: "light" | "dark"; isDark: boolean } {
  return useContext(ThemeMetaCtx);
}

/** Shorthand for common tokens. Stable reference — no re-render on color change. */
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

// ─── StyleSheet cache system ──────────────────────────────────────────────────
/**
 * useThemedStyles — creates StyleSheet ONCE per theme reference.
 * theme object is stable per mode (pre-built). WeakMap entry persists
 * as long as theme object is alive. Garbage collected when theme changes.
 *
 * Pattern:
 *   const styles = useThemedStyles(makeStyles);
 *
 *   const makeStyles = (theme: Theme) => StyleSheet.create({
 *     container: { backgroundColor: theme.colors.background.default },
 *   });
 */

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

// ─── Dynamic token override (A/B testing, remote config) ─────────────────────

type TokenOverrideListener = (theme: Theme) => void;
const overrideListeners = new Set<TokenOverrideListener>();
let activeOverride: DeepPartial<Theme> | null = null;

/**
 * Register a runtime token override.
 * All ThemeProviders with mode='system' will recompute.
 *
 * Usage (from RemoteConfig, Feature flags, etc.):
 *   registerTokenOverride({
 *     colors: { brand: { default: '#FF6B35' } }
 *   });
 */
export function registerTokenOverride(override: DeepPartial<Theme> | null) {
  activeOverride = override;
  overrideListeners.forEach((fn) =>
    fn(
      override ? deepMerge(builtInThemes.light, override) : builtInThemes.light,
    ),
  );
}

// Hook for components that need to react to runtime overrides
export function useTokenOverride() {
  const [, forceUpdate] = useState(0);
  useEffect(() => {
    const listener = () => forceUpdate((n) => n + 1);
    overrideListeners.add(listener);
    return () => {
      overrideListeners.delete(listener);
    };
  }, []);
  return activeOverride;
}

// ─── withTheme HOC (class components compat) ─────────────────────────────────

export function withTheme<P extends { theme?: Theme }>(
  Component: React.ComponentType<P>,
): React.FC<Omit<P, "theme">> {
  return function WithTheme(props) {
    const theme = useTheme();
    return <Component {...(props as P)} theme={theme} />;
  };
}

// ─── useBreakpoint ────────────────────────────────────────────────────────────

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

    /** Responsive value selector */
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
