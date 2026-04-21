import React, { useMemo } from "react";
import { View, Keyboard, ActivityIndicator, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";

import { Input } from "@/src/components/atoms/Input";
import { InputErrorLeadingIcon } from "@/src/components/atoms/InputErrorLeadingIcon";
import { Text } from "@/src/components/atoms/Text";
import { GlassCard } from "@/src/components/glass/GlassCard";
import { isLiquidGlassSupported } from "@/src/components/glass/LiquidGlassView";
import { ForgotPasswordFields, ForgotPasswordSchema } from "@/src/forms";
import { useForgotPasswordRequest } from "@/src/presentation/hooks/auth/useForgotPasswordRequest";
import { useToast } from "@/src/toast-context";
import { useThemeColors } from "@/src/theme";
import {
  authGlassBlurIntensity,
  authSoftFieldSurface,
  loginFigmaLight,
} from "@/src/theme/emplus-design-tokens";
import { useReducedMotion } from "@/src/hooks/use-reduced-motion";
import { usePressAnimation } from "@/src/animations/presets";
import { toDisplayError } from "@/src/core/api/to-display-error";

import { loginScreenStyles as shellStyles } from "../loginScreen.styles";

export function ForgotPasswordAuthForm() {
  const router = useRouter();
  const { showToast } = useToast();
  const colors = useThemeColors();
  const reducedMotion = useReducedMotion();
  const ctaPress = usePressAnimation();
  const mutation = useForgotPasswordRequest();

  const form = useForm<ForgotPasswordFields>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: { email: "" },
    mode: "onChange",
  });

  const handleSend = useMemo(
    () =>
      form.handleSubmit((data) => {
        const email = data.email.trim().toLowerCase();
        Keyboard.dismiss();
        mutation.mutate(email, {
          onSuccess: () => {
            showToast("Đã gửi mã xác thực đến email của bạn.", "success");
            router.push({
              pathname: "/reset-password",
              params: { email },
            });
          },
          onError: (err) => {
            showToast(toDisplayError(err), "error");
          },
        });
      }),
    [form, mutation, router, showToast],
  );

  const placeholderColor = colors.text.secondary;
  const loginPlaceholder = loginFigmaLight.subtitle;
  const loginLabelColor = loginFigmaLight.titleDark;
  const loginSoft = authSoftFieldSurface.light;
  const loginInputRadius = loginFigmaLight.inputPillRadius;

  const enteringForm = reducedMotion
    ? FadeIn.duration(0)
    : FadeInDown.delay(120).springify().damping(22).stiffness(180);

  const pending = mutation.isPending;

  return (
    <Animated.View entering={enteringForm} style={shellStyles.formOuter}>
      <GlassCard
        intensity={authGlassBlurIntensity.light}
        tint="light"
        isLiquid={false && isLiquidGlassSupported}
        style={shellStyles.glassCard}
        contentStyle={shellStyles.glassCardContent}
      >
        <View style={shellStyles.formInner}>
          <Controller
            control={form.control}
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
                returnKeyType="go"
                onSubmitEditing={handleSend}
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

          <Pressable
            onPress={handleSend}
            onPressIn={ctaPress.handlers.onPressIn}
            onPressOut={ctaPress.handlers.onPressOut}
            disabled={pending}
            style={[
              shellStyles.ctaPressable,
              pending ? shellStyles.ctaDisabled : null,
            ]}
            accessibilityRole="button"
            accessibilityLabel="Gửi mã xác thực qua email"
          >
            <Animated.View
              style={[shellStyles.ctaClip, ctaPress.animatedStyle]}
            >
              <View
                style={[
                  shellStyles.ctaGradient,
                  { backgroundColor: colors.brand.default },
                ]}
              >
                {pending ? (
                  <ActivityIndicator color="#FFFFFF" size="small" />
                ) : (
                  <Text style={shellStyles.ctaLabel}>Gửi mã xác thực</Text>
                )}
              </View>
            </Animated.View>
          </Pressable>
        </View>
      </GlassCard>
    </Animated.View>
  );
}
