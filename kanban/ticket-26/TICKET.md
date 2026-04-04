# ticket-26 — Home: semantic heading & text hierarchy

## Summary

Align Home screen typography and accessibility with one logical **H1** (greeting), **H2** section titles, and **non-heading** overlines/supporting copy.

## Spec

- **H1**: Primary page title = greeting in `HomeHeader` (`accessibilityRole="header"`).
- **H2**: Section titles — Quick actions, Upcoming events, Focus card headline (same `header` role; order on screen implies hierarchy; RN `Text` typings here omit `accessibilityLevel`).
- **Not headings**: Eyebrows (“Hôm nay”, “Sắp tới”, “Gợi ý”), hero kicker (“Chúng ta đã bắt đầu”), card kickers, hints — caption/body roles only.
- **AppText**: Forward common `AccessibilityProps` to `RNText` so semantic props are not dropped.

## Acceptance

- VoiceOver/TalkBack: navigate by headings shows greeting as top-level, then section titles; hero eyebrow is not announced as a heading.
- Visual hierarchy: H1 uses title-scale token; section titles use titleSm; overlines use caption + uppercase.

## Verify

- `bun run typecheck:mobile`
- Manual: Home tab → rotor/headings order

## Status

- [x] Implemented
