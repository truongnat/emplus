import { StyleSheet, View, Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const { width: W, height: H } = Dimensions.get("window");

type LoginMeshVariant = "mesh" | "flat";

/**
 * Nền đăng nhập: gradient + blob (mesh) hoặc trắng flat (bám Figma light).
 */
export function LoginMeshBackground({
  isDark,
  variant = "mesh",
}: {
  isDark: boolean;
  variant?: LoginMeshVariant;
}) {
  if (isDark) {
    return (
      <View style={StyleSheet.absoluteFill} pointerEvents="none">
        <LinearGradient
          colors={["#0C080A", "#141018", "#1A1218"]}
          style={StyleSheet.absoluteFill}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        />
        <LinearGradient
          colors={["rgba(244, 63, 94, 0.35)", "rgba(244, 63, 94, 0)", "transparent"]}
          locations={[0, 0.45, 1]}
          style={styles.blobTopRight}
          start={{ x: 0.8, y: 0 }}
          end={{ x: 0, y: 0.9 }}
        />
        <LinearGradient
          colors={["rgba(168, 85, 247, 0.12)", "transparent"]}
          style={styles.blobBottomLeft}
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 0 }}
        />
      </View>
    );
  }

  if (variant === "flat") {
    return (
      <View
        style={[StyleSheet.absoluteFill, { backgroundColor: "#FFFFFF" }]}
        pointerEvents="none"
      />
    );
  }

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      <LinearGradient
        colors={["#FFF5F3", "#FFECE8", "#FFD6DD", "#FFF0F2"]}
        locations={[0, 0.35, 0.72, 1]}
        style={StyleSheet.absoluteFill}
        start={{ x: 0.15, y: 0 }}
        end={{ x: 0.85, y: 1 }}
      />
      <LinearGradient
        colors={["rgba(255, 182, 193, 0.55)", "rgba(255, 160, 176, 0.15)", "transparent"]}
        locations={[0, 0.5, 1]}
        style={styles.blobTopRight}
        start={{ x: 1, y: 0 }}
        end={{ x: 0.2, y: 0.8 }}
      />
      <LinearGradient
        colors={["transparent", "rgba(253, 186, 116, 0.2)", "rgba(244, 63, 94, 0.08)"]}
        locations={[0, 0.55, 1]}
        style={styles.blobBottomLeft}
        start={{ x: 0.5, y: 1 }}
        end={{ x: 0.5, y: 0 }}
      />
    </View>
  );
}

const blobW = Math.min(W * 0.95, 420);
const blobH = H * 0.42;

const styles = StyleSheet.create({
  blobTopRight: {
    position: "absolute",
    top: -blobH * 0.15,
    right: -W * 0.12,
    width: blobW,
    height: blobH,
    borderRadius: blobW / 2,
  },
  blobBottomLeft: {
    position: "absolute",
    bottom: -H * 0.08,
    left: -W * 0.2,
    width: W * 0.85,
    height: H * 0.45,
    borderRadius: W * 0.4,
  },
});
