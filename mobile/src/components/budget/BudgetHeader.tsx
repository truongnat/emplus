import { tws } from "@/src/utils/tws";

import { palette } from "@/src/theme";
import { AppText, PressableScale } from "@/src/ui-kit";
import { cn } from "@/src/utils/cn";
import { Ionicons } from "@expo/vector-icons";
import { Fragment, useCallback, useState } from "react";
import { Text, View } from "react-native";
import BudgetActionMenu from "./BudgetActionMenu";


interface BudgetHeaderProps {
    showMenu: boolean;
    onToggleMenu: () => void;
}

export default function BudgetHeader({ showMenu, onToggleMenu }: BudgetHeaderProps) {


    return (
        <Fragment key={'budget-header'}>
            <View style={tws("flex-row items-center justify-between px-5 pt-6 pb-3 relative z-[1001]")}>
                <AppText variant="h2" color="slate-900" style={tws("tracking-tighter")}>
                    Ngân sách
                </AppText>
                <PressableScale
                    onPress={onToggleMenu}
                    style={tws(
                        'flex-row items-center gap-1.5 px-4 py-2.5 rounded-full',
                        showMenu ? "bg-slate-900 border-slate-900 shadow-lg" : "bg-white/70 border-white/80"
                    )}

                >
                    <Ionicons
                        name={showMenu ? "close" : "options-outline"}
                        size={18}
                        color={showMenu ? "white" : (palette as any)['slate-800']}
                    />
                    <AppText
                        variant="bodyBold"
                        color={showMenu ? "white" : "slate-800"}
                        style={tws("text-[13px]")}
                    >
                        {showMenu ? "Đóng" : "Quản lý"}
                    </AppText>
                </PressableScale>
            </View>
            {/* Menu will be rendered at the screen level to avoid overlap issues */}
        </Fragment>
    );
}
