---
title: "design-builder/src/components/ui/button.tsx"
description: "Button component props."
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
  page: "reference/files/design-builder/src/components/ui/button.tsx.md"
  relativePath: "design-builder/src/components/ui/button.tsx"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/design-builder/src/components/ui/button.tsx"
  module: "design-builder/src/components/ui"
  workspace: "design-builder"
  language: "TypeScript"
  symbolCount: 1
---

# design-builder/src/components/ui/button.tsx

- Overview: [emplus Docs Wiki](../../../../../../index.md)
- Summary: [SUMMARY](../../../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../../../features/index.md)
- Module: [design-builder/src/components/ui](../../../../../modules/design-builder/src/components/ui.md)
- Workspace: [@emplus/design-builder](../../../../../../workspaces/design-builder.md)

## Snapshot

- Language: TypeScript
- Source path: `/Users/truongdq/tx/GitHub/emplus/design-builder/src/components/ui/button.tsx`
- Lines: 57
- Symbols: 1

## Related Features

- [Design](../../../../../../features/design.md) - Design captures the main design behavior discovered in the codebase. Key flows include Design operations flow, Design operations flow.

## AI Summary

Button component props.

### Responsibilities

- asChild

## Public API

- `interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants>`

## Symbols

### interface `ButtonProps`

- Signature: `interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants>`
- Lines: 36-40
- Exported: yes

```tsx
interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}
```
