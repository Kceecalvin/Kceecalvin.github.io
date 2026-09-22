import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { MotionProvider } from "@/components/Reveal";
const sans = localFont({
  src: [
    { path: "./fonts/lato-regular.woff2", weight: "400", style: "normal" },
    { path: "./fonts/lato-bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-sans",
  display: "swap",
});
export const metadata: Metadata = {
  metadataBase: new URL("https://cal-dev.me"),
  title: {
    default: "CALDEV — Kencalvin Mwenda · Design & Development",
    template: "%s | CALDEV",
  },
  description:
    "Kencalvin Mwenda builds thoughtful websites, useful web applications and connected digital experiences. Explore selected work, engineering notes and ways to collaborate.",
  openGraph: {
    type: "website",
    siteName: "CALDEV",
    title: "CALDEV — A little different. By design.",
    description:
      "Selected work by Kencalvin Mwenda. Design, web development and systems.",
  },
  twitter: { card: "summary_large_image" },
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body id="top" className={sans.variable}>
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <MotionProvider>
          <Navbar />
          <main id="main-content">{children}</main>
          <Footer />
        </MotionProvider>
      </body>
    </html>
  );
}
