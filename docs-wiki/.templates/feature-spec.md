# FEATURE: [Feature Name]

## 1. Feature Overview
**Cái gì:** [Mô tả ngắn gọn chức năng là gì]
**Tại sao:** [Giải thích giá trị nghiệp vụ hoặc lý do tồn tại của chức năng này]

## 2. Business Constraints
*Trích xuất các quy tắc ẩn trong code (ví dụ: "Chỉ Admin mới được tạo", "Mật khẩu phải dài 8 ký tự").*

- **Constraint 1:** [Mô tả quy tắc] -> [File/Logic tương ứng]
- **Constraint 2:** [Mô tả quy tắc] -> [File/Logic tương ứng]

## 3. Data Flow (PlantUML Sequence)
*Thể hiện rõ Actor (User), Frontend, Backend, và Database. Phải chia nhỏ nếu luồng quá phức tạp.*

### Main Flow: [Flow Name]
@startuml
skinparam handwritten false
skinparam monochrome true
skinparam packageStyle rect
skinparam defaultFontName "Courier"

actor User
participant "Frontend (React/Next.js)" as FE
participant "API Gateway (Controller)" as API
participant "Business Logic (Service)" as Service
database "Database (PostgreSQL)" as DB

User -> FE : [Action]
FE -> API : [HTTP Method] / [Endpoint]
API -> Service : [Method Call]
Service -> DB : [Query/Mutation]
DB --> Service : [Data]
Service --> API : [Result]
API --> FE : [JSON Response]
FE --> User : [UI Update]
@enduml

## 4. Architecture Mapping
*Bảng liệt kê các File/Symbol quan trọng tham gia vào feature này.*

| Layer | File Path | Symbol | Responsibility |
| :--- | :--- | :--- | :--- |
| **UI** | `mobile/app/...` | `LoginScreen` | Giao diện đăng nhập |
| **Server/Fetcher** | `mobile/src/api.ts` | `login()` | Gọi API đăng nhập |
| **Controller** | `api/src/modules/auth.ts` | `postLogin` | Tiếp nhận request |
| **Service** | `api/src/services/auth.service.ts` | `authenticate()` | Xử lý logic nghiệp vụ |
| **Data/DTO** | `api/src/dto/auth.dto.ts` | `LoginDTO` | Định nghĩa dữ liệu truyền tải |
| **Database** | `api/src/store/contracts.ts` | `User` | Schema người dùng |
