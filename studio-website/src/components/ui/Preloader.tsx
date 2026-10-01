"use client";

import { useEffect, useState } from "react";
import { siteConfig } from "@/data/site";

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [hidden, setHidden] = useState(false);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return Math.min(prev + Math.random() * 18 + 6, 100);
      });
    }, 100);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress >= 100) {
      const t1 = setTimeout(() => setFading(true), 200);
      const t2 = setTimeout(() => {
        setHidden(true);
        document.body.style.overflow = "";
      }, 700);
      return () => { clearTimeout(t1); clearTimeout(t2); };
    }
  }, [progress]);

  if (hidden) return null;

  return (
    <div style={{
      position: "fixed",
      inset: 0,
      zIndex: 99999,
      background: "#0a0a09",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: "24px",
      transition: "opacity 0.5s ease",
      opacity: fading ? 0 : 1,
      pointerEvents: fading ? "none" : "all",
    }}>
      {/* Brand name — character reveal */}
      <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
        {siteConfig.name.split("").map((char, i) => (
          <span
            key={i}
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.2rem, 2.5vw, 2rem)",
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: "#f3f0ea",
              opacity: progress > i * 7 ? 1 : 0.08,
              transform: `translateY(${progress > i * 7 ? 0 : 10}px)`,
              transition: `opacity 0.4s ease ${i * 0.04}s, transform 0.4s ease ${i * 0.04}s`,
            }}
          >
            {char}
          </span>
        ))}
      </div>

      {/* Tagline */}
      <p style={{
        fontSize: "10px",
        letterSpacing: "0.3em",
        textTransform: "uppercase",
        color: "rgba(168,163,155,0.5)",
        opacity: progress > 40 ? 1 : 0,
        transition: "opacity 0.5s ease",
      }}>
        {siteConfig.tagline}
      </p>

      {/* Progress bar */}
      <div style={{
        width: "clamp(120px, 20vw, 200px)",
        height: "1px",
        background: "rgba(243,240,234,0.08)",
        position: "relative",
        overflow: "hidden",
      }}>
        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          height: "100%",
          width: `${Math.min(progress, 100)}%`,
          background: "var(--bronze)",
          transition: "width 0.15s ease",
        }} />
      </div>

      {/* Percentage */}
      <span style={{
        fontSize: "9px",
        letterSpacing: "0.2em",
        color: "rgba(177,166,150,0.4)",
        fontFamily: "var(--font-sans)",
      }}>
        {Math.round(Math.min(progress, 100))}%
      </span>
    </div>
  );
}
