"use client";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, CornerDownRight } from "lucide-react";
import { useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import { projects } from "@/lib/data";
export default function HeroPreview() {
  const [active, setActive] = useState(0);
  const [turns, setTurns] = useState(0);
  const project = projects[active];
  const bounds = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0),
    y = useMotionValue(0);
  const rx = useSpring(x, { stiffness: 90, damping: 24 }),
    ry = useSpring(y, { stiffness: 90, damping: 24 });
  const reduced = useReducedMotion();
  return (
    <div
      className="hero-preview project-stage"
      ref={bounds}
      onPointerMove={(e) => {
        if (reduced || e.pointerType !== "mouse" || e.buttons) return;
        const r = e.currentTarget.getBoundingClientRect();
        x.set(-((e.clientY - r.top) / r.height - 0.5) * 5);
        y.set(((e.clientX - r.left) / r.width - 0.5) * 5);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      <div className="stage-backplate" aria-hidden="true" />
      <div className="stage-outline" aria-hidden="true" />
      <div className="stage-annotation">
        <CornerDownRight size={25} aria-hidden="true" />
        <span>
          A FEW THINGS
          <br />
          I’VE BEEN BUILDING
        </span>
      </div>
      <motion.div className="hero-window" style={{ rotateX: rx, rotateY: ry }}>
        <div className="window-toolbar">
          <span className="window-dots" aria-hidden="true">
            ● ● ●
          </span>
          <span>THE WORK / 0{active + 1}</span>
          <span className="window-tag">{project.status}</span>
        </div>
        <Link href={`/work/${project.slug}`} className="hero-product-link">
          <Image
            key={project.image}
            src={project.image}
            alt={project.alt}
            width={1440}
            height={1000}
            loading="eager"
            fetchPriority="high"
            sizes="(max-width:760px) 95vw, 55vw"
          />
          <span className="hero-product-caption">
            <span>
              <small>{project.category}</small>
              <strong>{project.title}</strong>
            </span>
            <span className="round-arrow">
              <ArrowUpRight size={22} aria-hidden="true" />
            </span>
          </span>
        </Link>
      </motion.div>
      <motion.button
        type="button"
        className="studio-sticker"
        drag
        dragConstraints={bounds}
        dragSnapToOrigin
        dragElastic={0.12}
        animate={{ rotate: turns * 45 - 12 }}
        transition={{ duration: reduced ? 0 : 0.4 }}
        whileDrag={{ scale: 1.05 }}
        onClick={() => setTurns((t) => t + 1)}
        aria-label="Spin the studio sticker"
      >
        <span aria-hidden="true">✳</span>
        <small>DRAG / SPIN</small>
      </motion.button>
      <div className="stage-index">
        <span className="mono">CURATED, NOT COMPLICATED.</span>
        <div
          className="preview-switch"
          role="group"
          aria-label="Choose a featured project"
        >
          {projects.slice(0, 2).map((p, i) => (
            <button
              key={p.slug}
              aria-pressed={active === i}
              onClick={() => setActive(i)}
            >
              <span className="switch-dot" />
              {p.title}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
