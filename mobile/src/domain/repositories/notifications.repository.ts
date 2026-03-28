import type { NotificationModule } from "../entities/schemas";

export interface NotificationsRepository {
  list(
    params: NotificationModule.ListQueryParams,
  ): Promise<NotificationModule.ListResponse>;
  markRead(id: string): Promise<NotificationModule.MarkReadResponse>;
  markAllRead(): Promise<NotificationModule.MarkAllReadResponse>;
}
