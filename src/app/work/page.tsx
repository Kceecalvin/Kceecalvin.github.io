import type { Metadata } from "next";
import ProjectGrid from "@/components/ProjectGrid";
import ProjectCTA from "@/components/ProjectCTA";
export const metadata: Metadata = {
  title: "Selected work",
  description:
    "Explore SeroTix, CEO Manuu and hands-on experiments by Kencalvin Mwenda.",
};
export default function Work() {
  return (
    <>
      <section className="wrap page-heading">
        <span className="label">THE PORTFOLIO / SELECTED WORK</span>
        <h1>
          Ideas made
          <br />
          <span className="accent">tangible.</span>
        </h1>
        <p>
          Live products, work in progress and experiments. Open a project to see
          the thinking behind the interface.
        </p>
      </section>
      <section className="wrap work-list" aria-label="Portfolio projects">
        <ProjectGrid />
      </section>
      <ProjectCTA />
    </>
  );
}
