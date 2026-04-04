# Phase 1 — Khôi phục mật khẩu mobile — PLAN

**Nguồn mục tiêu:** [PLAN-BACKLOG-DISCUSS.md § Phase 1](../PLAN-BACKLOG-DISCUSS.md#phase-1--khôi-phục-mật-khẩu-trên-mobile-api-đã-sẵn)

**Trạng thái triển khai (audit nhanh 2026-04):** Luồng đã **có trong codebase** — repository `forgotPassword` / `resetPassword`, use cases `RequestPasswordResetUseCase` / `ResetPasswordUseCase`, màn `forgot-password.tsx`, `reset-password.tsx`, form + toast + navigate. Phase 1 chuyển sang **xác minh (UAT) + đóng nợ nhỏ** thay vì build từ đầu.

---

## Mục tiêu phase (không đổi)

Người dùng quên mật khẩu: **gửi OTP email → nhập OTP + mật khẩu mới → đăng nhập lại**.

---

## Goal backward (đã đạt chưa?)

| Tiêu chí backlog | Bằng chứng trong repo |
|------------------|------------------------|
| Port + impl API client | `AuthRepositoryImpl.forgotPassword`, `resetPassword` → `/auth/forgot-password`, `/auth/reset-password` |
| Use cases + DI | `dependencies.auth.requestPasswordReset`, `resetPassword` |
| Màn forgot | `ForgotPasswordAuthForm` → mutation → `/reset-password?email=` |
| Màn reset | `reset-password.tsx` + `ResetPasswordSchema`, gọi `dependencies.auth.resetPassword` |
| Không TODO bắt buộc | Không thấy TODO trong `reset-password.tsx` / forgot form (grep nhanh) |

**Kết luận:** Implementation **khớp** backlog; còn lại là **chứng minh hoạt động** và **ghi nhận env dev**.

---

## Task list (thứ tự thực hiện)

### Wave A — Xác minh (bắt buộc để “done” phase)

1. **UAT thủ công (1 người)**  
   - Dev: API + Mailpit (`docker compose` theo repo).  
   - Bước: Login screen → Quên mật khẩu → nhập email hợp lệ → kiểm tra email/OTP → Reset password → đăng nhập bằng mật khẩu mới.  
   - Ghi lại: pass/fail + môi trường (iOS/Android/simulator).

2. **Negative paths (ngắn)**  
   - Email không tồn tại / sai định dạng → toast lỗi dễ hiểu (`toDisplayError`).  
   - OTP sai / hết hạn → thông báo từ API hiển thị đúng.

3. **Đồng bộ contract**  
   - Chạy `bun run api:sync` sau mọi thay đổi OpenAPI auth; so khớp `ForgotPassword*` / `ResetPassword*` types với DTO server.

### Wave B — Hoàn thiện nhẹ (nếu phát hiện khi verify)

4. **Deep link / back stack** — Từ reset về login không kẹt stack; deep link `reset-password` thiếu `email` → CTA quay forgot (đã có một phần logic `emailParam`; kiểm tra UX).

5. **Rate limit / abuse** — Chỉ ghi chú trong doc: API đã rate limit; không mở scope CAPTCHA trong phase 1.

### Wave C — Đóng phase (paperwork)

6. Cập nhật **kanban** hoặc **activity log** (nếu team dùng): Phase 1 verified.  
7. (Tuỳ chọn) Một dòng trong `CODEBASE-MAP.md`: luồng forgot/reset + Mailpit.

---

## Verification checklist (Nyquist-style)

- [ ] Happy path E2E pass trên dev (Mailpit hoặc mock được mô tả trong `DEBUG_GUIDE` nếu có).  
- [ ] Không còn hành vi “chỉ Alert” thay cho API trên forgot/reset.  
- [ ] `bunx tsc --noEmit` trong `mobile/` pass sau mọi chỉnh sửa nhỏ.  
- [ ] PR (nếu có chỉnh sửa) không tăng scope Phase 2/3.

---

## Không nằm trong Phase 1

- CI (Phase 2).  
- Notifications / push (Phase 3).  
- Live WS (Phase 4).  
- Tạo kỷ niệm timeline — xem [timeline-create-item-RESEARCH.md](../../research/timeline-create-item-RESEARCH.md) (hướng khác).

---

## Rủi ro & residual

| Rủi ro | Mức | Hành động |
|--------|-----|-----------|
| Spam forgot | Trung bình | Đã có rate limit API; theo dõi log |
| User không có Mailpit | Thấp | Doc: bật `docker compose` hoặc env test |

---

## Sau khi xong

- Đánh dấu Phase 1 **closed** trong backlog hoặc milestone nội bộ.  
- Có thể **song song** bắt Phase 2 (CI) theo graph trong `PLAN-BACKLOG-DISCUSS.md`.
