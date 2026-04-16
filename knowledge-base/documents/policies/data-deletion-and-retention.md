# Xóa dữ liệu & thời gian lưu trữ (Data Deletion & Retention) — Em+

> Phiên bản: 0.1  
> Ngày hiệu lực: 2026-04-16

Tài liệu này mô tả Em+ lưu dữ liệu trong bao lâu và cách bạn yêu cầu xóa.

## 1) Nguyên tắc

- **Tối thiểu cần thiết**: chỉ lưu những gì cần để vận hành tính năng.
- **Xóa theo yêu cầu**: khi bạn yêu cầu xóa tài khoản, chúng tôi sẽ xóa hoặc ẩn danh dữ liệu theo quy định dưới đây.
- **Ngoại lệ hợp pháp**: một số dữ liệu có thể cần giữ lại để tuân thủ pháp luật hoặc giải quyết tranh chấp/gian lận.

## 2) Bạn có thể xóa những gì ngay trong app

- Timeline/kỷ niệm: xóa từng mục.
- Ngân sách: xóa từng giao dịch/mục.
- Thiết lập thông báo: tắt/bật, hủy đăng ký theo loại.

## 3) Xóa tài khoản (account deletion)

### Cách yêu cầu

Gửi email tới `support@emplus.app` với tiêu đề: **“Yêu cầu xóa tài khoản Em+”** và cung cấp:

- Email/số điện thoại đăng nhập (nếu có)
- Thông tin nhận diện tối thiểu để xác minh (ví dụ: thời điểm tạo tài khoản, thiết bị gần nhất)

### Thời gian xử lý mục tiêu

- **7–30 ngày** tùy mức độ xác minh và khối lượng xử lý.

## 4) Dữ liệu được xóa khi xóa tài khoản

Thông thường bao gồm:

- Thông tin tài khoản và phiên đăng nhập
- Dữ liệu ghép đôi (liên kết cặp đôi)
- Timeline/kỷ niệm và nội dung bạn tạo
- Dữ liệu ngân sách và ghi chú liên quan
- Token thông báo (push token) và thiết lập thông báo

## 5) Dữ liệu có thể được lưu thêm một thời gian

Để bảo mật/vận hành, một số dữ liệu có thể được giữ tạm thời:

- **Log hệ thống** (IP, request id, lỗi): giữ tối đa **30–90 ngày** để điều tra sự cố/abuse.
- **Bản sao lưu (backup)**: có thể tồn tại trong chu kỳ backup và tự hết hạn theo lịch (ví dụ **30–35 ngày**). Dữ liệu trong backup sẽ không được khôi phục “chỉ để xem lại”, trừ khi cần phục hồi hệ thống sau sự cố.

## 6) Khi xóa tài khoản, dữ liệu của “người kia” trong cặp đôi thì sao?

Nguyên tắc mặc định:

- Dữ liệu do ai tạo thì người đó kiểm soát và có thể bị xóa theo yêu cầu của người đó.
- Một số dữ liệu “chung” (liên kết ghép đôi, mốc kỷ niệm chung) có thể ảnh hưởng tới cả hai. Khi cần, chúng tôi ưu tiên **tách/ẩn danh** để giảm tác động tiêu cực cho bên còn lại.

## 7) Xóa dữ liệu thông báo

- Nếu bạn tắt thông báo hoặc gỡ app, push token có thể tự mất hiệu lực.
- Chúng tôi có thể xóa/thu hồi token trong chu kỳ dọn dẹp định kỳ.

