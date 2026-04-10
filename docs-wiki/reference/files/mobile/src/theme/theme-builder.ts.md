---
title: "mobile/src/theme/theme-builder.ts"
description: "TypeScript source file with 7 symbols."
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
  page: "reference/files/mobile/src/theme/theme-builder.ts.md"
  relativePath: "mobile/src/theme/theme-builder.ts"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/mobile/src/theme/theme-builder.ts"
  module: "mobile/src/theme"
  workspace: "mobile"
  language: "TypeScript"
  symbolCount: 7
---

# mobile/src/theme/theme-builder.ts

- Overview: [emplus Docs Wiki](../../../../../index.md)
- Summary: [SUMMARY](../../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../../features/index.md)
- Module: [mobile/src/theme](../../../../modules/mobile/src/theme.md)
- Workspace: [@emplus/mobile](../../../../../workspaces/mobile.md)

## Snapshot

- Language: TypeScript
- Source path: `/Users/truongdq/tx/GitHub/emplus/mobile/src/theme/theme-builder.ts`
- Lines: 111
- Symbols: 7

## Related Features

- [Authentication Read / List](../../../../../features/auth-list.md) - Authentication Read / List captures the read / list workflow inside authentication. It spans 3 workspaces.
- [Search Read / List](../../../../../features/search-list.md) - Search Read / List captures the read / list workflow inside search. It spans 3 workspaces.
- [Notifications Read / List](../../../../../features/notification-list.md) - Notifications Read / List captures the read / list workflow inside notifications. It spans 2 workspaces.
- [Storage Read / List](../../../../../features/storage-list.md) - Storage Read / List captures the read / list workflow inside storage. It spans 4 workspaces.
- [Integrations Read / List](../../../../../features/integration-list.md) - Integrations Read / List captures the read / list workflow inside integrations. It spans 3 workspaces.
- [Search Create](../../../../../features/search-create.md) - Search Create captures the create workflow inside search. It spans 2 workspaces.

## Public API

- `interface Theme`
- `type ThemeMode = "light" | "dark" | "system";`
- `function buildTheme(colors: SemanticColors): Theme`
- `type DeepPartial<T> = { [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K]; };`
- `function deepMerge<T extends object>(base: T, override: DeepPartial<T>): T`
- `function extendTheme( base: "light" | "dark", overrides: DeepPartial<Theme>, ): Theme`
- `function createThemePair(overrides: { light: DeepPartial<Theme>; dark: DeepPartial<Theme>; }): { light: Theme; dark: Theme }`

## Symbols

### interface `Theme`

- Signature: `interface Theme`
- Lines: 25-42
- Exported: yes

```ts
interface Theme {
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
```

### type `ThemeMode`

- Signature: `type ThemeMode = "light" | "dark" | "system";`
- Lines: 44-44
- Exported: yes

```ts
type ThemeMode = "light" | "dark" | "system";
```

### function `buildTheme`

- Signature: `function buildTheme(colors: SemanticColors): Theme`
- Lines: 46-65
- Exported: yes

```ts
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
```

### type `DeepPartial`

- Signature: `type DeepPartial<T> = { [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K]; };`
- Lines: 72-74
- Exported: yes

```ts
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};
```

### function `deepMerge`

- Signature: `function deepMerge<T extends object>(base: T, override: DeepPartial<T>): T`
- Lines: 76-93
- Exported: yes

```ts
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
```

### function `extendTheme`

- Signature: `function extendTheme( base: "light" | "dark", overrides: DeepPartial<Theme>, ): Theme`
- Lines: 95-100
- Exported: yes

```ts
function extendTheme(
  base: "light" | "dark",
  overrides: DeepPartial<Theme>,
): Theme {
  return deepMerge(builtInThemes[base], overrides);
}
```

### function `createThemePair`

- Signature: `function createThemePair(overrides: { light: DeepPartial<Theme>; dark: DeepPartial<Theme>; }): { light: Theme; dark: Theme }`
- Lines: 102-110
- Exported: yes

```ts
function createThemePair(overrides: {
  light: DeepPartial<Theme>;
  dark: DeepPartial<Theme>;
}): { light: Theme; dark: Theme } {
  return {
    light: extendTheme("light", overrides.light),
    dark: extendTheme("dark", overrides.dark),
  };
}
```
