---
title: "mobile/src/features/home/components/HomeClock.tsx"
description: "Home Clock component functions and returns a ClockTicker."
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
  page: "reference/files/mobile/src/features/home/components/HomeClock.tsx.md"
  relativePath: "mobile/src/features/home/components/HomeClock.tsx"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/mobile/src/features/home/components/HomeClock.tsx"
  module: "mobile/src/features/home/components"
  workspace: "mobile"
  language: "TypeScript"
  symbolCount: 8
---

# mobile/src/features/home/components/HomeClock.tsx

- Overview: [emplus Docs Wiki](../../../../../../../index.md)
- Summary: [SUMMARY](../../../../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../../../../features/index.md)
- Module: [mobile/src/features/home/components](../../../../../../modules/mobile/src/features/home/components.md)
- Workspace: [@emplus/mobile](../../../../../../../workspaces/mobile.md)

## Snapshot

- Language: TypeScript
- Source path: `/Users/truongdq/tx/GitHub/emplus/mobile/src/features/home/components/HomeClock.tsx`
- Lines: 405
- Symbols: 8

## AI Summary

Home Clock component functions and returns a ClockTicker.

### Responsibilities

- Function that determines the current date and time for the aligned clock
- Function that formats the day digits of the hour
- Component that displays the colon
- Responsible for returning the ClockTicker instance

## Public API

- `type ClockTickerTone = "default" | "onHero";`
- `function useAlignedClockNow(): Date`
- `function HomeClock()`

## Symbols

### type `ClockTickerTone`

- Signature: `type ClockTickerTone = "default" | "onHero";`
- Lines: 22-22
- Exported: yes

```tsx
type ClockTickerTone = "default" | "onHero";
```

### function `useAlignedClockNow`

- Signature: `function useAlignedClockNow(): Date`
- Lines: 166-190
- Exported: yes

```tsx
function useAlignedClockNow(): Date {
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
```

### function `HomeClock`

- Signature: `function HomeClock()`
- Lines: 345-347
- Exported: yes

```tsx
function HomeClock() {
  return <ClockTicker />;
}
```

### function `Digit`

- Signature:

```tsx
function Digit({ digit, digitColor, digitHeight = 100, fontSize = 90, width = 58, containerStyle, }: { digit: string; /** Mặc định `text.primary` — hero dùng brand/secondary để tránh đen thuần */ digitColor?: string; digitHeight?: number; fontSize?: number; width?: number; /** Kéo các cột sát nhau (khoảng cách giữa 01) */ containerStyle?: ViewStyle; })
```
- Lines: 32-97
- Exported: no

```tsx
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
```

### function `formatDayDigits`

- Signature: `function formatDayDigits(value: number): string[]`
- Lines: 99-105
- Exported: no

```tsx
function formatDayDigits(value: number): string[] {
  const v = Math.max(0, Math.floor(Number.isFinite(value) ? value : 0));
  if (v >= 100) {
    return String(v).padStart(3, "0").split("");
  }
  return String(v).padStart(2, "0").split("");
}
```

### function `ClockColon`

- Signature: `function ClockColon({ tone }: { tone: ClockTickerTone })`
- Lines: 129-161
- Exported: no

```tsx
function ClockColon({ tone }: { tone: ClockTickerTone }) {
  const colors = useThemeColors();
  const opacity = useSharedValue(1);
  const baseColor =
    tone === "onHero" ? colors.text.secondary : colors.text.primary;

  useEffect(() => {
    opacity.value = withRepeat(
      withSequence(
        withTiming(0.35, { duration: 500, easing: Easing.inOut(Easing.ease) }),
        withTiming(1, { duration: 500, easing: Easing.inOut(Easing.ease) }),
      ),
      -1,
      false,
    );

    return () => {
      cancelAnimation(opacity);
    };
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
```

### function `clockDigitMeta`

- Signature: `function clockDigitMeta( groupIndex: number, digitIndex: number, ): { modulo: number; rollMs: number }`
- Lines: 192-209
- Exported: no

```tsx
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
```

### function `ClockDigit`

- Signature: `function ClockDigit({ digit, tone, modulo, rollMs, }: { digit: string; tone: ClockTickerTone; modulo: number; rollMs: number; })`
- Lines: 211-306
- Exported: no

```tsx
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
```
