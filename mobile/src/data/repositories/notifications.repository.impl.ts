import { apiClient, ApiResponse } from "../../core/api";
import { NotificationModule } from "../../domain/entities/schemas";
import { NotificationsRepository } from "../../domain/repositories/notifications.repository";

export class NotificationsRepositoryImpl implements NotificationsRepository {
  async list(params: NotificationModule.ListQueryParams) {
    const q = new URLSearchParams();
    if (params?.page != null) q.set("page", String(params.page));
    if (params?.limit != null) q.set("limit", String(params.limit));
    if (params?.unread_only != null) q.set("unread_only", String(params.unread_only));
    const qs = q.toString();
    const response = await apiClient.get<
      ApiResponse<NotificationModule.ListResponse>
    >(`/notifications${qs ? `?${qs}` : ""}`);
    return response.data;
  }

  async markRead(id: string) {
    const response = await apiClient.patch<
      ApiResponse<NotificationModule.MarkReadResponse>
    >(`/notifications/${id}/read`);
    return response.data;
  }

  async markAllRead() {
    const response = await apiClient.post<
      ApiResponse<NotificationModule.MarkAllReadResponse>
    >("/notifications/read-all", {});
    return response.data;
  }
}
