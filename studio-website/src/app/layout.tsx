import type { Metadata } from "next";
import { DM_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import CustomCursor from "@/components/ui/CustomCursor";
import SmoothScrollProvider from "@/components/ui/SmoothScrollProvider";
import Preloader from "@/components/ui/Preloader";
import PageTransition from "@/components/ui/PageTransition";
import { siteConfig } from "@/data/site";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["200", "300", "400", "500", "600", "700"],
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  style: ["normal", "italic"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} | ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "interior design Bangalore",
    "architecture Bangalore",
    "modular kitchen Bangalore",
    "AfterBuild Studio",
    "residential interior design",
    "commercial interior design",
    "custom furniture Bangalore",
    "wardrobes Bangalore",
    "Vastu planning",
    "home renovation Bangalore",
    "Indiranagar interior designer",
  ],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  openGraph: {
    type: "website",
    locale: "en_IN",
    title: `${siteConfig.name} | ${siteConfig.tagline}`,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${dmSans.variable} ${playfair.variable}`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body suppressHydrationWarning style={{ overscrollBehavior: "none" }}>
        <Preloader />
        <PageTransition />
        <SmoothScrollProvider />
        <CustomCursor />
        <Navbar />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
