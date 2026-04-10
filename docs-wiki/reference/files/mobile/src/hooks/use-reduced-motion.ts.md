---
title: "mobile/src/hooks/use-reduced-motion.ts"
description: "Uses the AccessibilityInfo API to enable or disable reduced motion animations."
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
  page: "reference/files/mobile/src/hooks/use-reduced-motion.ts.md"
  relativePath: "mobile/src/hooks/use-reduced-motion.ts"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/mobile/src/hooks/use-reduced-motion.ts"
  module: "mobile/src/hooks"
  workspace: "mobile"
  language: "TypeScript"
  symbolCount: 1
---

# mobile/src/hooks/use-reduced-motion.ts

- Overview: [emplus Docs Wiki](../../../../../index.md)
- Summary: [SUMMARY](../../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../../features/index.md)
- Module: [mobile/src/hooks](../../../../modules/mobile/src/hooks.md)
- Workspace: [@emplus/mobile](../../../../../workspaces/mobile.md)

## Snapshot

- Language: TypeScript
- Source path: `/Users/truongdq/tx/GitHub/emplus/mobile/src/hooks/use-reduced-motion.ts`
- Lines: 26
- Symbols: 1

## Related Features

- [Mobile](../../../../../features/mobile.md) - Mobile captures the main mobile behavior discovered in the codebase. Key flows include Mobile operations flow, Mobile operations flow.

## AI Summary

Uses the AccessibilityInfo API to enable or disable reduced motion animations.

### Responsibilities

- returns a boolean value indicating whether reduced motion is enabled

### Usage Notes

- [Function] is used to set initial state and attach an event listener to indicate when reduced motion is changed

## Public API

- `function useReducedMotion(): boolean`

## Symbols

### function `useReducedMotion`

- Signature: `function useReducedMotion(): boolean`
- Lines: 7-25
- Exported: yes

```ts
function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    let mounted = true;
    AccessibilityInfo.isReduceMotionEnabled().then((v) => {
      if (mounted) setReduced(v);
    });
    const sub = AccessibilityInfo.addEventListener("reduceMotionChanged", (v) => {
      setReduced(v);
    });
    return () => {
      mounted = false;
      sub.remove();
    };
  }, []);

  return reduced;
}
```
