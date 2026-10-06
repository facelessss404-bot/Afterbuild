// ============================================================
// PROJECTS DATA — AfterBuild Studio
// Single Source of Truth for Completed & Featured Projects
// ============================================================

export type ProjectCategory =
  | "Residential"
  | "Interior"
  | "Architecture"
  | "Modular";

export const projectCategories: ("ALL" | ProjectCategory)[] = [
  "ALL",
  "Residential",
  "Interior",
  "Architecture",
  "Modular",
];

export interface ProjectVideo {
  hasVideo: boolean;
  videoUrl?: string;
  poster?: string;
  duration?: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: ProjectCategory;
  location: string;
  year: string;
  area: string;
  heroImage: string;
  thumbnailImage: string;
  images: string[];
  description: string;
  statement: string;
  services: string[];
  materials?: string[];
  credits?: Record<string, string>;
  featured: boolean;
  index: number;
  video?: ProjectVideo;
}

export const projects: Project[] = [
  {
    id: "trifecta-retto",
    slug: "trifecta-retto",
    title: "Trifecta Retto",
    subtitle: "Architecture as experience: seamless fluted woodwork & modular culinary precision.",
    category: "Architecture",
    location: "Bangalore",
    year: "2025",
    area: "2,450 sq.ft.",
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
      "A complete residential execution capturing the balance between ergonomic utility and sculptural beauty. High-gloss cabinetry, warm under-cabinet strip lighting, concealed pantry storage, and an expansive living-dining expanse crafted for effortless everyday living.",
    statement:
      "Architecture as experience — purposeful spatial planning rendered through warm timber and restrained joinery.",
    services: ["Architecture & Interior", "Modular Kitchen", "Lighting Design", "Turnkey Execution"],
    materials: ["Smoked Oak", "Fluted Glass", "Italian Quartz Countertops", "Brushed Brass Trims"],
    credits: { "Lead Architect": "Mohammed Farmaan Azam K", "Studio": "AfterBuild Studio" },
    featured: true,
    index: 1,
    video: {
      hasVideo: true,
      videoUrl: "/videos/walkthrough-trifecta.mp4",
      poster: "/images/projects/trifecta-retto/hero.jpg",
      duration: "1:45 min",
    },
  },
  {
    id: "prestige-avalon-park",
    slug: "prestige-avalon-park",
    title: "Prestige Avalon Park",
    subtitle: "Refined living reimagined: custom rose-gold wardrobes & Vastu-aligned master suite.",
    category: "Residential",
    location: "Sarjapur Road, Bangalore",
    year: "2024",
    area: "1,850 sq.ft.",
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
      "A sophisticated master suite and living interior within one of Bangalore's premier residential developments. Precision-engineered sliding wardrobes with rose-gold aluminum profiles and lacquered glass panels, complemented by acoustic vertical headboard paneling.",
    statement:
      "Sophisticated restraint — luxury distilled into its purest spatial and functional form.",
    services: ["Interior Design", "Wardrobes & Storage", "Vastu Planning", "Turnkey Fitout"],
    materials: ["Lacquered Glass", "Rose-Gold Anodized Aluminum", "Suede Acoustic Paneling"],
    credits: { "Design Direction": "Mohammed Farmaan Azam K", "Studio": "AfterBuild Studio" },
    featured: true,
    index: 2,
    video: {
      hasVideo: true,
      videoUrl: "/videos/walkthrough-prestige.mp4",
      poster: "/images/projects/prestige-avalon-park/hero.jpg",
      duration: "1:20 min",
    },
  },
  {
    id: "sbr-horizon",
    slug: "sbr-horizon",
    title: "SBR Horizon",
    subtitle: "Where precision meets possibility: backlit vertical timber & bespoke credenza.",
    category: "Interior",
    location: "Old Madras Road, Bangalore",
    year: "2025",
    area: "3,100 sq.ft.",
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
      "A contemporary residential interior defined by an architectural media wall with warm concealed cove illumination, custom white-and-burgundy fluted credenza, and custom crystal sconces creating an inviting sanctuary.",
    statement:
      "An interior where engineering precision meets domestic warmth — defined by considered materials.",
    services: ["Interior Design", "Custom Furniture", "Lighting Design", "Space Planning"],
    materials: ["Fluted Walnut", "High-Gloss Lacquer", "Crystal Glass Sconces", "Vitrified Marble"],
    credits: { "Lead Designer": "AfterBuild Studio Team", "Supervision": "Mohammed Farmaan Azam K" },
    featured: true,
    index: 3,
    video: {
      hasVideo: true,
      videoUrl: "/videos/walkthrough-trifecta.mp4",
      poster: "/images/projects/sbr-horizon/hero.jpg",
      duration: "2:10 min",
    },
  },
  {
    id: "gk-gateway",
    slug: "gk-gateway",
    title: "GK Gateway",
    subtitle: "Spaces shaped by intention: clean architectural lines & complete turnkey execution.",
    category: "Residential",
    location: "Bangalore",
    year: "2024",
    area: "2,800 sq.ft.",
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
      "A full turnkey residential project executed with immaculate craftsmanship. The home combines smart space planning, hidden storage, warm ambient recessed profiles, and bespoke furniture built to last.",
    statement:
      "Precision meets durability — turnkey residential sanctuary tailored for urban comfort.",
    services: ["Turnkey Execution", "Interior Design", "Wardrobes", "Custom Modular Units"],
    materials: ["Marine Grade Plywood", "Anti-Scratch Acrylic", "Warm LED Lighting"],
    credits: { "Execution Lead": "AfterBuild Studio Craftsmen Network (75+)" },
    featured: true,
    index: 4,
    video: {
      hasVideo: true,
      videoUrl: "/videos/walkthrough-prestige.mp4",
      poster: "/images/projects/gk-gateway/hero.jpg",
      duration: "1:55 min",
    },
  },
  {
    id: "bhavisha-homes",
    slug: "bhavisha-homes",
    title: "Bhavisha Homes",
    subtitle: "Home as a state of mind: calm palettes, functional elegance, and tailored spaces.",
    category: "Modular",
    location: "Bangalore",
    year: "2024",
    area: "2,150 sq.ft.",
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
      "A warm residential interior that balances budget-friendly packages with high design integrity. Every square foot was optimized for storage, ergonomics, and effortless maintenance.",
    statement:
      "Warmth woven into every surface — an accessible luxury home that breathes with its owners.",
    services: ["Interior Design", "Modular Storage", "Color Consultation", "Turnkey Handover"],
    materials: ["Textured Laminates", "Matte Black Hardware", "Natural Linen Textiles"],
    credits: { "Studio": "AfterBuild Studio" },
    featured: true,
    index: 5,
  },
];
