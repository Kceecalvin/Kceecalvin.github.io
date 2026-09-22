import Link from "next/link";
import { ArrowUpRight, ArrowUp } from "lucide-react";
import { profile } from "@/lib/data";
export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-top">
          <div>
            <Link href="/" className="footer-brand">
              caldev<span>↗</span>
            </Link>
            <p>Thoughtful design. Useful software.</p>
            <span className="mono">
              NAIROBI, KENYA / WORKING BEYOND BORDERS
            </span>
          </div>
          <div className="footer-links">
            <span className="label">Explore</span>
            <Link href="/work">Selected work</Link>
            <Link href="/cv">Developer profile</Link>
            <Link href="/insights">Engineering notes</Link>
          </div>
          <div className="footer-links">
            <span className="label">Connect</span>
            <a href={profile.github} target="_blank" rel="noopener noreferrer">
              GitHub <ArrowUpRight size={13} aria-hidden="true" />
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn <ArrowUpRight size={13} aria-hidden="true" />
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
            <a href={`mailto:${profile.email}`}>
              Email Kencalvin <ArrowUpRight size={13} aria-hidden="true" />
            </a>
          </div>
        </div>
        <div className="footer-wordmark" aria-hidden="true">
          <span>caldev</span>
          <span>✳</span>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Kencalvin Mwenda · CALDEV</span>
          <span>Made with care, down to the details.</span>
          <a href="#top">
            Back to top <ArrowUp size={14} aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
}
