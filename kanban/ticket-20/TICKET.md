# Ticket 20 — Session / token lỗi: toast cho user, không chỉ log

## Meta

- **id**: 20
- **status**: done
- **updated**: 2026-04-04
- **closed**: 2026-04-04
- **domain_stack**: mobile / session / TanStack Query

## Spec

- Khi **sync profile** (hoặc bootstrap refresh) lỗi — đặc biệt `ApiError` 401 *Phiên đăng nhập không hợp lệ…* — **báo cho người dùng** (toast trong app), không chỉ `console.error`.
- Khi **API / token** lỗi auth trên query hoặc mutation — cùng hướng xử lý: thông báo + `clearSession` khi 401.

**Ghi chú:** “Push notification” theo Expo (remote) không bật trong ticket này; **toast** là kênh phù hợp khi user đang mở app. Remote push có thể backlog nếu cần khi app background.

## Acceptance

- [x] Helper tập trung `notifySessionOrTokenFailure` (toast + id `replace` tránh spam 401).
- [x] `SessionProvider` init: lỗi `getProfile` / bootstrap → toast; 401 → `clearSession`.
- [x] `QueryClient` `queryCache` + `mutationCache` `onError`: 401 → toast + `clearSession`; giữ network/5xx/forbidden như cũ.
- [x] `bun run typecheck:mobile` pass.

## Implementation

| File | Thay đổi |
|------|----------|
| `mobile/src/utils/session-api-feedback.ts` | Mới — `notifySessionOrTokenFailure`, `SESSION_AUTH_TOAST_ID` |
| `mobile/src/framework/ctx/session-context.tsx` | Thay `console.error` sync/bootstrap bằng notify + `clearSession` nếu unauthorized |
| `mobile/src/framework/ctx/api-context.tsx` | `useSession`, `onGlobalApiError` dùng chung cho `QueryCache` + `MutationCache`; deps `useMemo` đúng |

## Verify

- `bun run typecheck:mobile` — pass (2026-04-04)

## Residual

- `withAccessToken` vẫn `throw` khi không có token — có thể chuyển toast + reject sau nếu product muốn.
- Remote push khi session hết hạn lúc app background — chưa làm.

## Skill

- Không thêm skill (`bundle_state`: không chạy `validate-skills`).
