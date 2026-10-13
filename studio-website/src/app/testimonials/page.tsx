import type { Metadata } from "next";
import { siteConfig } from "@/data/site";
import TestimonialsPageClient from "./TestimonialsPageClient";

export const metadata: Metadata = {
  title: "Testimonials & Client Feedback | AfterBuild Studio",
  description:
    "Explore verified client video reviews, homeowner feedback, and testimonials from over 160+ completed turnkey architectural and luxury interior handovers across Bangalore.",
  openGraph: {
    title: `Client Testimonials & Feedback | ${siteConfig.name}`,
    description:
      "Hear directly from homeowners about their turnkey design experience, modular kitchen execution, and handover with AfterBuild Studio.",
  },
};

export default function TestimonialsPage() {
  return <TestimonialsPageClient />;
}
