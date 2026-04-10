---
title: "mobile/app/pairing.tsx"
description: "function:symbol:0"
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
  page: "reference/files/mobile/app/pairing.tsx.md"
  relativePath: "mobile/app/pairing.tsx"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/mobile/app/pairing.tsx"
  module: "mobile/app"
  workspace: "mobile"
  language: "TypeScript"
  symbolCount: 1
---

# mobile/app/pairing.tsx

- Overview: [emplus Docs Wiki](../../../../index.md)
- Summary: [SUMMARY](../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../features/index.md)
- Module: [mobile/app](../../../modules/mobile/app.md)
- Workspace: [@emplus/mobile](../../../../workspaces/mobile.md)

## Snapshot

- Language: TypeScript
- Source path: `/Users/truongdq/tx/GitHub/emplus/mobile/app/pairing.tsx`
- Lines: 44
- Symbols: 1

## AI Summary

function:symbol:0

### Responsibilities

- function:symbol:0
- array:function:pairingGridShell.tsx:1
- object:function:PairingScreenBody.tsx:10

### Usage Notes

- See pairings.screen.js for usage logic.

## Public API

- `function PairingScreen()`

## Symbols

### function `PairingScreen`

- Signature: `function PairingScreen()`
- Lines: 12-43
- Exported: yes

```tsx
function PairingScreen() {
  const { session, hydrated, isAuthenticated } = useSession();
  const isPaired = Boolean(session?.user?.coupleId);

  if (!hydrated) {
    return (
      <PairingGridShell>
        <View style={pairingScreenStyles.loadingWrap}>
          <EmplusLottie
            source={lottieInventory.loader}
            style={{ width: 120, height: 120 }}
            loop
          />
        </View>
      </PairingGridShell>
    );
  }

  if (!isAuthenticated) {
    return <Redirect href="/login" />;
  }

  if (isPaired) {
    return <Redirect href="/(tabs)/home" />;
  }

  return (
    <PairingGridShell>
      <PairingScreenBody />
    </PairingGridShell>
  );
}
```
