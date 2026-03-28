import { useEffect } from "react";
import { useRouter } from "expo-router";
import * as Notifications from "expo-notifications";

const DEFAULT_TAB = "/(tabs)/notifications";

function navigateFromPayload(
  router: ReturnType<typeof useRouter>,
  data: Record<string, unknown> | undefined,
) {
  const url = data?.url;
  if (typeof url === "string" && url.length > 0) {
    try {
      router.push(url as Parameters<typeof router.push>[0]);
    } catch {
      router.push(DEFAULT_TAB);
    }
    return;
  }
  router.push(DEFAULT_TAB);
}

/**
 * Foreground behavior + tap → deep link (mặc định màn Thông báo; payload có `url` thì điều hướng theo).
 */
export function NotificationBootstrap() {
  const router = useRouter();

  useEffect(() => {
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
        shouldShowBanner: true,
        shouldShowList: true,
      }),
    });
  }, []);

  useEffect(() => {
    let cancelled = false;
    Notifications.getLastNotificationResponseAsync().then((response) => {
      if (cancelled || !response) return;
      const data = response.notification.request.content
        .data as Record<string, unknown> | undefined;
      navigateFromPayload(router, data);
      void Notifications.clearLastNotificationResponseAsync();
    });
    return () => {
      cancelled = true;
    };
  }, [router]);

  useEffect(() => {
    const sub = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        const data = response.notification.request.content
          .data as Record<string, unknown> | undefined;
        navigateFromPayload(router, data);
      },
    );
    return () => sub.remove();
  }, [router]);

  return null;
}
