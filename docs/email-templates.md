# CALDEV project emails

The current website sends one owner notification from `src/lib/enquiry.ts`. It includes the project type, budget, timeline, visitor's name and address, and brief. The HTML uses the portfolio's ivory and deep-blue identity, a narrow responsive layout and escaped visitor content. A plain-text version is sent alongside it.

The visitor is the Reply-To address, not an outbound recipient. No automatic acknowledgement is sent. The local preview offers an email draft when SMTP is not configured.

## Manual follow-up draft

Use after reading the enquiry and replace the bracketed details before sending.

Subject: Your [project type] enquiry — CALDEV

Hi [Name],

Thanks for sharing your idea. I’ve read your brief about [specific project goal].

To understand the scope, could you tell me [one or two relevant questions]?

Once we’ve clarified that, I can suggest an approach and discuss the timeline and cost with you.

Kencalvin Mwenda
CALDEV · https://cal-dev.me

## Configuration and testing

See `.env.example` and the README. Keep SMTP credentials server-side. Use a local SMTP sink or sandbox mailbox to preview delivery; no real visitor emails are needed. A failed send must leave the enquiry editable and offer an email draft.
