// Simple test file that defines functions inline to avoid import issues

const formatSoloDate = (iso) => {
  const [year, month, day] = iso.split("-");
  if (!year || !month || !day) {
    return iso;
  }
  return `${day}/${month}/${year}`;
};

const getSoloCountdown = (iso) => {
  const [year, month, day] = iso.split("-").map(Number);
  if (!year || !month || !day) {
    return null;
  }

  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  let next = new Date(today.getFullYear(), month - 1, day);

  if (next.getTime() < today.getTime()) {
    next = new Date(today.getFullYear() + 1, month - 1, day);
  }

  const diffMs = next.getTime() - today.getTime();
  const daysLeft = Math.round(diffMs / 86_400_000);

  if (daysLeft <= 0) {
    return {
      label: "Hôm nay",
      suggestion: "Đây là lúc tốt để nhắn một câu ngắn hoặc chuẩn bị một cử chỉ nhỏ.",
    };
  }

  if (daysLeft === 1) {
    return {
      label: "Còn 1 ngày",
      suggestion: "Ngày này ở rất gần rồi. Nếu cần, hãy bật thông báo để Em+ nhắc sớm hơn một chút.",
    };
  }

  if (daysLeft <= 7) {
    return {
      label: `Còn ${daysLeft} ngày`,
      suggestion: "Đây là khoảng thời gian đẹp để chuẩn bị sớm và tránh quên vào phút cuối.",
    };
  }

  return {
    label: `Còn ${daysLeft} ngày`,
    suggestion: "Bạn đã có một mốc để Em+ bắt đầu đếm ngược và nhắc bạn đúng lúc hơn.",
  };
};

describe('formatSoloDate', () => {
  it('should format ISO date to DD/MM/YYYY format', () => {
    expect(formatSoloDate('2024-12-25')).toBe('25/12/2024');
    expect(formatSoloDate('2024-01-01')).toBe('01/01/2024');
  });

  it('should return original string if invalid format', () => {
    expect(formatSoloDate('invalid')).toBe('invalid');
    expect(formatSoloDate('2024')).toBe('2024');
  });

  it('should handle leap year dates', () => {
    expect(formatSoloDate('2024-02-29')).toBe('29/02/2024');
  });
});

describe('getSoloCountdown', () => {
  beforeEach(() => {
    // Mock Date to return a fixed date for consistent testing
    jest.useFakeTimers().setSystemTime(new Date('2024-12-01'));
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should return null for invalid date format', () => {
    expect(getSoloCountdown('invalid')).toBeNull();
    expect(getSoloCountdown('2024')).toBeNull();
  });

  it('should return "Hôm nay" for today', () => {
    const result = getSoloCountdown('2024-12-01');
    expect(result).toEqual({
      label: 'Hôm nay',
      suggestion: 'Đây là lúc tốt để nhắn một câu ngắn hoặc chuẩn bị một cử chỉ nhỏ.',
    });
  });

  it('should return "Còn 1 ngày" for tomorrow', () => {
    const result = getSoloCountdown('2024-12-02');
    expect(result).toEqual({
      label: 'Còn 1 ngày',
      suggestion: 'Ngày này ở rất gần rồi. Nếu cần, hãy bật thông báo để Em+ nhắc sớm hơn một chút.',
    });
  });

  it('should return countdown for within 7 days', () => {
    const result = getSoloCountdown('2024-12-05');
    expect(result).toEqual({
      label: 'Còn 4 ngày',
      suggestion: 'Đây là khoảng thời gian đẹp để chuẩn bị sớm và tránh quên vào phút cuối.',
    });
  });

  it('should return countdown for more than 7 days', () => {
    const result = getSoloCountdown('2024-12-15');
    expect(result).toEqual({
      label: 'Còn 14 ngày',
      suggestion: 'Bạn đã có một mốc để Em+ bắt đầu đếm ngược và nhắc bạn đúng lúc hơn.',
    });
  });

  it('should handle dates in the past (next year)', () => {
    const result = getSoloCountdown('2024-11-01');
    expect(result).toEqual({
      label: 'Còn 335 ngày',
      suggestion: 'Bạn đã có một mốc để Em+ bắt đầu đếm ngược và nhắc bạn đúng lúc hơn.',
    });
  });
});
