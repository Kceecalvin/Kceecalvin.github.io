'use client';

import { useEffect } from 'react';
import { captureUtmFromUrl } from '@/lib/utm';

export default function UtmCapturer() {
  useEffect(() => {
    const captured = captureUtmFromUrl();
    if (!captured) return;

    const payload = {
      eventName: 'visit',
      props: {
        ...captured,
        path: `${window.location.pathname}${window.location.search}`,
      },
    };

    void fetch('/api/track-conversion', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    }).catch(() => {
      // Best-effort tracking only.
    });
  }, []);

  return null;
}
