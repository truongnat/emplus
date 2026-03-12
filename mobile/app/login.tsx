import { useState, useMemo } from "react";
import { useMutation } from "@tanstack/react-query";
import { Redirect } from "expo-router";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Ionicons } from "@expo/vector-icons";
import { YStack, XStack, View, ActivityIndicator } from 'react-native';

import { 
  AppButton, AppScreen, AppText, AppCheckbox, 
  GlassCard, AppFormInput, LoadingOverlay, AppLogoHeader 
} from "@/src/framework/design/ui-kit";
import { AuthFlowSchema, AuthFlowFields } from "@/src/forms";
import { useSession } from "@/src/framework/ctx/session-context";
import { useToast } from "@/src/framework/ctx/toast-context";
import { dependencies } from "@/src/framework/di/dependencies";
import { toDisplayError } from "@/src/core/api/to-display-error";

export default function LoginScreen() {
  const sessionCtx = useSession();
  const toastCtx = useToast();
  
  // Safety check during hydration
  if (!sessionCtx || !toastCtx) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator color={palette.primary} />
      </View>
    );
  }
  
  const { setSession, hydrated, isAuthenticated, session } = sessionCtx;
  const { showToast } = toastCtx;
  const [showPassword, setShowPassword] = useState(false);

  const authForm = useForm<AuthFlowFields>({
    resolver: zodResolver(AuthFlowSchema),
    defaultValues: { email: "truongdq.dev@gmail.com", password: "12345678", policyAccepted: true },
    mode: "onChange",
  });

  const loginMutation = useMutation({
    mutationFn: (data: AuthFlowFields) => dependencies.auth.login.execute(data),
    onSuccess: (result) => {
      setSession(result);
    },
    onError: (err) => showToast(toDisplayError(err), "error")
  });

  if (!hydrated) return null;
  if (isAuthenticated) {
    const isPaired = Boolean(session?.user?.coupleId);
    return <Redirect href={isPaired ? "/(tabs)/home" : "/pairing"} />;
  }

  return (
    <AppScreen justifyContent="center" padding="$6">
      <AppLogoHeader title="Em Plus" subtitle="Cùng nhau xây dựng tổ ấm" />

      <GlassCard>
        <YStack gap="$5" py="$2">
          <Controller
            control={authForm.control}
            name="email"
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <AppFormInput 
                label="Email" icon="mail-outline" placeholder="example@wedding.com"
                value={value} onChangeText={onChange} error={error?.message}
                autoCapitalize="none" keyboardType="email-address"
              />
            )}
          />

          <Controller
            control={authForm.control}
            name="password"
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <AppFormInput 
                label="Mật khẩu" icon="lock-closed-outline" placeholder="••••••••"
                value={value} onChangeText={onChange} error={error?.message}
                secureTextEntry={!showPassword}
                rightElement={
                  <Ionicons 
                    name={showPassword ? "eye-off-outline" : "eye-outline"} size={20} color="#94a3b8" 
                    onPress={() => setShowPassword(!showPassword)} 
                  />
                }
              />
            )}
          />

          <Controller
            control={authForm.control}
            name="policyAccepted"
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <AppCheckbox label="Tôi đồng ý với Chính sách & Bảo mật" checked={value} onCheckedChange={onChange} error={error?.message} />
            )}
          />

          <AppButton marginTop="$2" onPress={authForm.handleSubmit(data => loginMutation.mutate(data))} disabled={loginMutation.isPending}>
            <XStack alignItems="center" gap="$2">
              <AppText color="white" fontWeight="700">Tiếp tục</AppText>
              <Ionicons name="arrow-forward" size={18} color="white" />
            </XStack>
          </AppButton>
        </YStack>
      </GlassCard>

      {loginMutation.isPending && <LoadingOverlay />}
    </AppScreen>
  );
}
