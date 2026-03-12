# Model Context Protocol (MCP) Integration Strategy

Dựa trên xu hướng công nghệ mới nhất từ Anthropic (Claude), tài liệu này thiết kế một lớp **AI Integration Layer** thông qua chuẩn **Model Context Protocol (MCP)**. 
Đây là "vũ khí bí mật" giúp nâng tầm Em Plus từ một ứng dụng logic thông thường (Rule-based) trở thành một AI-Native Relationship Assistant thực thụ.

---

## 1. TẠI SAO LÀ MODEL CONTEXT PROTOCOL (MCP)?

MCP (được ví như "USB-C cho AI") là một giao thức chuẩn hóa mã nguồn mở cho phép các mô hình ngôn ngữ lớn (LLM) như Claude tương tác an toàn với các nguồn dữ liệu bên ngoài.
Thay vì chúng ta phải tự build một hệ thống RAG (Retrieval-Augmented Generation) cồng kềnh, phân mảnh thông qua API tĩnh truyền thống, MCP cho phép:
- LLM đọc trực tiếp context thông qua các "Tools" và "Resources".
- Tự động hóa quá trình Prompting bằng cách đưa Context thẳng vào AI.

---

## 2. ỨNG DỤNG MCP VÀO HỆ SINH THÁI EM PLUS

Chúng ta sẽ khai thác hệ sinh thái MCP ở hai cấp độ: **Internal Dev (Dành cho Team Phát Triển)** và **Product Feature (Tính năng cho người dùng)**.

### 2.1. Cấp độ 1: Dành cho Development & Operations (Dùng npx servers có sẵn)

Để tăng tốc độ phát triển và quản trị dữ liệu, team kĩ thuật sẽ thiết lập các MCP Core Servers có sẵn trên cộng đồng để dùng chung với Claude Desktop / Cursor:

1. **PostgreSQL MCP Server (`@modelcontextprotocol/server-postgres`)**:
   - *Cách chạy:* `npx -y @modelcontextprotocol/server-postgres postgresql://user:pass@localhost:5432/emplus`
   - *Mục đích:* Cho phép AI Assistant của đội ngũ Dev đọc trực tiếp schema, truy xuất dữ liệu test, sinh query phức tạp hoặc debug lỗi logic chu kỳ cảm xúc mà không cần mở DBeaver/DataGrip.
   
2. **Github MCP Server (`@modelcontextprotocol/server-github`)**:
   - *Cách chạy:* `npx -y @modelcontextprotocol/server-github`
   - *Mục đích:* Cho phép Claude tự động tạo Issue, map lỗi từ hệ thống Log (Sentry) vào Repo GitHub của dự án Em Plus.

3. **Slack MCP Server (`@modelcontextprotocol/server-slack`)**:
   - Thiết lập alert thông minh cho đội ngũ vận hành nếu hệ thống rớt gói tin Push Notification.

---

## 2.2. Cấp độ 2: Xây dựng "Em Plus MCP Server" (Product Feature)

Đây là điểm nhấn công nghệ. Thay vì chỉ nhét AI API vào Code backend, chúng ta sẽ mở một **Em Plus MCP Server** độc lập.

- **Khách hàng tiềm năng:** Người dùng có sử dụng AI (như Claude App / ChatGPT).
- **Trải nghiệm viễn tưởng (nhưng hoàn toàn khả thi):** User nam đang chat với Claude App trên điện thoại.
  - *User:* "Chào Claude, tôi đang cạn ý tưởng quà tuần tới. Bằng dữ liệu Em Plus, kiểm tra giúp tôi sắp tới có dịp kỷ niệm nào với Ngọc không và đưa cho tôi 3 option mua quà ở Shopee".
  - *Claude:* Gọi ngầm vào `Em Plus MCP Server` -> Lấy được Context "Ngày yêu nhau thứ 1000", "Thời điểm hiện tại Ngọc đang ở Phase 3 nhạy cảm" -> Suy luận và Recommend Quà tối ưu dựa vào affiliate link được cấu hình.

### Các Tools mà Em Plus MCP Server sẽ Expose (Khơi ra cho LLM Client):

1. **`get_upcoming_relationship_events`**: 
   - Lấy danh sách sự kiện Kỷ niệm (Anniversary) và sinh nhật trong X ngày tới của user cụ thể.
2. **`get_partner_emotional_context`**: 
   - Trả về String Context đã được "Dịch" (Phase Năng Lượng / Nhạy Cảm) của bạn Nữ, ẩn đi data y khoa.
3. **`generate_greeting_draft`**: 
   - AI sẽ dựa vào Context để thay thế hoàn toàn Greeting Template cứng nhắc ở phase 1, sinh ra lời chúc siêu cá nhân hoá dựa trên độ tuổi, phong cách nhắn tin của 2 người (nếu có cấp quyền).
4. **`search_affiliate_gifts`**: 
   - Map yêu cầu của AI với Database Affiliate của Em Plus để sinh link kiếm tiền.

---

## 3. KIẾN TRÚC TÍCH HỢP BỔ SUNG

**Sơ đồ dạng văn bản (ASCII):**
```text
  [ LLM Interface ]            [ Em Plus System ]            [ Data Layer ]
  ┌───────────────┐            ┌────────────────┐            ┌──────────────┐
  │  Claude App   │            │  Mobile App    │            │              │
  │  Claude Desk  │◀───REST────▶   (Expo)       │            │  PostgreSQL  │
  │ (MCP Client)  │            └──────┬─────────┘            │              │
  └──────┬────────┘                   │                      └──────▲───────┘
         │                            │ (REST)                      │
         │ (JSON-RPC)                 ▼                             │
         │                     ┌────────────────┐                   │
         └────────────────────▶│  Core Backend  │───────────────────┤
                               │  (NestJS/Bun)  │                   │
                               └──────┬─────────┘                   │
                                      │                             │
                                      ▼                             ▼
                               ┌────────────────┐            ┌──────────────┐
                               │  Em Plus MCP   │            │              │
                               │     Server     │────────────▶    Redis     │
                               └────────────────┘            │              │
                                                             └──────────────┘
```

**Biểu đồ Mermaid:**
```mermaid
graph TD
    subgraph LLM Interface
        Claude[Claude App / Claude Desktop<br>Acting as MCP Client]
    end

    subgraph Em Plus System
        NativeApp[Em Plus Mobile App]
        Backend[NestJS Core API]
        MCPServer[Em Plus MCP Server<br>Bun/Node.js]
    end

    subgraph Data Layer
        DB[(PostgreSQL)]
        Redis[(Redis)]
    end

    Claude <-->|JSON-RPC via HTTP/SSE| MCPServer
    MCPServer <--> Backend
    Backend <--> DB
    Backend <--> Redis
    NativeApp <-->|REST| Backend
```

**Workflow Hoạt động:**
1. MCP Server khởi tạo bằng Bun/Node.
2. Định nghĩa sơ đồ Schema rõ ràng với chuẩn MCP Type: `Tool`, `Resource`, `Prompt`.
3. Client (Claude) gửi JSON-RPC chứa tên Tool (vd: `get_partner_emotional_context`).
4. Em Plus MCP Server kiểm tra Auth (qua API Key của user hoặc OAuth), query Core Backend, lấy dữ liệu, gom lại thành JSON Object trả về cho Claude.
5. Claude trộn JSON đó vào ngữ cảnh của nó để Sinh ra đoạn tư vấn tình cảm hoàn hảo.

---

## 4. IMPACT VỚI LỘ TRÌNH DỰ ÁN (ROADMAP UPDATE)

Việc áp dụng công nghệ này mang lại lợi thế cạnh tranh khổng lồ cho Em Plus:
- **Phase 1-2 (MVP):** Không cần đút AI phức tạp thẳng vào App (giảm cost). Chỉ dùng `npx mcp servers` cho Dev nâng cao hiệu suất Code.
- **Phase 3+ (Scale):** Mở API MCP Server này dưới dạng **Premium Feature**. Những cặp đôi chịu chi có thể trả phí hàng tháng (Subscription) để biến AI App của riêng họ (như Claude) thành một "chuyên gia tư vấn tình cảm cá nhân" có quyền đọc bộ nhớ (Memory/Timeline) của mối quan hệ hiện tại.
