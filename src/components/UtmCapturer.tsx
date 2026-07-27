'use client';

import { useEffect } from 'react';

const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];

export default function UtmCapturer() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const captured = UTM_KEYS.reduce<Record<string, string>>((acc, key) => {
      const value = params.get(key);
      if (value) {
        acc[key] = value;
      }
      return acc;
    }, {});

    if (Object.keys(captured).length === 0) {
      return;
    }

    const existing = window.localStorage.getItem('utm_params');
    const merged = existing
      ? { ...JSON.parse(existing), ...captured, captured_at: new Date().toISOString() }
      : { ...captured, captured_at: new Date().toISOString() };

    window.localStorage.setItem('utm_params', JSON.stringify(merged));
  }, []);

  return null;
}
