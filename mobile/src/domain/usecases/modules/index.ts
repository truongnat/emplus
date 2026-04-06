import { UseCase } from "../base";
import type {
  TimelineModule,
  CoupleModule,
  DashboardModule,
  CareModule,
  BudgetModule,
  Memory,
} from "../../entities/schemas";
import type {
  TimelineRepository,
  CoupleRepository,
  DashboardRepository,
  CareRepository,
  BudgetRepository,
  PairingStatusResponse,
} from "../../repositories/modules.repository";
import type { NotificationsRepository } from "../../repositories/notifications.repository";
import type { NotificationModule } from "../../entities/schemas";

// --- Timeline ---
export class GetMemoriesUseCase extends UseCase<
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

export class CreateMemoryUseCase extends UseCase<
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

export class GetMemoryDetailUseCase extends UseCase<string, Memory> {
  constructor(private repo: TimelineRepository) {
    super();
  }
  execute(id: string) {
    return this.repo.getMemory(id);
  }
}

export class DeleteMemoryUseCase extends UseCase<
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

// --- Couple ---
export class GenerateInviteUseCase extends UseCase<
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

export class JoinCoupleUseCase extends UseCase<
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

export class CheckPairingStatusUseCase extends UseCase<
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

// --- Dashboard ---
export class GetDashboardUseCase extends UseCase<
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

// --- Care ---
export class SaveFemaleCycleUseCase extends UseCase<
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

export class GetMaleSuggestionsUseCase extends UseCase<
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

export class GetCoupleMoodUseCase extends UseCase<
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

export class PutCoupleMoodUseCase extends UseCase<
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

// --- Budget ---
export class GetBudgetSummaryUseCase extends UseCase<
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

export class GetExpensesUseCase extends UseCase<
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

export class CreateExpenseUseCase extends UseCase<
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

export class ListNotificationsUseCase extends UseCase<
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

export class MarkNotificationReadUseCase extends UseCase<
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

export class MarkAllNotificationsReadUseCase extends UseCase<
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
