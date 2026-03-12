# 🔄 Em Plus - End-to-End Flow Specifications

Tài liệu này đặc tả chi tiết luồng hoạt động (Flows) từ lúc người dùng thao tác trên Ứng dụng (App), cách Backend (API) xử lý, cho đến những thay đổi thực tế dưới Cơ sở dữ liệu (Database).

---

## 1. Luồng Xác thực (Authentication Flow)

### 1.1 Đăng ký tài khoản (Local Register)
- **📱 App Action:**
  - Người dùng nhập `email`, `password`, `fullName` tại màn hình *RegisterScreen*.
  - Validate form local (Zod).
  - Gọi API: `POST /v1/auth/register` (body: JSON).
- **⚙️ Backend Function (`authRoutes.post("/register")`):**
  - Chạy qua middleware `validate(registerSchema)`.
  - Gọi `authService.register(payload)`.
  - Băm mật khẩu bằng thuật toán (Bcrypt/Argon2).
- **🗄️ Database Interaction:**
  - *Query:* `SELECT id FROM users WHERE email = $1` (Kiểm tra trùng lặp).
  - *Mutation:* `INSERT INTO users (id, email, password_hash, full_name, auth_provider) VALUES (uuid_generate_v4(), $1, $2, $3, 'LOCAL') RETURNING *`.
- **↩️ Response & Post-action:**
  - Trả về `accessToken` và `refreshToken`.
  - App lưu token vào bộ nhớ an toàn (Expo SecureStore / HttpOnly Cookies).

### 1.2 Đăng nhập bằng Google (Google OAuth)
- **📱 App Action:**
  - Bấm "Login with Google", mở trình duyệt native lấy `idToken`.
  - Gọi API: `POST /v1/auth/google` (body: `{ token: "..." }`).
- **⚙️ Backend Function (`authRoutes.post("/google")`):**
  - Gọi `googleAuthClient.verifyIdToken(token)`.
  - Trích xuất `email`, `googleId`, `avatarUrl`.
  - Gọi `authService.handleOAuthLogin()`.
- **🗄️ Database Interaction:**
  - *Query:* `SELECT * FROM users WHERE auth_provider = 'GOOGLE' AND auth_id = $1`.
  - *Nếu chưa có:* `INSERT INTO users (id, email, auth_provider, auth_id) VALUES (...)`.
- **↩️ Response:** Trả về cặp Token JWT.

---

## 2. Luồng Ghép đôi (Pairing Flow)

### 2.1 Tạo mã mời (Generate Invite Code) - Người dùng A
- **📱 App Action:**
  - Màn hình *PairingScreen*, bấm "Tạo mã mời".
  - Gọi API: `POST /v1/couples/invite`.
- **⚙️ Backend Function (`couplesRoutes.post("/invite")`):**
  - Verify JWT Auth.
  - Gọi `coupleService.generateInviteCode()`. Hàm này sinh chuỗi ngẫu nhiên 6 ký tự.
- **🗄️ Database Interaction:**
  - *Mutation:* `INSERT INTO couples (id, partner_1_id, status, invite_code, invite_expires_at) VALUES (..., userId, 'CHO_GHEP_DOI', 'A1B2C3', NOW() + INTERVAL '24 hours')`.
- **↩️ Response:** Trả về mã `A1B2C3` hiển thị to trên màn hình App A.

### 2.2 Nhập mã ghép đôi (Submit Code) - Người dùng B
- **📱 App Action:**
  - Màn hình *PairingScreen*, nhập `A1B2C3` và bấm "Kết nối".
  - Gọi API: `POST /v1/couples/pair` (body: `{ code: "A1B2C3" }`).
- **⚙️ Backend Function (`couplesRoutes.post("/pair")`):**
  - Gọi `coupleService.pairWithCode(code)`.
  - Kiểm tra hạn sử dụng của mã.
- **🗄️ Database Interaction:**
  - *Query:* `SELECT * FROM couples WHERE invite_code = $1 AND invite_expires_at > NOW()`.
  - *Mutation:* `UPDATE couples SET partner_2_id = $1, status = 'DANG_YEU', invite_code = NULL WHERE id = $2`.
- **↩️ Response & Post-action:** 
  - Gắn `coupleId` vào session. App chuyển hướng sang Main Dashboard.

---

## 3. Luồng Chính (Main Dashboard Flow)

### 3.1 Tải trang tổng quan (Load Dashboard)
- **📱 App Action:**
  - App khởi động, vào *HomeScreen*.
  - Gọi đồng thời (Promise.all) các API: `GET /v1/dashboard/overview`, `GET /v1/timeline/recent`.
- **⚙️ Backend Function (`dashboardRoutes.get("/overview")`):**
  - Lấy `coupleId` từ Token.
  - Tính toán số ngày yêu bằng Engine.
- **🗄️ Database Interaction:**
  - *Query 1 (Couple info):* `SELECT love_start_date FROM couples WHERE id = $1`.
  - *Query 2 (Partner info):* `SELECT full_name, avatar_url, dob FROM users WHERE id = $partnerId`.
  - *Query 3 (Upcoming Events):* Tính toán trong Memory hoặc query các Memory có `memory_date > NOW()` kết hợp với Anniversary Engine.
- **↩️ Response:** JSON chứa `loveDaysCount`, `partnerProfile`, `upcomingEvents`. App bind dữ liệu lên UI.

---

## 4. Luồng Kỷ niệm (Timeline Flow)

### 4.1 Tạo Kỷ niệm mới có ảnh (Create Memory)
- **📱 App Action:**
  - Chọn ảnh từ thư viện thiết bị.
  - *Bước 1 (Upload):* Gọi `POST /v1/system/upload-url` lấy Presigned URL của MinIO, App trực tiếp PUT file lên MinIO. Lấy về mảng `mediaUrls`.
  - *Bước 2 (Lưu data):* Điền tiêu đề, ngày tháng. Gọi `POST /v1/timeline/memories` (body: `{ title, memoryDate, mediaUrls }`).
- **⚙️ Backend Function (`timelineRoutes.post("/memories")`):**
  - Validate dữ liệu, đảm bảo `mediaUrls` hợp lệ.
  - Gọi `timelineService.createMemory()`.
- **🗄️ Database Interaction:**
  - *Mutation:* `INSERT INTO memories (id, couple_id, created_by_id, title, memory_date, media_urls) VALUES (...) RETURNING *`.
- **⚡ WebSocket Trigger:**
  - Server bắn event `MEMORY_ADDED` vào `room_{coupleId}`.
- **📱 App Post-action (Đối phương):**
  - App của đối phương (nếu đang mở) nhận WebSocket event, tự động `unshift` kỷ niệm mới vào state Timeline mà không cần reload.

### 4.2 Tải Timeline (Load Memories Pagination)
- **📱 App Action:**
  - Cuộn xuống đáy màn hình Timeline (FlatList onEndReached).
  - Gọi API: `GET /v1/timeline/memories?page=2&limit=20`.
- **⚙️ Backend Function (`timelineRoutes.get("/memories")`):**
  - Tính toán Offset: `(page - 1) * limit`.
- **🗄️ Database Interaction:**
  - *Query:* `SELECT * FROM memories WHERE couple_id = $1 ORDER BY memory_date DESC LIMIT 20 OFFSET 20`.
- **↩️ Response:** Mảng các kỷ niệm cũ hơn.

---

## 5. Luồng Cảm xúc (Emotional Care Flow - Dành riêng Nữ)

### 5.1 Cập nhật chu kỳ (Log Cycle)
- **📱 App Action:**
  - Người dùng nữ chọn ngày bắt đầu kỳ mới trên Calendar.
  - Gọi API: `POST /v1/care/cycles/log` (body: `{ startDate: "YYYY-MM-DD" }`).
- **⚙️ Backend Function (`careRoutes.post("/cycles/log")`):**
  - Gọi `emotionalEngine.logNewCycle()`.
  - Tính toán lại trung bình `cycle_duration` của các lần trước.
- **🗄️ Database Interaction:**
  - *Mutation:* Nếu là lần đầu: `INSERT INTO emotional_cycles (...)`. Nếu đã có: `UPDATE emotional_cycles SET start_date = $1, updated_at = NOW() WHERE user_id = $2`.
- **⚡ Background Job:** Đặt lịch (Redis/Cron) gửi Push Notification cho người Nam trước kỳ kinh nguyệt tiếp theo 2 ngày.
