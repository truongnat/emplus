import React, { useState, useMemo, useRef, useCallback } from "react";
import { Redirect, useRouter } from "expo-router";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  View,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { AppScreen } from "@/src/components/organisms/AppScreen";
import { Button } from "@/src/components/atoms/Button";
import { Input } from "@/src/components/atoms/Input";
import { Text } from "@/src/components/atoms/Text";
import { AuthFlowSchema, AuthFlowFields } from "@/src/forms";
import { useAuth } from "@/src/presentation/hooks/auth";
import { palette } from "@/src/theme/tokens";
import { Ionicons } from "@expo/vector-icons";

const APP_VERSION = "1.0.0";
const TAP_THRESHOLD = 5;
const TAP_RESET_TIME = 2000;

export default function LoginScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  // Version tap handler for developer showcase
  const [tapCount, setTapCount] = useState(0);
  const tapTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleVersionTap = useCallback(() => {
    const newCount = tapCount + 1;
    setTapCount(newCount);

    if (newCount >= TAP_THRESHOLD) {
      router.push("/theme-showcase");
      setTapCount(0);
      if (tapTimeoutRef.current) clearTimeout(tapTimeoutRef.current);
    } else {
      if (tapTimeoutRef.current) clearTimeout(tapTimeoutRef.current);
      tapTimeoutRef.current = setTimeout(() => {
        setTapCount(0);
      }, TAP_RESET_TIME);
    }
  }, [tapCount, router]);

  const {
    isAuthenticated,
    isHydrated,
    session,
    login,
    isLoggingIn,
    loginError: error,
    resetLoginError,
  } = useAuth();

  const [showPassword, setShowPassword] = useState(false);

  const authForm = useForm<AuthFlowFields>({
    resolver: zodResolver(AuthFlowSchema),
    defaultValues: {
      email: __DEV__ ? "truongdq.dev@gmail.com" : "",
      password: __DEV__ ? "12345678" : "",
      policyAccepted: true,
    },
    mode: "onChange",
  });

  const handleLogin = useMemo(() => {
    return authForm.handleSubmit((data) => {
      resetLoginError();
      login(data, {
        onSuccess: () => {
          console.log("Login successful");
        },
      });
    });
  }, [authForm, login, resetLoginError]);

  if (!isHydrated) {
    return (
      <AppScreen>
        <View style={styles.loadingContainer}>
          <ActivityIndicator color={palette.violet600} size="large" />
          <Text style={styles.loadingText}>Đang tải Em Plus...</Text>
        </View>
      </AppScreen>
    );
  }

  if (isAuthenticated) {
    const isPaired = Boolean(session?.user?.coupleId);
    return <Redirect href={isPaired ? "/(tabs)/home" : "/pairing"} />;
  }

  return (
    <AppScreen scroll={false}>
      <KeyboardAwareScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: insets.bottom + 40 },
        ]}
        showsVerticalScrollIndicator={false}
        enableOnAndroid={true}
        keyboardOpeningTime={250}
        extraScrollHeight={20}
        extraHeight={80}
        bounces={false}
        keyboardShouldPersistTaps="handled"
        automaticallyAdjustKeyboardInsets
      >
        {/* Header with Version Badge */}
        <View style={styles.header}>
          {/* Version Badge - Tap 5 times for developer showcase */}
          <TouchableOpacity
            style={styles.versionBadge}
            onPress={handleVersionTap}
            activeOpacity={0.7}
          >
            <Text style={styles.versionText}>v{APP_VERSION}</Text>
            {tapCount > 0 && (
              <Text style={styles.tapCounter}>
                {tapCount}/{TAP_THRESHOLD}
              </Text>
            )}
          </TouchableOpacity>

          <View style={styles.logoContainer}>
            <View style={styles.logoIcon}>
              <Ionicons name="heart" size={40} color={palette.violet600} />
            </View>
          </View>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Em Plus</Text>
            <Text style={styles.subtitle}>Cùng nhau xây dựng tổ ấm</Text>
          </View>
        </View>

        {/* Login Form */}
        <View style={styles.formContainer}>
          <Controller
            control={authForm.control}
            name="email"
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <Input
                label="Email"
                placeholder="ví_dụ@email.com"
                value={value}
                onChangeText={onChange}
                autoCapitalize="none"
                keyboardType="email-address"
                autoComplete="email"
                error={error?.message}
              />
            )}
          />

          <Controller
            control={authForm.control}
            name="password"
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <Input
                label="Mật khẩu"
                placeholder="••••••••"
                value={value}
                onChangeText={onChange}
                secureTextEntry={!showPassword}
                error={error?.message}
                rightElement={
                  <TouchableOpacity
                    onPress={() => setShowPassword(!showPassword)}
                    style={{ padding: 4 }}
                  >
                    <Text style={styles.passwordToggle}>
                      {showPassword ? "🙈" : "👁"}
                    </Text>
                  </TouchableOpacity>
                }
              />
            )}
          />

          {/* Forgot Password Link */}
          <TouchableOpacity
            onPress={() => {
              router.push("/verify-otp?flow=reset-password");
            }}
            style={styles.forgotPassword}
          >
            <Text style={styles.forgotPasswordText}>Quên mật khẩu?</Text>
          </TouchableOpacity>

          <Button
            label={isLoggingIn ? "Đang đăng nhập..." : "Đăng nhập"}
            onPress={handleLogin}
            disabled={isLoggingIn}
            loading={isLoggingIn}
            fullWidth
            size="lg"
          />

          {error && (
            <View style={styles.errorContainer}>
              <Ionicons name="alert-circle" size={16} color={palette.red500} />
              <Text style={styles.errorText}>{error.message}</Text>
            </View>
          )}

          {/* Sign Up Link */}
          <View style={styles.signUpContainer}>
            <Text style={styles.signUpLabel}>Chưa có tài khoản?</Text>
            <TouchableOpacity
              onPress={() => {
                router.push("/verify-otp?flow=register");
              }}
            >
              <Text style={styles.signUpText}>Đăng ký ngay</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>

      {isLoggingIn && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator color="#fff" size="large" />
          <Text style={styles.loadingOverlayText}>Đang đăng nhập...</Text>
        </View>
      )}
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  },
  loadingText: {
    fontSize: 15,
    color: palette.zinc500,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 40,
  },
  header: {
    alignItems: "center",
    marginBottom: 40,
    position: "relative",
    width: "100%",
  },
  versionBadge: {
    position: "absolute",
    top: 0,
    left: 24,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: palette.violet100,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: palette.violet200,
    zIndex: 10,
  },
  versionText: {
    fontSize: 12,
    fontWeight: "700",
    color: palette.violet600,
  },
  tapCounter: {
    fontSize: 10,
    fontWeight: "700",
    color: palette.violet500,
    textAlign: "center",
    marginTop: 2,
  },
  logoContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: palette.violet100,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
    shadowColor: palette.violet600,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
  },
  logoIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "rgba(255,255,255,0.9)",
    alignItems: "center",
    justifyContent: "center",
  },
  titleContainer: {
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "800",
    color: palette.zinc900,
  },
  subtitle: {
    fontSize: 15,
    color: palette.zinc500,
    marginTop: 8,
  },
  formContainer: {
    gap: 20,
  },
  forgotPassword: {
    alignSelf: "flex-end",
    marginTop: -10,
  },
  forgotPasswordText: {
    fontSize: 14,
    color: palette.violet600,
    fontWeight: "600",
  },
  passwordToggle: {
    fontSize: 20,
  },
  errorContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: palette.red50,
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: palette.red500,
  },
  errorText: {
    flex: 1,
    fontSize: 13,
    color: palette.red600,
    fontWeight: "500",
  },
  signUpContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    marginTop: 8,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: palette.zinc200,
  },
  signUpLabel: {
    fontSize: 14,
    color: palette.zinc600,
  },
  signUpText: {
    fontSize: 14,
    color: palette.violet600,
    fontWeight: "700",
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.7)",
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
  },
  loadingOverlayText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
  },
});
