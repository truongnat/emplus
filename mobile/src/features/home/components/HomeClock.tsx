import React, { useEffect, useState, useMemo } from "react";
import { View, StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  withRepeat,
  withSequence,
  Easing,
  cancelAnimation,
} from "react-native-reanimated";
import { AppText } from "@/src/ui-kit";

// Default colors matching Aura aesthetic
const TEXT_COLOR = "#1C1917"; // taupe900

function Digit({
  digit,
  index,
  digitHeight = 100,
  fontSize = 110,
  width = 68,
}: {
  digit: string;
  index: number;
  digitHeight?: number;
  fontSize?: number;
  width?: number;
}) {
  const num = parseInt(digit, 10);
  const isOpposite = index % 2 !== 0;
  const translateY = useSharedValue(0);

  useEffect(() => {
    const targetY = isOpposite ? -digitHeight * (10 - num) : -digitHeight * num;

    translateY.value = withSpring(targetY, {
      damping: 15,
      stiffness: 100,
    });
  }, [num, isOpposite, digitHeight, translateY]);

  const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  const displayDigits = isOpposite ? [...digits].reverse() : digits;

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });

  return (
    <View style={[styles.digitContainer, { height: digitHeight, width }]}>
      <Animated.View style={animatedStyle}>
        {displayDigits.map((d) => (
          <View key={d} style={[styles.digitWrapper, { height: digitHeight }]}>
            <AppText
              style={[
                styles.digitText,
                { fontSize, lineHeight: digitHeight, width },
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

export const NumberTicker = React.memo(function NumberTicker({
  value,
}: {
  value: number;
}) {
  const digits = useMemo(
    () => value.toString().padStart(3, "0").split(""),
    [value],
  );
  return (
    <View style={styles.tickerRow}>
      {digits.map((d, i) => (
        <Digit key={i} digit={d} index={i} />
      ))}
    </View>
  );
});

function ClockColon() {
  const opacity = useSharedValue(1);

  useEffect(() => {
    opacity.value = withRepeat(
      withSequence(
        withTiming(0.2, { duration: 500, easing: Easing.inOut(Easing.ease) }),
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
      <AppText style={styles.colonText}>:</AppText>
    </Animated.View>
  );
}

function ClockDigit({ digit }: { digit: string }) {
  const D = 28;
  const num = parseInt(digit, 10);
  const translateY = useSharedValue(-D * num);

  useEffect(() => {
    const targetY = -D * num;
    translateY.value = withTiming(targetY, {
      duration: 180,
      easing: Easing.out(Easing.ease),
    });
  }, [num, translateY]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <View style={[styles.clockDigitContainer, { height: D }]}>
      <Animated.View style={animatedStyle}>
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((d) => (
          <View key={d} style={[styles.clockDigitWrapper, { height: D }]}>
            <AppText style={[styles.clockDigitText, { lineHeight: D }]}>
              {d}
            </AppText>
          </View>
        ))}
      </Animated.View>
    </View>
  );
}

export const ClockTicker = React.memo(function ClockTicker() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

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
          {group.map((d, di) => (
            <ClockDigit key={`${gi}-${di}`} digit={d} />
          ))}
          {gi < 2 && <ClockColon />}
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
  digitWrapper: {
    alignItems: "center",
    justifyContent: "center",
  },
  digitText: {
    textAlign: "center",
    fontWeight: "900",
    color: TEXT_COLOR,
    letterSpacing: -2,
  },
  tickerRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  clockTickerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  colonText: {
    width: 14,
    textAlign: "center",
    fontWeight: "800",
    fontSize: 22,
    lineHeight: 28,
    color: TEXT_COLOR,
    opacity: 0.6,
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
    fontWeight: "800",
    color: TEXT_COLOR,
    letterSpacing: 1,
  },
});
