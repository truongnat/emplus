---
title: "mobile/src/features/auth/components/RegisterTopBar.tsx"
description: "The RegisterTopBar component renders a top navigation bar with options for back pressing, branding, and accessibility settings."
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
  page: "reference/files/mobile/src/features/auth/components/RegisterTopBar.tsx.md"
  relativePath: "mobile/src/features/auth/components/RegisterTopBar.tsx"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/mobile/src/features/auth/components/RegisterTopBar.tsx"
  module: "mobile/src/features/auth/components"
  workspace: "mobile"
  language: "TypeScript"
  symbolCount: 2
---

# mobile/src/features/auth/components/RegisterTopBar.tsx

- Overview: [emplus Docs Wiki](../../../../../../../index.md)
- Summary: [SUMMARY](../../../../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../../../../features/index.md)
- Module: [mobile/src/features/auth/components](../../../../../../modules/mobile/src/features/auth/components.md)
- Workspace: [@emplus/mobile](../../../../../../../workspaces/mobile.md)

## Snapshot

- Language: TypeScript
- Source path: `/Users/truongdq/tx/GitHub/emplus/mobile/src/features/auth/components/RegisterTopBar.tsx`
- Lines: 76
- Symbols: 2

## Related Features

- [Authentication Login](../../../../../../../features/auth-login.md) - Authentication Login captures the login workflow inside authentication. It spans 2 workspaces. Key flows include Auth login, Auth registration, Auth login.
- [User Management Login](../../../../../../../features/user-login.md) - User Management Login captures the login workflow inside user management. It spans 2 workspaces. Key flows include Auth login, Auth registration, Auth login.
- [Authentication Password Reset](../../../../../../../features/auth-reset.md) - Authentication Password Reset captures the password reset workflow inside authentication. It spans 3 workspaces. Key flows include Password reset, Password reset, Password reset.

## AI Summary

The RegisterTopBar component renders a top navigation bar with options for back pressing, branding, and accessibility settings.

### Responsibilities

- Render the back button and branding section

## Public API

- `RegisterTopBarProps`

```tsx
type RegisterTopBarProps = { top: number; left: number; right: number; /** Thay cho `router.back()` (vd. pairing → đăng xuất và về login). */ onBackPress?: () => void; /** Mặc định true — register/forgot; pairing chỉ cần nút back. */ showBrand?: boolean; accessibilityLabel?: string; };
```

- `function RegisterTopBar({ top, left, right, onBackPress, showBrand = true, accessibilityLabel = "Quay lại", }: RegisterTopBarProps)`

## Symbols

### type `RegisterTopBarProps`

- Signature:

```tsx
type RegisterTopBarProps = { top: number; left: number; right: number; /** Thay cho `router.back()` (vd. pairing → đăng xuất và về login). */ onBackPress?: () => void; /** Mặc định true — register/forgot; pairing chỉ cần nút back. */ showBrand?: boolean; accessibilityLabel?: string; };
```
- Lines: 10-19
- Exported: yes

```tsx
type RegisterTopBarProps = {
  top: number;
  left: number;
  right: number;
  /** Thay cho `router.back()` (vd. pairing → đăng xuất và về login). */
  onBackPress?: () => void;
  /** Mặc định true — register/forgot; pairing chỉ cần nút back. */
  showBrand?: boolean;
  accessibilityLabel?: string;
};
```

### function `RegisterTopBar`

- Signature: `function RegisterTopBar({ top, left, right, onBackPress, showBrand = true, accessibilityLabel = "Quay lại", }: RegisterTopBarProps)`
- Lines: 21-75
- Exported: yes

```tsx
function RegisterTopBar({
  top,
  left,
  right,
  onBackPress,
  showBrand = true,
  accessibilityLabel = "Quay lại",
}: RegisterTopBarProps) {
  const router = useRouter();
  const { isDark } = useThemeMode();
  const colors = useThemeColors();

  const backSurface = useMemo(
    () =>
      isDark
        ? {
            backgroundColor: "rgba(255,255,255,0.08)",
            borderColor: "rgba(255,255,255,0.14)",
          }
        : {
            backgroundColor: "rgba(255,255,255,0.45)",
            borderColor: "rgba(255,255,255,0.5)",
          },
    [isDark],
  );

  return (
    <View
      style={[regStyles.topBar, { top, left, right }]}
      pointerEvents="box-none"
    >
      <TouchableOpacity
        onPress={() => (onBackPress ? onBackPress() : router.back())}
        style={[
          regStyles.backButton,
          backSurface,
        ]}
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel}
        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
      >
        <Ionicons
          name="arrow-back"
          size={21}
          color={colors.text.primary}
        />
      </TouchableOpacity>
      {showBrand ? (
        <View style={regStyles.brandBesideBack} pointerEvents="none">
          <LoginBrandGradientTitle />
        </View>
      ) : null}
    </View>
  );
}
```
