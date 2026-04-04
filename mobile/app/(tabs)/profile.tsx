import React, { useState, useMemo, useCallback } from "react";
import {
  View,
  ScrollView,
  Switch,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { Image } from "expo-image";
import { useMutation } from "@tanstack/react-query";
import { AppScreen } from "@/src/components/organisms/AppScreen";
import { TOAST_TAB_BAR_OFFSET } from "@/src/components/atoms/Toast";
import { AppText, PressableScale } from "@/src/ui-kit";
import { LoginGridAnimatedBackground } from "@/src/features/auth/components/LoginGridAnimatedBackground";
import { useAuthGridChrome } from "@/src/features/auth/hooks/useAuthGridChrome";
import { loginScreenStyles } from "@/src/features/auth/loginScreen.styles";
import { homeScreenStyles } from "@/src/features/home/homeScreen.styles";
import { useSession } from "@/src/session-context";
import { useThemeColors, useThemeMode } from "@/src/theme";
import { EmplusLottie } from "@/src/components/atoms/EmplusLottie";
import { lottieInventory } from "@/src/lottie/inventory";
import type { SemanticColors } from "@/src/theme/tokens/semantic";
import { pickImage, pickBannerImage } from "@/src/utils/expo-helpers";
import { uploadTimelineMemoryPhoto, toDisplayError } from "@/src/api";
import { useToast } from "@/src/toast-context";
import { dependencies } from "@/src/framework/di/dependencies";
import type { UserModule } from "@/src/domain/entities/schemas";

function createProfileStyles(c: SemanticColors) {
  return StyleSheet.create({
    screenRoot: {
      flex: 1,
      zIndex: 1,
    },
    scrollContent: {
      flexGrow: 1,
    },
    headerContainer: {
      height: 180,
      width: "100%",
      position: "relative",
      marginBottom: 60,
    },
    headerGradient: {
      ...StyleSheet.absoluteFillObject,
      borderBottomLeftRadius: 40,
      borderBottomRightRadius: 40,
    },
    headerTitleRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 24,
    },
    headerTitle: {
      fontSize: 24,
      fontWeight: "900",
      letterSpacing: -0.5,
      flex: 1,
    },
    /** Một nút duy nhất trên hàng tiêu đề: đổi ảnh bìa (icon, không chữ). */
    headerBannerEditBtn: {
      width: 40,
      height: 40,
      borderRadius: 20,
      alignItems: "center",
      justifyContent: "center",
    },
    avatarWrapper: {
      position: "absolute",
      bottom: -50,
      alignSelf: "center",
    },
    avatarShadow: {
      padding: 6,
      borderRadius: 56,
      shadowColor: c.text.primary,
      shadowOffset: { width: 0, height: 10 },
      shadowOpacity: 0.1,
      shadowRadius: 20,
      elevation: 8,
    },
    avatarMain: {
      width: 100,
      height: 100,
      borderRadius: 50,
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 1,
      overflow: "hidden",
    },
    avatarImage: {
      width: "100%",
      height: "100%",
    },
    avatarTouchableWrap: {
      position: "relative",
    },
    avatarEditBadge: {
      position: "absolute",
      right: 2,
      bottom: 2,
      width: 34,
      height: 34,
      borderRadius: 17,
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 2,
      zIndex: 6,
    },
    avatarText: {
      fontSize: 40,
      fontWeight: "900",
      color: c.brand.default,
    },
    userInfoSection: {
      alignItems: "center",
      marginBottom: 32,
    },
    userName: {
      fontSize: 22,
      fontWeight: "900",
      color: c.text.primary,
      letterSpacing: -0.5,
    },
    userEmailLine: {
      fontSize: 14,
      fontWeight: "600",
      color: c.text.secondary,
      marginTop: 4,
    },
    statusBadge: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 12,
      paddingVertical: 4,
      borderRadius: 12,
      marginTop: 8,
    },
    statusDot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: c.status.success.icon,
      marginRight: 6,
    },
    statusText: {
      fontSize: 12,
      fontWeight: "800",
      textTransform: "uppercase",
      letterSpacing: 0.5,
    },
    section: {
      paddingHorizontal: 20,
      marginBottom: 24,
    },
    sectionTitle: {
      fontSize: 13,
      fontWeight: "800",
      color: c.text.tertiary,
      textTransform: "uppercase",
      letterSpacing: 1.5,
      paddingHorizontal: 8,
      marginBottom: 12,
    },
    card: {
      borderRadius: 24,
      borderWidth: 1,
      shadowColor: c.text.primary,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.03,
      shadowRadius: 12,
      elevation: 2,
      overflow: "hidden",
    },
    settingItem: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingVertical: 18,
      paddingHorizontal: 20,
    },
    settingDivider: {
      borderBottomWidth: 1,
      borderBottomColor: c.border.subtle,
    },
    settingLeft: {
      flexDirection: "row",
      alignItems: "center",
      gap: 14,
      flex: 1,
    },
    settingIcon: {
      width: 40,
      height: 40,
      borderRadius: 12,
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 1,
    },
    settingTextContainer: {
      flex: 1,
    },
    settingLabel: {
      fontSize: 16,
      fontWeight: "800",
      color: c.text.primary,
    },
    settingSublabel: {
      fontSize: 13,
      color: c.text.secondary,
      marginTop: 2,
      fontWeight: "500",
    },
    centerContainer: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      padding: 24,
      zIndex: 1,
    },
    centerText: {
      fontSize: 16,
      textAlign: "center",
      fontWeight: "600",
    },
  });
}

interface SettingItemProps {
  icon: string;
  label: string;
  sublabel?: string;
  rightElement?: React.ReactNode;
  onPress?: () => void;
  isLast?: boolean;
}

function SettingItem({
  icon,
  label,
  sublabel,
  rightElement,
  onPress,
  isLast,
}: SettingItemProps) {
  const colors = useThemeColors();
  const styles = useMemo(() => createProfileStyles(colors), [colors]);
  return (
    <PressableScale onPress={onPress}>
      <View style={[styles.settingItem, !isLast && styles.settingDivider]}>
        <View style={styles.settingLeft}>
          <View
            style={[
              styles.settingIcon,
              {
                backgroundColor: colors.surface.sunken,
                borderColor: colors.border.subtle,
              },
            ]}
          >
            <Ionicons name={icon as any} size={20} color={colors.text.primary} />
          </View>
          <View style={styles.settingTextContainer}>
            <AppText style={[styles.settingLabel, { color: colors.text.primary }]}>
              {label}
            </AppText>
            {sublabel && (
              <AppText
                style={[styles.settingSublabel, { color: colors.text.secondary }]}
              >
                {sublabel}
              </AppText>
            )}
          </View>
        </View>
        {rightElement || (
          <Ionicons
            name="chevron-forward"
            size={18}
            color={colors.text.tertiary}
          />
        )}
      </View>
    </PressableScale>
  );
}

export default function ProfileScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { session, clearSession, isAuthenticated, setSession } = useSession();
  const { showToast } = useToast();
  const colors = useThemeColors();
  const { isDark } = useThemeMode();
  useAuthGridChrome(isDark, colors.background.default, true);
  const styles = useMemo(() => createProfileStyles(colors), [colors]);
  const [syncEnabled, setSyncEnabled] = useState(true);
  const [bannerBusy, setBannerBusy] = useState(false);
  const [avatarBusy, setAvatarBusy] = useState(false);

  const updateProfileMutation = useMutation({
    mutationFn: (body: UserModule.UpdateProfileRequest) =>
      dependencies.auth.updateProfile.execute(body),
    onSuccess: (user) => {
      setSession((prev) => (prev ? { ...prev, user } : null));
    },
  });

  const onChangeAvatar = useCallback(async () => {
    if (bannerBusy || avatarBusy) return;
    try {
      setAvatarBusy(true);
      const asset = await pickImage();
      if (!asset) return;
      const fd = new FormData();
      const name =
        asset.fileName ??
        `avatar_${Date.now()}_${Math.random().toString(36).slice(2, 8)}.jpg`;
      const type = asset.mimeType ?? "image/jpeg";
      fd.append("file", { uri: asset.uri, name, type } as any);
      const url = await uploadTimelineMemoryPhoto(fd);
      await updateProfileMutation.mutateAsync({ avatarUrl: url });
      showToast("Đã cập nhật ảnh đại diện", "success");
    } catch (e) {
      showToast(toDisplayError(e), "error");
    } finally {
      setAvatarBusy(false);
    }
  }, [bannerBusy, avatarBusy, updateProfileMutation, showToast]);

  const onChangeBanner = useCallback(async () => {
    if (bannerBusy || avatarBusy) return;
    try {
      setBannerBusy(true);
      const asset = await pickBannerImage();
      if (!asset) return;
      const fd = new FormData();
      const name =
        asset.fileName ??
        `banner_${Date.now()}_${Math.random().toString(36).slice(2, 8)}.jpg`;
      const type = asset.mimeType ?? "image/jpeg";
      fd.append("file", { uri: asset.uri, name, type } as any);
      const url = await uploadTimelineMemoryPhoto(fd);
      await updateProfileMutation.mutateAsync({ profileBackgroundUrl: url });
      showToast("Đã cập nhật ảnh bìa", "success");
    } catch (e) {
      showToast(toDisplayError(e), "error");
    } finally {
      setBannerBusy(false);
    }
  }, [bannerBusy, avatarBusy, updateProfileMutation, showToast]);

  const scrollPadBottom = Math.max(insets.bottom + TOAST_TAB_BAR_OFFSET, 100);

  const appShell = (body: React.ReactNode) => (
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
        {body}
      </View>
    </AppScreen>
  );

  if (!isAuthenticated) {
    return appShell(
      <View style={[styles.centerContainer, { paddingTop: insets.top }]}>
        <EmplusLottie
          source={lottieInventory.empty}
          style={{ width: 140, height: 140 }}
          loop
        />
        <AppText style={[styles.centerText, { color: colors.text.tertiary }]}>
          Đăng nhập để xem hồ sơ
        </AppText>
      </View>,
    );
  }

  const u = session?.user;
  const displayName =
    (u?.nickname?.trim() || u?.fullName || u?.email || "Bạn") ?? "Bạn";
  const userEmail = u?.email || "";
  const userInitial =
    displayName.replace(/\s/g, "").charAt(0)?.toUpperCase() || "U";
  const hasBanner = Boolean(u?.profileBackgroundUrl);
  const titleOnBanner = hasBanner ? colors.text.inverse : colors.text.onBrand;
  const bannerBtnBg = hasBanner
    ? "rgba(255,255,255,0.22)"
    : "rgba(255,255,255,0.2)";
  const bannerBtnIcon = titleOnBanner;

  return appShell(
    <View style={styles.screenRoot}>
      <ScrollView
        style={{ flex: 1, backgroundColor: "transparent" }}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: scrollPadBottom },
        ]}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Premium Header with Overlapping Avatar */}
        <View style={styles.headerContainer}>
          {hasBanner && u?.profileBackgroundUrl ? (
            <Image
              source={{ uri: u.profileBackgroundUrl }}
              style={styles.headerGradient}
              contentFit="cover"
            />
          ) : (
            <LinearGradient
              colors={[colors.brand.default, colors.brand.muted, colors.surface.default]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.headerGradient}
            />
          )}
          {hasBanner ? (
            <LinearGradient
              colors={["rgba(0,0,0,0.2)", "rgba(0,0,0,0.55)"]}
              style={StyleSheet.absoluteFillObject}
            />
          ) : null}

          <View
            style={[
              styles.headerTitleRow,
              { paddingTop: insets.top + 12, zIndex: 5 },
            ]}
          >
            <AppText style={[styles.headerTitle, { color: titleOnBanner }]}>
              Tài khoản
            </AppText>
            <PressableScale
              style={[
                styles.headerBannerEditBtn,
                { backgroundColor: bannerBtnBg },
              ]}
              onPress={onChangeBanner}
              disabled={bannerBusy || avatarBusy}
              accessibilityRole="button"
              accessibilityLabel="Đổi ảnh bìa"
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              {bannerBusy ? (
                <ActivityIndicator color={bannerBtnIcon} size="small" />
              ) : (
                <Ionicons
                  name="image-outline"
                  size={22}
                  color={bannerBtnIcon}
                />
              )}
            </PressableScale>
          </View>

          <View style={[styles.avatarWrapper, { zIndex: 4 }]}>
            <View style={styles.avatarTouchableWrap}>
              <View
                style={[
                  styles.avatarShadow,
                  { backgroundColor: colors.surface.default },
                ]}
              >
                <View
                  style={[
                    styles.avatarMain,
                    {
                      backgroundColor: colors.surface.sunken,
                      borderColor: colors.border.subtle,
                    },
                  ]}
                >
                  {u?.avatarUrl ? (
                    <Image
                      source={{ uri: u.avatarUrl }}
                      style={styles.avatarImage}
                      contentFit="cover"
                    />
                  ) : (
                    <AppText
                      style={[styles.avatarText, { color: colors.brand.default }]}
                    >
                      {userInitial}
                    </AppText>
                  )}
                </View>
              </View>
              <PressableScale
                style={[
                  styles.avatarEditBadge,
                  {
                    backgroundColor: colors.surface.default,
                    borderColor: colors.border.default,
                  },
                ]}
                onPress={onChangeAvatar}
                disabled={bannerBusy || avatarBusy}
                accessibilityRole="button"
                accessibilityLabel="Đổi ảnh đại diện"
                hitSlop={{ top: 6, bottom: 6, left: 6, right: 6 }}
              >
                {avatarBusy ? (
                  <ActivityIndicator
                    color={colors.brand.default}
                    size="small"
                  />
                ) : (
                  <Ionicons
                    name="camera"
                    size={16}
                    color={colors.brand.default}
                  />
                )}
              </PressableScale>
            </View>
          </View>
        </View>

        {/* User Info Section */}
        <View style={styles.userInfoSection}>
          <AppText style={styles.userName}>{displayName}</AppText>
          {userEmail ? (
            <AppText style={styles.userEmailLine}>{userEmail}</AppText>
          ) : null}
          <View
            style={[
              styles.statusBadge,
              { backgroundColor: colors.status.success.bg },
            ]}
          >
            <View style={styles.statusDot} />
            <AppText style={[styles.statusText, { color: colors.status.success.text }]}>
              Đang hoạt động
            </AppText>
          </View>
        </View>

        {/* Settings Sections */}
        <View style={styles.section}>
          <AppText style={styles.sectionTitle}>Tùy chọn</AppText>
          <View
            style={[
              styles.card,
              {
                backgroundColor: colors.surface.default,
                borderColor: colors.border.subtle,
              },
            ]}
          >
            <SettingItem
              icon="person-outline"
              label="Thông tin tài khoản"
              sublabel="Họ tên, tên hiển thị, ngày sinh…"
              onPress={() => router.push("/profile-details/personal-info")}
            />
            <SettingItem
              icon="notifications-outline"
              label="Thông báo"
              onPress={() => router.push("/profile-details/notifications")}
            />
            <SettingItem
              icon="color-palette-outline"
              label="Giao diện"
              onPress={() => router.push("/profile-details/appearance")}
            />
            <SettingItem
              icon="shield-outline"
              label="Quyền riêng tư"
              sublabel="Chuẩn mực & ranh giới"
              onPress={() => router.push("/profile-details/privacy")}
            />
            <SettingItem
              icon="help-circle-outline"
              label="Trợ giúp"
              onPress={() => router.push("/profile-details/help")}
              isLast
            />
          </View>
        </View>

        <View style={styles.section}>
          <AppText style={styles.sectionTitle}>Đồng bộ</AppText>
          <View
            style={[
              styles.card,
              {
                backgroundColor: colors.surface.default,
                borderColor: colors.border.subtle,
              },
            ]}
          >
            <View style={styles.settingItem}>
              <View style={styles.settingLeft}>
                <View
                  style={[
                    styles.settingIcon,
                    {
                      backgroundColor: colors.surface.sunken,
                      borderColor: colors.border.subtle,
                    },
                  ]}
                >
                  <Ionicons
                    name="cloud-upload-outline"
                    size={20}
                    color={colors.text.primary}
                  />
                </View>
                <View style={styles.settingTextContainer}>
                  <AppText style={[styles.settingLabel, { color: colors.text.primary }]}>
                    Sao lưu đám mây
                  </AppText>
                  <AppText
                    style={[styles.settingSublabel, { color: colors.text.secondary }]}
                  >
                    Tự động sao lưu dữ liệu
                  </AppText>
                </View>
              </View>
              <Switch
                value={syncEnabled}
                onValueChange={setSyncEnabled}
                trackColor={{
                  false: colors.border.default,
                  true: colors.brand.default,
                }}
                thumbColor={colors.text.inverse}
              />
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <AppText style={styles.sectionTitle}>Nguy hiểm</AppText>
          <View
            style={[
              styles.card,
              {
                backgroundColor: colors.surface.default,
                borderColor: colors.border.subtle,
              },
            ]}
          >
            <SettingItem
              icon="log-out-outline"
              label="Đăng xuất"
              rightElement={
                <Ionicons
                  name="chevron-forward"
                  size={18}
                  color={colors.status.error.icon}
                />
              }
              onPress={() => {
                clearSession();
                router.replace("/login");
              }}
              isLast
            />
          </View>
        </View>
      </ScrollView>
    </View>,
  );
}
