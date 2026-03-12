# UI/UX Screen Flows & Component Architecture (Detail)

Đây là tài liệu phân rã màn hình cực kỳ chi tiết dành cho team UI/UX Designer (Figma) và Mobile Developer (React Native / Expo).

---

## 1. DESIGN SYSTEM FOUNDATION (Mobile & Web)

Thừa kế triết lý "Liquid Glass Morphism" từ thư mục Ý Tưởng. 
Component Tree trong mã nguồn React Native sẽ được xây theo `Atomic Design`.

### 1.1 Atoms (Hạt nhân UI)
- `GlassContainer`: View bọc bằng thư viện `@react-native-community/blur`, `blurAmount=15`, background: `rgba(255, 255, 255, 0.15)`. Border 1px solid trắng (độ trong suốt 20%).
- `TextSF`: Font mặc định là San Francisco Rounded (iOS) / Inter Rounded (Android).
- `SoftButton`: Nút bấm có hiệu ứng Scale từ từ.
- `AvatarPulse`: Avatar có vòng tròn lan tỏa mờ nhạt (nhịp tim).

### 1.2 Molecules (Component Bậc 2)
- `MemoryCard`: Tổ hợp: Image (S3 URL) + Dark Gradient Overlay + Title (Text) + Thả tim (Icon Heart).
- `UpcomingEventBadge`: Hình chữ nhật ngang nhỏ gắn góc.

---

## 2. STATE MACHINE THEO TỪNG MÀN HÌNH (SCREEN BY SCREEN)

### 2.1 Màn Hình Khởi Động (Splash & Auth Screen)
- **State: Initializing** -> Kiểm tra Access Token. Nếu có, bay thẳng Home.
- **State: Unauthenticated** -> View có Video nền Loop nhẹ nhàng (Hoa trôi nổi / Mặt nước lăn tăn / Bầu trời đêm).
- **Phím chức năng:** `Đăng nhập với Google`, `Tiếp tục với Apple`.

### 2.2 Luồng Ghép Đôi (Pairing Screen Flow - Quan trọng nhất)
- **Screen: Select Role** (Sau đăng nhập lần đầu).
  - Chọn Giới tính. (Hiển thị mờ, focus sáng khi chọn).
- **Screen: Connection** 
  - Giao diện chia 2 nửa chéo màn hình.
  - Nửa trên: "Mã của bạn" -> Generate Code.
  - Nửa dưới: "Nhập mã người ấy" -> Focus mở Keyboard Number.
- **Loading State:** Avatar của người dùng nằm bên trái màn hình. Bên phải là dấu hỏi. Khi Join thành công (Socket bóp cò), Avatar bên phải xuất hiện -> Cú va chạm nhẹ kèm Rung điện thoại haptic feedback.

### 2.3 Tab 1 (Home/Dashboard)
Đây là màn hình Landing khi mở app hàng ngày.
- **Header:** Lời chào tùy khung giờ theo Template "Chào buổi sáng Tên_Couple,".
- **Hero Banner:** Mỏ neo chính đếm tuổi tình yêu. "Yêu nhau 580 Ngày".
  - *Micro-interaction:* Chạm tay vào con số, các ngôi sao nhỏ bay quanh 3s.
- **Middle Horizontal Scroll:** "Sắp đến". Card nằm ngang (Width: 80% screen width), vuốt qua vuốt lại xem 3 sự kiện gần nhất (Valentine, Sinh nhật, 2 năm ngày yêu).
- **Floating Button (+):** Nổi ở góc phải dưới dùng để Add Story lên Timeline.
- **Feed (Bên dưới):** Danh sách Memories kéo vô hạn.

### 2.4 Tab 2 (Care/Quan Tâm) - Cần UX Tế Nhị
- **View của Nữ:**
  - Header: Lịch ngang (Nằm gọn ở đỉnh màn hình, chỉ thấy 7 ngày). 
  - Body: 1 Nút tròn lớn "Báo Chu Kỳ".
  - Alert Setting: "Chia sẻ trạng thái này cho <Tên đối tác>".
- **View của Nam:**
  - Tuyệt đối không có lịch hay số máu. 
  - Card chính giữa màn hình (GlassMorphism siêu mờ): Thể hiện Text (VD: Phase Dễ Tủi Thân).
  - Component bên dưới: **"Đề xuất cho bạn" (Affiliate Links)**. Mua đồ ăn, tặng sách.

### 2.5 Tab 3 (Trải Nghiệm - Experience map)
- Giao diện giống Google Maps nhưng Custom Map Style cực kỳ sạch (Dark Mode thì nền đen, Light Mode nền kem).
- Các Pin thả trên bản đồ không phải icon Mặc định, mà là Icon Hình Cafe, Workshop, Rạp Phim.
- Tap vào: Xổ ra Bottom Sheet mô tả ngắn.

---

## 3. ERROR & EDGE CASES STATES (Luồng Rủi ro)
Một UX hoàn hảo nằm ở luồng lỗi.
- **Lỗi Mạng (No Internet):** 
  - UI: Dùng icon 2 bàn tay bị buông ra. "Đường truyền đang gián đoạn, nhưng tình cảm thì không. Vui lòng thử lại".
- **Empty States (Chưa có Kỉ Niệm Mới):** 
  - UI tab Home (Timeline mảng dưới trống): Hộp quà mờ ảo. "Hành trình nghìn dặm bắt đầu từ bước chân đầu tiên. Hãy lưu giữ bức ảnh hôm nay nhé".
- **Chưa Pairing xong mà đã thoát App:** 
  - Lần sau mở App -> Trả lại màn hình Đợi Đối tác nhập Code.
