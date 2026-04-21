export const siteName = 'Em+';
export const siteDescription =
  'Giúp bạn nhớ đúng lúc và quan tâm đúng cách, kể cả khi bắt đầu một mình.';

export function siteUrl(): URL {
  const raw =
    import.meta.env.PUBLIC_SITE_URL?.replace(/\/$/, '') || 'https://emplus.app';
  return new URL(raw);
}

export function iosAppUrl(): string | undefined {
  const raw = import.meta.env.PUBLIC_IOS_APP_URL;
  return typeof raw === 'string' && raw.length > 0 ? raw : undefined;
}

export function androidAppUrl(): string | undefined {
  const raw = import.meta.env.PUBLIC_ANDROID_APP_URL;
  return typeof raw === 'string' && raw.length > 0 ? raw : undefined;
}
