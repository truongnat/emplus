---
title: "mobile/src/features/auth/components/LoginSignUpFooter.tsx"
description: "LoginSignUpFooter component"
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
  page: "reference/files/mobile/src/features/auth/components/LoginSignUpFooter.tsx.md"
  relativePath: "mobile/src/features/auth/components/LoginSignUpFooter.tsx"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/mobile/src/features/auth/components/LoginSignUpFooter.tsx"
  module: "mobile/src/features/auth/components"
  workspace: "mobile"
  language: "TypeScript"
  symbolCount: 1
---

# mobile/src/features/auth/components/LoginSignUpFooter.tsx

- Overview: [emplus Docs Wiki](../../../../../../../index.md)
- Summary: [SUMMARY](../../../../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../../../../features/index.md)
- Module: [mobile/src/features/auth/components](../../../../../../modules/mobile/src/features/auth/components.md)
- Workspace: [@emplus/mobile](../../../../../../../workspaces/mobile.md)

## Snapshot

- Language: TypeScript
- Source path: `/Users/truongdq/tx/GitHub/emplus/mobile/src/features/auth/components/LoginSignUpFooter.tsx`
- Lines: 58
- Symbols: 1

## Related Features

- [Authentication Login](../../../../../../../features/auth-login.md) - Authentication Login captures the login workflow inside authentication. It spans 2 workspaces. Key flows include Auth login, Auth registration, Auth login.

## AI Summary

LoginSignUpFooter component

### Usage Notes

- The component handles user login sign up functionality in a mobile app.

## Public API

- `function LoginSignUpFooter()`

## Symbols

### function `LoginSignUpFooter`

- Signature: `function LoginSignUpFooter()`
- Lines: 14-57
- Exported: yes

```tsx
function LoginSignUpFooter() {
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
            Chưa có tài khoản?
          </Text>
          <TouchableOpacity
            onPress={() => {
              router.push("/register");
            }}
            accessibilityRole="button"
            accessibilityLabel="Đăng ký tài khoản mới"
            hitSlop={{ top: 12, bottom: 12, left: 8, right: 8 }}
          >
            <Text
              style={[styles.signUpText, { color: colors.brand.text }]}
            >
              Đăng ký ngay
            </Text>
          </TouchableOpacity>
        </View>
      </LoginFooterSlot>
    </Animated.View>
  );
}
```
