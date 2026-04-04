import { useCallback } from "react";
import { Alert } from "react-native";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteMemoryById, toDisplayError, type MemoryItem } from "@/src/api";
import { useSession } from "@/src/session-context";
import { useToast } from "@/src/toast-context";

export function useTimelineDeleteMemory() {
  const queryClient = useQueryClient();
  const { withAccessToken } = useSession();
  const { showToast } = useToast();

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
      Alert.alert("Xoá mục này?", "Thao tác không thể hoàn tác.", [
        { text: "Huỷ", style: "cancel" },
        {
          text: "Xoá",
          style: "destructive",
          onPress: () => deleteMutation.mutate(item.id),
        },
      ]);
    },
    [deleteMutation],
  );

  return { promptDeleteMemory };
}
