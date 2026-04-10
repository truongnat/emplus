---
title: "mobile/src/components/atoms/Checkbox.tsx"
description: "A checkbox component that allows the user to toggle a boolean value."
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
  page: "reference/files/mobile/src/components/atoms/Checkbox.tsx.md"
  relativePath: "mobile/src/components/atoms/Checkbox.tsx"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/mobile/src/components/atoms/Checkbox.tsx"
  module: "mobile/src/components/atoms"
  workspace: "mobile"
  language: "TypeScript"
  symbolCount: 2
---

# mobile/src/components/atoms/Checkbox.tsx

- Overview: [emplus Docs Wiki](../../../../../../index.md)
- Summary: [SUMMARY](../../../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../../../features/index.md)
- Module: [mobile/src/components/atoms](../../../../../modules/mobile/src/components/atoms.md)
- Workspace: [@emplus/mobile](../../../../../../workspaces/mobile.md)

## Snapshot

- Language: TypeScript
- Source path: `/Users/truongdq/tx/GitHub/emplus/mobile/src/components/atoms/Checkbox.tsx`
- Lines: 61
- Symbols: 2

## AI Summary

A checkbox component that allows the user to toggle a boolean value.

### Usage Notes

- To use this component, import it in your application and pass required props: value (bool), onValueChange (fn), label (str), and style (dict).

## Public API

- `interface CheckboxProps`
- `function Checkbox({ value, onValueChange, label, style }: CheckboxProps)`

## Symbols

### interface `CheckboxProps`

- Signature: `interface CheckboxProps`
- Lines: 7-12
- Exported: yes

```tsx
interface CheckboxProps {
    value: boolean;
    onValueChange: (value: boolean) => void;
    label?: string;
    style?: ViewStyle;
}
```

### function `Checkbox`

- Signature: `function Checkbox({ value, onValueChange, label, style }: CheckboxProps)`
- Lines: 14-41
- Exported: yes

```tsx
function Checkbox({ value, onValueChange, label, style }: CheckboxProps) {
    const colors = useThemeColors();

    return (
        <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => onValueChange(!value)}
            style={[styles.container, style]}
        >
            <View
                style={[
                    styles.checkbox,
                    {
                        borderColor: value ? colors.brand.default : colors.border.default,
                        backgroundColor: value ? colors.brand.default : "transparent",
                    },
                ]}
            >
                {value && <Ionicons name="checkmark" size={16} color="#fff" />}
            </View>
            {label && (
                <Text style={[styles.label, { color: colors.text.secondary }]}>
                    {label}
                </Text>
            )}
        </TouchableOpacity>
    );
}
```
