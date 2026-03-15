import { useEffect, useRef, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import {
  Image,
  Keyboard,
  Animated,
  View,
  ActivityIndicator,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Redirect, useRouter } from "expo-router";
import QRCodeStyled from "react-native-qrcode-styled";
import * as Clipboard from "expo-clipboard";

import { Button } from "@/src/components/atoms/Button";
import { LoadingOverlay } from "@/src/components/organisms/LoadingOverlay";
import { useSession } from "@/src/session-context";
import { useToast } from "@/src/toast-context";
import { dependencies } from "@/src/framework/di/dependencies";
import { toDisplayError } from "@/src/core/api/to-display-error";
import { palette } from "@/src/theme/tokens";

const QR_HEART_IMAGE = require("../assets/images/qr-heart.png");

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "flex-start", padding: 24 },
  card: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 5,
  },
  qrWrapper: {
    padding: 12,
    backgroundColor: "white",
    borderRadius: 18,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 20,
  },
  qrContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: 180,
    height: 180,
  },
  logoOverlay: {
    position: "absolute",
    width: 48,
    height: 48,
    backgroundColor: "white",
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    padding: 2,
    shadowRadius: 4,
  },
  timeRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  copyButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
  },
  copyButtonCopied: { backgroundColor: "#22c55e" },
  copyButtonDefault: { backgroundColor: "rgba(255,255,255,0.4)" },
  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    paddingVertical: 20,
    paddingHorizontal: 32,
  },
  dividerLine: { flex: 1, height: 1, backgroundColor: "#e5e7eb", opacity: 0.2 },
  inputSection: { gap: 16, paddingBottom: 40 },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 9999,
    backgroundColor: "rgba(255,255,255,0.45)",
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.6)",
    paddingHorizontal: 20,
    height: 56,
  },
  input: {
    flex: 1,
    borderWidth: 0,
    backgroundColor: "transparent",
    height: "100%",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18,
    color: "#0f172a",
  },
  buttonRow: { flexDirection: "row", alignItems: "center", gap: 8 },
});

export default function PairingScreen() {
  const router = useRouter();
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
          user: session.user ? { ...session.user, coupleId: res.coupleId } : undefined,
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
    <View style={styles.container}>
      <Text
        style={{
          fontSize: 24,
          fontWeight: "bold",
          textAlign: "center",
          marginVertical: 20,
        }}
      >
        Pairing
      </Text>

      <View style={styles.card}>
        <View style={{ alignItems: "center", paddingVertical: 16, gap: 16 }}>
          <View style={styles.qrWrapper}>
            <View style={styles.qrContainer}>
              {inviteCode ? (
                <>
                  <QRCodeStyled
                    data={inviteCode}
                    size={180}
                    color="#0f172a"
                    pieceBorderRadius={2}
                    isPiecesGlued={true}
                    outerEyesOptions={{ borderRadius: 16, color: "#ec1334" }}
                    innerEyesOptions={{ borderRadius: 6, color: "#0f172a" }}
                  />
                  <View style={styles.logoOverlay}>
                    <Image
                      source={QR_HEART_IMAGE}
                      style={{ width: "100%", height: "100%" }}
                      resizeMode="contain"
                    />
                  </View>
                </>
              ) : (
                <ActivityIndicator color="#ec1334" />
              )}
            </View>
          </View>

          <View style={styles.timeRow}>
            <Ionicons name="time-outline" size={14} color="#64748b" />
            <Text
              style={{ fontSize: 12, fontWeight: "bold", color: "#64748b" }}
            >
              Mã làm mới sau: {Math.floor(timeLeft / 60)}:
              {(timeLeft % 60).toString().padStart(2, "0")}
            </Text>
          </View>

          <TouchableOpacity
            onPress={handleCopy}
            style={[
              styles.copyButton,
              isCopied ? styles.copyButtonCopied : styles.copyButtonDefault,
            ]}
          >
            <View style={styles.buttonRow}>
              <Animated.View
                style={{
                  transform: [{ scale: feedbackScale }],
                  opacity: feedbackScale.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.5, 1],
                  }),
                }}
              >
                <Ionicons
                  name={isCopied ? "checkmark-circle" : "copy-outline"}
                  size={20}
                  color={isCopied ? "white" : "#ec1334"}
                />
              </Animated.View>
              <Text
                style={{
                  color: isCopied ? "white" : "#ec1334",
                  fontWeight: "700",
                }}
              >
                {isCopied ? "Đã sao chép!" : "Sao chép mã QR"}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.dividerRow}>
        <View style={styles.dividerLine} />
        <Text
          style={{
            fontSize: 11,
            fontWeight: "bold",
            color: "#64748b",
            fontStyle: "italic",
            letterSpacing: 2,
          }}
        >
          hoặc
        </Text>
        <View style={styles.dividerLine} />
      </View>

      <View style={styles.inputSection}>
        <Text
          style={{
            fontSize: 11,
            fontWeight: "bold",
            color: "#64748b",
            textAlign: "center",
            textTransform: "uppercase",
            letterSpacing: 2,
          }}
        >
          Nhập mã của người ấy
        </Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Dán mã vào đây..."
            value={joinCode}
            autoCapitalize="characters"
            onChangeText={(t) => {
              setJoinCode(t.toUpperCase());
              if (t.length === 6) joinMutation.mutate(t.toUpperCase());
            }}
            returnKeyType="done"
            onSubmitEditing={() => {
              Keyboard.dismiss();
              joinMutation.mutate(joinCode);
            }}
          />
          <Ionicons name="heart-outline" size={22} color="#ec1334" />
        </View>
        <Button
          onPress={() => joinMutation.mutate(joinCode)}
          disabled={joinMutation.isPending}
        >
          <View style={styles.buttonRow}>
            {joinMutation.isPending ? (
              <ActivityIndicator color="white" />
            ) : (
              <>
                <Text style={{ color: "white", fontWeight: "700" }}>
                  Kết nối trái tim
                </Text>
                <Ionicons name="heart" size={18} color="white" />
              </>
            )}
          </View>
        </Button>
      </View>

      {joinMutation.isPending && <LoadingOverlay />}
    </View>
  );
}
