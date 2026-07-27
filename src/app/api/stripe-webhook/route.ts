import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { fulfillOrder } from '@/lib/fulfillment';
import { getStripeClient } from '@/lib/stripe';

export async function POST(request: Request) {
  const signature = request.headers.get('stripe-signature');
  if (!signature) {
    return NextResponse.json({ error: 'Missing stripe-signature header' }, { status: 401 });
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    return NextResponse.json({ error: 'Webhook secret is not configured' }, { status: 500 });
  }

  const stripe = getStripeClient();
  const payload = await request.text();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(payload, signature, webhookSecret);
  } catch {
    return NextResponse.json({ error: 'Invalid Stripe signature' }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    try {
      const completed = event.data.object as Stripe.Checkout.Session;
      const session = await stripe.checkout.sessions.retrieve(completed.id);
      const lineItems = await stripe.checkout.sessions.listLineItems(completed.id, { limit: 100 });
      await fulfillOrder(session, lineItems.data);
    } catch (error) {
      console.error('Stripe fulfillment failed', error);
      return NextResponse.json({ error: 'Fulfillment failed' }, { status: 500 });
    }
  }

  return NextResponse.json({ received: true });
}
