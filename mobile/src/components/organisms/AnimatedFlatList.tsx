/**
 * AnimatedFlatList.tsx
 * Wrapper around FlashList with animations
 */

import React, { forwardRef, useCallback, useRef, memo } from "react";
import { StyleSheet, View, Text } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { RefreshControl } from "react-native";
import Animated, {
  FadeIn,
  FadeOut,
  LinearTransition,
  SlideInLeft,
  SlideInRight,
  ZoomIn,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
  Easing,
} from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";

export type ItemAnimation =
  | "fade"
  | "slide-left"
  | "slide-right"
  | "zoom"
  | "spring-up"
  | "none";

export interface SwipeAction {
  label: string;
  icon?: React.ReactNode;
  color: string;
  textColor?: string;
  onPress: (id: string) => void;
  isDestructive?: boolean;
}

export interface AnimatedListHandle {
  scrollToTop: () => void;
  scrollToIndex: (index: number) => void;
  flashItem: (index: number) => void;
}

export interface AnimatedListProps<T> {
  data: T[];
  keyExtractor: (item: T, index: number) => string;
  renderItem: (info: { item: T; index: number }) => React.ReactNode;
  itemEnterAnimation?: ItemAnimation;
  itemEnterDelay?: number;
  leftActions?: SwipeAction[];
  rightActions?: SwipeAction[];
  headerComponent?: React.ReactNode;
  headerHeight?: number;
  stickyHeader?: boolean;
  parallaxHeader?: boolean;
  isLoading?: boolean;
  skeletonCount?: number;
  skeletonComponent?: () => React.ReactNode;
  emptyComponent?: React.ReactNode;
  footerLoadingComponent?: React.ReactNode;
  onEndReached?: () => void;
  onEndReachedThreshold?: number;
  isLoadingMore?: boolean;
  onRefresh?: () => void;
  isRefreshing?: boolean;
  estimatedItemSize?: number;
  style?: any;
  contentContainerStyle?: any;
}

const ACTION_WIDTH = 80;

const SwipeableItem = memo(function SwipeableItem<T>({
  item,
  itemId,
  renderItem,
  index,
  leftActions = [],
  rightActions = [],
  enterAnimation,
  enterDelay,
}: {
  item: T;
  itemId: string;
  renderItem: (info: { item: T; index: number }) => React.ReactNode;
  index: number;
  leftActions?: SwipeAction[];
  rightActions?: SwipeAction[];
  enterAnimation: ItemAnimation;
  enterDelay: number;
}) {
  const translateX = useSharedValue(0);
  const itemHeight = useSharedValue(0);
  const startX = useSharedValue(0);

  const leftWidth = leftActions.length * ACTION_WIDTH;
  const rightWidth = rightActions.length * ACTION_WIDTH;
  const hasActions = leftActions.length > 0 || rightActions.length > 0;

  const panGesture = Gesture.Pan()
    .enabled(hasActions)
    .activeOffsetX([-10, 10])
    .failOffsetY([-5, 5])
    .onStart(() => {
      startX.value = translateX.value;
    })
    .onUpdate((e) => {
      const next = startX.value + e.translationX;
      if (next > 0) {
        translateX.value = Math.min(next, leftWidth * 1.2);
      } else {
        translateX.value = Math.max(next, -rightWidth * 1.2);
      }
    })
    .onEnd((e) => {
      const vel = e.velocityX;
      const pos = translateX.value;

      if (pos > leftWidth / 2) {
        translateX.value = withTiming(leftWidth, { duration: 250, easing: Easing.out(Easing.quad) });
      } else if (pos < -rightWidth / 2) {
        translateX.value = withTiming(-rightWidth, { duration: 250, easing: Easing.out(Easing.quad) });
      } else {
        translateX.value = withTiming(0, { duration: 250, easing: Easing.out(Easing.quad) });
      }
    });

  const rowStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const containerStyle = useAnimatedStyle(() => ({
    height: itemHeight.value === 0 ? undefined : itemHeight.value,
    overflow: "hidden",
  }));

  const entering =
    enterAnimation === "fade"
      ? FadeIn.delay(enterDelay).duration(350)
      : enterAnimation === "slide-left"
        ? undefined
        : enterAnimation === "zoom"
          ? undefined
          : FadeIn.delay(enterDelay).duration(350);

  return (
    <Animated.View
      entering={entering}
      layout={LinearTransition.springify().damping(20).stiffness(250)}
      style={containerStyle}
      onLayout={(e) => {
        if (itemHeight.value === 0) {
          itemHeight.value = e.nativeEvent.layout.height;
        }
      }}
    >
      {leftActions.length > 0 && (
        <View
          style={[
            styles.actionsContainer,
            styles.leftActions,
            { width: leftWidth },
          ]}
        >
          {leftActions.map((action, i) => (
            <View
              key={i}
              style={[
                styles.actionButton,
                { width: ACTION_WIDTH, backgroundColor: action.color },
              ]}
            >
              <Text
                style={[
                  styles.actionLabel,
                  { color: action.textColor || "#fff" },
                ]}
              >
                {action.label}
              </Text>
            </View>
          ))}
        </View>
      )}

      {rightActions.length > 0 && (
        <View
          style={[
            styles.actionsContainer,
            styles.rightActions,
            { width: rightWidth },
          ]}
        >
          {rightActions.map((action, i) => (
            <View
              key={i}
              style={[
                styles.actionButton,
                { width: ACTION_WIDTH, backgroundColor: action.color },
              ]}
            >
              <Text
                style={[
                  styles.actionLabel,
                  { color: action.textColor || "#fff" },
                ]}
              >
                {action.label}
              </Text>
            </View>
          ))}
        </View>
      )}

      <GestureDetector gesture={panGesture}>
        <Animated.View style={rowStyle}>
          {renderItem({ item, index })}
        </Animated.View>
      </GestureDetector>
    </Animated.View>
  );
});

function itemEnterAnim(type: ItemAnimation, delay: number) {
  switch (type) {
    case "fade":
      return FadeIn.delay(delay).duration(350);
    case "slide-left":
      return SlideInLeft.delay(delay).duration(350);
    case "slide-right":
      return SlideInRight.delay(delay).duration(350);
    case "zoom":
      return ZoomIn.delay(delay).duration(350);
    case "spring-up":
      return FadeIn.delay(delay).springify();
    case "none":
      return undefined;
    default:
      return FadeIn.delay(delay).duration(350);
  }
}

export const AnimatedFlatList = forwardRef(function AnimatedFlatList<T>(
  {
    data,
    keyExtractor,
    renderItem,
    itemEnterAnimation = "fade",
    itemEnterDelay = 30,
    leftActions = [],
    rightActions = [],
    headerComponent,
    headerHeight = 200,
    stickyHeader = false,
    parallaxHeader = false,
    isLoading = false,
    skeletonCount = 6,
    skeletonComponent,
    emptyComponent,
    footerLoadingComponent,
    onEndReached,
    onEndReachedThreshold = 0.3,
    isLoadingMore = false,
    onRefresh,
    isRefreshing = false,
    estimatedItemSize = 80,
    style,
    contentContainerStyle,
  }: AnimatedListProps<T>,
  ref: React.Ref<AnimatedListHandle>,
) {
  const listRef = useRef<any>(null);

  const renderWrappedItem = useCallback(
    ({ item, index }: { item: T; index: number }) => (
      <SwipeableItem
        key={keyExtractor(item, index)}
        item={item}
        itemId={keyExtractor(item, index)}
        renderItem={renderItem as any}
        index={index}
        leftActions={leftActions}
        rightActions={rightActions}
        enterAnimation={itemEnterAnimation}
        enterDelay={itemEnterDelay}
      />
    ),
    [
      renderItem,
      leftActions,
      rightActions,
      itemEnterAnimation,
      itemEnterDelay,
      keyExtractor,
    ],
  );

  const ListHeader = headerComponent ? () => <>{headerComponent}</> : undefined;
  const ListFooter = isLoadingMore
    ? () =>
        footerLoadingComponent ? (
          <>{footerLoadingComponent}</>
        ) : (
          <Animated.View entering={FadeIn} style={styles.loadingFooter}>
            <Text style={styles.loadingMoreText}>Loading more…</Text>
          </Animated.View>
        )
    : undefined;

  if (isLoading) {
    return (
      <View style={style}>
        {Array.from({ length: skeletonCount }).map((_, i) =>
          skeletonComponent ? (
            skeletonComponent()
          ) : (
            <View key={i} style={styles.skeletonItem} />
          ),
        )}
      </View>
    );
  }

  if (data.length === 0 && !isLoading) {
    return (
      <Animated.View
        entering={FadeIn.duration(400)}
        style={[styles.emptyContainer, style]}
      >
        {emptyComponent || <Text style={styles.emptyText}>No items yet</Text>}
      </Animated.View>
    );
  }

  return (
    <FlashList
      ref={listRef}
      data={data}
      keyExtractor={keyExtractor}
      renderItem={renderWrappedItem}
      ListHeaderComponent={ListHeader}
      ListFooterComponent={ListFooter}
      onEndReached={onEndReached}
      onEndReachedThreshold={onEndReachedThreshold}
      removeClippedSubviews={true}
      refreshControl={
        onRefresh ? (
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={onRefresh}
            tintColor="#7C3AED"
          />
        ) : undefined
      }
      contentContainerStyle={contentContainerStyle}
      drawDistance={500}
      overrideItemLayout={(layout: any) => {
        layout.size = estimatedItemSize;
      }}
    />
  );
}) as <T>(
  props: AnimatedListProps<T> & { ref?: React.Ref<AnimatedListHandle> },
) => React.ReactElement;

const styles = StyleSheet.create({
  actionsContainer: {
    position: "absolute",
    top: 0,
    bottom: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  leftActions: {
    left: 0,
    justifyContent: "flex-start",
  },
  rightActions: {
    right: 0,
    justifyContent: "flex-end",
  },
  actionButton: {
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  actionLabel: {
    fontSize: 13,
    fontWeight: "600",
    textAlign: "center",
  },
  skeletonItem: {
    flexDirection: "row",
    padding: 16,
    gap: 12,
    alignItems: "center",
    backgroundColor: "#E4E4E7",
    marginBottom: 8,
    borderRadius: 8,
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 40,
  },
  emptyText: {
    fontSize: 15,
    color: "#71717A",
  },
  loadingFooter: {
    padding: 16,
    alignItems: "center",
  },
  loadingMoreText: {
    fontSize: 13,
    color: "#71717A",
  },
});
