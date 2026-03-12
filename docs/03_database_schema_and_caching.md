# 🗄️ Em Plus - Database Schema & Caching Strategy

Tài liệu này mô tả chi tiết cấu trúc cơ sở dữ liệu (PostgreSQL) và chiến lược bộ nhớ đệm (Redis) của hệ thống Em Plus.

## 1. Cơ sở dữ liệu quan hệ (PostgreSQL)

Hệ thống sử dụng PostgreSQL 15+ làm cơ sở dữ liệu chính. Dưới đây là các thực thể cốt lõi và mối quan hệ giữa chúng.

### 1.1 Sơ đồ thực thể chính (Core Entities)

#### 👤 Người dùng (Users)
Lưu trữ thông tin định danh và cá nhân của từng thành viên.
- **id (UUID):** Khóa chính.
- **email:** Định danh duy nhất.
- **auth_provider:** Phương thức xác thực (`LOCAL`, `GOOGLE`, `APPLE`).
- **gender:** Giới tính (`MALE`, `FEMALE`, `OTHER`, `PREFER_NOT_TO_SAY`).
- **dob:** Ngày sinh (để nhắc sinh nhật).

#### 💑 Cặp đôi (Couples)
Thực thể trung tâm kết nối hai người dùng.
- **partner_1_id / partner_2_id:** Tham chiếu đến bảng `users`.
- **status:** Trạng thái mối quan hệ (`CHO_GHEP_DOI`, `DANG_YEU`, `DA_CUOI`, `DA_CHIA_TAY`).
- **invite_code:** Mã mời để ghép đôi (duy nhất, có thời hạn).
- **love_start_date:** Ngày bắt đầu yêu nhau.

#### 📸 Kỷ niệm (Memories)
Lưu trữ các khoảnh khắc trên Timeline.
- **couple_id:** Tham chiếu đến cặp đôi sở hữu.
- **memory_date:** Ngày diễn ra sự kiện.
- **media_urls (JSONB):** Danh sách đường dẫn ảnh/video.

#### 💓 Chu kỳ cảm xúc (Emotional Cycles)
Dành riêng cho việc theo dõi sức khỏe và tâm trạng (đặc biệt là cho người dùng nữ).
- **user_id:** Tham chiếu đến người dùng.
- **cycle_duration / period_duration:** Thông số chu kỳ.

### 1.2 Ràng buộc & Chỉ mục (Constraints & Indexes)
- **Unique Pair:** Đảm bảo hai người dùng không thể có nhiều hơn một bản ghi Couple đang hoạt động.
- **Invite Code Index:** Tối ưu hóa việc tìm kiếm mã mời khi thực hiện ghép đôi.
- **Timeline Index:** Tối ưu hóa truy vấn kỷ niệm theo cặp đôi và thời gian giảm dần.

## 2. Chiến lược bộ nhớ đệm (Caching with Redis)

Redis được sử dụng để giảm tải cho database và tăng tốc độ phản hồi.

### 2.1 Các trường hợp sử dụng (Use Cases)
- **Session Store:** Lưu trữ thông tin phiên đăng nhập (Access Token) để xác thực nhanh.
- **OTP Store:** Lưu trữ mã xác thực gửi qua email với thời gian hết hạn (TTL).
- **Rate Limiting:** Ngăn chặn tấn công Brute-force vào các endpoint nhạy cảm (Login, Register).

### 2.2 Quy tắc đặt tên Key (Naming Convention)
- `emplus:session:{token}`
- `emplus:otp:{email}`
- `emplus:ratelimit:{ip}`

---
*Cấu trúc dữ liệu được thiết kế để đảm bảo tính toàn vẹn và khả năng mở rộng trong tương lai.*
