import { tws } from "@/src/utils/tws";
import React, { useEffect, useState, useMemo } from "react";
import { View } from "react-native";
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

function Digit({ digit, index, digitHeight = 110, fontSize = 96, width = 64 }: {
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
        const targetY = isOpposite
            ? -digitHeight * (10 - num)
            : -digitHeight * num;

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
        <View style={tws("overflow-hidden items-center", { height: digitHeight, width })}>
            <Animated.View style={animatedStyle}>
                {displayDigits.map((d) => (
                    <View key={d} style={tws("items-center justify-center", { height: digitHeight })}>
                        <AppText variant="h1" color="primary" style={tws("text-center", { fontSize, lineHeight: digitHeight, width })}>
                            {d}
                        </AppText>
                    </View>
                ))}
            </Animated.View>
        </View>
    );
}

export const NumberTicker = React.memo(function NumberTicker({ value }: { value: number }) {
    const digits = useMemo(() => value.toString().padStart(2, '0').split(''), [value]);
    return (
        <View style={tws("flex-row items-center")}>
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
                withTiming(1, { duration: 500, easing: Easing.inOut(Easing.ease) })
            ),
            -1,
            false
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
            <AppText variant="h3" color="primary" style={tws("w-3.5 text-center leading-10 opacity-60")}>
                :
            </AppText>
        </Animated.View>
    );
}

function ClockDigit({ digit }: { digit: string }) {
    const D = 40;
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
        <View style={tws("overflow-hidden w-6 items-center", { height: D })}>
            <Animated.View style={animatedStyle}>
                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((d) => (
                    <View key={d} style={tws("items-center justify-center", { height: D })}>
                        <AppText variant="h2" color="primary" style={tws("w-6 text-center", { lineHeight: D })}>
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
        const hh = String(now.getHours()).padStart(2, '0').split('');
        const mm = String(now.getMinutes()).padStart(2, '0').split('');
        const ss = String(now.getSeconds()).padStart(2, '0').split('');
        return { hh, mm, ss };
    }, [now]);

    return (
        <View style={tws("flex-row items-center")}>
            {[timeDigits.hh, timeDigits.mm, timeDigits.ss].map((group, gi) => (
                <View key={gi} style={tws("flex-row items-center")}>
                    {group.map((d, di) => <ClockDigit key={`${gi}-${di}`} digit={d} />)}
                    {gi < 2 && <ClockColon />}
                </View>
            ))}
        </View>
    );
});
