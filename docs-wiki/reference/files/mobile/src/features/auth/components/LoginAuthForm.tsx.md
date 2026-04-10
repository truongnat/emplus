---
title: "mobile/src/features/auth/components/LoginAuthForm.tsx"
description: "Handle routing and theme mode"
layout: "doc"
outline: "deep"
editLink: false
lastUpdated: false
pageClass: "docs-wiki docs-wiki--file"
docsWiki:
  schemaVersion: "1.0.0"
  kind: "file"
  project: "emplus"
  template: "detailed"
  themePreset: "clean"
  generatedAt: "2026-04-10T00:09:32.387Z"
  page: "reference/files/mobile/src/features/auth/components/LoginAuthForm.tsx.md"
  relativePath: "mobile/src/features/auth/components/LoginAuthForm.tsx"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/mobile/src/features/auth/components/LoginAuthForm.tsx"
  module: "mobile/src/features/auth/components"
  workspace: "mobile"
  language: "TypeScript"
  symbolCount: 1
---

# mobile/src/features/auth/components/LoginAuthForm.tsx

- Overview: [emplus Docs Wiki](../../../../../../../index.md)
- Summary: [SUMMARY](../../../../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../../../../features/index.md)
- Module: [mobile/src/features/auth/components](../../../../../../modules/mobile/src/features/auth/components.md)
- Workspace: [@emplus/mobile](../../../../../../../workspaces/mobile.md)

## Snapshot

- Language: TypeScript
- Source path: `/Users/truongdq/tx/GitHub/emplus/mobile/src/features/auth/components/LoginAuthForm.tsx`
- Lines: 325
- Symbols: 1

## Related Features

- [Authentication Login](../../../../../../../features/auth-login.md) - Authentication Login captures the login workflow inside authentication. It spans 2 workspaces. Key flows include Auth login, Auth registration, Auth login.
- [Storage Login](../../../../../../../features/storage-login.md) - Storage Login captures the login workflow inside storage. It spans 2 workspaces. Key flows include Auth login, Auth registration, Auth login.

## AI Summary

Handle routing and theme mode

### Responsibilities

- Handle routing and theme mode

### Usage Notes

- This component uses various external dependencies (e.g. `uRouter`, `useThemeMode`, etc.) for its functionality.

## Public API

- `function LoginAuthForm()`

## Symbols

### function `LoginAuthForm`

- Signature: `function LoginAuthForm()`
- Lines: 38-324
- Exported: yes

```tsx
function LoginAuthForm() {
  const router = useRouter();
  const { isDark } = useThemeMode();
  const colors = useThemeColors();
  const loginMutation = useLogin();
  const login = loginMutation.mutate;
  const isLoggingIn = loginMutation.isPending;
  const resetLoginError = loginMutation.reset;
  const reducedMotion = useReducedMotion();
  const ctaPress = usePressAnimation();

  const placeholderColor = colors.text.secondary;
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const authForm = useForm<AuthFlowFields>({
    resolver: zodResolver(AuthFlowSchema),
    defaultValues: {
      email: "",
      password: "",
      policyAccepted: true,
    },
    mode: "onChange",
  });

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      try {
        const saved = await AsyncStorage.getItem(
          appConfig.storage.loginRememberEmail,
        );
        if (!cancelled && saved?.trim()) {
          authForm.setValue("email", saved.trim());
          setRememberMe(true);
        }
      } catch {
        /* ignore */
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [authForm]);

  const handleLogin = useMemo(() => {
    return authForm.handleSubmit((data) => {
      Keyboard.dismiss();
      resetLoginError();

      login(data, {
        onSuccess: async (response) => {
          try {
            if (rememberMe) {
              await AsyncStorage.setItem(
                appConfig.storage.loginRememberEmail,
                data.email.trim(),
              );
            } else {
              await AsyncStorage.removeItem(
                appConfig.storage.loginRememberEmail,
              );
            }
          } catch {
            /* ignore */
          }
          if ("requiresOTP" in response && response.requiresOTP) {
            router.push({
              pathname: "/verify-otp",
              params: { email: data.email },
            });
          }
        },
      });
    });
  }, [authForm, login, resetLoginError, router, rememberMe]);

  const loginPlaceholder = isDark ? placeholderColor : loginFigmaLight.subtitle;
  const loginLabelColor = isDark ? undefined : loginFigmaLight.titleDark;
  const loginSoft = isDark
    ? authSoftFieldSurface.dark
    : authSoftFieldSurface.light;
  const loginInputRadius = !isDark ? loginFigmaLight.inputPillRadius : 16;

  const enteringForm = reducedMotion
    ? FadeIn.duration(0)
    : FadeInDown.delay(140).springify().damping(22).stiffness(180);

  const switchTrackOff = isDark
    ? "rgba(255,255,255,0.2)"
    : "rgba(0,0,0,0.08)";

  const togglePassword = useCallback(() => {
    setShowPassword((v) => !v);
  }, []);

  return (
    <Animated.View entering={enteringForm} style={styles.formOuter}>
      <GlassCard
        intensity={
          isDark ? authGlassBlurIntensity.dark : authGlassBlurIntensity.light
        }
        tint={isDark ? "dark" : "light"}
        isLiquid={isLiquidGlassSupported}
        style={styles.glassCard}
      >
        <View style={styles.formInner}>
          <Controller
            control={authForm.control}
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
                returnKeyType="next"
                blurOnSubmit={false}
                size="lg"
              />
            )}
          />

          <Controller
            control={authForm.control}
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
                autoComplete="password"
                returnKeyType="go"
                onSubmitEditing={handleLogin}
                size="lg"
                trailingElement={
                  <TouchableOpacity
                    onPress={togglePassword}
                    style={styles.eyeHit}
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

          <View style={styles.rememberForgotRow}>
            <View style={styles.rememberLeft}>
              <Switch
                value={rememberMe}
                onValueChange={setRememberMe}
                trackColor={{
                  false: switchTrackOff,
                  true: colors.brand.default,
                }}
                thumbColor="#FFFFFF"
                accessibilityLabel="Ghi nhớ đăng nhập"
              />
              <Text
                style={[
                  styles.rememberLabel,
                  {
                    color: isDark
                      ? colors.text.secondary
                      : loginFigmaLight.footerLink,
                  },
                ]}
                numberOfLines={1}
              >
                Ghi nhớ
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                router.push("/forgot-password");
              }}
              style={styles.forgotInline}
              accessibilityRole="button"
              accessibilityLabel="Quên mật khẩu"
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <Text
                style={[
                  styles.forgotPasswordText,
                  { color: colors.brand.text },
                ]}
              >
                Quên mật khẩu?
              </Text>
            </TouchableOpacity>
          </View>

          <Pressable
            onPress={handleLogin}
            onPressIn={ctaPress.handlers.onPressIn}
            onPressOut={ctaPress.handlers.onPressOut}
            disabled={isLoggingIn}
            style={[
              styles.ctaPressable,
              isLoggingIn ? styles.ctaDisabled : null,
            ]}
            accessibilityRole="button"
            accessibilityLabel="Đăng nhập"
            accessibilityHint="Gửi email và mật khẩu để vào ứng dụng"
          >
            <Animated.View style={[styles.ctaClip, ctaPress.animatedStyle]}>
              <LinearGradient
                colors={
                  isDark ? ["#FF8FA3", "#8E7CFF"] : ["#FF6B81", "#7B61FF"]
                }
                locations={[0, 1]}
                start={{ x: 0, y: 0.5 }}
                end={{ x: 1, y: 0.5 }}
                style={styles.ctaGradient}
              >
                {isLoggingIn ? (
                  <ActivityIndicator color="#FFFFFF" size="small" />
                ) : (
                  <Text style={styles.ctaLabel}>Đăng nhập</Text>
                )}
              </LinearGradient>
            </Animated.View>
          </Pressable>
        </View>
      </GlassCard>
    </Animated.View>
  );
}
```
