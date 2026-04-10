---
title: "mobile/src/features/auth/components/RegisterAuthForm.tsx"
description: "The RegisterAuthForm component handles user registration logic."
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
  page: "reference/files/mobile/src/features/auth/components/RegisterAuthForm.tsx.md"
  relativePath: "mobile/src/features/auth/components/RegisterAuthForm.tsx"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/mobile/src/features/auth/components/RegisterAuthForm.tsx"
  module: "mobile/src/features/auth/components"
  workspace: "mobile"
  language: "TypeScript"
  symbolCount: 1
---

# mobile/src/features/auth/components/RegisterAuthForm.tsx

- Overview: [emplus Docs Wiki](../../../../../../../index.md)
- Summary: [SUMMARY](../../../../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../../../../features/index.md)
- Module: [mobile/src/features/auth/components](../../../../../../modules/mobile/src/features/auth/components.md)
- Workspace: [@emplus/mobile](../../../../../../../workspaces/mobile.md)

## Snapshot

- Language: TypeScript
- Source path: `/Users/truongdq/tx/GitHub/emplus/mobile/src/features/auth/components/RegisterAuthForm.tsx`
- Lines: 451
- Symbols: 1

## Related Features

- [Authentication Login](../../../../../../../features/auth-login.md) - Authentication Login captures the login workflow inside authentication. It spans 2 workspaces. Key flows include Auth login, Auth registration, Auth login.
- [User Management Login](../../../../../../../features/user-login.md) - User Management Login captures the login workflow inside user management. It spans 2 workspaces. Key flows include Auth login, Auth registration, Auth login.

## AI Summary

The RegisterAuthForm component handles user registration logic.

## Public API

- `function RegisterAuthForm()`

## Symbols

### function `RegisterAuthForm`

- Signature: `function RegisterAuthForm()`
- Lines: 38-450
- Exported: yes

```tsx
function RegisterAuthForm() {
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
```
