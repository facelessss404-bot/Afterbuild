import HeroSection from "@/components/sections/HeroSection";
import IntroSection from "@/components/sections/IntroSection";
import ServicesSection from "@/components/sections/ServicesSection";
import StatsSection from "@/components/sections/StatsSection";
import CredentialsSection from "@/components/sections/CredentialsSection";
import FeaturedProjects from "@/components/sections/FeaturedProjects";
import ProjectIndex from "@/components/sections/ProjectIndex";
import PhilosophySection from "@/components/sections/PhilosophySection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import SocialSection from "@/components/sections/SocialSection";
import ContactCTA from "@/components/sections/ContactCTA";

export default function HomePage() {
  return (
    <>
      {/* 01. Hero — Full-screen cinematic with 3D shader + atmospheric bg */}
      <HeroSection />

      {/* 02. Studio Introduction — Centered scroll-reveal text */}
      <IntroSection />

      {/* 03. Services — Two-column with image + accordion */}
      <ServicesSection />

      {/* 04. Stats — Animated counter numbers */}
      <StatsSection />

      {/* 05. Credentials — Stats text + stacked images */}
      <CredentialsSection />

      {/* 06. Featured Projects — Full-screen scroll gallery */}
      <FeaturedProjects />

      {/* 07. Project Index — Ivory background list with hover preview */}
      <ProjectIndex />

      {/* 08. Philosophy — Three-column pillar cards + quote */}
      <PhilosophySection />

      {/* 09. Testimonials — White background with arrows */}
      <TestimonialsSection />

      {/* 10. Social — Instagram grid feed */}
      <SocialSection />

      {/* 11. CTA — Rounded container with background image */}
      <ContactCTA />
    </>
  );
}
