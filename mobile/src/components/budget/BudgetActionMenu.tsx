import { tws } from "@/src/utils/tws";
import { palette } from "@/src/theme";
import { PressableScale, AppText } from "@/src/ui-kit";
import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { ActivityIndicator, Pressable, View } from "react-native";

interface BudgetActionMenuProps {
    showMenu: boolean;
    closeMenu: () => void;
    openAddModal: () => void;
    handleSeed: () => void;
    seeding: boolean;
}

export default function BudgetActionMenu({ showMenu, closeMenu, openAddModal, handleSeed, seeding }: BudgetActionMenuProps) {
    if (!showMenu) return null;
    return (
        <View style={[tws("absolute inset-0 z-[2000]"), { zIndex: 2000 }]}>
            <Pressable style={tws("absolute inset-0 bg-black/10")} onPress={closeMenu} />
            <View style={{ position: 'absolute', top: 60, right: 20 }}>
                <BlurView intensity={90} tint="light" style={tws("w-52 rounded-3xl overflow-hidden border border-white shadow-2xl shadow-black/10")}>
                    <PressableScale style={tws("flex-row items-center p-4 gap-3 border-b border-divider")} onPress={openAddModal}>
                        <View style={tws("w-9 h-9 rounded-xl items-center justify-center bg-secondary/10")}>
                            <Ionicons name="add-circle-outline" size={20} color={(palette as any).secondary} />
                        </View>
                        <AppText variant="bodyBold" color="slate-800">Chi tiêu mới</AppText>
                    </PressableScale>
                    <PressableScale style={tws("flex-row items-center p-4 gap-3 border-b border-divider")} onPress={() => handleSeed()} disabled={seeding}>
                        <View style={tws("w-9 h-9 rounded-xl items-center justify-center bg-indigo-50")}>
                            {seeding
                                ? <ActivityIndicator size="small" color={(palette as any).secondary} />
                                : <Ionicons name="flask-outline" size={20} color={(palette as any).secondary} />}
                        </View>
                        <AppText variant="bodyBold" color="slate-800">Seed dữ liệu</AppText>
                    </PressableScale>
                    <PressableScale style={tws("flex-row items-center p-4 gap-3")} onPress={closeMenu}>
                        <View style={tws("w-9 h-9 rounded-xl items-center justify-center bg-slate-100")}>
                            <Ionicons name="settings-outline" size={20} color={(palette as any)['slate-600']} />
                        </View>
                        <AppText variant="bodyBold" color="slate-800">Cài đặt</AppText>
                    </PressableScale>
                </BlurView>
            </View>
        </View>
    );
}