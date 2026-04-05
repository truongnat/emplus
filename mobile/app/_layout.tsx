import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { Text, View, StyleSheet } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ThemeProvider } from "@/src/theme";
import { ThemeModeProvider } from "@/src/theme/theme-mode-context";
import { SessionProvider } from "@/src/session-context";
import { ToastProvider } from "@/src/toast-context";
import { AlertDialogProvider } from "@/src/alert-dialog-context";
import { ApiProvider } from "@/src/framework/ctx/api-context";
import { NotificationBootstrap } from "@/src/components/NotificationBootstrap";
import { AnimatedSplashScreen } from "@/src/components/AnimatedSplashScreen";
import {
  BeVietnamPro_400Regular,
  BeVietnamPro_500Medium,
  BeVietnamPro_600SemiBold,
  BeVietnamPro_700Bold,
  BeVietnamPro_800ExtraBold,
} from "@expo-google-fonts/be-vietnam-pro";
import {
  RobotoMono_400Regular,
  RobotoMono_700Bold,
} from "@expo-google-fonts/roboto-mono";

SplashScreen.preventAutoHideAsync().catch(() => {
  /* reloading the app might cause errors here */
});

class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error: Error | null }
> {
  state = { hasError: false, error: null as Error | null };

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <View style={errorStyles.container}>
          <Text style={errorStyles.emoji}>😟</Text>
          <Text style={errorStyles.title}>Đã xảy ra lỗi</Text>
          <Text style={errorStyles.message}>
            Vui lòng khởi động lại ứng dụng.
          </Text>
          {__DEV__ && this.state.error && (
            <Text style={errorStyles.detail}>{this.state.error.message}</Text>
          )}
        </View>
      );
    }
    return this.props.children;
  }
}

const errorStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 32,
    backgroundColor: "#fff7f3",
  },
  emoji: { fontSize: 48, marginBottom: 16 },
  title: { fontSize: 20, fontWeight: "700", color: "#1a1a1a", marginBottom: 8 },
  message: { fontSize: 15, color: "#666", textAlign: "center" },
  detail: {
    fontSize: 12,
    color: "#999",
    marginTop: 16,
    fontFamily: "monospace",
    textAlign: "center",
  },
});

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});

function RootLayoutInner() {
  const [fontsLoaded] = useFonts({
    BeVietnamPro_400Regular,
    BeVietnamPro_500Medium,
    BeVietnamPro_600SemiBold,
    BeVietnamPro_700Bold,
    BeVietnamPro_800ExtraBold,
    RobotoMono_400Regular,
    RobotoMono_700Bold,
  });
  const [splashDone, setSplashDone] = useState(false);

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  const handleSplashFinish = useCallback(() => {
    setSplashDone(true);
  }, []);

  if (!splashDone) {
    return (
      <AnimatedSplashScreen
        isReady={fontsLoaded}
        onFinish={handleSplashFinish}
      />
    );
  }

  return (
    <ToastProvider>
      <AlertDialogProvider>
        <SessionProvider>
          <ApiProvider>
          <>
            <NotificationBootstrap />
            <StatusBar style="auto" />
            <Stack
              screenOptions={{
                headerShown: false,
                animation: "slide_from_right",
              }}
            >
              <Stack.Screen name="index" />
              <Stack.Screen name="(tabs)" />
              <Stack.Screen
                name="login"
                options={{
                  contentStyle: { backgroundColor: "transparent" },
                }}
              />
              <Stack.Screen
                name="register"
                options={{
                  contentStyle: { backgroundColor: "transparent" },
                }}
              />
              <Stack.Screen
                name="forgot-password"
                options={{
                  contentStyle: { backgroundColor: "transparent" },
                }}
              />
              <Stack.Screen
                name="reset-password"
                options={{
                  contentStyle: { backgroundColor: "transparent" },
                }}
              />
              <Stack.Screen
                name="pairing"
                options={{
                  contentStyle: { backgroundColor: "transparent" },
                }}
              />
              <Stack.Screen
                name="verify-otp"
                options={{
                  contentStyle: { backgroundColor: "transparent" },
                }}
              />
              <Stack.Screen name="policy" />
              <Stack.Screen name="add-expense" />
              <Stack.Screen name="add-memory" />
              <Stack.Screen name="memory/[id]" />
              <Stack.Screen
                name="profile-details/personal-info"
                options={{ contentStyle: { backgroundColor: "transparent" } }}
              />
              <Stack.Screen
                name="profile-details/notifications"
                options={{ contentStyle: { backgroundColor: "transparent" } }}
              />
              <Stack.Screen
                name="profile-details/appearance"
                options={{ contentStyle: { backgroundColor: "transparent" } }}
              />
              <Stack.Screen
                name="profile-details/privacy"
                options={{ contentStyle: { backgroundColor: "transparent" } }}
              />
              <Stack.Screen
                name="profile-details/help"
                options={{ contentStyle: { backgroundColor: "transparent" } }}
              />
            </Stack>
          </>
          </ApiProvider>
        </SessionProvider>
      </AlertDialogProvider>
    </ToastProvider>
  );
}

export default function RootLayout() {
  return (
    <ErrorBoundary>
      <GestureHandlerRootView style={styles.root}>
        <ThemeModeProvider>
          <ThemeProvider>
            <RootLayoutInner />
          </ThemeProvider>
        </ThemeModeProvider>
      </GestureHandlerRootView>
    </ErrorBoundary>
  );
}
