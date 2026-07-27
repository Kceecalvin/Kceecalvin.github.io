import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { z } from 'zod';
import { appendJsonRecord } from '@/lib/json-store';

const subscribeSchema = z.object({
  email: z.string().email(),
  source: z.string().optional(),
  utm_source: z.string().optional(),
  utm_medium: z.string().optional(),
  utm_campaign: z.string().optional(),
  utm_term: z.string().optional(),
  utm_content: z.string().optional(),
});

function siteBaseUrl() {
  const configured = process.env.DOMAIN || 'http://localhost:3000';
  return configured.startsWith('http') ? configured : `https://${configured}`;
}

export async function POST(request: Request) {
  try {
    const parsed = subscribeSchema.safeParse(await request.json());
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.issues[0]?.message ?? 'Invalid payload' }, { status: 400 });
    }

    const payload = parsed.data;

    await appendJsonRecord('subscribers.json', {
      id: crypto.randomUUID(),
      email: payload.email,
      source: payload.source ?? 'api',
      utm_source: payload.utm_source,
      utm_medium: payload.utm_medium,
      utm_campaign: payload.utm_campaign,
      utm_term: payload.utm_term,
      utm_content: payload.utm_content,
      subscribed_at: new Date().toISOString(),
      resend_list_id: process.env.RESEND_LIST_ID || null,
    });

    if (process.env.RESEND_API_KEY) {
      const resend = new Resend(process.env.RESEND_API_KEY);
      const from = process.env.RESEND_FROM_EMAIL || 'noreply@caldev.io';
      const leadMagnetUrl = `${siteBaseUrl()}/lead-magnet.pdf`;

      await resend.emails.send({
        from,
        to: payload.email,
        subject: 'Welcome to CALDEV Insights',
        html: `
          <h1>Welcome aboard</h1>
          <p>Thanks for subscribing. Your lead magnet is ready:</p>
          <p><a href="${leadMagnetUrl}">Download the Systems Playbook</a></p>
        `,
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Subscribe endpoint failed', error);
    return NextResponse.json({ error: 'Subscription failed' }, { status: 500 });
  }
}
