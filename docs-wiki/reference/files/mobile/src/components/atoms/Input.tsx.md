---
title: "mobile/src/components/atoms/Input.tsx"
description: "Input component properties"
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
  page: "reference/files/mobile/src/components/atoms/Input.tsx.md"
  relativePath: "mobile/src/components/atoms/Input.tsx"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/mobile/src/components/atoms/Input.tsx"
  module: "mobile/src/components/atoms"
  workspace: "mobile"
  language: "TypeScript"
  symbolCount: 2
---

# mobile/src/components/atoms/Input.tsx

- Overview: [emplus Docs Wiki](../../../../../../index.md)
- Summary: [SUMMARY](../../../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../../../features/index.md)
- Module: [mobile/src/components/atoms](../../../../../modules/mobile/src/components/atoms.md)
- Workspace: [@emplus/mobile](../../../../../../workspaces/mobile.md)

## Snapshot

- Language: TypeScript
- Source path: `/Users/truongdq/tx/GitHub/emplus/mobile/src/components/atoms/Input.tsx`
- Lines: 316
- Symbols: 2

## Related Features

- [Authentication Login](../../../../../../features/auth-login.md) - Authentication Login captures the login workflow inside authentication. It spans 2 workspaces. Key flows include Auth login, Auth registration, Auth login.
- [User Management Login](../../../../../../features/user-login.md) - User Management Login captures the login workflow inside user management. It spans 2 workspaces. Key flows include Auth login, Auth registration, Auth login.
- [Search Login](../../../../../../features/search-login.md) - Search Login captures the login workflow inside search. It spans 2 workspaces. Key flows include Auth login, Auth registration, Auth login.

## AI Summary

Input component properties

### Responsibilities

- InputSize

### Usage Notes

- InputProps

## Public API

- `type InputSize = EmplusInputSize;`
- `InputProps`

```tsx
type InputProps = Omit<TextInputProps, "onChange"> & { label?: string; error?: string; helperText?: string; /** Kích thước chiều cao field. */ size?: InputSize; leftElement?: ReactNode; rightElement?: ReactNode; /** Alias cùng RNUI cũ. */ leadingElement?: ReactNode; trailingElement?: ReactNode; containerStyle?: ViewStyle; /** Gọi khi user gõ lần đầu sau khi có lỗi (xoá trạng thái lỗi API). */ onClearError?: () => void; /** RHF / RNUI: field.onChange nhận chuỗi — map sang onChangeText. */ onChange?: (text: string) => void; /** Mặc định viền mảnh; soft = nền filled, không viền đến khi focus (form auth hiện đại). */ variant?: "default" | "soft"; /** Ghi đè màu label (vd. màn login Figma #2C3E50). */ labelColor?: string; /** Ghi đè nền/viền idle cho variant soft (vd. rgba + viền mảnh). */ softSurface?: { backgroundColor: string; borderColor?: string; }; /** Bo góc ô nhập (mặc định `emplusInputRadiusPx`). */ inputRadiusPx?: number; };
```


## Symbols

### type `InputSize`

- Signature: `type InputSize = EmplusInputSize;`
- Lines: 33-33
- Exported: yes

```tsx
type InputSize = EmplusInputSize;
```

### type `InputProps`

- Signature:

```tsx
type InputProps = Omit<TextInputProps, "onChange"> & { label?: string; error?: string; helperText?: string; /** Kích thước chiều cao field. */ size?: InputSize; leftElement?: ReactNode; rightElement?: ReactNode; /** Alias cùng RNUI cũ. */ leadingElement?: ReactNode; trailingElement?: ReactNode; containerStyle?: ViewStyle; /** Gọi khi user gõ lần đầu sau khi có lỗi (xoá trạng thái lỗi API). */ onClearError?: () => void; /** RHF / RNUI: field.onChange nhận chuỗi — map sang onChangeText. */ onChange?: (text: string) => void; /** Mặc định viền mảnh; soft = nền filled, không viền đến khi focus (form auth hiện đại). */ variant?: "default" | "soft"; /** Ghi đè màu label (vd. màn login Figma #2C3E50). */ labelColor?: string; /** Ghi đè nền/viền idle cho variant soft (vd. rgba + viền mảnh). */ softSurface?: { backgroundColor: string; borderColor?: string; }; /** Bo góc ô nhập (mặc định `emplusInputRadiusPx`). */ inputRadiusPx?: number; };
```
- Lines: 35-62
- Exported: yes

```tsx
type InputProps = Omit<TextInputProps, "onChange"> & {
  label?: string;
  error?: string;
  helperText?: string;
  /** Kích thước chiều cao field. */
  size?: InputSize;
  leftElement?: ReactNode;
  rightElement?: ReactNode;
  /** Alias cùng RNUI cũ. */
  leadingElement?: ReactNode;
  trailingElement?: ReactNode;
  containerStyle?: ViewStyle;
  /** Gọi khi user gõ lần đầu sau khi có lỗi (xoá trạng thái lỗi API). */
  onClearError?: () => void;
  /** RHF / RNUI: field.onChange nhận chuỗi — map sang onChangeText. */
  onChange?: (text: string) => void;
  /** Mặc định viền mảnh; soft = nền filled, không viền đến khi focus (form auth hiện đại). */
  variant?: "default" | "soft";
  /** Ghi đè màu label (vd. màn login Figma #2C3E50). */
  labelColor?: string;
  /** Ghi đè nền/viền idle cho variant soft (vd. rgba + viền mảnh). */
  softSurface?: {
    backgroundColor: string;
    borderColor?: string;
  };
  /** Bo góc ô nhập (mặc định `emplusInputRadiusPx`). */
  inputRadiusPx?: number;
};
```
