import React, { useState, useMemo, useRef, useCallback } from "react";
import { Redirect, useRouter } from "expo-router";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  View,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  TextInput,
  Keyboard,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";

import { useSafeAreaInsets } from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { AppScreen } from "@/src/components/organisms/AppScreen";
import { Button } from "@/src/components/atoms/Button";
import { Input } from "@/src/components/atoms/Input";
import { Text } from "@/src/components/atoms/Text";
import { AuthFlowSchema, AuthFlowFields } from "@/src/forms";
import { useLogin } from "@/src/presentation/hooks/auth/useLogin";
import { useSession } from "@/src/framework/ctx/session-context";
import { useThemeColors } from "@/src/theme";
import { palette } from "@/src/theme/tokens";
import { Ionicons } from "@expo/vector-icons";

export default function LoginScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const passwordRef = useRef<TextInput>(null);

  const { isAuthenticated, hydrated: isHydrated, session } = useSession();
  const loginMutation = useLogin();

  const login = loginMutation.mutate;
  const isLoggingIn = loginMutation.isPending;
  const resetLoginError = loginMutation.reset;


  const colors = useThemeColors();
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
      Keyboard.dismiss();
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
          <ActivityIndicator color={colors.brand.default} size="large" />
          <Text style={[styles.loadingText, { color: colors.text.tertiary }]}>
            Đang tải Em Plus...
          </Text>
        </View>
      </AppScreen>
    );
  }

  if (isAuthenticated) {
    const isPaired = Boolean(session?.user?.coupleId);
    return <Redirect href={isPaired ? "/(tabs)/home" : "/pairing"} />;
  }

  return (
    <AppScreen style={styles.appScreen}>
      <KeyboardAwareScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: insets.bottom + 40 },
        ]}
        showsVerticalScrollIndicator={false}
        enableOnAndroid={true}
        keyboardShouldPersistTaps="handled"
        automaticallyAdjustKeyboardInsets={true}
        enableAutomaticScroll={true}
        extraScrollHeight={20}
        extraHeight={50}
        keyboardOpeningTime={0}

      >
        <View style={styles.header}>
          <View
            style={[
              styles.logoContainer,
              {
                backgroundColor: colors.brand.muted,
                shadowColor: colors.brand.default,
              },
            ]}
          >
            <View
              style={[
                styles.logoIcon,
                { backgroundColor: colors.surface.default },
              ]}
            >
              <Ionicons name="heart" size={40} color={colors.brand.default} />
            </View>
          </View>
          <View style={styles.titleContainer}>
            <Text style={[styles.title, { color: colors.text.primary }]}>
              Em Plus
            </Text>
            <Text style={[styles.subtitle, { color: colors.text.secondary }]}>
              Cùng nhau xây dựng tổ ấm
            </Text>
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
                returnKeyType="next"
                onSubmitEditing={() => passwordRef.current?.focus()}
                blurOnSubmit={false}
              />
            )}
          />

          <Controller
            control={authForm.control}
            name="password"
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <Input
                ref={passwordRef}
                label="Mật khẩu"
                placeholder="••••••••"
                value={value}
                onChangeText={onChange}
                secureTextEntry={!showPassword}
                error={error?.message}
                autoComplete="password"
                returnKeyType="go"
                onSubmitEditing={handleLogin}
                rightElement={
                  <TouchableOpacity
                    onPress={() => setShowPassword(!showPassword)}
                    style={{ padding: 4 }}
                  >
                    <Ionicons
                      name={showPassword ? "eye-off-outline" : "eye-outline"}
                      size={20}
                      color={colors.text.tertiary}
                    />
                  </TouchableOpacity>
                }
              />
            )}
          />

          {/* Forgot Password Link */}
          <TouchableOpacity
            onPress={() => {
              router.push("/forgot-password");
            }}
            style={styles.forgotPassword}
          >
            <Text
              style={[styles.forgotPasswordText, { color: colors.brand.text }]}
            >
              Quên mật khẩu?
            </Text>
          </TouchableOpacity>

          <Button
            label={isLoggingIn ? "Đang đăng nhập..." : "Đăng nhập"}
            onPress={handleLogin}
            disabled={isLoggingIn}
            loading={isLoggingIn}
            fullWidth
            size="lg"
          />

          {/* Sign Up Link */}
          <View
            style={[
              styles.signUpContainer,
              { borderTopColor: colors.border.subtle },
            ]}
          >
            <Text
              style={[styles.signUpLabel, { color: colors.text.secondary }]}
            >
              Chưa có tài khoản?
            </Text>
            <TouchableOpacity
              onPress={() => {
                router.push("/register");
              }}
            >
              <Text style={[styles.signUpText, { color: colors.brand.text }]}>
                Đăng ký ngay
              </Text>
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
  appScreen: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  navHeader: {
    height: 56,
  },
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

  logoContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
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
