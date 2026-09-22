import Link from "next/link";
export default function NotFound() {
  return (
    <section className="wrap not-found">
      <span className="label">404 / A SMALL DETOUR</span>
      <h1>
        Nothing here.
        <br />
        <span className="accent">Plenty to explore.</span>
      </h1>
      <p>This page may have moved. Let’s get you back to the work.</p>
      <Link className="button primary" href="/work">
        Explore the portfolio ↗
      </Link>
    </section>
  );
}
