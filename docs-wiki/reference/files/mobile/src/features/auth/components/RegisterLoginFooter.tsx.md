---
title: "mobile/src/features/auth/components/RegisterLoginFooter.tsx"
description: "registers the footer of the login page"
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
  page: "reference/files/mobile/src/features/auth/components/RegisterLoginFooter.tsx.md"
  relativePath: "mobile/src/features/auth/components/RegisterLoginFooter.tsx"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/mobile/src/features/auth/components/RegisterLoginFooter.tsx"
  module: "mobile/src/features/auth/components"
  workspace: "mobile"
  language: "TypeScript"
  symbolCount: 1
---

# mobile/src/features/auth/components/RegisterLoginFooter.tsx

- Overview: [emplus Docs Wiki](../../../../../../../index.md)
- Summary: [SUMMARY](../../../../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../../../../features/index.md)
- Module: [mobile/src/features/auth/components](../../../../../../modules/mobile/src/features/auth/components.md)
- Workspace: [@emplus/mobile](../../../../../../../workspaces/mobile.md)

## Snapshot

- Language: TypeScript
- Source path: `/Users/truongdq/tx/GitHub/emplus/mobile/src/features/auth/components/RegisterLoginFooter.tsx`
- Lines: 56
- Symbols: 1

## Related Features

- [Authentication Login](../../../../../../../features/auth-login.md) - Authentication Login captures the login workflow inside authentication. It spans 2 workspaces. Key flows include Auth login, Auth registration, Auth login.

## AI Summary

registers the footer of the login page

## Public API

- `function RegisterLoginFooter()`

## Symbols

### function `RegisterLoginFooter`

- Signature: `function RegisterLoginFooter()`
- Lines: 14-55
- Exported: yes

```tsx
function RegisterLoginFooter() {
  const router = useRouter();
  const { isDark } = useThemeMode();
  const colors = useThemeColors();
  const reducedMotion = useReducedMotion();
  const enteringFooter = reducedMotion
    ? FadeIn.duration(0)
    : FadeInDown.delay(260).springify().damping(24).stiffness(200);

  return (
    <Animated.View entering={enteringFooter}>
      <LoginFooterSlot>
        <View style={styles.signUpContainer}>
          <Text
            style={[
              styles.signUpLabel,
              {
                color: isDark
                  ? colors.text.secondary
                  : loginFigmaLight.footerMuted,
              },
            ]}
          >
            Đã có tài khoản?
          </Text>
          <TouchableOpacity
            onPress={() => router.back()}
            accessibilityRole="button"
            accessibilityLabel="Quay lại đăng nhập"
            hitSlop={{ top: 12, bottom: 12, left: 8, right: 8 }}
          >
            <Text
              style={[styles.signUpText, { color: colors.brand.text }]}
            >
              Đăng nhập
            </Text>
          </TouchableOpacity>
        </View>
      </LoginFooterSlot>
    </Animated.View>
  );
}
```
