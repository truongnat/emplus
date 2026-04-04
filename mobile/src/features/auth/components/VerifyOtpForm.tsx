import React, { useState, useEffect, useRef, useMemo } from "react";
import { useMutation } from "@tanstack/react-query";
import {
  Pressable,
  TextInput,
  View,
  Keyboard,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";

import { Text } from "@/src/components/atoms/Text";
import { GlassCard } from "@/src/components/glass/GlassCard";
import { isLiquidGlassSupported } from "@/src/components/glass/LiquidGlassView";
import { toDisplayError, verifyOTP } from "@/src/api";
import { useSession } from "@/src/session-context";
import { useToast } from "@/src/toast-context";
import { useThemeColors, useThemeMode } from "@/src/theme";
import { loginFigmaLight } from "@/src/theme/emplus-design-tokens";
import { useReducedMotion } from "@/src/hooks/use-reduced-motion";
import { usePressAnimation } from "@/src/animations/presets";

import { loginScreenStyles as shellStyles } from "../loginScreen.styles";
import { verifyOtpScreenStyles as styles } from "../verifyOtpScreen.styles";

export type VerifyOtpFormProps = {
  email: string;
};

export function VerifyOtpForm({ email }: VerifyOtpFormProps) {
  const router = useRouter();
  const colors = useThemeColors();
  const { isDark } = useThemeMode();
  const { setSession } = useSession();
  const { showToast } = useToast();
  const reducedMotion = useReducedMotion();
  const ctaPress = usePressAnimation();

  const [countdown, setCountdown] = useState(300);
  const [otpValue, setOtpValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(true);
  const inputRef = useRef<TextInput>(null);

  const verifyMutation = useMutation({
    mutationFn: verifyOTP,
    onSuccess: (session) => {
      setSession(session);
      router.replace(!!session?.user?.coupleId ? "/(tabs)/home" : "/pairing");
    },
    onError: (err) => {
      showToast(toDisplayError(err), "error");
    },
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setCursorVisible((prev) => !prev);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  const handleOtpChange = (val: string) => {
    const cleaned = val.replace(/[^0-9]/g, "").slice(0, 6);
    setOtpValue(cleaned);
    if (cleaned.length === 6) {
      verifyMutation.mutate({ email, otp: cleaned });
    }
  };

  const handleOtpSubmit = () => {
    Keyboard.dismiss();
    if (otpValue.length === 6) {
      verifyMutation.mutate({ email, otp: otpValue });
    }
  };

  const handleResendOtp = () => {
    showToast(
      "Vui lòng quay lại màn hình đăng nhập để yêu cầu mã mới.",
      "info",
    );
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      inputRef.current?.focus();
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const enteringForm = reducedMotion
    ? FadeIn.duration(0)
    : FadeInDown.delay(120).springify().damping(22).stiffness(180);

  const loginSoft = !isDark
    ? {
        backgroundColor: "rgba(255,255,255,0.55)",
        borderColor: "rgba(255,107,129,0.22)",
      }
    : {
        backgroundColor: "rgba(255,255,255,0.06)",
        borderColor: "rgba(255,255,255,0.12)",
      };
  const otpCellRadius = !isDark ? loginFigmaLight.inputPillRadius : 16;

  const activeCellShadow = useMemo(
    () => ({
      shadowColor: colors.brand.default,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: isDark ? 0.25 : 0.12,
      shadowRadius: 6,
      elevation: 2,
    }),
    [colors.brand.default, isDark],
  );

  const pending = verifyMutation.isPending;

  return (
    <Animated.View
      entering={enteringForm}
      style={[shellStyles.formOuter, styles.formOuterSpacing]}
    >
      <GlassCard
        intensity={isDark ? 30 : 26}
        tint={isDark ? "dark" : "light"}
        isLiquid={isLiquidGlassSupported}
        style={shellStyles.glassCard}
      >
        <View style={shellStyles.formInner}>
          <View style={styles.otpOuterContainer}>
            <TextInput
              ref={inputRef}
              style={styles.hiddenInput}
              value={otpValue}
              onChangeText={handleOtpChange}
              keyboardType="number-pad"
              maxLength={6}
              textContentType="oneTimeCode"
              autoComplete="sms-otp"
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
            />
            <Pressable
              style={styles.otpCellsContainer}
              onPress={() => inputRef.current?.focus()}
            >
              {[0, 1, 2, 3, 4, 5].map((index) => {
                const char = otpValue[index] || "";
                const isCurrent = isFocused && index === otpValue.length;
                const isFilled = index < otpValue.length;

                return (
                  <View
                    key={index}
                    style={[
                      styles.otpCell,
                      {
                        borderRadius: otpCellRadius,
                        borderColor: isCurrent
                          ? colors.brand.default
                          : isFilled
                            ? colors.brand.subtle
                            : loginSoft.borderColor,
                        backgroundColor: isCurrent
                          ? colors.surface.default
                          : loginSoft.backgroundColor,
                      },
                      isCurrent && activeCellShadow,
                    ]}
                  >
                    <Text
                      style={[styles.otpCellText, { color: colors.text.primary }]}
                    >
                      {char}
                    </Text>
                    {isCurrent && cursorVisible && (
                      <View
                        style={[
                          styles.cursor,
                          { backgroundColor: colors.brand.default },
                        ]}
                      />
                    )}
                  </View>
                );
              })}
            </Pressable>
          </View>

          <Pressable
            onPress={handleOtpSubmit}
            onPressIn={ctaPress.handlers.onPressIn}
            onPressOut={ctaPress.handlers.onPressOut}
            disabled={otpValue.length !== 6 || pending}
            style={[
              shellStyles.ctaPressable,
              (otpValue.length !== 6 || pending) && shellStyles.ctaDisabled,
            ]}
            accessibilityRole="button"
            accessibilityLabel="Xác minh mã OTP"
            accessibilityHint="Gửi mã 6 số để xác nhận"
          >
            <Animated.View style={[shellStyles.ctaClip, ctaPress.animatedStyle]}>
              <LinearGradient
                colors={
                  isDark ? ["#FF8FA3", "#8E7CFF"] : ["#FF6B81", "#7B61FF"]
                }
                locations={[0, 1]}
                start={{ x: 0, y: 0.5 }}
                end={{ x: 1, y: 0.5 }}
                style={shellStyles.ctaGradient}
              >
                {pending ? (
                  <ActivityIndicator color="#FFFFFF" size="small" />
                ) : (
                  <Text style={shellStyles.ctaLabel}>Tiếp tục</Text>
                )}
              </LinearGradient>
            </Animated.View>
          </Pressable>

          <View style={styles.resendContainer}>
            {countdown > 0 ? (
              <Text
                style={[styles.countdownText, { color: colors.text.secondary }]}
              >
                Gửi lại mã sau{" "}
                <Text style={{ color: colors.brand.text, fontWeight: "700" }}>
                  {formatTime(countdown)}
                </Text>
              </Text>
            ) : (
              <Pressable
                onPress={handleResendOtp}
                accessibilityRole="button"
                accessibilityLabel="Gửi lại mã OTP"
              >
                <Text style={[styles.resendText, { color: colors.brand.text }]}>
                  Gửi lại mã OTP
                </Text>
              </Pressable>
            )}
          </View>
        </View>
      </GlassCard>
    </Animated.View>
  );
}
