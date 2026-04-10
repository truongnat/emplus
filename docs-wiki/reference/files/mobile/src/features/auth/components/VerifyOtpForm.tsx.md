---
title: "mobile/src/features/auth/components/VerifyOtpForm.tsx"
description: "The VerifyOtpForm component is responsible for verifying a user's OTP by obtaining the necessary parameters and submitting them to a server for verification."
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
  page: "reference/files/mobile/src/features/auth/components/VerifyOtpForm.tsx.md"
  relativePath: "mobile/src/features/auth/components/VerifyOtpForm.tsx"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/mobile/src/features/auth/components/VerifyOtpForm.tsx"
  module: "mobile/src/features/auth/components"
  workspace: "mobile"
  language: "TypeScript"
  symbolCount: 2
---

# mobile/src/features/auth/components/VerifyOtpForm.tsx

- Overview: [emplus Docs Wiki](../../../../../../../index.md)
- Summary: [SUMMARY](../../../../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../../../../features/index.md)
- Module: [mobile/src/features/auth/components](../../../../../../modules/mobile/src/features/auth/components.md)
- Workspace: [@emplus/mobile](../../../../../../../workspaces/mobile.md)

## Snapshot

- Language: TypeScript
- Source path: `/Users/truongdq/tx/GitHub/emplus/mobile/src/features/auth/components/VerifyOtpForm.tsx`
- Lines: 272
- Symbols: 2

## Related Features

- [Authentication Login](../../../../../../../features/auth-login.md) - Authentication Login captures the login workflow inside authentication. It spans 2 workspaces. Key flows include Auth login, Auth registration, Auth login.
- [User Management Login](../../../../../../../features/user-login.md) - User Management Login captures the login workflow inside user management. It spans 2 workspaces. Key flows include Auth login, Auth registration, Auth login.
- [Search Login](../../../../../../../features/search-login.md) - Search Login captures the login workflow inside search. It spans 2 workspaces. Key flows include Auth login, Auth registration, Auth login.
- [Notifications Notify](../../../../../../../features/notification-notify.md) - Notifications Notify captures the notify workflow inside notifications. It spans 2 workspaces.
- [Notifications Login](../../../../../../../features/notification-login.md) - Notifications Login captures the login workflow inside notifications. It spans 2 workspaces. Key flows include Auth login, Auth registration, Auth login.
- [Search Notify](../../../../../../../features/search-notify.md) - Search Notify captures the notify workflow inside search. It spans 2 workspaces.
- [Authentication Verification](../../../../../../../features/auth-verify.md) - Authentication Verification captures the verification workflow inside authentication. It spans 2 workspaces. Key flows include Credential validation, Auth login, Auth login.
- [User Management Notify](../../../../../../../features/user-notify.md) - User Management Notify captures the notify workflow inside user management. It spans 2 workspaces.
- [Notifications Verification](../../../../../../../features/notification-verify.md) - Notifications Verification captures the verification workflow inside notifications. It spans 2 workspaces. Key flows include Credential validation, Auth login, Auth login.

## AI Summary

The VerifyOtpForm component is responsible for verifying a user's OTP by obtaining the necessary parameters and submitting them to a server for verification.

### Responsibilities

- to obtain email from props
- to define the email field type

## Public API

- `type VerifyOtpFormProps = { email: string; };`
- `function VerifyOtpForm({ email }: VerifyOtpFormProps)`

## Symbols

### type `VerifyOtpFormProps`

- Signature: `type VerifyOtpFormProps = { email: string; };`
- Lines: 32-34
- Exported: yes

```tsx
type VerifyOtpFormProps = {
  email: string;
};
```

### function `VerifyOtpForm`

- Signature: `function VerifyOtpForm({ email }: VerifyOtpFormProps)`
- Lines: 36-271
- Exported: yes

```tsx
function VerifyOtpForm({ email }: VerifyOtpFormProps) {
  const router = useRouter();
  const colors = useThemeColors();
  const { isDark } = useThemeMode();
  const { setSession } = useSession();
  const { showToast } = useToast();
  const reducedMotion = useReducedMotion();
  const ctaPress = usePressAnimation();

  const [countdown, setCountdown] = useState(300);
  const [otpValue, setOtpValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(true);
  const inputRef = useRef<TextInput>(null);

  const verifyMutation = useMutation({
    mutationFn: verifyOTP,
    onSuccess: (session) => {
      setSession(session);
      router.replace(!!session?.user?.coupleId ? "/(tabs)/home" : "/pairing");
    },
    onError: (err) => {
      showToast(toDisplayError(err), "error");
    },
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setCursorVisible((prev) => !prev);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  const handleOtpChange = (val: string) => {
    const cleaned = val.replace(/[^0-9]/g, "").slice(0, 6);
    setOtpValue(cleaned);
    if (cleaned.length === 6) {
      verifyMutation.mutate({ email, otp: cleaned });
    }
  };

  const handleOtpSubmit = () => {
    Keyboard.dismiss();
    if (otpValue.length === 6) {
      verifyMutation.mutate({ email, otp: otpValue });
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

  useEffect(() => {
    const timer = setTimeout(() => {
      inputRef.current?.focus();
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const enteringForm = reducedMotion
    ? FadeIn.duration(0)
    : FadeInDown.delay(120).springify().damping(22).stiffness(180);

  const loginSoft = isDark
    ? authSoftFieldSurface.dark
    : authSoftFieldSurface.light;
  const otpCellRadius = !isDark ? loginFigmaLight.inputPillRadius : 16;

  const activeCellShadow = useMemo(
    () => ({
      shadowColor: colors.brand.default,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: isDark ? 0.25 : 0.12,
      shadowRadius: 6,
      elevation: 2,
    }),
    [colors.brand.default, isDark],
  );

  const pending = verifyMutation.isPending;

  return (
    <Animated.View
      entering={enteringForm}
      style={[shellStyles.formOuter, styles.formOuterSpacing]}
    >
      <GlassCard
        intensity={
          isDark ? authGlassBlurIntensity.dark : authGlassBlurIntensity.light
        }
        tint={isDark ? "dark" : "light"}
        isLiquid={isLiquidGlassSupported}
        style={shellStyles.glassCard}
      >
        <View style={shellStyles.formInner}>
          <View style={styles.otpOuterContainer}>
            <TextInput
              ref={inputRef}
              style={styles.hiddenInput}
              value={otpValue}
              onChangeText={handleOtpChange}
              keyboardType="number-pad"
              maxLength={6}
              textContentType="oneTimeCode"
              autoComplete="sms-otp"
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
            />
            <Pressable
              style={styles.otpCellsContainer}
              onPress={() => inputRef.current?.focus()}
            >
              {[0, 1, 2, 3, 4, 5].map((index) => {
                const char = otpValue[index] || "";
                const isCurrent = isFocused && index === otpValue.length;
                const isFilled = index < otpValue.length;

                return (
                  <View
                    key={index}
                    style={[
                      styles.otpCell,
                      {
                        borderRadius: otpCellRadius,
                        borderColor: isCurrent
                          ? colors.brand.default
                          : isFilled
                            ? colors.brand.subtle
                            : loginSoft.borderColor,
                        backgroundColor: isCurrent
                          ? colors.surface.default
                          : loginSoft.backgroundColor,
                      },
                      isCurrent && activeCellShadow,
                    ]}
                  >
                    <Text
                      style={[styles.otpCellText, { color: colors.text.primary }]}
                    >
                      {char}
                    </Text>
                    {isCurrent && cursorVisible && (
                      <View
                        style={[
                          styles.cursor,
                          { backgroundColor: colors.brand.default },
                        ]}
                      />
                    )}
                  </View>
                );
              })}
            </Pressable>
          </View>

          <Pressable
            onPress={handleOtpSubmit}
            onPressIn={ctaPress.handlers.onPressIn}
            onPressOut={ctaPress.handlers.onPressOut}
            disabled={otpValue.length !== 6 || pending}
            style={[
              shellStyles.ctaPressable,
              (otpValue.length !== 6 || pending) && shellStyles.ctaDisabled,
            ]}
            accessibilityRole="button"
            accessibilityLabel="Xác minh mã OTP"
            accessibilityHint="Gửi mã 6 số để xác nhận"
          >
            <Animated.View style={[shellStyles.ctaClip, ctaPress.animatedStyle]}>
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
                  <Text style={shellStyles.ctaLabel}>Tiếp tục</Text>
                )}
              </LinearGradient>
            </Animated.View>
          </Pressable>

          <View style={styles.resendContainer}>
            {countdown > 0 ? (
              <Text
                style={[styles.countdownText, { color: colors.text.secondary }]}
              >
                Gửi lại mã sau{" "}
                <Text style={{ color: colors.brand.text, fontWeight: "700" }}>
                  {formatTime(countdown)}
                </Text>
              </Text>
            ) : (
              <Pressable
                onPress={handleResendOtp}
                accessibilityRole="button"
                accessibilityLabel="Gửi lại mã OTP"
              >
                <Text style={[styles.resendText, { color: colors.brand.text }]}>
                  Gửi lại mã OTP
                </Text>
              </Pressable>
            )}
          </View>
        </View>
      </GlassCard>
    </Animated.View>
  );
}
```
