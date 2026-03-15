import { useState, useEffect, useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import {
  Platform,
  Pressable,
  StyleSheet,
  TextInput,
  View,
  ActivityIndicator,
  Keyboard,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  AppButton,
  AppScreen,
  AppText,
  Reveal,
} from "../src/ui-kit";
import { toDisplayError, verifyOTP } from "../src/api";
import { OtpSchema, OtpFields } from "../src/forms";
import { useSession } from "../src/session-context";
import { useToast } from "../src/toast-context";
import { useThemeColors } from "../src/theme";

export default function VerifyOtpScreen() {
  const router = useRouter();
  const colors = useThemeColors();
  const { email: emailParam, flow } = useLocalSearchParams<{ email: string; flow: string }>();
  const { setSession, hydrated } = useSession();
  const { showToast } = useToast();

  const [countdown, setCountdown] = useState(300);
  const [otpValue, setOtpValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(true);
  const inputRef = useRef<TextInput>(null);

  const emailToVerify = emailParam || "";

  const otpForm = useForm<OtpFields>({
    resolver: zodResolver(OtpSchema),
    defaultValues: { otp: "" },
    mode: "onChange",
  });

  const verifyMutation = useMutation({
    mutationFn: verifyOTP,
    onSuccess: (session) => {
      if (flow === "forgot-password") {
        router.push({
          pathname: "/reset-password",
          params: { email: emailToVerify, token: (session as any).accessToken },
        });
      } else {
        setSession(session);
        router.replace(!!session?.user?.coupleId ? "/(tabs)/home" : "/pairing");
      }
    },
    onError: (err) => {
      showToast(toDisplayError(err), "error");
    },
  });

  // Blink cursor effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCursorVisible((prev) => !prev);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  const handleOtpChange = (val: string) => {
    const cleaned = val.replace(/[^0-9]/g, "").slice(0, 6);
    setOtpValue(cleaned);
    otpForm.setValue("otp", cleaned);
    if (cleaned.length === 6) {
      verifyMutation.mutate({ email: emailToVerify, otp: cleaned });
    }
  };

  const handleOtpSubmit = () => {
    Keyboard.dismiss();
    if (otpValue.length === 6) {
      verifyMutation.mutate({ email: emailToVerify, otp: otpValue });
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
    // Auto focus on mount
    const timer = setTimeout(() => {
      inputRef.current?.focus();
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  if (!hydrated) {
    return (
      <AppScreen>
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <ActivityIndicator color={colors.brand.default} />
        </View>
      </AppScreen>
    );
  }

  return (
    <AppScreen>
      <View style={styles.navHeader}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color={colors.text.primary} />
        </Pressable>
        <AppText style={styles.navTitle}>Xác minh mã OTP</AppText>
        <View style={{ width: 40 }} />
      </View>

      <View style={styles.container}>
        <View style={styles.content}>
          <Reveal>
            <View style={styles.header}>
              <View
                style={[
                  styles.iconContainer,
                  { backgroundColor: colors.brand.muted },
                ]}
              >
                <MaterialCommunityIcons
                  name="shield-check-outline"
                  size={40}
                  color={colors.brand.default}
                />
              </View>
              <AppText style={[styles.title, { color: colors.text.primary }]}>
                Nhập mã xác nhận
              </AppText>
              <AppText
                style={[styles.subtitle, { color: colors.text.secondary }]}
              >
                Mã OTP đã được gửi đến email
              </AppText>
              <AppText style={[styles.emailText, { color: colors.brand.text }]}>
                {emailToVerify}
              </AppText>
            </View>
          </Reveal>

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
                        borderColor: isCurrent
                          ? colors.brand.default
                          : isFilled
                            ? colors.brand.subtle
                            : colors.border.default,
                        backgroundColor: isCurrent
                          ? colors.surface.default
                          : colors.surface.sunken,
                      },
                      isCurrent && styles.otpCellActive
                    ]}
                  >
                    <AppText style={[styles.otpCellText, { color: colors.text.primary }]}>
                      {char}
                    </AppText>
                    {isCurrent && cursorVisible && (
                      <View style={[styles.cursor, { backgroundColor: colors.brand.default }]} />
                    )}
                  </View>
                );
              })}
            </Pressable>
          </View>

          <AppButton
            label={verifyMutation.isPending ? "Đang xác minh..." : "Tiếp tục"}
            onPress={handleOtpSubmit}
            disabled={otpValue.length !== 6 || verifyMutation.isPending}
            style={{ marginTop: 20 }}
            fullWidth
            size="lg"
          />

          <View style={styles.resendContainer}>
            {countdown > 0 ? (
              <AppText
                style={[styles.countdownText, { color: colors.text.secondary }]}
              >
                Gửi lại mã sau <AppText variant="bodyBold" style={{ color: colors.brand.text }}>{formatTime(countdown)}</AppText>
              </AppText>
            ) : (
              <Pressable onPress={handleResendOtp}>
                <AppText
                  style={[styles.resendText, { color: colors.brand.text }]}
                >
                  Gửi lại mã OTP
                </AppText>
              </Pressable>
            )}
          </View>
        </View>
      </View>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  navHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    height: 56,
  },
  navTitle: {
    fontSize: 17,
    fontWeight: "600",
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  content: { flex: 1, paddingHorizontal: 24, paddingTop: 20 },
  header: { alignItems: "center", marginBottom: 40 },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    textAlign: "center",
    marginBottom: 4,
  },
  emailText: {
    fontSize: 16,
    fontWeight: "700",
  },
  otpOuterContainer: {
    marginVertical: 20,
  },
  hiddenInput: {
    position: "absolute",
    width: 0,
    height: 0,
    opacity: 0,
  },
  otpCellsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    gap: 8,
  },
  otpCell: {
    flex: 1,
    height: 64,
    borderRadius: 12,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  otpCellActive: {
    shadowColor: "#F43F5E", // rose500 equivalent
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  otpCellText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  cursor: {
    position: "absolute",
    width: 2,
    height: 28,
  },
  resendContainer: { alignItems: "center", marginTop: 32 },
  countdownText: { fontSize: 14 },
  resendText: { fontSize: 14, fontWeight: "bold" },
});
