import { tws } from "@/src/utils/tws";
import React, { useState, useCallback } from "react";
import {
    View,
    FlatList,
    RefreshControl,
} from "react-native";
import { palette } from "../../src/theme";
import { AppScreen, AppText } from "../../src/ui-kit";
import { useBudgetData } from "../../src/components/budget/useBudgetData";
import { seedHappyCase, type BudgetItem } from "../../src/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/src/toast-context";
import { useSession } from "@/src/session-context";
import { useRouter } from "expo-router";

// Modular Components
import { BudgetSummaryCard } from "../../src/components/budget/BudgetSummaryCard";
import { ExpenseItem } from "../../src/components/budget/ExpenseItem";
import BudgetHeader from "@/src/components/budget/BudgetHeader";
import BudgetFilter from "@/src/components/budget/budget-filter";
import BudgetActionMenu from "@/src/components/budget/BudgetActionMenu";

// --- Main Component ---

export default function BudgetScreen() {
    const {
        loading,
        summary,
        items,
        activeFilter,
        onFilterChange,
        fetchNextPage,
        refresh,
    } = useBudgetData();

    const router = useRouter();
    const { withAccessToken, refreshAuth } = useSession();
    const { showToast } = useToast();
    const [showMenu, setShowMenu] = useState(false);

    const queryClient = useQueryClient();

    const { mutate: handleSeed, isPending: seeding } = useMutation({
        mutationFn: () => withAccessToken(seedHappyCase),
        onSuccess: (data: any) => {
            let msg = `Đã thêm ${data.seededMemories} kỷ niệm và ${data.seededBudget} chi tiêu!`;
            if (data.autoPaired) {
                msg = "Đã tự động ghép đôi và " + msg.toLowerCase();
                // If auto-paired, rotation session to get updated isPaired flag
                void refreshAuth();
            }
            showToast(msg, "success");

            setShowMenu(false);
            void queryClient.invalidateQueries({ queryKey: ["budgetSummary"] });
            void queryClient.invalidateQueries({ queryKey: ["budgetExpenses"] });
            void queryClient.invalidateQueries({ queryKey: ["timelineMemories"] });
        },
        onError: (err: any) => {
            showToast(err.message || "Không thể seed dữ liệu", "error");
        }
    });

    const renderItem = useCallback(({ item }: { item: BudgetItem }) => (
        <ExpenseItem item={item} />
    ), []);

    const keyExtractor = useCallback((item: BudgetItem) => item.id, []);

    return (
        <AppScreen scroll={false}>
            <View style={tws("flex-1")}>
                {/* Header */}
                <BudgetHeader
                    showMenu={showMenu}
                    onToggleMenu={() => setShowMenu(!showMenu)}
                />

                {/* Main List with Summary as Header */}
                <View style={tws("flex-1")}>
                    {/* Fixed Card + Filter (not scrollable) */}
                    <BudgetSummaryCard summary={summary} />

                    <BudgetFilter activeFilter={activeFilter} onFilterChange={onFilterChange} />

                    {/* Scrollable expense list */}
                    <FlatList
                        data={items}
                        renderItem={renderItem}
                        keyExtractor={keyExtractor}
                        contentContainerStyle={{ paddingBottom: 120, paddingTop: 12, paddingHorizontal: 20 }}
                        showsVerticalScrollIndicator={false}
                        ListEmptyComponent={
                            !loading ? (
                                <View style={tws("py-20 items-center")}>
                                    <AppText variant="body" color="slate-400">
                                        Chưa có hạng mục chi tiêu nào.
                                    </AppText>
                                </View>
                            ) : null
                        }
                        refreshControl={
                            <RefreshControl
                                refreshing={loading}
                                onRefresh={refresh}
                                colors={[palette.primary]}
                                tintColor={palette.primary}
                            />
                        }
                        onEndReached={fetchNextPage}
                        onEndReachedThreshold={0.5}
                        initialNumToRender={8}
                        maxToRenderPerBatch={8}
                        windowSize={5}
                        removeClippedSubviews={true}
                        updateCellsBatchingPeriod={50}
                    />
                </View>

                {/* Modals and Overlays rendered at the top level */}
                <BudgetActionMenu
                    showMenu={showMenu}
                    closeMenu={() => setShowMenu(false)}
                    openAddModal={() => {
                        setShowMenu(false);
                        router.push("/add-expense");
                    }}
                    handleSeed={handleSeed}
                    seeding={seeding}
                />
            </View>
        </AppScreen>
    );
}
