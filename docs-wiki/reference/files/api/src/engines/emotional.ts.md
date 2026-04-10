---
title: "api/src/engines/emotional.ts"
description: "Defines and uses emotional phases and context for various interactions."
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
  page: "reference/files/api/src/engines/emotional.ts.md"
  relativePath: "api/src/engines/emotional.ts"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/api/src/engines/emotional.ts"
  module: "api/src/engines"
  workspace: "api"
  language: "TypeScript"
  symbolCount: 6
---

# api/src/engines/emotional.ts

- Overview: [emplus Docs Wiki](../../../../../index.md)
- Summary: [SUMMARY](../../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../../features/index.md)
- Module: [api/src/engines](../../../../modules/api/src/engines.md)
- Workspace: [@emplus/api](../../../../../workspaces/api.md)

## Snapshot

- Language: TypeScript
- Source path: `/Users/truongdq/tx/GitHub/emplus/api/src/engines/emotional.ts`
- Lines: 129
- Symbols: 6

## Related Features

- [Authentication Read / List](../../../../../features/auth-list.md) - Authentication Read / List captures the read / list workflow inside authentication. It spans 3 workspaces.
- [Search Read / List](../../../../../features/search-list.md) - Search Read / List captures the read / list workflow inside search. It spans 3 workspaces.
- [Notifications Read / List](../../../../../features/notification-list.md) - Notifications Read / List captures the read / list workflow inside notifications. It spans 2 workspaces.
- [Storage Read / List](../../../../../features/storage-list.md) - Storage Read / List captures the read / list workflow inside storage. It spans 4 workspaces.
- [Integrations Read / List](../../../../../features/integration-list.md) - Integrations Read / List captures the read / list workflow inside integrations. It spans 3 workspaces.
- [User Management Read / List](../../../../../features/user-list.md) - User Management Read / List captures the read / list workflow inside user management. It spans 3 workspaces.
- [Reporting Read / List](../../../../../features/reporting-list.md) - Reporting Read / List captures the read / list workflow inside reporting. It spans 2 workspaces.
- [Administration Read / List](../../../../../features/admin-list.md) - Administration Read / List captures the read / list workflow inside administration. It spans 2 workspaces.
- [Order Management Read / List](../../../../../features/order-list.md) - Order Management Read / List captures the read / list workflow inside order management. It spans 2 workspaces.

## AI Summary

Defines and uses emotional phases and context for various interactions.

### Responsibilities

- to provide emotional support

### Usage Notes

- Example usage of the hienThiNguCanhCamXuc function can be found in the provided code snippets.

## Public API

- `type EmotionalPhase = "MENSTRUATION" | "FOLLICULAR" | "OVULATION" | "LUTEAL_PMS";`
- `type NguCanhCamXucHienThi = | "KY_KINH" | "GIAI_DOAN_NANG_LUONG" | "RUNG_TRUNG" | "CUOI_CHU_KY_NHAY_CAM";`
- `function hienThiNguCanhCamXuc(phase: EmotionalPhase): NguCanhCamXucHienThi`
- `function getEmotionalPhase(cycle: EmotionalCycle, today: Date): EmotionalPhase`
- `function buildMaleSuggestions(partnerName: string, phase: EmotionalPhase): { emotionalStatusContext: NguCanhCamXucHienThi; suggestions: MaleSuggestion[]; badge: string; }`

## Symbols

### type `EmotionalPhase`

- Signature: `type EmotionalPhase = "MENSTRUATION" | "FOLLICULAR" | "OVULATION" | "LUTEAL_PMS";`
- Lines: 4-4
- Exported: yes

```ts
type EmotionalPhase = "MENSTRUATION" | "FOLLICULAR" | "OVULATION" | "LUTEAL_PMS";
```

### type `NguCanhCamXucHienThi`

- Signature: `type NguCanhCamXucHienThi = | "KY_KINH" | "GIAI_DOAN_NANG_LUONG" | "RUNG_TRUNG" | "CUOI_CHU_KY_NHAY_CAM";`
- Lines: 5-9
- Exported: yes

```ts
type NguCanhCamXucHienThi =
  | "KY_KINH"
  | "GIAI_DOAN_NANG_LUONG"
  | "RUNG_TRUNG"
  | "CUOI_CHU_KY_NHAY_CAM";
```

### function `hienThiNguCanhCamXuc`

- Signature: `function hienThiNguCanhCamXuc(phase: EmotionalPhase): NguCanhCamXucHienThi`
- Lines: 73-87
- Exported: yes

```ts
function hienThiNguCanhCamXuc(phase: EmotionalPhase): NguCanhCamXucHienThi {
  if (phase === "MENSTRUATION") {
    return "KY_KINH";
  }

  if (phase === "FOLLICULAR") {
    return "GIAI_DOAN_NANG_LUONG";
  }

  if (phase === "OVULATION") {
    return "RUNG_TRUNG";
  }

  return "CUOI_CHU_KY_NHAY_CAM";
}
```

### function `getEmotionalPhase`

- Signature: `function getEmotionalPhase(cycle: EmotionalCycle, today: Date): EmotionalPhase`
- Lines: 89-108
- Exported: yes

```ts
function getEmotionalPhase(cycle: EmotionalCycle, today: Date): EmotionalPhase {
  const cycleStart = parseDate(cycle.startDate);
  const daysSinceStart = diffDays(cycleStart, today);
  const normalized = ((daysSinceStart % cycle.cycleDuration) + cycle.cycleDuration) % cycle.cycleDuration;
  const dayInCycle = normalized + 1;

  if (dayInCycle <= cycle.periodDuration) {
    return "MENSTRUATION";
  }

  if (dayInCycle <= 13) {
    return "FOLLICULAR";
  }

  if (dayInCycle <= 16) {
    return "OVULATION";
  }

  return "LUTEAL_PMS";
}
```

### function `buildMaleSuggestions`

- Signature: `function buildMaleSuggestions(partnerName: string, phase: EmotionalPhase): { emotionalStatusContext: NguCanhCamXucHienThi; suggestions: MaleSuggestion[]; badge: string; }`
- Lines: 110-128
- Exported: yes

```ts
function buildMaleSuggestions(partnerName: string, phase: EmotionalPhase): {
  emotionalStatusContext: NguCanhCamXucHienThi;
  suggestions: MaleSuggestion[];
  badge: string;
} {
  const context = PHASE_MAP[phase];

  const suggestions = context.suggestions.map((template, index) => ({
    priority: index + 1,
    text: template.replaceAll("{name}", partnerName),
    callToAction: context.action,
  }));

  return {
    emotionalStatusContext: hienThiNguCanhCamXuc(context.phase),
    suggestions,
    badge: context.badge,
  };
}
```

### interface `EmotionalContext`

- Signature: `interface EmotionalContext`
- Lines: 11-16
- Exported: no

```ts
interface EmotionalContext {
  phase: EmotionalPhase;
  badge: string;
  suggestions: string[];
  action: MaleSuggestion["callToAction"];
}
```
