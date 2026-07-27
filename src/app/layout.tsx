import type { Metadata } from "next";
import Script from 'next/script';
import "./globals.css";
import GlobalBackground from "@/components/GlobalBackground";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import UtmCapturer from '@/components/UtmCapturer';

export const metadata: Metadata = {
  title: "Caldev | Tier-One Systems Engineering",
  description: "Deterministic logic engineering for financial, physical, and operational systems.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const plausibleDomain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN || 'kceecalvin.github.io';

  return (
    <html lang="en" className="font-sans bg-black antialiased scroll-smooth">
      <head>
        {/* Google Fonts Preconnect and Links */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Jost:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300;1,400;1,500;1,600;1,700;1,800&family=Bodoni+Moda:ital,opsz,wght@0,6..96,400;0,6..96,500;0,6..96,600;0,6..96,700;1,6..96,400;1,6..96,500;1,6..96,600;1,6..96,700&display=swap" 
          rel="stylesheet" 
        />
      </head>
      <body className="min-h-screen selection:bg-primary-orange selection:text-white hardware-accelerated text-white overflow-x-hidden">
        <Script
          src="https://plausible.io/js/script.js"
          data-domain={plausibleDomain}
          strategy="afterInteractive"
        />
        <UtmCapturer />
        <SmoothScroll>
          <GlobalBackground />
          <CustomCursor />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
