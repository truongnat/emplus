# Ticket 39 — Toast full width + nội dung không cắt sớm

## Metadata

- **ticket_id**: 39
- **status**: done
- **domain_stack**: `mobile` (Expo / React Native)
- **closed**: 2026-04-04

## Spec

- Toast hiển thị **gần full width** màn hình (trừ safe area + lề 16px), thay vì khối hẹp `maxWidth: 400` góc phải.
- **Message / description** xuống dòng đầy đủ, bỏ `numberOfLines` giới hạn 2–3 dòng.

## Implementation

- `mobile/src/components/atoms/Toast.tsx`: vùng `region` `left: 0` `right: 0`, padding ngang theo `insets`; `toastContainer` `width: "100%"` `alignSelf: "stretch"`; `textContainer` `minWidth: 0` để text co trong flex; bỏ `numberOfLines` trên `message` và `description`.

## Verify

- `bunx tsc --noEmit` trong `mobile/`.

## Acceptance

1. Toast trải gần hết chiều ngang (có lề hai bên).
2. Lỗi API dài / nhiều dòng vẫn đọc được trong một toast.
