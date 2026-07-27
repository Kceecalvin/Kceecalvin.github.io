import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { z } from 'zod';
import { readJsonArray } from '@/lib/json-store';

const reminderSchema = z.object({
  sessionId: z.string().optional(),
  email: z.string().email().optional(),
}).refine((data) => data.sessionId || data.email, {
  message: 'sessionId or email is required',
});

function siteBaseUrl() {
  const configured = process.env.DOMAIN || 'http://localhost:3000';
  return configured.startsWith('http') ? configured : `https://${configured}`;
}

type CheckoutRecord = {
  session_id?: string;
  email?: string | null;
  productId?: string;
};

export async function POST(request: Request) {
  try {
    const parsed = reminderSchema.safeParse(await request.json());
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.issues[0]?.message ?? 'Invalid payload' }, { status: 400 });
    }

    const checkouts = await readJsonArray<CheckoutRecord>('checkouts.json');
    const checkout = checkouts.find((entry) => (
      parsed.data.sessionId ? entry.session_id === parsed.data.sessionId : entry.email === parsed.data.email
    ));

    const recipientEmail = parsed.data.email || checkout?.email;
    if (!recipientEmail) {
      return NextResponse.json({ error: 'Checkout not found for reminder' }, { status: 404 });
    }

    if (!process.env.RESEND_API_KEY) {
      console.log('Cart reminder requested but RESEND_API_KEY is missing', {
        recipientEmail,
        sessionId: parsed.data.sessionId,
      });
      return NextResponse.json({ success: true, skipped: true });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    const from = process.env.RESEND_FROM_EMAIL || 'noreply@caldev.io';

    await resend.emails.send({
      from,
      to: recipientEmail,
      subject: 'Your CALDEV download is waiting',
      html: `
        <h1>Still thinking it over?</h1>
        <p>Your selected digital product is still available.</p>
        <p><a href="${siteBaseUrl()}/store">Resume checkout</a></p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('send-abandon-reminder failed', error);
    return NextResponse.json({ error: 'Failed to send reminder' }, { status: 500 });
  }
}
