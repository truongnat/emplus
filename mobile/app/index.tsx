import { Redirect } from "expo-router";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useSession } from "@/src/session-context";
import { AppText, Reveal } from "@/src/ui-kit";
import { palette } from "@/src/theme";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.white,
    alignItems: "center",
    justifyContent: "center",
  },
  iconContainer: {
    width: 72,
    height: 72,
    borderRadius: 20,
    backgroundColor: palette.violet100,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
    borderWidth: 1,
    borderColor: palette.violet200,
  },
});

export default function Index() {
  const { hydrated, isAuthenticated, session } = useSession();

  if (!hydrated) {
    return (
      <View style={styles.container}>
        <Reveal>
          <View style={{ alignItems: "center" }}>
            <View style={styles.iconContainer}>
              <MaterialCommunityIcons
                name="heart-outline"
                size={44}
                color={palette.violet600}
              />
            </View>
            <AppText
              style={{
                fontSize: 24,
                fontWeight: "bold",
                marginBottom: 12,
                color: palette.zinc900,
              }}
            >
              Em Plus
            </AppText>
            <ActivityIndicator
              color={palette.violet600}
              style={{ marginTop: 20 }}
            />
          </View>
        </Reveal>
      </View>
    );
  }

  if (!isAuthenticated) {
    return <Redirect href="/login" />;
  }

  if (!session?.user?.coupleId) {
    return <Redirect href="/pairing" />;
  }

  return <Redirect href="/(tabs)/home" />;
}
