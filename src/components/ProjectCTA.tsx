import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
export default function ProjectCTA() {
  return (
    <section className="wrap project-cta studio-cta">
      <span className="cta-flower" aria-hidden="true">
        ✳
      </span>
      <div>
        <span className="label">HAVE SOMETHING IN MIND?</span>
        <h2>
          Let’s make it
          <br />
          <span className="accent">worth building.</span>
        </h2>
        <p>
          A new website, a product idea, or something that needs to work better.
        </p>
      </div>
      <Link href="/contact" className="large-cta" aria-label="Start a project">
        <ArrowUpRight aria-hidden="true" size={43} />
        <span>Start a project</span>
      </Link>
    </section>
  );
}
