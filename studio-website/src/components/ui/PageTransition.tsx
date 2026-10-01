"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";

export default function PageTransition() {
  const pathname = usePathname();
  const overlayRef = useRef<HTMLDivElement>(null);
  const [isFirst, setIsFirst] = useState(true);

  useEffect(() => {
    // Skip first mount (preloader handles entrance)
    if (isFirst) {
      setIsFirst(false);
      return;
    }

    const overlay = overlayRef.current;
    if (!overlay) return;

    // Enter transition
    const tl = gsap.timeline();
    tl.set(overlay, { display: "block" })
      .fromTo(
        overlay,
        { clipPath: "inset(100% 0 0 0)" },
        {
          clipPath: "inset(0% 0 0 0)",
          duration: 0.35,
          ease: "power4.inOut",
        }
      )
      .to(overlay, {
        clipPath: "inset(0 0 100% 0)",
        duration: 0.35,
        ease: "power4.inOut",
        delay: 0.05,
      })
      .set(overlay, { display: "none" });

    return () => {
      tl.kill();
      gsap.set(overlay, { display: "none" });
    };
  }, [pathname, isFirst]);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[9999] bg-charcoal pointer-events-none hidden"
      aria-hidden="true"
    />
  );
}
