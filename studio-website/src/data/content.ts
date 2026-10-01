// ============================================================
// STATS / METRICS DATA — AfterBuild Studio
// ============================================================

export const stats = [
  { value: "160+", label: "Projects", description: "Completed across Bangalore & beyond" },
  { value: "3+", label: "Years", description: "Of design practice since 2023" },
  { value: "75+", label: "Craftsmen", description: "Skilled workers in our network" },
  { value: "100%", label: "Bespoke", description: "Personalised to every client" },
];

// ============================================================
// PHILOSOPHY DATA
// ============================================================

export interface PhilosophyPillar {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
}

export const philosophyPillars: PhilosophyPillar[] = [
  {
    id: "functionality",
    number: "01",
    title: "Functionality\nFirst",
    subtitle: "A space must work before it can inspire.",
    description:
      "Every layout is tested for ergonomic usability before decorative styling is introduced. Space must live before it can impress. We plan every square foot to improve the way a space is experienced.",
    image: "/images/projects/sbr-horizon/01.jpg",
  },
  {
    id: "material",
    number: "02",
    title: "Budget\nFriendly",
    subtitle: "Quality without compromise.",
    description:
      "We offer flexible, cost-effective solutions without compromising on essential quality and design. Our strong vendor relationships allow us to deliver premium results at honest prices.",
    image: "/images/projects/gk-gateway/03.jpg",
  },
  {
    id: "light",
    number: "03",
    title: "On-Time\nDelivery",
    subtitle: "We value your time above all.",
    description:
      "We follow a planned execution process to keep projects on schedule. Timelines are respected, milestones are tracked, and clients are kept informed every step of the way.",
    image: "/images/projects/prestige-avalon-park/02.jpg",
  },
];

// ============================================================
// TIMELINE DATA — AfterBuild Studio Journey
// ============================================================

export interface TimelineEvent {
  year: string;
  title: string;
  description: string;
}

export const timeline: TimelineEvent[] = [
  {
    year: "2023",
    title: "Ocean Decor Founded",
    description:
      "Our journey began in May 2023 under the name Ocean Decor — bringing fresh energy and design thinking to residential spaces in Bangalore.",
  },
  {
    year: "2023",
    title: "Evolved into AfterBuild Studio",
    description:
      "With a growing portfolio and expanded vision, Ocean Decor evolved into AfterBuild Studio — reflecting a broader ambition to deliver end-to-end interior and architectural solutions.",
  },
  {
    year: "2024",
    title: "100+ Projects Milestone",
    description:
      "Crossed the 100-project milestone, serving residential and commercial clients across Bangalore with quality craftsmanship and personalised design.",
  },
  {
    year: "2025",
    title: "160+ Projects & Growing",
    description:
      "With 160+ successfully completed projects, a skilled workforce of 75+ craftsmen, and a reputation built on trust and quality, AfterBuild Studio continues to grow across Bangalore and beyond.",
  },
];

// ============================================================
// AWARDS / RECOGNITION DATA
// Remove placeholder awards — no invented awards for AfterBuild
// ============================================================

export interface Award {
  id: string;
  year: string;
  title: string;
  category: string;
  organization: string;
  description: string;
  link?: string;
  image?: string;
}

export const awards: Award[] = [];

export interface PressItem {
  id: string;
  publication: string;
  tagline: string;
  quote: string;
  coverImage: string;
  link?: string;
}

export const pressItems: PressItem[] = [];

// ============================================================
// TEAM DATA
// ============================================================

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image?: string;
}

export const team: TeamMember[] = [
  {
    id: "founder",
    name: "Mohammed Farmaan Azam K",
    role: "Founder & Director",
    bio: "With over a decade of experience across business development, strategic sales, client relationships and entrepreneurship, Farmaan brings a distinctive business-led perspective to the world of interiors and spatial design. An Engineering graduate from Dr. Ambedkar Institute of Technology, he has worked with organisations including BYJU'S, Lomos Archilabs and TautMore before founding AfterBuild Studio.",
    image: "/images/founder.jpg",
  },
];
