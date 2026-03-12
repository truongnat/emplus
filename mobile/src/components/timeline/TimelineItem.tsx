import { tws } from "@/src/utils/tws";
import React, { useMemo, useCallback } from "react";
import { View } from "react-native";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { type MemoryItem } from "@/src/api";
import { fonts, palette } from "@/src/theme";
import { PressableScale, AppText } from "@/src/ui-kit";
import { parseMediaUrls, getMemoryTime, getAxisMonthYear } from "@/src/utils/timeline-helpers";

export interface TimelineItemProps {
    item: MemoryItem;
    showAxis?: boolean;
    onImagePress?: (images: string[], index: number) => void;
}

export const TimelineItem = React.memo(function TimelineItem({ item, showAxis = false, onImagePress }: TimelineItemProps) {
    const mediaUrls = useMemo(() => parseMediaUrls(item.mediaUrls), [item.mediaUrls]);
    const isPayment = useMemo(() => item.tags?.includes("chi-phi"), [item.tags]);
    const isTask = useMemo(() => item.tags?.includes("nhiem-vu"), [item.tags]);
    const hasMultipleImages = mediaUrls.length > 1;
    const hasSingleImage = mediaUrls.length === 1;

    const handleImagePress = useCallback((index: number) => {
        onImagePress?.(mediaUrls, index);
    }, [onImagePress, mediaUrls]);

    const renderCardContent = useCallback(() => {
        if (isPayment) {
            return (
                <View style={tws("p-4.5")}>
                    <View style={tws("flex-row items-center justify-between mb-4")}>
                        <View style={tws("flex-row items-center gap-3.5 flex-1 overflow-hidden")}>
                            <View style={tws("w-11 h-11 rounded-2xl items-center justify-center bg-white/60 shadow-sm")}>
                                <Ionicons name="card-outline" size={22} color={(palette as any).secondary} />
                            </View>
                            <View style={tws("flex-1")}>
                                <AppText variant="bodyBold" color="slate-900" numberOfLines={1} style={{ fontFamily: fonts.vietnamBold }}>
                                    {item.title}
                                </AppText>
                                <AppText variant="caption" color="slate-400" numberOfLines={1} style={{ fontFamily: fonts.vietnamSemiBold }}>
                                    Hoạt động thanh toán
                                </AppText>
                            </View>
                        </View>
                        <AppText variant="captionBold" color="slate-400" style={tws("tracking-tighter uppercase")}>
                            {getMemoryTime(item.createdAt)}
                        </AppText>
                    </View>
                    {!!item.description && (
                        <View style={tws("mt-1 bg-white/40 p-3.5 rounded-2xl border border-white/50")}>
                            <AppText variant="caption" color="slate-600" style={tws("leading-[19px]")}>
                                {item.description}
                            </AppText>
                        </View>
                    )}
                </View>
            );
        }

        if (isTask) {
            return (
                <View style={tws("p-4.5")}>
                    <View style={tws("flex-row items-center justify-between")}>
                        <View style={tws("flex-row items-center gap-3.5 flex-1 overflow-hidden")}>
                            <View style={tws("w-11 h-11 rounded-2xl items-center justify-center bg-white/60 shadow-sm")}>
                                <Ionicons name="checkmark-done" size={22} color={(palette as any).success} />
                            </View>
                            <View style={tws("flex-1")}>
                                <AppText variant="bodyBold" color="slate-900" numberOfLines={1} style={{ fontFamily: fonts.vietnamBold }}>
                                    {item.title}
                                </AppText>
                                <AppText variant="caption" color="slate-400" numberOfLines={1} style={{ fontFamily: fonts.vietnamSemiBold }}>
                                    Nhiệm vụ hoàn tất
                                </AppText>
                            </View>
                        </View>
                    </View>
                </View>
            );
        }

        return (
            <View style={tws("p-4.5")}>
                <View style={tws("flex-row items-center justify-between mb-4")}>
                    <View style={tws("flex-row items-center gap-3 flex-1 overflow-hidden")}>
                        <View style={tws("w-8 h-8 rounded-xl bg-white/60 items-center justify-center shadow-sm")}>
                            <Ionicons name={hasSingleImage || hasMultipleImages ? "images-outline" : "sparkles-outline"} size={16} color={(palette as any).secondary} />
                        </View>
                        <AppText variant="bodyBold" color="slate-800" numberOfLines={1} style={tws("flex-1 tracking-tight")}>
                            {item.title}
                        </AppText>
                    </View>
                    <AppText variant="captionBold" color="slate-400" style={tws("uppercase")}>
                        {getMemoryTime(item.createdAt)}
                    </AppText>
                </View>

                {hasMultipleImages ? (
                    <View style={tws("flex-row gap-2 w-full h-[190px] mt-1")}>
                        <PressableScale
                            style={tws("flex-1 rounded-3xl overflow-hidden bg-slate-100-muted shadow-sm")}
                            onPress={() => handleImagePress(0)}
                        >
                            <Image source={{ uri: mediaUrls[0] }} style={tws("w-full h-full") as any} contentFit="cover" transition={200} cachePolicy="memory-disk" placeholder={{ blurhash: "L6PZfSi_.AyE_3t7t7R**0o#DgR4" }} />
                        </PressableScale>
                        <PressableScale
                            style={tws("flex-1 rounded-3xl overflow-hidden bg-slate-100-muted shadow-sm")}
                            onPress={() => handleImagePress(1)}
                        >
                            <Image source={{ uri: mediaUrls[1] }} style={tws("w-full h-full") as any} contentFit="cover" transition={200} cachePolicy="memory-disk" placeholder={{ blurhash: "L6PZfSi_.AyE_3t7t7R**0o#DgR4" }} />
                            {mediaUrls.length > 2 && (
                                <View style={tws("absolute inset-0 bg-black/30 items-center justify-center backdrop-blur-sm")}>
                                    <AppText variant="h2" color="white">+{mediaUrls.length - 2}</AppText>
                                </View>
                            )}
                        </PressableScale>
                    </View>
                ) : hasSingleImage ? (
                    <PressableScale
                        style={tws("w-full h-[240px] rounded-3xl overflow-hidden bg-slate-100-muted shadow-md mt-1")}
                        onPress={() => handleImagePress(0)}
                    >
                        <Image source={{ uri: mediaUrls[0] }} style={tws("w-full h-full") as any} contentFit="cover" transition={200} cachePolicy="memory-disk" placeholder={{ blurhash: "L6PZfSi_.AyE_3t7t7R**0o#DgR4" }} />
                    </PressableScale>
                ) : item.description ? (
                    <View style={tws("bg-white/40 p-4 rounded-2xl border border-white/60")}>
                        <AppText variant="body" color="slate-600" style={tws("leading-[20px]")}>
                            {item.description}
                        </AppText>
                    </View>
                ) : null}
            </View>
        );
    }, [isPayment, isTask, item, hasSingleImage, hasMultipleImages, mediaUrls, handleImagePress]);

    return (
        <View style={tws(`flex-row mb-9 mx-6 ${showAxis ? "mt-12" : ""}`)}>
            <View style={tws("w-12 items-center justify-start")}>
                {/* Continuous Axis Line segment */}
                <View style={tws("absolute top-0 bottom-[-36px] w-[2px] bg-slate-200/60")} />

                {showAxis && (
                    <View style={tws("absolute -top-4 left-0 right-0 items-center z-10")}>
                        <BlurView intensity={30} tint="light" style={tws("px-3 py-1 rounded-full border border-white/80 shadow-glass items-center justify-center overflow-hidden")}>
                            <AppText
                                variant="captionBold"
                                color="secondary"
                                numberOfLines={1}
                                style={tws("text-[9px] text-center uppercase tracking-wider")}
                            >
                                {getAxisMonthYear(item)}
                            </AppText>
                        </BlurView>
                    </View>
                )}
                <View style={tws("w-4 h-4 rounded-full bg-white mt-[23px] items-center justify-center border border-slate-100 shadow-sm z-10")}>
                    <View style={tws("w-1.5 h-1.5 rounded-full bg-slate-300")} />
                </View>
            </View>

            <View style={tws("flex-1 bg-white/45 rounded-[32px] overflow-hidden border border-white/60 shadow-glass")}>
                {renderCardContent()}
            </View>
        </View>
    );
});
