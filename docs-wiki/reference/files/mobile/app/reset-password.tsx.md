---
title: "mobile/app/reset-password.tsx"
description: "Resets the user's password after a failed email login attempt."
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
  page: "reference/files/mobile/app/reset-password.tsx.md"
  relativePath: "mobile/app/reset-password.tsx"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/mobile/app/reset-password.tsx"
  module: "mobile/app"
  workspace: "mobile"
  language: "TypeScript"
  symbolCount: 1
---

# mobile/app/reset-password.tsx

- Overview: [emplus Docs Wiki](../../../../index.md)
- Summary: [SUMMARY](../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../features/index.md)
- Module: [mobile/app](../../../modules/mobile/app.md)
- Workspace: [@emplus/mobile](../../../../workspaces/mobile.md)

## Snapshot

- Language: TypeScript
- Source path: `/Users/truongdq/tx/GitHub/emplus/mobile/app/reset-password.tsx`
- Lines: 276
- Symbols: 1

## Related Features

- [Authentication Login](../../../../features/auth-login.md) - Authentication Login captures the login workflow inside authentication. It spans 2 workspaces. Key flows include Auth login, Auth registration, Auth login.
- [User Management Login](../../../../features/user-login.md) - User Management Login captures the login workflow inside user management. It spans 2 workspaces. Key flows include Auth login, Auth registration, Auth login.
- [Search Login](../../../../features/search-login.md) - Search Login captures the login workflow inside search. It spans 2 workspaces. Key flows include Auth login, Auth registration, Auth login.
- [Notifications Notify](../../../../features/notification-notify.md) - Notifications Notify captures the notify workflow inside notifications. It spans 2 workspaces.
- [Notifications Login](../../../../features/notification-login.md) - Notifications Login captures the login workflow inside notifications. It spans 2 workspaces. Key flows include Auth login, Auth registration, Auth login.
- [Search Notify](../../../../features/search-notify.md) - Search Notify captures the notify workflow inside search. It spans 2 workspaces.
- [User Management Notify](../../../../features/user-notify.md) - User Management Notify captures the notify workflow inside user management. It spans 2 workspaces.
- [Authentication Password Reset](../../../../features/auth-reset.md) - Authentication Password Reset captures the password reset workflow inside authentication. It spans 3 workspaces. Key flows include Password reset, Password reset, Password reset.

## AI Summary

Resets the user's password after a failed email login attempt.

### Responsibilities

- email, otp

### Usage Notes

- A React Mobile component responsible for resetting a user's password after a failed email login attempt.

## Public API

- `function ResetPasswordScreen()`

## Symbols

### function `ResetPasswordScreen`

- Signature: `function ResetPasswordScreen()`
- Lines: 26-216
- Exported: yes

```tsx
function ResetPasswordScreen() {
    const router = useRouter();
    const { email: emailParam } = useLocalSearchParams<{ email: string }>();
    const insets = useSafeAreaInsets();
    const colors = useThemeColors();
    const { showToast } = useToast();

    const email = typeof emailParam === "string" ? emailParam : "";

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const form = useForm<ResetPasswordFields>({
        resolver: zodResolver(ResetPasswordSchema),
        defaultValues: {
            otp: "",
            password: "",
            confirmPassword: "",
        },
        mode: "onChange",
    });

    const resetMutation = useMutation({
        mutationFn: (payload: { email: string; otp: string; newPassword: string }) =>
            dependencies.auth.resetPassword.execute(payload),
        onSuccess: () => {
            showToast("Đổi mật khẩu thành công! Vui lòng đăng nhập lại.", "success");
            router.replace("/login");
        },
        onError: (err) => {
            showToast(toDisplayError(err), "error");
        },
    });

    const handleResetPassword = form.handleSubmit((data) => {
        Keyboard.dismiss();
        const normalizedEmail = email.trim().toLowerCase();
        if (!normalizedEmail) {
            showToast("Thiếu email. Vui lòng bắt đầu lại từ Quên mật khẩu.", "error");
            return;
        }
        resetMutation.mutate({
            email: normalizedEmail,
            otp: data.otp,
            newPassword: data.password,
        });
    });

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
                keyboardOpeningTime={0}
            >
                <View style={styles.navHeader}>
                    <TouchableOpacity
                        onPress={() => router.back()}
                        style={styles.backButton}
                        accessibilityRole="button"
                        accessibilityLabel="Quay lại"
                        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                    >
                        <Ionicons name="arrow-back" size={24} color={colors.text.primary} />
                    </TouchableOpacity>
                </View>

                <View style={styles.header}>
                    <View style={[styles.iconContainer, { backgroundColor: colors.brand.muted }]}>
                        <MaterialCommunityIcons name="shield-lock-outline" size={48} color={colors.brand.default} />
                    </View>
                    <Text style={[styles.title, { color: colors.text.primary }]}>Đặt lại mật khẩu</Text>
                    <Text style={[styles.subtitle, { color: colors.text.secondary }]}>
                        Thiết lập mật khẩu mới cho tài khoản{"\n"}
                        <Text variant="bodyBold" style={{ color: colors.brand.text }}>{email}</Text>
                    </Text>
                </View>

                <View style={styles.formContainer}>
                    <Controller
                        control={form.control}
                        name="otp"
                        render={({ field: { onChange, value }, fieldState: { error } }) => (
                            <Input
                                label="Mã OTP (6 số)"
                                placeholder="000000"
                                value={value}
                                onChange={(t) => onChange(t.replace(/[^0-9]/g, "").slice(0, 6))}
                                keyboardType="number-pad"
                                maxLength={6}
                                error={error?.message}
                                returnKeyType="next"
                                blurOnSubmit={false}
                            />
                        )}
                    />

                    <Controller
                        control={form.control}
                        name="password"
                        render={({ field: { onChange, value }, fieldState: { error } }) => (
                            <Input
                                label="Mật khẩu mới"
                                placeholder="••••••••"
                                value={value}
                                onChange={onChange}
                                secureTextEntry={!showPassword}
                                error={error?.message}
                                autoComplete="password-new"
                                returnKeyType="next"
                                blurOnSubmit={false}
                                trailingElement={
                                    <TouchableOpacity
                                        onPress={() => setShowPassword(!showPassword)}
                                        style={styles.eyeIcon}
                                        accessibilityRole="button"
                                        accessibilityLabel={
                                            showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"
                                        }
                                        hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
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

                    <Controller
                        control={form.control}
                        name="confirmPassword"
                        render={({ field: { onChange, value }, fieldState: { error } }) => (
                            <Input
                                label="Xác nhận mật khẩu mới"
                                placeholder="••••••••"
                                value={value}
                                onChange={onChange}
                                secureTextEntry={!showConfirmPassword}
                                error={error?.message}
                                autoComplete="password-new"
                                returnKeyType="go"
                                onSubmitEditing={handleResetPassword}
                                trailingElement={
                                    <TouchableOpacity
                                        onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                                        style={styles.eyeIcon}
                                        accessibilityRole="button"
                                        accessibilityLabel={
                                            showConfirmPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"
                                        }
                                        hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
                                    >
                                        <Ionicons
                                            name={showConfirmPassword ? "eye-off-outline" : "eye-outline"}
                                            size={20}
                                            color={colors.text.tertiary}
                                        />
                                    </TouchableOpacity>
                                }
                            />
                        )}
                    />

                    <Button
                        label="Cập nhật mật khẩu"
                        onPress={handleResetPassword}
                        disabled={resetMutation.isPending}
                        loading={resetMutation.isPending}
                        fullWidth
                        size="lg"
                        style={styles.submitButton}
                        accessibilityLabel="Cập nhật mật khẩu mới"
                    />
                </View>
            </KeyboardAwareScrollView>
        </AppScreen>
    );
}
```
