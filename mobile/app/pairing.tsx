import { useEffect, useRef, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import {
  Image,
  Keyboard,
  Animated,
  View,
  ActivityIndicator,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Redirect, useRouter } from "expo-router";
import QRCodeStyled from "react-native-qrcode-styled";
import * as Clipboard from "expo-clipboard";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import {
  Button,
  AppScreen,
  GlassCard,
  AppText as Text,
  Input,
  LoadingOverlay,
} from "@/src/ui-kit";
import { useSession } from "@/src/framework/ctx/session-context";
import { useToast } from "@/src/toast-context";
import { dependencies } from "@/src/framework/di/dependencies";
import { toDisplayError } from "@/src/core/api/to-display-error";
import { useThemeColors } from "@/src/theme";

const QR_HEART_IMAGE = require("../assets/images/qr-heart.png");

export default function PairingScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const colors = useThemeColors();
  const { session, setSession, hydrated, isAuthenticated } = useSession();
  const { showToast } = useToast();

  const [inviteCode, setInviteCode] = useState("");
  const [joinCode, setJoinCode] = useState("");
  const [timeLeft, setTimeLeft] = useState(120);
  const [isCopied, setIsCopied] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const feedbackScale = useRef(new Animated.Value(1)).current;

  const isPaired = Boolean(session?.user?.coupleId);

  const generateInviteMutation = useMutation({
    mutationFn: () => dependencies.couple.generateInvite.execute(),
    onSuccess: (res) => setInviteCode(res.inviteCode),
    onError: (err) => showToast(toDisplayError(err), "error"),
  });

  const joinMutation = useMutation({
    mutationFn: (code: string) =>
      dependencies.couple.join.execute({ inviteCode: code }),
    onSuccess: (res) => {
      if (session)
        setSession({
          ...session,
          user: session.user
            ? { ...session.user, coupleId: res.coupleId }
            : undefined,
        });
      Keyboard.dismiss();
      router.replace("/(tabs)/home");
    },
    onError: (err) => showToast(toDisplayError(err), "error"),
  });

  useEffect(() => {
    generateInviteMutation.mutate();
    timerRef.current = setInterval(() => {
      setTimeLeft((p) => {
        if (p <= 1) {
          generateInviteMutation.mutate();
          return 120;
        }
        return p - 1;
      });
    }, 1000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const handleCopy = async () => {
    if (!inviteCode) return;
    await Clipboard.setStringAsync(inviteCode);
    setIsCopied(true);
    Animated.sequence([
      Animated.timing(feedbackScale, {
        toValue: 0.8,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(feedbackScale, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
    setTimeout(() => setIsCopied(false), 2000);
  };

  if (!hydrated) return null;
  if (!isAuthenticated) return <Redirect href="/login" />;
  if (isPaired) return <Redirect href="/(tabs)/home" />;

  return (
    <AppScreen>
      <KeyboardAwareScrollView
        style={styles.container}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: insets.bottom + 40 },
        ]}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <Text variant="h1" style={styles.title}>
            Ghép đôi
          </Text>
          <Text style={[styles.subtitle, { color: colors.text.secondary }]}>
            Kết nối trái tim của hai bạn
          </Text>
        </View>

        <GlassCard style={styles.qrCard}>
          <View style={styles.qrContent}>
            <View style={styles.qrWrapper}>
              {inviteCode ? (
                <View style={styles.qrContainer}>
                  <QRCodeStyled
                    data={inviteCode}
                    size={180}
                    color={colors.text.primary}
                    pieceBorderRadius={4}
                    isPiecesGlued={true}
                    outerEyesOptions={{
                      borderRadius: 16,
                      color: colors.brand.default,
                    }}
                    innerEyesOptions={{
                      borderRadius: 6,
                      color: colors.text.primary,
                    }}
                  />
                  <View
                    style={[
                      styles.logoOverlay,
                      { backgroundColor: colors.surface.default },
                    ]}
                  >
                    <Image
                      source={QR_HEART_IMAGE}
                      style={styles.logoImage}
                      resizeMode="contain"
                    />
                  </View>
                </View>
              ) : (
                <View style={styles.loaderContainer}>
                  <ActivityIndicator color={colors.brand.default} size="large" />
                </View>
              )}
            </View>

            <View style={styles.timeRow}>
              <Ionicons
                name="time-outline"
                size={16}
                color={colors.text.tertiary}
              />
              <Text style={{ fontSize: 13, color: colors.text.secondary }}>
                Mã làm mới sau:{" "}
                <Text style={{ fontWeight: "700", color: colors.brand.default }}>
                  {Math.floor(timeLeft / 60)}:
                  {(timeLeft % 60).toString().padStart(2, "0")}
                </Text>
              </Text>
            </View>

            <TouchableOpacity
              onPress={handleCopy}
              activeOpacity={0.7}
              style={[
                styles.copyButton,
                { backgroundColor: colors.brand.muted },
                isCopied && { backgroundColor: "#22c55e" },
              ]}
            >
              <Animated.View
                style={[
                  styles.buttonInner,
                  { transform: [{ scale: feedbackScale }] },
                ]}
              >
                <Ionicons
                  name={isCopied ? "checkmark-circle" : "copy-outline"}
                  size={20}
                  color={isCopied ? "white" : colors.brand.default}
                />
                <Text
                  style={[
                    styles.copyText,
                    { color: isCopied ? "white" : colors.brand.default },
                  ]}
                >
                  {isCopied ? "Đã sao chép!" : "Sao chép mã QR"}
                </Text>
              </Animated.View>
            </TouchableOpacity>
          </View>
        </GlassCard>

        <View style={styles.dividerRow}>
          <View
            style={[styles.dividerLine, { backgroundColor: colors.border.default }]}
          />
          <Text style={[styles.dividerText, { color: colors.text.tertiary }]}>
            HOẶC
          </Text>
          <View
            style={[styles.dividerLine, { backgroundColor: colors.border.default }]}
          />
        </View>

        <View style={styles.inputSection}>
          <Text style={[styles.inputLabel, { color: colors.text.secondary }]}>
            Nhập mã từ người ấy để kết nối
          </Text>

          <Input
            placeholder="Dán mã tại đây..."
            value={joinCode}
            onChangeText={(t) => {
              const code = t.toUpperCase();
              setJoinCode(code);
              if (code.length === 6) joinMutation.mutate(code);
            }}
            autoCapitalize="characters"
            returnKeyType="done"
            maxLength={10}
            onSubmitEditing={() => joinCode && joinMutation.mutate(joinCode)}
            leftElement={
              <Ionicons
                name="heart-outline"
                size={22}
                color={colors.brand.default}
                style={{ marginLeft: 12 }}
              />
            }
          />

          <Button
            label="Kết nối ngay"
            onPress={() => joinMutation.mutate(joinCode)}
            loading={joinMutation.isPending}
            disabled={!joinCode || joinMutation.isPending}
            size="lg"
            fullWidth
            rightIcon={<Ionicons name="heart" size={20} color="white" />}
          />
        </View>
      </KeyboardAwareScrollView>

      {joinMutation.isPending && <LoadingOverlay />}
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 32,
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    textAlign: "center",
  },
  qrCard: {
    marginBottom: 20,
    padding: 0,
  },
  qrContent: {
    alignItems: "center",
    paddingVertical: 16,
    gap: 12,
  },
  qrWrapper: {
    padding: 12,
    backgroundColor: "white",
    borderRadius: 20,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  qrContainer: {
    width: 180,
    height: 180,
    alignItems: "center",
    justifyContent: "center",
  },
  loaderContainer: {
    width: 180,
    height: 180,
    alignItems: "center",
    justifyContent: "center",
  },
  logoOverlay: {
    position: "absolute",
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    padding: 4,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  logoImage: {
    width: "100%",
    height: "100%",
  },
  timeRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  copyButton: {
    width: "80%",
    height: 48,
    borderRadius: 24,
    overflow: "hidden",
  },
  buttonInner: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  copyText: {
    fontSize: 14,
    fontWeight: "700",
  },
  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    marginBottom: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    opacity: 0.3,
  },
  dividerText: {
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 2,
  },
  inputSection: {
    gap: 16,
  },
  inputLabel: {
    fontSize: 13,
    fontWeight: "600",
    textAlign: "center",
  },
});
