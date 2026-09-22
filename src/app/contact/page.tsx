import type { Metadata } from "next";
import { ArrowUpRight, Mail } from "lucide-react";
import EnquiryForm from "@/components/EnquiryForm";
import { profile } from "@/lib/data";
export const metadata: Metadata = {
  title: "Start a project",
  description:
    "Tell Kencalvin about your website, web application or next product idea.",
};
export default async function Contact({
  searchParams,
}: {
  searchParams: Promise<{ type?: string }>;
}) {
  const { type } = await searchParams;
  return (
    <section className="wrap contact-page section">
      <div className="contact-copy">
        <span className="label">A GOOD PROJECT STARTS WITH A CONVERSATION</span>
        <h1>
          Your idea.
          <br />
          <span className="accent">
            Our next
            <br />
            conversation.
          </span>
        </h1>
        <p className="lead">
          Tell me what you have in mind. We’ll explore what it needs and whether
          we’re a good fit.
        </p>
        <a className="contact-email" href={`mailto:${profile.email}`}>
          <Mail size={19} />
          {profile.email}
          <ArrowUpRight size={16} />
        </a>
        <div className="contact-expect">
          <span className="label">WHAT HAPPENS NEXT?</span>
          <p>
            I’ll review your brief, follow up with questions, and discuss a
            scope before any work begins.
          </p>
          <span className="mono">NAIROBI, KENYA · REMOTE COLLABORATION</span>
        </div>
      </div>
      <EnquiryForm
        initialType={type}
        canSend={Boolean(process.env.EMAIL_USER && process.env.EMAIL_PASS)}
      />
    </section>
  );
}
