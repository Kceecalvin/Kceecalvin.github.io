import type { Metadata } from "next";
import { Jost, Bodoni_Moda } from "next/font/google";
import "./globals.css";

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const bodoni = Bodoni_Moda({
  variable: "--font-bodoni",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Caldev | Tier-One Systems Engineering",
  description: "Deterministic logic engineering for financial, physical, and operational systems.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${jost.variable} ${bodoni.variable} font-sans bg-black antialiased`}>
      <body className="min-h-screen selection:bg-primary-orange selection:text-white hardware-accelerated">
        {children}
      </body>
    </html>
  );
}
