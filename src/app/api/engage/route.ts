import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { z } from 'zod';

const projectTypes: Record<string, string> = {
  web: 'Enterprise Platforms',
  mobile: 'Distributed Client Networks',
  iot: 'Embedded Relay Systems',
  infrastructure: 'Sovereign Cloud Infrastructure',
};

const timelines: Record<string, string> = {
  urgent: 'Accelerated Mandate (< 1 Month)',
  standard: 'Standard Engagement (1—3 Months)',
  long: 'Long-Term Advisory Commission (3+ Months)',
};

const budgets: Record<string, string> = {
  flexible: 'Bespoke Terms — Direct Dialogue',
  mid: 'Growth Stage — $10,000 to $50,000',
  scale: 'Institutional Scale — $50,000 to $150,000',
  enterprise: 'Enterprise Mandate — Bespoke Capitalisation',
};

// Rigorous validation schema for the scoping inquiry
const engageSchema = z.object({
  email: z.string().email('Invalid email address format').max(254),
  type: z.string().max(100).optional().nullable(),
  timeline: z.string().max(100).optional().nullable(),
  budget: z.string().max(100).optional().nullable(),
  utm: z.object({
    utm_source: z.string().max(256).optional(),
    utm_medium: z.string().max(256).optional(),
    utm_campaign: z.string().max(256).optional(),
    utm_term: z.string().max(256).optional(),
    utm_content: z.string().max(256).optional(),
    gclid: z.string().max(256).optional(),
    referrer: z.string().max(2048).optional(),
    first_seen_at: z.string().max(64).optional(),
  }).optional().nullable(),
});

const allowedOrigins = [
  'https://cal-dev.me',
  'https://kceecalvin.github.io',
  'http://localhost:3000',
  'http://127.0.0.1:3000',
];

const isAllowed = (url: string | null) => {
  if (!url) return false;
  try {
    const parsed = new URL(url);
    return allowedOrigins.some(allowed => allowed === parsed.origin) ||
      parsed.hostname.endsWith('vercel.app') ||
      parsed.hostname === 'localhost' ||
      parsed.hostname === '127.0.0.1';
  } catch {
    return false;
  }
};

export async function POST(request: Request) {
  try {
    // 1. CORS & Referer Security Validation
    const origin = request.headers.get('origin');
    const referer = request.headers.get('referer');

    if (origin && !isAllowed(origin)) {
      console.warn(`[SECURITY WARNING] Blocked unauthorized request origin: ${origin}`);
      return NextResponse.json({ success: false, error: 'Unauthorized request origin' }, { status: 403 });
    } else if (!origin && referer && !isAllowed(referer)) {
      console.warn(`[SECURITY WARNING] Blocked unauthorized request referer: ${referer}`);
      return NextResponse.json({ success: false, error: 'Unauthorized request origin' }, { status: 403 });
    }

    // 2. Body Parser & Sanitization
    let body;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ success: false, error: 'Malformed JSON payload' }, { status: 400 });
    }

    // 3. Schema Parsing using Zod
    const result = engageSchema.safeParse(body);
    if (!result.success) {
      const firstError = result.error.issues[0]?.message || 'Invalid parameters';
      return NextResponse.json({ success: false, error: firstError }, { status: 400 });
    }

    const { type, timeline, budget, email, utm } = result.data;

    const typeLabel = projectTypes[type || ''] || type || 'Not Specified';
    const timelineLabel = timelines[timeline || ''] || timeline || 'Not Specified';
    const budgetLabel = budgets[budget || ''] || budget || 'Not Specified';
    const currentDate = new Date().toUTCString();

    const emailUser = process.env.EMAIL_USER;
    const emailPass = process.env.EMAIL_PASS;
    const web3FormsKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;

    // Log the lead immediately in the console so it is captured in the server log stream
    console.log('[LEAD RECEIVED]', {
      email,
      vector: typeLabel,
      timeline: timelineLabel,
      budget: budgetLabel,
      utm,
      timestamp: currentDate
    });

    let transporter: any = null;

    if (emailUser && emailPass) {
      try {
        // Create SMTP Transporter for Zoho
        transporter = nodemailer.createTransport({
          host: 'smtp.zoho.com',
          port: 465,
          secure: true, // true for port 465 SSL
          auth: {
            user: emailUser,
            pass: emailPass,
          },
          connectionTimeout: 10000, // 10s connection timeout limit
        });
      } catch (transporterError) {
        console.error('Error creating Zoho SMTP transporter:', transporterError);
      }
    } else {
      console.warn('Zoho SMTP credentials missing in environment variables. Refusing nodemailer transporter creation.');
    }

    // 1. Send Auto-Response Email to Prospective Client
    const clientMailOptions = {
      from: `"Kencalvin Mwenda" <${emailUser}>`,
      to: email,
      replyTo: 'kencalvin@caldev.io',
      subject: `[CALDEV] Strategic Alignment Protocol // Systems Scoping & Integration`,
      text: `
Secure Connection Established.
Operational Timestamp: ${currentDate} // UTC

Hello,

Thank you for initiating the systems architecture audit. Your vector inquiry has been securely logged in our operational queue.

Based on your selection, we have initialized a preliminary review for the following parameters:
- Architecture Vector: ${typeLabel}
- Target Deployment Window: ${timelineLabel}
- Selected Capital Range: ${budgetLabel}

---

// SECTION 1: THE CALDEV PHILOSOPHY & PRICING FLEXIBILITY

At Caldev Studio, we build premium, industrial-grade software and systems designed for absolute reliability, performance, and deterministic logic.

Please note that every architectural ballpark select is fully flexible. We treat pricing and scoping as a highly collaborative, negotiable blueprint. We are committed to shaping our delivery models to align perfectly with your technical parameters and budget requirements.

---

// SECTION 2: STRATEGIC ALIGNMENT CALL (NEXT STEPS)

To progress from parameter logging to active execution, we invite you to schedule a brief 15-minute technical alignment session directly with our systems architect, Kencalvin.

During this session, we will:
1. Deconstruct your performance bottlenecks (latency, hardware integration, or scale limits).
2. Align on a negotiable contract model and development lifecycle.
3. Deliver a custom technical specification and architectural roadmap.

Please use the secure link below to book a time that fits your operational calendar:
Book Technical Alignment Video Session: https://calendly.com/kencalvin-caldev (or reply directly to this email)

If you prefer to align via asynchronous text, simply reply directly to this email with your detailed technical specifications or any existing blueprints.

Logic is absolute. We look forward to engineering the future of your systems.

Best regards,

Kencalvin Mwenda
Lead Systems Architect & Founder
Caldev Engineering Studio

─────────────────────────────────────────
CONTACT COORDINATES:
E: kencalvin@caldev.io / cal-dev@zohomail.com
W: kceecalvin.github.io
P: Nairobi, Kenya // London & Global
L: linkedin.com/in/kencalvin-mwenda-a71752283
G: github.com/kceecalvin
I: instagram.com/k._c_3
─────────────────────────────────────────
LOGIC_IS_ABSOLUTE // RELEASE_4.95.0
─────────────────────────────────────────
      `,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <title>CALDEV Strategic Alignment Protocol</title>
          <style>
            body {
              background-color: #030305;
              color: #f6f5f9;
              font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
              margin: 0;
              padding: 0;
              -webkit-font-smoothing: antialiased;
            }
            .wrapper {
              background-color: #030305;
              padding: 40px 20px;
            }
            .container {
              max-width: 620px;
              margin: 0 auto;
              background-color: #08080c;
              border: 1px solid #2e2d38;
              border-radius: 16px;
              padding: 44px;
              box-shadow: 0 20px 50px rgba(0,0,0,0.6);
            }
            .logo-section {
              margin-bottom: 32px;
            }
            .logo {
              font-size: 26px;
              font-weight: 900;
              text-transform: uppercase;
              letter-spacing: -1px;
              color: #ffffff;
              display: inline-block;
            }
            .logo span {
              color: #FF6A1A;
            }
            .status-badge {
              font-family: monospace;
              font-size: 9px;
              color: #FF6A1A;
              background-color: rgba(255, 106, 26, 0.1);
              border: 1px solid rgba(255, 106, 26, 0.2);
              border-radius: 4px;
              text-transform: uppercase;
              letter-spacing: 2px;
              padding: 4px 10px;
              display: inline-block;
              margin-top: 4px;
            }
            .timestamp {
              font-family: monospace;
              font-size: 11px;
              color: #94a3b8;
              margin-top: 16px;
              margin-bottom: 32px;
              border-bottom: 1px solid #2e2d38;
              padding-bottom: 16px;
              text-transform: uppercase;
              letter-spacing: 1px;
            }
            h1 {
              font-size: 26px;
              font-weight: 900;
              text-transform: uppercase;
              letter-spacing: -0.5px;
              color: #ffffff;
              margin-top: 0;
              margin-bottom: 20px;
              line-height: 1.2;
            }
            p {
              font-size: 15px;
              line-height: 1.6;
              color: #cbd5e1;
              margin-bottom: 24px;
            }
            .bold-intro {
              color: #ffffff;
              font-weight: 600;
            }
            h2 {
              font-size: 16px;
              font-weight: 800;
              color: #ffffff;
              text-transform: uppercase;
              letter-spacing: 1px;
              margin-top: 36px;
              margin-bottom: 16px;
              border-left: 2px solid #FF6A1A;
              padding-left: 12px;
            }
            .parameter-box {
              background-color: #0e0d15;
              border: 1px solid #2e2d38;
              border-radius: 12px;
              padding: 24px;
              margin-bottom: 32px;
            }
            .parameter-box-title {
              font-family: monospace;
              font-size: 10px;
              color: #94a3b8;
              text-transform: uppercase;
              letter-spacing: 2px;
              margin-bottom: 16px;
              border-bottom: 1px solid #2e2d38;
              padding-bottom: 8px;
            }
            .parameter-item {
              margin-bottom: 14px;
              font-size: 14px;
            }
            .parameter-item:last-child {
              margin-bottom: 0;
            }
            .parameter-label {
              color: #94a3b8;
              font-weight: bold;
              font-family: monospace;
              text-transform: uppercase;
              font-size: 11px;
              letter-spacing: 1px;
              display: inline-block;
              width: 170px;
            }
            .parameter-value {
              color: #ffffff;
              font-weight: 700;
            }
            .btn-container {
              margin: 36px 0;
              text-align: left;
            }
            .btn {
              background-color: #FF6A1A;
              color: #000000 !important;
              text-decoration: none;
              font-weight: 900;
              font-size: 11px;
              text-transform: uppercase;
              letter-spacing: 2px;
              padding: 18px 32px;
              border-radius: 8px;
              display: inline-block;
              box-shadow: 0 10px 30px rgba(255, 106, 26, 0.3);
              transition: all 0.3s ease;
            }
            hr {
              border: 0;
              border-top: 1px solid #2e2d38;
              margin: 36px 0;
            }
            .signature-section {
              margin-top: 36px;
              font-size: 15px;
              color: #cbd5e1;
            }
            .signature-title {
              color: #94a3b8;
              font-size: 13px;
              margin-top: 4px;
            }
            .contact-info-grid {
              background-color: #050508;
              border: 1px dashed #2e2d38;
              border-radius: 12px;
              padding: 24px;
              margin-top: 40px;
            }
            .grid-title {
              font-family: monospace;
              font-size: 9px;
              color: #FF6A1A;
              text-transform: uppercase;
              letter-spacing: 3px;
              margin-bottom: 16px;
              font-weight: bold;
            }
            .contact-row {
              font-size: 13px;
              margin-bottom: 12px;
              color: #cbd5e1;
            }
            .contact-row:last-child {
              margin-bottom: 0;
            }
            .contact-label {
              font-family: monospace;
              color: #94a3b8;
              display: inline-block;
              width: 90px;
              text-transform: uppercase;
              letter-spacing: 1px;
            }
            .contact-value a {
              color: #ffffff;
              text-decoration: none;
              font-weight: 600;
            }
            .contact-value a:hover {
              color: #FF6A1A;
            }
            .footer-telemetry {
              margin-top: 24px;
              text-align: center;
              font-family: monospace;
              font-size: 9px;
              color: #64748b;
              letter-spacing: 2px;
              text-transform: uppercase;
              border-top: 1px solid #2e2d38;
              padding-top: 16px;
            }
          </style>
        </head>
        <body>
          <div class="wrapper">
            <div class="container">
              <div class="logo-section">
                <div class="logo">Cal<span>dev</span></div>
                <br />
                <span class="status-badge">Strategic Alignment Protocol</span>
              </div>
              <div class="timestamp">CONNECTION SECURE // ${currentDate}</div>
              
              <h1>Systems Scoping & Integration</h1>
              <p class="bold-intro">Hello,</p>
              <p>Thank you for initiating the systems architecture audit. Your vector inquiry has been securely logged in our operational queue.</p>
              <p>Based on your selections, we have initialized a preliminary review for the following parameters:</p>
              
              <div class="parameter-box">
                <div class="parameter-box-title">Selected Scoping Criteria</div>
                <div class="parameter-item">
                  <span class="parameter-label">Architecture Vector:</span>
                  <span class="parameter-value">${typeLabel}</span>
                </div>
                <div class="parameter-item">
                  <span class="parameter-label">Deployment Window:</span>
                  <span class="parameter-value">${timelineLabel}</span>
                </div>
                <div class="parameter-item">
                  <span class="parameter-label">Capital Range:</span>
                  <span class="parameter-value">${budgetLabel}</span>
                </div>
              </div>
              
              <h2>Philosophy & Negotiability</h2>
              <p>At Caldev Studio, we build premium, industrial-grade software and systems designed for absolute reliability, performance, and deterministic logic.</p>
              <p>Please note that every architectural ballpark select is fully flexible. We treat pricing and scoping as a highly collaborative, negotiable blueprint. We are committed to shaping our delivery models to align perfectly with your technical parameters and budget requirements.</p>
              
              <h2>Technical Alignment</h2>
              <p>To progress from parameter logging to active execution, we invite you to schedule a brief 15-minute technical alignment session directly with our systems architect, Kencalvin.</p>
              <p>During this session, we will deconstruct your performance bottlenecks, align on a negotiable contract model, and deliver a custom technical specification and architectural roadmap.</p>
              
              <div class="btn-container">
                <a href="https://calendly.com/kencalvin-caldev" class="btn">Book Technical Alignment Session</a>
              </div>
              
              <p>If you prefer to align via asynchronous text, simply reply directly to this email with your detailed technical specifications or blueprints.</p>
              
              <p>Logic is absolute. We look forward to engineering the future of your systems.</p>
              
              <div class="signature-section">
                Best regards,<br /><br />
                <strong>Kencalvin Mwenda</strong>
                <div class="signature-title">Lead Systems Architect & Founder<br />Caldev Engineering Studio</div>
              </div>
              
              <div class="contact-info-grid">
                <div class="grid-title">Contact & Coordinates</div>
                <div class="contact-row">
                  <span class="contact-label">Location:</span>
                  <span class="contact-value" style="color: #ffffff; font-weight: 600;">Nairobi, Kenya // London & Global</span>
                </div>
                <div class="contact-row">
                  <span class="contact-label">Advisory:</span>
                  <span class="contact-value"><a href="mailto:kencalvin@caldev.io">kencalvin@caldev.io</a></span>
                </div>
                <div class="contact-row">
                  <span class="contact-label">Operations:</span>
                  <span class="contact-value"><a href="mailto:cal-dev@zohomail.com">cal-dev@zohomail.com</a></span>
                </div>
                <div class="contact-row">
                  <span class="contact-label">Web Terminal:</span>
                  <span class="contact-value"><a href="https://kceecalvin.github.io" target="_blank">kceecalvin.github.io</a></span>
                </div>
                <div class="contact-row">
                  <span class="contact-label">LinkedIn:</span>
                  <span class="contact-value"><a href="https://www.linkedin.com/in/kencalvin-mwenda-a71752283" target="_blank">linkedin.com/in/kencalvin-mwenda</a></span>
                </div>
                <div class="contact-row">
                  <span class="contact-label">GitHub:</span>
                  <span class="contact-value"><a href="https://github.com/kceecalvin" target="_blank">github.com/kceecalvin</a></span>
                </div>
                <div class="contact-row">
                  <span class="contact-label">Instagram:</span>
                  <span class="contact-value"><a href="https://instagram.com/k._c_3" target="_blank">instagram.com/k._c_3</a></span>
                </div>
              </div>
              
              <div class="footer-telemetry">
                LOGIC_IS_ABSOLUTE // RELEASE_4.95.0 // © MMXXVI CALDEV
              </div>
            </div>
          </div>
        </body>
        </html>
      `
    };

    // 2. Send Admin Notification Email to Kencalvin
    const adminMailOptions = {
      from: `"CALDEV System" <${emailUser}>`,
      to: 'kencalvin@caldev.io',
      cc: emailUser,
      subject: `[LEAD_INGEST] New Strategic Scoping Vector: ${typeLabel}`,
      text: `
[LEAD INGESTED IN QUEUE]
Timestamp: ${currentDate} // UTC

Prospect Email: ${email}
Selected Parameters:
- Architecture Vector: ${typeLabel} (${type})
- Target Deployment Window: ${timelineLabel} (${timeline})
- Selected Capital Range: ${budgetLabel} (${budget})

Action Required:
- Review prospective lead details.
- Prepare technical scoping documentation.
- Monitor Calendly / Inbox for technical alignment booking.
      `
    };

    let zohoSuccess = false;
    let fallbackSuccess = false;
    let smtpErrorMsg = '';

    if (transporter) {
      try {
        // Send them individually so one failing does not block the other
        try {
          await transporter.sendMail(clientMailOptions);
          console.log(`Auto-response email successfully sent to prospective client: ${email}`);
        } catch (clientErr: any) {
          console.error('Failed to send auto-responder email to client:', clientErr);
          smtpErrorMsg += `Client mail failed: ${clientErr.message || clientErr}. `;
        }

        try {
          await transporter.sendMail(adminMailOptions);
          console.log('Admin notification email successfully sent to kencalvin@caldev.io');
        } catch (adminErr: any) {
          console.error('Failed to send notification email to admin:', adminErr);
          smtpErrorMsg += `Admin mail failed: ${adminErr.message || adminErr}. `;
        }

        zohoSuccess = true;
      } catch (err: any) {
        console.error('Zoho SMTP execution failed:', err);
        smtpErrorMsg = err.message || 'Zoho SMTP error';
      }
    } else {
      smtpErrorMsg = 'Zoho SMTP transporter not initialized (missing credentials)';
    }

    // Attempt Web3Forms fallback if Zoho SMTP was not successful
    if (!zohoSuccess && web3FormsKey) {
      try {
        console.log('Attempting fallback lead transmission via Web3Forms...');
        const web3Response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify({
            access_key: web3FormsKey,
            subject: `[FALLBACK] New Strategic Scoping Vector: ${typeLabel}`,
            from_name: 'CALDEV Engineering Studio',
            email: email,
            message: `
[LEAD INGESTED VIA FALLBACK]
Timestamp: ${currentDate} // UTC
Prospect Email: ${email}
Selected Parameters:
- Architecture Vector: ${typeLabel} (${type})
- Target Deployment Window: ${timelineLabel} (${timeline})
- Selected Capital Range: ${budgetLabel} (${budget})
            `
          })
        });
        const web3Data = await web3Response.json();
        if (web3Data.success) {
          fallbackSuccess = true;
          console.log('Web3Forms fallback transmission successful.');
        } else {
          console.error('Web3Forms fallback transmission failed:', web3Data);
        }
      } catch (fbErr: any) {
        console.error('Web3Forms fallback attempt failed:', fbErr);
      }
    }

    // Always return success status to frontend so the UI completes successfully
    return NextResponse.json({
      success: true,
      zohoSent: zohoSuccess,
      fallbackSent: fallbackSuccess,
      warning: zohoSuccess ? undefined : `SMTP failed: ${smtpErrorMsg}. Lead logged in server.`
    });
  } catch (error: any) {
    console.error('API endpoint crash handler:', error);
    return NextResponse.json({ success: true, fallback: true, warning: error.message || 'Internal endpoint error' });
  }
}
