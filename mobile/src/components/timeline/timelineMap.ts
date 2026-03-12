import { MemoryItem } from "@/src/api";

export type OrderDirection = "desc" | "asc";

export function groupMemories(items: MemoryItem[], order: OrderDirection) {
    const groups: Record<string, MemoryItem[]> = {};

    items.forEach((item) => {
        const dateKey = item.memoryDate;
        if (!groups[dateKey]) {
            groups[dateKey] = [];
        }
        groups[dateKey].push(item);
    });

    return Object.entries(groups).sort((a, b) =>
        order === "desc" ? b[0].localeCompare(a[0]) : a[0].localeCompare(b[0])
    );
}
