import { Redirect } from "expo-router";
import { View, Image, ActivityIndicator, StyleSheet } from "react-native";
import { useSession } from "@/src/session-context";
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
        <Image
          source={require("../assets/icon.png")}
          style={styles.icon}
          resizeMode="contain"
        />
        <ActivityIndicator
          color={colors.brand.default}
          style={styles.loader}
          size="small"
        />
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
  icon: {
    width: 100,
    height: 100,
    borderRadius: 24,
  },
  loader: {
    marginTop: 24,
  },
});
