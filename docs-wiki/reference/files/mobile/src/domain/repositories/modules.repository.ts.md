---
title: "mobile/src/domain/repositories/modules.repository.ts"
description: "'TimelineRepository' interface provides methods for managing timeline-related data."
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
  page: "reference/files/mobile/src/domain/repositories/modules.repository.ts.md"
  relativePath: "mobile/src/domain/repositories/modules.repository.ts"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/mobile/src/domain/repositories/modules.repository.ts"
  module: "mobile/src/domain/repositories"
  workspace: "mobile"
  language: "TypeScript"
  symbolCount: 6
---

# mobile/src/domain/repositories/modules.repository.ts

- Overview: [emplus Docs Wiki](../../../../../../index.md)
- Summary: [SUMMARY](../../../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../../../features/index.md)
- Module: [mobile/src/domain/repositories](../../../../../modules/mobile/src/domain/repositories.md)
- Workspace: [@emplus/mobile](../../../../../../workspaces/mobile.md)

## Snapshot

- Language: TypeScript
- Source path: `/Users/truongdq/tx/GitHub/emplus/mobile/src/domain/repositories/modules.repository.ts`
- Lines: 59
- Symbols: 6

## Related Features

- [Authentication Read / List](../../../../../../features/auth-list.md) - Authentication Read / List captures the read / list workflow inside authentication. It spans 3 workspaces.
- [Integrations Read / List](../../../../../../features/integration-list.md) - Integrations Read / List captures the read / list workflow inside integrations. It spans 3 workspaces.
- [Reporting Read / List](../../../../../../features/reporting-list.md) - Reporting Read / List captures the read / list workflow inside reporting. It spans 2 workspaces.

## AI Summary

'TimelineRepository' interface provides methods for managing timeline-related data.

### Responsibilities

- getMemories
- createMemory
- getMemory
- deleteMemory

### Usage Notes

- getMemories
- createMemory
- deleteMemory

## Public API

- `interface TimelineRepository`
- `interface PairingStatusResponse`
- `interface CoupleRepository`
- `interface DashboardRepository`
- `interface CareRepository`
- `interface BudgetRepository`

## Symbols

### interface `TimelineRepository`

- Signature: `interface TimelineRepository`
- Lines: 10-19
- Exported: yes

```ts
interface TimelineRepository {
  getMemories(
    params: TimelineModule.ListQueryParams,
  ): Promise<TimelineModule.ListResponse>;
  createMemory(
    params: TimelineModule.CreateRequest,
  ): Promise<TimelineModule.CreateResponse>;
  getMemory(id: string): Promise<Memory>;
  deleteMemory(id: string): Promise<TimelineModule.DeleteResponse>;
}
```

### interface `PairingStatusResponse`

- Signature: `interface PairingStatusResponse`
- Lines: 21-25
- Exported: yes

```ts
interface PairingStatusResponse {
  paired: boolean;
  coupleId?: string;
  partner?: { id: string; fullName: string; gender: string };
}
```

### interface `CoupleRepository`

- Signature: `interface CoupleRepository`
- Lines: 27-33
- Exported: yes

```ts
interface CoupleRepository {
  generateInvite(): Promise<CoupleModule.GenerateInviteResponse>;
  joinCouple(
    params: CoupleModule.JoinRequest,
  ): Promise<CoupleModule.JoinResponse>;
  checkPairingStatus(): Promise<PairingStatusResponse>;
}
```

### interface `DashboardRepository`

- Signature: `interface DashboardRepository`
- Lines: 35-37
- Exported: yes

```ts
interface DashboardRepository {
  getHomeData(): Promise<DashboardModule.HomeResponse>;
}
```

### interface `CareRepository`

- Signature: `interface CareRepository`
- Lines: 39-48
- Exported: yes

```ts
interface CareRepository {
  saveFemaleCycle(
    params: CareModule.FemaleCycleRequest,
  ): Promise<CareModule.FemaleCycleResponse>;
  getMaleSuggestions(): Promise<CareModule.MaleSuggestionsResponse>;
  getCoupleMood(): Promise<CareModule.CoupleMoodResponse>;
  putCoupleMood(
    params: CareModule.SaveMoodRequest,
  ): Promise<CareModule.SaveMoodResponse>;
}
```

### interface `BudgetRepository`

- Signature: `interface BudgetRepository`
- Lines: 50-58
- Exported: yes

```ts
interface BudgetRepository {
  getSummary(): Promise<BudgetModule.SummaryResponse>;
  getExpenses(
    params: BudgetModule.ListQueryParams,
  ): Promise<BudgetModule.ListResponse>;
  createExpense(
    params: BudgetModule.CreateRequest,
  ): Promise<BudgetModule.CreateResponse>;
}
```
