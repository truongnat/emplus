import React, { useState } from "react";
import { View, ScrollView, Switch, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { AppScreen } from "@/src/components/organisms/AppScreen";
import { Text } from "@/src/components/atoms/Text";
import { Card } from "@/src/components/molecules/Card";
import { palette } from "@/src/theme/tokens";
import { useSession } from "@/src/session-context";

interface SettingItemProps {
  icon: string;
  label: string;
  sublabel?: string;
  rightElement?: React.ReactNode;
  onPress?: () => void;
}

function SettingItem({
  icon,
  label,
  sublabel,
  rightElement,
  onPress,
}: SettingItemProps) {
  return (
    <View style={styles.settingItem}>
      <View style={styles.settingLeft}>
        <View style={styles.settingIcon}>
          <Ionicons name={icon as any} size={20} color={palette.zinc600} />
        </View>
        <View style={styles.settingTextContainer}>
          <Text style={styles.settingLabel}>{label}</Text>
          {sublabel && <Text style={styles.settingSublabel}>{sublabel}</Text>}
        </View>
      </View>
      {rightElement || (
        <Ionicons name="chevron-forward" size={18} color={palette.zinc300} />
      )}
    </View>
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
          <Text style={styles.centerText}>
            Please log in to view your profile
          </Text>
        </View>
      </AppScreen>
    );
  }

  return (
    <AppScreen>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Ionicons name="person-outline" size={24} color={palette.violet600} />
          <Text style={styles.headerTitle}>Tài khoản</Text>
          <View style={styles.headerPlaceholder} />
        </View>

        {/* User Info Card */}
        <Card style={styles.userInfoCard}>
          <View style={styles.userInfoContent}>
            <View style={styles.userAvatar}>
              <Text style={styles.userAvatarText}>
                {session?.user?.email?.[0]?.toUpperCase() || "U"}
              </Text>
            </View>
            <View style={styles.userInfoTextContainer}>
              <Text style={styles.userEmail}>
                {session?.user?.email || "User"}
              </Text>
              <Text style={styles.userStatus}>Online</Text>
            </View>
          </View>
        </Card>

        {/* Settings Sections */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tùy chọn</Text>

          <Card style={styles.settingsCard}>
            <SettingItem
              icon="person-outline"
              label="Thông tin cá nhân"
              onPress={() => router.push("/profile-details/personal-info")}
            />
            <View style={styles.settingDivider} />
            <SettingItem
              icon="notifications-outline"
              label="Thông báo"
              onPress={() => router.push("/profile-details/notifications")}
            />
            <View style={styles.settingDivider} />
            <SettingItem
              icon="color-palette-outline"
              label="Giao diện"
              onPress={() => router.push("/profile-details/appearance")}
            />
            <View style={styles.settingDivider} />
            <SettingItem
              icon="shield-outline"
              label="Quyền riêng tư"
              sublabel="Chuẩn mực & ranh giới"
              onPress={() => router.push("/profile-details/privacy")}
            />
            <View style={styles.settingDivider} />
            <SettingItem
              icon="help-circle-outline"
              label="Trợ giúp"
              onPress={() => router.push("/profile-details/help")}
            />
          </Card>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Đồng bộ</Text>

          <Card style={styles.settingsCard}>
            <View style={styles.settingItem}>
              <View style={styles.settingLeft}>
                <View style={styles.settingIcon}>
                  <Ionicons
                    name="cloud-upload-outline"
                    size={20}
                    color={palette.zinc600}
                  />
                </View>
                <View style={styles.settingTextContainer}>
                  <Text style={styles.settingLabel}>Sao lưu đám mây</Text>
                  <Text style={styles.settingSublabel}>
                    Tự động sao lưu dữ liệu
                  </Text>
                </View>
              </View>
              <Switch
                value={syncEnabled}
                onValueChange={setSyncEnabled}
                trackColor={{ false: palette.zinc300, true: palette.violet600 }}
                thumbColor="#fff"
              />
            </View>
          </Card>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Nguy hiểm</Text>

          <Card style={styles.settingsCard}>
            <SettingItem
              icon="log-out-outline"
              label="Đăng xuất"
              rightElement={
                <Ionicons
                  name="chevron-forward"
                  size={18}
                  color={palette.red500}
                />
              }
              onPress={() => {
                clearSession();
                router.replace("/login");
              }}
            />
          </Card>
        </View>
      </ScrollView>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 60,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: palette.zinc900,
  },
  headerPlaceholder: {
    width: 24,
  },
  userInfoCard: {
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: 24,
  },
  userInfoContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    padding: 16,
  },
  userAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: palette.violet100,
    alignItems: "center",
    justifyContent: "center",
  },
  userAvatarText: {
    fontSize: 24,
    fontWeight: "bold",
    color: palette.violet600,
  },
  userInfoTextContainer: {
    flex: 1,
  },
  userEmail: {
    fontSize: 15,
    fontWeight: "bold",
    color: palette.zinc900,
  },
  userStatus: {
    fontSize: 13,
    color: palette.green500,
    marginTop: 2,
  },
  section: {
    marginTop: 24,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: "bold",
    color: palette.zinc500,
    textTransform: "uppercase",
    letterSpacing: 1,
    paddingHorizontal: 4,
    marginBottom: 12,
  },
  settingsCard: {
    borderRadius: 16,
    overflow: "hidden",
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  settingLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    flex: 1,
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.6)",
    alignItems: "center",
    justifyContent: "center",
  },
  settingTextContainer: {
    flex: 1,
  },
  settingLabel: {
    fontSize: 15,
    fontWeight: "bold",
    color: palette.zinc700,
  },
  settingSublabel: {
    fontSize: 13,
    color: palette.zinc500,
    marginTop: 2,
  },
  settingDivider: {
    height: 1,
    backgroundColor: palette.zinc100,
    marginHorizontal: 16,
  },
  centerContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  centerText: {
    fontSize: 16,
    color: palette.zinc500,
    textAlign: "center",
  },
});
