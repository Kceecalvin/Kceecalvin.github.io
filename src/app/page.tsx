import Image from "next/image";
import Link from "next/link";
import {
  ArrowDown,
  ArrowUpRight,
  Braces,
  Layers,
  Monitor,
  Sparkles,
} from "lucide-react";
import HeroPreview from "@/components/HeroPreview";
import StudioPlayground from "@/components/StudioPlayground";
import ProjectCard from "@/components/ProjectCard";
import ProjectCTA from "@/components/ProjectCTA";
import Reveal from "@/components/Reveal";
import { articles, projects, profile } from "@/lib/data";
const services = [
  {
    icon: Monitor,
    title: "Websites with presence.",
    text: "A clear story, considered design and a responsive experience that makes your next step obvious.",
    type: "Website",
    tags: "PORTFOLIOS / BUSINESS WEBSITES",
  },
  {
    icon: Layers,
    title: "Products with purpose.",
    text: "Turn a useful idea into an interface people can understand, explore and return to.",
    type: "Web application",
    tags: "WEB APPS / PRODUCT INTERFACES",
  },
  {
    icon: Braces,
    title: "Systems that connect.",
    text: "Thoughtful APIs, data flows and integrations to bring the moving parts of your business together.",
    type: "Integration",
    tags: "APIS / BACKEND DEVELOPMENT",
  },
  {
    icon: Sparkles,
    title: "Better, down to the detail.",
    text: "Refine an existing experience: mobile layouts, accessibility, interactions and the paths that matter.",
    type: "Improve an existing project",
    tags: "REDESIGNS / UX REFINEMENT",
  },
];
export default function Home() {
  return (
    <>
      <section className="wrap studio-hero" aria-labelledby="studio-title">
        <div className="studio-topline">
          <span>
            <span className="status-dot" />
            INDEPENDENT DESIGN & DEVELOPMENT
          </span>
          <span>NAIROBI, KENYA / A WORLD OF POSSIBILITIES</span>
        </div>
        <h1 className="studio-wordmark" id="studio-title">
          <span>CALDEV</span>
          <span className="wordmark-flower" aria-hidden="true">
            ✳
          </span>
          <span className="sr-only">
            {" "}
            — Kencalvin Mwenda, designer and developer
          </span>
        </h1>
        <div className="studio-hero-grid">
          <div className="hero-copy">
            <span className="label">
              KENCALVIN MWENDA / THE PERSON BEHIND THE PIXELS
            </span>
            <h2>
              A little different.
              <br />
              <em>By design.</em>
            </h2>
            <p>
              I turn good ideas into websites and digital experiences with a
              point of view. Thoughtful on the inside. Hard to scroll past.
            </p>
            <div className="button-row">
              <Link className="button primary" href="/work">
                Explore my work <ArrowUpRight size={18} aria-hidden="true" />
              </Link>
              <Link className="text-link" href="/contact">
                Let’s talk <ArrowUpRight size={16} aria-hidden="true" />
              </Link>
            </div>
            <div className="hero-location">
              <span className="mono">
                DESIGN IS THE FEELING.
                <br />
                DEVELOPMENT MAKES IT REAL.
              </span>
              <a href="#work" aria-label="Scroll to selected work">
                <ArrowDown size={18} aria-hidden="true" />
              </a>
            </div>
          </div>
          <HeroPreview />
        </div>
      </section>
      <div className="discipline-strip">
        <div className="wrap">
          <span>GOOD DESIGN.</span>
          <span className="accent">✳</span>
          <span>THOUGHTFUL CODE.</span>
          <span className="accent">✳</span>
          <span>REAL PRODUCTS.</span>
          <span className="accent">✳</span>
          <span>SMALL DETAILS.</span>
        </div>
      </div>
      <section id="work" className="wrap section">
        <Reveal>
          <div className="section-heading">
            <div>
              <span className="label">01 / SELECTED WORK</span>
              <h2>
                Less explaining.
                <br />
                <span className="muted">More exploring.</span>
              </h2>
            </div>
            <div className="heading-side">
              <p>
                A closer look at the products, people and ideas I’m bringing to
                the web.
              </p>
              <Link className="text-link" href="/work">
                All work & experiments <ArrowUpRight size={17} />
              </Link>
            </div>
          </div>
        </Reveal>
        <div className="project-grid">
          {projects.slice(0, 2).map((project, index) => (
            <Reveal key={project.slug}>
              <ProjectCard project={project} index={index} />
            </Reveal>
          ))}
        </div>
        <Link href="/work/systems-lab" className="lab-banner">
          <span className="lab-symbol" aria-hidden="true">
            {"{ }"}
          </span>
          <div>
            <span className="label">A LITTLE UNDER THE HOOD</span>
            <h3>Open the request lab.</h3>
            <p>A hands-on experiment in validation and clear feedback.</p>
          </div>
          <span className="round-arrow">
            <ArrowUpRight size={22} />
          </span>
        </Link>
      </section>
      <section id="services" className="services-section section">
        <div className="wrap">
          <Reveal>
            <div className="section-heading">
              <div>
                <span className="label">02 / WHAT I CAN HELP WITH</span>
                <h2>
                  Good ideas deserve
                  <br />
                  <span className="muted">good execution.</span>
                </h2>
              </div>
              <p className="heading-side">
                A focused partner for the design, development and refinement of
                your next project.
              </p>
            </div>
          </Reveal>
          <div className="services-grid">
            {services.map((s, i) => (
              <Link
                href={`/contact?type=${encodeURIComponent(s.type)}`}
                className="service-card"
                key={s.title}
              >
                <div className="service-top">
                  <s.icon size={28} />
                  <span className="mono">0{i + 1}</span>
                </div>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
                <div className="service-bottom">
                  <span className="mono">{s.tags}</span>
                  <ArrowUpRight size={22} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <StudioPlayground />
      <section id="about" className="wrap section about-section">
        <Reveal className="portrait-frame">
          <Image
            src="/assets/founder.jpg"
            alt="Kencalvin Mwenda, the developer behind CALDEV"
            width={720}
            height={1280}
            sizes="(max-width:760px) 90vw, 38vw"
          />
          <div className="portrait-caption">
            <span>Kencalvin Mwenda</span>
            <span className="mono">THE PERSON BEHIND CALDEV ↗</span>
          </div>
          <span className="portrait-sticker" aria-hidden="true">
            Ideas.
            <br />
            Into
            <br />
            <span>interfaces.</span>
          </span>
        </Reveal>
        <Reveal className="about-copy">
          <span className="label">03 / A LITTLE ABOUT ME</span>
          <h2>
            Curious by nature.
            <br />
            <span className="muted">Builder by choice.</span>
          </h2>
          <p className="lead">
            I’m Kencalvin, a developer in Nairobi with an eye for design and an
            interest in how things work.
          </p>
          <p>
            I like the space where a useful idea becomes something you can
            actually use. That means thinking about the interface, the systems
            behind it, and how the whole experience feels on a phone.
          </p>
          <p>
            CALDEV is where I bring that work together: websites, product
            interfaces, engineering experiments and notes from the process.
          </p>
          <div className="stack-list">
            <div>
              <span className="label">INTERFACES</span>
              <span>React · Next.js · TypeScript</span>
            </div>
            <div>
              <span className="label">BEHIND THE SCENES</span>
              <span>Python · Django · APIs</span>
            </div>
            <div>
              <span className="label">THE DETAILS</span>
              <span>Responsive design · Motion · Accessibility</span>
            </div>
          </div>
          <Link href="/cv" className="text-link">
            More about my background <ArrowUpRight size={17} />
          </Link>
        </Reveal>
      </section>
      <section className="wrap section process-section">
        <div className="section-heading">
          <div>
            <span className="label">04 / HOW WE GET THERE</span>
            <h2>
              Clear from
              <br />
              <span className="muted">the first conversation.</span>
            </h2>
          </div>
          <p className="heading-side">
            A shared direction, tangible progress and room to get the details
            right.
          </p>
        </div>
        <div className="process-grid">
          {[
            {
              title: "Understand the idea.",
              text: "We talk about your audience, what the project needs to do and the constraints. Then agree on a focused scope.",
            },
            {
              title: "Make it tangible.",
              text: "Design and development turn that direction into something you can try. Feedback shapes the next iteration.",
            },
            {
              title: "Refine & hand over.",
              text: "Check the experience across screen sizes, work through the details and prepare a clear handover.",
            },
          ].map((step, i) => (
            <div className="process-step" key={step.title}>
              <span className="process-number">0{i + 1}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="wrap section notes-section">
        <div className="section-heading">
          <div>
            <span className="label">05 / FROM THE NOTEBOOK</span>
            <h2>Beyond the interface.</h2>
          </div>
          <Link href="/insights" className="text-link">
            All engineering notes <ArrowUpRight size={17} />
          </Link>
        </div>
        <div className="notes-list">
          {articles.map((a) => (
            <Link
              className="note-row"
              href={`/insights/${a.slug}`}
              key={a.slug}
            >
              <span className="label">{a.category}</span>
              <div>
                <h3>{a.title}</h3>
                <p>{a.summary}</p>
              </div>
              <ArrowUpRight size={23} />
            </Link>
          ))}
        </div>
      </section>
      <ProjectCTA />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: profile.name,
            url: profile.site,
            sameAs: [profile.github, profile.linkedin],
            jobTitle: "Web developer",
          }).replace(/</g, "\\u003c"),
        }}
      />
    </>
  );
}
