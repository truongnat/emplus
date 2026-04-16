# Chính sách bảo mật (Security Policy) — Em+

> Phiên bản: 0.1  
> Ngày hiệu lực: 2026-04-16

Tài liệu này mô tả cam kết bảo mật ở mức vận hành và kênh tiếp nhận báo cáo lỗ hổng.

## 1) Nguyên tắc bảo mật

- **Ít đặc quyền nhất (least privilege)**: giới hạn quyền truy cập theo vai trò và nhu cầu.
- **Mã hóa khi truyền**: ưu tiên HTTPS/TLS cho mọi kết nối.
- **Bảo vệ xác thực**: giới hạn tốc độ (rate limit) các luồng OTP/login; phát hiện bất thường.
- **Giảm rủi ro secrets**: không commit `.env`, khóa, token; quản lý bằng secret manager/CI secrets/Kubernetes secrets.
- **Theo dõi & phản ứng sự cố**: log kỹ thuật phục vụ điều tra, cảnh báo khi có lỗi bất thường.

## 2) Báo cáo lỗ hổng (Vulnerability Disclosure)

Nếu bạn phát hiện lỗ hổng, vui lòng báo cáo có trách nhiệm qua:

- Email: `security@emplus.app` (hoặc `support@emplus.app` nếu chưa có mailbox riêng)

Khi gửi, vui lòng kèm:

- Mô tả lỗ hổng + mức độ ảnh hưởng
- Bước tái hiện (repro steps)
- Bằng chứng (ảnh chụp/đoạn request) và phạm vi tác động

## 3) Những điều không nên làm

- Không khai thác lỗ hổng để truy cập dữ liệu người dùng.
- Không phá hoại dịch vụ (DoS), không spam OTP/notification.
- Không công bố công khai trước khi chúng tôi có thời gian đánh giá và khắc phục hợp lý.

## 4) Phạm vi ưu tiên

- Xác thực/ủy quyền (AuthN/AuthZ), ghép đôi (couple linking)
- Dữ liệu riêng tư: timeline/kỷ niệm, ngân sách
- Upload/đính kèm và object storage
- Notification pipelines (push/email)

