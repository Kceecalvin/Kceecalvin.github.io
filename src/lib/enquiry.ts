import { z } from "zod";
export const projectTypes = [
  "Website",
  "Web application",
  "Integration",
  "Improve an existing project",
  "Something else",
] as const;
export const budgets = [
  "Not sure yet",
  "Under KES 50,000",
  "KES 50,000–150,000",
  "KES 150,000–350,000",
  "KES 350,000+",
] as const;
export const timelines = [
  "Flexible",
  "Within a month",
  "1–3 months",
  "Exploring for now",
] as const;
export const enquirySchema = z.object({
  type: z.enum(projectTypes),
  budget: z.enum(budgets),
  timeline: z.enum(timelines),
  name: z.string().trim().min(2, "Please enter your name.").max(100),
  email: z.email("Please enter a valid email address.").max(254),
  message: z
    .string()
    .trim()
    .min(20, "Please share at least 20 characters about your idea.")
    .max(3000),
  website: z.string().max(0).optional(),
});
export type Enquiry = z.infer<typeof enquirySchema>;
export function enquiryText(e: Enquiry) {
  return `New CALDEV project enquiry\n\nName: ${e.name}\nEmail: ${e.email}\nProject: ${e.type}\nBudget: ${e.budget}\nTimeline: ${e.timeline}\n\n${e.message}`;
}
const escapeHtml = (s: string) =>
  s.replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ]!,
  );
export function enquiryHtml(e: Enquiry) {
  return `<!doctype html><html><body style="margin:0;background:#f7f6f2;color:#172748;font-family:Arial,sans-serif"><table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td style="padding:32px 16px"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:auto;background:#fff;border-radius:24px;overflow:hidden"><tr><td style="padding:32px;border-radius:24px 24px 0 0;background:#172748;border-top:4px solid #e2f39a;color:#fff"><span style="font-size:26px;font-weight:bold">cal<span style="color:#e2f39a">dev</span> ↗</span><p style="font-size:12px;letter-spacing:2px;color:#ccd8f5">NEW PROJECT ENQUIRY</p><h1 style="font-family:Georgia,serif;font-weight:normal;font-size:34px;line-height:1.2;margin-bottom:0">Something worth building.</h1></td></tr><tr><td style="padding:32px"><h2 style="font-size:22px">${escapeHtml(e.type)}</h2><p><b>From</b><br>${escapeHtml(e.name)} · ${escapeHtml(e.email)}</p><p><b>Budget</b><br>${escapeHtml(e.budget)}</p><p><b>Timeline</b><br>${escapeHtml(e.timeline)}</p><div style="padding:20px;border-radius:12px;background:#edf1fc;border-left:3px solid #e2f39a;white-space:pre-wrap;overflow-wrap:anywhere">${escapeHtml(e.message)}</div><p style="margin-top:28px;font-size:13px;color:#5b6c87">Reply to this email to continue the conversation with ${escapeHtml(e.name)}.</p></td></tr><tr><td style="padding:20px 32px;border-top:1px solid #d7dfed;font-size:12px;color:#5b6c87">CALDEV · Kencalvin Mwenda · Nairobi, Kenya</td></tr></table></td></tr></table></body></html>`;
}
