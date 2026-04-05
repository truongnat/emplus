import { useCallback } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteMemoryById, toDisplayError, type MemoryItem } from "@/src/api";
import { useSession } from "@/src/session-context";
import { useToast } from "@/src/toast-context";
import { useAlertDialog } from "@/src/alert-dialog-context";

export function useTimelineDeleteMemory() {
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
