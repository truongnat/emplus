# Ticket 19 — Home counter: nghiên cứu UX / UI hiển thị tốt nhất

## Meta

- **id**: 19
- **status**: done
- **updated**: 2026-04-04
- **closed**: 2026-04-04
- **domain_stack**: mobile / home / UX research

### Ghi chú id

Yêu cầu ghi **“ticket 10”** — **[ticket-10](./ticket-10/TICKET.md)** đã dùng cho *Pairing / Lottie family love* (done). Nội dung counter được theo dõi ở **ticket-19** này.

## Spec

- **Research:** Nguyên tắc hiển thị vùng đếm ngày (hero counter) phù hợp relationship app + Aura + mobile.
- **Output:** Khuyến nghị ưu tiên (Must / Should / Could) + căn cứ; một cải tiến nhỏ có thể ship ngay nếu rõ ràng.

## Research (tóm tắt có căn cứ)

### 1. Mục tiêu trải nghiệm

| Mục tiêu | Ý nghĩa |
|----------|---------|
| **Nhận diện trong &lt;1s** | Người dùng thấy ngay *đã bao lâu* — số ngày là **focal point** (Fitts / visual hierarchy). |
| **Cảm xúc, không áp lực** | Khớp [`VISUAL_DESIGN_GUIDE.md`](../../docs/VISUAL_DESIGN_GUIDE.md): *“gentle companion, never an alarm clock”*. |
| **Quét dọc (F-pattern)** | Sau header, mắt đi: nhãn ngắn → số lớn → chi tiết phụ (giờ). |

### 2. Trạng thái hiện tại (code)

| Thành phần | File | Vai trò |
|------------|------|---------|
| Overline | `HeroCard` | “ĐÃ BÊN NHAU” — context |
| Số ngày | `NumberTicker` / `HomeClock` | Display chính, màu `brand.strong`, roll animation |
| Giờ | `ClockTicker` tone `onHero` | Meta thời gian thực, mono, pill glass |
| Nền | `heroCardGradient` | Coral 4-stop + dark variant |

### 3. Căn cứ design system

- **Typography:** Guide §3.2 gợi ý role `numeric` (Roboto Mono) cho *day counters* — hiện **số lớn** dùng Be Vietnam Pro 900; **đồng hồ** đã dùng mono → phân tầng “display vs supporting” hợp lý.
- **Copy §3.3:** *“No ALL CAPS”* — overline đang **uppercase** toàn dòng → **Should** cân nhắc sentence case (“Đã bên nhau”) hoặc chỉ capitalize chữ cái đầu để khớp guide.
- **Glass:** §2.6 — pill đồng hồ đã có viền + fill bán trong suốt → khớp hướng liquid glass.
- **Touch:** Vùng counter **không** là control — không cần 44pt target; nếu sau này thêm tap (chi tiết ngày bắt đầu) thì phải đủ target.

### 4. Accessibility & motion

- **Screen reader:** Gộp một `accessibilityLabel` mô tả đầy đủ số ngày tránh đọc lẻ từng digit rời (đã áp dụng trong Implementation).
- **Reduce Motion:** Có `useReducedMotion` — **Should** (backlog): khi bật, tắt roll `NumberTicker` / giảm pulse hero, chỉ hiển thị số tĩnh.
- **Contrast:** `brand.strong` trên gradient coral — nên **Could** kiểm tra snapshot WCAG trên light/dark sau mỗi đổi gradient.

### 5. Pattern tham khảo (không copy 1:1)

- **Day-one / anniversary apps:** Thường có *một* số hero + nhãn ngắn; giờ phút ít khi cùng weight với số ngày — khớp hướng hiện tại (giờ secondary).
- **Widget-style:** Số tĩnh + cập nhật theo ngày; animation nhẹ khi mở app — pulse hiện tại là mức chấp nhận được nếu respect reduce motion sau.

## Khuyến nghị tốt nhất (ưu tiên)

| Ưu tiên | Khuyến nghị | Lý do |
|---------|-------------|--------|
| **Must** | Một `accessibilityLabel` tiếng Việt cho khối counter (số ngày) | VoiceOver/TalkBack không đọc “0… 1…” như hai thực thể tách |
| **Should** | Giảm ALL CAPS overline theo `VISUAL_DESIGN_GUIDE` §3.3 | Nhất quán tone “mature restraint” |
| **Should** | `useReducedMotion` → tắt roll + pulse | HIG / WCAG 2.2 motion |
| **Could** | Tùy chọn hiển thị lại *ngày bắt đầu* dạng secondary (đã bỏ ở ticket-18) | Một số user cần anchor — có thể đặt dưới Quick Actions hoặc long-press |
| **Could** | A/B nhỏ: số dùng full `numeric` mono vs Be Vietnam display | Guide nêu numeric cho counter; cần UAT cảm nhận “ấm” vs “tech” |

## Acceptance

- [x] Tài liệu research + bảng khuyến nghị trong ticket này.
- [x] Làm rõ ticket 10 ≠ counter (tránh nhầm Kanban).
- [x] Ship **Must** tối thiểu: `accessibilityLabel` trên khối nội dung counter.
- [x] `bun run typecheck:mobile` pass.

## Implementation (scope ticket này)

| File | Thay đổi |
|------|----------|
| `mobile/src/features/home/components/HeroCard.tsx` | `View` `content`: `accessible` + `accessibilityLabel={`Đã bên nhau ${loveDays} ngày`}` |

## Verify

- `bun run typecheck:mobile` — pass (2026-04-04)

## Residual (backlog)

- Should: sentence case overline; Reduce Motion cho `NumberTicker` + pulse.
- Could: contrast audit; khôi phục ngày bắt đầu ở vị trí secondary.

## Skill / bundle

- Không thêm skill; không chạy `validate-skills`.
