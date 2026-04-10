---
title: "mobile/src/core/factory.tsx"
description: "A factory function for creating React components."
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
  page: "reference/files/mobile/src/core/factory.tsx.md"
  relativePath: "mobile/src/core/factory.tsx"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/mobile/src/core/factory.tsx"
  module: "mobile/src/core"
  workspace: "mobile"
  language: "TypeScript"
  symbolCount: 3
---

# mobile/src/core/factory.tsx

- Overview: [emplus Docs Wiki](../../../../../index.md)
- Summary: [SUMMARY](../../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../../features/index.md)
- Module: [mobile/src/core](../../../../modules/mobile/src/core.md)
- Workspace: [@emplus/mobile](../../../../../workspaces/mobile.md)

## Snapshot

- Language: TypeScript
- Source path: `/Users/truongdq/tx/GitHub/emplus/mobile/src/core/factory.tsx`
- Lines: 62
- Symbols: 3

## Related Features

- [Search Create](../../../../../features/search-create.md) - Search Create captures the create workflow inside search. It spans 2 workspaces.
- [User Management Create](../../../../../features/user-create.md) - User Management Create captures the create workflow inside user management. It spans 2 workspaces.

## AI Summary

A factory function for creating React components.

### Responsibilities

- Create React components with dynamic variants.
- Extend existing components with custom defaults.

### Usage Notes

- Usage notes are not provided in the code snippet, but can be imported from a separate file.

## Public API

- `type VariantConfigFn<V extends Record<string, string>> = ( theme: Theme, ) => VariantConfig<V>;`
- `interface ComponentConfig< BaseProps extends object, V extends Record<string, string> = {}, >`
- `function createComponent< BaseProps extends object, V extends Record<string, string> = {}, >(config: ComponentConfig<BaseProps, V>)`

## Symbols

### type `VariantConfigFn`

- Signature: `type VariantConfigFn<V extends Record<string, string>> = ( theme: Theme, ) => VariantConfig<V>;`
- Lines: 5-7
- Exported: yes

```tsx
type VariantConfigFn<V extends Record<string, string>> = (
  theme: Theme,
) => VariantConfig<V>;
```

### interface `ComponentConfig`

- Signature: `interface ComponentConfig< BaseProps extends object, V extends Record<string, string> = {}, >`
- Lines: 9-20
- Exported: yes

```tsx
interface ComponentConfig<
  BaseProps extends object,
  V extends Record<string, string> = {},
> {
  displayName: string;
  variantsFn?: VariantConfigFn<V>;
  defaultProps?: Partial<BaseProps & Partial<V>>;
  render: (
    props: BaseProps & V & { theme: Theme; variantStyle?: any },
    ref: any,
  ) => ReactElement;
}
```

### function `createComponent`

- Signature: `function createComponent< BaseProps extends object, V extends Record<string, string> = {}, >(config: ComponentConfig<BaseProps, V>)`
- Lines: 26-61
- Exported: yes

```tsx
function createComponent<
  BaseProps extends object,
  V extends Record<string, string> = {},
>(config: ComponentConfig<BaseProps, V>) {
  const useVariants = config.variantsFn
    ? createVariants(config.variantsFn)
    : null;

  const Component: any = forwardRef<any, BaseProps & Partial<V>>(
    (props, ref) => {
      const theme = useTheme();
      const mergedProps = { ...config.defaultProps, ...props } as BaseProps &
        Partial<V>;

      // Resolve variants if config exists
      const variantStyle = useVariants
        ? useVariants(mergedProps as Partial<V>)
        : undefined;

      return config.render({ ...mergedProps, theme, variantStyle } as any, ref);
    },
  );

  Component.displayName = config.displayName;

  /**
   * .extend() — Create a new component based on this one with different default props.
   */
  Component.extend = (overrideConfig: Partial<ComponentConfig<BaseProps, V>>) =>
    createComponent({ ...config, ...overrideConfig } as ComponentConfig<
      BaseProps,
      V
    >);

  return Component;
}
```
