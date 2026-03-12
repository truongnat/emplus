import { useEffect, useRef, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Image, Keyboard } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Redirect, useRouter } from "expo-router";
import { YStack, XStack, ActivityIndicator } from 'react-native';
import QRCodeStyled from "react-native-qrcode-styled";
import Animated from "react-native-reanimated";

import {
  AppButton, AppScreen, AppText, GlassCard,
  AppInput, LoadingOverlay, AppLogoHeader
} from "@/src/framework/design/ui-kit";
import { useSession } from "@/src/framework/ctx/session-context";
import { useToast } from "@/src/framework/ctx/toast-context";
import { dependencies } from "@/src/framework/di/dependencies";
import { toDisplayError } from "@/src/core/api/to-display-error";
import { useClipboardWithFeedback } from "@/src/framework/design/hooks/use-clipboard";

const QR_HEART_IMAGE = require("../assets/images/qr-heart.png");

export default function PairingScreen() {
  const router = useRouter();
  const { session, setSession, hydrated, isAuthenticated } = useSession();
  const { showToast } = useToast();
  const { isCopied, copy, feedbackScale } = useClipboardWithFeedback();

  const [inviteCode, setInviteCode] = useState("");
  const [joinCode, setJoinCode] = useState("");
  const [timeLeft, setTimeLeft] = useState(120);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const isPaired = Boolean(session?.user?.coupleId);

  const generateInviteMutation = useMutation({
    mutationFn: () => dependencies.couple.generateInvite.execute(),
    onSuccess: (res) => setInviteCode(res.inviteCode),
    onError: (err) => showToast(toDisplayError(err), "error")
  });

  const joinMutation = useMutation({
    mutationFn: (code: string) => dependencies.couple.join.execute({ inviteCode: code }),
    onSuccess: (res) => {
      if (session) setSession({ ...session, user: { ...session.user, coupleId: res.coupleId } });
      Keyboard.dismiss();
      router.replace("/(tabs)/home");
    },
    onError: (err) => showToast(toDisplayError(err), "error")
  });

  useEffect(() => {
    generateInviteMutation.mutate();
    timerRef.current = setInterval(() => {
      setTimeLeft(p => {
        if (p <= 1) { generateInviteMutation.mutate(); return 120; }
        return p - 1;
      });
    }, 1000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);

  if (!hydrated) return null;
  if (!isAuthenticated) return <Redirect href="/login" />;
  if (isPaired) return <Redirect href="/(tabs)/home" />;

  return (
    <AppScreen justifyContent="flex-start" padding="$6">
      <AppLogoHeader title="Ghép đôi" subtitle="Kết nối thế giới của bạn" />

      <GlassCard>
        <YStack alignItems="center" paddingVertical="$4" gap="$4">
          <YStack padding="$3" backgroundColor="$white" borderRadius="$9" shadowColor="$black" shadowOpacity={0.1} shadowRadius={20}>
            <YStack alignItems="center" justifyContent="center" width={180} height={180}>
              {inviteCode ? (
                <>
                  <QRCodeStyled
                    data={inviteCode} size={180} color="#0f172a" pieceBorderRadius={2} isPiecesGlued={true}
                    outerEyesOptions={{ borderRadius: 16, color: "#ec1334" }}
                    innerEyesOptions={{ borderRadius: 6, color: "#0f172a" }}
                  />
                  <YStack position="absolute" width={48} height={48} backgroundColor="$white" borderRadius="$pill" alignItems="center" justifyContent="center" padding="$0.5" shadowRadius={4}>
                    <Image source={QR_HEART_IMAGE} style={{ width: '100%', height: '100%' }} resizeMode="contain" />
                  </YStack>
                </>
              ) : <ActivityIndicator color="#ec1334" />}
            </YStack>
          </YStack>

          <XStack alignItems="center" gap="$2">
            <Ionicons name="time-outline" size={14} color="#64748b" />
            <AppText variant="captionBold" color="$gray10">
              Mã làm mới sau: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, "0")}
            </AppText>
          </XStack>

          <AppButton variant={isCopied ? "primary" : "ghost"} onPress={() => copy(inviteCode)} paddingHorizontal="$6" backgroundColor={isCopied ? "$green10" : "rgba(255,255,255,0.4)"}>
            <XStack alignItems="center" gap="$2">
              <Animated.View style={{ transform: [{ scale: feedbackScale }] }}>
                <Ionicons name={isCopied ? "checkmark-circle" : "copy-outline"} size={20} color={isCopied ? "white" : "#ec1334"} />
              </Animated.View>
              <AppText color={isCopied ? "white" : "$primary"} fontWeight="700">{isCopied ? "Đã sao chép!" : "Sao chép mã QR"}</AppText>
            </XStack>
          </AppButton>
        </YStack>
      </GlassCard>

      <XStack alignItems="center" justifyContent="center" gap="$3" paddingVertical="$5" paddingHorizontal="$8">
        <YStack flex={1} height={1} backgroundColor="$gray10" opacity={0.2} />
        <AppText variant="captionBold" color="$gray10" fontStyle="italic" letterSpacing={2}>hoặc</AppText>
        <YStack flex={1} height={1} backgroundColor="$gray10" opacity={0.2} />
      </XStack>

      <YStack gap="$4" paddingBottom="$10">
        <AppText variant="captionBold" color="$gray10" textAlign="center" textTransform="uppercase" letterSpacing={2}>Nhập mã của người ấy</AppText>
        <XStack alignItems="center" borderRadius="$pill" backgroundColor="rgba(255,255,255,0.45)" borderWidth={2} borderColor="rgba(255,255,255,0.6)" paddingHorizontal="$5" height={56}>
          <AppInput
            flex={1} borderWidth={0} backgroundColor="transparent" height="100%" textAlign="center" fontWeight="bold" fontSize="$5" placeholder="Dán mã vào đây..."
            value={joinCode} autoCapitalize="characters"
            onChangeText={(t) => { setJoinCode(t.toUpperCase()); if (t.length === 6) joinMutation.mutate(t.toUpperCase()); }}
          />
          <Ionicons name="heart-outline" size={22} color="#ec1334" style={{ marginLeft: 8 }} />
        </XStack>
        <AppButton onPress={() => joinMutation.mutate(joinCode)} disabled={joinMutation.isPending}>
          <XStack alignItems="center" gap="$2">
            {joinMutation.isPending ? <ActivityIndicator color="white" /> : <><AppText color="white" fontWeight="700">Kết nối trái tim</AppText><Ionicons name="heart" size={18} color="white" /></>}
          </XStack>
        </AppButton>
      </YStack>

      {joinMutation.isPending && <LoadingOverlay />}
    </AppScreen>
  );
}
