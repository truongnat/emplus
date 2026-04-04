import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  forwardRef,
  ReactNode,
} from "react";
import {
  BackHandler,
  Dimensions,
  Keyboard,
  KeyboardEvent,
  Modal,
  Platform,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  useAnimatedScrollHandler,
  useAnimatedRef,
  SharedValue,
} from "react-native-reanimated";
import { scheduleOnRN } from "react-native-worklets";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme, useThemeMeta } from "@/src/theme";

// ─── Types ────────────────────────────────────────────────────────────────────

export type SnapPoint = number | `${number}%`;

export interface BottomSheetHandle {
  snapTo: (index: number) => void;
  expand: () => void;
  collapse: () => void;
  close: () => void;
}

export interface BottomSheetProps {
  snapPoints: SnapPoint[];
  initialSnap?: number;
  onSnapChange?: (index: number) => void;
  onClose?: () => void;
  backdropComponent?: (props: {
    animatedIndex: SharedValue<number>;
  }) => ReactNode;
  handleComponent?: () => ReactNode;
  children: ReactNode;
  enableScrolling?: boolean;
  dismissOnBackdrop?: boolean;
  dismissVelocityThreshold?: number;
  modal?: boolean;
  style?: ViewStyle;
  keyboardAware?: boolean;
  detached?: boolean;
  bottomInset?: number;
}

const { height: SCREEN_H } = Dimensions.get("window");

function resolveSnapPoint(point: SnapPoint): number {
  if (typeof point === "string") {
    const pct = parseFloat(point) / 100;
    return SCREEN_H * pct;
  }
  return point;
}

// ─── Internal ScrollContext ───────────────────────────────────────────────────

const BottomSheetScrollCtx = createContext<{
  scrollY: SharedValue<number>;
  allowSheetGesture: SharedValue<boolean>;
} | null>(null);

// ─── BottomSheetScrollView ────────────────────────────────────────────────────

export function BottomSheetScrollView({
  children,
  style,
}: {
  children: ReactNode;
  style?: ViewStyle;
}) {
  const ctx = useContext(BottomSheetScrollCtx);
  const animRef = useAnimatedRef<Animated.ScrollView>();

  const scrollHandler = useAnimatedScrollHandler({
    onScroll(e) {
      if (ctx) {
        ctx.scrollY.value = e.contentOffset.y;
        ctx.allowSheetGesture.value = e.contentOffset.y <= 0;
      }
    },
    onBeginDrag() {
      if (ctx) ctx.allowSheetGesture.value = false;
    },
  });

  return (
    <Animated.ScrollView
      ref={animRef}
      onScroll={scrollHandler}
      scrollEventThrottle={16}
      bounces={false}
      style={style}
    >
      {children}
    </Animated.ScrollView>
  );
}

// ─── BottomSheet ──────────────────────────────────────────────────────────────

export const BottomSheet = forwardRef<BottomSheetHandle, BottomSheetProps>(
  function BottomSheet(
    {
      snapPoints,
      initialSnap = 0,
      onSnapChange,
      onClose,
      backdropComponent,
      handleComponent,
      children,
      dismissOnBackdrop = true,
      dismissVelocityThreshold = 500,
      modal = false,
      style,
      keyboardAware = true,
      detached = false,
      bottomInset = 0,
    },
    ref,
  ) {
    const theme = useTheme();
    const { isDark } = useThemeMeta();
    const insets = useSafeAreaInsets();

    const sheetChrome = useMemo(() => {
      const sh = theme.shadow.xl;
      const shadow = {
        ...sh,
        shadowOffset: { width: 0, height: -10 },
        shadowOpacity: isDark
          ? Math.min(sh.shadowOpacity + 0.22, 0.65)
          : sh.shadowOpacity,
        shadowRadius: Math.max(sh.shadowRadius, 20),
        shadowColor: isDark ? "#000000" : sh.shadowColor,
      };
      const base = {
        backgroundColor: theme.colors.surface.default,
        overflow: "hidden" as const,
        ...shadow,
      };
      if (detached) {
        return {
          ...base,
          borderWidth: StyleSheet.hairlineWidth,
          borderColor: theme.colors.border.subtle,
        };
      }
      return {
        ...base,
        borderTopWidth: StyleSheet.hairlineWidth,
        borderTopColor: theme.colors.border.subtle,
      };
    }, [theme, isDark, detached]);

    const resolved = snapPoints.map(resolveSnapPoint);
    const maxHeight = resolved[resolved.length - 1];

    const translateY = useSharedValue(SCREEN_H);
    const activeSnapIdx = useSharedValue(initialSnap);
    const gestureStartY = useSharedValue(0);
    const isDragging = useSharedValue(false);
    const keyboardHeight = useSharedValue(0);

    const scrollY = useSharedValue(0);
    const allowSheetGesture = useSharedValue(true);

    const SPRING_CONFIG = theme.spring.smooth;
    const CLOSE_SPRING = theme.spring.gentle;

    useEffect(() => {
      if (!keyboardAware) return;

      const show = (e: KeyboardEvent) => {
        const kh = e.endCoordinates.height;
        keyboardHeight.value = kh;
        const targetY = SCREEN_H - resolved[activeSnapIdx.value] - kh;
        translateY.value = withSpring(Math.max(0, targetY), SPRING_CONFIG);
      };
      const hide = () => {
        keyboardHeight.value = 0;
        snapToIndex(activeSnapIdx.value);
      };

      const showEvent =
        Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow";
      const hideEvent =
        Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide";

      const s1 = Keyboard.addListener(showEvent, show);
      const s2 = Keyboard.addListener(hideEvent, hide);
      return () => {
        s1.remove();
        s2.remove();
      };
    }, [resolved, keyboardAware, theme.spring.smooth]);

    useEffect(() => {
      const handler = BackHandler.addEventListener("hardwareBackPress", () => {
        dismissSheet();
        return true;
      });
      return () => handler.remove();
    }, []);

    const snapToIndex = useCallback(
      (index: number) => {
        const clampedIdx = Math.max(0, Math.min(index, resolved.length - 1));
        const targetY = SCREEN_H - resolved[clampedIdx] - keyboardHeight.value;
        translateY.value = withSpring(targetY, SPRING_CONFIG);
        activeSnapIdx.value = clampedIdx;
        onSnapChange?.(clampedIdx);
      },
      [resolved, onSnapChange, theme.spring.smooth],
    );

    const dismissSheet = useCallback(() => {
      translateY.value = withSpring(SCREEN_H, CLOSE_SPRING, (finished) => {
        if (finished && onClose) scheduleOnRN(onClose);
      });
    }, [onClose, theme.spring.gentle]);

    useImperativeHandle(
      ref,
      () => ({
        snapTo: (index) => snapToIndex(index),
        expand: () => snapToIndex(resolved.length - 1),
        collapse: () => snapToIndex(0),
        close: () => dismissSheet(),
      }),
      [snapToIndex, dismissSheet, resolved.length],
    );

    useEffect(() => {
      snapToIndex(initialSnap);
    }, []);

    const panGesture = Gesture.Pan()
      .onStart(() => {
        isDragging.value = true;
        gestureStartY.value = translateY.value;
      })
      .onUpdate((e) => {
        if (!allowSheetGesture.value && e.translationY < 0) return;
        const nextY = gestureStartY.value + e.translationY;
        if (nextY < SCREEN_H - maxHeight) {
          translateY.value =
            SCREEN_H - maxHeight + (nextY - (SCREEN_H - maxHeight)) * 0.2;
        } else {
          translateY.value = nextY;
        }
      })
      .onEnd((e) => {
        isDragging.value = false;
        allowSheetGesture.value = true;
        const velocity = e.velocityY;

        if (velocity > dismissVelocityThreshold) {
          scheduleOnRN(dismissSheet);
          return;
        }

        if (velocity < -dismissVelocityThreshold) {
          const nextIdx = Math.min(
            activeSnapIdx.value + 1,
            resolved.length - 1,
          );
          scheduleOnRN(snapToIndex, nextIdx);
          return;
        }

        const currentHeight = SCREEN_H - translateY.value;
        let nearestIdx = 0;
        let minDist = Infinity;
        resolved.forEach((h, i) => {
          const dist = Math.abs(h - currentHeight);
          if (dist < minDist) {
            minDist = dist;
            nearestIdx = i;
          }
        });

        if (currentHeight < resolved[0] * 0.5) {
          scheduleOnRN(dismissSheet);
        } else {
          scheduleOnRN(snapToIndex, nearestIdx);
        }
      });

    const tapGesture = Gesture.Tap().onEnd(() => {
      if (dismissOnBackdrop) scheduleOnRN(dismissSheet);
    });

    const sheetStyle = useAnimatedStyle(() => ({
      transform: [{ translateY: translateY.value }],
    }));

    const backdropOpacity = useAnimatedStyle(() => {
      const heightFromBottom = SCREEN_H - translateY.value;
      const opacity = interpolate(
        heightFromBottom,
        [0, resolved[0]],
        [0, 1],
        Extrapolation.CLAMP,
      );
      return { opacity };
    });

    const containerHeight = maxHeight + insets.bottom + bottomInset;

    const sheetContent = (
      <BottomSheetScrollCtx.Provider value={{ scrollY, allowSheetGesture }}>
        <View style={StyleSheet.absoluteFill} pointerEvents="box-none">
          <GestureDetector gesture={tapGesture}>
            <Animated.View
              style={[
                StyleSheet.absoluteFill,
                { backgroundColor: theme.colors.scrim },
                backdropOpacity,
              ]}
              pointerEvents={dismissOnBackdrop ? "auto" : "none"}
            />
          </GestureDetector>

          <Animated.View
            style={[
              styles.sheet,
              sheetChrome,
              {
                height: containerHeight,
                bottom: detached ? bottomInset + insets.bottom : 0,
                marginHorizontal: detached ? theme.space[4] : 0,
                borderRadius: detached ? theme.radius["2xl"] : 0,
                borderTopLeftRadius: theme.radius["2xl"],
                borderTopRightRadius: theme.radius["2xl"],
                paddingBottom: insets.bottom,
              },
              style,
              sheetStyle,
            ]}
          >
            <GestureDetector gesture={panGesture}>
              <View
                style={[
                  styles.handleContainer,
                  { paddingVertical: theme.space[2] },
                ]}
                accessibilityRole="adjustable"
                accessibilityLabel="Kéo để thay đổi chiều cao"
              >
                {handleComponent ? (
                  handleComponent()
                ) : (
                  <View style={styles.handleTrack}>
                    <View
                      style={[
                        styles.handleBar,
                        {
                          backgroundColor: theme.colors.border.default,
                        },
                      ]}
                    />
                  </View>
                )}
              </View>
            </GestureDetector>

            {children}
          </Animated.View>
        </View>
      </BottomSheetScrollCtx.Provider>
    );

    if (modal) {
      return (
        <Modal
          transparent
          visible
          statusBarTranslucent
          animationType="none"
          onRequestClose={dismissSheet}
        >
          {sheetContent}
        </Modal>
      );
    }

    return sheetContent;
  },
);

const styles = StyleSheet.create({
  sheet: {
    position: "absolute",
    left: 0,
    right: 0,
  },
  handleContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  handleTrack: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 4,
    paddingHorizontal: 24,
    minHeight: 32,
  },
  handleBar: {
    width: 44,
    height: 5,
    borderRadius: 2.5,
    opacity: 0.85,
  },
});
