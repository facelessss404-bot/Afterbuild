// ============================================================
// TESTIMONIALS DATA — AfterBuild Studio
// Single Source of Truth for Client Reviews & Video Feedback
// ============================================================

export type TestimonialCategory =
  | "ALL"
  | "Residential Villas"
  | "Turnkey Interiors"
  | "Modular Kitchens"
  | "Video Reviews";

export const testimonialCategories: TestimonialCategory[] = [
  "ALL",
  "Residential Villas",
  "Turnkey Interiors",
  "Modular Kitchens",
  "Video Reviews",
];

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  title: string;
  project: string;
  location: string;
  category: "Residential Villas" | "Turnkey Interiors" | "Modular Kitchens";
  year: string;
  rating: number;
  source: string;
  scope: string[];
  hasVideo?: boolean;
  videoUrl?: string;
  verified: boolean;
}

export interface VideoTestimonial {
  id: string;
  project: string;
  client: string;
  role: string;
  location: string;
  duration: string;
  rating: number;
  videoUrl: string;
  poster: string;
  badge: string;
  quoteTitle: string;
  quote: string;
  services: string[];
  projectSlug?: string;
}

export const videoTestimonials: VideoTestimonial[] = [
  {
    id: "trifecta-feedback",
    project: "Trifecta Retto",
    client: "Homeowners at Trifecta Retto",
    role: "Luxury 3BHK Turnkey Interior Handover",
    location: "Bangalore",
    duration: "2:02 min",
    rating: 5,
    videoUrl: "/videos/testimonial-feedback-trifecta.mp4",
    poster: "/images/testimonials/trifecta_feedback_poster.jpg",
    badge: "Verified Client Video Review",
    quoteTitle: "“Flawless Execution, Exceptional Finishing & Transparent Handover”",
    quote:
      "Hear directly from our Trifecta Retto clients as they share their firsthand walkthrough experience. From bespoke high-gloss modular kitchen cabinetry and pantry detailing to concealed storage and on-schedule handover, discover how AfterBuild Studio transformed their vision into reality.",
    services: ["Turnkey 3BHK Fitout", "Modular Kitchen", "Wardrobe Joinery", "Lighting Design"],
    projectSlug: "trifecta-retto",
  },
];

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    quote:
      "AfterBuild Studio transformed our home beyond what we imagined. Farmaan and his team listened carefully to our requirements and delivered a space that truly reflects our lifestyle. Quality workmanship, zero cost escalation, and genuine on-time delivery.",
    author: "Rohan & Megha Sharma",
    title: "Homeowners",
    project: "SBR Horizon",
    location: "Old Madras Road, Bangalore",
    category: "Turnkey Interiors",
    year: "2025",
    rating: 5,
    source: "Google Review",
    scope: ["Living Media Wall", "Fluted Timber Joinery", "Full Turnkey Handover"],
    verified: true,
  },
  {
    id: "t2",
    quote:
      "From the initial architectural consult to final key handover, the entire process was smooth and transparent. The modular kitchen they engineered is both visually stunning and ergonomically flawless. Highly recommend AfterBuild Studio for luxury interiors in Bangalore.",
    author: "Karthik Venkatesh",
    title: "Homeowner",
    project: "GK Gateway",
    location: "Bangalore",
    category: "Modular Kitchens",
    year: "2024",
    rating: 5,
    source: "Google Review",
    scope: ["Modular Kitchen", "Smart Storage", "Ambient Profile Lighting"],
    hasVideo: true,
    videoUrl: "/videos/walkthrough-gk-gateway.mp4",
    verified: true,
  },
  {
    id: "t3",
    quote:
      "They understood our vision from the very first meeting. The attention to detail in every corner of our apartment is remarkable — especially the rose-gold framed lacquered wardrobes and Vastu master suite. Honest pricing and pristine craftsmanship.",
    author: "Ananya & Siddharth Reddy",
    title: "Apartment Suite Owners",
    project: "Prestige Avalon Park",
    location: "Sarjapur Road, Bangalore",
    category: "Turnkey Interiors",
    year: "2024",
    rating: 5,
    source: "Direct Handover",
    scope: ["Rose-Gold Wardrobes", "Vastu Master Planning", "Acoustic Bedhead"],
    hasVideo: true,
    videoUrl: "/videos/walkthrough-prestige.mp4",
    verified: true,
  },
  {
    id: "t4",
    quote:
      "What stands out about AfterBuild Studio is their commitment to staying within budget while delivering premium results. The custom furniture, wardrobes, and space optimization they built for our home are exceptional and durable.",
    author: "Vikram & Pooja Nair",
    title: "Homeowners",
    project: "Bhavisha Homes",
    location: "Bangalore",
    category: "Modular Kitchens",
    year: "2024",
    rating: 5,
    source: "Direct Handover",
    scope: ["Modular Storage", "Space Planning", "Budget-Aligned Luxury"],
    verified: true,
  },
  {
    id: "t5",
    quote:
      "The team's approach to design is remarkably personalised. They didn't just hand us a standard template — they took time to understand our family rituals and designed accordingly. The result speaks for itself in every finish.",
    author: "Prashanth & Deepa Rao",
    title: "3BHK Residence Owners",
    project: "Trifecta Retto",
    location: "Bangalore",
    category: "Turnkey Interiors",
    year: "2025",
    rating: 5,
    source: "Google Review",
    scope: ["Complete Turnkey 3BHK", "Glass Display Pantry", "Custom Joinery"],
    hasVideo: true,
    videoUrl: "/videos/testimonial-feedback-trifecta.mp4",
    verified: true,
  },
  {
    id: "t6",
    quote:
      "Building a multi-level private villa requires immense technical precision. AfterBuild Studio directed the entire exterior elevation, stone cladding, safety louvers, and bespoke interior joinery seamlessly. Exceptional team and leadership by Farmaan.",
    author: "Aryan & Sunita Patil",
    title: "Villa Owners",
    project: "Aryan's Villa",
    location: "Electronic City, Bangalore",
    category: "Residential Villas",
    year: "2025",
    rating: 5,
    source: "Google Review",
    scope: ["Multi-Tier Elevation", "Stone Cladding", "Villa Turnkey Construction"],
    hasVideo: true,
    videoUrl: "/videos/walkthrough-aryan-villa.mp4",
    verified: true,
  },
  {
    id: "t7",
    quote:
      "The modular kitchen and walk-in wardrobe joinery exceeded all expectations. Their network of 75+ artisans ensures fine tolerances and flawless edges that typical interior contractors simply cannot match.",
    author: "Naveen Chandrasekhar",
    title: "Duplex Homeowner",
    project: "Indiranagar Duplex",
    location: "Indiranagar, Bangalore",
    category: "Modular Kitchens",
    year: "2024",
    rating: 5,
    source: "Google Review",
    scope: ["Walk-in Wardrobe", "Modular Kitchen", "Bespoke Credenza"],
    verified: true,
  },
  {
    id: "t8",
    quote:
      "Zero hidden surprises, absolute cost clarity, and a strict timeline guarantee. AfterBuild Studio sets the benchmark for what architectural execution in Bangalore ought to be.",
    author: "Divya & Manoj Kumar",
    title: "Villa Clients",
    project: "Whitefield Atelier Residence",
    location: "Whitefield, Bangalore",
    category: "Residential Villas",
    year: "2025",
    rating: 5,
    source: "Google Review",
    scope: ["Double Height Living", "Italian Marble Joinery", "Turnkey Handover"],
    verified: true,
  },
];
