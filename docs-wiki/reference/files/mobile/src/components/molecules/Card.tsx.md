---
title: "mobile/src/components/molecules/Card.tsx"
description: "A React component representing a card layer with customizable props."
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
  page: "reference/files/mobile/src/components/molecules/Card.tsx.md"
  relativePath: "mobile/src/components/molecules/Card.tsx"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/mobile/src/components/molecules/Card.tsx"
  module: "mobile/src/components/molecules"
  workspace: "mobile"
  language: "TypeScript"
  symbolCount: 2
---

# mobile/src/components/molecules/Card.tsx

- Overview: [emplus Docs Wiki](../../../../../../index.md)
- Summary: [SUMMARY](../../../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../../../features/index.md)
- Module: [mobile/src/components/molecules](../../../../../modules/mobile/src/components/molecules.md)
- Workspace: [@emplus/mobile](../../../../../../workspaces/mobile.md)

## Snapshot

- Language: TypeScript
- Source path: `/Users/truongdq/tx/GitHub/emplus/mobile/src/components/molecules/Card.tsx`
- Lines: 41
- Symbols: 2

## AI Summary

A React component representing a card layer with customizable props.

### Responsibilities

- to render a card layout within a View component

### Usage Notes

- This is a standard React component, and other React components should respect its children prop.
- Cards are usually used for displaying content, such as buttons or notices.

## Public API

- `interface CardProps`
- `function Card({ children, style, variant = "default" }: CardProps)`

## Symbols

### interface `CardProps`

- Signature: `interface CardProps`
- Lines: 9-13
- Exported: yes

```tsx
interface CardProps {
  children: ReactNode;
  style?: ViewStyle;
  variant?: "default" | "elevated" | "outlined";
}
```

### function `Card`

- Signature: `function Card({ children, style, variant = "default" }: CardProps)`
- Lines: 15-17
- Exported: yes

```tsx
function Card({ children, style, variant = "default" }: CardProps) {
  return <View style={[styles.card, styles[variant], style]}>{children}</View>;
}
```
