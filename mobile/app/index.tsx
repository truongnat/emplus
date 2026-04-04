import { Redirect } from "expo-router";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useSession } from "@/src/session-context";
import { AppText, Reveal } from "@/src/ui-kit";
import { useThemeColors } from "@/src/theme";

export default function Index() {
  const { hydrated, isAuthenticated, session } = useSession();
  const colors = useThemeColors();

  if (!hydrated) {
    return (
      <View
        style={[
          styles.container,
          { backgroundColor: colors.background.default },
        ]}
      >
        <Reveal>
          <View style={{ alignItems: "center" }}>
            <View
              style={[
                styles.iconContainer,
                {
                  backgroundColor: colors.brand.muted,
                  borderColor: colors.border.subtle,
                },
              ]}
            >
              <MaterialCommunityIcons
                name="heart-outline"
                size={44}
                color={colors.brand.default}
              />
            </View>
            <AppText
              style={{
                fontSize: 24,
                fontWeight: "bold",
                marginBottom: 12,
                color: colors.text.primary,
              }}
            >
              Em+
            </AppText>
            <ActivityIndicator
              color={colors.brand.default}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  iconContainer: {
    width: 72,
    height: 72,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
    borderWidth: 1,
  },
});
