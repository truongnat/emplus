# Ticket 44 — Wordmark & tên hiển thị: Em Plus → Em+

## Metadata

- **ticket_id**: 44
- **status**: done
- **domain_stack**: `mobile` + `api` (chuỗi user-facing)
- **opened**: 2026-04-04

## Intake

- Đổi **logo/wordmark** và nhãn người dùng thấy từ **Em Plus** sang **Em+** (không đổi slug `emplus` / bundle id).

## Acceptance

- [x] `LoginBrandGradientTitle` hiển thị **Em+**.
- [x] `app.json` `name`, loading/splash copy, a11y labels, policy copy, `app-config` brand name.
- [x] API: OpenAPI `title`, email `from` / template, default display name, test expect.
- [x] `tsc` mobile; API tests liên quan pass.

## Implementation

- Các file trong `mobile/app`, `mobile/src/features/auth`, `mobile/src/core/config`, `api/src/docs/openapi.ts`, `api/openapi.json`, `api/src/services/*`, `api/src/__tests__/*`.

## Residual

- Tài liệu dài trong `docs/` (PRD, kiến trúc) giữ tên dự án đầy đủ nếu cần; có thể đồng bộ sau theo policy marketing.

## Closed

- **closed:** 2026-04-04
