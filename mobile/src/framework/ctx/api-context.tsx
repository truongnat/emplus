import {
  MutationCache,
  QueryCache,
  QueryClient,
  onlineManager,
} from "@tanstack/react-query";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { PropsWithChildren, useCallback, useEffect, useMemo } from "react";
import NetInfo from "@react-native-community/netinfo";
import appConfig from "@/src/core/config/app-config";
import ApiError from "@/src/core/api/api-error";
import { useToast } from "@/src/toast-context";
import { useSession } from "@/src/session-context";
import { notifySessionOrTokenFailure } from "@/src/utils/session-api-feedback";

/**
 * Configure TanStack Query network listener for mobile.
 */
function setupNetworkListener() {
  onlineManager.setEventListener((setOnline) => {
    return NetInfo.addEventListener((state) => {
      setOnline(!!state.isConnected && !!state.isInternetReachable);
    });
  });
}

/**
 * Create AsyncStorage persister.
 */
const asyncStoragePersister = createAsyncStoragePersister({
  storage: AsyncStorage,
  key: "emplus.cache.v1",
});

/**
 * Custom hook to manage QueryClient with global error feedback.
 */
function useConfiguredQueryClient() {
  const { showToast } = useToast();
  const { clearSession } = useSession();

  const onGlobalApiError = useCallback(
    (error: unknown) => {
      if (!(error instanceof ApiError)) return;
      if (error.isUnauthorized()) {
        notifySessionOrTokenFailure(error);
        void clearSession();
        return;
      }
      if (error.isNetworkError()) {
        showToast(
          "Mất kết nối Internet. Vui lòng kiểm tra lại.",
          "warning",
        );
        return;
      }
      if (error.status >= 500) {
        showToast(
          "Hệ thống đang gặp sự cố. Thử lại sau ít phút.",
          "error",
        );
        return;
      }
      if (error.isForbidden()) {
        showToast("Bạn không có quyền thực hiện hành động này.", "error");
      }
    },
    [showToast, clearSession],
  );

  return useMemo(() => {
    const queryClient = new QueryClient({
      queryCache: new QueryCache({
        onError: onGlobalApiError,
      }),
      mutationCache: new MutationCache({
        onError: onGlobalApiError,
      }),
      defaultOptions: {
        queries: {
          staleTime: appConfig.api.staleTime,
          gcTime: appConfig.api.gcTime,
          retry: (count, error: unknown) => {
            if (error instanceof ApiError)
              return error.shouldRetry() && count < 2;
            return count < 2;
          },
          refetchOnWindowFocus: false,
          refetchOnReconnect: "always",
          networkMode: "always",
        },
      },
    });

    return queryClient;
  }, [onGlobalApiError]);
}

export default function ApiContext({ children }: PropsWithChildren) {
  useEffect(() => {
    setupNetworkListener();
  }, []);

  const queryClient = useConfiguredQueryClient();

  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{
        persister: asyncStoragePersister,
        dehydrateOptions: {
          shouldDehydrateQuery: (query) => {
            const k = query.queryKey[0];
            // Bộ nhớ timeline lớn; dashboard có loveDays/sự kiện — không persist để tránh số liệu cũ khi mở app.
            return k !== "timelineMemories" && k !== "dashboard";
          },
        },
      }}
    >
      {children}
    </PersistQueryClientProvider>
  );
}

// Export as ApiProvider for consistency
export const ApiProvider = ApiContext;
