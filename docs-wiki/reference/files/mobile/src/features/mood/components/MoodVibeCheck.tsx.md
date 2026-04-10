---
title: "mobile/src/features/mood/components/MoodVibeCheck.tsx"
description: "MoodVibeCheck component"
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
  page: "reference/files/mobile/src/features/mood/components/MoodVibeCheck.tsx.md"
  relativePath: "mobile/src/features/mood/components/MoodVibeCheck.tsx"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/mobile/src/features/mood/components/MoodVibeCheck.tsx"
  module: "mobile/src/features/mood/components"
  workspace: "mobile"
  language: "TypeScript"
  symbolCount: 8
---

# mobile/src/features/mood/components/MoodVibeCheck.tsx

- Overview: [emplus Docs Wiki](../../../../../../../index.md)
- Summary: [SUMMARY](../../../../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../../../../features/index.md)
- Module: [mobile/src/features/mood/components](../../../../../../modules/mobile/src/features/mood/components.md)
- Workspace: [@emplus/mobile](../../../../../../../workspaces/mobile.md)

## Snapshot

- Language: TypeScript
- Source path: `/Users/truongdq/tx/GitHub/emplus/mobile/src/features/mood/components/MoodVibeCheck.tsx`
- Lines: 775
- Symbols: 8

## Related Features

- [Authentication Verification](../../../../../../../features/auth-verify.md) - Authentication Verification captures the verification workflow inside authentication. It spans 2 workspaces. Key flows include Credential validation, Auth login, Auth login.
- [Storage Verification](../../../../../../../features/storage-verify.md) - Storage Verification captures the verification workflow inside storage. It spans 2 workspaces. Key flows include Credential validation, Auth login, Auth login.
- [Integrations Verification](../../../../../../../features/integration-verify.md) - Integrations Verification captures the verification workflow inside integrations. It spans 2 workspaces. Key flows include Credential validation, Auth login, Auth login.

## AI Summary

MoodVibeCheck component

### Usage Notes

- This component checks the current mood of a couple, generating a hex string representation of their desired color palette for a specified timing (e.g., in relation to changes in skin tone or other factors)
- The `mixWithWhite` function generates a mid-tone color combination.
- Usage examples include integrating this component with mobile and Web applications for user feedback, notifications, or progress bars.

## Public API

- `function MoodVibeCheck({ initialValue = 75, onMoodChange, partnerName = "người ấy", }: MoodVibeCheckProps)`

## Symbols

### function `MoodVibeCheck`

- Signature: `function MoodVibeCheck({ initialValue = 75, onMoodChange, partnerName = "người ấy", }: MoodVibeCheckProps)`
- Lines: 220-600
- Exported: yes

```tsx
function MoodVibeCheck({
  initialValue = 75,
  onMoodChange,
  partnerName = "người ấy",
}: MoodVibeCheckProps) {
  const colors = useThemeColors();
  const { isDark } = useThemeMode();
  const { isAuthenticated, hydrated } = useSession();
  const queryClient = useQueryClient();
  const [value, setValue] = useState(initialValue);
  const sliderWidth = useRef(SCREEN_WIDTH - 96);
  const latestDragValueRef = useRef(initialValue);
  const lastLabelFlushRef = useRef(0);
  /** Chỉ hydrate `self` từ API một lần — refetch sau PUT không ghi đè local bằng bản stale. */
  const moodSelfHydratedRef = useRef(false);
  /** Giá trị đã lưu trên server (sau hydrate / PUT thành công) — tránh PUT+toast trùng. */
  const lastPersistedValueRef = useRef<number | null>(null);

  const progressSV = useSharedValue(initialValue);
  const trackW = useSharedValue(Math.max(1, SCREEN_WIDTH - 96));
  const panStartProgress = useSharedValue(initialValue);

  const phase = useRef(new RNAnimated.Value(0)).current;
  const floatAnim = useRef(new RNAnimated.Value(0)).current;

  const { data: moodPayload } = useQuery({
    queryKey: ["coupleMood"],
    queryFn: getCoupleMood,
    staleTime: 15_000,
    enabled: hydrated && isAuthenticated,
  });

  const saveMutation = useMutation({
    mutationFn: (v: number) => putCoupleMood(v),
    onSuccess: (_saved, v) => {
      lastPersistedValueRef.current = v;
      onMoodChange?.(v);
      void queryClient.invalidateQueries({ queryKey: ["coupleMood"] });
    },
  });

  useEffect(() => {
    if (moodSelfHydratedRef.current || moodPayload === undefined) return;
    moodSelfHydratedRef.current = true;
    const v =
      typeof moodPayload.self?.value === "number" ? moodPayload.self.value : initialValue;
    lastPersistedValueRef.current = v;
    progressSV.value = v;
    latestDragValueRef.current = v;
    setValue(v);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- chỉ gán progressSV.value, không cần deps shared value
  }, [moodPayload, initialValue]);

  const mutateMoodRef = useRef(saveMutation.mutateAsync);
  mutateMoodRef.current = saveMutation.mutateAsync;

  const saveMood = useCallback(async (moodValue: number) => {
    const token = tokenManager.getAccessToken()?.trim();
    if (!token) return;
    if (
      lastPersistedValueRef.current !== null &&
      moodValue === lastPersistedValueRef.current
    ) {
      return;
    }
    try {
      await mutateMoodRef.current(moodValue);
    } catch (error) {
      console.error("Error saving mood:", error);
    }
  }, []);

  useEffect(() => {
    const animation = RNAnimated.loop(
      RNAnimated.timing(phase, {
        toValue: 1,
        duration: 20000,
        useNativeDriver: false,
      }),
    );
    animation.start();

    const floating = RNAnimated.loop(
      RNAnimated.sequence([
        RNAnimated.timing(floatAnim, {
          toValue: -15,
          duration: 4000,
          useNativeDriver: true,
        }),
        RNAnimated.timing(floatAnim, {
          toValue: 0,
          duration: 4000,
          useNativeDriver: true,
        }),
      ]),
    );
    floating.start();

    return () => {
      animation.stop();
      floating.stop();
    };
  }, [floatAnim, phase]);

  const vibeTheme = useMemo(() => {
    const c = colors;
    return {
      card: {
        backgroundColor: isDark
          ? homeDarkGridCard.backgroundColor
          : c.background.subtle,
        borderColor: isDark ? homeDarkGridCard.borderColor : c.border.default,
        shadowColor: "#0A0809",
        ...(isDark
          ? {}
          : {
              shadowOpacity: 0.1,
              shadowRadius: 22,
              elevation: 6,
            }),
      },
      moodStatusLabel: { color: c.text.primary },
      sliderEdgeText: {
        color: c.text.secondary,
      },
      track: {
        backgroundColor: isDark
          ? "rgba(255,255,255,0.08)"
          : c.surface.sunken,
        ...(isDark
          ? {}
          : {
              borderWidth: 1,
              borderColor: c.border.default,
            }),
      },
      thumbOuter: {
        backgroundColor: isDark
          ? homeDarkGridCard.backgroundColor
          : c.surface.default,
        borderColor: isDark ? homeDarkGridInset.borderColor : c.border.default,
        shadowColor: "#0A0809",
        ...(isDark
          ? {}
          : {
              borderWidth: 0,
              shadowOpacity: 0.42,
              shadowRadius: 20,
              shadowOffset: { width: 0, height: 7 },
              elevation: 16,
            }),
      },
      tagText: { color: isDark ? c.text.tertiary : c.text.secondary },
      iconMuted: isDark ? c.text.tertiary : c.text.secondary,
      divider: {
        backgroundColor: isDark ? homeDarkGridInset.borderColor : c.border.default,
      },
      hintText: { color: c.text.secondary },
      partnerRowTitle: { color: isDark ? c.text.tertiary : c.text.secondary },
      partnerRowValue: { color: c.text.primary },
      partnerRowScore: { color: c.text.secondary },
      partnerRowPending: { color: c.text.secondary },
    };
  }, [isDark, colors]);

  const moodConfig = useMemo(() => {
    const band = moodBandFromValue(value);
    const text = MOOD_BAND_LABEL_VI[band];
    const color =
      band === "calm"
        ? colors.status.success.text
        : band === "steady"
          ? colors.status.warning.text
          : band === "worried"
            ? colors.brand.default
            : colors.status.error.text;
    return { text, color };
  }, [value, colors]);

  const partnerDisplayName = moodPayload?.partner?.fullName ?? partnerName;
  const partnerMoodValue = moodPayload?.partner?.value;
  const partnerMoodLabel =
    typeof partnerMoodValue === "number"
      ? MOOD_BAND_LABEL_VI[moodBandFromValue(partnerMoodValue)]
      : null;

  /**
   * Worklet chỉ được `scheduleOnRN(fn, ...args)` với hàm ổn định (useCallback).
   * Không dùng `ref.current = fn` rồi `scheduleOnRN(ref.current)` — serialize ref → crash khi gán `.current` sau.
   */
  const flushLabelThrottled = useCallback((n: number) => {
    const t = Date.now();
    if (t - lastLabelFlushRef.current < MOOD_LABEL_FLUSH_MS) return;
    lastLabelFlushRef.current = t;
    latestDragValueRef.current = n;
    setValue(n);
  }, []);

  const onPanFinalize = useCallback(
    (rounded: number) => {
      latestDragValueRef.current = rounded;
      lastLabelFlushRef.current = Date.now();
      setValue(rounded);
      void saveMood(rounded);
    },
    [saveMood],
  );

  useAnimatedReaction(
    () => Math.round(progressSV.value),
    (current, previous) => {
      if (previous === undefined) return;
      if (current !== previous) {
        scheduleOnRN(flushLabelThrottled, current);
      }
    },
    [flushLabelThrottled],
  );

  const panGesture = useMemo(
    () =>
      Gesture.Pan()
        .onBegin(() => {
          panStartProgress.value = progressSV.value;
        })
        .onUpdate((e) => {
          const w = trackW.value;
          const span = Math.max(1, w - THUMB_WIDTH);
          const next = panStartProgress.value + (e.translationX / span) * 100;
          progressSV.value = clamp(next, 0, 100);
        })
        .onFinalize(() => {
          const rounded = Math.round(progressSV.value);
          progressSV.value = rounded;
          scheduleOnRN(onPanFinalize, rounded);
        }),
    [onPanFinalize, panStartProgress, progressSV, trackW],
  );

  const thumbStyle = useAnimatedStyle(() => {
    const w = trackW.value;
    return {
      transform: [
        {
          translateX: (progressSV.value / 100) * w - THUMB_HALF,
        },
      ],
    };
  }, [progressSV, trackW]);

  const glassCardContentStyle = useMemo(
    () => ({
      padding: 24,
      borderWidth: 0,
    }),
    [],
  );

  const moodCardBody = (
    <>
      <View style={styles.header}>
        <AppText style={[styles.moodStatusLabel, vibeTheme.moodStatusLabel]}>
          BẠN ĐANG{" "}
          <AppText style={[styles.moodStatusValue, { color: moodConfig.color }]}>
            {moodConfig.text}
          </AppText>
        </AppText>
      </View>

      <View
        style={styles.sliderArea}
        onLayout={(e) => {
          const w = e.nativeEvent.layout.width;
          sliderWidth.current = w;
          trackW.value = w;
        }}
      >
        <GestureDetector gesture={panGesture}>
          <View style={styles.sliderGestureInner} collapsable={false}>
            <View style={styles.sliderLabels} pointerEvents="none">
              <AppText style={[styles.sliderEdgeText, vibeTheme.sliderEdgeText]}>
                BÌNH THẢN
              </AppText>
              <AppText style={[styles.sliderEdgeText, vibeTheme.sliderEdgeText]}>
                CĂNG THẲNG
              </AppText>
            </View>

            <View style={[styles.track, vibeTheme.track]} pointerEvents="none">
              <LinearGradient
                colors={["#10B981", "#FACC15", "#FB7185"]}
                start={{ x: 0, y: 0.5 }}
                end={{ x: 1, y: 0.5 }}
                style={styles.trackGradient}
              />
            </View>

            <Reanimated.View style={[styles.thumbContainer, thumbStyle]}>
              {!isDark ? (
                <View style={styles.thumbLightOuterRing} pointerEvents="none" />
              ) : null}
              <View style={[styles.thumbOuter, vibeTheme.thumbOuter]}>
                <View style={[styles.thumbInner, { backgroundColor: moodConfig.color }]} />
              </View>
            </Reanimated.View>
          </View>
        </GestureDetector>
      </View>

      <View style={styles.footerInfo}>
        <View style={styles.infoTag}>
          <MaterialCommunityIcons
            name="waves"
            size={16}
            color={vibeTheme.iconMuted}
          />
          <AppText style={[styles.tagText, vibeTheme.tagText]}>DỊU ÊM</AppText>
        </View>
        <View style={styles.infoTag}>
          <AppText style={[styles.tagText, vibeTheme.tagText]}>MẠNH MẼ</AppText>
          <Ionicons name="flash" size={14} color={vibeTheme.iconMuted} />
        </View>
      </View>

      {moodPayload?.partner ? (
        <>
          <View style={[styles.divider, vibeTheme.divider]} />
          <View style={styles.partnerRow}>
            <AppText style={[styles.partnerRowTitle, vibeTheme.partnerRowTitle]}>
              {partnerDisplayName.toUpperCase()}
            </AppText>
            {partnerMoodLabel != null ? (
              <AppText style={[styles.partnerRowValue, vibeTheme.partnerRowValue]}>
                {partnerMoodLabel}
                <AppText style={[styles.partnerRowScore, vibeTheme.partnerRowScore]}>
                  {" "}
                  · {partnerMoodValue}
                </AppText>
              </AppText>
            ) : (
              <AppText style={[styles.partnerRowPending, vibeTheme.partnerRowPending]}>
                Chưa cập nhật tâm trạng
              </AppText>
            )}
          </View>
        </>
      ) : null}

      <View style={[styles.divider, vibeTheme.divider]} />
      <AppText style={[styles.hintText, vibeTheme.hintText]}>
        Buông tay để lưu — cả hai sẽ thấy trên tab Cảm xúc khi đã ghép đôi.
      </AppText>
    </>
  );

  return (
    <View
      style={styles.mainContainer}
      accessibilityRole="adjustable"
      accessibilityLabel="Mood slider"
      accessibilityValue={{ min: 0, max: 100, now: value }}
    >
      <VisualArea phase={phase} floatAnim={floatAnim} moodT={value / 100} />

      {isDark ? (
        <GlassCard
          intensity={authGlassBlurIntensity.dark}
          tint="dark"
          isLiquid={isLiquidGlassSupported}
          style={styles.cardGlassShell}
          contentStyle={glassCardContentStyle}
          darkOverlayGradient={CARE_MOOD_DARK_GLASS_GRADIENT}
        >
          {moodCardBody}
        </GlassCard>
      ) : (
        <View style={[styles.card, vibeTheme.card]}>{moodCardBody}</View>
      )}
    </View>
  );
}
```

### function `parseHex`

- Signature: `function parseHex(hex: string): { r: number; g: number; b: number }`
- Lines: 51-58
- Exported: no
- Summary: '#RRGGBBAA' hex code representing RGB values

```tsx
function parseHex(hex: string): { r: number; g: number; b: number } {
  const h = hex.replace("#", "");
  return {
    r: parseInt(h.slice(0, 2), 16),
    g: parseInt(h.slice(2, 4), 16),
    b: parseInt(h.slice(4, 6), 16),
  };
}
```

### function `toHex`

- Signature: `function toHex(r: number, g: number, b: number): string`
- Lines: 60-66
- Exported: no
- Summary: converts an RGB value to a hexadecimal string

```tsx
function toHex(r: number, g: number, b: number): string {
  const c = (n: number) =>
    Math.round(Math.min(255, Math.max(0, n)))
      .toString(16)
      .padStart(2, "0");
  return `#${c(r)}${c(g)}${c(b)}`;
}
```

### function `lerpHex`

- Signature: `function lerpHex(a: string, b: string, t: number): string`
- Lines: 68-77
- Exported: no

```tsx
function lerpHex(a: string, b: string, t: number): string {
  const A = parseHex(a);
  const B = parseHex(b);
  const x = Math.min(1, Math.max(0, t));
  return toHex(
    A.r + (B.r - A.r) * x,
    A.g + (B.g - A.g) * x,
    A.b + (B.b - A.b) * x,
  );
}
```

### function `interpolateTrackColor`

- Signature: `function interpolateTrackColor(t: number): string`
- Lines: 80-84
- Exported: no
- Summary: generates an interpolated color for a given time value within a specified track's duration

```tsx
function interpolateTrackColor(t: number): string {
  const x = Math.min(1, Math.max(0, t));
  if (x <= 0.5) return lerpHex(TRACK_GREEN, TRACK_YELLOW, x * 2);
  return lerpHex(TRACK_YELLOW, TRACK_PINK, (x - 0.5) * 2);
}
```

### function `mixWithWhite`

- Signature: `function mixWithWhite(hex: string, amount: number): string`
- Lines: 86-94
- Exported: no
- Summary: 'R' (red), '' and '' (green)

```tsx
function mixWithWhite(hex: string, amount: number): string {
  const { r, g, b } = parseHex(hex);
  const a = Math.min(1, Math.max(0, amount));
  return toHex(
    r + (255 - r) * a,
    g + (255 - g) * a,
    b + (255 - b) * a,
  );
}
```

### function `moodBlobStops`

- Signature: `function moodBlobStops(moodT: number)`
- Lines: 96-107
- Exported: no

```tsx
function moodBlobStops(moodT: number) {
  const core = interpolateTrackColor(moodT);
  const coreB = interpolateTrackColor(Math.min(1, moodT + 0.12));
  return {
    g1a: core,
    g1b: mixWithWhite(core, 0.38),
    g1c: mixWithWhite(core, 0.55),
    g2a: coreB,
    g2b: mixWithWhite(coreB, 0.35),
    g2c: mixWithWhite(coreB, 0.52),
  };
}
```

### interface `MoodVibeCheckProps`

- Signature: `interface MoodVibeCheckProps`
- Lines: 112-116
- Exported: no

```tsx
interface MoodVibeCheckProps {
  initialValue?: number;
  onMoodChange?: (value: number) => void;
  partnerName?: string;
}
```
