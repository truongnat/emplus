import React, { useState, useCallback } from "react";
import { View, FlatList, RefreshControl, StyleSheet } from "react-native";
import { AppScreen } from "@/src/components/organisms/AppScreen";
import { Text } from "@/src/components/atoms/Text";
import { useThemeColors } from "@/src/theme";
import { useBudgetData } from "@/src/features/budget";
import {
  BudgetSummaryCard,
  ExpenseItem,
  BudgetHeader,
  BudgetFilter,
  BudgetActionMenu,
} from "@/src/features/budget";
import { seedHappyCase, type BudgetItem } from "@/src/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/src/toast-context";
import { useSession } from "@/src/session-context";
import { useRouter } from "expo-router";
import { EmplusLottie } from "@/src/components/atoms/EmplusLottie";
import { lottieInventory } from "@/src/lottie/inventory";

export default function BudgetScreen() {
  const router = useRouter();
  const colors = useThemeColors();
  const { showToast } = useToast();
  const { withAccessToken } = useSession();
  const queryClient = useQueryClient();

  const {
    loading,
    summary,
    items,
    activeFilter,
    onFilterChange,
    fetchNextPage,
    refresh,
  } = useBudgetData();

  const [showMenu, setShowMenu] = useState(false);

  const { mutate: handleSeed, isPending: seeding } = useMutation({
    mutationFn: () => withAccessToken(seedHappyCase),
    onSuccess: (data: any) => {
      let msg = `Đã thêm ${data.seededMemories} kỷ niệm và ${data.seededBudget} chi tiêu!`;
      if (data.autoPaired) {
        msg = "Đã tự động ghép đôi và " + msg.toLowerCase();
      }
      showToast(msg, "success");
      setShowMenu(false);
      void queryClient.invalidateQueries({ queryKey: ["budgetSummary"] });
      void queryClient.invalidateQueries({ queryKey: ["budgetExpenses"] });
    },
    onError: (err: any) => {
      showToast(err.message || "Không thể seed dữ liệu", "error");
    },
  });

  const renderItem = useCallback(
    ({ item }: { item: BudgetItem }) => <ExpenseItem item={item} />,
    [],
  );

  const keyExtractor = useCallback((item: BudgetItem) => item.id, []);

  const openAddModal = useCallback(() => {
    router.push("/add-expense");
  }, [router]);

  const closeMenu = useCallback(() => {
    setShowMenu(false);
  }, []);

  if (!summary && !loading) {
    return (
      <AppScreen>
        <View style={styles.centerContainer}>
          <EmplusLottie
            source={lottieInventory.empty}
            style={{ width: 140, height: 140 }}
            loop
          />
          <Text style={[styles.centerText, { color: colors.text.secondary }]}>
            Chưa có dữ liệu ngân sách
          </Text>
        </View>
      </AppScreen>
    );
  }

  return (
    <AppScreen>
      <View style={styles.container}>
        {/* Header with Menu */}
        <BudgetHeader
          showMenu={showMenu}
          onToggleMenu={() => setShowMenu(!showMenu)}
        />

        {/* Main Content */}
        <View style={styles.content}>
          {/* Budget Summary Card */}
          <BudgetSummaryCard summary={summary} />

          {/* Filter Pills */}
          <BudgetFilter
            activeFilter={activeFilter}
            onFilterChange={onFilterChange}
          />

          {/* Expense List */}
          <FlatList
            data={items}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                refreshing={loading}
                onRefresh={refresh}
                tintColor={colors.brand.default}
              />
            }
            onEndReached={fetchNextPage}
            onEndReachedThreshold={0.5}
            ListEmptyComponent={
              !loading ? (
                <View style={styles.emptyContainer}>
                  <Text style={[styles.emptyText, { color: colors.text.tertiary }]}>
                    Chưa có hạng mục chi tiêu nào.
                  </Text>
                </View>
              ) : null
            }
          />
        </View>

        {/* Action Menu */}
        <BudgetActionMenu
          showMenu={showMenu}
          closeMenu={closeMenu}
          openAddModal={openAddModal}
          handleSeed={() => handleSeed()}
          seeding={seeding}
        />
      </View>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  listContent: {
    paddingBottom: 120,
    paddingTop: 12,
    paddingHorizontal: 20,
  },
  centerContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  centerText: {
    fontSize: 16,
    textAlign: "center",
  },
  emptyContainer: {
    paddingVertical: 80,
    alignItems: "center",
  },
  emptyText: {
    fontSize: 15,
  },
});
