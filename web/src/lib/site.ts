export const siteName = 'Em+';
export const siteDescription =
  'Ứng dụng cho cặp đôi: ghép đôi, timeline, ngân sách, chăm sóc và thông báo.';

export function siteUrl(): URL {
  const raw =
    import.meta.env.PUBLIC_SITE_URL?.replace(/\/$/, '') || 'https://emplus.app';
  return new URL(raw);
}
