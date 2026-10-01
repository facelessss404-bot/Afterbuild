"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ParallaxImageProps {
  src: string;
  alt: string;
  parallaxStrength?: number;
  className?: string;
  priority?: boolean;
  fill?: boolean;
  width?: number;
  height?: number;
  revealOnScroll?: boolean;
}

export default function ParallaxImage({
  src,
  alt,
  parallaxStrength = 20,
  className = "",
  priority = false,
  fill = false,
  width,
  height,
  revealOnScroll = true,
}: ParallaxImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const image = imageRef.current;
    if (!container || !image) return;

    const ctx = gsap.context(() => {
      if (revealOnScroll) {
        // Image reveal animation: clip-path expands
        gsap.set(container, { clipPath: "inset(0 30% 0 0)" });
        gsap.set(image, { scale: 1.15 });

        ScrollTrigger.create({
          trigger: container,
          start: "top 80%",
          end: "top 30%",
          onEnter: () => {
            gsap.to(container, {
              clipPath: "inset(0 0% 0 0)",
              duration: 1.4,
              ease: "power4.out",
            });
            gsap.to(image, {
              scale: 1,
              duration: 1.6,
              ease: "power4.out",
            });
          },
          once: true,
        });
      }

      // Parallax on scroll
      gsap.to(image, {
        y: parallaxStrength,
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, [parallaxStrength, revealOnScroll]);

  return (
    <div ref={containerRef} className={`overflow-hidden ${className}`}>
      <div ref={imageRef} className="h-full w-full scale-110">
        {fill ? (
          <Image
            src={src}
            alt={alt}
            fill
            className="object-cover"
            priority={priority}
          />
        ) : (
          <Image
            src={src}
            alt={alt}
            width={width || 1200}
            height={height || 800}
            className="w-full h-full object-cover"
            priority={priority}
          />
        )}
      </div>
    </div>
  );
}
