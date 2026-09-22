# CALDEV implementation checks

Updated 22 September 2026 for the portfolio redesign. This is an implementation record, not a penetration-test certification.

- The contact endpoint uses fixed project choices, bounded text fields and email validation.
- Cross-origin browser submissions and non-JSON requests are rejected.
- JSON request bodies are limited to 20 KB; the enquiry text is limited to 3,000 characters.
- A honeypot field rejects simple automated submissions.
- SMTP credentials stay in server environment variables. Only the example configuration is tracked.
- Owner notifications escape user content in HTML and include a plain-text alternative. Visitor input cannot choose the destination inbox.
- Visitor addresses are used only as Reply-To; the route sends no visitor auto-reply.
- Delivery failures return an error; missing SMTP configuration exposes an explicit email-draft option.
- Browser headers prevent framing and MIME sniffing and restrict camera, microphone and geolocation access.
- Dependency audit reported zero known vulnerabilities after the dependency updates. This reflects the audit database at the time of the check.

A local SMTP sink verified a single owner-only delivery, reply address, HTML/text alternatives and failure handling without sending external email. Request validation, origin rejection, payload limits and unconfigured fallback were exercised.

Before public deployment, configure hosting-level rate limits for the contact endpoint and verify the selected owner's mailbox with a sandbox. The current honeypot is basic filtering, not comprehensive abuse prevention. Article case-study claims are retained from the source repository and need the author's review.
