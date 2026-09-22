"use client";
import { useState, type CSSProperties } from "react";
import Link from "next/link";
import { ArrowUpRight, RotateCcw, Sparkles } from "lucide-react";
const directions = [
  {
    id: "editorial",
    label: "Editorial",
    caption: "A little space. A clear point of view.",
    radius: 14,
  },
  {
    id: "electric",
    label: "Electric",
    caption: "A bold idea deserves a little volume.",
    radius: 28,
  },
  {
    id: "playful",
    label: "Playful",
    caption: "Useful can have a personality, too.",
    radius: 56,
  },
] as const;
export default function StudioPlayground() {
  const [active, setActive] = useState(1);
  const [radius, setRadius] = useState<number>(28);
  const choice = directions[active];
  const choose = (i: number) => {
    setActive(i);
    setRadius(directions[i].radius);
  };
  return (
    <section
      className="wrap studio-playground"
      aria-labelledby="playground-heading"
    >
      <div className="playground-copy">
        <span className="label">A LITTLE INTERACTION / JUST FOR YOU</span>
        <h2 id="playground-heading">
          Same idea.
          <br />
          <em>Different energy.</em>
        </h2>
        <p>
          Good design is a series of small decisions. Try a direction, shape the
          corners, and watch the whole feeling change.
        </p>
        <fieldset className="direction-control">
          <legend>Choose an art direction</legend>
          <div>
            {directions.map((d, i) => (
              <button
                type="button"
                key={d.id}
                aria-pressed={active === i}
                onClick={() => choose(i)}
              >
                {d.label}
              </button>
            ))}
          </div>
        </fieldset>
        <div className="corner-control">
          <label htmlFor="corner-radius">
            Shape the corners{" "}
            <output htmlFor="corner-radius">{radius}px</output>
          </label>
          <input
            id="corner-radius"
            type="range"
            min="0"
            max="64"
            step="2"
            value={radius}
            onChange={(e) => setRadius(Number(e.target.value))}
          />
          <div className="range-labels">
            <span>Precise</span>
            <span>Expressive</span>
          </div>
        </div>
        <div className="playground-actions">
          <Link href="/contact?type=Website" className="text-link">
            Let’s find your direction{" "}
            <ArrowUpRight size={17} aria-hidden="true" />
          </Link>
          <button
            className="reset-playground"
            type="button"
            onClick={() => choose(1)}
            aria-label="Reset design playground"
          >
            <RotateCcw size={17} aria-hidden="true" />
          </button>
        </div>
      </div>
      <div
        className={`playground-canvas direction-${choice.id}`}
        style={{ "--demo-radius": `${radius}px` } as CSSProperties}
      >
        <div className="canvas-grid" aria-hidden="true" />
        <div className="canvas-caption mono">
          <span>LIVE DESIGN STUDY</span>
          <span>0{active + 1} / 03</span>
        </div>
        <div className="demo-poster">
          <div className="poster-top">
            <span className="poster-monogram">c.</span>
            <span>
              AN IDEA
              <br />
              TAKING SHAPE
            </span>
            <Sparkles size={24} aria-hidden="true" />
          </div>
          <h3>
            Make room
            <br />
            for <em>good things.</em>
          </h3>
          <p>{choice.caption}</p>
          <div className="demo-poster-bottom">
            <span>YOUR NEXT CHAPTER</span>
            <span className="poster-arrow" aria-hidden="true">
              <ArrowUpRight size={26} />
            </span>
          </div>
        </div>
        <div className="demo-sticker" aria-hidden="true">
          why
          <br />
          <em>ordinary?</em>
        </div>
        <div className="canvas-footnote" role="status" aria-live="polite">
          {choice.label} direction · {radius}px corners · A live experiment
        </div>
      </div>
    </section>
  );
}
