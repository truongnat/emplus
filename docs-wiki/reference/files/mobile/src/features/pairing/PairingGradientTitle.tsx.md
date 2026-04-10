---
title: "mobile/src/features/pairing/PairingGradientTitle.tsx"
description: "A function to render a pairing gradient with title 'Ghép đôi'"
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
  page: "reference/files/mobile/src/features/pairing/PairingGradientTitle.tsx.md"
  relativePath: "mobile/src/features/pairing/PairingGradientTitle.tsx"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/mobile/src/features/pairing/PairingGradientTitle.tsx"
  module: "mobile/src/features/pairing"
  workspace: "mobile"
  language: "TypeScript"
  symbolCount: 1
---

# mobile/src/features/pairing/PairingGradientTitle.tsx

- Overview: [emplus Docs Wiki](../../../../../../index.md)
- Summary: [SUMMARY](../../../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../../../features/index.md)
- Module: [mobile/src/features/pairing](../../../../../modules/mobile/src/features/pairing.md)
- Workspace: [@emplus/mobile](../../../../../../workspaces/mobile.md)

## Snapshot

- Language: TypeScript
- Source path: `/Users/truongdq/tx/GitHub/emplus/mobile/src/features/pairing/PairingGradientTitle.tsx`
- Lines: 60
- Symbols: 1

## AI Summary

A function to render a pairing gradient with title 'Ghép đôi'

### Responsibilities

- number

### Usage Notes

- This function is not used elsewhere in the codebase

## Public API

- `function PairingGradientTitle()`

## Symbols

### function `PairingGradientTitle`

- Signature: `function PairingGradientTitle()`
- Lines: 9-28
- Exported: yes

```tsx
function PairingGradientTitle() {
  return (
    <MaskedView
      style={styles.maskRoot}
      maskElement={
        <View style={styles.maskBox}>
          <Text style={styles.maskText}>Ghép đôi</Text>
        </View>
      }
    >
      <LinearGradient
        colors={["#FF6B81", "#C084FC", "#7B61FF"]}
        locations={[0, 0.45, 1]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0.6 }}
        style={styles.gradient}
      />
    </MaskedView>
  );
}
```
