# ticket-52 — Notes

- Nguyên nhân cuộn: `ScrollView` + `MoodVibeCheck` blob cố định ~280px + card dài + `scrollPadBottom` lớn.
- Fix (đã thử): `View` `flex:1` + `compact` mood + care styles gọn.
- **Rollback 2026-04-04**: giữ lại chỉ phần **chrome màu/lưới phía trên** (`LoginGridAnimatedBackground`, `StatusBar`, `useAuthGridChrome`, `appShell`); khôi phục `ScrollView`, spacing cũ, `MoodVibeCheck` full, `MoodOrb` 128px.
