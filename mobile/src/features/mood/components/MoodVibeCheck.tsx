import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Animated as RNAnimated, View, Dimensions, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import Svg, { Defs, RadialGradient, Stop, Circle, G } from "react-native-svg";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Reanimated, {
  clamp,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { scheduleOnRN } from "react-native-worklets";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AppText } from "@/src/components/atoms/Text";
import { getCoupleMood, putCoupleMood } from "@/src/api";
import { tokenManager } from "@/src/core/api/token-manager";
import { useSession } from "@/src/session-context";
import { useThemeColors, useThemeMode } from "@/src/theme";
import {
  authGlassBlurIntensity,
  homeDarkGridCard,
  homeDarkGridInset,
} from "@/src/theme/emplus-design-tokens";
import { GlassCard } from "@/src/components/glass/GlassCard";
import { isLiquidGlassSupported } from "@/src/components/glass/LiquidGlassView";
import { MOOD_BAND_LABEL_VI, moodBandFromValue } from "../mood-band";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

/** Blob tâm trạng phía trên — nhỏ hơn bản 280px để gọn màn Care */
const MOOD_BLOB_SIZE = 200;
const MOOD_VISUAL_HEIGHT = Math.round((260 * MOOD_BLOB_SIZE) / 280);

const THUMB_WIDTH = 56;
const THUMB_HALF = 28;

/** expo-blur: overlay mỏng để lưới + aura Care lọt qua (khác form auth đặc hơn). */
const CARE_MOOD_DARK_GLASS_GRADIENT = [
  "rgba(30, 20, 24, 0.36)",
  "rgba(16, 10, 14, 0.28)",
] as const;
/** Tối đa ~10 lần/giây cập nhật blob + chữ từ UI thread (đủ mượt, ít setState). */
const MOOD_LABEL_FLUSH_MS = 100;

/** Cùng dải với `LinearGradient` của thanh slider */
const TRACK_GREEN = "#10B981";
const TRACK_YELLOW = "#FACC15";
const TRACK_PINK = "#FB7185";

function parseHex(hex: string): { r: number; g: number; b: number } {
  const h = hex.replace("#", "");
  return {
    r: parseInt(h.slice(0, 2), 16),
    g: parseInt(h.slice(2, 4), 16),
    b: parseInt(h.slice(4, 6), 16),
  };
}

function toHex(r: number, g: number, b: number): string {
  const c = (n: number) =>
    Math.round(Math.min(255, Math.max(0, n)))
      .toString(16)
      .padStart(2, "0");
  return `#${c(r)}${c(g)}${c(b)}`;
}

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

/** t ∈ [0,1] dọc theo slider: xanh → vàng → hồng */
function interpolateTrackColor(t: number): string {
  const x = Math.min(1, Math.max(0, t));
  if (x <= 0.5) return lerpHex(TRACK_GREEN, TRACK_YELLOW, x * 2);
  return lerpHex(TRACK_YELLOW, TRACK_PINK, (x - 0.5) * 2);
}

function mixWithWhite(hex: string, amount: number): string {
  const { r, g, b } = parseHex(hex);
  const a = Math.min(1, Math.max(0, amount));
  return toHex(
    r + (255 - r) * a,
    g + (255 - g) * a,
    b + (255 - b) * a,
  );
}

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

const AnimatedCircle = RNAnimated.createAnimatedComponent(Circle);
const AnimatedG = RNAnimated.createAnimatedComponent(G);

interface MoodVibeCheckProps {
  initialValue?: number;
  onMoodChange?: (value: number) => void;
  partnerName?: string;
}

const VisualArea = React.memo(
  ({
    phase,
    floatAnim,
    moodT,
  }: {
    phase: RNAnimated.Value;
    floatAnim: RNAnimated.Value;
    moodT: number;
  }) => {
    const SVG_SIZE = MOOD_BLOB_SIZE;
    const CENTER = SVG_SIZE / 2;
    const stops = useMemo(() => moodBlobStops(moodT), [moodT]);

    const b1_cx = phase.interpolate({
      inputRange: [0, 0.25, 0.5, 0.75, 1],
      outputRange: [CENTER, CENTER + 20, CENTER, CENTER - 20, CENTER],
    });
    const b1_cy = phase.interpolate({
      inputRange: [0, 0.25, 0.5, 0.75, 1],
      outputRange: [CENTER, CENTER - 20, CENTER + 20, CENTER - 15, CENTER],
    });
    const b1_r = phase.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [SVG_SIZE * 0.4, SVG_SIZE * 0.44, SVG_SIZE * 0.4],
    });

    const b2_cx = phase.interpolate({
      inputRange: [0, 0.25, 0.5, 0.75, 1],
      outputRange: [CENTER - 30, CENTER, CENTER + 30, CENTER, CENTER - 30],
    });
    const b2_cy = phase.interpolate({
      inputRange: [0, 0.25, 0.5, 0.75, 1],
      outputRange: [CENTER + 30, CENTER, CENTER - 30, CENTER + 15, CENTER + 30],
    });
    const b2_r = phase.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [SVG_SIZE * 0.38, SVG_SIZE * 0.34, SVG_SIZE * 0.38],
    });

    return (
      <RNAnimated.View
        style={[
          styles.visualContainer,
          { transform: [{ translateY: floatAnim }] },
        ]}
      >
        <Svg
          width={SVG_SIZE}
          height={SVG_SIZE}
          viewBox={`0 0 ${SVG_SIZE} ${SVG_SIZE}`}
          style={styles.svgAbsolute}
        >
          <Defs>
            <RadialGradient
              id="vibeGrad1"
              cx="50%"
              cy="50%"
              rx="50%"
              ry="50%"
              fx="50%"
              fy="50%"
            >
              <Stop offset="0%" stopColor={stops.g1a} stopOpacity="0.82" />
              <Stop offset="70%" stopColor={stops.g1b} stopOpacity="0.32" />
              <Stop offset="100%" stopColor={stops.g1c} stopOpacity="0" />
            </RadialGradient>
            <RadialGradient
              id="vibeGrad2"
              cx="50%"
              cy="50%"
              rx="50%"
              ry="50%"
              fx="50%"
              fy="50%"
            >
              <Stop offset="0%" stopColor={stops.g2a} stopOpacity="0.72" />
              <Stop offset="70%" stopColor={stops.g2b} stopOpacity="0.22" />
              <Stop offset="100%" stopColor={stops.g2c} stopOpacity="0" />
            </RadialGradient>
          </Defs>

          <AnimatedG>
            <AnimatedCircle
              cx={b1_cx}
              cy={b1_cy}
              r={b1_r}
              fill="url(#vibeGrad1)"
            />
            <AnimatedCircle
              cx={b2_cx}
              cy={b2_cy}
              r={b2_r}
              fill="url(#vibeGrad2)"
            />
          </AnimatedG>
        </Svg>
      </RNAnimated.View>
    );
  },
);

export function MoodVibeCheck({
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
          : c.surface.default,
        borderColor: isDark ? homeDarkGridCard.borderColor : c.border.subtle,
        shadowColor: isDark ? "#0A0809" : c.text.primary,
      },
      moodStatusLabel: { color: c.text.primary },
      sliderEdgeText: {
        color: isDark ? c.text.secondary : c.text.tertiary,
      },
      track: {
        backgroundColor: isDark
          ? "rgba(255,255,255,0.08)"
          : c.surface.sunken,
      },
      thumbOuter: {
        backgroundColor: isDark
          ? homeDarkGridCard.backgroundColor
          : c.surface.default,
        borderColor: isDark ? homeDarkGridInset.borderColor : c.border.subtle,
        shadowColor: isDark ? "#0A0809" : "#000000",
      },
      tagText: { color: c.text.tertiary },
      iconMuted: c.text.tertiary,
      divider: {
        backgroundColor: isDark ? homeDarkGridInset.borderColor : c.border.subtle,
      },
      hintText: { color: c.text.secondary },
      partnerRowTitle: { color: c.text.tertiary },
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

const styles = StyleSheet.create({
  mainContainer: {
    width: "100%",
    alignItems: "center",
  },
  visualContainer: {
    width: MOOD_BLOB_SIZE,
    height: MOOD_VISUAL_HEIGHT,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 6,
  },
  svgAbsolute: {
    position: "absolute",
  },
  card: {
    width: SCREEN_WIDTH - 48,
    borderRadius: 32,
    padding: 24,
    borderWidth: 1,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.05,
    shadowRadius: 20,
    elevation: 4,
  },
  cardGlassShell: {
    width: SCREEN_WIDTH - 48,
    alignSelf: "center",
    borderRadius: 32,
    overflow: "hidden",
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: homeDarkGridCard.borderColor,
    shadowColor: "#0A0809",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.14,
    shadowRadius: 22,
    elevation: 5,
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
  },
  moodStatusLabel: {
    fontSize: 18,
    fontWeight: "900",
    textAlign: "center",
  },
  moodStatusValue: {
    fontWeight: "900",
  },
  sliderArea: {
    height: 80,
    justifyContent: "center",
    marginTop: 4,
  },
  sliderGestureInner: {
    height: "100%",
    width: "100%",
    justifyContent: "center",
  },
  sliderLabels: {
    flexDirection: "row",
    justifyContent: "space-between",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
  },
  sliderEdgeText: {
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 1,
  },
  track: {
    height: 10,
    borderRadius: 5,
    overflow: "hidden",
  },
  trackGradient: {
    flex: 1,
  },
  thumbContainer: {
    position: "absolute",
    width: 56,
    height: 56,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 30,
  },
  thumbOuter: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 4,
    alignItems: "center",
    justifyContent: "center",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  thumbInner: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  footerInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 4,
    marginBottom: 20,
  },
  infoTag: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  tagText: {
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 0.5,
  },
  divider: {
    height: 1,
    marginBottom: 16,
  },
  hintText: {
    fontSize: 12,
    fontWeight: "600",
    textAlign: "center",
    lineHeight: 18,
  },
  partnerRow: {
    marginBottom: 16,
    alignItems: "center",
    gap: 4,
  },
  partnerRowTitle: {
    fontSize: 9,
    fontWeight: "800",
    letterSpacing: 1.2,
  },
  partnerRowValue: {
    fontSize: 15,
    fontWeight: "800",
    textAlign: "center",
  },
  partnerRowScore: {
    fontWeight: "700",
  },
  partnerRowPending: {
    fontSize: 13,
    fontWeight: "600",
    textAlign: "center",
  },
});
