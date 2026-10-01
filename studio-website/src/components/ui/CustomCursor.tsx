"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const textSpanRef = useRef<HTMLSpanElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Disable on touch devices
    if (typeof window === "undefined") return;
    const isTouchDevice =
      "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    const label = labelRef.current;
    const textSpan = textSpanRef.current;
    if (!dot || !ring || !label || !textSpan) return;

    const handleMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY };
    };

    let animationFrameId: number;
    const raf = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.15;
      pos.current.y += (target.current.y - pos.current.y) * 0.12;

      gsap.set(dot, {
        x: target.current.x - 4,
        y: target.current.y - 4,
      });
      gsap.set(ring, {
        x: pos.current.x - 20,
        y: pos.current.y - 20,
      });
      gsap.set(label, {
        x: pos.current.x - 40,
        y: pos.current.y - 40,
      });

      animationFrameId = requestAnimationFrame(raf);
    };

    // Hover state handlers
    const handleEnter = (e: MouseEvent) => {
      const el = (e.target as HTMLElement).closest("[data-cursor]");
      if (el) {
        const text = el.getAttribute("data-cursor") || "";
        textSpan.textContent = text;
        gsap.to(ring, { scale: 0, duration: 0.3 });
        gsap.to(label, { scale: 1, opacity: 1, duration: 0.3 });
      }
    };

    const handleLeave = () => {
      gsap.to(ring, { scale: 1, duration: 0.3 });
      gsap.to(label, { scale: 0.5, opacity: 0, duration: 0.3 });
    };

    window.addEventListener("mousemove", handleMove, { passive: true });
    document.addEventListener("mouseover", handleEnter, { passive: true });
    document.addEventListener("mouseout", handleLeave, { passive: true });
    animationFrameId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseover", handleEnter);
      document.removeEventListener("mouseout", handleLeave);
    };
  }, []);

  return (
    <>
      {/* Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-white z-[99997] pointer-events-none hidden md:block"
        style={{ mixBlendMode: "difference" }}
      />
      {/* Ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-10 h-10 rounded-full border border-white/40 z-[99996] pointer-events-none hidden md:block"
        style={{ mixBlendMode: "difference" }}
      />
      {/* Label */}
      <div
        ref={labelRef}
        className="fixed top-0 left-0 w-20 h-20 rounded-full bg-ivory flex items-center justify-center z-[99996] pointer-events-none hidden md:block"
        style={{ opacity: 0, scale: 0.5 }}
      >
        <span ref={textSpanRef} className="text-charcoal text-[9px] font-mono tracking-wider uppercase font-bold" />
      </div>
    </>
  );
}
