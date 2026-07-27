export type Utm = {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  gclid?: string;
  referrer?: string;
  first_seen_at: string;
};

const STORAGE_KEY = 'site_utm_v1';

const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid'] as const;

export function captureUtmFromUrl(): Utm | null {
  if (typeof window === 'undefined') return null;

  const searchParams = new URLSearchParams(window.location.search);
  const utmData = Object.fromEntries(
    UTM_KEYS.map((key) => [key, searchParams.get(key) ?? undefined]).filter(([, value]) => Boolean(value))
  ) as Partial<Utm>;

  if (Object.keys(utmData).length === 0) {
    return null;
  }

  const captured: Utm = {
    ...utmData,
    referrer: document.referrer || undefined,
    first_seen_at: new Date().toISOString(),
  };

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(captured));
  } catch {
    // Ignore storage failures in restricted/private contexts.
  }

  return captured;
}

export function getStoredUtm(): Utm | null {
  if (typeof window === 'undefined') return null;

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw) as Utm;
    if (!parsed || typeof parsed !== 'object') return null;
    if (typeof parsed.first_seen_at !== 'string') return null;
    return parsed;
  } catch {
    return null;
  }
}
