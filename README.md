# CALDEV Engineering Studio

A tier-one digital studio platform built with Next.js 14+, TypeScript, and Tailwind CSS. Designed for zero-latency, high-performance visual impact.

## System Architecture

- **Framework:** Next.js 15 (App Router)
- **Styling:** Tailwind CSS (Modern CSS-first configuration)
- **Animation:** Framer Motion (Hardware-accelerated)
- **Type Safety:** Strict TypeScript

## Core Pillars

1. **Financial Logic:** Algorithmic signaling and XAUUSD/BTC processing.
2. **Physical Systems:** IoT Embedded logic and secure API payloads.
3. **Business Operations:** Commercial acreage management and operational mathematics.

## Development

### Setup
```bash
npm install
```

### Run Development Server
```bash
npm run dev
```

### Build for Production
```bash
npm run build
```

## Growth Stack Environment Variables

- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `RESEND_API_KEY`
- `RESEND_FROM_EMAIL`
- `RESEND_LIST_ID` (optional marker value, subscribers are still persisted to `data/subscribers.json`)
- `DOMAIN`
- `NEXT_PUBLIC_PLAUSIBLE_DOMAIN`
- `PLAUSIBLE_API_KEY` (for server-side conversion events)
- `ADMIN_ENABLED` (`1` enables `/admin/orders`, any other value returns 404)
- `AWS_S3_BUCKET`, `AWS_REGION`, `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY` (optional signed S3 delivery)

## Manual Cart-Abandon Reminder Trigger

Use this endpoint manually or from a scheduler:

```bash
curl -X POST https://your-domain.com/api/send-abandon-reminder \\
  -H "content-type: application/json" \\
  -d '{"sessionId":"cs_test_123"}'
```

You can also pass an email:

```bash
curl -X POST https://your-domain.com/api/send-abandon-reminder \\
  -H "content-type: application/json" \\
  -d '{"email":"buyer@example.com"}'
```

> Admin caveat: `/admin/orders` currently uses an environment guard (`ADMIN_ENABLED=1`) rather than full auth middleware.

## Deployment

The project is optimized for deployment on **Vercel**.
1. Push the code to a GitHub repository.
2. Connect the repository to Vercel.
3. Vercel will automatically build and deploy the project to its global edge network.

## Updating Portfolio Content

To update the engineering case studies, modify the data in `src/lib/data.ts`. The changes will be automatically picked up by the static generation process during the next build.

---
**LOGIC IS ABSOLUTE**
