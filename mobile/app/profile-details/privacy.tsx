import { useState } from "react";
import { View, ScrollView, Switch, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AppScreen, AppText } from "@/src/ui-kit";
import { palette } from "@/src/theme";

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  section: { marginTop: 24, marginBottom: 8, paddingHorizontal: 20 },
  sectionLabel: {
    fontSize: 13,
    fontWeight: "bold",
    color: palette.zinc500,
    textTransform: "uppercase" as "uppercase",
    letterSpacing: 1,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 16,
  },
  settingRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
  },
  settingLeft: { flexDirection: "row", alignItems: "center", gap: 12, flex: 1 },
  settingText: { fontSize: 15, fontWeight: "bold", color: palette.zinc700 },
  settingSubtext: { fontSize: 13, color: palette.zinc500, marginTop: 2 },
});

export default function PrivacyScreen() {
  const [profilePrivate, setProfilePrivate] = useState(false);
  const [showOnlineStatus, setShowOnlineStatus] = useState(true);
  const [allowMessages, setAllowMessages] = useState(true);

  return (
    <AppScreen>
      <View style={styles.header}>
        <Ionicons name="shield-outline" size={24} color={palette.violet600} />
        <AppText
          style={{ fontSize: 20, fontWeight: "bold", color: palette.zinc900 }}
        >
          Quyền riêng tư
        </AppText>
      </View>

      <ScrollView
        contentContainerStyle={{ paddingBottom: 60 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.section}>
          <AppText style={styles.sectionLabel}>Tùy chọn hiển thị</AppText>
        </View>

        <View style={styles.card}>
          <View style={styles.settingRow}>
            <View style={styles.settingLeft}>
              <Ionicons name="eye-outline" size={20} color={palette.zinc600} />
              <View>
                <AppText style={styles.settingText}>Hồ sơ riêng tư</AppText>
                <AppText style={styles.settingSubtext}>
                  Chỉ người ghép đôi mới xem được
                </AppText>
              </View>
            </View>
            <Switch
              value={profilePrivate}
              onValueChange={setProfilePrivate}
              trackColor={{ false: palette.zinc300, true: palette.violet600 }}
              thumbColor="#fff"
            />
          </View>

          <View style={styles.settingRow}>
            <View style={styles.settingLeft}>
              <Ionicons name="wifi" size={20} color={palette.zinc600} />
              <View>
                <AppText style={styles.settingText}>
                  Hiển thị trạng thái online
                </AppText>
                <AppText style={styles.settingSubtext}>
                  Cho phép người khác thấy khi bạn online
                </AppText>
              </View>
            </View>
            <Switch
              value={showOnlineStatus}
              onValueChange={setShowOnlineStatus}
              trackColor={{ false: palette.zinc300, true: palette.violet600 }}
              thumbColor="#fff"
            />
          </View>

          <View style={styles.settingRow}>
            <View style={styles.settingLeft}>
              <Ionicons
                name="chatbubble-outline"
                size={20}
                color={palette.zinc600}
              />
              <View>
                <AppText style={styles.settingText}>Cho phép nhắn tin</AppText>
                <AppText style={styles.settingSubtext}>
                  Nhận tin nhắn từ người lạ
                </AppText>
              </View>
            </View>
            <Switch
              value={allowMessages}
              onValueChange={setAllowMessages}
              trackColor={{ false: palette.zinc300, true: palette.violet600 }}
              thumbColor="#fff"
            />
          </View>
        </View>

        <View style={styles.section}>
          <AppText style={styles.sectionLabel}>Dữ liệu</AppText>
        </View>

        <View style={styles.card}>
          <AppText
            style={{ fontSize: 15, color: palette.zinc700, lineHeight: 22 }}
          >
            Chúng tôi cam kết bảo vệ dữ liệu cá nhân của bạn. Dữ liệu được mã
            hóa và lưu trữ an toàn trên đám mây.
          </AppText>
        </View>
      </ScrollView>
    </AppScreen>
  );
}
