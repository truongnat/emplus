import { useThemeColors } from "@/src/theme";
import { PressableScale, AppText } from "@/src/ui-kit";
import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { ActivityIndicator, Pressable, View, StyleSheet } from "react-native";

interface BudgetActionMenuProps {
  showMenu: boolean;
  closeMenu: () => void;
  openAddModal: () => void;
  handleSeed: () => void;
  seeding: boolean;
}

export default function BudgetActionMenu({
  showMenu,
  closeMenu,
  openAddModal,
  handleSeed,
  seeding,
}: BudgetActionMenuProps) {
  const colors = useThemeColors();

  if (!showMenu) return null;

  return (
    <View style={styles.overlay}>
      <Pressable
        style={[styles.backdrop, { backgroundColor: colors.scrim }]}
        onPress={closeMenu}
        accessibilityLabel="Đóng menu"
      />
      <View style={styles.menuContainer}>
        <BlurView intensity={90} tint="light" style={styles.menuContent}>
          <PressableScale
            style={[
              styles.menuItem,
              { borderBottomColor: colors.border.subtle },
            ]}
            onPress={openAddModal}
            accessibilityRole="button"
            accessibilityLabel="Thêm chi tiêu mới"
          >
            <View
              style={[
                styles.iconContainer,
                { backgroundColor: colors.brand.muted },
              ]}
            >
              <Ionicons
                name="add-circle-outline"
                size={20}
                color={colors.brand.default}
              />
            </View>
            <AppText style={[styles.menuLabel, { color: colors.text.primary }]}>
              Chi tiêu mới
            </AppText>
          </PressableScale>
          <PressableScale
            style={[
              styles.menuItem,
              { borderBottomColor: colors.border.subtle },
            ]}
            onPress={() => handleSeed()}
            disabled={seeding}
            accessibilityRole="button"
            accessibilityLabel="Tạo dữ liệu mẫu"
          >
            <View
              style={[
                styles.iconContainer,
                { backgroundColor: colors.surface.sunken },
              ]}
            >
              {seeding ? (
                <ActivityIndicator size="small" color={colors.brand.default} />
              ) : (
                <Ionicons
                  name="flask-outline"
                  size={20}
                  color={colors.brand.default}
                />
              )}
            </View>
            <AppText style={[styles.menuLabel, { color: colors.text.primary }]}>
              Seed dữ liệu
            </AppText>
          </PressableScale>
          <PressableScale
            style={[styles.menuItem, { borderBottomWidth: 0 }]}
            onPress={closeMenu}
            accessibilityRole="button"
            accessibilityLabel="Đóng"
          >
            <View
              style={[
                styles.iconContainer,
                { backgroundColor: colors.surface.sunken },
              ]}
            >
              <Ionicons
                name="settings-outline"
                size={20}
                color={colors.text.secondary}
              />
            </View>
            <AppText style={[styles.menuLabel, { color: colors.text.primary }]}>
              Cài đặt
            </AppText>
          </PressableScale>
        </BlurView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: { position: "absolute", inset: 0, zIndex: 2000 },
  backdrop: {
    position: "absolute",
    inset: 0,
  },
  menuContainer: { position: "absolute", top: 60, right: 20 },
  menuContent: {
    width: 208,
    borderRadius: 24,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.6)",
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    gap: 12,
    borderBottomWidth: 1,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  menuLabel: {
    fontWeight: "700",
  },
});
