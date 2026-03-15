import { palette } from "@/src/theme";
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

const styles = StyleSheet.create({
  overlay: { position: "absolute", inset: 0, zIndex: 2000 },
  backdrop: {
    position: "absolute",
    inset: 0,
    backgroundColor: "rgba(0,0,0,0.1)",
  },
  menuContainer: { position: "absolute", top: 60, right: 20 },
  menuContent: {
    width: 208,
    borderRadius: 24,
    overflow: "hidden" as "hidden",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.6)",
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    gap: 12,
    borderBottomWidth: 1,
    borderBottomColor: palette.zinc100,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  iconContainerSecondary: { backgroundColor: `${palette.violet500}1a` },
  iconContainerIndigo: { backgroundColor: "#e0e7ff" },
  iconContainerSlate: { backgroundColor: palette.zinc100 },
});

export default function BudgetActionMenu({
  showMenu,
  closeMenu,
  openAddModal,
  handleSeed,
  seeding,
}: BudgetActionMenuProps) {
  if (!showMenu) return null;

  return (
    <View style={styles.overlay}>
      <Pressable style={styles.backdrop} onPress={closeMenu} />
      <View style={styles.menuContainer}>
        <BlurView intensity={90} tint="light" style={styles.menuContent}>
          <PressableScale style={styles.menuItem} onPress={openAddModal}>
            <View style={[styles.iconContainer, styles.iconContainerSecondary]}>
              <Ionicons
                name="add-circle-outline"
                size={20}
                color={palette.violet500}
              />
            </View>
            <AppText style={{ fontWeight: "bold", color: palette.zinc800 }}>
              Chi tiêu mới
            </AppText>
          </PressableScale>
          <PressableScale
            style={styles.menuItem}
            onPress={() => handleSeed()}
            disabled={seeding}
          >
            <View style={[styles.iconContainer, styles.iconContainerIndigo]}>
              {seeding ? (
                <ActivityIndicator size="small" color={palette.violet500} />
              ) : (
                <Ionicons
                  name="flask-outline"
                  size={20}
                  color={palette.violet500}
                />
              )}
            </View>
            <AppText style={{ fontWeight: "bold", color: palette.zinc800 }}>
              Seed dữ liệu
            </AppText>
          </PressableScale>
          <PressableScale
            style={[styles.menuItem, { borderBottomWidth: 0 }]}
            onPress={closeMenu}
          >
            <View style={[styles.iconContainer, styles.iconContainerSlate]}>
              <Ionicons
                name="settings-outline"
                size={20}
                color={palette.zinc600}
              />
            </View>
            <AppText style={{ fontWeight: "bold", color: palette.zinc800 }}>
              Cài đặt
            </AppText>
          </PressableScale>
        </BlurView>
      </View>
    </View>
  );
}
