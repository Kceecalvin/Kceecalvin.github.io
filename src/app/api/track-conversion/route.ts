import { NextResponse } from 'next/server';
import { z } from 'zod';
import { appendJsonRecord } from '@/lib/json-store';

const conversionSchema = z.object({
  sessionId: z.string().optional(),
  amount: z.number().nonnegative(),
  productIds: z.array(z.string()).default([]),
  utm_source: z.string().optional(),
  utm_medium: z.string().optional(),
  utm_campaign: z.string().optional(),
  utm_term: z.string().optional(),
  utm_content: z.string().optional(),
});

export async function POST(request: Request) {
  try {
    const parsed = conversionSchema.safeParse(await request.json());
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.issues[0]?.message ?? 'Invalid payload' }, { status: 400 });
    }

    const event = {
      id: crypto.randomUUID(),
      created_at: new Date().toISOString(),
      ...parsed.data,
    };

    await appendJsonRecord('conversions.json', event);

    const plausibleDomain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
    const plausibleApiKey = process.env.PLAUSIBLE_API_KEY;

    if (plausibleDomain && plausibleApiKey) {
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      };
      headers.Authorization = 'Bearer ' + plausibleApiKey;

      await fetch('https://plausible.io/api/event', {
        method: 'POST',
        headers,
        body: JSON.stringify({
          domain: plausibleDomain,
          name: 'purchase',
          url: '/success',
          props: {
            amount: parsed.data.amount,
            productIds: parsed.data.productIds.join(','),
            utm_source: parsed.data.utm_source,
            utm_medium: parsed.data.utm_medium,
            utm_campaign: parsed.data.utm_campaign,
            utm_term: parsed.data.utm_term,
            utm_content: parsed.data.utm_content,
          },
        }),
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('track-conversion failed', error);
    return NextResponse.json({ error: 'Tracking failed' }, { status: 500 });
  }
}
