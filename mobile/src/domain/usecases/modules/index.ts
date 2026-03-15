import { UseCase } from "../base";
import type {
  TimelineModule,
  CoupleModule,
  DashboardModule,
  CareModule,
  BudgetModule,
} from "../../entities/schemas";
import type {
  TimelineRepository,
  CoupleRepository,
  DashboardRepository,
  CareRepository,
  BudgetRepository,
} from "../../repositories/modules.repository";

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
