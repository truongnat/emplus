import React, { useMemo, useState, useCallback } from "react";
import {
  View,
  TouchableOpacity,
  Keyboard,
  ActivityIndicator,
  Pressable,
} from "react-native";
import { useRouter } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LinearGradient } from "expo-linear-gradient";
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";

import { Input } from "@/src/components/atoms/Input";
import { InputErrorLeadingIcon } from "@/src/components/atoms/InputErrorLeadingIcon";
import { Text, Checkbox } from "@/src/components/atoms";
import { GlassCard } from "@/src/components/glass/GlassCard";
import { isLiquidGlassSupported } from "@/src/components/glass/LiquidGlassView";
import { RegisterFields, RegisterSchema } from "@/src/forms";
import { useRegister } from "@/src/presentation/hooks/auth/useRegister";
import { useThemeColors, useThemeMode } from "@/src/theme";
import { loginFigmaLight } from "@/src/theme/emplus-design-tokens";
import { useReducedMotion } from "@/src/hooks/use-reduced-motion";
import { usePressAnimation } from "@/src/animations/presets";

import { loginScreenStyles as shellStyles } from "../loginScreen.styles";
import { registerScreenStyles as regStyles } from "../registerScreen.styles";

const GENDERS: { value: RegisterFields["gender"]; label: string }[] = [
  { value: "NAM", label: "Nam" },
  { value: "NU", label: "Nữ" },
  { value: "KHAC", label: "Khác" },
  { value: "KHONG_TIET_LO", label: "Riêng tư" },
];

export function RegisterAuthForm() {
  const router = useRouter();
  const { isDark } = useThemeMode();
  const colors = useThemeColors();
  const reducedMotion = useReducedMotion();
  const ctaPress = usePressAnimation();

  const registerMutation = useRegister({
    onSuccess: (data) => {
      router.replace({
        pathname: "/verify-otp",
        params: { email: data.user.email, flow: "register" },
      });
    },
    showToast: true,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const registerForm = useForm<RegisterFields>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      gender: "NAM",
      policyAccepted: false,
    },
    mode: "onChange",
  });

  const handleRegister = useMemo(() => {
    return registerForm.handleSubmit((data) => {
      Keyboard.dismiss();
      registerMutation.mutate({
        email: data.email,
        password: data.password,
        fullName: data.fullName,
        gender: data.gender,
      });
    });
  }, [registerForm, registerMutation]);

  const isRegistering = registerMutation.isPending;
  const placeholderColor = colors.text.secondary;
  const loginPlaceholder = isDark ? placeholderColor : loginFigmaLight.subtitle;
  const loginLabelColor = isDark ? undefined : loginFigmaLight.titleDark;
  const loginSoft = !isDark
    ? {
        backgroundColor: "rgba(255,255,255,0.55)",
        borderColor: "rgba(255,107,129,0.22)",
      }
    : {
        backgroundColor: "rgba(255,255,255,0.06)",
        borderColor: "rgba(255,255,255,0.12)",
      };
  const loginInputRadius = !isDark ? loginFigmaLight.inputPillRadius : 16;

  const enteringForm = reducedMotion
    ? FadeIn.duration(0)
    : FadeInDown.delay(140).springify().damping(22).stiffness(180);

  const togglePassword = useCallback(() => {
    setShowPassword((v) => !v);
  }, []);
  const toggleConfirm = useCallback(() => {
    setShowConfirmPassword((v) => !v);
  }, []);

  return (
    <Animated.View entering={enteringForm} style={shellStyles.formOuter}>
      <GlassCard
        intensity={isDark ? 30 : 26}
        tint={isDark ? "dark" : "light"}
        isLiquid={isLiquidGlassSupported}
        style={shellStyles.glassCard}
      >
        <View style={shellStyles.formInner}>
          <Controller
            control={registerForm.control}
            name="gender"
            render={({ field: { onChange, value } }) => (
              <View style={regStyles.genderBlock}>
                <Text
                  style={[
                    regStyles.genderLabel,
                    { color: colors.text.secondary },
                  ]}
                >
                  Giới tính
                </Text>
                <View style={regStyles.genderRow}>
                  {GENDERS.map((g) => {
                    const selected = value === g.value;
                    return (
                      <TouchableOpacity
                        key={g.value}
                        onPress={() => onChange(g.value)}
                        accessibilityRole="button"
                        accessibilityLabel={g.label}
                        accessibilityState={{ selected }}
                        style={[
                          regStyles.genderChip,
                          {
                            borderColor: selected
                              ? colors.brand.default
                              : loginSoft.borderColor,
                            backgroundColor: selected
                              ? isDark
                                ? "rgba(255,107,129,0.18)"
                                : "rgba(255,107,129,0.12)"
                              : loginSoft.backgroundColor,
                          },
                        ]}
                      >
                        <Text
                          style={[
                            regStyles.genderChipText,
                            {
                              color: selected
                                ? colors.brand.text
                                : colors.text.secondary,
                            },
                          ]}
                        >
                          {g.label}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>
            )}
          />

          <Controller
            control={registerForm.control}
            name="fullName"
            render={({
              field: { onChange, value },
              fieldState: { error },
            }) => (
              <Input
                variant="soft"
                label="Họ và tên"
                labelColor={loginLabelColor}
                softSurface={loginSoft}
                inputRadiusPx={loginInputRadius}
                placeholder="Nguyễn Văn A"
                placeholderTextColor={loginPlaceholder}
                value={value}
                onChange={onChange}
                error={error?.message}
                returnKeyType="next"
                blurOnSubmit={false}
                size="lg"
                leadingElement={
                  error?.message ? (
                    <InputErrorLeadingIcon error={error.message} />
                  ) : (
                    <Ionicons
                      name="person-outline"
                      size={22}
                      color={loginPlaceholder}
                      accessibilityElementsHidden
                      importantForAccessibility="no"
                    />
                  )
                }
              />
            )}
          />

          <Controller
            control={registerForm.control}
            name="email"
            render={({
              field: { onChange, value },
              fieldState: { error },
            }) => (
              <Input
                variant="soft"
                label="Email"
                labelColor={loginLabelColor}
                softSurface={loginSoft}
                inputRadiusPx={loginInputRadius}
                placeholder="ví_dụ@email.com"
                placeholderTextColor={loginPlaceholder}
                value={value}
                onChange={onChange}
                autoCapitalize="none"
                keyboardType="email-address"
                autoComplete="email"
                error={error?.message}
                returnKeyType="next"
                blurOnSubmit={false}
                size="lg"
                leadingElement={
                  error?.message ? (
                    <InputErrorLeadingIcon error={error.message} />
                  ) : (
                    <Ionicons
                      name="mail-outline"
                      size={22}
                      color={loginPlaceholder}
                      accessibilityElementsHidden
                      importantForAccessibility="no"
                    />
                  )
                }
              />
            )}
          />

          <Controller
            control={registerForm.control}
            name="password"
            render={({
              field: { onChange, value },
              fieldState: { error },
            }) => (
              <Input
                variant="soft"
                label="Mật khẩu"
                labelColor={loginLabelColor}
                softSurface={loginSoft}
                inputRadiusPx={loginInputRadius}
                placeholder="••••••••"
                placeholderTextColor={loginPlaceholder}
                value={value}
                onChange={onChange}
                secureTextEntry={!showPassword}
                error={error?.message}
                returnKeyType="next"
                blurOnSubmit={false}
                size="lg"
                leadingElement={
                  error?.message ? (
                    <InputErrorLeadingIcon error={error.message} />
                  ) : (
                    <Ionicons
                      name="lock-closed-outline"
                      size={22}
                      color={loginPlaceholder}
                      accessibilityElementsHidden
                      importantForAccessibility="no"
                    />
                  )
                }
                trailingElement={
                  <TouchableOpacity
                    onPress={togglePassword}
                    style={shellStyles.eyeHit}
                    accessibilityRole="button"
                    accessibilityLabel={
                      showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"
                    }
                    hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
                  >
                    <Ionicons
                      name={showPassword ? "eye-off-outline" : "eye-outline"}
                      size={22}
                      color={loginPlaceholder}
                    />
                  </TouchableOpacity>
                }
              />
            )}
          />

          <Controller
            control={registerForm.control}
            name="confirmPassword"
            render={({
              field: { onChange, value },
              fieldState: { error },
            }) => (
              <Input
                variant="soft"
                label="Xác nhận mật khẩu"
                labelColor={loginLabelColor}
                softSurface={loginSoft}
                inputRadiusPx={loginInputRadius}
                placeholder="••••••••"
                placeholderTextColor={loginPlaceholder}
                value={value}
                onChange={onChange}
                secureTextEntry={!showConfirmPassword}
                error={error?.message}
                returnKeyType="go"
                onSubmitEditing={handleRegister}
                size="lg"
                leadingElement={
                  error?.message ? (
                    <InputErrorLeadingIcon error={error.message} />
                  ) : (
                    <Ionicons
                      name="shield-checkmark-outline"
                      size={22}
                      color={loginPlaceholder}
                      accessibilityElementsHidden
                      importantForAccessibility="no"
                    />
                  )
                }
                trailingElement={
                  <TouchableOpacity
                    onPress={toggleConfirm}
                    style={shellStyles.eyeHit}
                    accessibilityRole="button"
                    accessibilityLabel={
                      showConfirmPassword
                        ? "Ẩn mật khẩu xác nhận"
                        : "Hiện mật khẩu xác nhận"
                    }
                    hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
                  >
                    <Ionicons
                      name={
                        showConfirmPassword ? "eye-off-outline" : "eye-outline"
                      }
                      size={22}
                      color={loginPlaceholder}
                    />
                  </TouchableOpacity>
                }
              />
            )}
          />

          <Controller
            control={registerForm.control}
            name="policyAccepted"
            render={({
              field: { onChange, value },
              fieldState: { error },
            }) => (
              <View style={regStyles.policyContainer}>
                <View style={regStyles.policyRow}>
                  <Checkbox value={value} onValueChange={onChange} />
                  <View style={regStyles.policyTextWrap}>
                    <Text
                      style={[
                        regStyles.policyLabel,
                        { color: colors.text.secondary },
                      ]}
                    >
                      Tôi đồng ý với{" "}
                      <Text
                        style={[
                          regStyles.policyLink,
                          { color: colors.brand.text },
                        ]}
                        onPress={() => router.push("/policy")}
                      >
                        Chính sách & Bảo mật
                      </Text>
                    </Text>
                  </View>
                </View>
                {error ? (
                  <Text
                    style={[
                      regStyles.policyError,
                      { color: colors.status.error.text },
                    ]}
                  >
                    {error.message}
                  </Text>
                ) : null}
              </View>
            )}
          />

          <Pressable
            onPress={handleRegister}
            onPressIn={ctaPress.handlers.onPressIn}
            onPressOut={ctaPress.handlers.onPressOut}
            disabled={isRegistering}
            style={[
              shellStyles.ctaPressable,
              isRegistering ? shellStyles.ctaDisabled : null,
            ]}
            accessibilityRole="button"
            accessibilityLabel="Đăng ký tài khoản"
          >
            <Animated.View
              style={[shellStyles.ctaClip, ctaPress.animatedStyle]}
            >
              <LinearGradient
                colors={
                  isDark ? ["#FF8FA3", "#8E7CFF"] : ["#FF6B81", "#7B61FF"]
                }
                locations={[0, 1]}
                start={{ x: 0, y: 0.5 }}
                end={{ x: 1, y: 0.5 }}
                style={shellStyles.ctaGradient}
              >
                {isRegistering ? (
                  <ActivityIndicator color="#FFFFFF" size="small" />
                ) : (
                  <Text style={shellStyles.ctaLabel}>Đăng ký</Text>
                )}
              </LinearGradient>
            </Animated.View>
          </Pressable>
        </View>
      </GlassCard>
    </Animated.View>
  );
}
