---
title: "mobile/src/theme/tokens/semantic.ts"
description: "Builds component tokens based on a given `SemanticColors` object."
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
  page: "reference/files/mobile/src/theme/tokens/semantic.ts.md"
  relativePath: "mobile/src/theme/tokens/semantic.ts"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/mobile/src/theme/tokens/semantic.ts"
  module: "mobile/src/theme/tokens"
  workspace: "mobile"
  language: "TypeScript"
  symbolCount: 3
---

# mobile/src/theme/tokens/semantic.ts

- Overview: [emplus Docs Wiki](../../../../../../index.md)
- Summary: [SUMMARY](../../../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../../../features/index.md)
- Module: [mobile/src/theme/tokens](../../../../../modules/mobile/src/theme/tokens.md)
- Workspace: [@emplus/mobile](../../../../../../workspaces/mobile.md)

## Snapshot

- Language: TypeScript
- Source path: `/Users/truongdq/tx/GitHub/emplus/mobile/src/theme/tokens/semantic.ts`
- Lines: 296
- Symbols: 3

## AI Summary

Builds component tokens based on a given `SemanticColors` object.

## Public API

- `interface SemanticColors`
- `function buildComponentTokens(colors: SemanticColors)`
- `type ComponentTokens = ReturnType<typeof buildComponentTokens>;`

## Symbols

### interface `SemanticColors`

- Signature: `interface SemanticColors`
- Lines: 10-71
- Exported: yes

```ts
interface SemanticColors {
  background: {
    default: string;
    subtle: string;
    inverse: string;
  };
  surface: {
    default: string;
    raised: string;
    overlay: string;
    sunken: string;
  };
  border: {
    default: string;
    subtle: string;
    strong: string;
    inverse: string;
  };
  text: {
    primary: string;
    secondary: string;
    tertiary: string;
    disabled: string;
    inverse: string;
    link: string;
    onBrand: string;
  };
  brand: {
    default: string;
    subtle: string;
    muted: string;
    strong: string;
    text: string;
  };
  secondary: {
    default: string;
    subtle: string;
    muted: string;
    text: string;
  };
  accent: {
    default: string;
    subtle: string;
    muted: string;
    text: string;
  };
  status: {
    error: { bg: string; text: string; border: string; icon: string };
    warning: { bg: string; text: string; border: string; icon: string };
    success: { bg: string; text: string; border: string; icon: string };
    info: { bg: string; text: string; border: string; icon: string };
  };
  interactive: {
    primary: string;
    primaryHovered: string;
    primaryPressed: string;
    primaryDisabled: string;
    ghost: string;
    ghostHovered: string;
  };
  scrim: string;
}
```

### function `buildComponentTokens`

- Signature: `function buildComponentTokens(colors: SemanticColors)`
- Lines: 203-293
- Exported: yes

```ts
function buildComponentTokens(colors: SemanticColors) {
  return {
    button: {
      solid: {
        bg: colors.interactive.primary,
        bgHover: colors.interactive.primaryHovered,
        bgPressed: colors.interactive.primaryPressed,
        bgDisabled: colors.interactive.primaryDisabled,
        text: colors.text.onBrand,
        textDisabled: colors.text.disabled,
      },
      outline: {
        bg: "transparent",
        bgPressed: colors.brand.muted,
        border: colors.interactive.primary,
        text: colors.brand.text,
      },
      ghost: {
        bg: colors.interactive.ghost,
        bgPressed: colors.interactive.ghostHovered,
        text: colors.brand.text,
      },
      soft: {
        bg: colors.brand.muted,
        bgPressed: colors.brand.subtle + "22",
        text: colors.brand.text,
      },
      danger: {
        bg: colors.status.error.bg,
        border: colors.status.error.border,
        text: colors.status.error.text,
      },
    },
    input: {
      bg: colors.surface.sunken,
      bgFocus: colors.surface.default,
      border: colors.border.default,
      borderFocus: colors.border.strong,
      borderError: colors.status.error.border,
      borderSuccess: colors.status.success.border,
      text: colors.text.primary,
      placeholder: colors.text.tertiary,
      label: colors.text.secondary,
      labelFocus: colors.brand.text,
      labelError: colors.status.error.text,
      hint: colors.text.tertiary,
      error: colors.status.error.text,
    },
    card: {
      bg: colors.surface.default,
      bgElevated: colors.surface.raised,
      border: colors.border.subtle,
      text: colors.text.primary,
    },
    badge: {
      error: { bg: colors.status.error.bg, text: colors.status.error.text },
      warning: { bg: colors.status.warning.bg, text: colors.status.warning.text },
      success: { bg: colors.status.success.bg, text: colors.status.success.text },
      info: { bg: colors.status.info.bg, text: colors.status.info.text },
      default: { bg: colors.surface.sunken, text: colors.text.secondary },
    },
    avatar: {
      bg: colors.brand.muted,
      text: colors.brand.text,
      ring: colors.brand.default,
    },
    bottomSheet: {
      bg: colors.surface.overlay,
      handle: colors.border.default,
      overlay: colors.scrim,
    },
    toast: {
      bg: colors.surface.raised,
      text: colors.text.primary,
      border: colors.border.subtle,
    },
    tabBar: {
      bg: colors.surface.default,
      border: colors.border.subtle,
      activeIcon: colors.brand.default,
      inactiveIcon: colors.text.tertiary,
      activeLabel: colors.brand.text,
      inactiveLabel: colors.text.tertiary,
      indicator: colors.brand.default,
    },
    skeleton: {
      base: colors.surface.sunken,
      shimmer: colors.border.subtle,
    },
  } as const;
}
```

### type `ComponentTokens`

- Signature: `type ComponentTokens = ReturnType<typeof buildComponentTokens>;`
- Lines: 295-295
- Exported: yes

```ts
type ComponentTokens = ReturnType<typeof buildComponentTokens>;
```
