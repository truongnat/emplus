import { Redirect } from "expo-router";
import { View, ActivityIndicator } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useSession } from "@/src/session-context";
import { AppText, Reveal } from "@/src/ui-kit";
import { palette } from "@/src/theme";
import "../global.css"

export default function Index() {
  const { hydrated, isAuthenticated, session } = useSession();

  if (!hydrated) {
    return (
      <View style={{ flex: 1, backgroundColor: palette.white, alignItems: "center", justifyContent: "center" }}>
        <Reveal>
          <View style={{ alignItems: "center" }}>
            <View style={{
              width: 72, height: 72, borderRadius: 20,
              backgroundColor: palette["primary-subtle"],
              alignItems: "center", justifyContent: "center",
              marginBottom: 24, borderWidth: 1, borderColor: palette["glass-border"]
            }}>
              <MaterialCommunityIcons name="heart-outline" size={44} color={palette.primary} />
            </View>
            <AppText variant="h1" style={{ marginBottom: 12, color: palette.ink }}>Em Plus</AppText>
            <ActivityIndicator color={palette.primary} style={{ marginTop: 20 }} />
          </View>
        </Reveal>
      </View>
    );
  }

  if (!isAuthenticated) {
    return <Redirect href="/login" />;
  }

  if (!!!session?.user.coupleId) {
    return <Redirect href="/pairing" />;
  }

  return <Redirect href="/(tabs)/home" />;
}
