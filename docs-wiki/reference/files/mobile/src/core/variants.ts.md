---
title: "mobile/src/core/variants.ts"
description: "The `createVariants` function generates a set of CSS variants based on a given configuration."
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
  page: "reference/files/mobile/src/core/variants.ts.md"
  relativePath: "mobile/src/core/variants.ts"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/mobile/src/core/variants.ts"
  module: "mobile/src/core"
  workspace: "mobile"
  language: "TypeScript"
  symbolCount: 3
---

# mobile/src/core/variants.ts

- Overview: [emplus Docs Wiki](../../../../../index.md)
- Summary: [SUMMARY](../../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../../features/index.md)
- Module: [mobile/src/core](../../../../modules/mobile/src/core.md)
- Workspace: [@emplus/mobile](../../../../../workspaces/mobile.md)

## Snapshot

- Language: TypeScript
- Source path: `/Users/truongdq/tx/GitHub/emplus/mobile/src/core/variants.ts`
- Lines: 54
- Symbols: 3

## Related Features

- [Search Create](../../../../../features/search-create.md) - Search Create captures the create workflow inside search. It spans 2 workspaces.
- [User Management Create](../../../../../features/user-create.md) - User Management Create captures the create workflow inside user management. It spans 2 workspaces.

## AI Summary

The `createVariants` function generates a set of CSS variants based on a given configuration.

### Responsibilities

- To generate CSS variants for a theme-based UI component.
- To apply different styles to the same element using multiple variant configurations.

### Usage Notes

- A wrapper function that takes a theme as input and returns a `Style` object containing various variant settings.
- This function is typically used in conjunction with React's `useState` hook or custom React wrappers to manage CSS variants for a component.

## Public API

- `VariantConfig`

```ts
type VariantConfig<V extends Record<string, string>> = { base?: Style; variants: { [K in keyof V]: { [Val in V[K]]: Style } }; compoundVariants?: Array<Partial<V> & { style: Style }>; defaultVariants?: Partial<V>; };
```

- `function createVariants<V extends Record<string, string>>( configFn: (theme: ReturnType<typeof useTheme>) => VariantConfig<V>, )`

## Symbols

### type `VariantConfig`

- Signature:

```ts
type VariantConfig<V extends Record<string, string>> = { base?: Style; variants: { [K in keyof V]: { [Val in V[K]]: Style } }; compoundVariants?: Array<Partial<V> & { style: Style }>; defaultVariants?: Partial<V>; };
```
- Lines: 7-12
- Exported: yes

```ts
type VariantConfig<V extends Record<string, string>> = {
  base?: Style;
  variants: { [K in keyof V]: { [Val in V[K]]: Style } };
  compoundVariants?: Array<Partial<V> & { style: Style }>;
  defaultVariants?: Partial<V>;
};
```

### function `createVariants`

- Signature: `function createVariants<V extends Record<string, string>>( configFn: (theme: ReturnType<typeof useTheme>) => VariantConfig<V>, )`
- Lines: 19-53
- Exported: yes

```ts
function createVariants<V extends Record<string, string>>(
  configFn: (theme: ReturnType<typeof useTheme>) => VariantConfig<V>,
) {
  return function useVariants(props: Partial<V>): Style {
    const theme = useTheme();

    return useMemo(() => {
      const config = configFn(theme);

      // Merge defaultVariants + props
      const resolved = { ...config.defaultVariants, ...props } as unknown as V;

      let styles: Style[] = [];
      if (config.base) styles.push(config.base);

      // Apply variant styles
      for (const [key, value] of Object.entries(resolved)) {
        const variantStyles = config.variants[key as keyof V];
        if (variantStyles && variantStyles[value as V[keyof V]]) {
          styles.push(variantStyles[value as V[keyof V]]);
        }
      }

      // Apply compound variants
      config.compoundVariants?.forEach(({ style, ...conditions }) => {
        const matches = Object.entries(conditions).every(
          ([k, v]) => resolved[k as keyof V] === v,
        );
        if (matches) styles.push(style);
      });

      return StyleSheet.flatten(styles);
    }, [theme, props]);
  };
}
```

### type `Style`

- Signature: `type Style = ViewStyle | TextStyle | ImageStyle;`
- Lines: 5-5
- Exported: no

```ts
type Style = ViewStyle | TextStyle | ImageStyle;
```
