/**
 * Nhãn âm lịch (cùng hệ với lịch âm VN/Trung) — lunar-javascript, không kèm types npm.
 */

// eslint-disable-next-line @typescript-eslint/no-require-imports
const { Solar } = require("lunar-javascript") as {
  Solar: {
    fromYmd: (
      y: number,
      month: number,
      day: number,
    ) => {
      getLunar: () => {
        getDay: () => number;
        getMonth: () => number;
      };
    };
  };
};

export function lunarDayMonthLabel(y: number, month: number, day: number): string {
  try {
    const lunar = Solar.fromYmd(y, month, day).getLunar();
    const d = lunar.getDay();
    const mo = Math.abs(lunar.getMonth());
    return `${d}/${mo}`;
  } catch {
    return "";
  }
}

/** Trăng non (1) / trăng rằm (15) — tô nhẹ theo mock */
export function lunarDayKind(
  y: number,
  month: number,
  day: number,
): "new" | "full" | null {
  try {
    const d = Solar.fromYmd(y, month, day).getLunar().getDay();
    if (d === 1) return "new";
    if (d === 15) return "full";
    return null;
  } catch {
    return null;
  }
}
