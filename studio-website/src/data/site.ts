// ============================================================
// SITE CONFIGURATION — AfterBuild Studio
// Single Source of Truth for Client Data & Studio Identity
// ============================================================

export const getDirectionsUrl = (address: string) =>
  `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`;

export const siteConfig = {
  name: "AfterBuild Studio",
  entityName: "AfterBuild Studio LLP",
  tagline: "Architecture, Spatial Solutions & Interior Design",
  description:
    "Designing spaces with purpose. Building experiences with intention. Turnkey architecture, spatial solutions, and luxury interiors delivered across Bangalore.",
  email: "afterbuildstudio@gmail.com",
  phone: "+91 98869 59731",
  secondaryPhone: "+91 88848 07955",
  whatsapp: "919886959731",
  location: "Indiranagar, Bangalore, India",
  experienceYears: "3.5+ Years",
  projectsCompleted: "160+",
  craftsmenNetwork: "75+",
  specializations: [
    "Turnkey Projects",
    "Interiors & Space Planning",
    "Architecture & Spatial Solutions",
    "Custom Furniture & Millwork",
    "Aluminum Interiors",
    "Civil Work & Structural Alterations",
    "Luxury Painting & Surface Finishes",
    "Electrical, Automation & Architectural Lighting",
  ],
  contact: {
    address:
      "No. 2282/G, HAL 2nd Stage, 18th 'A' Main, Behind Leela Palace Rd, Indiranagar, Bengaluru, Karnataka 560008",
  },
  address: {
    line1: "No. 2282/G, HAL 2nd Stage",
    line2: "18th 'A' Main, Behind Leela Palace Rd",
    line3: "Indiranagar",
    city: "Bengaluru",
    state: "Karnataka",
    pin: "560008",
    full: "No. 2282/G, HAL 2nd Stage, 18th 'A' Main, Behind Leela Palace Rd, Indiranagar, Bengaluru, Karnataka 560008",
    mapUrl:
      "https://maps.google.com/?q=No.+2282/G,+HAL+2nd+Stage,+18th+'A'+Main,+Behind+Leela+Palace+Rd,+Indiranagar,+Bengaluru,+Karnataka+560008",
    directionsUrl:
      "https://www.google.com/maps/dir/?api=1&destination=No.%202282%2FG%2C%20HAL%202nd%20Stage%2C%2018th%20'A'%20Main%2C%20Behind%20Leela%20Palace%20Rd%2C%20Indiranagar%2C%20Bengaluru%2C%20Karnataka%20560008",
  },
  hours: "Monday to Saturday: 9:00 AM – 6:00 PM",
  hoursNote: "Sundays: Closed",
  website: "https://afterbuilds.com",
  instagram: "https://www.instagram.com/interiors_afterbuild_studio?dlrf=MXJpaTVuNzRpYTE4cg==",
  instagramHandle: "interiors_afterbuild_studio",
  linkedin: "https://www.linkedin.com/company/ocean-decorr/",
  facebook: "https://www.facebook.com/share/1cwzKmcW26/?mibextid=wwXIfr",
  founded: "2023",
  foundedNote: "Began as Ocean Decor in May 2023",
  careers: {
    active: true,
    description:
      "We are always looking for passionate designers, architects, and craftsmen. Send your portfolio and resume to:",
    email: "afterbuildstudio@gmail.com",
  },
  founder: {
    name: "Mohammed Farmaan Azam K",
    role: "Founder & Director",
    studio: "AfterBuild Studio",
    tagline: "Designing spaces with purpose. Building experiences with intention.",
    image: "/images/founder.jpg",
    bio: [
      "With over a decade of experience across business development, strategic sales, client relationships and entrepreneurship, Mohammed Farmaan Azam K brings a distinctive business-led perspective to the world of interiors and spatial design.",
      "An Engineering graduate from Dr. Ambedkar Institute of Technology, Farmaan began his professional journey in business development and leadership roles, working with organisations including BYJU'S, Lomos Archilabs and TautMore.",
      "These experiences shaped a fundamental belief that continues to guide his work today: Great spaces begin with understanding people.",
      "Today, as the Founder & Director of AfterBuild Studio, Farmaan brings together his engineering background, business experience and passion for design to create spaces that are purposeful, refined and built around the way people actually live and work.",
    ],
    beyondInteriors: {
      headline: "Beyond Interiors",
      intro: "At AfterBuild Studio, design is approached as more than aesthetics. Every project begins with understanding the person, the space and the purpose behind it.",
      pillarsText: "From the first conversation to space planning, design development, material selection and execution, the focus remains on creating environments that balance: Function. Form. Comfort. Character.",
      conclusion: "Whether it is a contemporary home, a thoughtfully planned apartment, a renovation or a commercial environment, Farmaan believes that every project deserves a design language of its own.",
    },
    note: {
      title: "A Note From the Founder",
      quote: "A well-designed space should feel effortless.",
      paragraphs: [
        "Your home is one of the most personal spaces you will ever create. It should reflect your lifestyle, your personality and the way you want to experience everyday life.",
        "At AfterBuild Studio, we believe interior design begins long before choosing colours, finishes or furniture. It begins with understanding how a space should function, flow and feel.",
        "Our approach is rooted in thoughtful space planning, practical design and attention to detail. We look at every square foot as an opportunity to improve the way a space is experienced.",
        "My vision for AfterBuild Studio is to bring together design, engineering, craftsmanship and transparency to create interiors that remain relevant beyond trends.",
        "Because ultimately, we are not simply designing rooms. We are creating the spaces where life unfolds.",
      ],
      signoff: "— Mohammed Farmaan Azam K\nFounder & Director\nAfterBuild Studio",
    },
    vision: {
      title: "The AfterBuild Vision",
      statement: "To create thoughtfully designed spaces where architecture, interiors and everyday living come together seamlessly.",
      aim: "Our aim is simple — to make good design more purposeful, more accessible and more personal, while maintaining uncompromising attention to quality and execution.",
      closing: "AfterBuild Studio — Designing spaces. Shaping experiences.",
    },
  },
};
