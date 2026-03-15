import type {
  TimelineModule,
  CoupleModule,
  DashboardModule,
  CareModule,
  BudgetModule,
} from "../entities/schemas";

export interface TimelineRepository {
  getMemories(
    params: TimelineModule.ListQueryParams,
  ): Promise<TimelineModule.ListResponse>;
  createMemory(
    params: TimelineModule.CreateRequest,
  ): Promise<TimelineModule.CreateResponse>;
}

export interface CoupleRepository {
  generateInvite(): Promise<CoupleModule.GenerateInviteResponse>;
  joinCouple(
    params: CoupleModule.JoinRequest,
  ): Promise<CoupleModule.JoinResponse>;
}

export interface DashboardRepository {
  getHomeData(): Promise<DashboardModule.HomeResponse>;
}

export interface CareRepository {
  saveFemaleCycle(
    params: CareModule.FemaleCycleRequest,
  ): Promise<CareModule.FemaleCycleResponse>;
  getMaleSuggestions(): Promise<CareModule.MaleSuggestionsResponse>;
}

export interface BudgetRepository {
  getSummary(): Promise<BudgetModule.SummaryResponse>;
  getExpenses(
    params: BudgetModule.ListQueryParams,
  ): Promise<BudgetModule.ListResponse>;
  createExpense(
    params: BudgetModule.CreateRequest,
  ): Promise<BudgetModule.CreateResponse>;
}
