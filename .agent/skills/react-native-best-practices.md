---
name: react-native-best-practices
description: Best practices for React Native and Expo development.
---

# React Native & Expo Best Practices

When working on this project involving React Native and Expo:
1. **Functional Components**: ALWAYS use modern React Functional Components and Hooks. Never use Class components.
2. **Routing**: Use `expo-router` for all navigation. Organize screens in the `app/` directory as per Expo Router conventions.
3. **Styling & Animations**: Use `StyleSheet` or Tailwind (via Nativewind) for styling. For animations, absolutely ALWAYS use `react-native-reanimated` instead of the built-in `Animated` API. This is critical for achieving the Liquid Glass Morphism effects smoothly.
4. **Performance**: Wrap computationally heavy hooks in `useMemo` and functions passed to children in `useCallback`.
5. **Types**: Use TypeScript for everything. Define interfaces for props and state.
6. **No Any**: Avoid using `any`. Use `unknown` if the type is truly not known yet.
