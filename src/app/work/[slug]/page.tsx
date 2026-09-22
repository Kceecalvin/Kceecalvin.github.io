import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { projects } from "@/lib/data";
import ProjectCTA from "@/components/ProjectCTA";
import RequestLab from "@/components/RequestLab";
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  return {
    title: project?.title ?? "Project not found",
    description: project?.summary,
  };
}
export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = projects.find((p) => p.slug === slug);
  if (!p) notFound();
  const next = projects[(projects.indexOf(p) + 1) % projects.length];
  return (
    <>
      <section className="wrap case-heading">
        <Link href="/work" className="text-link">
          <ArrowLeft size={16} /> All work
        </Link>
        <div className="case-title">
          <div>
            <span className="label">
              {p.category} / {p.status}
            </span>
            <h1>
              {p.title}
              <span className="accent">.</span>
            </h1>
          </div>
          <p>{p.headline}</p>
        </div>
        <div className="case-meta">
          <div>
            <span className="label">FOCUS</span>
            <span>{p.role}</span>
          </div>
          <div>
            <span className="label">TOOLKIT</span>
            <span>{p.stack.join(" · ")}</span>
          </div>
          <div>
            <span className="label">EXPLORE</span>
            {p.href ? (
              <a
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-link"
              >
                Visit live product <ArrowUpRight size={17} />
                <span className="sr-only"> (opens in new tab)</span>
              </a>
            ) : p.repository ? (
              <a
                href={p.repository}
                target="_blank"
                rel="noopener noreferrer"
                className="text-link"
              >
                View repository <ArrowUpRight size={17} />
                <span className="sr-only"> (opens in new tab)</span>
              </a>
            ) : (
              <a href="#interactive-lab" className="text-link">
                Try the demo ↓
              </a>
            )}
          </div>
        </div>
      </section>
      <figure
        className={`wrap case-image ${p.slug === "systems-lab" ? "case-concept" : ""}`}
      >
        <Image
          src={p.image}
          alt={p.alt}
          width={p.slug === "systems-lab" ? 1024 : 1440}
          height={p.slug === "systems-lab" ? 1024 : 1000}
          sizes="(max-width:760px) 92vw, 1200px"
          preload
        />
        <figcaption>
          {p.slug === "systems-lab"
            ? "Concept illustration. The working browser demo is below."
            : p.slug === "ceo-manuu"
              ? "Preview of the portfolio redesign in development."
              : "SeroTix homepage — an actual product preview."}
        </figcaption>
      </figure>
      <section className="wrap section case-overview">
        <div>
          <span className="label">THE IDEA</span>
          <h2>{p.headline}</h2>
        </div>
        <div>
          <p className="lead">{p.overview}</p>
          <p>{p.summary}</p>
        </div>
      </section>
      <section className="wrap case-decisions">
        <span className="label">DESIGN & DEVELOPMENT DECISIONS</span>
        <div className="process-grid">
          {p.decisions.map((d, i) => (
            <div className="process-step" key={d.title}>
              <span className="process-number">0{i + 1}</span>
              <h3>{d.title}</h3>
              <p>{d.text}</p>
            </div>
          ))}
        </div>
      </section>
      {p.slug === "serotix" && (
        <section className="wrap section product-details">
          <div>
            <span className="label">DISCOVERY THAT FEELS PERSONAL</span>
            <h2>
              Find the night
              <br />
              that fits.
            </h2>
            <p>
              The Find My Vibe flow helps visitors explore events through a few
              simple choices. On mobile, the focus stays on the next useful
              action.
            </p>
            <Image
              src="/work/serotix-vibe.png"
              alt="SeroTix Find My Vibe event discovery quiz"
              width={1440}
              height={1000}
              sizes="(max-width:760px) 90vw, 65vw"
            />
          </div>
          <div className="phone-preview">
            <Image
              src="/work/serotix-mobile.png"
              alt="SeroTix homepage on a mobile screen"
              width={390}
              height={844}
              sizes="300px"
            />
          </div>
        </section>
      )}
      {p.slug === "systems-lab" && (
        <div className="wrap section" id="interactive-lab">
          <RequestLab />
        </div>
      )}
      <div className="wrap next-project">
        <span className="label">NEXT PROJECT</span>
        <Link href={`/work/${next.slug}`}>
          {next.title}
          <ArrowUpRight size={35} />
        </Link>
      </div>
      <ProjectCTA />
    </>
  );
}
