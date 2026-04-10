---
title: "mobile/src/domain/usecases/modules/index.ts"
description: "Provides 54 documented symbols in mobile/src/domain/usecases/modules/index.ts."
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
  page: "reference/files/mobile/src/domain/usecases/modules/index.ts.md"
  relativePath: "mobile/src/domain/usecases/modules/index.ts"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/mobile/src/domain/usecases/modules/index.ts"
  module: "mobile/src/domain/usecases/modules"
  workspace: "mobile"
  language: "TypeScript"
  symbolCount: 54
---

# mobile/src/domain/usecases/modules/index.ts

- Overview: [emplus Docs Wiki](../../../../../../../index.md)
- Summary: [SUMMARY](../../../../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../../../../features/index.md)
- Module: [mobile/src/domain/usecases/modules](../../../../../../modules/mobile/src/domain/usecases/modules.md)
- Workspace: [@emplus/mobile](../../../../../../../workspaces/mobile.md)

## Snapshot

- Language: TypeScript
- Source path: `/Users/truongdq/tx/GitHub/emplus/mobile/src/domain/usecases/modules/index.ts`
- Lines: 238
- Symbols: 54

## Related Features

- [Authentication Read / List](../../../../../../../features/auth-list.md) - Authentication Read / List captures the read / list workflow inside authentication. It spans 3 workspaces.
- [Search Read / List](../../../../../../../features/search-list.md) - Search Read / List captures the read / list workflow inside search. It spans 3 workspaces.
- [Notifications Read / List](../../../../../../../features/notification-list.md) - Notifications Read / List captures the read / list workflow inside notifications. It spans 2 workspaces.
- [Storage Read / List](../../../../../../../features/storage-list.md) - Storage Read / List captures the read / list workflow inside storage. It spans 4 workspaces.
- [Integrations Read / List](../../../../../../../features/integration-list.md) - Integrations Read / List captures the read / list workflow inside integrations. It spans 3 workspaces.
- [User Management Read / List](../../../../../../../features/user-list.md) - User Management Read / List captures the read / list workflow inside user management. It spans 3 workspaces.
- [Reporting Read / List](../../../../../../../features/reporting-list.md) - Reporting Read / List captures the read / list workflow inside reporting. It spans 2 workspaces.
- [Administration Read / List](../../../../../../../features/admin-list.md) - Administration Read / List captures the read / list workflow inside administration. It spans 2 workspaces.
- [Authentication Verification](../../../../../../../features/auth-verify.md) - Authentication Verification captures the verification workflow inside authentication. It spans 2 workspaces. Key flows include Credential validation, Auth login, Auth login.
- [Search Create](../../../../../../../features/search-create.md) - Search Create captures the create workflow inside search. It spans 2 workspaces.
- [User Management Create](../../../../../../../features/user-create.md) - User Management Create captures the create workflow inside user management. It spans 2 workspaces.
- [Notifications Verification](../../../../../../../features/notification-verify.md) - Notifications Verification captures the verification workflow inside notifications. It spans 2 workspaces. Key flows include Credential validation, Auth login, Auth login.
- [Storage Verification](../../../../../../../features/storage-verify.md) - Storage Verification captures the verification workflow inside storage. It spans 2 workspaces. Key flows include Credential validation, Auth login, Auth login.
- [Administration Verification](../../../../../../../features/admin-verify.md) - Administration Verification captures the verification workflow inside administration. It spans 2 workspaces. Key flows include Credential validation, Auth login, Auth login.
- [Integrations Verification](../../../../../../../features/integration-verify.md) - Integrations Verification captures the verification workflow inside integrations. It spans 2 workspaces. Key flows include Credential validation, Auth login, Auth login.
- [Reporting Verification](../../../../../../../features/reporting-verify.md) - Reporting Verification captures the verification workflow inside reporting. It spans 2 workspaces. Key flows include Credential validation, Auth login, Auth login.

## AI Summary

Provides 54 documented symbols in mobile/src/domain/usecases/modules/index.ts.

## Public API

- `class GetMemoriesUseCase extends UseCase< TimelineModule.ListQueryParams, TimelineModule.ListResponse >`
- `constructor(private repo: TimelineRepository)`
- `execute(params: TimelineModule.ListQueryParams)`
- `class CreateMemoryUseCase extends UseCase< TimelineModule.CreateRequest, TimelineModule.CreateResponse >`
- `constructor(private repo: TimelineRepository)`
- `execute(params: TimelineModule.CreateRequest)`
- `class GetMemoryDetailUseCase extends UseCase<string, Memory>`
- `constructor(private repo: TimelineRepository)`
- `execute(id: string)`
- `class DeleteMemoryUseCase extends UseCase< string, TimelineModule.DeleteResponse >`
- `constructor(private repo: TimelineRepository)`
- `execute(id: string)`
- `class GenerateInviteUseCase extends UseCase< void, CoupleModule.GenerateInviteResponse >`
- `constructor(private repo: CoupleRepository)`
- `execute()`
- `class JoinCoupleUseCase extends UseCase< CoupleModule.JoinRequest, CoupleModule.JoinResponse >`
- `constructor(private repo: CoupleRepository)`
- `execute(params: CoupleModule.JoinRequest)`
- `class CheckPairingStatusUseCase extends UseCase< void, PairingStatusResponse >`
- `constructor(private repo: CoupleRepository)`
- `execute()`
- `class GetDashboardUseCase extends UseCase< void, DashboardModule.HomeResponse >`
- `constructor(private repo: DashboardRepository)`
- `execute()`
- `class SaveFemaleCycleUseCase extends UseCase< CareModule.FemaleCycleRequest, CareModule.FemaleCycleResponse >`
- `constructor(private repo: CareRepository)`
- `execute(params: CareModule.FemaleCycleRequest)`
- `class GetMaleSuggestionsUseCase extends UseCase< void, CareModule.MaleSuggestionsResponse >`
- `constructor(private repo: CareRepository)`
- `execute()`
- `class GetCoupleMoodUseCase extends UseCase< void, CareModule.CoupleMoodResponse >`
- `constructor(private repo: CareRepository)`
- `execute()`
- `class PutCoupleMoodUseCase extends UseCase< CareModule.SaveMoodRequest, CareModule.SaveMoodResponse >`
- `constructor(private repo: CareRepository)`
- `execute(params: CareModule.SaveMoodRequest)`
- `class GetBudgetSummaryUseCase extends UseCase< void, BudgetModule.SummaryResponse >`
- `constructor(private repo: BudgetRepository)`
- `execute()`
- `class GetExpensesUseCase extends UseCase< BudgetModule.ListQueryParams, BudgetModule.ListResponse >`
- `constructor(private repo: BudgetRepository)`
- `execute(params: BudgetModule.ListQueryParams)`
- `class CreateExpenseUseCase extends UseCase< BudgetModule.CreateRequest, BudgetModule.CreateResponse >`
- `constructor(private repo: BudgetRepository)`
- `execute(params: BudgetModule.CreateRequest)`
- `class ListNotificationsUseCase extends UseCase< NotificationModule.ListQueryParams | undefined, NotificationModule.ListResponse >`
- `constructor(private repo: NotificationsRepository)`
- `execute(params?: NotificationModule.ListQueryParams)`
- `class MarkNotificationReadUseCase extends UseCase< string, NotificationModule.MarkReadResponse >`
- `constructor(private repo: NotificationsRepository)`
- `execute(id: string)`
- `class MarkAllNotificationsReadUseCase extends UseCase< void, NotificationModule.MarkAllReadResponse >`
- `constructor(private repo: NotificationsRepository)`
- `execute()`

## Symbols

### class `GetMemoriesUseCase`

- Signature: `class GetMemoriesUseCase extends UseCase< TimelineModule.ListQueryParams, TimelineModule.ListResponse >`
- Lines: 22-32
- Exported: yes

```ts
class GetMemoriesUseCase extends UseCase<
  TimelineModule.ListQueryParams,
  TimelineModule.ListResponse
> {
  constructor(private repo: TimelineRepository) {
    super();
  }
  execute(params: TimelineModule.ListQueryParams) {
    return this.repo.getMemories(params);
  }
}
```

### method `constructor`

- Signature: `constructor(private repo: TimelineRepository)`
- Lines: 26-28
- Exported: yes

```ts
constructor(private repo: TimelineRepository) {
    super();
  }
```

### method `execute`

- Signature: `execute(params: TimelineModule.ListQueryParams)`
- Lines: 29-31
- Exported: yes

```ts
execute(params: TimelineModule.ListQueryParams) {
    return this.repo.getMemories(params);
  }
```

### class `CreateMemoryUseCase`

- Signature: `class CreateMemoryUseCase extends UseCase< TimelineModule.CreateRequest, TimelineModule.CreateResponse >`
- Lines: 34-44
- Exported: yes

```ts
class CreateMemoryUseCase extends UseCase<
  TimelineModule.CreateRequest,
  TimelineModule.CreateResponse
> {
  constructor(private repo: TimelineRepository) {
    super();
  }
  execute(params: TimelineModule.CreateRequest) {
    return this.repo.createMemory(params);
  }
}
```

### method `constructor`

- Signature: `constructor(private repo: TimelineRepository)`
- Lines: 38-40
- Exported: yes

```ts
constructor(private repo: TimelineRepository) {
    super();
  }
```

### method `execute`

- Signature: `execute(params: TimelineModule.CreateRequest)`
- Lines: 41-43
- Exported: yes

```ts
execute(params: TimelineModule.CreateRequest) {
    return this.repo.createMemory(params);
  }
```

### class `GetMemoryDetailUseCase`

- Signature: `class GetMemoryDetailUseCase extends UseCase<string, Memory>`
- Lines: 46-53
- Exported: yes

```ts
class GetMemoryDetailUseCase extends UseCase<string, Memory> {
  constructor(private repo: TimelineRepository) {
    super();
  }
  execute(id: string) {
    return this.repo.getMemory(id);
  }
}
```

### method `constructor`

- Signature: `constructor(private repo: TimelineRepository)`
- Lines: 47-49
- Exported: yes

```ts
constructor(private repo: TimelineRepository) {
    super();
  }
```

### method `execute`

- Signature: `execute(id: string)`
- Lines: 50-52
- Exported: yes

```ts
execute(id: string) {
    return this.repo.getMemory(id);
  }
```

### class `DeleteMemoryUseCase`

- Signature: `class DeleteMemoryUseCase extends UseCase< string, TimelineModule.DeleteResponse >`
- Lines: 55-65
- Exported: yes

```ts
class DeleteMemoryUseCase extends UseCase<
  string,
  TimelineModule.DeleteResponse
> {
  constructor(private repo: TimelineRepository) {
    super();
  }
  execute(id: string) {
    return this.repo.deleteMemory(id);
  }
}
```

### method `constructor`

- Signature: `constructor(private repo: TimelineRepository)`
- Lines: 59-61
- Exported: yes

```ts
constructor(private repo: TimelineRepository) {
    super();
  }
```

### method `execute`

- Signature: `execute(id: string)`
- Lines: 62-64
- Exported: yes

```ts
execute(id: string) {
    return this.repo.deleteMemory(id);
  }
```

### class `GenerateInviteUseCase`

- Signature: `class GenerateInviteUseCase extends UseCase< void, CoupleModule.GenerateInviteResponse >`
- Lines: 68-78
- Exported: yes

```ts
class GenerateInviteUseCase extends UseCase<
  void,
  CoupleModule.GenerateInviteResponse
> {
  constructor(private repo: CoupleRepository) {
    super();
  }
  execute() {
    return this.repo.generateInvite();
  }
}
```

### method `constructor`

- Signature: `constructor(private repo: CoupleRepository)`
- Lines: 72-74
- Exported: yes

```ts
constructor(private repo: CoupleRepository) {
    super();
  }
```

### method `execute`

- Signature: `execute()`
- Lines: 75-77
- Exported: yes

```ts
execute() {
    return this.repo.generateInvite();
  }
```

### class `JoinCoupleUseCase`

- Signature: `class JoinCoupleUseCase extends UseCase< CoupleModule.JoinRequest, CoupleModule.JoinResponse >`
- Lines: 80-90
- Exported: yes

```ts
class JoinCoupleUseCase extends UseCase<
  CoupleModule.JoinRequest,
  CoupleModule.JoinResponse
> {
  constructor(private repo: CoupleRepository) {
    super();
  }
  execute(params: CoupleModule.JoinRequest) {
    return this.repo.joinCouple(params);
  }
}
```

### method `constructor`

- Signature: `constructor(private repo: CoupleRepository)`
- Lines: 84-86
- Exported: yes

```ts
constructor(private repo: CoupleRepository) {
    super();
  }
```

### method `execute`

- Signature: `execute(params: CoupleModule.JoinRequest)`
- Lines: 87-89
- Exported: yes

```ts
execute(params: CoupleModule.JoinRequest) {
    return this.repo.joinCouple(params);
  }
```

### class `CheckPairingStatusUseCase`

- Signature: `class CheckPairingStatusUseCase extends UseCase< void, PairingStatusResponse >`
- Lines: 92-102
- Exported: yes

```ts
class CheckPairingStatusUseCase extends UseCase<
  void,
  PairingStatusResponse
> {
  constructor(private repo: CoupleRepository) {
    super();
  }
  execute() {
    return this.repo.checkPairingStatus();
  }
}
```

### method `constructor`

- Signature: `constructor(private repo: CoupleRepository)`
- Lines: 96-98
- Exported: yes

```ts
constructor(private repo: CoupleRepository) {
    super();
  }
```

### method `execute`

- Signature: `execute()`
- Lines: 99-101
- Exported: yes

```ts
execute() {
    return this.repo.checkPairingStatus();
  }
```

### class `GetDashboardUseCase`

- Signature: `class GetDashboardUseCase extends UseCase< void, DashboardModule.HomeResponse >`
- Lines: 105-115
- Exported: yes

```ts
class GetDashboardUseCase extends UseCase<
  void,
  DashboardModule.HomeResponse
> {
  constructor(private repo: DashboardRepository) {
    super();
  }
  execute() {
    return this.repo.getHomeData();
  }
}
```

### method `constructor`

- Signature: `constructor(private repo: DashboardRepository)`
- Lines: 109-111
- Exported: yes

```ts
constructor(private repo: DashboardRepository) {
    super();
  }
```

### method `execute`

- Signature: `execute()`
- Lines: 112-114
- Exported: yes

```ts
execute() {
    return this.repo.getHomeData();
  }
```

### class `SaveFemaleCycleUseCase`

- Signature: `class SaveFemaleCycleUseCase extends UseCase< CareModule.FemaleCycleRequest, CareModule.FemaleCycleResponse >`
- Lines: 118-128
- Exported: yes

```ts
class SaveFemaleCycleUseCase extends UseCase<
  CareModule.FemaleCycleRequest,
  CareModule.FemaleCycleResponse
> {
  constructor(private repo: CareRepository) {
    super();
  }
  execute(params: CareModule.FemaleCycleRequest) {
    return this.repo.saveFemaleCycle(params);
  }
}
```

### method `constructor`

- Signature: `constructor(private repo: CareRepository)`
- Lines: 122-124
- Exported: yes

```ts
constructor(private repo: CareRepository) {
    super();
  }
```

### method `execute`

- Signature: `execute(params: CareModule.FemaleCycleRequest)`
- Lines: 125-127
- Exported: yes

```ts
execute(params: CareModule.FemaleCycleRequest) {
    return this.repo.saveFemaleCycle(params);
  }
```

### class `GetMaleSuggestionsUseCase`

- Signature: `class GetMaleSuggestionsUseCase extends UseCase< void, CareModule.MaleSuggestionsResponse >`
- Lines: 130-140
- Exported: yes

```ts
class GetMaleSuggestionsUseCase extends UseCase<
  void,
  CareModule.MaleSuggestionsResponse
> {
  constructor(private repo: CareRepository) {
    super();
  }
  execute() {
    return this.repo.getMaleSuggestions();
  }
}
```

### method `constructor`

- Signature: `constructor(private repo: CareRepository)`
- Lines: 134-136
- Exported: yes

```ts
constructor(private repo: CareRepository) {
    super();
  }
```

### method `execute`

- Signature: `execute()`
- Lines: 137-139
- Exported: yes

```ts
execute() {
    return this.repo.getMaleSuggestions();
  }
```

### class `GetCoupleMoodUseCase`

- Signature: `class GetCoupleMoodUseCase extends UseCase< void, CareModule.CoupleMoodResponse >`
- Lines: 142-152
- Exported: yes

```ts
class GetCoupleMoodUseCase extends UseCase<
  void,
  CareModule.CoupleMoodResponse
> {
  constructor(private repo: CareRepository) {
    super();
  }
  execute() {
    return this.repo.getCoupleMood();
  }
}
```

### method `constructor`

- Signature: `constructor(private repo: CareRepository)`
- Lines: 146-148
- Exported: yes

```ts
constructor(private repo: CareRepository) {
    super();
  }
```

### method `execute`

- Signature: `execute()`
- Lines: 149-151
- Exported: yes

```ts
execute() {
    return this.repo.getCoupleMood();
  }
```

### class `PutCoupleMoodUseCase`

- Signature: `class PutCoupleMoodUseCase extends UseCase< CareModule.SaveMoodRequest, CareModule.SaveMoodResponse >`
- Lines: 154-164
- Exported: yes

```ts
class PutCoupleMoodUseCase extends UseCase<
  CareModule.SaveMoodRequest,
  CareModule.SaveMoodResponse
> {
  constructor(private repo: CareRepository) {
    super();
  }
  execute(params: CareModule.SaveMoodRequest) {
    return this.repo.putCoupleMood(params);
  }
}
```

### method `constructor`

- Signature: `constructor(private repo: CareRepository)`
- Lines: 158-160
- Exported: yes

```ts
constructor(private repo: CareRepository) {
    super();
  }
```

### method `execute`

- Signature: `execute(params: CareModule.SaveMoodRequest)`
- Lines: 161-163
- Exported: yes

```ts
execute(params: CareModule.SaveMoodRequest) {
    return this.repo.putCoupleMood(params);
  }
```

### class `GetBudgetSummaryUseCase`

- Signature: `class GetBudgetSummaryUseCase extends UseCase< void, BudgetModule.SummaryResponse >`
- Lines: 167-177
- Exported: yes

```ts
class GetBudgetSummaryUseCase extends UseCase<
  void,
  BudgetModule.SummaryResponse
> {
  constructor(private repo: BudgetRepository) {
    super();
  }
  execute() {
    return this.repo.getSummary();
  }
}
```

### method `constructor`

- Signature: `constructor(private repo: BudgetRepository)`
- Lines: 171-173
- Exported: yes

```ts
constructor(private repo: BudgetRepository) {
    super();
  }
```

### method `execute`

- Signature: `execute()`
- Lines: 174-176
- Exported: yes

```ts
execute() {
    return this.repo.getSummary();
  }
```

### class `GetExpensesUseCase`

- Signature: `class GetExpensesUseCase extends UseCase< BudgetModule.ListQueryParams, BudgetModule.ListResponse >`
- Lines: 179-189
- Exported: yes

```ts
class GetExpensesUseCase extends UseCase<
  BudgetModule.ListQueryParams,
  BudgetModule.ListResponse
> {
  constructor(private repo: BudgetRepository) {
    super();
  }
  execute(params: BudgetModule.ListQueryParams) {
    return this.repo.getExpenses(params);
  }
}
```

### method `constructor`

- Signature: `constructor(private repo: BudgetRepository)`
- Lines: 183-185
- Exported: yes

```ts
constructor(private repo: BudgetRepository) {
    super();
  }
```

### method `execute`

- Signature: `execute(params: BudgetModule.ListQueryParams)`
- Lines: 186-188
- Exported: yes

```ts
execute(params: BudgetModule.ListQueryParams) {
    return this.repo.getExpenses(params);
  }
```

### class `CreateExpenseUseCase`

- Signature: `class CreateExpenseUseCase extends UseCase< BudgetModule.CreateRequest, BudgetModule.CreateResponse >`
- Lines: 191-201
- Exported: yes

```ts
class CreateExpenseUseCase extends UseCase<
  BudgetModule.CreateRequest,
  BudgetModule.CreateResponse
> {
  constructor(private repo: BudgetRepository) {
    super();
  }
  execute(params: BudgetModule.CreateRequest) {
    return this.repo.createExpense(params);
  }
}
```

### method `constructor`

- Signature: `constructor(private repo: BudgetRepository)`
- Lines: 195-197
- Exported: yes

```ts
constructor(private repo: BudgetRepository) {
    super();
  }
```

### method `execute`

- Signature: `execute(params: BudgetModule.CreateRequest)`
- Lines: 198-200
- Exported: yes

```ts
execute(params: BudgetModule.CreateRequest) {
    return this.repo.createExpense(params);
  }
```

### class `ListNotificationsUseCase`

- Signature: `class ListNotificationsUseCase extends UseCase< NotificationModule.ListQueryParams | undefined, NotificationModule.ListResponse >`
- Lines: 203-213
- Exported: yes

```ts
class ListNotificationsUseCase extends UseCase<
  NotificationModule.ListQueryParams | undefined,
  NotificationModule.ListResponse
> {
  constructor(private repo: NotificationsRepository) {
    super();
  }
  execute(params?: NotificationModule.ListQueryParams) {
    return this.repo.list(params ?? {});
  }
}
```

### method `constructor`

- Signature: `constructor(private repo: NotificationsRepository)`
- Lines: 207-209
- Exported: yes

```ts
constructor(private repo: NotificationsRepository) {
    super();
  }
```

### method `execute`

- Signature: `execute(params?: NotificationModule.ListQueryParams)`
- Lines: 210-212
- Exported: yes

```ts
execute(params?: NotificationModule.ListQueryParams) {
    return this.repo.list(params ?? {});
  }
```

### class `MarkNotificationReadUseCase`

- Signature: `class MarkNotificationReadUseCase extends UseCase< string, NotificationModule.MarkReadResponse >`
- Lines: 215-225
- Exported: yes

```ts
class MarkNotificationReadUseCase extends UseCase<
  string,
  NotificationModule.MarkReadResponse
> {
  constructor(private repo: NotificationsRepository) {
    super();
  }
  execute(id: string) {
    return this.repo.markRead(id);
  }
}
```

### method `constructor`

- Signature: `constructor(private repo: NotificationsRepository)`
- Lines: 219-221
- Exported: yes

```ts
constructor(private repo: NotificationsRepository) {
    super();
  }
```

### method `execute`

- Signature: `execute(id: string)`
- Lines: 222-224
- Exported: yes

```ts
execute(id: string) {
    return this.repo.markRead(id);
  }
```

### class `MarkAllNotificationsReadUseCase`

- Signature: `class MarkAllNotificationsReadUseCase extends UseCase< void, NotificationModule.MarkAllReadResponse >`
- Lines: 227-237
- Exported: yes

```ts
class MarkAllNotificationsReadUseCase extends UseCase<
  void,
  NotificationModule.MarkAllReadResponse
> {
  constructor(private repo: NotificationsRepository) {
    super();
  }
  execute() {
    return this.repo.markAllRead();
  }
}
```

### method `constructor`

- Signature: `constructor(private repo: NotificationsRepository)`
- Lines: 231-233
- Exported: yes

```ts
constructor(private repo: NotificationsRepository) {
    super();
  }
```

### method `execute`

- Signature: `execute()`
- Lines: 234-236
- Exported: yes

```ts
execute() {
    return this.repo.markAllRead();
  }
```
