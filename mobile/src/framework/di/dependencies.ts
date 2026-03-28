import { AuthRepositoryImpl } from "../../data/repositories/auth.repository.impl";
import {
  CoupleRepositoryImpl,
  DashboardRepositoryImpl,
  TimelineRepositoryImpl,
  CareRepositoryImpl,
  BudgetRepositoryImpl,
} from "../../data/repositories/modules.repository.impl";
import {
  LoginUseCase,
  RegisterUseCase,
  RefreshSessionUseCase,
  VerifyOtpUseCase,
  GetProfileUseCase,
} from "../../domain/usecases/auth";
import {
  GenerateInviteUseCase,
  JoinCoupleUseCase,
  GetDashboardUseCase,
  GetMemoriesUseCase,
  CreateMemoryUseCase,
  SaveFemaleCycleUseCase,
  GetMaleSuggestionsUseCase,
  GetBudgetSummaryUseCase,
  GetExpensesUseCase,
  CreateExpenseUseCase,
} from "../../domain/usecases/modules";

/**
 * Clean Code: Centralized Dependency Injection.
 */

// Repositories (Singletons)
const authRepo = new AuthRepositoryImpl();
const coupleRepo = new CoupleRepositoryImpl();
const dashboardRepo = new DashboardRepositoryImpl();
const timelineRepo = new TimelineRepositoryImpl();
const careRepo = new CareRepositoryImpl();
const budgetRepo = new BudgetRepositoryImpl();

// Use Cases
export const dependencies = {
  auth: {
    login: new LoginUseCase(authRepo),
    register: new RegisterUseCase(authRepo),
    refresh: new RefreshSessionUseCase(authRepo),
    verifyOtp: new VerifyOtpUseCase(authRepo),
    getProfile: new GetProfileUseCase(authRepo),
  },
  couple: {
    generateInvite: new GenerateInviteUseCase(coupleRepo),
    join: new JoinCoupleUseCase(coupleRepo),
    getDashboard: new GetDashboardUseCase(dashboardRepo),
  },
  timeline: {
    getMemories: new GetMemoriesUseCase(timelineRepo),
    createMemory: new CreateMemoryUseCase(timelineRepo),
  },
  care: {
    saveCycle: new SaveFemaleCycleUseCase(careRepo),
    getMaleSuggestions: new GetMaleSuggestionsUseCase(careRepo),
  },
  budget: {
    getSummary: new GetBudgetSummaryUseCase(budgetRepo),
    getExpenses: new GetExpensesUseCase(budgetRepo),
    createExpense: new CreateExpenseUseCase(budgetRepo),
  },
} as const;
