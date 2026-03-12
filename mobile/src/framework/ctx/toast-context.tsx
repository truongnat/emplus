import React, { createContext, useContext, useState, useCallback, useRef, ReactNode, useMemo } from "react";
import { View, StyleSheet, Platform } from "react-native";
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
import { AppText } from "../../ui-kit";
import { palette, radii } from "../../theme";

export type ToastType = "success" | "error" | "warning" | "info";

interface ToastContextType {
  showToast: (message: string, type?: ToastType, duration?: number) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
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
    const colors = palette as any;
    switch (type) {
      case "success":
        return {
          bg: colors['success-bg'] || "#F0FDF4",
          border: colors.success || "#22C55E",
          color: "success",
          icon: "checkmark-circle" as const,
        };
      case "error":
        return {
          bg: colors['danger-bg'] || "#FEF2F2",
          border: colors.danger || "#EF4444",
          color: "danger",
          icon: "alert-circle" as const,
        };
      case "warning":
        return {
          bg: colors['warning-bg'] || "#FFFBEB",
          border: colors.warning || "#F59E0B",
          color: "warning",
          icon: "warning" as const,
        };
      case "info":
        return {
          bg: colors['info-bg'] || "#EFF6FF",
          border: colors.info || "#3B82F6",
          color: "info",
          icon: "information-circle" as const,
        };
      default:
        return { bg: "#F0FDF4", border: "#22C55E", color: "success", icon: "checkmark-circle" as const };
    }
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
              <View style={[styles.iconContainer, { backgroundColor: (palette as any)[currentStyle.color as any] + "20" || "#00000015" }]}>
                <Ionicons
                  name={currentStyle.icon}
                  size={20}
                  color={(palette as any)[currentStyle.color as any] || "#000"}
                />
              </View>
              <AppText
                variant="captionBold"
                color={currentStyle.color as any}
                style={styles.text}
                numberOfLines={2}
              >
                {toast.message}
              </AppText>
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
    borderRadius: radii?.xl || 16,
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
