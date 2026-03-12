# Em Plus - PRD & Complete System Architecture (Enterprise Setup)

## 1. PRODUCT REQUIREMENTS DOCUMENT (PRD)

### 1.1 Mục Tiêu Hệ Thống (Objectives)
- **Tầm nhìn:** Tạo ra siêu ứng dụng đồng hành, ghi nhớ và chăm sóc mối quan hệ tình cảm.
- **Core metrics (KPIs dự kiến):** DAA/MAU retention > 40% sau 30 ngày (do tính chất tracking). Conversion Rate mô hình Web gen cưới > 5% tập user "Kết Hôn".

### 1.2 User Personas (Chân dung khách hàng)
1. **Bạn Nam (The Logical Partner):** Hay quên mốc ngày kỷ niệm, lúng túng khi chọn quà, không rành tâm sinh lý nhạy cảm của bạn nữ. Cần một công cụ *cầm tay chỉ việc, nhắc khéo léo*.
2. **Bạn Nữ (The Emotional Partner):** Thích được quan tâm nhỏ nhặt, trân trọng ký ức qua ảnh, thích theo dõi con số ngày yêu, muốn một "Album số" bí mật giữa 2 người.

---

## 2. SYSTEM ARCHITECTURE DEEP DIVE

Để đáp ứng được tập user tương tác cao, đọc/ghi Timeline ảnh/video liên tục, kiến trúc phải hỗ trợ Scale chiều ngang (Horizontal Scaling).

### 2.1 Tech Stack Tiêu Chuẩn Áp Dụng:
- **Ngôn ngữ duy nhất toàn bộ repo (Monorepo):** `TypeScript`
- **Runtime Manager:** `bun` (Tốc độ khởi động, resolve package nhanh).
- **Mobile Client:** `React Native` + `Expo` (Router, Skia Glassmorphism, Reanimated).
- **Web App (Wedding Generator):** `Next.js App Router`, SSR cho SEO (thiệp cưới public), Hosted trên Vercel / AWS Amplify.
- **Backend API:** `NestJS` (Kiến trúc Controller-Service-Repository chuẩn DI, dễ scale team).
- **AI Integration Layer:** Cung cấp hạ tầng `Model Context Protocol (MCP) Server` qua Bun/Node, kết nối với Claude để xây dựng tính năng Tư vấn thông minh.
- **Message Broker & Cache:** `Redis / BullMQ`.
- **Database:** `PostgreSQL 15+` (Managed RDS / Supabase).
- **Storage:** `AWS S3 Standard` (Cho data mới) + `AWS S3 Glacier` (Cho data kỉ niệm quá 5 năm ít được truy cập - Tiết kiệm chi phí).

### 2.2 Infrastructure Diagram (Triển khai AWS Cloud)

```
                            [ Mobile User ]             [ Web User (Wedding Guest) ]
                                  |                                |
                                  v                                v
                          [ AWS API Gateway ]             [ AWS CloudFront (CDN) ]
                                  |                                |
       --------------------------------------------------------    | (Static Assets Web)
       |                          |                           |    v
 [ ALB Load Bal.]          [ WebSocket / Socket.io]         [ Vercel / Next.js Server ]
       |                          |                           |
  (Auto Scaling Group - ECS Fargate Containers)               |
       |                          |                           |
 [ NestJS API Auth ]       [ NestJS API Core ]         [ MCP AI Server ]
       |--------------------------|---------------------------|
       |                          |                           |
       v                          v                           v
  [ PostgreSQL ]              [ Redis ]                   [ AWS S3 ]
  (Master-Slave)           (ElastiCache)                (Media Storage)
```

### 2.3 Phân Tách Components (NestJS Micro-services Structure)

Thư mục Repo phía Backend cấu trúc theo Domain-Driven Design (DDD):
```
src/
 ├── app.module.ts
 ├── config/                  # AWS, Database, Environment Configs
 ├── common/                  # Guards, Interceptors, Filters (Global Catch)
 ├── modules/
 │    ├── auth/               # Google/Apple strategies, JWT auth
 │    ├── users/              # Update Profile
 │    ├── couples/            # Pairing flow, Invite logic
 │    ├── timeline/           # Memories C.R.U.D
 │    ├── engines/            # TÁCH RIÊNG LOGIC NẶNG (Cronjobs, BullMQ)
 │    │    ├── anniversary/
 │    │    ├── emotional/
 │    │    └── wedding_gen/
 │    └── notifications/      # Service connect FCM
 └── workers/                 # Background processors (scale độc lập với API Node)
```

### 2.4 Chiến Lược Real-time Data (WebSockets)
Hai user chat hoặc update Timeline sẽ không bắt user kia F5 app.
- Giải pháp: Tích hợp `Socket.io` trên NestJS.
- Room setup: `couple_room_{couple_id}`.
- Payload bắn qua socket: `{"action": "MEMORY_ADDED", "data": {...}}`. Socket trên Client lắng nghe, nhận trigger sẽ auto-apend item vào local state Timeline mà không cần fetch lại API.
