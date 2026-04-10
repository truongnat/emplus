---
title: "mobile/src/features/timeline/components/TimelineDateGroup.tsx"
description: "React component for displaying a group of timeline dates with an image"
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
  page: "reference/files/mobile/src/features/timeline/components/TimelineDateGroup.tsx.md"
  relativePath: "mobile/src/features/timeline/components/TimelineDateGroup.tsx"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/mobile/src/features/timeline/components/TimelineDateGroup.tsx"
  module: "mobile/src/features/timeline/components"
  workspace: "mobile"
  language: "TypeScript"
  symbolCount: 2
---

# mobile/src/features/timeline/components/TimelineDateGroup.tsx

- Overview: [emplus Docs Wiki](../../../../../../../index.md)
- Summary: [SUMMARY](../../../../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../../../../features/index.md)
- Module: [mobile/src/features/timeline/components](../../../../../../modules/mobile/src/features/timeline/components.md)
- Workspace: [@emplus/mobile](../../../../../../../workspaces/mobile.md)

## Snapshot

- Language: TypeScript
- Source path: `/Users/truongdq/tx/GitHub/emplus/mobile/src/features/timeline/components/TimelineDateGroup.tsx`
- Lines: 62
- Symbols: 2

## AI Summary

React component for displaying a group of timeline dates with an image

## Public API

- `interface TimelineDateGroupProps` — function:key:1
- `function TimelineDateGroup({ dateString, items, groupIndex, onImagePress, }: TimelineDateGroupProps)`

## Symbols

### interface `TimelineDateGroupProps`

- Signature: `interface TimelineDateGroupProps`
- Lines: 10-15
- Exported: yes
- Summary: function:key:1

```tsx
interface TimelineDateGroupProps {
  dateString: string;
  items: MemoryItem[];
  groupIndex: number;
  onImagePress?: (images: string[], index: number) => void;
}
```

### function `TimelineDateGroup`

- Signature: `function TimelineDateGroup({ dateString, items, groupIndex, onImagePress, }: TimelineDateGroupProps)`
- Lines: 17-61
- Exported: yes

```tsx
function TimelineDateGroup({
  dateString,
  items,
  groupIndex,
  onImagePress,
}: TimelineDateGroupProps) {
  const isToday = formatGroupDate(dateString) === "HÔM NAY";

  return (
    <View style={tws("mb-2 z-10")}>
      <View style={tws("flex-row items-center gap-4 mb-6")}>
        <View style={tws("w-12 items-center justify-center")}>
          {isToday ? (
            <View
              style={tws(
                "w-[18px] h-[18px] rounded-full bg-rose-100 items-center justify-center",
              )}
            >
              <View style={tws("w-2.5 h-2.5 rounded-full bg-primary")} />
            </View>
          ) : (
            <View style={tws("w-2.5 h-2.5 rounded-full bg-slate-300")} />
          )}
        </View>
        <Text
          style={tws(
            "text-sm font-bold uppercase tracking-widest text-slate-400",
            { fontFamily: fonts.sans },
          )}
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
```
