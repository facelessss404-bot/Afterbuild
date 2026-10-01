// ============================================================
// PROJECTS DATA
// Each project has a dedicated route: /work/[slug]
// ============================================================

export type ProjectCategory =
  | "Residential"
  | "Interior"
  | "Commercial"
  | "Architecture"
  | "Conceptual";

export const projectCategories: ("ALL" | ProjectCategory)[] = [
  "ALL",
  "Residential",
  "Interior",
  "Architecture",
  "Commercial",
  "Conceptual",
];

export interface Project {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: ProjectCategory;
  location: string;
  year: string;
  area?: string; // e.g. "2400 sq.ft." — optional
  heroImage: string;
  thumbnailImage: string;
  images: string[];
  description: string;
  statement?: string; // one-line design statement
  services: string[];
  materials?: string[];
  credits?: Record<string, string>; // e.g. { "Photography": "Studio X" }
  featured: boolean;
  index: number;
}

export const projects: Project[] = [
  {
    id: "sbr-horizon",
    slug: "sbr-horizon",
    title: "SBR Horizon",
    subtitle: "Where precision meets possibility.",
    category: "Interior",
    location: "Bangalore", // [PLACEHOLDER: verify]
    year: "2025", // [PLACEHOLDER: verify]
    heroImage: "/images/projects/sbr-horizon/hero.jpg",
    thumbnailImage: "/images/projects/sbr-horizon/thumb.jpg",
    images: [
      "/images/projects/sbr-horizon/01.jpg",
      "/images/projects/sbr-horizon/02.jpg",
      "/images/projects/sbr-horizon/03.jpg",
      "/images/projects/sbr-horizon/04.jpg",
      "/images/projects/sbr-horizon/05.jpg",
      "/images/projects/sbr-horizon/06.jpg",
      "/images/projects/sbr-horizon/07.jpg",
      "/images/projects/sbr-horizon/08.jpg",
      "/images/projects/sbr-horizon/09.jpg",
      "/images/projects/sbr-horizon/10.jpg",
      "/images/projects/sbr-horizon/11.jpg",
      "/images/projects/sbr-horizon/12.jpg",
      "/images/projects/sbr-horizon/13.jpg",
      "/images/projects/sbr-horizon/14.jpg",
      "/images/projects/sbr-horizon/15.jpg",
      "/images/projects/sbr-horizon/16.jpg",
      "/images/projects/sbr-horizon/17.jpg",
      "/images/projects/sbr-horizon/18.jpg",
    ],
    description:
      "A contemporary residential interior that balances openness with intimacy. Every material was chosen for how it responds to natural light across the day.", // [PLACEHOLDER]
    statement:
      "An interior where precision meets warmth — defined by considered materials and restrained elegance.", // [PLACEHOLDER]
    services: ["Interior Design", "Material Selection", "Lighting Design"],
    featured: true,
    index: 1,
  },
  {
    id: "trifecta-retto",
    slug: "trifecta-retto",
    title: "Trifecta Retto",
    subtitle: "Architecture as experience.",
    category: "Architecture",
    location: "Bangalore", // [PLACEHOLDER: verify]
    year: "2025", // [PLACEHOLDER: verify]
    heroImage: "/images/projects/trifecta-retto/hero.jpg",
    thumbnailImage: "/images/projects/trifecta-retto/thumb.jpg",
    images: [
      "/images/projects/trifecta-retto/01.jpg",
      "/images/projects/trifecta-retto/02.jpg",
      "/images/projects/trifecta-retto/03.jpg",
      "/images/projects/trifecta-retto/04.jpg",
      "/images/projects/trifecta-retto/05.jpg",
      "/images/projects/trifecta-retto/06.jpg",
      "/images/projects/trifecta-retto/07.jpg",
      "/images/projects/trifecta-retto/08.jpg",
      "/images/projects/trifecta-retto/09.jpg",
      "/images/projects/trifecta-retto/10.jpg",
    ],
    description:
      "A high-rise architectural project that explores verticality and form. The exterior composition creates a bold presence on the city skyline.", // [PLACEHOLDER]
    statement:
      "Verticality meets rhythm — an architectural statement that commands the skyline.", // [PLACEHOLDER]
    services: ["Architecture", "Facade Design", "Project Management"],
    featured: true,
    index: 2,
  },
  {
    id: "gk-gateway",
    slug: "gk-gateway",
    title: "GK Gateway",
    subtitle: "Spaces shaped by intention.",
    category: "Residential",
    location: "Bangalore", // [PLACEHOLDER: verify]
    year: "2024", // [PLACEHOLDER: verify]
    heroImage: "/images/projects/gk-gateway/hero.jpg",
    thumbnailImage: "/images/projects/gk-gateway/thumb.jpg",
    images: [
      "/images/projects/gk-gateway/01.jpg",
      "/images/projects/gk-gateway/02.jpg",
      "/images/projects/gk-gateway/03.jpg",
      "/images/projects/gk-gateway/04.jpg",
      "/images/projects/gk-gateway/05.jpg",
      "/images/projects/gk-gateway/06.jpg",
      "/images/projects/gk-gateway/07.jpg",
      "/images/projects/gk-gateway/08.jpg",
      "/images/projects/gk-gateway/09.jpg",
      "/images/projects/gk-gateway/10.jpg",
      "/images/projects/gk-gateway/11.jpg",
      "/images/projects/gk-gateway/12.jpg",
      "/images/projects/gk-gateway/13.jpg",
      "/images/projects/gk-gateway/14.jpg",
      "/images/projects/gk-gateway/15.jpg",
      "/images/projects/gk-gateway/16.jpg",
      "/images/projects/gk-gateway/17.jpg",
      "/images/projects/gk-gateway/18.jpg",
      "/images/projects/gk-gateway/19.jpg",
      "/images/projects/gk-gateway/20.jpg",
      "/images/projects/gk-gateway/21.jpg",
      "/images/projects/gk-gateway/22.jpg",
      "/images/projects/gk-gateway/23.jpg",
      "/images/projects/gk-gateway/24.jpg",
      "/images/projects/gk-gateway/25.jpg",
      "/images/projects/gk-gateway/26.jpg",
      "/images/projects/gk-gateway/27.jpg",
    ],
    description:
      "A meticulously crafted residential interior. The design language speaks through clean lines, curated materials, and an intelligent use of natural light.", // [PLACEHOLDER]
    statement:
      "Precision meets possibility — a residential sanctuary defined by restraint and quality.", // [PLACEHOLDER]
    services: ["Interior Design", "Turnkey", "Furniture Design"],
    featured: true,
    index: 3,
  },
  {
    id: "prestige-avalon-park",
    slug: "prestige-avalon-park",
    title: "Prestige Avalon Park",
    subtitle: "Refined living, reimagined.",
    category: "Residential",
    location: "Bangalore", // [PLACEHOLDER: verify]
    year: "2024", // [PLACEHOLDER: verify]
    heroImage: "/images/projects/prestige-avalon-park/hero.jpg",
    thumbnailImage: "/images/projects/prestige-avalon-park/thumb.jpg",
    images: [
      "/images/projects/prestige-avalon-park/01.jpg",
      "/images/projects/prestige-avalon-park/02.jpg",
      "/images/projects/prestige-avalon-park/03.jpg",
      "/images/projects/prestige-avalon-park/04.jpg",
      "/images/projects/prestige-avalon-park/05.jpg",
    ],
    description:
      "An interior design project within one of Bangalore's prominent residential developments. Luxury expressed through quality rather than quantity.", // [PLACEHOLDER]
    statement:
      "Sophisticated restraint — luxury distilled into its purest spatial form.", // [PLACEHOLDER]
    services: ["Interior Design", "Material Curation"],
    featured: false,
    index: 4,
  },
  {
    id: "bhavisha-homes",
    slug: "bhavisha-homes",
    title: "Bhavisha Homes",
    subtitle: "Home as a state of mind.",
    category: "Interior",
    location: "Bangalore", // [PLACEHOLDER: verify]
    year: "2024", // [PLACEHOLDER: verify]
    heroImage: "/images/projects/bhavisha-homes/hero.jpg",
    thumbnailImage: "/images/projects/bhavisha-homes/thumb.jpg",
    images: [
      "/images/projects/bhavisha-homes/01.jpg",
      "/images/projects/bhavisha-homes/02.jpg",
      "/images/projects/bhavisha-homes/03.jpg",
      "/images/projects/bhavisha-homes/04.jpg",
      "/images/projects/bhavisha-homes/05.jpg",
      "/images/projects/bhavisha-homes/06.jpg",
      "/images/projects/bhavisha-homes/07.jpg",
      "/images/projects/bhavisha-homes/08.jpg",
      "/images/projects/bhavisha-homes/09.jpg",
      "/images/projects/bhavisha-homes/10.jpg",
    ],
    description:
      "A warm residential interior that balances modern aesthetics with comfort. Natural materials and considered lighting define the experience of each room.", // [PLACEHOLDER]
    statement:
      "Warmth woven into every surface — a home that breathes with its inhabitants.", // [PLACEHOLDER]
    services: ["Interior Design", "Furniture Selection", "Lighting"],
    featured: false,
    index: 5,
  },
];
