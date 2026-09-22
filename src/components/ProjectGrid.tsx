"use client";
import { useState } from "react";
import { projects } from "@/lib/data";
import ProjectCard from "./ProjectCard";
const categories = [
  "All work",
  "Web platforms",
  "Brand experiences",
  "Experiments",
];
export default function ProjectGrid() {
  const [category, setCategory] = useState("All work");
  const visible = projects.filter(
    (p) => category === "All work" || p.category === category,
  );
  return (
    <>
      <div
        className="project-filters"
        role="group"
        aria-label="Filter projects"
      >
        {categories.map((c) => (
          <button
            key={c}
            aria-pressed={category === c}
            onClick={() => setCategory(c)}
          >
            {c}
          </button>
        ))}
      </div>
      <p className="results-count" role="status">
        {visible.length} {visible.length === 1 ? "project" : "projects"}
      </p>
      <div className="project-grid">
        {visible.map((p) => (
          <ProjectCard key={p.slug} project={p} index={projects.indexOf(p)} />
        ))}
      </div>
    </>
  );
}
