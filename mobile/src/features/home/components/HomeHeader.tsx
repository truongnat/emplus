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
    paddingBottom: 12,
    zIndex: 10,
    width: "100%",
  },
  leftContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    overflow: "hidden",
    flex: 1,
  },
  avatarContainer: {
    position: "relative",
    width: 60,
    height: 36,
    justifyContent: "center",
  },
  avatar1: {
    position: "absolute",
    left: 0,
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 2,
    borderColor: "#fff",
    backgroundColor: "rgba(255,255,255,0.6)",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 20,
  },
  statusDot: {
    position: "absolute",
    bottom: 0,
    right: 0,
    zIndex: 30,
    width: 10,
    height: 10,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: "#fff",
    backgroundColor: "#22c55e",
  },
  avatar2: {
    position: "absolute",
    left: 24,
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 2,
    borderColor: "#fff",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
    opacity: 0.9,
  },
  textContainer: { justifyContent: "center", flex: 1 },
  subRow: { flexDirection: "row", alignItems: "center", marginTop: 0 },
  button: {
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.45)",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.6)",
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
            <View style={styles.avatar1}>
              <AppText
                style={{
                  fontSize: 13,
                  fontWeight: "bold",
                  color: palette.zinc400,
                }}
              >
                {userInitial}
              </AppText>
              <View style={styles.statusDot} />
            </View>
            <View style={styles.avatar2}>
              <Ionicons name="person" size={16} color={palette.zinc300} />
            </View>
          </View>

          <View style={styles.textContainer}>
            <AppText
              numberOfLines={1}
              style={{
                fontSize: 15,
                fontWeight: "bold",
                color: palette.zinc900,
              }}
            >
              {greeting}
            </AppText>
            <View style={styles.subRow}>
              <Ionicons
                name={iconName as any}
                size={12}
                color={palette.amber500}
              />
              <AppText
                numberOfLines={1}
                style={{
                  fontSize: 9,
                  fontWeight: "bold",
                  color: palette.zinc400,
                  marginLeft: 4,
                  textTransform: "uppercase",
                  letterSpacing: 2,
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
