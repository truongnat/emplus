# Ticket 70 — Trợ giúp (chi tiết)

- **status**: done
- **opened**: 2026-04-05
- **closed**: 2026-04-05

## Spec

- Làm đầy đặn màn **Trợ giúp** (`profile-details/help`): nội dung đúng với luồng app, FAQ mở rộng, liên kết chính sách, email, phiên bản.

## Implementation

- FAQ dạng accordion (một mục mở tại một thời điểm), `LayoutAnimation` iOS/Android.
- Mục **Mẹo nhanh** + **Câu hỏi thường gặp** (7 câu): ghép đôi, hồ sơ, thông báo, quyền riêng tư, quên mật khẩu, đăng xuất, xóa tài khoản.
- **Tài liệu & liên hệ**: điều hướng `/policy`, `mailto:support@emplus.app` (có subject).
- **Phiên bản**: `expo-constants` (`nativeApplicationVersion` / `expoConfig.version`).

## Verify

- `bun run typecheck` trong `mobile/`.
