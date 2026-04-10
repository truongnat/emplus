---
title: "mobile/src/theme/engine.tsx"
description: "The useTheme function returns a Theme object for the current theme"
layout: "doc"
outline: "deep"
editLink: false
lastUpdated: false
pageClass: "docs-wiki docs-wiki--file"
docsWiki:
  schemaVersion: "1.0.0"
  kind: "file"
  project: "emplus"
  template: "detailed"
  themePreset: "clean"
  generatedAt: "2026-04-10T00:09:32.387Z"
  page: "reference/files/mobile/src/theme/engine.tsx.md"
  relativePath: "mobile/src/theme/engine.tsx"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/mobile/src/theme/engine.tsx"
  module: "mobile/src/theme"
  workspace: "mobile"
  language: "TypeScript"
  symbolCount: 11
---

# mobile/src/theme/engine.tsx

- Overview: [emplus Docs Wiki](../../../../../index.md)
- Summary: [SUMMARY](../../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../../features/index.md)
- Module: [mobile/src/theme](../../../../modules/mobile/src/theme.md)
- Workspace: [@emplus/mobile](../../../../../workspaces/mobile.md)

## Snapshot

- Language: TypeScript
- Source path: `/Users/truongdq/tx/GitHub/emplus/mobile/src/theme/engine.tsx`
- Lines: 236
- Symbols: 11

## Related Features

- [Authentication Read / List](../../../../../features/auth-list.md) - Authentication Read / List captures the read / list workflow inside authentication. It spans 3 workspaces.
- [Search Read / List](../../../../../features/search-list.md) - Search Read / List captures the read / list workflow inside search. It spans 3 workspaces.
- [Notifications Read / List](../../../../../features/notification-list.md) - Notifications Read / List captures the read / list workflow inside notifications. It spans 2 workspaces.
- [Storage Read / List](../../../../../features/storage-list.md) - Storage Read / List captures the read / list workflow inside storage. It spans 4 workspaces.
- [Integrations Read / List](../../../../../features/integration-list.md) - Integrations Read / List captures the read / list workflow inside integrations. It spans 3 workspaces.

## AI Summary

The useTheme function returns a Theme object for the current theme

### Responsibilities

- returns a Theme

## Public API

- `interface ThemeProviderProps`
- `function useTheme(): Theme`
- `function useThemeMeta()`
- `function useBlurTint(): "light" | "dark"`
- `function useThemeColors(): SemanticColors`
- `function useComponentTokens(): ComponentTokens`
- `function useTokens()`
- `function useThemedStyles<T extends StyleSheet.NamedStyles<T>>( makeStyles: (theme: Theme) => T, ): T`
- `function withTheme<P extends { theme?: Theme }>( Component: React.ComponentType<P>, ): React.FC<Omit<P, "theme">>`
- `function useBreakpoint()`

## Symbols

### interface `ThemeProviderProps`

- Signature: `interface ThemeProviderProps`
- Lines: 47-52
- Exported: yes

```tsx
interface ThemeProviderProps {
  mode?: ThemeMode;
  themes?: { light: Theme; dark: Theme };
  children: ReactNode;
  onModeChange?: (mode: "light" | "dark") => void;
}
```

### function `useTheme`

- Signature: `function useTheme(): Theme`
- Lines: 115-117
- Exported: yes

```tsx
function useTheme(): Theme {
  return useContext(ThemeSpaceCtx);
}
```

### function `useThemeMeta`

- Signature: `function useThemeMeta()`
- Lines: 119-121
- Exported: yes

```tsx
function useThemeMeta() {
  return useContext(ThemeMetaCtx);
}
```

### function `useBlurTint`

- Signature: `function useBlurTint(): "light" | "dark"`
- Lines: 124-127
- Exported: yes

```tsx
function useBlurTint(): "light" | "dark" {
  const { isDark } = useThemeMeta();
  return isDark ? "dark" : "light";
}
```

### function `useThemeColors`

- Signature: `function useThemeColors(): SemanticColors`
- Lines: 129-131
- Exported: yes

```tsx
function useThemeColors(): SemanticColors {
  return useContext(ThemeColorsCtx);
}
```

### function `useComponentTokens`

- Signature: `function useComponentTokens(): ComponentTokens`
- Lines: 133-135
- Exported: yes

```tsx
function useComponentTokens(): ComponentTokens {
  return useContext(ThemeComponentsCtx);
}
```

### function `useTokens`

- Signature: `function useTokens()`
- Lines: 139-157
- Exported: yes

```tsx
function useTokens() {
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
```

### function `useThemedStyles`

- Signature: `function useThemedStyles<T extends StyleSheet.NamedStyles<T>>( makeStyles: (theme: Theme) => T, ): T`
- Lines: 161-179
- Exported: yes

```tsx
function useThemedStyles<T extends StyleSheet.NamedStyles<T>>(
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
```

### function `withTheme`

- Signature: `function withTheme<P extends { theme?: Theme }>( Component: React.ComponentType<P>, ): React.FC<Omit<P, "theme">>`
- Lines: 181-188
- Exported: yes

```tsx
function withTheme<P extends { theme?: Theme }>(
  Component: React.ComponentType<P>,
): React.FC<Omit<P, "theme">> {
  return function WithTheme(props) {
    const theme = useTheme();
    return <Component {...(props as P)} theme={theme} />;
  };
}
```

### function `useBreakpoint`

- Signature: `function useBreakpoint()`
- Lines: 201-235
- Exported: yes

```tsx
function useBreakpoint() {
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
```

### function `getBreakpoint`

- Signature: `function getBreakpoint(width: number): keyof typeof breakpoints`
- Lines: 193-199
- Exported: no

```tsx
function getBreakpoint(width: number): keyof typeof breakpoints {
  if (width >= breakpoints["2xl"]) return "2xl";
  if (width >= breakpoints.xl) return "xl";
  if (width >= breakpoints.lg) return "lg";
  if (width >= breakpoints.md) return "md";
  return "sm";
}
```
