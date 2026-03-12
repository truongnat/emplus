import React, { createContext, useContext, useState, useCallback, useRef, ReactNode, useMemo } from "react";
import { View, StyleSheet, Platform, Text } from "react-native";
import { BlurView } from "expo-blur";
import { Ionicons } from "@expo/vector-icons";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  runOnJS,
  Easing
} from "react-native-reanimated";

// Hardcoded colors to avoid circular dependency
const TOAST_COLORS = {
  success: { bg: "#F0FDF4", border: "#22C55E", text: "#16A34A" },
  error: { bg: "#FEF2F2", border: "#EF4444", text: "#DC2626" },
  warning: { bg: "#FFFBEB", border: "#F59E0B", text: "#D97706" },
  info: { bg: "#EFF6FF", border: "#3B82F6", text: "#2563EB" },
};

export type ToastType = "success" | "error" | "warning" | "info";

interface ToastContextType {
  showToast: (message: string, type?: ToastType, duration?: number) => void;
}

const ToastContext = createContext<ToastContextType>({
  showToast: () => {},
});

export const useToast = () => {
  return useContext(ToastContext);
};

export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [toast, setToast] = useState<{ message: string; type: ToastType; duration: number } | null>(null);
  const timer = useRef<NodeJS.Timeout | null>(null);

  // Reanimated Shared Values
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(-20);

  /**
   * Hide Toast using Reanimated
   */
  const hideToast = useCallback(() => {
    opacity.value = withTiming(0, { duration: 250, easing: Easing.out(Easing.quad) });
    translateY.value = withTiming(-10, { duration: 250 }, (finished) => {
      if (finished) {
        runOnJS(setToast)(null);
      }
    });
  }, [opacity, translateY]);

  /**
   * Show Toast using Reanimated (Spring animation for better feel)
   */
  const showToast = useCallback((message: string, type: ToastType = "success", duration: number = 3000) => {
    if (timer.current) {
      clearTimeout(timer.current);
    }

    setToast({ message, type, duration });

    // Reset and Animate In
    opacity.value = 0;
    translateY.value = -30;

    opacity.value = withTiming(1, { duration: 300 });
    translateY.value = withSpring(0, { damping: 15, stiffness: 120 });

    timer.current = setTimeout(() => {
      hideToast();
    }, duration);
  }, [opacity, translateY, hideToast]);

  // Animated Style
  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [{ translateY: translateY.value }],
    };
  });

  const currentStyle = useMemo(() => {
    const type = toast?.type || "success";
    const colors = TOAST_COLORS[type as keyof typeof TOAST_COLORS] || TOAST_COLORS.success;
    return {
      bg: colors.bg,
      border: colors.border,
      text: colors.text,
      icon: type === "success" ? "checkmark-circle" : 
            type === "error" ? "alert-circle" : 
            type === "warning" ? "warning" : "information-circle"
    };
  }, [toast?.type]);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast && (
        <View style={styles.container} pointerEvents="none">
          <Animated.View style={[styles.toastWrapper, animatedStyle]}>
            <BlurView intensity={80} tint="light" style={[
              styles.toast,
              {
                backgroundColor: currentStyle.bg,
                borderColor: currentStyle.border,
              }
            ]}>
              <View style={[styles.iconContainer, { backgroundColor: currentStyle.text + "20" || "#00000015" }]}>
                <Ionicons
                  name={currentStyle.icon}
                  size={20}
                  color={currentStyle.text || "#000"}
                />
              </View>
              <Text
                style={[styles.text, { color: currentStyle.text || "#000" }]}
                numberOfLines={2}
              >
                {toast.message}
              </Text>
            </BlurView>
          </Animated.View>
        </View>
      )}
    </ToastContext.Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: Platform.OS === "ios" ? 50 : 30,
    left: 0,
    right: 0,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    zIndex: 999999,
  },
  toastWrapper: {
    width: "100%",
    maxWidth: 400,
  },
  toast: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 16,
    borderWidth: 1,
    gap: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
    overflow: "hidden",
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    flex: 1,
    fontSize: 14,
  }
});
