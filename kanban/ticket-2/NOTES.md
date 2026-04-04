# Ticket 2 — notes

- **Perf**: `useForm` + `Controller` đặt trong `LoginAuthForm` để `LoginScreen` không subscribe RHF → nền lưới / brand không re-render khi gõ email/password.
- **Không dùng `React.memo`** cho section đọc theme qua context mà không nhận props — tránh stale theme khi parent bị skip.
