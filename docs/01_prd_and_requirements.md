# 🎯 Em Plus - Product Requirements Document (PRD)

## 1. Tổng quan dự án (Project Overview)
**Em Plus** là một ứng dụng di động dành riêng cho các cặp đôi, giúp ghi lại hành trình yêu đương, quản lý kỷ niệm, và cung cấp các công cụ hỗ trợ chăm sóc mối quan hệ thông qua trí tuệ nhân tạo (AI).

### 1.1 Mục tiêu (Objectives)
- **Kết nối:** Tạo không gian riêng tư, bảo mật cho 2 người.
- **Lưu giữ:** Tự động hóa việc ghi nhớ ngày kỷ niệm, lưu trữ khoảnh khắc (Timeline).
- **Thấu hiểu:** Sử dụng AI để gợi ý quà tặng, tư vấn tâm lý và dự báo các mốc quan trọng.

## 2. Đối tượng người dùng (User Personas)
- **Người dùng Nam:** Cần sự hỗ trợ về nhắc lịch, gợi ý hành động quan tâm thực tế.
- **Người dùng Nữ:** Chú trọng trải nghiệm cảm xúc, lưu trữ hình ảnh và theo dõi sự phát triển của mối quan hệ.

## 3. Các tính năng cốt lõi (Core Features)

### 3.1 Hệ thống xác thực & Định danh (Auth & Identity)
- Đăng ký/Đăng nhập qua Email, Google Auth.
- Quản lý hồ sơ cá nhân: Biệt danh, giới tính, ngày sinh, avatar.

### 3.2 Cơ chế Ghép đôi (Pairing Mechanism)
- Tạo mã mời (Invite Code) duy nhất.
- Quy trình kết nối cặp đôi (Couple Pairing) an toàn.
- Quản lý trạng thái mối quan hệ: Đang yêu, Đã cưới, v.v.

### 3.3 Dòng thời gian & Kỷ niệm (Timeline & Memories)
- Ghi lại các cột mốc (Milestones): Ngày đầu gặp gỡ, nụ hôn đầu, ngày cưới.
- Tự động đếm số ngày yêu nhau (Love Counter).
- Lưu trữ hình ảnh, ghi chú cho từng sự kiện.

### 3.4 Công cụ hỗ trợ (Engines & Tools)
- **Anniversary Engine:** Tự động nhắc nhở và lập kế hoạch cho các ngày lễ.
- **Budgeting Tool:** Quản lý chi tiêu chung của cặp đôi.
- **Emotional Engine:** Theo dõi tâm trạng và gợi ý giải tỏa căng thẳng.

## 4. Yêu cầu phi chức năng (Non-functional Requirements)
- **Hiệu năng:** Phản hồi API < 100ms (tận dụng Bun + Hono).
- **Bảo mật:** Mã hóa dữ liệu cá nhân, JWT cho xác thực.
- **Tính sẵn sàng:** Hỗ trợ Offline-first cho Mobile (Sync dữ liệu khi có mạng).
- **Khả năng quan sát (Observability):** Tích hợp Logging tập trung (Loki/Grafana).

---
*Tài liệu này được định hướng bởi Agentic SDLC và cập nhật dựa trên mã nguồn thực tế.*
