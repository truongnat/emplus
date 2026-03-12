import { tws } from "@/src/utils/tws";

import React from "react";
import { View, Text } from "react-native";
import { fonts } from "@/src/theme";
import { formatGroupDate } from "@/src/utils/timeline-helpers";
import { MemoryItem } from "@/src/api";
import { TimelineItem } from "./TimelineItem";

export interface TimelineDateGroupProps {
    dateString: string;
    items: MemoryItem[];
    groupIndex: number;
    onImagePress?: (images: string[], index: number) => void;
}

export function TimelineDateGroup({
    dateString,
    items,
    groupIndex,
    onImagePress
}: TimelineDateGroupProps) {
    const isToday = formatGroupDate(dateString) === "HÔM NAY";

    return (
        <View style={tws("mb-2 z-10")}>
            <View style={tws("flex-row items-center gap-4 mb-6")}>
                <View style={tws("w-12 items-center justify-center")}>
                    {isToday ? (
                        <View style={tws("w-[18px] h-[18px] rounded-full bg-rose-100 items-center justify-center")}>
                            <View style={tws("w-2.5 h-2.5 rounded-full bg-primary")} />
                        </View>
                    ) : (
                        <View style={tws("w-2.5 h-2.5 rounded-full bg-slate-300")} />
                    )}
                </View>
                <Text
                    style={tws("text-sm font-bold uppercase tracking-widest text-slate-400", { fontFamily: fonts.bold })}
                >
                    {formatGroupDate(dateString)}
                </Text>
            </View>

            {items.map((item, itemIndex) => (
                <TimelineItem
                    key={item.id}
                    item={item}
                    showAxis={groupIndex === 0 || itemIndex === 0}
                    onImagePress={onImagePress}
                />
            ))}
        </View>
    );
}
