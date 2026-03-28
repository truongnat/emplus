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

export function buildTheme(colors: SemanticColors): Theme {
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

export const builtInThemes = {
  light: buildTheme(lightColors),
  dark: buildTheme(darkColors),
};

export type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

export function deepMerge<T extends object>(base: T, override: DeepPartial<T>): T {
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
