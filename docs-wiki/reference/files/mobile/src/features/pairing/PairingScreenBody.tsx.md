---
title: "mobile/src/features/pairing/PairingScreenBody.tsx"
description: "The PairingScreenBody component is responsible for rendering the pairingscreen body and handling user input for pairing devices, including invite codes and join codes."
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
  page: "reference/files/mobile/src/features/pairing/PairingScreenBody.tsx.md"
  relativePath: "mobile/src/features/pairing/PairingScreenBody.tsx"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/mobile/src/features/pairing/PairingScreenBody.tsx"
  module: "mobile/src/features/pairing"
  workspace: "mobile"
  language: "TypeScript"
  symbolCount: 1
---

# mobile/src/features/pairing/PairingScreenBody.tsx

- Overview: [emplus Docs Wiki](../../../../../../index.md)
- Summary: [SUMMARY](../../../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../../../features/index.md)
- Module: [mobile/src/features/pairing](../../../../../modules/mobile/src/features/pairing.md)
- Workspace: [@emplus/mobile](../../../../../../workspaces/mobile.md)

## Snapshot

- Language: TypeScript
- Source path: `/Users/truongdq/tx/GitHub/emplus/mobile/src/features/pairing/PairingScreenBody.tsx`
- Lines: 455
- Symbols: 1

## AI Summary

The PairingScreenBody component is responsible for rendering the pairingscreen body and handling user input for pairing devices, including invite codes and join codes.

### Responsibilities

- PairingScreenBody

### Usage Notes

- This component uses various utilities like useStyles, useRouter, and useToast to manage state and interact with the UI.

## Public API

- `function PairingScreenBody()`

## Symbols

### function `PairingScreenBody`

- Signature: `function PairingScreenBody()`
- Lines: 49-454
- Exported: yes

```tsx
function PairingScreenBody() {
  const router = useRouter();
  const colors = useThemeColors();
  const { isDark } = useThemeMode();
  const { session, setSession } = useSession();
  const { showToast } = useToast();
  const reducedMotion = useReducedMotion();
  const ctaPress = usePressAnimation();

  const [inviteCode, setInviteCode] = useState("");
  const [joinCode, setJoinCode] = useState("");
  const [timeLeft, setTimeLeft] = useState(120);
  const [isCopied, setIsCopied] = useState(false);
  const [scannerOpen, setScannerOpen] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const feedbackScale = useRef(new Animated.Value(1)).current;

  const placeholderColor = colors.text.secondary;
  const loginPlaceholder = isDark ? placeholderColor : loginFigmaLight.subtitle;
  const loginLabelColor = isDark ? undefined : loginFigmaLight.titleDark;
  const loginSoft = isDark
    ? authSoftFieldSurface.dark
    : authSoftFieldSurface.light;
  const loginInputRadius = !isDark ? loginFigmaLight.inputPillRadius : 16;

  const generateInviteMutation = useMutation({
    mutationFn: () => dependencies.couple.generateInvite.execute(),
    onSuccess: (res) => setInviteCode(res.inviteCode),
    onError: (err: unknown) => {
      const displayError = toDisplayError(err);
      const code =
        err && typeof err === "object" && "code" in err
          ? String((err as { code?: string }).code)
          : "";
      const message =
        err && typeof err === "object" && "message" in err
          ? String((err as { message?: string }).message)
          : "";
      if (
        code === "COUPLE_ALREADY_PAIRED" ||
        displayError.includes("COUPLE_ALREADY_PAIRED") ||
        message.includes("COUPLE_ALREADY_PAIRED")
      ) {
        void dependencies.auth.getProfile.execute().then((latestUser) => {
          if (session) {
            setSession({ ...session, user: latestUser });
          }
          router.replace("/(tabs)/home");
        });
        return;
      }
      showToast(displayError, "error");
    },
  });

  const joinMutation = useMutation({
    mutationFn: (code: string) =>
      dependencies.couple.join.execute({ inviteCode: code }),
    onSuccess: (res) => {
      if (session) {
        setSession({
          ...session,
          user: { ...session.user, coupleId: res.coupleId },
        });
      }
      Keyboard.dismiss();
      router.replace("/(tabs)/home");
    },
    onError: (err) => showToast(toDisplayError(err), "error"),
  });

  useEffect(() => {
    generateInviteMutation.mutate();
    timerRef.current = setInterval(() => {
      setTimeLeft((p) => {
        if (p <= 1) {
          generateInviteMutation.mutate();
          return 120;
        }
        return p - 1;
      });
    }, 1000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- one-shot mount: invite + timer
  }, []);

  useEffect(() => {
    pollRef.current = setInterval(async () => {
      try {
        const status = await dependencies.couple.checkPairingStatus.execute();
        if (status.paired && status.coupleId) {
          if (session) {
            setSession({
              ...session,
              user: { ...session.user, coupleId: status.coupleId },
            });
          }
          router.replace("/(tabs)/home");
        }
      } catch {
        /* ignore poll errors */
      }
    }, 3000);
    return () => {
      if (pollRef.current) clearInterval(pollRef.current);
    };
  }, [session, setSession, router]);

  const handleScanned = useCallback(
    (code: string) => {
      setScannerOpen(false);
      if (code) joinMutation.mutate(code);
    },
    [joinMutation],
  );

  const handleCopy = async () => {
    if (!inviteCode) return;
    await Clipboard.setStringAsync(inviteCode);
    setIsCopied(true);
    Animated.sequence([
      Animated.timing(feedbackScale, {
        toValue: 0.8,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(feedbackScale, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
    setTimeout(() => setIsCopied(false), 2000);
  };

  const enteringHeader = reducedMotion
    ? FadeInDown.duration(0)
    : FadeInDown.delay(40).springify().damping(22).stiffness(180);

  const copyBg = isCopied
    ? colors.status.success.border
    : colors.brand.muted;
  const copyIconColor = isCopied ? "#FFFFFF" : colors.brand.default;
  const copyLabelColor = isCopied ? "#FFFFFF" : colors.brand.default;

  const joinPending = joinMutation.isPending;

  const ctaDisabled = useMemo(
    () => !joinCode || joinPending,
    [joinCode, joinPending],
  );

  return (
    <View style={styles.screenColumn}>
      <View style={styles.upperBlock}>
        <AnimatedRe.View entering={enteringHeader} style={styles.header}>
          <View style={styles.titleWrap}>
            <PairingGradientTitle />
          </View>
          <Text style={[styles.subtitle, { color: colors.text.secondary }]}>
            Kết nối trái tim của hai bạn
          </Text>
        </AnimatedRe.View>

        <View style={styles.lottieWrap}>
          <EmplusLottie
            source={lottieInventory.pairingFamilyLove}
            style={styles.lottieHero}
            loop
            speed={0.9}
          />
        </View>

        <GlassCard
          intensity={
            isDark ? authGlassBlurIntensity.dark : authGlassBlurIntensity.light
          }
          tint={isDark ? "dark" : "light"}
          isLiquid={isLiquidGlassSupported}
          style={styles.qrCard}
        >
          <View style={styles.qrContent}>
            <View style={styles.qrWrapper}>
              {inviteCode ? (
                <View style={styles.qrContainer}>
                  <QRCodeStyled
                    data={inviteCode}
                    size={QR_SIZE}
                    color={QR_MODULE_COLOR}
                    errorCorrectionLevel="H"
                    pieceBorderRadius={4}
                    isPiecesGlued
                    outerEyesOptions={{
                      borderRadius: 14,
                      color: colors.brand.default,
                    }}
                    innerEyesOptions={{
                      borderRadius: 6,
                      color: QR_MODULE_COLOR,
                    }}
                  />
                <View
                  style={[
                    styles.logoOverlay,
                    { backgroundColor: QR_LOGO_BADGE_BG },
                  ]}
                >
                  <Image
                    source={QR_HEART_IMAGE}
                    style={styles.logoImage}
                    resizeMode="contain"
                  />
                </View>
              </View>
            ) : (
              <View style={styles.loaderContainer}>
                <EmplusLottie
                  source={lottieInventory.loader}
                  style={styles.loaderLottie}
                  loop
                />
              </View>
            )}
          </View>

          <View style={styles.timeRow}>
            <Ionicons
              name="time-outline"
              size={16}
              color={colors.text.tertiary}
            />
            <Text style={[styles.timeText, { color: colors.text.secondary }]}>
              Mã làm mới sau:{" "}
              <Text style={[styles.timeBold, { color: colors.brand.default }]}>
                {Math.floor(timeLeft / 60)}:
                {(timeLeft % 60).toString().padStart(2, "0")}
              </Text>
            </Text>
          </View>

          <View style={styles.toolbarRow}>
            <TouchableOpacity
              onPress={handleCopy}
              activeOpacity={0.7}
              style={[styles.toolbarBtn, { backgroundColor: copyBg }]}
              accessibilityRole="button"
              accessibilityLabel={
                isCopied ? "Đã sao chép mã" : "Sao chép mã mời"
              }
            >
              <Animated.View
                style={[
                  styles.toolbarInner,
                  { transform: [{ scale: feedbackScale }] },
                ]}
              >
                <Ionicons
                  name={isCopied ? "checkmark-circle" : "copy-outline"}
                  size={18}
                  color={copyIconColor}
                />
                <Text
                  style={[styles.toolbarLabel, { color: copyLabelColor }]}
                  numberOfLines={1}
                >
                  {isCopied ? "Đã chép" : "Sao chép"}
                </Text>
              </Animated.View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setScannerOpen(true)}
              activeOpacity={0.7}
              style={[
                styles.toolbarBtn,
                styles.toolbarBtnOutline,
                {
                  borderColor: colors.brand.default,
                  backgroundColor: isDark
                    ? "rgba(255,255,255,0.06)"
                    : "rgba(0,0,0,0.03)",
                },
              ]}
              accessibilityRole="button"
              accessibilityLabel="Quét mã QR để nhận lời mời"
            >
              <View style={styles.toolbarInner}>
                <Ionicons
                  name="scan-outline"
                  size={18}
                  color={colors.brand.default}
                />
                <Text
                  style={[styles.toolbarLabel, { color: colors.brand.default }]}
                  numberOfLines={1}
                >
                  Quét mã
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        </GlassCard>
      </View>

      <View style={styles.lowerBlock}>
        <View style={styles.dividerRow}>
          <View
            style={[styles.dividerLine, { backgroundColor: colors.border.default }]}
          />
          <Text style={[styles.dividerText, { color: colors.text.tertiary }]}>
            hoặc
          </Text>
          <View
            style={[styles.dividerLine, { backgroundColor: colors.border.default }]}
          />
        </View>

        <View style={styles.inputSection}>
          <Text style={[styles.inputLabel, { color: colors.text.secondary }]}>
            Mã invite của đối phương — đủ 6 ký tự sẽ tự kết nối
          </Text>

          <Input
            variant="soft"
            labelColor={loginLabelColor}
            softSurface={loginSoft}
            inputRadiusPx={loginInputRadius}
            placeholder="Dán mã tại đây..."
            placeholderTextColor={loginPlaceholder}
            value={joinCode}
            onChangeText={(t) => {
              const code = t.toUpperCase();
              setJoinCode(code);
              if (code.length === 6) joinMutation.mutate(code);
            }}
            autoCapitalize="characters"
            returnKeyType="done"
            maxLength={10}
            onSubmitEditing={() => joinCode && joinMutation.mutate(joinCode)}
            size="lg"
            leadingElement={
              <Ionicons
                name="heart-outline"
                size={22}
                color={colors.brand.default}
                style={{ marginLeft: 12 }}
                accessibilityElementsHidden
                importantForAccessibility="no"
              />
            }
          />

        <Pressable
          onPress={() => joinMutation.mutate(joinCode)}
          onPressIn={ctaPress.handlers.onPressIn}
          onPressOut={ctaPress.handlers.onPressOut}
          disabled={ctaDisabled}
          style={[
            styles.ctaPressable,
            ctaDisabled ? styles.ctaDisabled : null,
          ]}
          accessibilityRole="button"
          accessibilityLabel="Kết nối bằng mã đã nhập"
        >
          <AnimatedRe.View style={[styles.ctaClip, ctaPress.animatedStyle]}>
            <LinearGradient
              colors={
                isDark ? ["#FF8FA3", "#8E7CFF"] : ["#FF6B81", "#7B61FF"]
              }
              locations={[0, 1]}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
              style={styles.ctaGradient}
            >
              {joinPending ? (
                <ActivityIndicator color="#FFFFFF" size="small" />
              ) : (
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  <Text style={styles.ctaLabel}>Kết nối</Text>
                  <Ionicons name="heart" size={20} color="#FFFFFF" />
                </View>
              )}
            </LinearGradient>
          </AnimatedRe.View>
        </Pressable>
        </View>
      </View>

      <QRScannerSheet
        visible={scannerOpen}
        onClose={() => setScannerOpen(false)}
        onScanned={handleScanned}
      />
    </View>
  );
}
```
