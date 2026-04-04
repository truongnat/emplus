import React from "react";
import { type MemoryItem } from "@/src/api";
import { TimelineItem } from "./TimelineItem";

export interface TimelineMemoryRowProps {
  item: MemoryItem;
  onOpenViewer: (images: string[], index: number) => void;
  onTitlePressById: (id: string) => void;
  onDeleteItem: (item: MemoryItem) => void;
}

/**
 * Bọc hàng list với callback ổn định từ cha — `TimelineItem` memo có hiệu lực.
 */
export const TimelineMemoryRow = React.memo(function TimelineMemoryRow({
  item,
  onOpenViewer,
  onTitlePressById,
  onDeleteItem,
}: TimelineMemoryRowProps) {
  return (
    <TimelineItem
      item={item}
      showAxis={false}
      onImagePress={onOpenViewer}
      onTitlePress={() => onTitlePressById(item.id)}
      onDeleteActionPress={() => onDeleteItem(item)}
    />
  );
});
