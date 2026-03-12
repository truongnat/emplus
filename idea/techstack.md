Rõ 👍 mình **giữ ở mức OVERVIEW**, không đi vào chi tiết thiết kế nữa.
Dưới đây là **Design System – Overview ngắn gọn**, sau đó mình **chuyển thẳng sang TECH STACK** như bạn yêu cầu 🚀

---

# 🎨 DESIGN SYSTEM – OVERVIEW (1 PAGE)

## 🎯 Mục tiêu

* Tạo cảm giác **tinh tế – hiện đại – có chiều sâu cảm xúc**
* Dùng được **nhiều năm**, không lỗi mốt
* Phù hợp với **nội dung nhạy cảm & riêng tư**

---

## 🌊 Phong cách chủ đạo

**Liquid Glass Morphism**

* Glass mờ nhiều lớp
* Ánh sáng mềm, phản xạ nhẹ
* Bo tròn lớn, không cạnh sắc
* Chuyển động chậm, có quán tính

> Thiết kế không gây chú ý – nhưng tạo *cảm xúc nền* rất tốt

---

## 🎨 Màu sắc

* Tông ấm, tươi mới
* Tránh đỏ cảnh báo mạnh
* Accent dịu (hồng – tím – mint)

🌓 **Dark / Light mode**

* Light: lãng mạn, dễ chia sẻ
* Dark: riêng tư, trưởng thành

---

## ✍️ Chữ & ngôn ngữ

* Font rounded, dễ đọc
* Câu ngắn, không mệnh lệnh
* Gợi ý thay vì nhắc nhở

---

## 🧱 Component tinh giản

* Glass Card là trung tâm
* Button bo tròn lớn
* Notification dạng “note cảm xúc”

---

## 🌀 Motion

* Nhẹ, chậm
* Không rung, không giật
* Tạo cảm giác “được quan tâm”

---

👉 **Kết luận design**

> Một design system *không gây mệt*, đủ đẹp để đồng hành lâu dài với mối quan hệ.

---

# ⚙️ TECH STACK – OVERVIEW ĐỀ XUẤT

Mình đề xuất **stack hiện đại, thực tế, dễ scale**, ưu tiên:

* Mobile-first
* Dev nhanh
* Dễ tích hợp affiliate & AI sau này

---

## 📱 Frontend (Mobile App)

### ✅ Option khuyến nghị

**Flutter**

* 1 codebase: iOS + Android
* Rất mạnh với:

  * Blur
  * Glass
  * Animation
* UI đồng nhất, đẹp

📌 Phù hợp nhất với design Liquid Glass

---

### (Alternative)

* React Native + Reanimated + Skia
  → OK, nhưng Flutter vẫn mượt hơn với glass

---

## 🌐 Web (Wedding Website Generator)

* **Next.js**
* Tailwind CSS
* Server Components

👉 Dùng chung:

* Color system
* Typography
* Motion concept

---

## 🧠 Backend

### Core Backend

* **Node.js (NestJS)** hoặc **FastAPI**
* REST + chuẩn bị sẵn GraphQL

### Chức năng

* User
* Relationship data
* Anniversary engine
* Wedding engine
* Affiliate config

---

## 🗄️ Database

* **PostgreSQL** (quan hệ rõ ràng)
* **Redis** (notification, cache)
* **S3-compatible storage** (ảnh cưới, ảnh kỷ niệm)

---

## 🔔 Notification

* Firebase Cloud Messaging
* Rule-based engine (không cần AI giai đoạn đầu)

---

## 🔐 Auth & Security

* OAuth (Google / Apple)
* Local encryption (dữ liệu nhạy cảm)
* Server chỉ lưu khi cần

---

## 💰 Affiliate & Monetization

* Cấu hình sản phẩm thủ công (Admin panel)
* Link:

  * TikTok Shop
  * Shopee
* Tracking click / conversion (basic)

---

## 🤖 AI (Phase sau – optional)

* Generate:

  * Lời chúc
  * Story cưới
* Không realtime, không phức tạp

---

## ☁️ Infrastructure

* Cloud: AWS / GCP
* CI/CD: GitHub Actions
* CDN cho wedding website

---

# 🧭 TÓM TẮT 1 DÒNG

> **Flutter (App) + Next.js (Web) + Node/FastAPI + PostgreSQL**
> → Đủ nhanh để launch, đủ sạch để scale, đủ đẹp để giữ người dùng lâu dài.

---
