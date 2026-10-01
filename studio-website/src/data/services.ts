// ============================================================
// SERVICES DATA — AfterBuild Studio
// ============================================================

export interface Service {
  id: string;
  number: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  features: string[];
  process?: string[];
  deliverables?: string[];
}

export const services: Service[] = [
  {
    id: "interior-design",
    number: "01",
    title: "Interior Design & Architecture",
    description:
      "Creative, functional, and customised space planning that transforms ordinary rooms into extraordinary living and working environments tailored to your lifestyle.",
    image: "/images/projects/sbr-horizon/hero.jpg",
    tags: ["Residential Interiors", "Commercial Spaces", "Space Planning"],
    features: [
      "Full Space Planning & Layout",
      "3D Design Visualisation",
      "Material & Finish Selection",
      "Architectural Detailing",
      "Lighting Design",
      "End-to-End Execution",
    ],
    process: [
      "Initial Consultation & Brief",
      "Concept Design & Mood Board",
      "3D Visualisation & Approval",
      "Material & Vendor Selection",
      "Site Execution & Supervision",
    ],
    deliverables: [
      "Detailed Floor Plans & Elevations",
      "3D Renders & Walkthrough",
      "Material Sample Board",
      "Execution Drawings",
    ],
  },
  {
    id: "modular-kitchens",
    number: "02",
    title: "Modular Kitchens",
    description:
      "Modern, efficient, and stylish modular kitchen solutions designed to maximise storage, workflow, and visual appeal — customised to your cooking style and space.",
    image: "/images/projects/gk-gateway/hero.jpg",
    tags: ["Modular Design", "Custom Cabinets", "Premium Fittings"],
    features: [
      "Custom Layout Planning",
      "Premium Modular Units",
      "Countertop & Backsplash Design",
      "Integrated Appliance Placement",
      "Soft-Close Fittings & Hardware",
      "Full Installation & Handover",
    ],
    process: [
      "Kitchen Site Measurement",
      "Layout & Module Planning",
      "Material & Finish Approval",
      "Factory Production",
      "Installation & Commissioning",
    ],
    deliverables: [
      "Kitchen Layout & Elevation Drawings",
      "3D Rendered Visualisation",
      "Bill of Quantities",
      "Installed & Commissioned Kitchen",
    ],
  },
  {
    id: "wardrobes-storage",
    number: "03",
    title: "Wardrobes & Storage",
    description:
      "Smart wardrobe and storage solutions that maximise every inch of your space. From walk-in closets to compact sliding wardrobes, we design for organisation and elegance.",
    image: "/images/projects/trifecta-retto/hero.jpg",
    tags: ["Custom Wardrobes", "Walk-In Closets", "Storage Optimisation"],
    features: [
      "Custom Size & Configuration",
      "Sliding & Hinged Door Options",
      "Interior Organiser Systems",
      "Mirror & Loft Integration",
      "Premium Laminates & Hardware",
      "Space-Maximising Designs",
    ],
    process: [
      "Space Measurement & Assessment",
      "Design & Configuration Planning",
      "Material & Finish Selection",
      "Manufacturing",
      "Site Installation",
    ],
    deliverables: [
      "Wardrobe Design Drawings",
      "3D Interior Layout",
      "Installed & Finished Wardrobe",
      "Hardware Warranty Documentation",
    ],
  },
  {
    id: "custom-furniture",
    number: "04",
    title: "Custom Furniture",
    description:
      "Tailor-made furniture designed to complement your interiors perfectly. Every piece is crafted with precision to match your space, style, and functional requirements.",
    image: "/images/projects/bhavisha-homes/hero.jpg",
    tags: ["Bespoke Furniture", "Custom Joinery", "Craftsmanship"],
    features: [
      "Bespoke Design & Detailing",
      "Skilled Craftsmanship",
      "Wide Material Selection",
      "Upholstery & Fabric Options",
      "TV Units & Entertainment Setups",
      "Study Tables, Beds & Seating",
    ],
    process: [
      "Design Brief & Reference",
      "Design Drawing & Approval",
      "Material Selection",
      "Workshop Production",
      "Delivery & Installation",
    ],
    deliverables: [
      "Furniture Design Drawings",
      "Material Sample Approval",
      "Handcrafted Finished Piece",
      "Placement & Installation",
    ],
  },
  {
    id: "renovations",
    number: "05",
    title: "Home & Commercial Renovations",
    description:
      "Transforming existing spaces with modern designs and improved functionality. From fresh coats of paint to complete structural overhauls, we handle renovations of all scales.",
    image: "/images/projects/prestige-avalon-park/hero.jpg",
    tags: ["Residential Renovation", "Commercial Refurbishment", "Remodelling"],
    features: [
      "Full & Partial Renovation",
      "False Ceiling & POP Work",
      "Flooring & Tiling",
      "Painting & Wall Treatment",
      "Electrical & Plumbing Upgrades",
      "Space Reconfiguration",
    ],
    process: [
      "Site Assessment & Scope Finalisation",
      "Renovation Design & Planning",
      "Material & Vendor Selection",
      "Execution & Supervision",
      "Finishing, Cleaning & Handover",
    ],
    deliverables: [
      "Renovation Scope Document",
      "Execution Timeline",
      "Fully Renovated Space",
      "Post-Handover Support",
    ],
  },
  {
    id: "vastu-planning",
    number: "06",
    title: "Vastu Planning",
    description:
      "Thoughtful space layouts incorporating Vastu Shastra principles as desired by our clients — balancing ancient wisdom with contemporary design for harmonious living.",
    image: "/images/projects/sbr-horizon/03.jpg",
    tags: ["Vastu Consultation", "Space Orientation", "Harmonious Design"],
    features: [
      "Vastu-Compliant Layout Planning",
      "Room Orientation Guidance",
      "Entrance & Door Positioning",
      "Kitchen & Master Bedroom Placement",
      "Colour & Material Recommendations",
      "Remedial Vastu Solutions",
    ],
    process: [
      "Site & Plan Analysis",
      "Vastu Audit & Recommendations",
      "Revised Layout Planning",
      "Material & Colour Guidance",
      "Implementation Support",
    ],
    deliverables: [
      "Vastu Analysis Report",
      "Revised Floor Plan",
      "Room-wise Recommendations",
      "Implementation Guidelines",
    ],
  },
];
