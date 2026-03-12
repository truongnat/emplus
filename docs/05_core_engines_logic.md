# Core Engines Algorithmic Logic

Văn bản này mổ xẻ phần lõi thông minh (Smart Engines) của Em Plus. Cách chúng ta khiến một ứng dụng "Tracker" trở thành "Assistant".

---

## 1. ANNIVERSARY CALCULATION ENGINE 
*(Lõi sinh Sự kiện tự động)*

Hệ thống ghi nhận `love_start_date` làm mốc toạ độ lịch sử `T(0)`. Từ đó sinh ra vô số Cột mốc ảo.

### 1.1. Logic sinh cột mốc ngày (Days Milestones)
- **Công thức:** `Milestone = T(0) + N days`. 
- Để tránh bị spam, thuật toán thiết lập **Màng lọc Độ ưu tiên (Importance Threshold)**:
  - Nếu `N < 100`: Chỉ nhắc ở mốc 1 tháng (30 ngày), 2 tháng (60).
  - Nếu `N = 100, 200, 300`: Level Medium (Nhắc trong app).
  - Nếu `N = 500, 1000, 2000, ...`: Level High (Bắn Push Notification T-3 và T-0, Gửi Email báo cáo Kỷ niệm dạng Wrapped "1000 ngày bên nhau đã qua thế nào").

### 1.2. Logic sinh cột mốc năm (Yearly Anniversaries)
- Hệ thống không lưu vĩnh viễn 50 records cho 50 năm vào DB (Lãng phí tài nguyên).
- Sử dụng Job `Cron(0 0 * * *)` (0h00 mỗi ngày) hoặc `On-The-Fly Request` trên BE.
  ```typescript
  // Pseudo Logic Generation On-The-Fly
  function getUpcomingAnniversaries(loveStartDate: Date, limitDays = 30): Event[] {
      const today = new Date();
      const events = [];
      const yearsSince = today.getFullYear() - loveStartDate.getFullYear();
      
      // Dự đoán Kỷ niệm năm nay
      const thisYearAnniv = setYear(loveStartDate, today.getFullYear());
      if (diffDays(thisYearAnniv, today) >= 0 && diffDays(thisYearAnniv, today) <= limitDays) {
          events.push({ title: `Kỷ niệm ${yearsSince} năm yêu`, date: thisYearAnniv, priority: 'HIGH' });
      }

      // Dự đoán Kỷ niệm năm sau (Trường hợp gọi API vào cuối T12)
      const nextYearAnniv = setYear(loveStartDate, today.getFullYear() + 1);
      if (diffDays(nextYearAnniv, today) <= limitDays) {
         events.push({ title: `Kỷ niệm ${yearsSince + 1} năm yêu`, date: nextYearAnniv, priority: 'HIGH' });
      }
      return events;
  }
  ```

## 2. EMOTIONAL CARE ENGINE 
*(Biến Data y khoa thành Lời nhắn tình cảm)*

### 2.1. Cấu trúc Cửa sổ Cảm xúc (Window Mapping)

Dữ liệu Nữ: `start_date`, chu kỳ trung bình `L` (mặc định 28).

**Công thức Phase:**  
Tính số ngày kể từ ngày đầu tiên: `D = CurrentDate - start_date (theo modulo L)`.
- **Phase MENSTRUATION** (D từ 1->5): Cơ thể mất máu, mệt mỏi thể chất, dễ đau quặn thắt.
- **Phase FOLLICULAR** (D từ 6->13): Mức Estrogen tăng, vui tươi, tràn đầy năng lượng, thích giao tiếp.
- **Phase OVULATION** (D từ 14->16): Năng lượng đỉnh điểm, quyến rũ, "đẹp nhất chu kỳ".
- **Phase LUTEAL / PMS** (D từ 17->L): Progesterone xuất hiện, dễ thay đổi tâm trạng, cáu gắt vô cớ, thèm đồ ngọt/mặn, muốn được an ủi tĩnh lặng.

### 2.2. Thuật toán Biến đổi cho App Nam (Translator Algorithm)
Thay vì nổ Push: "Banj Nữ đang tới tháng", hệ thống chạy Mapper.

```json
{
  "MENSTRUATION": {
    "nam_ux_badge": "Needs Care & Warmth 🍵",
    "suggestions_template": [
      "Vài ngày tới sức khoẻ thể chất của {name} có thể không ở mức tốt nhất. Hãy bù đắp bằng sự chăm sóc ấm áp.",
      "Túi chườm nóng và một ly sữa ấm sẽ là những 'vũ khí' tuyệt vời của bạn hôm nay."
    ],
    "action_tag": ["buy_warm_drink", "pharmacy_link"]
  },
  "FOLLICULAR": {
    "nam_ux_badge": "High Energy Mode 🏃",
    "suggestions_template": [
      "Hôm nay tâm trạng của {name} đang rất tốt! Lý tưởng cho những cuộc thảo luận quyết định hoặc lên kế hoạch đi chơi xa.",
      "Cô ấy đang tràn trề năng lượng, hãy rủ cô ấy tham gia một workshop hoặc đi dạo phố."
    ],
    "action_tag": ["book_workshop", "outdoor_activity"]
  },
  "LUTEAL_PMS": {
    "nam_ux_badge": "Sensitive Window 🫂",
    "suggestions_template": [
        "Cửa sổ nhạy cảm: {name} có thể thay đổi cảm xúc bất thường. Hãy duy trì sự kiên nhẫn tối đa, cô ấy không cố ý đâu.",
        "Đây là lúc những món ăn vặt được phát huy tác dụng. Trà sữa hay đồ ngọt sẽ làm cô ấy vui hơn."
    ],
    "action_tag": ["order_food", "comfort_gift"]
  }
}
```

## 3. NOTIFICATION DISPATCH ARCHITECTURE 
*(Lõi Push Notification không Spam)*

- Notification không bao giờ bắn rải thảm, phải tuân qua **Throttling Guard**.
- **Rule 1: Chống Gây Phiền Nhiễu (Anti-fatigue).** 
  - Một user chỉ nhận TỐI ĐA 2 Push từ App trong 24h.
  - Priority: Chat/Message > Kỷ Niệm T-0 > Suggestion/Care > Kỷ Niệm T-7.
- **Rule 2: Timezone Mute.**
  - Không gửi Push từ 22:30 đến 07:30 (Trừ phi user cố tình set gửi đúng 00:00). Các Job quét ban đêm sẽ enqueue mail vào Redis, delay tới `08:00 AM` theo múi giờ (`user.timezone`) mới thực hiện gửi FCM trigger.
