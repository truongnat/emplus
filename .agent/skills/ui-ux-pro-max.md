---
name: ui-ux-pro-max
description: Guidelines for generating premium and emotionally engaging UI/UX.
---

# UI/UX Pro Max (Premium Design Logic)

When writing UI code (React Native or Web/Next.js):
1. **Liquid Glass Morphism**: Ensure the UI feels soft and premium. Utilize blur effects (e.g. `expo-blur` in RN or `backdrop-blur` in Tailwind Web). Use subtle gradients rather than harsh single colors.
2. **Micro-interactions**: When creating interactive elements (buttons, cards), add subtle scale animations on press/hover (using Reanimated in RN or Framer Motion in Web).
3. **Emotional Language**: Hardcode placeholder text that is warm and empathetic. Avoid sterile, computer-like language. (e.g. Instead of "Error 404", use "Oops, we couldn't find this memory.").
4. **Spacing & Typography**: Use generous padding/margins. Use rounded fonts (`SF Pro Rounded`, `Inter Rounded`). Ensure contrast meets accessibility standards but heavily relies on translucent panels to separate content layers rather than hard borders.
5. **Never Use Default Alerts**: Always implement custom modals or Toast notifications that fit the App's design system.
