import { useState, useEffect, useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import {
  Platform,
  Pressable,
  StyleSheet,
  TextInput,
  View,
  ActivityIndicator,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  AppButton,
  AppScreen,
  AppText,
  GlassCard,
  Reveal,
} from "../src/ui-kit";
import { toDisplayError, verifyOTP } from "../src/api";
import { OtpSchema, OtpFields } from "../src/forms";
import { useSession } from "../src/session-context";
import { useToast } from "../src/toast-context";
import { palette } from "../src/theme";

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { flex: 1, paddingHorizontal: 20, paddingTop: 40 },
  header: { alignItems: "center", marginBottom: 32 },
  iconContainer: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: palette.violet100,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: palette.zinc900,
    marginBottom: 8,
  },
  subtitle: { fontSize: 15, color: palette.zinc500, textAlign: "center" },
  emailText: {
    fontSize: 15,
    fontWeight: "bold",
    color: palette.zinc700,
    marginTop: 8,
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 12,
    marginVertical: 32,
  },
  otpInput: {
    width: 50,
    height: 60,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: palette.zinc200,
    backgroundColor: palette.zinc50,
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: palette.zinc900,
  },
  otpInputFocused: { borderColor: palette.violet600, backgroundColor: "#fff" },
  otpInputError: { borderColor: palette.red500 },
  resendContainer: { alignItems: "center", marginTop: 24 },
  countdownText: { fontSize: 13, color: palette.zinc400 },
  resendText: { fontSize: 13, fontWeight: "bold", color: palette.violet600 },
  card: { marginBottom: 24 },
});

export default function VerifyOtpScreen() {
  const router = useRouter();
  const { email: emailParam } = useLocalSearchParams<{ email: string }>();
  const { setSession, hydrated } = useSession();
  const { showToast } = useToast();

  const [countdown, setCountdown] = useState(300);
  const [otpValue, setOtpValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  // Auto-focus refs for OTP inputs
  const inputRefs = useRef<Array<TextInput | null>>([]);

  const emailToVerify = emailParam || "";

  const otpForm = useForm<OtpFields>({
    resolver: zodResolver(OtpSchema),
    defaultValues: { otp: "" },
    mode: "onChange",
  });

  const verifyMutation = useMutation({
    mutationFn: verifyOTP,
    onSuccess: (session) => {
      setSession(session);
      router.replace(!!session.user.coupleId ? "/(tabs)/home" : "/pairing");
    },
    onError: (err) => {
      showToast(toDisplayError(err), "error");
    },
  });

  const handleOtpSubmit = () => {
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

  if (!hydrated) {
    return (
      <AppScreen>
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <ActivityIndicator color={palette.violet600} />
        </View>
      </AppScreen>
    );
  }

  return (
    <AppScreen>
      <View style={styles.container}>
        <View style={styles.content}>
          <Reveal>
            <View style={styles.header}>
              <View style={styles.iconContainer}>
                <MaterialCommunityIcons
                  name="shield-check-outline"
                  size={40}
                  color={palette.violet600}
                />
              </View>
              <AppText style={styles.title}>Xác minh OTP</AppText>
              <AppText style={styles.subtitle}>
                Nhập mã 6 chữ số đã được gửi đến
              </AppText>
              <AppText style={styles.emailText}>{emailToVerify}</AppText>
            </View>
          </Reveal>

          <GlassCard style={styles.card}>
            <Controller
              control={otpForm.control}
              name="otp"
              render={({ field: { onChange } }) => (
                <View>
                  <View style={styles.otpContainer}>
                    {[0, 1, 2, 3, 4, 5].map((index) => (
                      <TextInput
                        key={index}
                        ref={(ref) => {
                          inputRefs.current[index] = ref;
                        }}
                        style={[
                          styles.otpInput,
                          isFocused && styles.otpInputFocused,
                          otpForm.formState.errors.otp && styles.otpInputError,
                        ]}
                        keyboardType="number-pad"
                        maxLength={1}
                        value={otpValue[index] || ""}
                        onChangeText={(text) => {
                          const newOtp = otpValue.split("");
                          newOtp[index] = text;
                          const newValue = newOtp.join("").slice(0, 6);
                          setOtpValue(newValue);
                          onChange(newValue);

                          // Auto-focus next input
                          if (text && index < 5) {
                            inputRefs.current[index + 1]?.focus();
                          }
                          if (newValue.length === 6) {
                            handleOtpSubmit();
                          }
                        }}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        selectTextOnFocus
                      />
                    ))}
                  </View>
                </View>
              )}
            />

            <AppButton
              label={verifyMutation.isPending ? "Đang xác minh..." : "Xác minh"}
              onPress={handleOtpSubmit}
              disabled={otpValue.length !== 6 || verifyMutation.isPending}
            />
          </GlassCard>

          <View style={styles.resendContainer}>
            {countdown > 0 ? (
              <AppText style={styles.countdownText}>
                Gửi lại mã sau: {formatTime(countdown)}
              </AppText>
            ) : (
              <Pressable onPress={handleResendOtp}>
                <AppText style={styles.resendText}>Gửi lại mã OTP</AppText>
              </Pressable>
            )}
          </View>
        </View>
      </View>
    </AppScreen>
  );
}
