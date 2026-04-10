---
title: "mobile/src/alert-dialog-context.tsx"
description: "AlertDialogProvider is a React component that provides the AlertDialogContextValue function and DialogState type."
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
  page: "reference/files/mobile/src/alert-dialog-context.tsx.md"
  relativePath: "mobile/src/alert-dialog-context.tsx"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/mobile/src/alert-dialog-context.tsx"
  module: "mobile/src"
  workspace: "mobile"
  language: "TypeScript"
  symbolCount: 5
---

# mobile/src/alert-dialog-context.tsx

- Overview: [emplus Docs Wiki](../../../../index.md)
- Summary: [SUMMARY](../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../features/index.md)
- Module: [mobile/src](../../../modules/mobile/src.md)
- Workspace: [@emplus/mobile](../../../../workspaces/mobile.md)

## Snapshot

- Language: TypeScript
- Source path: `/Users/truongdq/tx/GitHub/emplus/mobile/src/alert-dialog-context.tsx`
- Lines: 182
- Symbols: 5

## Related Features

- [Notifications Notify](../../../../features/notification-notify.md) - Notifications Notify captures the notify workflow inside notifications. It spans 2 workspaces.
- [Integrations Notify](../../../../features/integration-notify.md) - Integrations Notify captures the notify workflow inside integrations. It spans 2 workspaces.

## AI Summary

AlertDialogProvider is a React component that provides the AlertDialogContextValue function and DialogState type.

### Responsibilities

- The useAlertDialog() hook returns the AlertDialogProvider instance.
- The AlertDialogProvider instance can be used within an AlertDialogComponent to access the confirm, cancelLabel, title, message, confirmLabel, and destructive properties.

### Usage Notes

- To use AlertDialogProvider, import it from the React portal in your AlertDialogComponent:

## Public API

- `type ConfirmOptions = { title: string; message?: string; /** Default: "Hủy" */ cancelLabel?: string; confirmLabel: string; destructive?: boolean; };`
- `function AlertDialogProvider({ children }: { children: ReactNode })`
- `function useAlertDialog()`

## Symbols

### type `ConfirmOptions`

- Signature: `type ConfirmOptions = { title: string; message?: string; /** Default: "Hủy" */ cancelLabel?: string; confirmLabel: string; destructive?: boolean; };`
- Lines: 26-33
- Exported: yes

```tsx
type ConfirmOptions = {
  title: string;
  message?: string;
  /** Default: "Hủy" */
  cancelLabel?: string;
  confirmLabel: string;
  destructive?: boolean;
};
```

### function `AlertDialogProvider`

- Signature: `function AlertDialogProvider({ children }: { children: ReactNode })`
- Lines: 45-139
- Exported: yes

```tsx
function AlertDialogProvider({ children }: { children: ReactNode }) {
  const colors = useThemeColors();
  const insets = useSafeAreaInsets();
  const [state, setState] = useState<DialogState>({ visible: false });
  const resolveRef = useRef<((value: boolean) => void) | null>(null);

  const finish = useCallback((value: boolean) => {
    const resolve = resolveRef.current;
    resolveRef.current = null;
    setState({ visible: false });
    resolve?.(value);
  }, []);

  const confirm = useCallback((options: ConfirmOptions): Promise<boolean> => {
    return new Promise((resolve) => {
      resolveRef.current = resolve;
      setState({ visible: true, ...options });
    });
  }, []);

  const cancelLabel = state.visible ? state.cancelLabel ?? "Hủy" : "Hủy";
  const title = state.visible ? state.title : "";
  const message = state.visible ? state.message : undefined;
  const confirmLabel = state.visible ? state.confirmLabel : "";
  const destructive = state.visible ? state.destructive ?? false : false;

  const cardStyle = useMemo<ViewStyle>(
    () => ({
      backgroundColor: colors.surface.default,
      borderColor: colors.border.subtle,
    }),
    [colors.border.subtle, colors.surface.default],
  );

  const value = useMemo(() => ({ confirm }), [confirm]);

  return (
    <AlertDialogContext.Provider value={value}>
      {children}
      <Modal
        visible={state.visible}
        transparent
        animationType="fade"
        statusBarTranslucent
        onRequestClose={() => finish(false)}
        accessibilityViewIsModal
      >
        <View
          style={[styles.root, { paddingBottom: Math.max(insets.bottom, 24) }]}
          pointerEvents="box-none"
        >
          <Pressable
            style={[styles.backdrop, { backgroundColor: colors.scrim }]}
            onPress={() => finish(false)}
            accessibilityRole="button"
            accessibilityLabel="Đóng hộp thoại"
          />
          <View style={[styles.card, cardStyle]} accessibilityRole="none">
            <AppText variant="h3" style={{ color: colors.text.primary }}>
              {title}
            </AppText>
            {message ? (
              <AppText
                variant="body"
                style={[styles.message, { color: colors.text.secondary }]}
              >
                {message}
              </AppText>
            ) : null}
            <View style={styles.actions}>
              <View style={styles.actionGrow}>
                <Button
                  variant="neutralOutline"
                  label={cancelLabel}
                  onPress={() => finish(false)}
                  fullWidth
                  accessibilityLabel={cancelLabel}
                />
              </View>
              <View style={styles.actionGrow}>
                <Button
                  variant={destructive ? "danger" : "primary"}
                  label={confirmLabel}
                  onPress={() => finish(true)}
                  fullWidth
                  accessibilityLabel={confirmLabel}
                />
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </AlertDialogContext.Provider>
  );
}
```

### function `useAlertDialog`

- Signature: `function useAlertDialog()`
- Lines: 141-147
- Exported: yes

```tsx
function useAlertDialog() {
  const ctx = useContext(AlertDialogContext);
  if (!ctx) {
    throw new Error("useAlertDialog must be used within AlertDialogProvider");
  }
  return ctx;
}
```

### type `AlertDialogContextValue`

- Signature: `type AlertDialogContextValue = { confirm: (options: ConfirmOptions) => Promise<boolean>; };`
- Lines: 35-37
- Exported: no

```tsx
type AlertDialogContextValue = {
  confirm: (options: ConfirmOptions) => Promise<boolean>;
};
```

### type `DialogState`

- Signature: `type DialogState = (ConfirmOptions & { visible: true }) | { visible: false };`
- Lines: 43-43
- Exported: no

```tsx
type DialogState = (ConfirmOptions & { visible: true }) | { visible: false };
```
