import React, { useCallback, useMemo, useState } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

import { AppScreen } from "@/src/components/organisms/AppScreen";
import { AppText, PressableScale } from "@/src/ui-kit";
import { useThemeColors, useThemeMode } from "@/src/theme";
import { homeDarkChromeButton } from "@/src/theme/emplus-design-tokens";
import { typographyRoles } from "@/src/theme/typography-roles";
import { LoginGridAnimatedBackground } from "@/src/features/auth/components/LoginGridAnimatedBackground";
import { useAuthGridChrome } from "@/src/features/auth/hooks/useAuthGridChrome";
import { loginScreenStyles } from "@/src/features/auth/loginScreen.styles";
import { homeScreenStyles } from "@/src/features/home/homeScreen.styles";
import {
  TimelineImageViewer,
  MemoryDetailBentoGrid,
} from "@/src/features/timeline";
import { useSession } from "@/src/session-context";
import { getMemoryById } from "@/src/api";
import {
  parseMediaUrls,
  getMemoryTime,
} from "@/src/utils/timeline-helpers";
import { scrollPadBottomWithTabBar } from "@/src/core/common/core";

export default function MemoryDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const colors = useThemeColors();
  const { isDark } = useThemeMode();
  const { withAccessToken } = useSession();
  const memoryId = typeof id === "string" ? id : id?.[0] ?? "";

  const [viewer, setViewer] = useState<{ urls: string[]; index: number } | null>(
    null,
  );

  useAuthGridChrome(isDark, colors.background.default, true);

  const { data: memory, isLoading, isError } = useQuery({
    queryKey: ["timelineMemory", memoryId],
    queryFn: () => withAccessToken((t) => getMemoryById(t, memoryId)),
    enabled: memoryId.length > 0,
  });

  const mediaUrls = useMemo(
    () => (memory ? parseMediaUrls(memory.mediaUrls) : []),
    [memory],
  );

  const openImage = useCallback((index: number) => {
    if (mediaUrls.length === 0) return;
    setViewer({ urls: mediaUrls, index });
  }, [mediaUrls]);

  const scrollPadBottom = scrollPadBottomWithTabBar(insets.bottom);

  if (!memoryId) {
    return null;
  }

  return (
    <AppScreen
      applyTopSafeAreaPadding={false}
      wrapWithKeyboardDismiss={false}
      style={{
        ...loginScreenStyles.appScreenBase,
        backgroundColor: "transparent",
      }}
      contentContainerStyle={loginScreenStyles.appContent}
      animatedEntrance={false}
    >
      <StatusBar style={isDark ? "light" : "dark"} />
      <View style={homeScreenStyles.layerRoot}>
        <LoginGridAnimatedBackground isDark={isDark} />

        <View style={[styles.headerRow, { paddingTop: insets.top + 8 }]}>
          <PressableScale
            onPress={() => router.back()}
            style={[
              styles.iconBtn,
              isDark
                ? {
                    backgroundColor: homeDarkChromeButton.backgroundColor,
                    borderColor: homeDarkChromeButton.borderColor,
                  }
                : {
                    backgroundColor: colors.surface.default,
                    borderColor: colors.border.subtle,
                  },
            ]}
            accessibilityRole="button"
            accessibilityLabel="Quay lại"
          >
            <Ionicons name="chevron-back" size={22} color={colors.text.primary} />
          </PressableScale>
          <AppText
            style={[
              typographyRoles.title,
              styles.headerTitle,
              { color: colors.text.primary },
            ]}
            numberOfLines={1}
            accessibilityRole="header"
          >
            Chi tiết
          </AppText>
          <View style={{ width: 44 }} />
        </View>

        {isLoading ? (
          <View style={styles.center}>
            <ActivityIndicator color={colors.brand.default} size="large" />
          </View>
        ) : isError || !memory ? (
          <View style={styles.center}>
            <AppText style={{ color: colors.text.tertiary }}>
              Không tải được mục này.
            </AppText>
            <PressableScale onPress={() => router.back()} style={{ marginTop: 16 }}>
              <AppText style={{ color: colors.brand.default, fontWeight: "700" }}>
                Quay lại
              </AppText>
            </PressableScale>
          </View>
        ) : (
          <ScrollView
            style={homeScreenStyles.scrollView}
            contentContainerStyle={[
              styles.scrollInner,
              { paddingBottom: scrollPadBottom },
            ]}
            showsVerticalScrollIndicator={false}
          >
            {mediaUrls.length > 0 ? (
              <MemoryDetailBentoGrid
                urls={mediaUrls}
                onCellPress={openImage}
              />
            ) : null}

            <AppText
              style={[styles.title, { color: colors.text.primary }]}
            >
              {memory.title}
            </AppText>
            <AppText style={[styles.meta, { color: colors.text.tertiary }]}>
              {getMemoryTime(memory.createdAt)}
              {memory.memoryDate ? ` · Ngày kỷ niệm ${memory.memoryDate}` : ""}
            </AppText>

            {memory.description?.trim() ? (
              <AppText
                style={[styles.body, { color: colors.text.primary }]}
              >
                {memory.description}
              </AppText>
            ) : null}
          </ScrollView>
        )}

        {viewer ? (
          <TimelineImageViewer
            key={viewer.urls.join("\x1e")}
            images={viewer.urls}
            initialIndex={viewer.index}
            onClose={() => setViewer(null)}
          />
        ) : null}
      </View>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 22,
    paddingBottom: 12,
    zIndex: 2,
  },
  iconBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "800",
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  scrollInner: {
    paddingHorizontal: 22,
    paddingTop: 8,
  },
  title: {
    fontSize: 22,
    fontWeight: "800",
    lineHeight: 30,
    marginBottom: 8,
  },
  meta: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 16,
  },
  body: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "500",
  },
});
