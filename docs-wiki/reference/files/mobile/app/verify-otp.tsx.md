---
title: "mobile/app/verify-otp.tsx"
description: "The VerifyOtpScreen function renders a screen with OTP verification options."
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
  page: "reference/files/mobile/app/verify-otp.tsx.md"
  relativePath: "mobile/app/verify-otp.tsx"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/mobile/app/verify-otp.tsx"
  module: "mobile/app"
  workspace: "mobile"
  language: "TypeScript"
  symbolCount: 1
---

# mobile/app/verify-otp.tsx

- Overview: [emplus Docs Wiki](../../../../index.md)
- Summary: [SUMMARY](../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../features/index.md)
- Module: [mobile/app](../../../modules/mobile/app.md)
- Workspace: [@emplus/mobile](../../../../workspaces/mobile.md)

## Snapshot

- Language: TypeScript
- Source path: `/Users/truongdq/tx/GitHub/emplus/mobile/app/verify-otp.tsx`
- Lines: 43
- Symbols: 1

## Related Features

- [Authentication Login](../../../../features/auth-login.md) - Authentication Login captures the login workflow inside authentication. It spans 2 workspaces. Key flows include Auth login, Auth registration, Auth login.
- [Order Management Login](../../../../features/order-login.md) - Order Management Login captures the login workflow inside order management. It spans 2 workspaces. Key flows include Auth login, Auth login, Auth login.
- [Authentication Verification](../../../../features/auth-verify.md) - Authentication Verification captures the verification workflow inside authentication. It spans 2 workspaces. Key flows include Credential validation, Auth login, Auth login.
- [Order Management Verification](../../../../features/order-verify.md) - Order Management Verification captures the verification workflow inside order management. It spans 2 workspaces. Key flows include Credential validation, Auth login, Auth login.

## AI Summary

The VerifyOtpScreen function renders a screen with OTP verification options.

### Responsibilities

- return
- centerContent

### Usage Notes

- this function is called when OTP verification is requested

## Public API

- `function VerifyOtpScreen()`

## Symbols

### function `VerifyOtpScreen`

- Signature: `function VerifyOtpScreen()`
- Lines: 17-42
- Exported: yes

```tsx
function VerifyOtpScreen() {
  const { email: emailParam } = useLocalSearchParams<{ email: string }>();
  const { hydrated } = useSession();
  const emailToVerify = emailParam ?? "";

  if (!hydrated) {
    return (
      <AuthGridScreenShell centerContent>
        <View style={styles.loadingWrap}>
          <EmplusLottie
            source={lottieInventory.loader}
            style={verifyOtpLottieLoader}
            loop
          />
        </View>
      </AuthGridScreenShell>
    );
  }

  return (
    <AuthGridScreenShell centerContent>
      <VerifyOtpHeroSection email={emailToVerify} />
      <VerifyOtpForm email={emailToVerify} />
    </AuthGridScreenShell>
  );
}
```
