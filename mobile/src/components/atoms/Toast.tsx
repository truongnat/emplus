import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  ReactNode,
} from "react";
import {
  AccessibilityInfo,
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Animated, {
  Easing,
  Layout,
  SlideInDown,
  SlideInUp,
  SlideOutDown,
  SlideOutUp,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { scheduleOnRN } from "react-native-worklets";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useThemeColors } from "@/src/theme";
import type { SemanticColors } from "@/src/theme/tokens/semantic";

/** Đồng bộ với màn Care — lề ngang + khoảng phía trên custom tab bar */
export const TOAST_HORIZONTAL_PAD = 24;
export const TOAST_TAB_BAR_OFFSET = 92;
export const TOAST_DEFAULT_DURATION_MS = 3200;

// ─── Types ────────────────────────────────────────────────────────────────────

export type ToastVariant = "info" | "success" | "error" | "warning" | "loading";
export type ToastPosition = "top" | "bottom";

export interface ToastAction {
  label: string;
  onPress: () => void;
  autoInvokeAfterMs?: number;
}

export interface ToastConfig {
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

type ToastItem = Required<
  Pick<ToastConfig, "id" | "message" | "variant" | "duration" | "position">
> &
  Omit<ToastConfig, "id" | "message" | "variant" | "duration" | "position"> & {
    createdAt: number;
  };

// ─── Global store ─────────────────────────────────────────────────────────────

type Listener = (toasts: ToastItem[]) => void;

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

const store = new ToastStore();

export const toast = {
  show: (config: ToastConfig) => store.add(config),
  success: (message: string, opts?: Omit<ToastConfig, "message" | "variant">) =>
    store.add({ ...opts, message, variant: "success" }),
  error: (message: string, opts?: Omit<ToastConfig, "message" | "variant">) =>
    store.add({ ...opts, message, variant: "error", duration: 5000 }),
  warning: (message: string, opts?: Omit<ToastConfig, "message" | "variant">) =>
    store.add({ ...opts, message, variant: "warning" }),
  info: (message: string, opts?: Omit<ToastConfig, "message" | "variant">) =>
    store.add({ ...opts, message, variant: "info" }),
  dismiss: (id: string) => store.remove(id),
  clear: () => store.clear(),

  promise: <T,>(
    promise: Promise<T>,
    messages: {
      loading: string;
      success: string | ((data: T) => string);
      error: string | ((err: unknown) => string);
    },
    opts?: Omit<ToastConfig, "message" | "variant">,
  ): Promise<T> => {
    const id = store.add({
      ...opts,
      message: messages.loading,
      variant: "loading",
      duration: 0,
    });
    return promise.then(
      (data) => {
        const msg =
          typeof messages.success === "function"
            ? messages.success(data)
            : messages.success;
        store.update(id, {
          message: msg,
          variant: "success",
          duration: TOAST_DEFAULT_DURATION_MS,
        });
        return data;
      },
      (err) => {
        const msg =
          typeof messages.error === "function"
            ? messages.error(err)
            : messages.error;
        store.update(id, { message: msg, variant: "error", duration: 5000 });
        throw err;
      },
    );
  },
};

// ─── Single Toast Item ────────────────────────────────────────────────────────

const SWIPE_DISMISS_THRESHOLD = 80;

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

// ─── ToastContainer ──────────────────────────────────────────────────────────

export function ToastContainer({ maxVisible = 3 }: { maxVisible?: number }) {
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

const styles = StyleSheet.create({
  regionTop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10000,
    elevation: 100,
    gap: 10,
  },
  regionBottom: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 10000,
    elevation: 100,
    flexDirection: "column-reverse",
    gap: 10,
  },
  toastContainer: {
    alignSelf: "stretch",
    width: "100%",
    borderRadius: 20,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 10,
  },
  toastPressable: {
    width: "100%",
  },
  toastContent: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    gap: 12,
  },
  iconContainer: {
    width: 28,
    height: 28,
    alignItems: "center",
    justifyContent: "center",
  },
  textContainer: { flex: 1, minWidth: 0, gap: 4 },
  messageText: { fontSize: 14, fontWeight: "700", lineHeight: 20 },
  descriptionText: { fontSize: 12, lineHeight: 18, fontWeight: "600" },
});
