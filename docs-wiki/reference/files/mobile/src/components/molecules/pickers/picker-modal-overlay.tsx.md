---
title: "mobile/src/components/molecules/pickers/picker-modal-overlay.tsx"
description: "The `PickerModalOverlay` is a functional React component that renders a modal overlay."
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
  page: "reference/files/mobile/src/components/molecules/pickers/picker-modal-overlay.tsx.md"
  relativePath: "mobile/src/components/molecules/pickers/picker-modal-overlay.tsx"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/mobile/src/components/molecules/pickers/picker-modal-overlay.tsx"
  module: "mobile/src/components/molecules/pickers"
  workspace: "mobile"
  language: "TypeScript"
  symbolCount: 2
---

# mobile/src/components/molecules/pickers/picker-modal-overlay.tsx

- Overview: [emplus Docs Wiki](../../../../../../../index.md)
- Summary: [SUMMARY](../../../../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../../../../features/index.md)
- Module: [mobile/src/components/molecules/pickers](../../../../../../modules/mobile/src/components/molecules/pickers.md)
- Workspace: [@emplus/mobile](../../../../../../../workspaces/mobile.md)

## Snapshot

- Language: TypeScript
- Source path: `/Users/truongdq/tx/GitHub/emplus/mobile/src/components/molecules/pickers/picker-modal-overlay.tsx`
- Lines: 49
- Symbols: 2

## AI Summary

The `PickerModalOverlay` is a functional React component that renders a modal overlay.

### Usage Notes

- The provided props are used to configure the modal's visibility, on close action, and child content.

## Public API

- `interface PickerModalOverlayProps`
- `function PickerModalOverlay({ visible, onRequestClose, children, }: PickerModalOverlayProps)`

## Symbols

### interface `PickerModalOverlayProps`

- Signature: `interface PickerModalOverlayProps`
- Lines: 4-8
- Exported: yes

```tsx
interface PickerModalOverlayProps {
  visible: boolean;
  onRequestClose: () => void;
  children: React.ReactNode;
}
```

### function `PickerModalOverlay`

- Signature: `function PickerModalOverlay({ visible, onRequestClose, children, }: PickerModalOverlayProps)`
- Lines: 14-36
- Exported: yes

```tsx
function PickerModalOverlay({
  visible,
  onRequestClose,
  children,
}: PickerModalOverlayProps) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onRequestClose}
    >
      <View style={styles.root}>
        <Pressable
          style={[StyleSheet.absoluteFillObject, styles.backdrop]}
          onPress={onRequestClose}
          accessibilityLabel="Đóng"
        />
        <View style={styles.anchor}>{children}</View>
      </View>
    </Modal>
  );
}
```
