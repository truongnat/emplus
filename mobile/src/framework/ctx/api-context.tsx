import { QueryCache, QueryClient, onlineManager } from "@tanstack/react-query";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { PropsWithChildren, useEffect, useMemo } from "react";
import NetInfo from "@react-native-community/netinfo";
import appConfig from "@/src/core/config/app-config";
import ApiError from "@/src/core/api/api-error";
import { useToast } from "./toast-context";

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

  return useMemo(() => {
    const queryClient = new QueryClient({
      queryCache: new QueryCache({
        onError: (error) => {
          if (error instanceof ApiError) {
            // Global error feedback via Toast
            if (error.isNetworkError()) {
              showToast("Mất kết nối Internet. Vui lòng kiểm tra lại.", "warning");
            } else if (error.status >= 500) {
              showToast("Hệ thống đang gặp sự cố. Thử lại sau ít phút.", "error");
            } else if (error.isForbidden()) {
              showToast("Bạn không có quyền thực hiện hành động này.", "error");
            }
          }
        },
      }),
      defaultOptions: {
        queries: {
          staleTime: appConfig.api.staleTime,
          gcTime: appConfig.api.gcTime,
          retry: (count, error: unknown) => {
            if (error instanceof ApiError) return error.shouldRetry() && count < 2;
            return count < 2;
          },
          refetchOnWindowFocus: false,
          refetchOnReconnect: "always",
          networkMode: "always",
        },
      },
    });
    
    return queryClient;
  }, [showToast]);
}

export default function ApiContext({ children }: PropsWithChildren) {
  useEffect(() => {
    setupNetworkListener();
  }, []);

  const queryClient = useConfiguredQueryClient();

  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister: asyncStoragePersister }}
    >
      {children}
    </PersistQueryClientProvider>
  );
}

// Export as ApiProvider for consistency
export const ApiProvider = ApiContext;
