---
title: "mobile/src/utils/session-api-feedback.ts"
description: "Displays error messages for session or token failures, including unauthorized and network errors."
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
  page: "reference/files/mobile/src/utils/session-api-feedback.ts.md"
  relativePath: "mobile/src/utils/session-api-feedback.ts"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/mobile/src/utils/session-api-feedback.ts"
  module: "mobile/src/utils"
  workspace: "mobile"
  language: "TypeScript"
  symbolCount: 1
---

# mobile/src/utils/session-api-feedback.ts

- Overview: [emplus Docs Wiki](../../../../../index.md)
- Summary: [SUMMARY](../../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../../features/index.md)
- Module: [mobile/src/utils](../../../../modules/mobile/src/utils.md)
- Workspace: [@emplus/mobile](../../../../../workspaces/mobile.md)

## Snapshot

- Language: TypeScript
- Source path: `/Users/truongdq/tx/GitHub/emplus/mobile/src/utils/session-api-feedback.ts`
- Lines: 50
- Symbols: 1

## Related Features

- [Notifications Notify](../../../../../features/notification-notify.md) - Notifications Notify captures the notify workflow inside notifications. It spans 2 workspaces.

## AI Summary

Displays error messages for session or token failures, including unauthorized and network errors.

### Responsibilities

- notifySessionOrTokenFailure

### Usage Notes

- Requires `toast` library to display error notifications.

## Public API

- `function notifySessionOrTokenFailure(err: unknown): void`

## Symbols

### function `notifySessionOrTokenFailure`

- Signature: `function notifySessionOrTokenFailure(err: unknown): void`
- Lines: 11-49
- Exported: yes

```ts
function notifySessionOrTokenFailure(err: unknown): void {
  if (err instanceof ApiError) {
    if (err.isUnauthorized()) {
      toast.error(
        err.message ||
          "Phiên đăng nhập không hợp lệ hoặc đã hết hạn. Vui lòng đăng nhập lại.",
        {
          id: SESSION_AUTH_TOAST_ID,
          replace: true,
          duration: 5500,
        },
      );
      return;
    }
    if (err.isNetworkError()) {
      toast.warning("Không thể kết nối. Kiểm tra mạng và thử lại.", {
        id: `${SESSION_AUTH_TOAST_ID}-net`,
        replace: true,
      });
      return;
    }
    if (err.status >= 500) {
      toast.error("Hệ thống đang bận. Thử lại sau.", {
        id: `${SESSION_AUTH_TOAST_ID}-5xx`,
        replace: true,
      });
      return;
    }
    toast.error(err.message || "Đã có lỗi xảy ra.", {
      duration: 4500,
    });
    return;
  }
  if (err instanceof Error && err.message) {
    toast.error(err.message, { duration: 4500 });
    return;
  }
  toast.error("Đã có lỗi xảy ra.", { duration: 4000 });
}
```
