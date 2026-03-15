import React, { useEffect, useMemo, useRef, useState } from "react";
import { Animated, PanResponder, Text, View, Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import Svg, { Defs, RadialGradient, Stop, Circle, G } from "react-native-svg";
import { palette } from "@/src/theme/tokens";
import { tws } from "@/src/utils/tws";
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
          tws("w-[280px] h-[260px] justify-center items-center my-2.5"),
          { transform: [{ translateY: floatAnim }] },
        ]}
      >
        <Svg
          width={SVG_SIZE}
          height={SVG_SIZE}
          viewBox={`0 0 ${SVG_SIZE} ${SVG_SIZE}`}
          style={tws("absolute")}
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
              <Stop offset="0%" stopColor="#ec1334" stopOpacity="0.85" />
              <Stop offset="70%" stopColor="#f43f5e" stopOpacity="0.4" />
              <Stop offset="100%" stopColor="#f43f5e" stopOpacity="0" />
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
              <Stop offset="0%" stopColor="#f43f5e" stopOpacity="0.75" />
              <Stop offset="70%" stopColor="#ec1334" stopOpacity="0.3" />
              <Stop offset="100%" stopColor="#ec1334" stopOpacity="0" />
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
  const sliderWidth = useRef(SCREEN_WIDTH - 88);
  const saveTimeout = useRef<NodeJS.Timeout | null>(null);

  const phase = useRef(new Animated.Value(0)).current;
  const floatAnim = useRef(new Animated.Value(0)).current;

  // Load saved mood on mount
  useEffect(() => {
    loadSavedMood();
  }, []);

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

  // Debounced save - only save when user stops sliding
  const debouncedSaveMood = (moodValue: number) => {
    if (saveTimeout.current) {
      clearTimeout(saveTimeout.current);
    }
    saveTimeout.current = setTimeout(() => {
      saveMood(moodValue);
      onMoodChange?.(moodValue);
    }, 300) as any; // Wait 300ms after sliding stops
  };

  useEffect(() => {
    Animated.loop(
      Animated.timing(phase, {
        toValue: 1,
        duration: 20000,
        useNativeDriver: false,
      }),
    ).start();

    Animated.loop(
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
    ).start();
  }, [floatAnim, phase]);

  const getMoodConfig = (val: number) => {
    if (val < 25) return { text: "Yên tâm", color: "#22c55e" };
    if (val < 50) return { text: "Ổn định", color: "#eab308" };
    if (val < 75) return { text: "Lo lắng", color: "#ec1334" };
    return { text: "Căng thẳng", color: "#ec1334" };
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

        // Debounced save
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
      style={{ width: "100%", alignItems: "center" }}
      accessibilityRole="adjustable"
      accessibilityLabel="Mood slider"
      accessibilityValue={{ min: 0, max: 100, now: value }}
    >
      <VisualArea phase={phase} floatAnim={floatAnim} />

      <View
        style={tws(
          "w-[SCREEN_WIDTH-44px] bg-white/45 rounded-[40px] px-6 py-6 border border-white/60 shadow-glass",
        )}
      >
        <View style={tws("items-center mb-4")}>
          <AppText
            variant="h2"
            color="slate-900"
            style={tws("text-center uppercase")}
          >
            BẠN ĐANG {moodConfig.text}
          </AppText>
          <AppText variant="caption" color="slate-500" style={tws("mt-1")}>
            Kéo để điều chỉnh nhịp đập tâm trạng
          </AppText>
        </View>

        <View
          style={tws("h-20 justify-center mt-1")}
          onLayout={(e) => {
            sliderWidth.current = e.nativeEvent.layout.width;
          }}
        >
          <View
            style={tws(
              "flex-row justify-between absolute top-0 left-0 right-0",
            )}
          >
            <AppText
              style={tws(
                "text-[10px] font-bold text-success uppercase tracking-widest",
              )}
            >
              BÌNH THẢN
            </AppText>
            <AppText
              style={tws(
                "text-[10px] font-bold text-primary uppercase tracking-widest",
              )}
            >
              CĂNG THẲNG
            </AppText>
          </View>

          <View style={tws("h-[10px] rounded-full bg-black/5 overflow-hidden")}>
            <LinearGradient
              colors={["#4ade80", "#facc15", "#ec1334"]}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
              style={tws("flex-1")}
            />
          </View>

          <View
            {...panResponder.panHandlers}
            style={[
              tws("absolute w-14 h-14 justify-center items-center z-30"),
              { left: (value / 100) * sliderWidth.current - 28 },
            ]}
          >
            <View
              style={tws(
                "w-12 h-12 rounded-full bg-white border-4 border-primary items-center justify-center shadow-lg",
              )}
            >
              <View style={tws("w-1 h-1 rounded-full bg-primary")} />
            </View>
          </View>
        </View>

        <View style={tws("flex-row justify-between mt-1 mb-4")}>
          <View style={tws("flex-row items-center gap-1.5")}>
            <MaterialCommunityIcons name="waves" size={16} color="#94a3b8" />
            <AppText
              style={tws(
                "text-[10px] font-bold text-slate-400 uppercase tracking-wide",
              )}
            >
              Dịu êm
            </AppText>
          </View>
          <View style={tws("flex-row items-center gap-1.5")}>
            <AppText
              style={tws(
                "text-[10px] font-bold text-slate-400 uppercase tracking-wide",
              )}
            >
              Mạnh mẽ
            </AppText>
            <Ionicons name="flash" size={14} color="#94a3b8" />
          </View>
        </View>

        <View style={tws("h-px bg-slate-100 mb-4 opacity-50")} />
        <AppText
          style={tws("text-[11px] font-medium text-slate-400 text-center")}
        >
          Buông tay để gửi nhịp bộ cảm xúc đến{" "}
          <AppText style={tws("text-primary font-bold")}>{partnerName}</AppText>
        </AppText>
      </View>
    </View>
  );
}
