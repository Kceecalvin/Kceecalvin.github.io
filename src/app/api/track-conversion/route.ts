import { NextResponse } from 'next/server';
import { z } from 'zod';

const trackSchema = z.object({
  eventName: z.string().min(1).max(120),
  props: z.record(z.string(), z.union([z.string(), z.number(), z.boolean(), z.null()])).optional(),
});

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ success: false, error: 'Malformed JSON payload' }, { status: 400 });
  }

  const parsed = trackSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ success: false, error: 'Invalid tracking payload' }, { status: 400 });
  }

  const { eventName, props } = parsed.data;
  const plausibleApiKey = process.env.PLAUSIBLE_API_KEY;
  const plausibleDomain = process.env.PLAUSIBLE_DOMAIN;

  console.log('[TRACK CONVERSION]', { eventName, props });

  if (!plausibleApiKey || !plausibleDomain) {
    return NextResponse.json({ success: true, forwarded: false, reason: 'Plausible env vars not configured' });
  }

  const path = typeof props?.path === 'string' ? props.path : '/';
  const plausibleUrl =
    path.startsWith('http://') || path.startsWith('https://')
      ? path
      : `https://${plausibleDomain}${path.startsWith('/') ? path : `/${path}`}`;

  try {
    const response = await fetch('https://plausible.io/api/event', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: ['Bearer', plausibleApiKey].join(' '),
      },
      body: JSON.stringify({
        name: eventName,
        domain: plausibleDomain,
        url: plausibleUrl,
        props,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('[PLAUSIBLE FORWARD FAILED]', response.status, errorText);
      return NextResponse.json({ success: false, forwarded: true, error: 'Plausible forward failed' }, { status: 502 });
    }

    return NextResponse.json({ success: true, forwarded: true });
  } catch (error) {
    console.error('[PLAUSIBLE FORWARD ERROR]', error);
    return NextResponse.json({ success: false, forwarded: true, error: 'Plausible forward failed' }, { status: 502 });
  }
}
