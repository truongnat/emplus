# ⚙️ Em Plus - Functional Specifications (Chi tiết Chức năng)

Tài liệu này đặc tả chi tiết logic xử lý (Functions) và các hành động (Actions) cho từng module của hệ thống Em Plus.

## 1. Module: Xác thực (Authentication) - `auth.ts`

Module này chịu trách nhiệm quản lý định danh người dùng và phiên làm việc.

### 🔐 Chức năng 1: Đăng ký & Đăng nhập (Local/OTP)
- **Action:** Người dùng nhập Email và Mật khẩu.
- **Function `registerUser`:**
  - **Input:** `email`, `password`, `fullName`, `gender`.
  - **Logic:** 
    1. Kiểm tra email đã tồn tại hay chưa.
    2. Mã hóa mật khẩu (Password Hashing).
    3. Lưu người dùng vào CSDL với trạng thái `is_active: true`.
  - **Output:** Thông tin người dùng (User Object) & JWT Token.
- **Function `loginUser` (Lazy Registration):**
  - **Logic:** Nếu email chưa tồn tại, hệ thống tự động sinh OTP, gửi qua email. Người dùng nhập OTP để hoàn tất đăng ký thông qua `verifyOtpAndLogin`.

### 🔑 Chức năng 2: Xác thực qua Google (Google OAuth)
- **Action:** Người dùng chọn "Login with Google" trên App/Web.
- **Function `authenticateGoogle`:**
  - **Input:** `idToken` từ Google.
  - **Logic:** 
    1. Xác minh Token với Google API.
    2. Tìm người dùng trong DB bằng `auth_id`.
    3. Nếu chưa có, tự động tạo User mới.
  - **Output:** JWT Token (Access & Refresh).

## 2. Module: Cặp đôi (Couples) - `couples.ts`

Module trung tâm để kết nối 2 thực thể người dùng.

### 🔗 Chức năng 1: Tạo mã mời (Generate Invite)
- **Action:** Người dùng A muốn kết nối với người yêu.
- **Function `generateInvite`:**
  - **Logic:** 
    1. Kiểm tra xem User đã ở trong Couple nào chưa.
    2. Tìm hoặc tạo bản ghi `couples` ở trạng thái `CHO_GHEP_DOI`.
    3. Sinh mã ngẫu nhiên 6 ký tự qua `issueInviteForCouple`.
  - **Output:** `inviteCode`, `expiresIn`.

### 💖 Chức năng 2: Ghép đôi (Join Couple)
- **Action:** Người dùng B nhập mã mời từ người dùng A.
- **Function `joinCouple`:**
  - **Input:** `inviteCode`.
  - **Logic:** 
    1. Tìm bản ghi `couples` bằng mã mời (Mã mời khớp và chưa hết hạn).
    2. Cập nhật `partner_2_id` bằng User hiện tại.
    3. Chuyển trạng thái sang `DANG_YEU`.
    4. Tự động thiết lập `loveStartDate` là ngày hiện tại nếu chưa có.
  - **Output:** `coupleId`, `partnerInfo`.

## 3. Module: Kỷ niệm (Timeline & Memories) - `timeline.ts`

Quản lý dòng thời gian của cặp đôi.

### 📸 Chức năng 1: Thêm kỷ niệm mới (Add Memory)
- **Action:** Người dùng tải ảnh/video và viết caption.
- **Function `createMemory`:**
  - **Input:** `title`, `description`, `memoryDate`, `mediaUrls`.
  - **Logic:** 
    1. Lấy `coupleId` từ người dùng hiện tại.
    2. Lưu bản ghi vào bảng `memories`.
    3. Trigger thông báo Real-time cho đối phương qua Socket.
  - **Output:** Thông tin Kỷ niệm vừa tạo.

### 📅 Chức năng 2: Đếm ngày yêu (Love Counter)
- **Function `getLoveDays`:**
  - **Logic:** 
    1. Lấy `love_start_date` từ bảng `couples`.
    2. Tính toán hiệu số ngày giữa hiện tại và ngày bắt đầu.
  - **Output:** Tổng số ngày đã yêu nhau.

---
*Tài liệu này sẽ được bổ sung liên tục cho các module Budget, Care và Admin.*
