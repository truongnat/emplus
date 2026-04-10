---
title: "design-builder/src/types/tokens.ts"
description: "Provides 10 documented symbols in design-builder/src/types/tokens.ts."
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
  page: "reference/files/design-builder/src/types/tokens.ts.md"
  relativePath: "design-builder/src/types/tokens.ts"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/design-builder/src/types/tokens.ts"
  module: "design-builder/src/types"
  workspace: "design-builder"
  language: "TypeScript"
  symbolCount: 10
---

# design-builder/src/types/tokens.ts

- Overview: [emplus Docs Wiki](../../../../../index.md)
- Summary: [SUMMARY](../../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../../features/index.md)
- Module: [design-builder/src/types](../../../../modules/design-builder/src/types.md)
- Workspace: [@emplus/design-builder](../../../../../workspaces/design-builder.md)

## Snapshot

- Language: TypeScript
- Source path: `/Users/truongdq/tx/GitHub/emplus/design-builder/src/types/tokens.ts`
- Lines: 107
- Symbols: 10

## AI Summary

Provides 10 documented symbols in design-builder/src/types/tokens.ts.

### Usage Notes

- Tokens are used throughout the application to provide type definitions for various components like color, space, size, radius, etc.

## Public API

- `type TokenCategory = 'color' | 'space' | 'size' | 'radius' | 'zIndex' | 'typography' | 'shadow' | 'breakpoint';`
- `interface Token<T = string | number>`
- `interface ColorToken extends Token<string>`
- `interface SpaceToken extends Token<number>`
- `interface RadiusToken extends Token<number>`
- `interface Tokens`
- `interface ThemeColors`
- `interface Theme`
- `interface Themes`
- `interface DesignSystemConfig`

## Symbols

### type `TokenCategory`

- Signature: `type TokenCategory = 'color' | 'space' | 'size' | 'radius' | 'zIndex' | 'typography' | 'shadow' | 'breakpoint';`
- Lines: 1-1
- Exported: yes

```ts
type TokenCategory = 'color' | 'space' | 'size' | 'radius' | 'zIndex' | 'typography' | 'shadow' | 'breakpoint';
```

### interface `Token`

- Signature: `interface Token<T = string | number>`
- Lines: 3-8
- Exported: yes

```ts
interface Token<T = string | number> {
  value: T;
  type?: TokenCategory;
  description?: string;
  deprecated?: boolean;
}
```

### interface `ColorToken`

- Signature: `interface ColorToken extends Token<string>`
- Lines: 10-13
- Exported: yes

```ts
interface ColorToken extends Token<string> {
  value: string;
  type: 'color';
}
```

### interface `SpaceToken`

- Signature: `interface SpaceToken extends Token<number>`
- Lines: 15-18
- Exported: yes

```ts
interface SpaceToken extends Token<number> {
  value: number;
  type: 'spacing';
}
```

### interface `RadiusToken`

- Signature: `interface RadiusToken extends Token<number>`
- Lines: 20-23
- Exported: yes

```ts
interface RadiusToken extends Token<number> {
  value: number;
  type: 'borderRadius';
}
```

### interface `Tokens`

- Signature: `interface Tokens`
- Lines: 25-61
- Exported: yes

```ts
interface Tokens {
  color: {
    primary: ColorToken;
    primaryDeep: ColorToken;
    primarySoft: ColorToken;
    accent: ColorToken;
    secondary: ColorToken;
    ink: ColorToken;
    muted: ColorToken;
    white: ColorToken;
    black: ColorToken;
    slate: Record<string, ColorToken>;
    semantic: {
      danger: ColorToken;
      success: ColorToken;
      warning: ColorToken;
      info: ColorToken;
    };
    glass: {
      glass: ColorToken;
      glassStrong: ColorToken;
      glassBorder: ColorToken;
    };
  };
  space: Record<string, SpaceToken>;
  size: Record<string, SpaceToken>;
  radius: Record<string, RadiusToken>;
  zIndex: Record<string, Token<number>>;
  typography: {
    fontFamily: Record<string, Token<string>>;
    fontSize: Record<string, Token<number>>;
    lineHeight: Record<string, Token<number>>;
    fontWeight: Record<string, Token<string>>;
  };
  shadow: Record<string, Token<any>>;
  breakpoint: Record<string, Token<string>>;
}
```

### interface `ThemeColors`

- Signature: `interface ThemeColors`
- Lines: 63-84
- Exported: yes

```ts
interface ThemeColors {
  background: string;
  backgroundStrong: string;
  backgroundMuted: string;
  text: string;
  textMuted: string;
  textInverse: string;
  border: string;
  borderMuted: string;
  primary: string;
  primaryMuted: string;
  accent: string;
  secondary: string;
  danger: string;
  dangerMuted: string;
  success: string;
  successMuted: string;
  warning: string;
  warningMuted: string;
  info: string;
  infoMuted: string;
}
```

### interface `Theme`

- Signature: `interface Theme`
- Lines: 86-89
- Exported: yes

```ts
interface Theme {
  name: 'light' | 'dark';
  colors: ThemeColors;
}
```

### interface `Themes`

- Signature: `interface Themes`
- Lines: 91-94
- Exported: yes

```ts
interface Themes {
  light: Theme;
  dark: Theme;
}
```

### interface `DesignSystemConfig`

- Signature: `interface DesignSystemConfig`
- Lines: 96-106
- Exported: yes

```ts
interface DesignSystemConfig {
  version: string;
  metadata: {
    name: string;
    description?: string;
    author?: string;
    lastUpdated: string;
  };
  tokens: Tokens;
  themes: Themes;
}
```
