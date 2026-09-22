import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
export default function ArticleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="wrap article-page">
      <Link className="text-link article-back" href="/insights">
        <ArrowLeft size={16} /> Engineering notes
      </Link>
      <div className="article-notice">
        FROM KENCALVIN’S NOTEBOOK / ARCHITECTURE & SYSTEMS
      </div>
      <article className="article-body">{children}</article>
      <div className="article-bottom">
        <Link href="/contact" className="text-link">
          Have a related project in mind? <ArrowUpRight size={16} />
        </Link>
      </div>
    </div>
  );
}
