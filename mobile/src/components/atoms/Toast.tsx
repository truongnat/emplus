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
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
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
  runOnJS,
  SharedValue,
} from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme, Theme } from "../../theme";

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
    console.log("🍞 Store NOTIFY:", this.listeners.size, "listeners");
    this.listeners.forEach((fn) => {
      console.log("🍞 Store NOTIFY listener:", fn.name);
      fn([...this.toasts]);
    });
  }

  add(config: ToastConfig): string {
    const id = config.id ?? `toast-${++this.counter}`;
    console.log("🍞 Store ADD:", {
      id,
      message: config.message,
      position: config.position,
      duration: config.duration,
    });

    const item: ToastItem = {
      id,
      message: config.message,
      description: config.description,
      variant: config.variant ?? "info",
      duration: config.duration ?? 3500,
      position: config.position ?? "top",
      action: config.action,
      icon: config.icon,
      onDismiss: config.onDismiss,
      replace: config.replace ?? false,
      createdAt: Date.now(),
    };

    console.log("🍞 Store ITEM created:", {
      id: item.id,
      duration: item.duration,
      position: item.position,
    });

    if (config.replace && config.id) {
      const existingIdx = this.toasts.findIndex((t) => t.id === id);
      if (existingIdx !== -1) {
        this.toasts[existingIdx] = item;
        console.log("🍞 Store REPLACE:", id);
        this.notify();
        return id;
      }
    }

    this.toasts.push(item);
    console.log("🍞 Store PUSH:", id, "total:", this.toasts.length);
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
        store.update(id, { message: msg, variant: "success", duration: 3000 });
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
  theme,
}: {
  item: ToastItem;
  position: ToastPosition;
  theme: Theme;
}) {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const opacity = useSharedValue(1);

  // Create refs only once using useMemo
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pausedAt = useRef<number | null>(null);
  const remaining = useRef<number>(item.duration);
  const isPersistent = useMemo(() => item.duration === 0, [item.duration]);

  // Initialize remaining only once
  useEffect(() => {
    remaining.current = item.duration;
    console.log("🍞 ToastItemView INIT remaining:", remaining.current);
  }, [item.duration]);

  console.log("🍞 ToastItemView INIT:", {
    id: item.id,
    duration: item.duration,
    isPersistent,
    remaining: remaining.current,
  });

  const startTimer = useCallback(() => {
    console.log("🍞 ToastItemView startTimer:", {
      id: item.id,
      isPersistent,
      remaining: remaining.current,
      shouldSkip: isPersistent || remaining.current <= 0,
    });

    if (isPersistent || remaining.current <= 0) return;
    timerRef.current = setTimeout(() => {
      console.log("🍞 ToastItemView TIMEOUT:", item.id);
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
    console.log("🍞 ToastItemView useEffect START");
    startTimer();
    return () => {
      console.log("🍞 ToastItemView useEffect CLEANUP");
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
      runOnJS(pauseTimer)();
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
          runOnJS(store.remove.bind(store))(item.id);
        });
      } else {
        translateX.value = withTiming(0, {
          duration: 300,
          easing: Easing.out(Easing.back(2)),
        });
        translateY.value = withTiming(0, { duration: 300 });
        runOnJS(resumeTimer)();
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

  const enterAnimation = useMemo(() => {
    return SlideInDown.duration(300).springify().damping(15).stiffness(300);
  }, []);

  const exitAnimation = useMemo(() => {
    return SlideOutDown.duration(250).easing(Easing.bezier(0.25, 0.1, 0.25, 1));
  }, []);

  const entering =
    position === "top"
      ? SlideInUp.duration(350).easing(Easing.out(Easing.back(1.5)))
      : SlideInDown.duration(350).easing(Easing.out(Easing.back(1.5)));

  const exiting =
    position === "top" ? SlideOutUp.duration(280) : SlideOutDown.duration(280);

  const variantStyle = getVariantStyle(item.variant, theme);

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
            { backgroundColor: variantStyle.bg },
            animatedStyle,
          ]}
          accessibilityRole="alert"
        >
          <View style={styles.toastContent}>
            <View style={[styles.iconContainer]}>
              {item.icon ?? (
                <Text
                  style={[styles.iconText, { color: variantStyle.textColor }]}
                >
                  {variantStyle.iconChar}
                </Text>
              )}
            </View>

            <View style={styles.textContainer}>
              <Text
                style={[styles.messageText, { color: variantStyle.textColor }]}
                numberOfLines={3}
              >
                {item.message}
              </Text>
              {item.description && (
                <Text
                  style={[
                    styles.descriptionText,
                    { color: variantStyle.textColor + "BB" },
                  ]}
                  numberOfLines={2}
                >
                  {item.description}
                </Text>
              )}
            </View>
          </View>
        </Animated.View>
      </GestureDetector>
    </Animated.View>
  );
}

function TimerBar({
  duration,
  color,
  paused,
}: {
  duration: number;
  color: string;
  paused: boolean;
}) {
  const width = useSharedValue(100);

  useEffect(() => {
    if (!paused) {
      width.value = withTiming(0, {
        duration,
        easing: Easing.linear,
      });
    }
  }, [duration, paused]);

  const barStyle = useAnimatedStyle(() => ({
    width: `${width.value}%`,
  }));

  return (
    <View style={styles.timerBarBg}>
      <Animated.View
        style={[styles.timerBar, { backgroundColor: color }, barStyle]}
      />
    </View>
  );
}

function getVariantStyle(variant: ToastVariant, theme: Theme) {
  switch (variant) {
    case "success":
      return {
        bg: "#30D158", // iOS green - solid, opaque
        textColor: "#FFFFFF",
        barColor: "#FFFFFF",
        iconChar: "✓",
      };
    case "error":
      return {
        bg: "#FF3B30", // iOS red - solid, opaque
        textColor: "#FFFFFF",
        barColor: "#FFFFFF",
        iconChar: "✕",
      };
    case "warning":
      return {
        bg: "#FF9500", // iOS orange - solid, opaque
        textColor: "#FFFFFF",
        barColor: "#FFFFFF",
        iconChar: "⚠",
      };
    case "info":
    default:
      return {
        bg: "#0A84FF", // iOS blue - solid, opaque
        textColor: "#FFFFFF",
        barColor: "#FFFFFF",
        iconChar: "ℹ",
      };
  }
}

// ─── ToastContainer ──────────────────────────────────────────────────────────

export function ToastContainer({ maxVisible = 3 }: { maxVisible?: number }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const insets = useSafeAreaInsets();
  const theme = useTheme();

  useEffect(() => {
    const unsub = store.subscribe(setToasts);
    console.log("🍞 ToastContainer: subscribed to store");
    return () => {
      console.log("🍞 ToastContainer: unsubscribed");
      unsub();
    };
  }, []);

  useEffect(() => {
    console.log("🍞 ToastContainer toasts changed:", toasts.length);
    toasts.forEach((t) => {
      console.log("  - Toast:", t.message, t.position);
    });
  }, [toasts]);

  // Default to top position if not specified
  const topToasts = toasts
    .filter((t) => t.position !== "bottom")
    .slice(-maxVisible);
  console.log("🍞 Top toasts to render:", topToasts.length);

  return (
    <>
      <View
        style={[
          styles.region,
          styles.topRightRegion,
          { paddingTop: insets.top + 8 },
        ]}
        pointerEvents="box-none"
        collapsable={false}
      >
        {topToasts.map((item) => (
          <ToastItemView
            key={item.id}
            item={item}
            position="top"
            theme={theme}
          />
        ))}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  region: {
    position: "absolute",
    right: 16,
    zIndex: 10000,
    elevation: 100,
    gap: 8,
    maxWidth: "90%",
  },
  topRightRegion: { top: 0 },
  toastContainer: {
    backgroundColor: "#fff",
    borderRadius: 14,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 10,
    minWidth: 200,
    maxWidth: 400,
  },
  toastContent: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    gap: 10,
    minWidth: 200,
  },
  iconContainer: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  iconText: { fontSize: 14, fontWeight: "600" },
  textContainer: { flex: 1, gap: 2 },
  messageText: { fontSize: 14, fontWeight: "600", lineHeight: 20 },
  descriptionText: { fontSize: 12, lineHeight: 16 },
  actionButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: "rgba(255,255,255,0.15)",
  },
  actionText: { fontSize: 13, fontWeight: "600" },
  dismissButton: { padding: 4 },
  dismissIcon: { fontSize: 14 },
  timerBarBg: {
    height: 3,
    backgroundColor: "rgba(255,255,255,0.1)",
    overflow: "hidden",
  },
  timerBar: { height: "100%", borderRadius: 1.5 },
});
