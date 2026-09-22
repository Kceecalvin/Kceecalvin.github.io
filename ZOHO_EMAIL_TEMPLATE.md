# CALDEV email configuration

The portfolio now renders its owner notification in `src/lib/enquiry.ts`. See [email templates](docs/email-templates.md) for the current design and a manual follow-up draft.

Zoho SMTP remains an option: configure `EMAIL_USER`, `EMAIL_PASS`, `SMTP_HOST` and `SMTP_PORT` on the server using `.env.example`. Use the owner's verified mailbox. The contact route sends only to the configured owner inbox and sets the visitor as Reply-To. It does not create an automatic visitor response.
