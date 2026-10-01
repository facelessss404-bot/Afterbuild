"use client";

import { useEffect, useState } from "react";

export function useMouseParallax() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    let frameId: number;

    const handleMouseMove = (e: MouseEvent) => {
      cancelAnimationFrame(frameId);
      frameId = requestAnimationFrame(() => {
        setPosition({
          x: (e.clientX / window.innerWidth - 0.5) * 2,
          y: (e.clientY / window.innerHeight - 0.5) * 2,
        });
      });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(frameId);
    };
  }, []);

  return position;
}
