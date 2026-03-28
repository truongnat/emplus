import React, { useState } from "react";
import { View, ScrollView, Switch, StyleSheet, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { AppScreen } from "@/src/components/organisms/AppScreen";
import { AppText, PressableScale } from "@/src/ui-kit";
import { useSession } from "@/src/session-context";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

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
  return (
    <PressableScale onPress={onPress}>
      <View style={[styles.settingItem, !isLast && styles.settingDivider]}>
        <View style={styles.settingLeft}>
          <View style={styles.settingIcon}>
            <Ionicons name={icon as any} size={20} color="#44403C" />
          </View>
          <View style={styles.settingTextContainer}>
            <AppText style={styles.settingLabel}>{label}</AppText>
            {sublabel && (
              <AppText style={styles.settingSublabel}>{sublabel}</AppText>
            )}
          </View>
        </View>
        {rightElement || (
          <Ionicons name="chevron-forward" size={18} color="#D6D3D1" />
        )}
      </View>
    </PressableScale>
  );
}

export default function ProfileScreen() {
  const router = useRouter();
  const { session, clearSession, isAuthenticated } = useSession();
  const [syncEnabled, setSyncEnabled] = useState(true);

  if (!isAuthenticated) {
    return (
      <AppScreen>
        <View style={styles.centerContainer}>
          <AppText style={styles.centerText}>
            Please log in to view your profile
          </AppText>
        </View>
      </AppScreen>
    );
  }

  const userInitial = session?.user?.email?.[0]?.toUpperCase() || "U";
  const userEmail = session?.user?.email || "User";

  return (
    <AppScreen>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Premium Header with Overlapping Avatar */}
        <View style={styles.headerContainer}>
          <LinearGradient
            colors={["#E48B9B", "#FBCFE8"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.headerGradient}
          />
          <View style={styles.headerTitleRow}>
            <AppText style={styles.headerTitle}>Tài khoản</AppText>
            <PressableScale style={styles.editButton}>
              <Ionicons name="create-outline" size={20} color="#FFFFFF" />
            </PressableScale>
          </View>

          <View style={styles.avatarWrapper}>
            <View style={styles.avatarShadow}>
              <View style={styles.avatarMain}>
                <AppText style={styles.avatarText}>{userInitial}</AppText>
              </View>
            </View>
          </View>
        </View>

        {/* User Info Section */}
        <View style={styles.userInfoSection}>
          <AppText style={styles.userName}>{userEmail}</AppText>
          <View style={styles.statusBadge}>
            <View style={styles.statusDot} />
            <AppText style={styles.statusText}>Đang hoạt động</AppText>
          </View>
        </View>

        {/* Settings Sections */}
        <View style={styles.section}>
          <AppText style={styles.sectionTitle}>Tùy chọn</AppText>
          <View style={styles.card}>
            <SettingItem
              icon="person-outline"
              label="Thông tin cá nhân"
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
          <View style={styles.card}>
            <View style={styles.settingItem}>
              <View style={styles.settingLeft}>
                <View style={styles.settingIcon}>
                  <Ionicons name="cloud-upload-outline" size={20} color="#44403C" />
                </View>
                <View style={styles.settingTextContainer}>
                  <AppText style={styles.settingLabel}>Sao lưu đám mây</AppText>
                  <AppText style={styles.settingSublabel}>
                    Tự động sao lưu dữ liệu
                  </AppText>
                </View>
              </View>
              <Switch
                value={syncEnabled}
                onValueChange={setSyncEnabled}
                trackColor={{ false: "#D6D3D1", true: "#E48B9B" }}
                thumbColor="#fff"
              />
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <AppText style={styles.sectionTitle}>Nguy hiểm</AppText>
          <View style={styles.card}>
            <SettingItem
              icon="log-out-outline"
              label="Đăng xuất"
              rightElement={
                <Ionicons name="chevron-forward" size={18} color="#EF4444" />
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
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: 120,
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
    paddingTop: 32,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "900",
    color: "#FFFFFF",
    letterSpacing: -0.5,
  },
  editButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
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
    backgroundColor: "#FFFFFF",
    borderRadius: 56,
    shadowColor: "#1C1917",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 8,
  },
  avatarMain: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#FAF7F6",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#F5F5F4",
  },
  avatarText: {
    fontSize: 40,
    fontWeight: "900",
    color: "#E48B9B",
  },
  userInfoSection: {
    alignItems: "center",
    marginBottom: 32,
  },
  userName: {
    fontSize: 22,
    fontWeight: "900",
    color: "#1C1917",
    letterSpacing: -0.5,
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ECFDF5",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    marginTop: 8,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#10B981",
    marginRight: 6,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "800",
    color: "#059669",
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
    color: "#A8A29E",
    textTransform: "uppercase",
    letterSpacing: 1.5,
    paddingHorizontal: 8,
    marginBottom: 12,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "#F5F5F4",
    shadowColor: "#000",
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
    borderBottomColor: "#F5F5F4",
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
    backgroundColor: "#FAF7F6",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#F5F5F4",
  },
  settingTextContainer: {
    flex: 1,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: "800",
    color: "#1C1917",
  },
  settingSublabel: {
    fontSize: 13,
    color: "#78716C",
    marginTop: 2,
    fontWeight: "500",
  },
  centerContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  centerText: {
    fontSize: 16,
    color: "#78716C",
    textAlign: "center",
    fontWeight: "600",
  },
});
