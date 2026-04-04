import type { MemoryItem } from "../types.ts";
import type { DataStore } from "../store/contracts.ts";

type DemoMemorySpec = {
  title: string;
  description?: string;
  /** Số ngày trước so với hôm nay (memory_date) */
  daysAgo: number;
  tags: string[];
  mediaUrls: string[];
};

/** Tiêu đề chỉ dùng để chèn thêm khi chưa có (QA grid), không ghi đè bản user trùng tên. */
const DEMO_GRID_TEST_TITLES = new Set([
  "Demo UI — 4 ảnh (2×2)",
  "Demo UI — 6 ảnh (+2)",
]);

/** Bản ghi demo: chi phí / nhiệm vụ / kỷ niệm + 2 mục QA lưới ảnh. */
const DEMO_MEMORY_SPECS: DemoMemorySpec[] = [
  {
    title: "Cà phê cuối tuần",
    description: "125.000 ₫ · Quán quen góc phố",
    daysAgo: 1,
    tags: ["chi-phi"],
    mediaUrls: [
      "https://picsum.photos/id/431/720/900",
      "https://picsum.photos/id/433/720/900",
    ],
  },
  {
    title: "Tối hẹn hò",
    description: "Ăn tối · Nhà hàng view đẹp",
    daysAgo: 3,
    tags: ["chi-phi"],
    mediaUrls: [
      "https://picsum.photos/id/292/720/960",
      "https://picsum.photos/id/429/720/960",
      "https://picsum.photos/id/442/720/960",
    ],
  },
  {
    title: "Vé xem phim",
    description: "Hai vé · Rạp trung tâm",
    daysAgo: 5,
    tags: ["chi-phi"],
    mediaUrls: [],
  },
  {
    title: "Chuẩn bị sinh nhật",
    description: "Gợi ý: bánh, nến, thiệp handmade",
    daysAgo: 2,
    tags: ["nhiem-vu"],
    mediaUrls: ["https://picsum.photos/id/64/720/720"],
  },
  {
    title: "Đặt bàn nhà hàng",
    description: "Nhắc đặt trước 2 ngày",
    daysAgo: 4,
    tags: ["nhiem-vu"],
    mediaUrls: [],
  },
  {
    title: "In album ảnh",
    description: "Chọn 40 ảnh kỷ niệm tháng 3",
    daysAgo: 7,
    tags: ["nhiem-vu"],
    mediaUrls: [
      "https://picsum.photos/id/152/720/900",
      "https://picsum.photos/id/177/720/900",
      "https://picsum.photos/id/193/720/900",
    ],
  },
  {
    title: "Ngày đầu gặp nhau",
    description: "Cùng một quán cà phê, cùng một chiếc bàn.",
    daysAgo: 120,
    tags: ["ky-niem"],
    mediaUrls: [
      "https://picsum.photos/id/1005/720/900",
      "https://picsum.photos/id/1015/720/900",
      "https://picsum.photos/id/1035/720/900",
    ],
  },
  {
    title: "Dạo phố chiều mưa",
    description: "Không tag — vẫn hiện ở lọc Kỷ niệm",
    daysAgo: 18,
    tags: [],
    mediaUrls: [
      "https://picsum.photos/id/1011/720/960",
      "https://picsum.photos/id/1018/720/960",
    ],
  },
  {
    title: "Picnic cuối tuần",
    description: "Công viên · Bánh mì + trà đá",
    daysAgo: 25,
    tags: ["ky-niem"],
    mediaUrls: [
      "https://picsum.photos/id/1025/720/720",
      "https://picsum.photos/id/1060/720/720",
    ],
  },
  {
    title: "Biển sớm tinh mơ",
    description: "Bình minh và tiếng sóng",
    daysAgo: 60,
    tags: ["ky-niem"],
    mediaUrls: [
      "https://picsum.photos/id/1050/720/900",
      "https://picsum.photos/id/1052/720/900",
      "https://picsum.photos/id/1055/720/900",
    ],
  },
  {
    title: "Demo UI — 4 ảnh (2×2)",
    description: "QA lưới 2×2 đủ 4 ô (không +N)",
    daysAgo: 0,
    tags: ["ky-niem"],
    mediaUrls: [
      "https://picsum.photos/id/837/720/720",
      "https://picsum.photos/id/838/720/720",
      "https://picsum.photos/id/839/720/720",
      "https://picsum.photos/id/840/720/720",
    ],
  },
  {
    title: "Demo UI — 6 ảnh (+2)",
    description: "QA ô thứ tư có lớp +2",
    daysAgo: 0,
    tags: ["ky-niem"],
    mediaUrls: [
      "https://picsum.photos/id/541/720/720",
      "https://picsum.photos/id/542/720/720",
      "https://picsum.photos/id/543/720/720",
      "https://picsum.photos/id/544/720/720",
      "https://picsum.photos/id/545/720/720",
      "https://picsum.photos/id/546/720/720",
    ],
  },
];

function memoryDateIso(daysAgo: number): string {
  const d = new Date();
  d.setHours(12, 0, 0, 0);
  d.setDate(d.getDate() - daysAgo);
  return d.toISOString().slice(0, 10);
}

/**
 * Chèn các mục QA lưới ảnh nếu couple **chưa có** tiêu đề đó (dev / fake timeline).
 */
export async function ensureDemoGridTestMemories(
  store: DataStore,
  coupleId: string,
  createdById: string,
): Promise<void> {
  const { items } = await store.listMemoriesByCouple(coupleId, {
    page: 1,
    limit: 500,
    order: "desc",
  });
  const existing = new Set(items.map((m) => m.title));
  const createdAt = new Date().toISOString();
  let inserted = false;
  for (const spec of DEMO_MEMORY_SPECS) {
    if (!DEMO_GRID_TEST_TITLES.has(spec.title)) continue;
    if (existing.has(spec.title)) continue;
    const memory: MemoryItem = {
      id: crypto.randomUUID(),
      coupleId,
      createdById,
      title: spec.title,
      description: spec.description,
      memoryDate: memoryDateIso(spec.daysAgo),
      mediaUrls: spec.mediaUrls,
      tags: spec.tags,
      createdAt,
    };
    await store.saveMemory(memory);
    inserted = true;
  }
  if (inserted) {
    await store.invalidateHomeCache(coupleId);
  }
}

/**
 * Nếu couple chưa có memory nào, tạo toàn bộ bản ghi demo (tag + QA grid).
 */
export async function ensureDemoTimelineMemories(
  store: DataStore,
  coupleId: string,
  createdById: string,
): Promise<void> {
  const { total } = await store.listMemoriesByCouple(coupleId, {
    page: 1,
    limit: 1,
  });
  if (total > 0) {
    return;
  }

  const createdAt = new Date().toISOString();
  for (const spec of DEMO_MEMORY_SPECS) {
    const memory: MemoryItem = {
      id: crypto.randomUUID(),
      coupleId,
      createdById,
      title: spec.title,
      description: spec.description,
      memoryDate: memoryDateIso(spec.daysAgo),
      mediaUrls: spec.mediaUrls,
      tags: spec.tags,
      createdAt,
    };
    await store.saveMemory(memory);
  }
  await store.invalidateHomeCache(coupleId);
}

/**
 * Cập nhật `mediaUrls` cho mọi memory có **tiêu đề trùng** một mục trong `DEMO_MEMORY_SPECS`.
 * Chỉ gọi khi `fakeTimelineMemories` — dev. Không yêu cầu couple phải có đúng 10 bản ghi
 * (trước đây điều kiện đó khiến sync không bao giờ chạy nếu user thêm/xóa kỷ niệm).
 *
 * Cảnh báo: nếu tự đặt tiêu đề trùng tên demo (vd. "Cà phê cuối tuần"), URL ảnh có thể bị ghi đè.
 */
export async function syncDemoTimelineMediaUrls(
  store: DataStore,
  coupleId: string,
): Promise<void> {
  const titleToSpec = new Map(DEMO_MEMORY_SPECS.map((s) => [s.title, s]));
  const { items } = await store.listMemoriesByCouple(coupleId, {
    page: 1,
    limit: 100,
    order: "desc",
  });
  if (items.length === 0) {
    return;
  }
  let changed = false;
  for (const mem of items) {
    const spec = titleToSpec.get(mem.title);
    if (!spec) continue;
    const want = spec.mediaUrls;
    if (JSON.stringify(mem.mediaUrls) === JSON.stringify(want)) continue;
    await store.updateMemory({ ...mem, mediaUrls: [...want] });
    changed = true;
  }
  if (changed) {
    await store.invalidateHomeCache(coupleId);
  }
}
