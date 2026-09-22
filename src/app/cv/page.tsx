import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { profile, projects } from "@/lib/data";
import PrintButton from "@/components/PrintButton";
export const metadata: Metadata = {
  title: "Developer profile",
  description:
    "Meet Kencalvin Mwenda: a Nairobi-based developer building websites, product interfaces and connected systems.",
};
export default function Profile() {
  return (
    <section className="wrap profile-page section">
      <div className="profile-heading">
        <div>
          <span className="label">THE PERSON BEHIND CALDEV</span>
          <h1>
            Kencalvin
            <br />
            <span className="accent">Mwenda.</span>
          </h1>
          <p className="lead">
            Web development · Product interfaces · Systems thinking
          </p>
          <p>
            {profile.location} ·{" "}
            <a href={`mailto:${profile.email}`}>{profile.email}</a>
          </p>
          <div className="button-row">
            <Link href="/contact" className="button primary">
              Discuss a project <ArrowUpRight size={17} />
            </Link>
            <PrintButton />
          </div>
        </div>
        <Image
          src="/assets/founder.jpg"
          alt="Kencalvin Mwenda"
          width={720}
          height={1280}
          sizes="(max-width:760px) 160px, 270px"
        />
      </div>
      <div className="profile-body">
        <aside>
          <div>
            <span className="label">FOCUS</span>
            <p>
              Useful software with a considered interface, from responsive
              websites to web applications.
            </p>
          </div>
          <div>
            <span className="label">EDUCATION</span>
            <h3>Kirinyaga University</h3>
            <p>
              Software Engineering studies
              <br />
              Started 2022
            </p>
          </div>
          <div>
            <span className="label">FIND ME ONLINE</span>
            <p>
              <a
                className="text-link"
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub ↗
              </a>
            </p>
            <p>
              <a
                className="text-link"
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn ↗
              </a>
            </p>
          </div>
        </aside>
        <div>
          <span className="label">ABOUT MY WORK</span>
          <h2>
            From the interface
            <br />
            to the implementation.
          </h2>
          <p>
            I build websites and web applications with attention to how they
            look, how they work and how people move through them. My work brings
            together frontend development, Python-backed applications and an
            interest in the systems underneath.
          </p>
          <div className="profile-skills">
            <span>React / Next.js</span>
            <span>TypeScript / JavaScript</span>
            <span>Python / Django</span>
            <span>Responsive interfaces</span>
            <span>API integration</span>
            <span>Interaction design</span>
          </div>
          <h2 className="profile-work-title">Selected work</h2>
          {projects.map((p) => (
            <Link
              className="profile-project"
              key={p.slug}
              href={`/work/${p.slug}`}
            >
              <div>
                <span className="label">{p.status}</span>
                <h3>{p.title}</h3>
                <p>{p.summary}</p>
              </div>
              <ArrowUpRight size={22} />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
