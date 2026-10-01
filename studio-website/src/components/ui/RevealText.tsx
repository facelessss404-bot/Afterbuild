"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface RevealTextProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  stagger?: number;
  splitBy?: "lines" | "words" | "chars";
}

export default function RevealText({
  children,
  className = "",
  delay = 0,
  stagger = 0.08,
}: RevealTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      // Split text into lines by wrapping each paragraph/line element
      const lines = el.querySelectorAll(".reveal-line");

      gsap.set(lines, { yPercent: 110, opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          end: "bottom 60%",
          toggleActions: "play none none reverse",
        },
      });

      tl.to(lines, {
        yPercent: 0,
        opacity: 1,
        duration: 1.1,
        ease: "power4.out",
        stagger: stagger,
        delay: delay,
      });
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, [delay, stagger]);

  return (
    <div ref={containerRef} className={`overflow-hidden ${className}`}>
      {children}
    </div>
  );
}

// Wrapper for individual lines
export function RevealLine({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className="overflow-hidden">
      <div className={`reveal-line ${className}`}>{children}</div>
    </div>
  );
}
