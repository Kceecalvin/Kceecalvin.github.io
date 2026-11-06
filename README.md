# CALDEV portfolio

A product-first portfolio for Kencalvin Mwenda, built with Next.js App Router, TypeScript, local fonts and Framer Motion. The studio identity pairs oversized blue lettering with warm ivory, citrus accents, layered project previews and sculpted surfaces. An interactive playground demonstrates three art directions and adjustable corners, while a draggable sticker adds a small physical interaction. Includes selected project pages, a browser-only request validation lab, engineering articles, a printable profile and a three-step project enquiry.

## Local development

Use Node 22.18 or newer (Node 24 recommended). With nvm, run `nvm use` to select the version in `.nvmrc`.

```sh
npm install
npm run dev -- --port 3040
```

```sh
npm run lint
npm test
npm run build
npm start -- --port 3040
```

## Contact delivery

Copy `.env.example` to `.env.local` and configure the owner's SMTP account to enable server delivery. `CONTACT_TO_EMAIL` defaults to `EMAIL_USER`. Credentials stay on the server. The form sends one email to the owner with the visitor as Reply-To; it does not send automatic replies to visitors. Missing configuration uses an explicit email draft flow. SMTP failures keep the brief available for retry or copying. Test configuration with an SMTP sandbox before enabling real delivery.

The API validates project choices, contact fields and length limits, rejects cross-origin requests, and escapes HTML in email. Honeypot checks provide basic spam filtering; use hosting-level request rate limits before exposing a busy public inbox.

## Content and assets

Project labels distinguish AlCOOl (live storefront and staff records; delivery payment and dispatch gated), SeroTix (live product), CEO Manuu (redesign in development), and the request lab (local demo). Screenshots under `public/work` are captured from the actual projects. The request lab's artwork is an existing concept illustration, labelled as such. The existing portrait and original MDX article bodies are preserved. Article narratives and historical results are author-supplied and were not independently verified during this redesign. Review those claims before publication.

Local Lato fonts include their license in `src/app/fonts/LATO-LICENSE.txt`. No remote font dependency. Native scrolling and reduced-motion settings are respected. The canonical URL remains `https://cal-dev.me`.

## Hosting

The contact endpoint requires a Node-compatible Next.js host. GitHub Pages cannot run the SMTP endpoint. This branch is a local redesign; no production deployment is performed by building or previewing it.
