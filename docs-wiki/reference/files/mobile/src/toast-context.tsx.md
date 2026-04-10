---
title: "mobile/src/toast-context.tsx"
description: "The ToastProvider component makes the showToast function available for use in child components."
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
  page: "reference/files/mobile/src/toast-context.tsx.md"
  relativePath: "mobile/src/toast-context.tsx"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/mobile/src/toast-context.tsx"
  module: "mobile/src"
  workspace: "mobile"
  language: "TypeScript"
  symbolCount: 4
---

# mobile/src/toast-context.tsx

- Overview: [emplus Docs Wiki](../../../../index.md)
- Summary: [SUMMARY](../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../features/index.md)
- Module: [mobile/src](../../../modules/mobile/src.md)
- Workspace: [@emplus/mobile](../../../../workspaces/mobile.md)

## Snapshot

- Language: TypeScript
- Source path: `/Users/truongdq/tx/GitHub/emplus/mobile/src/toast-context.tsx`
- Lines: 69
- Symbols: 4

## Related Features

- [Notifications Notify](../../../../features/notification-notify.md) - Notifications Notify captures the notify workflow inside notifications. It spans 2 workspaces.
- [Search Notify](../../../../features/search-notify.md) - Search Notify captures the notify workflow inside search. It spans 2 workspaces.
- [Integrations Notify](../../../../features/integration-notify.md) - Integrations Notify captures the notify workflow inside integrations. It spans 2 workspaces.

## AI Summary

The ToastProvider component makes the showToast function available for use in child components.

### Usage Notes

- Must be used within a ToastProvider component.

## Public API

- `function ToastProvider({ children }: { children: ReactNode })`
- `function useToast()`

## Symbols

### function `ToastProvider`

- Signature: `function ToastProvider({ children }: { children: ReactNode })`
- Lines: 30-57
- Exported: yes

```tsx
function ToastProvider({ children }: { children: ReactNode }) {
  const showToast = useCallback(
    (
      message: string,
      variant: ToastVariant = "info",
      duration: number = TOAST_DEFAULT_DURATION_MS,
    ) => {
      if (!message || message.trim() === "") {
        return;
      }

      toastImpl.show({
        message,
        variant,
        duration,
        position: "bottom",
      });
    },
    [],
  );

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <ToastContainer maxVisible={3} />
    </ToastContext.Provider>
  );
}
```

### function `useToast`

- Signature: `function useToast()`
- Lines: 59-65
- Exported: yes

```tsx
function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within ToastProvider");
  }
  return context;
}
```

### type `ToastVariant`

- Signature: `type ToastVariant = "success" | "error" | "warning" | "info";`
- Lines: 18-18
- Exported: no

```tsx
type ToastVariant = "success" | "error" | "warning" | "info";
```

### interface `ToastContextType`

- Signature: `interface ToastContextType`
- Lines: 20-26
- Exported: no

```tsx
interface ToastContextType {
  showToast: (
    message: string,
    variant?: ToastVariant,
    duration?: number,
  ) => void;
}
```
