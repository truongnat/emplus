---
title: "mobile/src/features/timeline/hooks/useTimelineDeleteMemory.ts"
description: "The `useTimelineDeleteMemory` hook provides a mechanism for deleting timeline memories with confirmation."
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
  page: "reference/files/mobile/src/features/timeline/hooks/useTimelineDeleteMemory.ts.md"
  relativePath: "mobile/src/features/timeline/hooks/useTimelineDeleteMemory.ts"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/mobile/src/features/timeline/hooks/useTimelineDeleteMemory.ts"
  module: "mobile/src/features/timeline/hooks"
  workspace: "mobile"
  language: "TypeScript"
  symbolCount: 1
---

# mobile/src/features/timeline/hooks/useTimelineDeleteMemory.ts

- Overview: [emplus Docs Wiki](../../../../../../../index.md)
- Summary: [SUMMARY](../../../../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../../../../features/index.md)
- Module: [mobile/src/features/timeline/hooks](../../../../../../modules/mobile/src/features/timeline/hooks.md)
- Workspace: [@emplus/mobile](../../../../../../../workspaces/mobile.md)

## Snapshot

- Language: TypeScript
- Source path: `/Users/truongdq/tx/GitHub/emplus/mobile/src/features/timeline/hooks/useTimelineDeleteMemory.ts`
- Lines: 43
- Symbols: 1

## AI Summary

The `useTimelineDeleteMemory` hook provides a mechanism for deleting timeline memories with confirmation.

## Public API

- `function useTimelineDeleteMemory()`

## Symbols

### function `useTimelineDeleteMemory`

- Signature: `function useTimelineDeleteMemory()`
- Lines: 8-42
- Exported: yes

```ts
function useTimelineDeleteMemory() {
  const queryClient = useQueryClient();
  const { withAccessToken } = useSession();
  const { showToast } = useToast();
  const { confirm } = useAlertDialog();

  const deleteMutation = useMutation({
    mutationFn: (memoryId: string) =>
      withAccessToken((t) => deleteMemoryById(t, memoryId)),
    onSuccess: () => {
      void queryClient.invalidateQueries({
        predicate: (q) => q.queryKey[0] === "timelineMemories",
      });
    },
    onError: (err: unknown) => {
      showToast(toDisplayError(err), "error");
    },
  });

  const promptDeleteMemory = useCallback(
    (item: MemoryItem) => {
      void confirm({
        title: "Xoá mục này?",
        message: "Thao tác không thể hoàn tác.",
        confirmLabel: "Xoá",
        destructive: true,
      }).then((ok) => {
        if (ok) deleteMutation.mutate(item.id);
      });
    },
    [confirm, deleteMutation],
  );

  return { promptDeleteMemory };
}
```
