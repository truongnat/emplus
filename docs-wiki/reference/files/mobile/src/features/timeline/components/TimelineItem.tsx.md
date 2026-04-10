---
title: "mobile/src/features/timeline/components/TimelineItem.tsx"
description: "A React component representing a single item in a timeline."
layout: "doc"
outline: "deep"
editLink: false
lastUpdated: false
pageClass: "docs-wiki docs-wiki--file"
docsWiki:
  schemaVersion: "1.0.0"
  kind: "file"
  project: "emplus"
  template: "detailed"
  themePreset: "clean"
  generatedAt: "2026-04-10T00:09:32.387Z"
  page: "reference/files/mobile/src/features/timeline/components/TimelineItem.tsx.md"
  relativePath: "mobile/src/features/timeline/components/TimelineItem.tsx"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/mobile/src/features/timeline/components/TimelineItem.tsx"
  module: "mobile/src/features/timeline/components"
  workspace: "mobile"
  language: "TypeScript"
  symbolCount: 1
---

# mobile/src/features/timeline/components/TimelineItem.tsx

- Overview: [emplus Docs Wiki](../../../../../../../index.md)
- Summary: [SUMMARY](../../../../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../../../../features/index.md)
- Module: [mobile/src/features/timeline/components](../../../../../../modules/mobile/src/features/timeline/components.md)
- Workspace: [@emplus/mobile](../../../../../../../workspaces/mobile.md)

## Snapshot

- Language: TypeScript
- Source path: `/Users/truongdq/tx/GitHub/emplus/mobile/src/features/timeline/components/TimelineItem.tsx`
- Lines: 576
- Symbols: 1

## AI Summary

A React component representing a single item in a timeline.

### Responsibilities

- renders the item

### Usage Notes

- has several optional properties for customizing its behavior and appearance

## Symbols

### interface `TimelineItemProps`

- Signature: `interface TimelineItemProps`
- Lines: 20-31
- Exported: no

```tsx
interface TimelineItemProps {
  item: MemoryItem;
  /** Nhãn tháng/năm trên trục — thường bật cho phần tử đầu mỗi nhóm ngày */
  showAxis?: boolean;
  /** Ẩn cột trục — dùng khi thẻ nằm trong layout xen kẽ trái/phải */
  omitAxis?: boolean;
  onImagePress?: (images: string[], index: number) => void;
  /** Chạm tiêu đề → màn chi tiết */
  onTitlePress?: () => void;
  /** Vuốt trái hiện nút Xoá; gọi khi user chạm Xoá (parent hiện xác nhận). */
  onDeleteActionPress?: () => void;
}
```
