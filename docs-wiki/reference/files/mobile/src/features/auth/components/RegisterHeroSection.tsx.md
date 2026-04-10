---
title: "mobile/src/features/auth/components/RegisterHeroSection.tsx"
description: "HTML element for a registration hero section on the mobile app"
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
  page: "reference/files/mobile/src/features/auth/components/RegisterHeroSection.tsx.md"
  relativePath: "mobile/src/features/auth/components/RegisterHeroSection.tsx"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/mobile/src/features/auth/components/RegisterHeroSection.tsx"
  module: "mobile/src/features/auth/components"
  workspace: "mobile"
  language: "TypeScript"
  symbolCount: 1
---

# mobile/src/features/auth/components/RegisterHeroSection.tsx

- Overview: [emplus Docs Wiki](../../../../../../../index.md)
- Summary: [SUMMARY](../../../../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../../../../features/index.md)
- Module: [mobile/src/features/auth/components](../../../../../../modules/mobile/src/features/auth/components.md)
- Workspace: [@emplus/mobile](../../../../../../../workspaces/mobile.md)

## Snapshot

- Language: TypeScript
- Source path: `/Users/truongdq/tx/GitHub/emplus/mobile/src/features/auth/components/RegisterHeroSection.tsx`
- Lines: 35
- Symbols: 1

## Related Features

- [Authentication Login](../../../../../../../features/auth-login.md) - Authentication Login captures the login workflow inside authentication. It spans 2 workspaces. Key flows include Auth login, Auth registration, Auth login.
- [Order Management Login](../../../../../../../features/order-login.md) - Order Management Login captures the login workflow inside order management. It spans 2 workspaces. Key flows include Auth login, Auth login, Auth login.

## AI Summary

HTML element for a registration hero section on the mobile app

## Public API

- `function RegisterHeroSection()`

## Symbols

### function `RegisterHeroSection`

- Signature: `function RegisterHeroSection()`
- Lines: 11-34
- Exported: yes

```tsx
function RegisterHeroSection() {
  const reducedMotion = useReducedMotion();
  const enteringHero = reducedMotion
    ? FadeIn.duration(0)
    : FadeInDown.delay(40).springify().damping(22).stiffness(180);

  return (
    <Animated.View
      style={styles.registerHeader}
      entering={enteringHero}
      accessibilityRole="header"
      accessibilityLabel="Em+, tạo tài khoản"
    >
      <View style={styles.registerLogoMark}>
        <EmplusLottie
          source={lottieInventory.registerLoveHearts}
          style={styles.registerLogoLottie}
          loop
          speed={0.88}
        />
      </View>
    </Animated.View>
  );
}
```
