---
title: "mobile/src/components/atoms/Toast.tsx"
description: "Toast component implementation"
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
  page: "reference/files/mobile/src/components/atoms/Toast.tsx.md"
  relativePath: "mobile/src/components/atoms/Toast.tsx"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/mobile/src/components/atoms/Toast.tsx"
  module: "mobile/src/components/atoms"
  workspace: "mobile"
  language: "TypeScript"
  symbolCount: 16
---

# mobile/src/components/atoms/Toast.tsx

- Overview: [emplus Docs Wiki](../../../../../../index.md)
- Summary: [SUMMARY](../../../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../../../features/index.md)
- Module: [mobile/src/components/atoms](../../../../../modules/mobile/src/components/atoms.md)
- Workspace: [@emplus/mobile](../../../../../../workspaces/mobile.md)

## Snapshot

- Language: TypeScript
- Source path: `/Users/truongdq/tx/GitHub/emplus/mobile/src/components/atoms/Toast.tsx`
- Lines: 538
- Symbols: 16

## Related Features

- [Authentication Read / List](../../../../../../features/auth-list.md) - Authentication Read / List captures the read / list workflow inside authentication. It spans 3 workspaces.
- [Search Read / List](../../../../../../features/search-list.md) - Search Read / List captures the read / list workflow inside search. It spans 3 workspaces.
- [Notifications Read / List](../../../../../../features/notification-list.md) - Notifications Read / List captures the read / list workflow inside notifications. It spans 2 workspaces.
- [Integrations Read / List](../../../../../../features/integration-list.md) - Integrations Read / List captures the read / list workflow inside integrations. It spans 3 workspaces.
- [Notifications Notify](../../../../../../features/notification-notify.md) - Notifications Notify captures the notify workflow inside notifications. It spans 2 workspaces.
- [Search Notify](../../../../../../features/search-notify.md) - Search Notify captures the notify workflow inside search. It spans 2 workspaces.
- [Integrations Notify](../../../../../../features/integration-notify.md) - Integrations Notify captures the notify workflow inside integrations. It spans 2 workspaces.
- [Search Create](../../../../../../features/search-create.md) - Search Create captures the create workflow inside search. It spans 2 workspaces.

## AI Summary

Toast component implementation

## Public API

- `type ToastVariant = "info" | "success" | "error" | "warning" | "loading";`
- `type ToastPosition = "top" | "bottom";`
- `interface ToastAction`
- `interface ToastConfig`
- `function ToastContainer({ maxVisible = 3 }: { maxVisible?: number })`

## Symbols

### type `ToastVariant`

- Signature: `type ToastVariant = "info" | "success" | "error" | "warning" | "loading";`
- Lines: 42-42
- Exported: yes

```tsx
type ToastVariant = "info" | "success" | "error" | "warning" | "loading";
```

### type `ToastPosition`

- Signature: `type ToastPosition = "top" | "bottom";`
- Lines: 43-43
- Exported: yes

```tsx
type ToastPosition = "top" | "bottom";
```

### interface `ToastAction`

- Signature: `interface ToastAction`
- Lines: 45-49
- Exported: yes

```tsx
interface ToastAction {
  label: string;
  onPress: () => void;
  autoInvokeAfterMs?: number;
}
```

### interface `ToastConfig`

- Signature: `interface ToastConfig`
- Lines: 51-62
- Exported: yes

```tsx
interface ToastConfig {
  id?: string;
  message: string;
  description?: string;
  variant?: ToastVariant;
  duration?: number;
  position?: ToastPosition;
  action?: ToastAction;
  icon?: ReactNode;
  onDismiss?: () => void;
  replace?: boolean;
}
```

### function `ToastContainer`

- Signature: `function ToastContainer({ maxVisible = 3 }: { maxVisible?: number })`
- Lines: 433-488
- Exported: yes

```tsx
function ToastContainer({ maxVisible = 3 }: { maxVisible?: number }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    const unsub = store.subscribe(setToasts);
    return () => {
      unsub();
    };
  }, []);

  const topToasts = toasts
    .filter((t) => t.position === "top")
    .slice(-maxVisible);

  const bottomToasts = toasts
    .filter((t) => t.position === "bottom")
    .slice(-maxVisible);

  return (
    <>
      <View
        style={[
          styles.regionTop,
          {
            paddingTop: insets.top + 8,
            paddingLeft: TOAST_HORIZONTAL_PAD + insets.left,
            paddingRight: TOAST_HORIZONTAL_PAD + insets.right,
          },
        ]}
        pointerEvents="box-none"
        collapsable={false}
      >
        {topToasts.map((item) => (
          <ToastItemView key={item.id} item={item} position="top" />
        ))}
      </View>
      <View
        style={[
          styles.regionBottom,
          {
            paddingBottom: insets.bottom + TOAST_TAB_BAR_OFFSET,
            paddingLeft: TOAST_HORIZONTAL_PAD + insets.left,
            paddingRight: TOAST_HORIZONTAL_PAD + insets.right,
          },
        ]}
        pointerEvents="box-none"
        collapsable={false}
      >
        {bottomToasts.map((item) => (
          <ToastItemView key={item.id} item={item} position="bottom" />
        ))}
      </View>
    </>
  );
}
```

### type `ToastItem`

- Signature:

```tsx
type ToastItem = Required< Pick<ToastConfig, "id" | "message" | "variant" | "duration" | "position"> > & Omit<ToastConfig, "id" | "message" | "variant" | "duration" | "position"> & { createdAt: number; };
```
- Lines: 64-69
- Exported: no

```tsx
type ToastItem = Required<
  Pick<ToastConfig, "id" | "message" | "variant" | "duration" | "position">
> &
  Omit<ToastConfig, "id" | "message" | "variant" | "duration" | "position"> & {
    createdAt: number;
  };
```

### type `Listener`

- Signature: `type Listener = (toasts: ToastItem[]) => void;`
- Lines: 73-73
- Exported: no

```tsx
type Listener = (toasts: ToastItem[]) => void;
```

### class `ToastStore`

- Signature: `class ToastStore`
- Lines: 75-141
- Exported: no

```tsx
class ToastStore {
  private toasts: ToastItem[] = [];
  private listeners = new Set<Listener>();
  private counter = 0;

  subscribe(fn: Listener) {
    this.listeners.add(fn);
    fn([...this.toasts]);
    return () => this.listeners.delete(fn);
  }

  private notify() {
    this.listeners.forEach((fn) => {
      fn([...this.toasts]);
    });
  }

  add(config: ToastConfig): string {
    const id = config.id ?? `toast-${++this.counter}`;

    const item: ToastItem = {
      id,
      message: config.message,
      description: config.description,
      variant: config.variant ?? "info",
      duration: config.duration ?? TOAST_DEFAULT_DURATION_MS,
      position: config.position ?? "bottom",
      action: config.action,
      icon: config.icon,
      onDismiss: config.onDismiss,
      replace: config.replace ?? false,
      createdAt: Date.now(),
    };

    if (config.replace && config.id) {
      const existingIdx = this.toasts.findIndex((t) => t.id === id);
      if (existingIdx !== -1) {
        this.toasts[existingIdx] = item;
        this.notify();
        return id;
      }
    }

    this.toasts.push(item);
    this.notify();
    return id;
  }

  remove(id: string) {
    const toast = this.toasts.find((t) => t.id === id);
    this.toasts = this.toasts.filter((t) => t.id !== id);
    toast?.onDismiss?.();
    this.notify();
  }

  update(id: string, patch: Partial<ToastConfig>) {
    this.toasts = this.toasts.map((t) =>
      t.id === id ? ({ ...t, ...patch, id } as ToastItem) : t,
    );
    this.notify();
  }

  clear() {
    this.toasts = [];
    this.notify();
  }
}
```

### method `subscribe`

- Signature: `subscribe(fn: Listener)`
- Lines: 80-84
- Exported: no

```tsx
subscribe(fn: Listener) {
    this.listeners.add(fn);
    fn([...this.toasts]);
    return () => this.listeners.delete(fn);
  }
```

### method `notify`

- Signature: `private notify()`
- Lines: 86-90
- Exported: no

```tsx
private notify() {
    this.listeners.forEach((fn) => {
      fn([...this.toasts]);
    });
  }
```

### method `add`

- Signature: `add(config: ToastConfig): string`
- Lines: 92-121
- Exported: no

```tsx
add(config: ToastConfig): string {
    const id = config.id ?? `toast-${++this.counter}`;

    const item: ToastItem = {
      id,
      message: config.message,
      description: config.description,
      variant: config.variant ?? "info",
      duration: config.duration ?? TOAST_DEFAULT_DURATION_MS,
      position: config.position ?? "bottom",
      action: config.action,
      icon: config.icon,
      onDismiss: config.onDismiss,
      replace: config.replace ?? false,
      createdAt: Date.now(),
    };

    if (config.replace && config.id) {
      const existingIdx = this.toasts.findIndex((t) => t.id === id);
      if (existingIdx !== -1) {
        this.toasts[existingIdx] = item;
        this.notify();
        return id;
      }
    }

    this.toasts.push(item);
    this.notify();
    return id;
  }
```

### method `remove`

- Signature: `remove(id: string)`
- Lines: 123-128
- Exported: no

```tsx
remove(id: string) {
    const toast = this.toasts.find((t) => t.id === id);
    this.toasts = this.toasts.filter((t) => t.id !== id);
    toast?.onDismiss?.();
    this.notify();
  }
```

### method `update`

- Signature: `update(id: string, patch: Partial<ToastConfig>)`
- Lines: 130-135
- Exported: no

```tsx
update(id: string, patch: Partial<ToastConfig>) {
    this.toasts = this.toasts.map((t) =>
      t.id === id ? ({ ...t, ...patch, id } as ToastItem) : t,
    );
    this.notify();
  }
```

### method `clear`

- Signature: `clear()`
- Lines: 137-140
- Exported: no

```tsx
clear() {
    this.toasts = [];
    this.notify();
  }
```

### function `ToastItemView`

- Signature: `function ToastItemView({ item, position, }: { item: ToastItem; position: ToastPosition; })`
- Lines: 202-368
- Exported: no

```tsx
function ToastItemView({
  item,
  position,
}: {
  item: ToastItem;
  position: ToastPosition;
}) {
  const colors = useThemeColors();
  const look = useMemo(() => getVariantLook(item.variant, colors), [item.variant, colors]);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const opacity = useSharedValue(1);

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pausedAt = useRef<number | null>(null);
  const remaining = useRef<number>(item.duration);
  const isPersistent = useMemo(() => item.duration === 0, [item.duration]);

  useEffect(() => {
    remaining.current = item.duration;
  }, [item.duration]);

  const startTimer = useCallback(() => {
    if (isPersistent || remaining.current <= 0) return;
    timerRef.current = setTimeout(() => {
      store.remove(item.id);
    }, remaining.current);
  }, [item.id, isPersistent]);

  const pauseTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      pausedAt.current = Date.now();
    }
  }, []);

  const resumeTimer = useCallback(() => {
    if (pausedAt.current !== null) {
      remaining.current -= Date.now() - pausedAt.current;
      pausedAt.current = null;
      startTimer();
    }
  }, [startTimer]);

  useEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [startTimer]);

  useEffect(() => {
    AccessibilityInfo.announceForAccessibility(
      `${item.variant}: ${item.message}${item.description ? ". " + item.description : ""}`,
    );
  }, [item.variant, item.message, item.description]);

  const panGesture = Gesture.Pan()
    .onStart(() => {
      scheduleOnRN(pauseTimer);
    })
    .onUpdate((e) => {
      translateX.value = e.translationX;
      translateY.value = e.translationY * 0.3;
    })
    .onEnd((e) => {
      const absX = Math.abs(e.translationX);
      const velX = Math.abs(e.velocityX);

      if (absX > SWIPE_DISMISS_THRESHOLD || velX > 600) {
        const dir = e.translationX > 0 ? 1 : -1;
        translateX.value = withTiming(dir * 500, { duration: 200 });
        opacity.value = withTiming(0, { duration: 180 }, () => {
          scheduleOnRN(toast.dismiss, item.id);
        });
      } else {
        translateX.value = withTiming(0, {
          duration: 300,
          easing: Easing.out(Easing.back(2)),
        });
        translateY.value = withTiming(0, { duration: 300 });
        scheduleOnRN(resumeTimer);
      }
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { rotate: `${translateX.value * 0.02}deg` },
    ],
    opacity: opacity.value,
  }));

  const entering =
    position === "top"
      ? SlideInUp.duration(350).easing(Easing.out(Easing.back(1.5)))
      : SlideInDown.duration(350).easing(Easing.out(Easing.back(1.5)));

  const exiting =
    position === "top" ? SlideOutUp.duration(280) : SlideOutDown.duration(280);

  return (
    <Animated.View
      entering={entering}
      exiting={exiting}
      layout={Layout.springify().damping(20).stiffness(300)}
    >
      <GestureDetector gesture={panGesture}>
        <Animated.View
          style={[
            styles.toastContainer,
            {
              backgroundColor: look.backgroundColor,
              borderWidth: look.borderWidth,
              borderColor: look.borderColor,
              shadowColor: colors.text.primary,
            },
            animatedStyle,
          ]}
          accessibilityRole="alert"
        >
          <Pressable
            onPress={() => store.remove(item.id)}
            accessibilityRole="button"
            accessibilityLabel="Đóng thông báo"
            style={styles.toastPressable}
          >
            <View style={styles.toastContent}>
              <View style={styles.iconContainer}>
                {item.icon ??
                  (item.variant === "loading" ? (
                    <ActivityIndicator color={look.iconColor} size="small" />
                  ) : look.iconName ? (
                    <Ionicons
                      name={look.iconName}
                      size={22}
                      color={look.iconColor}
                    />
                  ) : null)}
              </View>

              <View style={styles.textContainer}>
                <Text style={[styles.messageText, { color: look.textColor }]}>
                  {item.message}
                </Text>
                {item.description ? (
                  <Text
                    style={[
                      styles.descriptionText,
                      {
                        color: look.textColor,
                        opacity: 0.88,
                      },
                    ]}
                  >
                    {item.description}
                  </Text>
                ) : null}
              </View>
            </View>
          </Pressable>
        </Animated.View>
      </GestureDetector>
    </Animated.View>
  );
}
```

### function `getVariantLook`

- Signature:

```tsx
function getVariantLook( variant: ToastVariant, c: SemanticColors, ): { backgroundColor: string; borderWidth: number; borderColor: string; textColor: string; iconColor: string; iconName: keyof typeof Ionicons.glyphMap | null; }
```
- Lines: 370-429
- Exported: no

```tsx
function getVariantLook(
  variant: ToastVariant,
  c: SemanticColors,
): {
  backgroundColor: string;
  borderWidth: number;
  borderColor: string;
  textColor: string;
  iconColor: string;
  iconName: keyof typeof Ionicons.glyphMap | null;
} {
  switch (variant) {
    case "success":
      return {
        backgroundColor: c.background.inverse,
        borderWidth: 0,
        borderColor: "transparent",
        textColor: c.text.inverse,
        iconColor: c.status.success.icon,
        iconName: "checkmark-circle",
      };
    case "error":
      return {
        backgroundColor: c.status.error.bg,
        borderWidth: 1,
        borderColor: c.status.error.border,
        textColor: c.status.error.text,
        iconColor: c.status.error.icon,
        iconName: "alert-circle",
      };
    case "warning":
      return {
        backgroundColor: c.status.warning.bg,
        borderWidth: 1,
        borderColor: c.status.warning.border,
        textColor: c.status.warning.text,
        iconColor: c.status.warning.icon,
        iconName: "warning",
      };
    case "loading":
      return {
        backgroundColor: c.background.inverse,
        borderWidth: 0,
        borderColor: "transparent",
        textColor: c.text.inverse,
        iconColor: c.text.inverse,
        iconName: null,
      };
    case "info":
    default:
      return {
        backgroundColor: c.background.inverse,
        borderWidth: 0,
        borderColor: "transparent",
        textColor: c.text.inverse,
        iconColor: c.status.info.icon,
        iconName: "information-circle",
      };
  }
}
```
