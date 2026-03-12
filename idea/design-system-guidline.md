# 🎨 DESIGN SYSTEM GUIDELINE

## Liquid Glass Morphism – Relationship & Wedding App

---

## 1. TRIẾT LÝ THIẾT KẾ (DESIGN PHILOSOPHY)

### ✨ Chủ đạo

**Liquid · Glass · Emotion · Modern**

App không chỉ để dùng – mà để *cảm*.
Thiết kế cần tạo cảm giác:

* Mềm mại
* Tinh tế
* Có chiều sâu cảm xúc
* Trưởng thành nhưng không lạnh

> ❝ Nhìn vào là thấy yêu – dùng lâu không mệt ❞

---

## 2. PHONG CÁCH THỊ GIÁC (VISUAL STYLE)

### 🫧 Liquid Glass Morphism

* Nền mờ (blur) nhiều lớp
* Ánh sáng mềm, phản xạ nhẹ
* Không cạnh sắc, không khối cứng
* Chuyển động chậm, có quán tính

**Nguyên tắc:**

* Glass chỉ để *nâng cảm xúc*, không làm khó đọc
* Không lạm dụng blur > 3 layer

---

## 3. COLOR SYSTEM

### 🎨 Core Palette

| Token     | Light Mode | Dark Mode | Ý nghĩa            |
| --------- | ---------- | --------- | ------------------ |
| Primary   | #FF6B81    | #FF7A90   | Yêu thương, ấm áp  |
| Secondary | #7B61FF    | #8E7CFF   | Gắn kết, tin tưởng |
| Accent    | #4FD1C5    | #2DD4BF   | Tươi mới, hy vọng  |

---

### 🌫 Glass Surface Colors

| Token           | Light                  | Dark                   |
| --------------- | ---------------------- | ---------------------- |
| Glass/Primary   | rgba(255,255,255,0.55) | rgba(255,255,255,0.08) |
| Glass/Secondary | rgba(255,255,255,0.35) | rgba(255,255,255,0.04) |

> ⚠️ Glass luôn đi kèm border + shadow mềm

---

### 🌓 Background

* Light: Gradient rất nhẹ (warm white → pastel)
* Dark: Gradient deep (midnight blue → charcoal)

---

## 4. TYPOGRAPHY

### 🅰️ Font Stack

* Heading: **SF Pro Rounded / Inter Rounded**
* Body: **Inter / System UI**

### 📐 Scale

| Type    | Size  | Weight   |
| ------- | ----- | -------- |
| H1      | 28–32 | SemiBold |
| H2      | 22–24 | Medium   |
| Body    | 15–16 | Regular  |
| Caption | 12–13 | Regular  |

**Quy tắc:**

* Không viết hoa toàn bộ
* Ưu tiên câu ngắn, dễ thở

---

## 5. ICONOGRAPHY

### 🧊 Phong cách icon

* Line + semi-rounded
* Độ dày nét: 1.5px – 2px
* Không dùng icon quá góc cạnh

### ❤️ Icon cảm xúc

* Có thể dùng gradient nhẹ
* Không quá chi tiết

---

## 6. COMPONENT SYSTEM

---

### 🧱 6.1. Glass Card (Component chủ đạo)

**Style:**

* Radius: 20–28px
* Blur: 12–20
* Border: 1px rgba(255,255,255,0.2)
* Shadow: rất mềm, lan

**Dùng cho:**

* Kỷ niệm
* Gợi ý
* Lời chúc

---

### 🔘 6.2. Button

#### Primary Button

* Gradient nhẹ
* Radius: 999px
* Shadow mềm

#### Secondary Button

* Glass outline
* Background trong suốt

**Không dùng button cứng hình chữ nhật**

---

### 🧾 6.3. Input / Form

* Glass surface
* Placeholder mờ
* Focus glow nhẹ (primary color)

---

### 🔔 6.4. Notification / Suggestion Card

* Bo tròn
* Icon cảm xúc
* Nội dung ngắn

Ví dụ:

> 💗 Hôm nay nên nhẹ nhàng hơn một chút.

---

## 7. DARK / LIGHT MODE

### 🌞 Light Mode

* Cảm giác:

  * Lãng mạn
  * Nhẹ
  * Dễ chia sẻ

### 🌙 Dark Mode

* Cảm giác:

  * Riêng tư
  * Trưởng thành
  * Dùng ban đêm không mỏi

**Chuyển mode:**

* Fade + blur transition
* Không snap cứng

---

## 8. MOTION & MICRO-INTERACTION

### 🌀 Animation Principles

* Ease-out
* Duration: 180–280ms
* Có quán tính

### Ví dụ:

* Card nổi lên nhẹ khi tap
* Blur tăng khi focus
* Notification trôi lên chậm

> ❌ Không rung, không giật

---

## 9. EMOTIONAL UX RULES (RẤT QUAN TRỌNG)

* Không dùng từ mệnh lệnh
* Không dùng màu đỏ cảnh báo mạnh
* Mọi gợi ý đều ở dạng *đề xuất*

Ví dụ tốt:

> “Có thể hôm nay là ngày cần quan tâm hơn.”

---

## 10. ACCESSIBILITY

* Contrast ≥ WCAG AA
* Font không quá mảnh
* Dark mode thật sự đọc được

---

## 11. TỔNG KẾT

Design system này hướng tới:

> 🌊 Mềm như cảm xúc
> 🫧 Trong như ký ức
> ❤️ Ấm như một mối quan hệ trưởng thành

Không chạy theo trend ngắn hạn,

👉 mà đủ đẹp để dùng **nhiều năm**.
