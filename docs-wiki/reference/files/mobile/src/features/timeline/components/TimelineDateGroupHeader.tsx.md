---
title: "mobile/src/features/timeline/components/TimelineDateGroupHeader.tsx"
description: "Provides 2 documented symbols in mobile/src/features/timeline/components/TimelineDateGroupHeader.tsx."
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
  page: "reference/files/mobile/src/features/timeline/components/TimelineDateGroupHeader.tsx.md"
  relativePath: "mobile/src/features/timeline/components/TimelineDateGroupHeader.tsx"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/mobile/src/features/timeline/components/TimelineDateGroupHeader.tsx"
  module: "mobile/src/features/timeline/components"
  workspace: "mobile"
  language: "TypeScript"
  symbolCount: 2
---

# mobile/src/features/timeline/components/TimelineDateGroupHeader.tsx

- Overview: [emplus Docs Wiki](../../../../../../../index.md)
- Summary: [SUMMARY](../../../../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../../../../features/index.md)
- Module: [mobile/src/features/timeline/components](../../../../../../modules/mobile/src/features/timeline/components.md)
- Workspace: [@emplus/mobile](../../../../../../../workspaces/mobile.md)

## Snapshot

- Language: TypeScript
- Source path: `/Users/truongdq/tx/GitHub/emplus/mobile/src/features/timeline/components/TimelineDateGroupHeader.tsx`
- Lines: 165
- Symbols: 2

## Related Features

- [Authentication Read / List](../../../../../../../features/auth-list.md) - Authentication Read / List captures the read / list workflow inside authentication. It spans 3 workspaces.
- [Search Read / List](../../../../../../../features/search-list.md) - Search Read / List captures the read / list workflow inside search. It spans 3 workspaces.
- [Notifications Read / List](../../../../../../../features/notification-list.md) - Notifications Read / List captures the read / list workflow inside notifications. It spans 2 workspaces.
- [Order Management Read / List](../../../../../../../features/order-list.md) - Order Management Read / List captures the read / list workflow inside order management. It spans 2 workspaces.

## AI Summary

Provides 2 documented symbols in mobile/src/features/timeline/components/TimelineDateGroupHeader.tsx.

## Public API

- `interface TimelineDateGroupHeaderProps`

## Symbols

### interface `TimelineDateGroupHeaderProps`

- Signature: `interface TimelineDateGroupHeaderProps`
- Lines: 8-10
- Exported: yes

```tsx
interface TimelineDateGroupHeaderProps {
  dateString: string;
}
```

### function `PulsingRing`

- Signature: `function PulsingRing({ brandColor }: { brandColor: string })`
- Lines: 12-49
- Exported: no

```tsx
function PulsingRing({ brandColor }: { brandColor: string }) {
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.5,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
      ]),
    );
    pulse.start();
    return () => pulse.stop();
  }, [pulseAnim]);

  return (
    <Animated.View
      style={[
        styles.pulseRing,
        { backgroundColor: brandColor },
        {
          transform: [{ scale: pulseAnim }],
          opacity: pulseAnim.interpolate({
            inputRange: [1, 1.5],
            outputRange: [0.2, 0],
          }),
        },
      ]}
    />
  );
}
```
