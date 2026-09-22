"use client";
import { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, Mail } from "lucide-react";
import {
  projectTypes,
  budgets,
  timelines,
  enquirySchema,
  enquiryText,
  type Enquiry,
} from "@/lib/enquiry";
import { profile } from "@/lib/data";
export default function EnquiryForm({
  initialType,
  canSend,
}: {
  initialType?: string;
  canSend: boolean;
}) {
  const [step, setStep] = useState(0),
    [sending, setSending] = useState(false),
    [sent, setSent] = useState(false),
    [error, setError] = useState(""),
    [draft, setDraft] = useState(false),
    [copied, setCopied] = useState(false);
  const [data, setData] = useState<Enquiry>({
    type: projectTypes.includes(initialType as Enquiry["type"])
      ? (initialType as Enquiry["type"])
      : "Website",
    budget: "Not sure yet",
    timeline: "Flexible",
    name: "",
    email: "",
    message: "",
    website: "",
  });
  const title = useRef<HTMLHeadingElement>(null);
  const move = (next: number) => {
    setStep(next);
    setError("");
    setDraft(false);
    setCopied(false);
    requestAnimationFrame(() => {
      title.current?.focus();
    });
  };
  const set = <K extends keyof Enquiry>(key: K, value: Enquiry[K]) => {
    setData((previous) => ({ ...previous, [key]: value }));
    setError("");
    setDraft(false);
    setCopied(false);
  };
  const mailto = () =>
    `mailto:${profile.email}?subject=${encodeURIComponent(`Project enquiry: ${data.type}`)}&body=${encodeURIComponent(enquiryText(data))}`;
  const validate = () => {
    const result = enquirySchema.safeParse(data);
    if (!result.success) {
      setError(result.error.issues[0].message);
      return false;
    }
    return true;
  };
  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (sending) return;
    if (step === 0) {
      move(1);
      return;
    }
    if (step === 1) {
      if (validate()) move(2);
      return;
    }
    if (!validate()) return;
    if (!canSend) {
      setDraft(true);
      window.location.href = mailto();
      return;
    }
    setSending(true);
    setError("");
    try {
      const response = await fetch("/api/engage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (!response.ok)
        throw new Error(result.error || "Could not send your enquiry.");
      setSent(true);
    } catch (e) {
      setError(
        e instanceof Error
          ? e.message
          : "Could not send your enquiry. Please try the email draft.",
      );
    } finally {
      setSending(false);
    }
  }
  if (sent)
    return (
      <div className="enquiry-success" role="status">
        <span className="success-icon">
          <Check size={34} />
        </span>
        <span className="label">ENQUIRY DELIVERED</span>
        <h2>
          Let’s make
          <br />
          something good.
        </h2>
        <p>
          Thanks, {data.name}. Your project details have reached the inbox. I’ll
          reply to {data.email} to continue the conversation.
        </p>
        <Link className="button" href="/work">
          Explore the work <ArrowUpRight size={17} />
        </Link>
      </div>
    );
  return (
    <form className="enquiry-form" onSubmit={submit} noValidate>
      <ol className="form-progress" aria-label="Enquiry progress">
        {["The idea", "The details", "Review"].map((label, i) => (
          <li
            className={i <= step ? "active" : ""}
            aria-current={step === i ? "step" : undefined}
            key={label}
          >
            <span>{i < step ? <Check size={13} /> : i + 1}</span>
            {label}
          </li>
        ))}
      </ol>
      <h2 ref={title} tabIndex={-1}>
        {
          ["What are we building?", "Tell me a little more.", "Looking good?"][
            step
          ]
        }
      </h2>
      {step === 0 ? (
        <>
          <p className="form-intro">
            Pick the closest fit. We can work out the details together.
          </p>
          <fieldset>
            <legend>Project type</legend>
            <div className="type-options">
              {projectTypes.map((t) => (
                <label className={data.type === t ? "selected" : ""} key={t}>
                  <input
                    type="radio"
                    name="type"
                    value={t}
                    checked={data.type === t}
                    onChange={() => set("type", t)}
                  />
                  <span>{t}</span>
                  <ArrowUpRight size={16} />
                </label>
              ))}
            </div>
          </fieldset>
          <div className="form-two">
            <label>
              Budget range
              <select
                value={data.budget}
                onChange={(e) =>
                  set("budget", e.target.value as Enquiry["budget"])
                }
              >
                {budgets.map((b) => (
                  <option key={b}>{b}</option>
                ))}
              </select>
            </label>
            <label>
              Ideal timeline
              <select
                value={data.timeline}
                onChange={(e) =>
                  set("timeline", e.target.value as Enquiry["timeline"])
                }
              >
                {timelines.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </label>
          </div>
          <p className="field-hint">
            Budget ranges help scope the conversation. They aren’t a quote.
          </p>
        </>
      ) : step === 1 ? (
        <>
          <p className="form-intro">
            Who is it for, and what would you like it to do?
          </p>
          <div className="form-two">
            <label>
              Your name
              <input
                name="name"
                autoComplete="name"
                value={data.name}
                onChange={(e) => set("name", e.target.value)}
                required
                maxLength={100}
                placeholder="Your name"
              />
            </label>
            <label>
              Email address
              <input
                name="email"
                type="email"
                autoComplete="email"
                value={data.email}
                onChange={(e) => set("email", e.target.value)}
                required
                maxLength={254}
                placeholder="you@example.com"
              />
            </label>
          </div>
          <label>
            About your project
            <textarea
              name="message"
              value={data.message}
              onChange={(e) => set("message", e.target.value)}
              required
              minLength={20}
              maxLength={3000}
              rows={6}
              placeholder="The idea, your audience, and what a useful outcome would look like…"
              aria-describedby="message-hint"
            />
          </label>
          <span className="field-hint" id="message-hint">
            At least 20 characters · {data.message.length}/3,000
          </span>
          <div className="honeypot" aria-hidden="true">
            <label>
              Leave this field empty
              <input
                name="website"
                tabIndex={-1}
                autoComplete="off"
                value={data.website}
                onChange={(e) => set("website", e.target.value)}
              />
            </label>
          </div>
        </>
      ) : (
        <>
          <p className="form-intro">
            A starting point for a conversation. No commitment required.
          </p>
          <dl className="review-details">
            <div>
              <dt>Project</dt>
              <dd>{data.type}</dd>
            </div>
            <div>
              <dt>Budget</dt>
              <dd>{data.budget}</dd>
            </div>
            <div>
              <dt>Timeline</dt>
              <dd>{data.timeline}</dd>
            </div>
            <div>
              <dt>From</dt>
              <dd>
                {data.name}
                <br />
                {data.email}
              </dd>
            </div>
          </dl>
          <div className="review-message">{data.message}</div>
          <p className="delivery-note">
            <Mail size={18} />
            <span>
              {canSend
                ? "Your details will be emailed privately to Kencalvin to discuss this project."
                : "This preview opens a prepared draft in your email app. You review and send it there."}
            </span>
          </p>
        </>
      )}
      {error && (
        <p className="form-error" role="alert">
          {error}
        </p>
      )}
      {draft && (
        <p className="draft-notice" role="status">
          Your email app should open with the details. The enquiry is only sent
          when you send that email. You can also copy your brief below.
        </p>
      )}
      <div className="form-actions">
        {step > 0 && (
          <button
            className="text-link"
            type="button"
            disabled={sending}
            onClick={() => move(step - 1)}
          >
            <ArrowLeft size={16} /> Back
          </button>
        )}
        <button className="button primary" type="submit" disabled={sending}>
          {step < 2
            ? "Continue"
            : sending
              ? "Sending…"
              : canSend
                ? "Send enquiry"
                : "Open email draft"}
          <ArrowRight size={17} />
        </button>
      </div>
      {step === 2 && (
        <div className="email-alternative">
          <a href={mailto()} onClick={() => setDraft(true)}>
            Use an email draft
          </a>
          <button
            type="button"
            onClick={async () => {
              try {
                await navigator.clipboard.writeText(enquiryText(data));
                setDraft(false);
                setError("");
                setCopied(true);
              } catch {
                setError(
                  "Copy is unavailable in this browser. Select the brief text above or use the email draft.",
                );
              }
            }}
            id="copy-brief"
          >
            {copied ? "Brief copied" : "Copy project brief"}
          </button>
        </div>
      )}
    </form>
  );
}
