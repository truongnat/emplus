import React, { useEffect, useMemo, useRef, useState } from "react";
import { Animated, PanResponder, View, Dimensions, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import Svg, { Defs, RadialGradient, Stop, Circle, G } from "react-native-svg";
import { AppText } from "@/src/components/atoms/Text";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedG = Animated.createAnimatedComponent(G);

const MOOD_STORAGE_KEY = "@emplus:mood-history";

interface MoodVibeCheckProps {
  initialValue?: number;
  onMoodChange?: (value: number) => void;
  partnerName?: string;
}

const VisualArea = React.memo(
  ({
    phase,
    floatAnim,
  }: {
    phase: Animated.Value;
    floatAnim: Animated.Value;
  }) => {
    const SVG_SIZE = 280;
    const CENTER = SVG_SIZE / 2;

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
      <Animated.View
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
              <Stop offset="0%" stopColor="#FB7185" stopOpacity="0.8" />
              <Stop offset="70%" stopColor="#FDA4AF" stopOpacity="0.3" />
              <Stop offset="100%" stopColor="#FDA4AF" stopOpacity="0" />
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
              <Stop offset="0%" stopColor="#E48B9B" stopOpacity="0.7" />
              <Stop offset="70%" stopColor="#FBCFE8" stopOpacity="0.2" />
              <Stop offset="100%" stopColor="#FBCFE8" stopOpacity="0" />
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
      </Animated.View>
    );
  },
);

export function MoodVibeCheck({
  initialValue = 75,
  onMoodChange,
  partnerName = "người ấy",
}: MoodVibeCheckProps) {
  const [value, setValue] = useState(initialValue);
  const [isSliding, setIsSliding] = useState(false);
  const sliderWidth = useRef(SCREEN_WIDTH - 96);
  const saveTimeout = useRef<NodeJS.Timeout | null>(null);

  const phase = useRef(new Animated.Value(0)).current;
  const floatAnim = useRef(new Animated.Value(0)).current;

  // Load saved mood on mount
  useEffect(() => {
    const loadSavedMood = async () => {
      try {
        const savedMood = await AsyncStorage.getItem(MOOD_STORAGE_KEY);
        if (savedMood) {
          const parsed = JSON.parse(savedMood);
          const today = new Date().toDateString();
          if (parsed.date === today) {
            setValue(parsed.value);
          }
        }
      } catch (error) {
        console.error("Error loading mood:", error);
      }
    };
    loadSavedMood();
  }, []);

  const saveMood = async (moodValue: number) => {
    try {
      const moodData = {
        value: moodValue,
        date: new Date().toDateString(),
        timestamp: Date.now(),
      };
      await AsyncStorage.setItem(MOOD_STORAGE_KEY, JSON.stringify(moodData));
    } catch (error) {
      console.error("Error saving mood:", error);
    }
  };

  const debouncedSaveMood = (moodValue: number) => {
    if (saveTimeout.current) {
      clearTimeout(saveTimeout.current);
    }
    saveTimeout.current = setTimeout(() => {
      saveMood(moodValue);
      onMoodChange?.(moodValue);
    }, 300) as any;
  };

  useEffect(() => {
    const animation = Animated.loop(
      Animated.timing(phase, {
        toValue: 1,
        duration: 20000,
        useNativeDriver: false,
      }),
    );
    animation.start();

    const floating = Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: -15,
          duration: 4000,
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim, {
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

  const getMoodConfig = (val: number) => {
    if (val < 25) return { text: "Yên tâm", color: "#10B981" };
    if (val < 50) return { text: "Ổn định", color: "#EAB308" };
    if (val < 75) return { text: "Lo lắng", color: "#E48B9B" };
    return { text: "Căng thẳng", color: "#FB7185" };
  };

  const moodConfig = useMemo(() => getMoodConfig(value), [value]);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        setIsSliding(true);
      },
      onPanResponderMove: (_, gestureState) => {
        const currentWidth = sliderWidth.current;
        const cardLeftOffset = (SCREEN_WIDTH - currentWidth) / 2;
        const relativeX = gestureState.moveX - cardLeftOffset;
        const newValue = Math.min(
          100,
          Math.max(0, (relativeX / currentWidth) * 100),
        );
        setValue(Math.round(newValue));
      },
      onPanResponderRelease: (_, gestureState) => {
        const currentWidth = sliderWidth.current;
        const cardLeftOffset = (SCREEN_WIDTH - currentWidth) / 2;
        const relativeX = gestureState.moveX - cardLeftOffset;
        const finalValue = Math.min(
          100,
          Math.max(0, (relativeX / currentWidth) * 100),
        );
        const roundedValue = Math.round(finalValue);
        debouncedSaveMood(roundedValue);
        setIsSliding(false);
      },
      onPanResponderTerminate: () => {
        setIsSliding(false);
      },
    }),
  ).current;

  return (
    <View
      style={styles.mainContainer}
      accessibilityRole="adjustable"
      accessibilityLabel="Mood slider"
      accessibilityValue={{ min: 0, max: 100, now: value }}
    >
      <VisualArea phase={phase} floatAnim={floatAnim} />

      <View style={styles.card}>
        <View style={styles.header}>
          <AppText style={styles.moodStatusLabel}>
            BẠN ĐANG{" "}
            <AppText style={[styles.moodStatusValue, { color: moodConfig.color }]}>
              {moodConfig.text}
            </AppText>
          </AppText>
          <AppText style={styles.subtitle}>
            Kéo để điều chỉnh nhịp đập tâm trạng
          </AppText>
        </View>

        <View
          style={styles.sliderArea}
          onLayout={(e) => {
            sliderWidth.current = e.nativeEvent.layout.width;
          }}
        >
          <View style={styles.sliderLabels}>
            <AppText style={styles.sliderEdgeText}>BÌNH THẢN</AppText>
            <AppText style={styles.sliderEdgeText}>CĂNG THẲNG</AppText>
          </View>

          <View style={styles.track}>
            <LinearGradient
              colors={["#10B981", "#FACC15", "#FB7185"]}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
              style={styles.trackGradient}
            />
          </View>

          <View
            {...panResponder.panHandlers}
            style={[
              styles.thumbContainer,
              { left: (value / 100) * sliderWidth.current - 28 },
            ]}
          >
            <View style={styles.thumbOuter}>
              <View style={[styles.thumbInner, { backgroundColor: moodConfig.color }]} />
            </View>
          </View>
        </View>

        <View style={styles.footerInfo}>
          <View style={styles.infoTag}>
            <MaterialCommunityIcons name="waves" size={16} color="#A8A29E" />
            <AppText style={styles.tagText}>DỊU ÊM</AppText>
          </View>
          <View style={styles.infoTag}>
            <AppText style={styles.tagText}>MẠNH MẼ</AppText>
            <Ionicons name="flash" size={14} color="#A8A29E" />
          </View>
        </View>

        <View style={styles.divider} />
        <AppText style={styles.hintText}>
          Buông tay để gửi nhịp bộ cảm xúc đến{" "}
          <AppText style={styles.partnerName}>{partnerName}</AppText>
        </AppText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    width: "100%",
    alignItems: "center",
  },
  visualContainer: {
    width: 280,
    height: 260,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
  svgAbsolute: {
    position: "absolute",
  },
  card: {
    width: SCREEN_WIDTH - 48,
    backgroundColor: "#FFFFFF",
    borderRadius: 32,
    padding: 24,
    borderWidth: 1,
    borderColor: "#F5F5F4",
    shadowColor: "#1C1917",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.05,
    shadowRadius: 20,
    elevation: 4,
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
  },
  moodStatusLabel: {
    fontSize: 18,
    fontWeight: "900",
    color: "#1C1917",
    textAlign: "center",
  },
  moodStatusValue: {
    fontWeight: "900",
  },
  subtitle: {
    fontSize: 13,
    color: "#78716C",
    marginTop: 6,
    fontWeight: "600",
    textAlign: "center",
  },
  sliderArea: {
    height: 80,
    justifyContent: "center",
    marginTop: 4,
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
    color: "#A8A29E",
    letterSpacing: 1,
  },
  track: {
    height: 10,
    borderRadius: 5,
    backgroundColor: "#F5F5F4",
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
    backgroundColor: "#FFFFFF",
    borderWidth: 4,
    borderColor: "#F5F5F4",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
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
    color: "#A8A29E",
    letterSpacing: 0.5,
  },
  divider: {
    height: 1,
    backgroundColor: "#F5F5F4",
    marginBottom: 16,
  },
  hintText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#78716C",
    textAlign: "center",
    lineHeight: 18,
  },
  partnerName: {
    color: "#E48B9B",
    fontWeight: "800",
  },
});
