import type { Metadata } from "next";
import ArticleLayout from "@/components/ArticleLayout";
export const metadata: Metadata = { title: "Event-driven financial systems" };
export default function Layout({ children }: { children: React.ReactNode }) {
  return <ArticleLayout>{children}</ArticleLayout>;
}
