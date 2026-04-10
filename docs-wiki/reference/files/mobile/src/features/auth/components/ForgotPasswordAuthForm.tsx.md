---
title: "mobile/src/features/auth/components/ForgotPasswordAuthForm.tsx"
description: "ForgotPasswordAuthForm component renders form to user for sending forgotten password code"
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
  page: "reference/files/mobile/src/features/auth/components/ForgotPasswordAuthForm.tsx.md"
  relativePath: "mobile/src/features/auth/components/ForgotPasswordAuthForm.tsx"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/mobile/src/features/auth/components/ForgotPasswordAuthForm.tsx"
  module: "mobile/src/features/auth/components"
  workspace: "mobile"
  language: "TypeScript"
  symbolCount: 1
---

# mobile/src/features/auth/components/ForgotPasswordAuthForm.tsx

- Overview: [emplus Docs Wiki](../../../../../../../index.md)
- Summary: [SUMMARY](../../../../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../../../../features/index.md)
- Module: [mobile/src/features/auth/components](../../../../../../modules/mobile/src/features/auth/components.md)
- Workspace: [@emplus/mobile](../../../../../../../workspaces/mobile.md)

## Snapshot

- Language: TypeScript
- Source path: `/Users/truongdq/tx/GitHub/emplus/mobile/src/features/auth/components/ForgotPasswordAuthForm.tsx`
- Lines: 169
- Symbols: 1

## Related Features

- [Authentication Login](../../../../../../../features/auth-login.md) - Authentication Login captures the login workflow inside authentication. It spans 2 workspaces. Key flows include Auth login, Auth registration, Auth login.
- [User Management Login](../../../../../../../features/user-login.md) - User Management Login captures the login workflow inside user management. It spans 2 workspaces. Key flows include Auth login, Auth registration, Auth login.
- [Authentication Password Reset](../../../../../../../features/auth-reset.md) - Authentication Password Reset captures the password reset workflow inside authentication. It spans 3 workspaces. Key flows include Password reset, Password reset, Password reset.

## AI Summary

ForgotPasswordAuthForm component renders form to user for sending forgotten password code

### Usage Notes

- The function receives the router, toast, theme and colors as props.

## Public API

- `function ForgotPasswordAuthForm()`

## Symbols

### function `ForgotPasswordAuthForm`

- Signature: `function ForgotPasswordAuthForm()`
- Lines: 26-168
- Exported: yes

```tsx
function ForgotPasswordAuthForm() {
  const router = useRouter();
  const { showToast } = useToast();
  const { isDark } = useThemeMode();
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
    : FadeInDown.delay(120).springify().damping(22).stiffness(180);

  const pending = mutation.isPending;

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
                  <Text style={shellStyles.ctaLabel}>Gửi mã xác thực</Text>
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
