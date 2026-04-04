import type { User } from "../types.ts";
import type { DataStore } from "../store/contracts.ts";

type DemoSpec = {
  type: string;
  title: string;
  body?: string;
  iconName?: string;
  iconColor?: string;
  iconBg?: string;
  actionLabel?: string;
  /** Thời điểm tạo = now - offset */
  createdOffsetMs: number;
  /** Đã đọc tại now - offset (bỏ qua nếu chưa đọc) */
  readAtOffsetMs?: number;
};

const DEMO_SPECS: DemoSpec[] = [
  {
    type: "budget",
    title: "Người ấy vừa thêm chi tiêu “Cà phê cuối tuần”",
    body: "125.000 ₫ · Danh mục Ăn uống",
    iconName: "wallet-outline",
    iconColor: "#c2410c",
    iconBg: "#ffedd5",
    actionLabel: "Xem ngân sách",
    createdOffsetMs: 3 * 60_000,
  },
  {
    type: "memory",
    title: "Nhắc nhở: kỷ niệm 6 tháng vào thứ Bảy",
    iconName: "heart",
    iconColor: "#be185d",
    iconBg: "#fce7f3",
    actionLabel: "Mở timeline",
    createdOffsetMs: 45 * 60_000,
  },
  {
    type: "care",
    title: "Gợi ý chăm sóc: hôm nay là ngày nên nhắn nhủ nhẹ nhàng",
    iconName: "flower-outline",
    iconColor: "#0f766e",
    iconBg: "#ccfbf1",
    createdOffsetMs: 5 * 60 * 60_000,
    readAtOffsetMs: 20 * 60_000,
  },
  {
    type: "system",
    title: "Đồng bộ hoàn tất",
    body: "Dữ liệu trên thiết bị đã khớp với đám mây.",
    iconName: "cloud-done-outline",
    iconColor: "#4f46e5",
    iconBg: "#e0e7ff",
    createdOffsetMs: 26 * 60 * 60_000,
    readAtOffsetMs: 60 * 60_000,
  },
  {
    type: "pairing",
    title: "Lời mời ghép đôi đã được chấp nhận",
    iconName: "people-outline",
    iconColor: "#7c3aed",
    iconBg: "#ede9fe",
    createdOffsetMs: 72 * 60 * 60_000,
    readAtOffsetMs: 30 * 60 * 60_000,
  },
];

/**
 * Nếu user chưa có in-app notification nào, tạo vài bản ghi demo (đi qua DB/store như dữ liệu thật).
 */
export async function ensureDemoInAppNotifications(
  store: DataStore,
  user: User,
): Promise<void> {
  const { total } = await store.listNotificationsForUser(user.id, {
    page: 1,
    limit: 1,
  });
  if (total > 0) {
    return;
  }

  const now = Date.now();
  for (const spec of DEMO_SPECS) {
    const createdAt = new Date(now - spec.createdOffsetMs).toISOString();
    const readAt =
      spec.readAtOffsetMs != null
        ? new Date(now - spec.readAtOffsetMs).toISOString()
        : undefined;
    await store.createInAppNotification({
      userId: user.id,
      coupleId: user.coupleId,
      type: spec.type,
      title: spec.title,
      body: spec.body,
      iconName: spec.iconName,
      iconColor: spec.iconColor,
      iconBg: spec.iconBg,
      actionLabel: spec.actionLabel,
      readAt,
      createdAt,
      metadata: { demoSeed: true },
    });
  }
}
