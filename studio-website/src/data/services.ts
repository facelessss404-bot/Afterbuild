// ============================================================
// SERVICES & SCOPE OF WORK DATA — AfterBuild Studio
// Specialists in Turnkey Architecture, Spatial Solutions & Interiors
// ============================================================

export interface Service {
  id: string;
  number: string;
  title: string;
  shortTitle?: string;
  description: string;
  image: string;
  tags: string[];
  features: string[];
  process?: string[];
  deliverables?: string[];
}

export const services: Service[] = [
  {
    id: "turnkey-projects",
    number: "01",
    title: "Turnkey Projects",
    shortTitle: "Turnkey Execution",
    description:
      "Complete end-to-end management from concept blueprint to physical handover. We take single-point accountability for design, civil restructuring, materials, joinery, and on-site execution with uncompromising quality.",
    image: "/images/projects/gk-gateway/hero.jpg",
    tags: ["Turnkey Delivery", "Single-Point Accountability", "Site Supervision"],
    features: [
      "End-to-End Design & Site Management",
      "Bill of Quantities (BOQ) Transparency",
      "Material Procurement & Quality Audits",
      "Dedicated On-Site Project Engineers",
      "Timely Milestones & Transparent Tracking",
      "Snag-Free Handover & Deep Clean",
    ],
    process: [
      "Initial Consultation & Scope Mapping",
      "Costing, Timeline & Detailed BOQ",
      "3D Architectural Visualisation & Approvals",
      "Turnkey Site Execution & Quality Supervision",
      "Defect Audit & Key Handover",
    ],
    deliverables: [
      "Complete Master Execution Schedule",
      "Transparent Milestone Contracts",
      "Weekly Progress Site Logs",
      "Fully Finished, Move-In Ready Space",
    ],
  },
  {
    id: "architecture-spatial-solutions",
    number: "02",
    title: "Architecture & Spatial Solutions",
    shortTitle: "Architecture & Solutions",
    description:
      "Engineering-led architectural design and spatial problem-solving. We conceptualize structural layouts, elevation treatments, volume optimization, and natural light channeling that elevate everyday living.",
    image: "/images/projects/sbr-horizon/hero.jpg",
    tags: ["Architectural Design", "Structural Planning", "Spatial Engineering"],
    features: [
      "Architectural Layouts & Volumetric Planning",
      "Structural Alterations & Wall Openings",
      "Elevation Detailing & Facade Treatment",
      "Daylight & Natural Ventilation Flow",
      "Building Code Compliance & Vastu Integration",
      "Detailed Working Construction Drawings",
    ],
    process: [
      "Spatial Audit & Structural Feasibility",
      "Architectural Schematic Drafts",
      "3D Volumetric & Elevation Modeling",
      "Structural Engineering Coordination",
      "Supervised Site Construction Execution",
    ],
    deliverables: [
      "Comprehensive Architectural Blueprints",
      "Structural Working Drawings",
      "3D Exterior/Interior Visualizations",
      "Site Staking & Alignment Reports",
    ],
  },
  {
    id: "interiors-space-planning",
    number: "03",
    title: "Interiors & Space Planning",
    shortTitle: "Interiors & Planning",
    description:
      "Thoughtful space planning that balances function, form, comfort, and character. We look at every square foot as an opportunity to improve flow, human ergonomics, and emotional serenity.",
    image: "/images/projects/trifecta-retto/01.jpg",
    tags: ["Luxury Interiors", "Space Ergonomics", "Vastu Harmony"],
    features: [
      "Ergonomic Floor Planning & Traffic Flow",
      "3D Photorealistic Visualisation",
      "Material, Fabric & Finish Moodboards",
      "Architectural Lighting Curation",
      "Vastu-Aligned Room Placements",
      "Custom Spatial Styling & Accessories",
    ],
    process: [
      "Client Lifestyle & Requirement Discovery",
      "Concept Zoning & Flow Planning",
      "3D Spatial Walkthroughs",
      "Finish & Palette Finalisation",
      "Integrated On-Site Fitout",
    ],
    deliverables: [
      "Dimensioned Interior Layout Plans",
      "3D Photorealistic Renderings",
      "Material Spec Sheets & Boards",
      "Final Curated Interior Handover",
    ],
  },
  {
    id: "wardrobes-storage",
    number: "04",
    title: "Wardrobes & Modular Storage",
    shortTitle: "Wardrobes & Storage",
    description:
      "Precision-crafted custom wardrobes and storage systems that maximize volume and elegance. From rose-gold anodized aluminum sliding profiles with lacquered glass to walk-in closets and integrated dressers.",
    image: "/images/projects/prestige-avalon-park/05.jpg",
    tags: ["Lacquered Glass", "Rose-Gold Aluminum", "Walk-In Closets"],
    features: [
      "Floor-to-Ceiling Sliding & Hinged Wardrobes",
      "Rose-Gold & Bronze Anodized Aluminum Trims",
      "Lacquered Glass, Tinted Mirror & Acrylics",
      "Integrated Sensor LED Strip Illumination",
      "Modular Drawers, Jewelry Trays & Pant Racks",
      "Heavy-Duty Concealed Soft-Close Hardware",
    ],
    process: [
      "Precise Laser Site Measurement",
      "Internal Configuration & Layout Selection",
      "Hardware & Finish Selection",
      "Factory Precision Processing",
      "Master Artisan Site Installation",
    ],
    deliverables: [
      "Internal Storage Division Drawings",
      "Material & Hardware Specifications",
      "Installed & Commissioned Wardrobes",
      "Comprehensive Hardware Warranty",
    ],
  },
  {
    id: "furniture-millwork",
    number: "05",
    title: "Custom Furniture & Joinery",
    shortTitle: "Custom Furniture",
    description:
      "Bespoke furniture crafted to harmonize with your architectural language. Handcrafted entertainment credenzas, dining centerpieces, accent headboards, and executive study suites made by our master craftsmen.",
    image: "/images/projects/bhavisha-homes/hero.jpg",
    tags: ["Bespoke Joinery", "Master Craftsmanship", "Custom Millwork"],
    features: [
      "Custom Media Walls & Floating Consoles",
      "Fluted Paneling & Veneer Joinery",
      "Bespoke Dining Tables & Accent Chairs",
      "Acoustic Upholstered Headboards",
      "Custom Study & Home Office Units",
      "Premium Hardware & Natural Polish",
    ],
    process: [
      "Custom Furniture Sketching & Sizing",
      "Timber & Upholstery Selection",
      "Atelier Joinery Fabrication",
      "Finishing, Polish & PU Coating",
      "Careful Delivery & Placement",
    ],
    deliverables: [
      "Custom Millwork Fabrication Drawings",
      "Veneer / Laminate Approval Samples",
      "Bespoke Handcrafted Furniture Pieces",
      "Installation & Care Manual",
    ],
  },
  {
    id: "aluminum-interiors",
    number: "06",
    title: "Aluminum Interiors & Slimline Glass",
    shortTitle: "Aluminum Interiors",
    description:
      "Contemporary slimline aluminum interior architecture: minimalist glass partition systems, fluted glass sliders, pocket doors, and architectural metal shelving that provide modern transparency.",
    image: "/images/projects/prestige-avalon-park/02.jpg",
    tags: ["Aluminum Profiles", "Fluted Glass", "Slimline Partitions"],
    features: [
      "Slimline Architectural Aluminum Profiles",
      "Acoustic Fluted & Clear Glass Partitions",
      "Pocket Sliding & Bi-Fold Partition Systems",
      "Anodized Champagne, Black & Rose-Gold Finishes",
      "Aluminum-Framed Glass Display Cabinets",
      "Durable, Rust-Free & High-Precision Fit",
    ],
    process: [
      "Aperture Laser Calibration",
      "Profile & Glass Spec Engineering",
      "Precision Factory Extrusion & Miter Cuts",
      "Site Alignment & Vibration Damping",
      "Smooth Glide Hardware Testing",
    ],
    deliverables: [
      "Architectural Section Details",
      "Engineered Glazing Drawings",
      "Seamlessly Fitted Aluminum Systems",
      "Smooth Mechanism Certification",
    ],
  },
  {
    id: "civil-work",
    number: "07",
    title: "Civil Work & Structural Alterations",
    shortTitle: "Civil Work",
    description:
      "Heavy-duty civil interventions executed with structural precision. From wall demolitions, floor level adjustments, and waterproofing to premium Italian tiling, granite laying, and false ceiling pop architectures.",
    image: "/images/projects/prestige-avalon-park/01.jpg",
    tags: ["Civil Renovations", "False Ceilings", "Tile & Granite"],
    features: [
      "Internal Wall Removals & Beam Reinforcement",
      "Waterproofing & Moisture Barrier Treatment",
      "Large-Format Vitrified & Italian Marble Flooring",
      "POP, Gypsum & Wooden False Ceilings",
      "Kitchen & Bathroom Plumbing Overhaul",
      "Debris Disposal & Clean Site Maintenance",
    ],
    process: [
      "Structural Stability & Wall Inspection",
      "Controlled Demolition & Civil Masonry",
      "Plumbing & Concealed Infrastructure",
      "Subfloor Leveling & Precision Tiling",
      "Ceiling Framing & Finishing",
    ],
    deliverables: [
      "Structural Civil Modification Approvals",
      "Plumbing Route Mapping",
      "Leveling & Waterproofing Guarantee",
      "Flawlessly Finished Surfaces",
    ],
  },
  {
    id: "painting-electrical",
    number: "08",
    title: "Painting, Surface Finishes & Electrical",
    shortTitle: "Painting & Electrical",
    description:
      "The vital tactile layer that brings architecture to life. High-end PU finishes, luxury lime plaster, stucco textures, concealed conduit electrical upgrades, smart lighting automation, and cove mood lighting.",
    image: "/images/projects/sbr-horizon/03.jpg",
    tags: ["Luxury Finishes", "Architectural Lighting", "Smart Automation"],
    features: [
      "Italian PU, Duco & Polyurethane Spray Coatings",
      "Textured Wall Art, Stucco & Lime Wash Finishes",
      "Concealed Conduit Electrical Re-Wiring",
      "Architectural Cove & Magnetic Track Lighting",
      "Smart Dimming & Scene Automation Integration",
      "Premium Modular Switches & Safety Breakers",
    ],
    process: [
      "Electrical Load Calculation & Lighting Schematics",
      "Concealed Conduit Chasing & Wiring",
      "Surface Sanding, Priming & Putty Preparation",
      "Multi-Coat Paint & Specialty Texture Application",
      "Fixture Mounting & Light Scene Commissioning",
    ],
    deliverables: [
      "Single-Line Electrical Diagrams",
      "Lighting Circuit Plan & Schedules",
      "Paint Shade & Finish Records",
      "Full Electrical Safety Certification",
    ],
  },
];
