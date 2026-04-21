import React, { useEffect, useState, useMemo, useRef } from "react";
import {
  View,
  StyleSheet,
  Platform,
  type TextStyle,
  type ViewStyle,
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSequence,
  Easing,
  cancelAnimation,
} from "react-native-reanimated";
import { AppText } from "@/src/ui-kit";
import { useThemeColors } from "@/src/theme";
import { typographyRoles } from "@/src/theme/typography-roles";

export type ClockTickerTone = "default" | "onHero";

const DIGIT_ROLL_MS = 420;
const DIGIT_ROLL_EASING = Easing.out(Easing.cubic);

const digitFontStyle: TextStyle = Platform.select({
  ios: { fontVariant: ["tabular-nums"] },
  default: {},
});

function Digit({
  digit,
  digitColor,
  digitHeight = 100,
  fontSize = 90,
  width = 58,
  containerStyle,
}: {
  digit: string;
  /** Mặc định `text.primary` — hero dùng brand/secondary để tránh đen thuần */
  digitColor?: string;
  digitHeight?: number;
  fontSize?: number;
  width?: number;
  /** Kéo các cột sát nhau (khoảng cách giữa 01) */
  containerStyle?: ViewStyle;
}) {
  const colors = useThemeColors();
  const resolvedColor = digitColor ?? colors.text.primary;
  const num = Number.parseInt(digit, 10);
  const safeNum = Number.isNaN(num) ? 0 : num;
  const targetY = -digitHeight * safeNum;
  const translateY = useSharedValue(targetY);

  useEffect(() => {
    translateY.value = withTiming(targetY, {
      duration: DIGIT_ROLL_MS,
      easing: DIGIT_ROLL_EASING,
    });
  }, [targetY, translateY]);

  const displayDigits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });

  return (
    <View
      style={[styles.digitContainer, { height: digitHeight, width }, containerStyle]}
    >
      <Animated.View style={animatedStyle}>
        {displayDigits.map((d) => (
          <View key={d} style={[styles.digitWrapper, { height: digitHeight }]}>
            <AppText
              style={[
                styles.digitText,
                digitFontStyle,
                {
                  fontSize,
                  lineHeight: digitHeight,
                  width,
                  color: resolvedColor,
                },
              ]}
            >
              {d}
            </AppText>
          </View>
        ))}
      </Animated.View>
    </View>
  );
}

function formatDayDigits(value: number): string[] {
  const v = Math.max(0, Math.floor(Number.isFinite(value) ? value : 0));
  if (v >= 100) {
    return String(v).padStart(3, "0").split("");
  }
  return String(v).padStart(2, "0").split("");
}

export const NumberTicker = React.memo(function NumberTicker({
  value,
  digitColor,
}: {
  value: number;
  digitColor?: string;
}) {
  const digits = useMemo(() => formatDayDigits(value), [value]);
  return (
    <View style={styles.tickerRow}>
      {digits.map((d, i) => (
        <Digit
          key={`${i}-${digits.length}`}
          digit={d}
          digitColor={digitColor}
          containerStyle={i > 0 ? styles.digitTightOverlap : undefined}
        />
      ))}
    </View>
  );
});

function ClockColon({ tone }: { tone: ClockTickerTone }) {
  const colors = useThemeColors();
  const opacity = useSharedValue(0);
  const baseColor =
    tone === "onHero" ? colors.text.secondary : colors.text.primary;

  useEffect(() => {
    opacity.value = withTiming(1, { duration: 300, easing: Easing.out(Easing.quad) });
  }, [opacity]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <Animated.View style={animatedStyle}>
      <AppText style={[styles.colonText, { color: baseColor }]}>
        :
      </AppText>
    </Animated.View>
  );
}

/**
 * `Date` cập nhật đúng mốc giây hệ thống — tránh lệch `setInterval(1000)` và giật Lottie/đồng hồ.
 */
export function useAlignedClockNow(): Date {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    let cancelled = false;
    let timeoutId: ReturnType<typeof setTimeout>;

    const arm = () => {
      const ms = 1000 - (Date.now() % 1000);
      timeoutId = setTimeout(() => {
        if (cancelled) return;
        setNow(new Date());
        arm();
      }, ms);
    };

    arm();
    return () => {
      cancelled = true;
      clearTimeout(timeoutId);
    };
  }, []);

  return now;
}

function clockDigitMeta(
  groupIndex: number,
  digitIndex: number,
): { modulo: number; rollMs: number } {
  const isSeconds = groupIndex === 2;
  const isTens = digitIndex === 0;
  if (isSeconds) {
    return { modulo: isTens ? 6 : 10, rollMs: 1000 };
  }
  if (groupIndex === 1 && isTens) {
    return { modulo: 6, rollMs: 420 };
  }
  /** 24h: chữ số hàng chục giờ chỉ 0–2 — cần vòng 2→0 lúc nửa đêm */
  if (groupIndex === 0 && isTens) {
    return { modulo: 3, rollMs: 360 };
  }
  return { modulo: 10, rollMs: 320 };
}

function ClockDigit({
  digit,
  tone,
  modulo,
  rollMs,
}: {
  digit: string;
  tone: ClockTickerTone;
  modulo: number;
  rollMs: number;
}) {
  const colors = useThemeColors();
  const D = 28;
  const num = Number.parseInt(digit, 10);
  const safeNum = Number.isNaN(num) ? 0 : Math.min(num, modulo - 1);
  const translateY = useSharedValue(-D * safeNum);
  /** Ký tự trước — đáng tin cậy hơn `prev` số khi animation bị hủy / chồng lấn (vd. 59→00). */
  const prevDigitCharRef = useRef<string | null>(null);
  const digitColor =
    tone === "onHero" ? colors.text.secondary : colors.text.primary;

  const cells = useMemo(
    () => Array.from({ length: modulo + 1 }, (_, i) => (i < modulo ? i : 0)),
    [modulo],
  );

  useEffect(() => {
    const n = Number.parseInt(digit, 10);
    const clamped = Number.isNaN(n) ? 0 : Math.min(n, modulo - 1);
    const prevChar = prevDigitCharRef.current;

    if (prevChar === null) {
      translateY.value = -D * clamped;
      prevDigitCharRef.current = digit;
      return;
    }

    if (prevChar === digit) {
      return;
    }

    const prevN = Number.parseInt(prevChar, 10);
    const prevClamped = Number.isNaN(prevN)
      ? 0
      : Math.min(prevN, modulo - 1);

    /** Cuộn xuôi qua ô 0 trùng — chỉ khi mã trước đúng là (modulo-1) và hiện tại là 0 */
    const wrapForward =
      clamped === 0 && prevClamped === modulo - 1;

    cancelAnimation(translateY);

    if (wrapForward) {
      translateY.value = withSequence(
        withTiming(-modulo * D, {
          duration: rollMs,
          easing: Easing.linear,
        }),
        withTiming(0, { duration: 0 }),
      );
    } else {
      translateY.value = withTiming(-D * clamped, {
        duration: rollMs,
        easing: Easing.out(Easing.cubic),
      });
    }
    prevDigitCharRef.current = digit;
  }, [digit, D, modulo, rollMs]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <View style={[styles.clockDigitContainer, { height: D }]}>
      <Animated.View style={animatedStyle}>
        {cells.map((d, i) => (
          <View key={i} style={[styles.clockDigitWrapper, { height: D }]}>
            <AppText
              style={[
                styles.clockDigitText,
                {
                  lineHeight: D,
                  color: digitColor,
                  fontFamily: typographyRoles.numeric.fontFamily,
                },
              ]}
            >
              {d}
            </AppText>
          </View>
        ))}
      </Animated.View>
    </View>
  );
}

export const ClockTicker = React.memo(function ClockTicker({
  tone = "default",
}: {
  tone?: ClockTickerTone;
}) {
  const now = useAlignedClockNow();

  const timeDigits = useMemo(() => {
    const hh = String(now.getHours()).padStart(2, "0").split("");
    const mm = String(now.getMinutes()).padStart(2, "0").split("");
    const ss = String(now.getSeconds()).padStart(2, "0").split("");
    return { hh, mm, ss };
  }, [now]);

  return (
    <View style={styles.clockTickerRow}>
      {[timeDigits.hh, timeDigits.mm, timeDigits.ss].map((group, gi) => (
        <View key={gi} style={styles.clockTickerRow}>
          {group.map((d, di) => {
            const { modulo, rollMs } = clockDigitMeta(gi, di);
            return (
              <ClockDigit
                key={`${gi}-${di}`}
                digit={d}
                tone={tone}
                modulo={modulo}
                rollMs={rollMs}
              />
            );
          })}
          {gi < 2 && <ClockColon tone={tone} />}
        </View>
      ))}
    </View>
  );
});

export function HomeClock() {
  return <ClockTicker />;
}

const styles = StyleSheet.create({
  digitContainer: {
    overflow: "hidden",
    alignItems: "center",
  },
  /** Thu hẹp khe giữa hai chữ số lớn (01) */
  digitTightOverlap: {
    marginLeft: -6,
  },
  digitWrapper: {
    alignItems: "center",
    justifyContent: "center",
  },
  digitText: {
    textAlign: "center",
    fontWeight: "900",
    letterSpacing: 0,
    includeFontPadding: false,
  },
  tickerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "nowrap",
    gap: 0,
  },
  clockTickerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  colonText: {
    width: 14,
    textAlign: "center",
    fontWeight: "700",
    fontSize: 22,
    lineHeight: 28,
    fontFamily: typographyRoles.numeric.fontFamily,
  },
  clockDigitContainer: {
    overflow: "hidden",
    width: 18,
    alignItems: "center",
  },
  clockDigitWrapper: {
    alignItems: "center",
    justifyContent: "center",
  },
  clockDigitText: {
    width: 18,
    textAlign: "center",
    fontSize: 22,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
});
