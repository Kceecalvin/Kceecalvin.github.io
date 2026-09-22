"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { motion, useScroll } from "framer-motion";
const links = [
  { href: "/work", label: "Work" },
  { href: "/#about", label: "About" },
  { href: "/#services", label: "Services" },
  { href: "/insights", label: "Notes" },
];
export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const { scrollYProgress } = useScroll();
  return (
    <header
      className="nav"
      onKeyDown={(e) => {
        if (e.key === "Escape" && open) {
          setOpen(false);
          toggle.current?.focus();
        }
      }}
    >
      <motion.div
        className="scroll-progress"
        style={{ scaleX: scrollYProgress }}
        aria-hidden="true"
      />
      <div className="wrap nav-row">
        <Link
          className="brand"
          href="/"
          aria-label="CALDEV home"
          onClick={() => setOpen(false)}
        >
          <span className="brand-symbol" aria-hidden="true">
            c<span>↗</span>
          </span>
          <span>
            cal<span className="accent">dev</span>
            <small>DESIGN + DEVELOPMENT</small>
          </span>
        </Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              aria-current={
                pathname.startsWith(l.href) && !l.href.includes("#")
                  ? "page"
                  : undefined
              }
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <Link href="/contact" className="button nav-cta">
          Let’s build <ArrowUpRight aria-hidden="true" size={16} />
        </Link>
        <button
          className="menu-toggle"
          ref={toggle}
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => setOpen(!open)}
        >
          {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </div>
      {open && (
        <nav
          className="mobile-nav wrap"
          id="mobile-navigation"
          aria-label="Mobile navigation"
        >
          {[
            ...links,
            { href: "/cv", label: "Profile" },
            { href: "/contact", label: "Start a project" },
          ].map((l, i) => (
            <Link href={l.href} key={l.href} onClick={() => setOpen(false)}>
              <span className="mono" aria-hidden="true">
                0{i + 1}
              </span>
              {l.label}
              <ArrowUpRight aria-hidden="true" size={20} />
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
