"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScrollProvider() {
  const pathname = usePathname();

  // Kill ALL ScrollTriggers on every route change to prevent removeChild crash
  useEffect(() => {
    // Small delay to let the new page mount its own triggers first
    const t = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);
    return () => clearTimeout(t);
  }, [pathname]);

  // Kill all on unmount
  useEffect(() => {
    return () => {
      try {
        ScrollTrigger.getAll().forEach((st) => st.kill());
        ScrollTrigger.clearScrollMemory?.();
      } catch (_) {}
    };
  }, []);

  // Lenis smooth scroll
  useEffect(() => {
    let lenis: any;
    let rafId: number;

    const init = async () => {
      try {
        const Lenis = (await import("lenis")).default;
        lenis = new Lenis({
          duration: 1.2,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          smoothWheel: true,
        });

        // Sync Lenis with GSAP ScrollTrigger
        lenis.on("scroll", ScrollTrigger.update);

        const raf = (time: number) => {
          lenis.raf(time);
          rafId = requestAnimationFrame(raf);
        };
        rafId = requestAnimationFrame(raf);
      } catch {
        // Lenis not available — fallback to native scroll
      }
    };

    init();

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      if (lenis) lenis.destroy();
    };
  }, []);

  return null;
}
