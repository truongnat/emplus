/**
 * Theme Utilities - Helper functions for working with design tokens
 * Performance-optimized with memoization
 */

import { useMemo, useCallback } from 'react';
import type { Tokens, Token, Theme, CSSVariables } from './types';
import { tokens } from './tokens';
import { themes } from './themes';

// ============================================================================
// Token Access Utilities
// ============================================================================

/**
 * Get token value by path (e.g., 'color.primary', 'space.md')
 * Optimized with caching
 */
const tokenCache = new Map<string, any>();

export function getToken<T = string | number>(path: string): T | undefined {
  if (tokenCache.has(path)) {
    return tokenCache.get(path);
  }

  const parts = path.split('.');
  let current: any = tokens;

  for (const part of parts) {
    if (current && typeof current === 'object' && part in current) {
      current = current[part];
    } else {
      return undefined;
    }
  }

  // Extract value from token object
  const value = current?.value ?? current;
  tokenCache.set(path, value);
  return value as T;
}

/**
 * Get color token value
 */
export function getColor(name: string): string | undefined {
  return getToken<string>(`color.${name}`);
}

/**
 * Get space token value
 */
export function getSpace(name: string): number | undefined {
  return getToken<number>(`space.${name}`);
}

/**
 * Get radius token value
 */
export function getRadius(name: string): number | undefined {
  return getToken<number>(`radius.${name}`);
}

// ============================================================================
// CSS Variable Utilities
// ============================================================================

/**
 * Convert token path to CSS variable name
 * e.g., 'color.primary' -> '--color-primary'
 */
export function tokenToCSSVar(path: string): string {
  return `--${path.replace(/\./g, '-')}`;
}

/**
 * Get CSS variable reference for a token
 * e.g., 'color.primary' -> 'var(--color-primary)'
 */
export function getTokenCSSVar(path: string): string {
  return `var(${tokenToCSSVar(path)})`;
}

/**
 * Generate all CSS variables from tokens
 */
export function generateTokenCSSVariables(): CSSVariables {
  const vars: CSSVariables = {};

  // Colors
  Object.entries(tokens.color).forEach(([key, value]) => {
    if (key !== 'slate' && key !== 'semantic' && key !== 'glass') {
      const token = value as Token<string>;
      vars[tokenToCSSVar(`color.${key}`)] = token.value;
    }
  });

  // Slate colors
  Object.entries(tokens.color.slate).forEach(([key, value]) => {
    const token = value as Token<string>;
    vars[tokenToCSSVar(`color.slate.${key}`)] = token.value;
  });

  // Semantic colors
  Object.entries(tokens.color.semantic).forEach(([key, value]) => {
    const token = value as Token<string>;
    vars[tokenToCSSVar(`color.semantic.${key}`)] = token.value;
  });

  // Glass colors
  Object.entries(tokens.color.glass).forEach(([key, value]) => {
    const token = value as Token<string>;
    vars[tokenToCSSVar(`color.glass.${key}`)] = token.value;
  });

  // Space
  Object.entries(tokens.space).forEach(([key, value]) => {
    const token = value as Token<number>;
    vars[tokenToCSSVar(`space.${key}`)] = `${token.value}px`;
  });

  // Radius
  Object.entries(tokens.radius).forEach(([key, value]) => {
    const token = value as Token<number>;
    vars[tokenToCSSVar(`radius.${key}`)] = `${token.value}px`;
  });

  return vars;
}

/**
 * Generate theme CSS variables
 */
export function generateThemeCSSVariables(themeName: 'light' | 'dark'): CSSVariables {
  const theme = themes[themeName];
  const vars: CSSVariables = {};

  Object.entries(theme.colors).forEach(([key, value]) => {
    vars[`--theme-${key}`] = value;
  });

  return vars;
}

/**
 * Get all CSS variables as inline style object
 */
export function getCSSVariablesStyle(
  tokenVars?: CSSVariables,
  themeVars?: CSSVariables
): React.CSSProperties {
  const style: Record<string, string> = {};

  if (tokenVars) {
    Object.assign(style, tokenVars);
  }

  if (themeVars) {
    Object.assign(style, themeVars);
  }

  return style as React.CSSProperties;
}

// ============================================================================
// React Hooks
// ============================================================================

/**
 * Hook to get token value with memoization
 */
export function useToken<T = string | number>(path: string): T | undefined {
  return useMemo(() => getToken<T>(path), [path]);
}

/**
 * Hook to get color with memoization
 */
export function useColor(name: string): string | undefined {
  return useMemo(() => getColor(name), [name]);
}

/**
 * Hook to get space with memoization
 */
export function useSpace(name: string): number | undefined {
  return useMemo(() => getSpace(name), [name]);
}

/**
 * Hook to get radius with memoization
 */
export function useRadius(name: string): number | undefined {
  return useMemo(() => getRadius(name), [name]);
}

/**
 * Hook to get CSS variables for styling
 */
export function useCSSVariables(themeName?: 'light' | 'dark'): React.CSSProperties {
  return useMemo(() => {
    const tokenVars = generateTokenCSSVariables();
    const themeVars = themeName ? generateThemeCSSVariables(themeName) : {};
    return getCSSVariablesStyle(tokenVars, themeVars);
  }, [themeName]);
}

// ============================================================================
// Style Generation Utilities
// ============================================================================

/**
 * Convert spacing token to React Native style
 */
export function spacingStyle(spacing: string | number): { padding?: number; margin?: number } {
  const value = typeof spacing === 'string' ? getSpace(spacing) : spacing;
  if (value === undefined) return {};
  return { padding: value };
}

/**
 * Generate shadow style from token
 */
export function getShadowStyle(shadowName: string): any {
  const shadow = getToken<any>(`shadow.${shadowName}`);
  if (!shadow) return {};

  const { offsetX, offsetY, blur, spread = 0, color } = shadow;
  return {
    shadowColor: color,
    shadowOffset: { width: offsetX, height: offsetY },
    shadowOpacity: 1,
    shadowRadius: blur,
    elevation: spread > 0 ? spread : blur / 2, // Android elevation
  };
}

/**
 * Generate border radius style
 */
export function getRadiusStyle(radiusName: string): any {
  const radius = getRadius(radiusName);
  if (radius === undefined) return {};
  return { borderRadius: radius };
}

/**
 * Combine multiple styles
 */
export function combineStyles(...styles: any[]): any {
  return styles.reduce((acc, style) => {
    if (!style) return acc;
    if (Array.isArray(style)) {
      return [...acc, ...style];
    }
    if (typeof style === 'object') {
      return { ...acc, ...style };
    }
    return acc;
  }, {});
}

// ============================================================================
// Performance Optimization
// ============================================================================

/**
 * Memoize style object to prevent unnecessary re-renders
 */
export function memoizeStyle<T extends object>(style: T): T {
  return useMemo(() => style, [JSON.stringify(style)]);
}

/**
 * Create memoized style factory
 */
export function createStyleFactory<T extends object>(
  factory: () => T,
  deps: any[] = []
): T {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useMemo(factory, deps);
}
