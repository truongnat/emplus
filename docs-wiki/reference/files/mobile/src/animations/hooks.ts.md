---
title: "mobile/src/animations/hooks.ts"
description: "Hooks for animation-related functionality."
layout: "doc"
outline: "deep"
editLink: false
lastUpdated: false
pageClass: "docs-wiki docs-wiki--file"
docsWiki:
  schemaVersion: "1.0.0"
  kind: "file"
  project: "emplus"
  template: "detailed"
  themePreset: "clean"
  generatedAt: "2026-04-10T00:09:32.387Z"
  page: "reference/files/mobile/src/animations/hooks.ts.md"
  relativePath: "mobile/src/animations/hooks.ts"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/mobile/src/animations/hooks.ts"
  module: "mobile/src/animations"
  workspace: "mobile"
  language: "TypeScript"
  symbolCount: 8
---

# mobile/src/animations/hooks.ts

- Overview: [emplus Docs Wiki](../../../../../index.md)
- Summary: [SUMMARY](../../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../../features/index.md)
- Module: [mobile/src/animations](../../../../modules/mobile/src/animations.md)
- Workspace: [@emplus/mobile](../../../../../workspaces/mobile.md)

## Snapshot

- Language: TypeScript
- Source path: `/Users/truongdq/tx/GitHub/emplus/mobile/src/animations/hooks.ts`
- Lines: 173
- Symbols: 8

## Related Features

- [Notifications Notify](../../../../../features/notification-notify.md) - Notifications Notify captures the notify workflow inside notifications. It spans 2 workspaces.
- [Search Notify](../../../../../features/search-notify.md) - Search Notify captures the notify workflow inside search. It spans 2 workspaces.
- [User Management Notify](../../../../../features/user-notify.md) - User Management Notify captures the notify workflow inside user management. It spans 2 workspaces.

## AI Summary

Hooks for animation-related functionality.

### Responsibilities

- Imports and usage of animation-related functions.

### Usage Notes

- These hooks are used to simplify the process of managing state for fade-in/fade-out animations, reducing boilerplate code.

## Public API

- `function useReducedMotion(): boolean` — useReducedMotion function: Enables or disables reduced motion for animations
- `function useReducedMotionShared()` — useReducedMotionShared function: Creates and syncs a shared state variable for animations.
- `function withSpringRM( toValue: number, config?: WithSpringConfig, callback?: (finished?: boolean) => void, )` — withSpringRM function: Wraps an animation with Spring Animation using Reduced Motion method.
- `function withTimingRM( toValue: number, config?: WithTimingConfig, callback?: (finished?: boolean) => void, )` — withTimingRM function: Wraps an animation with Timing Animation including Reduced Motion using different delay options.
- `function withDelayRM(delay: number, animation: any)` — withDelayRM function: Wraps an animation with Delay Animation including Reduced Motion.

## Symbols

### function `useReducedMotion`

- Signature: `function useReducedMotion(): boolean`
- Lines: 48-64
- Exported: yes
- Summary: useReducedMotion function: Enables or disables reduced motion for animations

```ts
function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState<boolean>(_cached ?? false);

  useEffect(() => {
    // Sync với cached value nếu đã load trước khi component mount
    if (_cached !== null && _cached !== reduced) {
      setReduced(_cached);
    }

    _listeners.add(setReduced);
    return () => {
      _listeners.delete(setReduced);
    };
  }, []);

  return reduced;
}
```

### function `useReducedMotionShared`

- Signature: `function useReducedMotionShared()`
- Lines: 70-89
- Exported: yes
- Summary: useReducedMotionShared function: Creates and syncs a shared state variable for animations.

```ts
function useReducedMotionShared() {
  // Tạo shared value một lần, sync khi setting thay đổi
  const sv = useSharedValue<boolean>(_cached ?? false);

  useEffect(() => {
    _sharedReducedMotion = sv;

    const sync = (v: boolean) => {
      sv.value = v;
    };
    if (_cached !== null) sv.value = _cached;
    _listeners.add(sync);
    return () => {
      _listeners.delete(sync);
      if (_sharedReducedMotion === sv) _sharedReducedMotion = null;
    };
  }, [sv]);

  return sv;
}
```

### function `withSpringRM`

- Signature: `function withSpringRM( toValue: number, config?: WithSpringConfig, callback?: (finished?: boolean) => void, )`
- Lines: 97-107
- Exported: yes
- Summary: withSpringRM function: Wraps an animation with Spring Animation using Reduced Motion method.

```ts
function withSpringRM(
  toValue: number,
  config?: WithSpringConfig,
  callback?: (finished?: boolean) => void,
) {
  "worklet";
  if (_sharedReducedMotion?.value) {
    return withTiming(toValue, { duration: 0 }, callback);
  }
  return withSpring(toValue, config, callback);
}
```

### function `withTimingRM`

- Signature: `function withTimingRM( toValue: number, config?: WithTimingConfig, callback?: (finished?: boolean) => void, )`
- Lines: 113-123
- Exported: yes
- Summary: withTimingRM function: Wraps an animation with Timing Animation including Reduced Motion using different delay options.

```ts
function withTimingRM(
  toValue: number,
  config?: WithTimingConfig,
  callback?: (finished?: boolean) => void,
) {
  "worklet";
  if (_sharedReducedMotion?.value) {
    return withTiming(toValue, { ...config, duration: 0 }, callback);
  }
  return withTiming(toValue, config, callback);
}
```

### function `withDelayRM`

- Signature: `function withDelayRM(delay: number, animation: any)`
- Lines: 129-135
- Exported: yes
- Summary: withDelayRM function: Wraps an animation with Delay Animation including Reduced Motion.

```ts
function withDelayRM(delay: number, animation: any) {
  "worklet";
  if (_sharedReducedMotion?.value) {
    return withDelay(0, animation);
  }
  return withDelay(delay, animation);
}
```

### function `_notify`

- Signature: `function _notify(v: boolean)`
- Lines: 32-35
- Exported: no
- Summary: _notify function: Notify an animation event.

```ts
function _notify(v: boolean) {
  _cached = v;
  _listeners.forEach((fn) => fn(v));
}
```

### function `instantEnter`

- Signature: `function instantEnter()`
- Lines: 139-141
- Exported: no
- Summary: instantEnter function: Instant exit fade-in/fade-out for animations.

```ts
function instantEnter() {
  return FadeIn.duration(0);
}
```

### function `instantExit`

- Signature: `function instantExit()`
- Lines: 142-144
- Exported: no
- Summary: instantExit function: Instant enter fade-out for animations.

```ts
function instantExit() {
  return FadeOut.duration(0);
}
```
