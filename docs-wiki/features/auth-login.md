---
title: "Authentication Login"
description: "Authentication Login captures the login workflow inside authentication. It spans 2 workspaces. Key flows include Auth login, Auth registration, Auth login."
layout: "doc"
outline:
  - 2
  - 3
editLink: false
lastUpdated: false
pageClass: "docs-wiki docs-wiki--feature"
docsWiki:
  schemaVersion: "1.0.0"
  kind: "feature"
  project: "emplus"
  template: "detailed"
  themePreset: "clean"
  generatedAt: "2026-04-10T00:30:54.293Z"
  page: "features/auth-login.md"
  featureId: "auth-login"
  domain: "auth"
  action: "login"
---

# FEATURE: Authentication Login

## 1. Feature Overview
**Cái gì:** Chức năng cho phép người dùng đăng nhập vào hệ thống Em+ thông qua email và mật khẩu. Hỗ trợ cơ chế "Lazy Registration" thông qua OTP nếu người dùng chưa tồn tại.
**Tại sao:** Đảm bảo an toàn thông tin người dùng, xác thực danh tính để truy cập vào các tính năng riêng tư như Timeline, Anniversary, và Memory.

## 2. Business Constraints
*Trích xuất các quy tắc ẩn trong code.*

- **Rate Limiting:** Giới hạn số lần thử đăng nhập (`LOGIN_RATE_LIMIT_COUNT`) để chống tấn công brute-force. -> `auth.service.ts`
- **Lazy Registration:** Nếu email chưa tồn tại, hệ thống tự động gửi OTP để xác thực và tạo tài khoản sau khi verify thành công. -> `auth.service.ts:loginUser`
- **OTP Security:** Mã OTP có thời hạn (`OTP_TTL_SECONDS`) và giới hạn số lần nhập sai (`OTP_MAX_VERIFY_ATTEMPTS`). -> `auth.service.ts:verifyOtpAndLogin`
- **Session Management:** Sử dụng Dual Token (Access & Refresh Token). Access Token có thời hạn ngắn, Refresh Token dùng để lấy session mới mà không cần đăng nhập lại. -> `auth.service.ts:issueAuthPayload`
- **Unique Identity:** Mỗi email chỉ được gắn với một tài khoản duy nhất. -> `auth.service.ts:registerUser`

## 3. Data Flow (PlantUML Sequence)
*Thể hiện luồng dữ liệu giữa các tầng.*

### Main Flow: Login with Email/Password
@startuml
skinparam handwritten false
skinparam monochrome true
skinparam packageStyle rect
skinparam defaultFontName "Courier"

actor "User" as User
participant "Mobile App (React Native)" as FE
participant "API Gateway (Hono)" as API
participant "Auth Service" as Service
database "Redis (Session/RateLimit)" as Redis
database "PostgreSQL (User Data)" as DB

User -> FE : Nhập Email/Password
FE -> API : POST /api/auth/login
API -> Service : loginUser(email, password)
Service -> Redis : Kiểm tra Rate Limit
Redis --> Service : OK
Service -> DB : Tìm user theo email
DB --> Service : User object
Service -> Service : verifyPassword(password, hash)
Service -> Service : issueAuthPayload(user)
Service -> Redis : Lưu Access/Refresh Session
Service --> API : AuthPayload (User + Tokens)
API --> FE : 200 OK (JSON)
FE -> FE : Lưu tokens vào SecureStorage
FE --> User : Chuyển hướng vào Dashboard
@enduml

### Alternate Flow: OTP Verification (Lazy Registration)
@startuml
skinparam handwritten false
skinparam monochrome true
skinparam packageStyle rect
skinparam defaultFontName "Courier"

actor "User" as User
participant "Mobile App" as FE
participant "Auth Service" as Service
participant "Mail Service" as Mail

User -> FE : Nhập Email mới
FE -> Service : loginUser(email, password)
Service -> Service : Không tìm thấy User
Service -> Service : Tạo OTP 6 chữ số
Service -> Mail : Gửi email chứa OTP
Service --> FE : { requiresOTP: true }
FE -> User : Hiển thị màn hình nhập OTP
User -> FE : Nhập mã OTP
FE -> Service : verifyOtpAndLogin(email, otp)
Service -> Service : verify OTP
Service -> Service : createUser(email, password)
Service --> FE : AuthPayload
@enduml

## 4. Architecture Mapping
*Bảng liệt kê các File/Symbol quan trọng tham gia vào feature này.*

| Layer | File Path | Symbol | Responsibility |
| :--- | :--- | :--- | :--- |
| **UI** | `mobile/app/login.tsx` | `LoginScreen` | Màn hình đăng nhập chính |
| **UI** | `mobile/src/features/auth/components/LoginAuthForm.tsx` | `LoginAuthForm` | Form nhập liệu và validation |
| **Server/Fetcher** | `mobile/src/presentation/hooks/auth/useLogin.ts` | `useLogin` | Hook xử lý logic gọi API từ Mobile |
| **Controller** | `api/src/modules/auth.ts` | `authModule` | Định nghĩa các routes cho Authentication |
| **Service** | `api/src/services/auth.service.ts` | `loginUser` | Xử lý logic đăng nhập, rate limit và OTP |
| **Service** | `api/src/services/auth.service.ts` | `issueAuthPayload` | Cấp phát JWT tokens |
| **Data/DTO** | `api/src/dto/auth.dto.ts` | `LoginDTO` | Schema validate dữ liệu đầu vào |
| **Database** | `api/src/store/contracts.ts` | `User` | Interface định nghĩa cấu trúc dữ liệu User |
| **Persistence** | `api/src/store/in-memory-store.ts` | `saveSession` | Lưu trữ session vào Redis |
