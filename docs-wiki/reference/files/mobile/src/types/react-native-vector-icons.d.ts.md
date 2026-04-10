---
title: "mobile/src/types/react-native-vector-icons.d.ts"
description: "Icon types and classes for mobile applications."
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
  page: "reference/files/mobile/src/types/react-native-vector-icons.d.ts.md"
  relativePath: "mobile/src/types/react-native-vector-icons.d.ts"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/mobile/src/types/react-native-vector-icons.d.ts"
  module: "mobile/src/types"
  workspace: "mobile"
  language: "TypeScript"
  symbolCount: 6
---

# mobile/src/types/react-native-vector-icons.d.ts

- Overview: [emplus Docs Wiki](../../../../../index.md)
- Summary: [SUMMARY](../../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../../features/index.md)
- Module: [mobile/src/types](../../../../modules/mobile/src/types.md)
- Workspace: [@emplus/mobile](../../../../../workspaces/mobile.md)

## Snapshot

- Language: TypeScript
- Source path: `/Users/truongdq/tx/GitHub/emplus/mobile/src/types/react-native-vector-icons.d.ts`
- Lines: 40
- Symbols: 6

## Related Features

- [Mobile](../../../../../features/mobile.md) - Mobile captures the main mobile behavior discovered in the codebase. Key flows include Mobile operations flow, Mobile operations flow.

## AI Summary

Icon types and classes for mobile applications.

### Responsibilities

- Returns an icon instance based on icon props.
- Extends the given React.ComponentType with additional properties.

### Usage Notes

- There are several imported interfaces and classes in this file, each serving a specific purpose. Understanding these is crucial for creating icons and components that seamlessly integrate with native vector icons.

## Public API

- `interface IconProps`
- `type Icon = React.ComponentType<IconProps>;`
- `interface IoniconsProps`
- `class Ionicons extends React.Component<IoniconsProps>`
- `interface MaterialCommunityIconsProps`
- `class MaterialCommunityIcons extends React.Component<MaterialCommunityIconsProps>`

## Symbols

### interface `IconProps`

- Signature: `interface IconProps`
- Lines: 5-10
- Exported: yes

```ts
interface IconProps {
    name: string;
    size?: number;
    color?: string;
    style?: any;
  }
```

### type `Icon`

- Signature: `type Icon = React.ComponentType<IconProps>;`
- Lines: 12-12
- Exported: yes

```ts
type Icon = React.ComponentType<IconProps>;
```

### interface `IoniconsProps`

- Signature: `interface IoniconsProps`
- Lines: 18-23
- Exported: yes

```ts
interface IoniconsProps {
    name: string;
    size?: number;
    color?: string;
    style?: any;
  }
```

### class `Ionicons`

- Signature: `class Ionicons extends React.Component<IoniconsProps>`
- Lines: 25-25
- Exported: yes

```ts
class Ionicons extends React.Component<IoniconsProps> {}
```

### interface `MaterialCommunityIconsProps`

- Signature: `interface MaterialCommunityIconsProps`
- Lines: 31-36
- Exported: yes

```ts
interface MaterialCommunityIconsProps {
    name: string;
    size?: number;
    color?: string;
    style?: any;
  }
```

### class `MaterialCommunityIcons`

- Signature: `class MaterialCommunityIcons extends React.Component<MaterialCommunityIconsProps>`
- Lines: 38-38
- Exported: yes

```ts
class MaterialCommunityIcons extends React.Component<MaterialCommunityIconsProps> {}
```
