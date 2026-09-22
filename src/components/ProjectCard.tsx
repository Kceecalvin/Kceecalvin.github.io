import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/lib/data";
export default function ProjectCard({
  project,
  index = 0,
}: {
  project: Project;
  index?: number;
}) {
  return (
    <article className={`project-card project-${project.slug}`}>
      <Link
        href={`/work/${project.slug}`}
        className="project-image-link"
        aria-label={`Explore ${project.title}`}
      >
        <div className="project-image">
          <div className="project-image-label">
            <span>
              0{index + 1} / {project.category}
            </span>
            <span>{project.status}</span>
          </div>
          <Image
            src={project.image}
            alt={project.alt}
            width={1440}
            height={1000}
            sizes="(max-width:760px) 90vw, 48vw"
          />
          <span className="project-open">
            <ArrowUpRight aria-hidden="true" size={23} />
          </span>
          {project.slug === "systems-lab" && (
            <span className="concept-label">
              CONCEPT ART · TRY THE LOCAL DEMO
            </span>
          )}
        </div>
      </Link>
      <div className="project-card-info">
        <div>
          <span className="label">{project.category}</span>
          <h3>
            <Link href={`/work/${project.slug}`}>{project.title}</Link>
          </h3>
        </div>
        <span className="mono">{project.stack.slice(0, 2).join(" / ")}</span>
      </div>
      <p>{project.summary}</p>
    </article>
  );
}
