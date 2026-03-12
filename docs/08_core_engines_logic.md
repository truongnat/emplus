# 🧠 Em Plus - Core Engines Logic

Tài liệu này đặc tả chi tiết các thuật toán và logic xử lý cốt lõi trong các Engine của hệ thống Em Plus.

## 1. Anniversary Engine (Công cụ kỷ niệm) - `anniversary.ts`

Chịu trách nhiệm phát hiện và lập kế hoạch cho các mốc thời gian quan trọng.

### 🗓 Chức năng 1: Tính toán các mốc kỷ niệm sắp tới
- **Function `calculateUpcomingMilestones`:**
  - **Logic:**
    1. Lấy `love_start_date` của cặp đôi.
    2. Sử dụng thư viện ngày tháng để tính toán các mốc: 100 ngày, 1 năm, 500 ngày, v.v.
    3. So sánh với ngày hiện tại (`NOW()`).
    4. Trả về danh sách các sự kiện sắp diễn ra trong vòng 30 ngày tới.
  - **Action:** Gửi thông báo nhắc nhở (Push Notification) cho người dùng trước 3-7 ngày.

### 🎂 Chức năng 2: Quản lý sinh nhật của đối phương
- **Function `getPartnerBirthday`:**
  - **Logic:**
    1. Truy vấn `dob` của partner từ bảng `users`.
    2. Tính toán số ngày còn lại đến sinh nhật tiếp theo.
  - **Output:** Số ngày còn lại và lời nhắc cá nhân hóa.

## 2. Emotional Engine (Công cụ cảm xúc) - `emotional.ts`

Hỗ trợ theo dõi và dự báo trạng thái sức khỏe/tâm trạng cho người dùng nữ.

### 💓 Chức năng 1: Dự báo chu kỳ (Cycle Prediction)
- **Function `predictNextCycle`:**
  - **Input:** `start_date`, `cycle_duration`, `period_duration` (từ `emotional_cycles`).
  - **Logic:**
    1. Áp dụng thuật toán lịch để tính toán 3 giai đoạn: Kinh nguyệt (Period), Rụng trứng (Ovulation), và Tiền kinh nguyệt (PMS).
    2. Dự báo ngày bắt đầu tiếp theo.
  - **Output:** Một mảng các ngày tương ứng với từng giai đoạn.

### 💡 Chức năng 2: Gợi ý chăm sóc (Care Recommendations)
- **Function `generateCareTips`:**
  - **Input:** Giai đoạn chu kỳ hiện tại.
  - **Logic:**
    - Nếu là `PMS`: Gợi ý các món ăn giảm stress, nhắc người dùng nam nên kiên nhẫn hơn.
    - Nếu là `Period`: Nhắc nhở về nghỉ ngơi và sưởi ấm.
  - **Action:** Hiển thị Dashboard chăm sóc đặc biệt trên màn hình App của người nam.

---
*Tài liệu này giúp AI Agent hiểu sâu hơn về logic nghiệp vụ để thực hiện các cải tiến hoặc sửa lỗi chính xác.*
