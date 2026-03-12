# 🎨 Em Plus - UI/UX Style Guide

Tài liệu này định nghĩa các quy chuẩn thiết kế giao diện và trải nghiệm người dùng cho dự án Em Plus, đảm bảo tính nhất quán trên cả Mobile và Web.

## 1. Nguyên tắc thiết kế (Design Principles)
- **Cảm xúc (Emotional):** Sử dụng các tông màu ấm, mềm mại để tạo cảm giác gần gũi.
- **Tối giản (Minimalism):** Loại bỏ các thành phần không cần thiết, tập trung vào nội dung và hình ảnh kỷ niệm.
- **Glassmorphism:** Sử dụng hiệu ứng kính mờ (Glass) để tạo chiều sâu và tính hiện đại cho giao diện.
- **Trực quan (Intuitive):** Các hành động quan trọng (Pairing, Add Memory) phải dễ dàng truy cập.

## 2. Bảng màu (Color Palette)

Hệ thống màu sắc được xây dựng dựa trên các tokens linh hoạt:

| Tên màu | Giá trị | Ý nghĩa |
| :--- | :--- | :--- |
| **Primary** | `#EC1334` | Màu chủ đạo (Tượng trưng cho tình yêu). |
| **Secondary** | `#7B61FF` | Màu bổ trợ cho các tính năng cảm xúc. |
| **Accent** | `#2563EB` | Màu nhấn cho các hành động quan trọng. |
| **Ink** | `#0F172A` | Màu chữ chính (Đậm). |
| **Muted** | `#64748B` | Màu chữ phụ, trạng thái vô hiệu hóa. |
| **Success** | `#10B981` | Trạng thái thành công, hoàn thành. |
| **Danger** | `#EF4444` | Trạng thái lỗi, cảnh báo. |

## 3. Kiểu chữ (Typography)

Dự án sử dụng bộ font **Be Vietnam Pro** để mang lại cảm giác hiện đại và hỗ trợ tiếng Việt hoàn hảo.

- **Body:** `BeVietnamPro_400Regular` - Dùng cho nội dung văn bản.
- **Medium:** `BeVietnamPro_500Medium` - Dùng cho nhãn (Labels).
- **SemiBold:** `BeVietnamPro_600SemiBold` - Dùng cho tiêu đề nhỏ.
- **Bold:** `BeVietnamPro_700Bold` - Dùng cho tiêu đề lớn (Headings).
- **Mono:** `RobotoMono_400Regular` - Dùng cho mã code hoặc con số kỹ thuật.

## 4. Thành phần giao diện (UI Components)

### 4.1 Glass Cards
Sử dụng background `rgba(255, 255, 255, 0.4)` kết hợp với `blur` và border nhẹ để tạo hiệu ứng lớp kính.

### 4.2 Radii (Bo góc)
- **Small (sm):** `8px` - Cho các input, button nhỏ.
- **Medium (md):** `12px` - Cho các thẻ (Cards) thông thường.
- **Large (lg):** `18px` - Cho các section chính.
- **Extra Large (xl):** `24px` - Cho các banner hoặc modal.

## 5. Trải nghiệm người dùng (UX)
- **Haptic Feedback:** Rung nhẹ khi người dùng thực hiện các hành động quan trọng trên Mobile.
- **Skeleton Loading:** Hiển thị khung xương khi đang tải dữ liệu để giảm cảm giác chờ đợi.
- **Zero State:** Thiết kế màn hình trống thân thiện để hướng dẫn người dùng bắt đầu (VD: Khi chưa có kỷ niệm nào).

---
*Style Guide này là kim chỉ nam cho việc phát triển giao diện đồng bộ và chuyên nghiệp.*
