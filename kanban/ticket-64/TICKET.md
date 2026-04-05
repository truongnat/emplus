# Ticket 64 — Hồ sơ: format ngày/giờ VN + date/time picker (sheet theo mock)

## Metadata

- **id**: 64
- **status**: done
- **domain_stack**: mobile / Expo
- **opened**: 2026-04-05

## Spec

- **API**: Giữ `dob` gửi lên dạng **YYYY-MM-DD** (không đổi contract).
- **Hiển thị**: Ngày sinh **D/M/YYYY** (vd. `17/6/2001`); giờ sinh **HH:mm** (24h).
- **Date picker**: Sheet dưới — header (icon + “Chọn ngày sinh” + đóng), **THÁNG mm**, lưới **T2…CN**, cuối tuần nhấn brand nhẹ, ô có **dương + âm lịch** (nhỏ), ô chọn = **brand**; **Hủy** / **Chọn**.
- **Lịch**: Luôn **dương lịch** làm số chính; dòng nhỏ là **âm lịch** (tham khảo). Không có switch D/Â trên form.
- **Time picker**: Sheet “Chọn giờ sinh”, 2 cột giờ–phút (scroll snap), cùng chrome nút; màu theo **semantic / brand** app (không xanh lá mock).
- **Giờ sinh**: Lưu API `birthTime` (HH:mm 24h) — cột `birth_time VARCHAR(5)` trong DB.

## Acceptance

- [x] Trường ngày mở sheet custom; hiển thị đúng D/M/YYYY; lưu API YYYY-MM-DD.
- [x] Âm lịch hiển thị dưới mỗi ô (lunar-javascript).
- [x] Time picker + persist local HH:mm.
- [x] Màu/spacing theo theme Aura hiện tại.

## Verify

- `mobile`: `bun run typecheck`

## Close

- **closed_at**: 2026-04-05
- **residual risk**: Xoá dữ liệu cũ trong AsyncStorage `emplus.profile.birthTime.v1` ở lần mở app sau (migration local, tùy chọn).
