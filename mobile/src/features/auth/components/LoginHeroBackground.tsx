import { useState } from "react";
import { ImageBackground, StyleSheet, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useThemeMode } from "@/src/theme/theme-mode-context";
import {
  AUTH_HERO_IMAGE_DARK,
  AUTH_HERO_IMAGE_LIGHT,
} from "@/src/features/auth/auth-hero-assets";

/**
 * Nền đăng nhập: ảnh + gradient overlay — fallback gradient nếu ảnh lỗi/mạng.
 */
export function LoginHeroBackground() {
  const { isDark } = useThemeMode();
  const [imageFailed, setImageFailed] = useState(false);

  const uri = isDark ? AUTH_HERO_IMAGE_DARK : AUTH_HERO_IMAGE_LIGHT;

  if (imageFailed) {
    return <GradientFallback isDark={isDark} />;
  }

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      <ImageBackground
        source={{ uri }}
        style={StyleSheet.absoluteFill}
        resizeMode="cover"
        onError={() => setImageFailed(true)}
        accessibilityElementsHidden
        importantForAccessibility="no"
      >
        {isDark ? <DarkScrim /> : <LightScrim />}
      </ImageBackground>
    </View>
  );
}

function DarkScrim() {
  return (
    <>
      <LinearGradient
        colors={["rgba(8,4,6,0.92)", "rgba(22,10,14,0.85)", "rgba(18,6,12,0.94)"]}
        locations={[0, 0.4, 1]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={StyleSheet.absoluteFill}
      />
      <LinearGradient
        colors={["rgba(244,63,94,0.08)", "transparent", "rgba(0,0,0,0.42)"]}
        locations={[0, 0.5, 1]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={StyleSheet.absoluteFill}
      />
    </>
  );
}

function LightScrim() {
  return (
    <>
      <LinearGradient
        colors={[
          "rgba(255,252,251,0.82)",
          "rgba(255,246,248,0.74)",
          "rgba(255,235,240,0.68)",
        ]}
        locations={[0, 0.45, 1]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={StyleSheet.absoluteFill}
      />
      <LinearGradient
        colors={["rgba(253,186,116,0.08)", "transparent", "rgba(244,63,94,0.06)"]}
        locations={[0, 0.45, 1]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFill}
      />
      {/* Viền tối nhẹ — vignette, tăng chiều sâu */}
      <LinearGradient
        colors={["rgba(40,20,28,0.12)", "transparent", "rgba(30,10,18,0.18)"]}
        locations={[0, 0.5, 1]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={StyleSheet.absoluteFill}
        pointerEvents="none"
      />
    </>
  );
}

function GradientFallback({ isDark }: { isDark: boolean }) {
  if (isDark) {
    return (
      <View style={StyleSheet.absoluteFill} pointerEvents="none">
        <LinearGradient
          colors={["#050203", "#12060A", "#1A0810", "#221018"]}
          locations={[0, 0.32, 0.68, 1]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0.4, y: 1 }}
          style={StyleSheet.absoluteFill}
        />
      </View>
    );
  }
  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      <LinearGradient
        colors={["#FFF7F5", "#FFE8EC", "#FFDCE4", "#FCE7F3"]}
        locations={[0, 0.28, 0.62, 1]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0.45, y: 1 }}
        style={StyleSheet.absoluteFill}
      />
      <LinearGradient
        colors={["rgba(253, 186, 116, 0.22)", "transparent", "rgba(244, 63, 94, 0.12)"]}
        locations={[0, 0.5, 1]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFill}
      />
    </View>
  );
}
