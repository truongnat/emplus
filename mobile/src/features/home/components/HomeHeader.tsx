import React, { useCallback } from "react";
import { View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { PressableScale, Reveal, AppText } from "@/src/ui-kit";
import { RingingBell } from "./HomeDecorations";
import { palette } from "@/src/theme";

interface HomeHeaderProps {
  userInitial: string;
  greeting: string;
  subGreeting: string;
  iconName: string;
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 24,
    zIndex: 10,
    width: "100%",
  },
  leftContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    overflow: "hidden",
    flex: 1,
  },
  avatarContainer: {
    position: "relative",
    width: 64,
    height: 40,
    justifyContent: "center",
  },
  avatar2: {
    position: "absolute",
    left: 24,
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#FCF9F8", // lightBg
    backgroundColor: "#F5F5F4", // taupe100
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
  },
  avatar1: {
    position: "absolute",
    left: 0,
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#FCF9F8", // lightBg
    backgroundColor: "#FCE7F3", // soft pink
    alignItems: "center",
    justifyContent: "center",
    zIndex: 20,
  },
  statusDot: {
    position: "absolute",
    bottom: -2,
    right: -2,
    zIndex: 30,
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: "#FCF9F8",
    backgroundColor: "#22c55e",
  },
  textContainer: { justifyContent: "center", flex: 1, gap: 2 },
  subRow: { flexDirection: "row", alignItems: "center" },
  button: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
    marginLeft: 8,
  },
});

export const HomeHeader = React.memo(function HomeHeader({
  userInitial,
  greeting,
  subGreeting,
  iconName,
}: HomeHeaderProps) {
  const router = useRouter();

  const handlePress = useCallback(() => {
    router.push("/notifications");
  }, [router]);

  return (
    <Reveal>
      <View style={styles.container}>
        <View style={styles.leftContainer}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar2}>
              <Ionicons name="person" size={18} color="#D6D3D1" />
            </View>
            <View style={styles.avatar1}>
              <AppText
                style={{
                  fontSize: 14,
                  fontWeight: "bold",
                  color: "#F43F5E",
                }}
              >
                {userInitial}
              </AppText>
              <View style={styles.statusDot} />
            </View>
          </View>

          <View style={styles.textContainer}>
            <AppText
              numberOfLines={1}
              style={{
                fontSize: 18,
                fontWeight: "800",
                color: "#1C1917", // taupe900
              }}
            >
              {greeting}
            </AppText>
            <View style={styles.subRow}>
              {iconName && (
                <Ionicons
                  name={iconName as any}
                  size={12}
                  color="#FBBF24"
                  style={{ marginRight: 4 }}
                />
              )}
              <AppText
                numberOfLines={1}
                style={{
                  fontSize: 10,
                  fontWeight: "800",
                  color: "#A8A29E", // taupe400
                  textTransform: "uppercase",
                  letterSpacing: 1.5,
                }}
              >
                {subGreeting}
              </AppText>
            </View>
          </View>
        </View>
        <PressableScale style={styles.button} onPress={handlePress}>
          <RingingBell />
        </PressableScale>
      </View>
    </Reveal>
  );
});
