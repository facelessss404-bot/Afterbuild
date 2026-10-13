// ============================================================
// TESTIMONIALS DATA — AfterBuild Studio
// ============================================================

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  title: string;
  project?: string;
  source?: string;
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
  },
];

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    quote:
      "AfterBuild Studio transformed our home beyond what we imagined. Farmaan and his team listened carefully to our requirements and delivered a space that truly reflects our lifestyle. Quality workmanship and on-time delivery.",
    author: "Satisfied Homeowner",
    title: "Residential Client",
    project: "SBR Horizon",
    source: "Google Review",
  },
  {
    id: "t2",
    quote:
      "From the first consultation to final handover, the entire process was smooth and hassle-free. The modular kitchen they designed is both beautiful and incredibly functional. Highly recommend AfterBuild Studio.",
    author: "Happy Client",
    title: "Homeowner",
    project: "GK Gateway",
    source: "Google Review",
  },
  {
    id: "t3",
    quote:
      "They understood our vision from the very first meeting. The attention to detail in every corner of our apartment is remarkable. Great team, honest pricing, and excellent quality. We couldn't be happier.",
    author: "Delighted Client",
    title: "Homeowner",
    project: "Prestige Avalon Park",
    source: "Direct",
  },
  {
    id: "t4",
    quote:
      "What stands out about AfterBuild Studio is their commitment to staying within budget while delivering premium results. The custom furniture and wardrobes they built for our home are exceptional.",
    author: "Valued Client",
    title: "Homeowner",
    project: "Bhavisha Homes",
    source: "Direct",
  },
  {
    id: "t5",
    quote:
      "The team's approach to design is very personalised. They didn't just hand us a standard package — they took time to understand how we live and designed accordingly. The result speaks for itself.",
    author: "Grateful Homeowner",
    title: "Residential Client",
    project: "Trifecta Retto",
    source: "Google Review",
  },
];
