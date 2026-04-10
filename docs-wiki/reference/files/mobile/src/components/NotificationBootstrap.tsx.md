---
title: "mobile/src/components/NotificationBootstrap.tsx"
description: "The NotificationBootstrap module handles notifications from the mobile app."
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
  page: "reference/files/mobile/src/components/NotificationBootstrap.tsx.md"
  relativePath: "mobile/src/components/NotificationBootstrap.tsx"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/mobile/src/components/NotificationBootstrap.tsx"
  module: "mobile/src/components"
  workspace: "mobile"
  language: "TypeScript"
  symbolCount: 2
---

# mobile/src/components/NotificationBootstrap.tsx

- Overview: [emplus Docs Wiki](../../../../../index.md)
- Summary: [SUMMARY](../../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../../features/index.md)
- Module: [mobile/src/components](../../../../modules/mobile/src/components.md)
- Workspace: [@emplus/mobile](../../../../../workspaces/mobile.md)

## Snapshot

- Language: TypeScript
- Source path: `/Users/truongdq/tx/GitHub/emplus/mobile/src/components/NotificationBootstrap.tsx`
- Lines: 68
- Symbols: 2

## AI Summary

The NotificationBootstrap module handles notifications from the mobile app.

### Usage Notes

- This module configures and handles notifications in the mobile app, making it possible to navigate and interact with notifications.

## Public API

- `function NotificationBootstrap()`

## Symbols

### function `NotificationBootstrap`

- Signature: `function NotificationBootstrap()`
- Lines: 26-67
- Exported: yes

```tsx
function NotificationBootstrap() {
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
```

### function `navigateFromPayload`

- Signature: `function navigateFromPayload( router: ReturnType<typeof useRouter>, data: Record<string, unknown> | undefined, )`
- Lines: 7-21
- Exported: no
- Summary: Responsible for navigating a notification from the payload.

```tsx
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
```
