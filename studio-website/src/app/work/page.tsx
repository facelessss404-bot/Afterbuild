import type { Metadata } from "next";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "Work — Selected Projects",
  description: `Explore the complete portfolio of ${siteConfig.name}. Residential, commercial, and interior design projects across India.`,
  openGraph: {
    title: `Work | ${siteConfig.name}`,
    description: `Selected architecture and interior design projects by ${siteConfig.name}.`,
  },
};

import WorkPageClient from "./WorkPageClient";

export default function WorkPage() {
  return <WorkPageClient />;
}
