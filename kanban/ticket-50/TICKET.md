# Ticket 50 — Toast toàn app đồng bộ kiểu Care

## Metadata

- **ticket_id**: 50
- **status**: done
- **domain_stack**: `mobile` (Toast + toast-context)
- **opened**: 2026-04-04

## Intake

- Toàn bộ toast dùng **cùng visual & vị trí** như màn Care: **đáy màn**, lề ngang **24** (+ safe area), phía trên tab bar (~**92** + `insets.bottom`), bo **20**, padding **16**, nền **inverse** + icon semantic (success / error / …).

## Acceptance

- [x] `ToastContainer` có vùng **bottom**; mặc định `position: "bottom"`.
- [x] Variant dùng **semantic colors** (inverse / status.*) giống Care; chạm để đóng.
- [x] `showToast` / `toast.*` không ép `top` trừ khi gọi explicit `position: "top"`.
- [x] `bunx tsc --noEmit` trong `mobile/`.

## Implementation

- `mobile/src/components/atoms/Toast.tsx` — layout Care, `Ionicons`, `useThemeColors`, hai region top/bottom.
- `mobile/src/toast-context.tsx` — bottom + duration 3200, bỏ log debug.
- `mobile/src/utils/session-api-feedback.ts` — bỏ `position: "top"`.

## Verify

- `bunx tsc --noEmit` (mobile)

## Residual

- Màn Care vẫn giữ toast cục bộ (state) cho luồng mood; có thể gom `useToast` sau nếu muốn một nguồn.

## Closed

- **closed:** 2026-04-04
