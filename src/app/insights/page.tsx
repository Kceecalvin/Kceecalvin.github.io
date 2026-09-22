import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { articles } from "@/lib/data";
import ProjectCTA from "@/components/ProjectCTA";
export const metadata: Metadata = {
  title: "Engineering notes",
  description:
    "Notes on architecture, hardware and the systems behind the interface.",
};
export default function Notes() {
  return (
    <>
      <section className="wrap page-heading">
        <span className="label">FROM THE NOTEBOOK</span>
        <h1>
          Thinking beyond
          <br />
          <span className="accent">the screen.</span>
        </h1>
        <p>
          Longer reads on software architecture and connected systems. A place
          for the technical side of the work.
        </p>
      </section>
      <section
        className="wrap notes-page-list"
        aria-label="Engineering articles"
      >
        {articles.map((a) => (
          <Link className="note-row" href={`/insights/${a.slug}`} key={a.slug}>
            <span className="label">{a.category}</span>
            <div>
              <h2
                style={{
                  fontSize: 28,
                  letterSpacing: "-.035em",
                  marginBottom: 12,
                }}
              >
                {a.title}
              </h2>
              <p>{a.summary}</p>
              <span className="mono">{a.date}</span>
            </div>
            <ArrowUpRight size={24} />
          </Link>
        ))}
      </section>
      <ProjectCTA />
    </>
  );
}
