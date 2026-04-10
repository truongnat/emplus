---
title: "mobile/src/features/auth/components/ForgotPasswordHeroSection.tsx"
description: "ForgotPasswordHeroSection component that displays a forgot password hero section with an icon and title."
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
  page: "reference/files/mobile/src/features/auth/components/ForgotPasswordHeroSection.tsx.md"
  relativePath: "mobile/src/features/auth/components/ForgotPasswordHeroSection.tsx"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/mobile/src/features/auth/components/ForgotPasswordHeroSection.tsx"
  module: "mobile/src/features/auth/components"
  workspace: "mobile"
  language: "TypeScript"
  symbolCount: 1
---

# mobile/src/features/auth/components/ForgotPasswordHeroSection.tsx

- Overview: [emplus Docs Wiki](../../../../../../../index.md)
- Summary: [SUMMARY](../../../../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../../../../features/index.md)
- Module: [mobile/src/features/auth/components](../../../../../../modules/mobile/src/features/auth/components.md)
- Workspace: [@emplus/mobile](../../../../../../../workspaces/mobile.md)

## Snapshot

- Language: TypeScript
- Source path: `/Users/truongdq/tx/GitHub/emplus/mobile/src/features/auth/components/ForgotPasswordHeroSection.tsx`
- Lines: 54
- Symbols: 1

## Related Features

- [Authentication Login](../../../../../../../features/auth-login.md) - Authentication Login captures the login workflow inside authentication. It spans 2 workspaces. Key flows include Auth login, Auth registration, Auth login.
- [Authentication Password Reset](../../../../../../../features/auth-reset.md) - Authentication Password Reset captures the password reset workflow inside authentication. It spans 3 workspaces. Key flows include Password reset, Password reset, Password reset.

## AI Summary

ForgotPasswordHeroSection component that displays a forgot password hero section with an icon and title.

### Usage Notes

- The component handles user interface updates for the forgot password feature.

## Public API

- `function ForgotPasswordHeroSection()`

## Symbols

### function `ForgotPasswordHeroSection`

- Signature: `function ForgotPasswordHeroSection()`
- Lines: 12-53
- Exported: yes

```tsx
function ForgotPasswordHeroSection() {
  const reducedMotion = useReducedMotion();
  const { isDark } = useThemeMode();
  const colors = useThemeColors();

  const entering = reducedMotion
    ? FadeIn.duration(0)
    : FadeInDown.delay(40).springify().damping(22).stiffness(180);

  const circleSurface = isDark
    ? {
        backgroundColor: "rgba(255,255,255,0.08)",
        borderColor: "rgba(255,255,255,0.14)",
      }
    : {
        backgroundColor: "rgba(255,255,255,0.5)",
        borderColor: "rgba(255,107,129,0.22)",
      };

  return (
    <Animated.View
      style={styles.hero}
      entering={entering}
      accessibilityRole="header"
      accessibilityLabel="Quên mật khẩu"
    >
      <View style={[styles.iconCircle, circleSurface]}>
        <MaterialCommunityIcons
          name="lock-reset"
          size={40}
          color={colors.brand.default}
        />
      </View>
      <Text style={[styles.title, { color: colors.text.primary }]}>
        Quên mật khẩu?
      </Text>
      <Text style={[styles.subtitle, { color: colors.text.secondary }]}>
        Nhập email của bạn để nhận mã xác thực đặt lại mật khẩu.
      </Text>
    </Animated.View>
  );
}
```
