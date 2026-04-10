---
title: "mobile/src/features/auth/components/VerifyOtpHeroSection.tsx"
description: "A JSX component rendering an OTP verification section with a animated and customizable hero view."
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
  page: "reference/files/mobile/src/features/auth/components/VerifyOtpHeroSection.tsx.md"
  relativePath: "mobile/src/features/auth/components/VerifyOtpHeroSection.tsx"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/mobile/src/features/auth/components/VerifyOtpHeroSection.tsx"
  module: "mobile/src/features/auth/components"
  workspace: "mobile"
  language: "TypeScript"
  symbolCount: 2
---

# mobile/src/features/auth/components/VerifyOtpHeroSection.tsx

- Overview: [emplus Docs Wiki](../../../../../../../index.md)
- Summary: [SUMMARY](../../../../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../../../../features/index.md)
- Module: [mobile/src/features/auth/components](../../../../../../modules/mobile/src/features/auth/components.md)
- Workspace: [@emplus/mobile](../../../../../../../workspaces/mobile.md)

## Snapshot

- Language: TypeScript
- Source path: `/Users/truongdq/tx/GitHub/emplus/mobile/src/features/auth/components/VerifyOtpHeroSection.tsx`
- Lines: 55
- Symbols: 2

## Related Features

- [Authentication Login](../../../../../../../features/auth-login.md) - Authentication Login captures the login workflow inside authentication. It spans 2 workspaces. Key flows include Auth login, Auth registration, Auth login.
- [Notifications Notify](../../../../../../../features/notification-notify.md) - Notifications Notify captures the notify workflow inside notifications. It spans 2 workspaces.
- [Order Management Login](../../../../../../../features/order-login.md) - Order Management Login captures the login workflow inside order management. It spans 2 workspaces. Key flows include Auth login, Auth login, Auth login.
- [Notifications Login](../../../../../../../features/notification-login.md) - Notifications Login captures the login workflow inside notifications. It spans 2 workspaces. Key flows include Auth login, Auth registration, Auth login.
- [Authentication Verification](../../../../../../../features/auth-verify.md) - Authentication Verification captures the verification workflow inside authentication. It spans 2 workspaces. Key flows include Credential validation, Auth login, Auth login.
- [Notifications Verification](../../../../../../../features/notification-verify.md) - Notifications Verification captures the verification workflow inside notifications. It spans 2 workspaces. Key flows include Credential validation, Auth login, Auth login.
- [Order Management Verification](../../../../../../../features/order-verify.md) - Order Management Verification captures the verification workflow inside order management. It spans 2 workspaces. Key flows include Credential validation, Auth login, Auth login.
- [Order Management Notify](../../../../../../../features/order-notify.md) - Order Management Notify captures the notify workflow inside order management. It spans 2 workspaces.

## AI Summary

A JSX component rendering an OTP verification section with a animated and customizable hero view.

### Usage Notes

- The VerifyOtpHeroSection component uses the `useReducedMotion()` hook from react-motion library.
- Colors are retrieved using the `useThemeColors()` function, it returns a value containing an array of color variables.

## Public API

- `type VerifyOtpHeroSectionProps = { email: string; };`
- `function VerifyOtpHeroSection({ email }: VerifyOtpHeroSectionProps)`

## Symbols

### type `VerifyOtpHeroSectionProps`

- Signature: `type VerifyOtpHeroSectionProps = { email: string; };`
- Lines: 16-18
- Exported: yes

```tsx
type VerifyOtpHeroSectionProps = {
  email: string;
};
```

### function `VerifyOtpHeroSection`

- Signature: `function VerifyOtpHeroSection({ email }: VerifyOtpHeroSectionProps)`
- Lines: 20-54
- Exported: yes

```tsx
function VerifyOtpHeroSection({ email }: VerifyOtpHeroSectionProps) {
  const reducedMotion = useReducedMotion();
  const colors = useThemeColors();

  const entering = reducedMotion
    ? FadeIn.duration(0)
    : FadeInDown.delay(40).springify().damping(22).stiffness(180);

  return (
    <Animated.View
      style={styles.hero}
      entering={entering}
      accessibilityRole="header"
      accessibilityLabel="Xác minh mã OTP"
    >
      <View style={styles.lottieHeroWrap}>
        <EmplusLottie
          source={lottieInventory.verifyOtpPasswordAuth}
          style={verifyOtpLottieHero}
          loop
          speed={0.9}
        />
      </View>
      <Text style={[styles.title, { color: colors.text.primary }]}>
        Nhập mã xác nhận
      </Text>
      <Text style={[styles.subtitle, { color: colors.text.secondary }]}>
        Mã OTP đã được gửi đến email
      </Text>
      <Text style={[styles.emailText, { color: colors.brand.text }]}>
        {email || "—"}
      </Text>
    </Animated.View>
  );
}
```
