import { AuthRepositoryImpl } from "../../data/repositories/auth.repository.impl";
import {
  CoupleRepositoryImpl,
  DashboardRepositoryImpl,
  TimelineRepositoryImpl,
  CareRepositoryImpl,
  BudgetRepositoryImpl,
} from "../../data/repositories/modules.repository.impl";
import { NotificationsRepositoryImpl } from "../../data/repositories/notifications.repository.impl";
import {
  LoginUseCase,
  RegisterUseCase,
  RefreshSessionUseCase,
  VerifyOtpUseCase,
  GetProfileUseCase,
  UpdateProfileUseCase,
  RequestPasswordResetUseCase,
  ResetPasswordUseCase,
  RegisterPushTokenUseCase,
} from "../../domain/usecases/auth";
import {
  GenerateInviteUseCase,
  JoinCoupleUseCase,
  CheckPairingStatusUseCase,
  GetDashboardUseCase,
  GetMemoriesUseCase,
  CreateMemoryUseCase,
  GetMemoryDetailUseCase,
  DeleteMemoryUseCase,
  SaveFemaleCycleUseCase,
  GetMaleSuggestionsUseCase,
  GetCoupleMoodUseCase,
  PutCoupleMoodUseCase,
  GetBudgetSummaryUseCase,
  GetExpensesUseCase,
  CreateExpenseUseCase,
  ListNotificationsUseCase,
  MarkNotificationReadUseCase,
  MarkAllNotificationsReadUseCase,
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
const notificationsRepo = new NotificationsRepositoryImpl();

// Use Cases
export const dependencies = {
  auth: {
    login: new LoginUseCase(authRepo),
    register: new RegisterUseCase(authRepo),
    refresh: new RefreshSessionUseCase(authRepo),
    verifyOtp: new VerifyOtpUseCase(authRepo),
    getProfile: new GetProfileUseCase(authRepo),
    updateProfile: new UpdateProfileUseCase(authRepo),
    requestPasswordReset: new RequestPasswordResetUseCase(authRepo),
    resetPassword: new ResetPasswordUseCase(authRepo),
    registerPushToken: new RegisterPushTokenUseCase(authRepo),
  },
  couple: {
    generateInvite: new GenerateInviteUseCase(coupleRepo),
    join: new JoinCoupleUseCase(coupleRepo),
    checkPairingStatus: new CheckPairingStatusUseCase(coupleRepo),
    getDashboard: new GetDashboardUseCase(dashboardRepo),
  },
  timeline: {
    getMemories: new GetMemoriesUseCase(timelineRepo),
    createMemory: new CreateMemoryUseCase(timelineRepo),
    getMemory: new GetMemoryDetailUseCase(timelineRepo),
    deleteMemory: new DeleteMemoryUseCase(timelineRepo),
  },
  care: {
    saveCycle: new SaveFemaleCycleUseCase(careRepo),
    getMaleSuggestions: new GetMaleSuggestionsUseCase(careRepo),
    getCoupleMood: new GetCoupleMoodUseCase(careRepo),
    putCoupleMood: new PutCoupleMoodUseCase(careRepo),
  },
  budget: {
    getSummary: new GetBudgetSummaryUseCase(budgetRepo),
    getExpenses: new GetExpensesUseCase(budgetRepo),
    createExpense: new CreateExpenseUseCase(budgetRepo),
  },
  notifications: {
    list: new ListNotificationsUseCase(notificationsRepo),
    markRead: new MarkNotificationReadUseCase(notificationsRepo),
    markAllRead: new MarkAllNotificationsReadUseCase(notificationsRepo),
  },
} as const;
