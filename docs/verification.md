# Redesign verification — 22 September 2026

Local production preview: `http://localhost:3040`.

- ESLint and the production Next.js build passed.
- Three automated tests cover enquiry validation, HTML escaping/plain-text email and request-lab error handling.
- Browser checks visited the homepage, work index, three project pages, contact, profile, notes index and both articles at 320, 390, 768 and 1440 pixels: 40 page/viewport combinations. No horizontal overflow, broken images or browser errors were found in the final run.
- Project filters, mobile navigation, project switching, request-lab valid/invalid inputs, contact type preselection, validation, review/back navigation and the email-draft contents were exercised.
- Normal and reduced-motion browser contexts were checked. Escape closes the mobile navigation and returns focus to its toggle.
- A local SMTP sink verified owner-only email delivery, visitor Reply-To, plain-text/HTML alternatives, rejection of bad requests and failure handling. No external email was sent.
- The printable profile generated a PDF. Social image, icon, sitemap and robots endpoints returned successfully. The email template fit a 390px viewport.
- The dependency audit reported zero known vulnerabilities after updates.

The preview has no SMTP account configured, so it offers an email draft. No GitHub push or public deployment was performed. Tests used Chromium; cross-browser and real-device checks remain useful before publication.

## Ivory and blue theme refresh

The refreshed theme uses serif display headings, a floating capsule navigation, alternating rounded project-card corners, arched portrait frames and rounded form/email surfaces. The 40 page/viewport checks were rerun successfully after the change, with no overflow, broken images or browser errors. Keyboard navigation and the mobile email layout also passed.

A repeat-navigation image preload stall surfaced when moving from phone to desktop widths. The featured image now loads eagerly with high fetch priority instead of a separate preload. The resize/navigation checks passed after this change.

## Creative studio edition

The studio edition adds an oversized wordmark, layered featured-project display, draggable/spinnable sticker, staggered work gallery, citrus-accented services, a large footer signature and an interactive design study. The study includes Editorial, Electric and Playful presets, a keyboard-accessible corner-radius slider and reset.

The production build, ESLint and existing automated tests passed. All 40 page/viewport checks passed with no overflow, broken images or browser errors. The new controls were checked at 320, 390, 768 and 1440 pixels. Slider limits, reset, sticker rotation and spring-back dragging under normal motion passed, alongside reduced-motion checks. Contact navigation, printable profile, metadata endpoints and the mobile email layout were also rechecked.

## AlCOOl case study update — 11 November 2026

The homepage, work index and AlCOOl case study now use fresh public storefront captures. The case study explains the refreshed design, counter workflows and automatic daily Excel reports. The six-column report example is explicitly fictional; no private stock records, supplier prices, workbooks or staff details are published. Current release copy distinguishes live record keeping and delivery requests from locked online payments and the rider-app pilot.

ESLint, the production build and the three existing tests passed. Chromium checks covered the homepage, work index and AlCOOl case study at 320, 390, 768 and 1440 pixels with reduced motion: all 12 combinations passed, with no horizontal page overflow or browser errors. Both new screenshots decoded correctly, the report table retained six columns and supported horizontal scrolling on phones, and the live-store link was present. The reporting section was also inspected visually on phone and desktop. A stalled local image-optimizer request was cleared by restarting the preview before the successful final checks. No external messages or business transactions were sent.

The initial Vercel deployment rendered the new content but served a global CSS bundle without the new reporting rules. Reporting styles now load through an explicit component stylesheet. The production build and all 12 local browser checks passed again after that change; public deployment verification is required in addition to the local preview.
