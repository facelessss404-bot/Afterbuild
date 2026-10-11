"use client";

import { useEffect, useState } from "react";
import { siteConfig } from "@/data/site";

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [hidden, setHidden] = useState(false);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    // Elegant, deliberate pacing (~2.2s total to reach 100%) so brand name & details are clearly visible
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        // Smooth gradual stepping
        const increment = Math.random() * 4.5 + 2.5;
        return Math.min(prev + increment, 100);
      });
    }, 60);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress >= 100) {
      // Hold at 100% for 600ms so the user can comfortably take in the studio identity
      const t1 = setTimeout(() => setFading(true), 650);
      const t2 = setTimeout(() => {
        setHidden(true);
        document.body.style.overflow = "";
      }, 1300);
      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
      };
    }
  }, [progress]);

  if (hidden) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 99999,
        background: "#FAF8F5",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "22px",
        transition: "opacity 0.65s cubic-bezier(0.16, 1, 0.3, 1), transform 0.65s ease",
        opacity: fading ? 0 : 1,
        transform: fading ? "scale(1.02)" : "scale(1)",
        pointerEvents: fading ? "none" : "all",
      }}
    >
      {/* Official Brand Logo Plaque */}
      <div
        style={{
          position: "relative",
          width: "78px",
          height: "72px",
          opacity: progress > 10 ? 1 : 0.15,
          transform: `scale(${0.92 + (progress / 100) * 0.08})`,
          transition: "opacity 0.6s ease, transform 0.6s ease",
          borderRadius: "14px",
          overflow: "hidden",
          border: "1px solid rgba(158, 121, 72, 0.35)",
          boxShadow: "0 12px 36px rgba(20, 19, 18, 0.08), 0 0 24px rgba(158, 121, 72, 0.12)",
          background: "#FFFFFF",
          padding: "5px",
        }}
      >
        <img
          src="/images/company_logo.png"
          alt="AfterBuild Studio Official Logo"
          style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }}
        />
      </div>

      {/* Brand name — character reveal */}
      <div style={{ display: "flex", alignItems: "center", gap: "3px" }}>
        {siteConfig.name.split("").map((char, i) => (
          <span
            key={i}
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.3rem, 2.8vw, 2.2rem)",
              letterSpacing: "0.26em",
              textTransform: "uppercase",
              color: "#141312",
              fontWeight: 500,
              opacity: progress > i * 4 ? 1 : 0.08,
              transform: `translateY(${progress > i * 4 ? 0 : 8}px)`,
              transition: `opacity 0.4s ease ${i * 0.03}s, transform 0.4s ease ${i * 0.03}s`,
            }}
          >
            {char}
          </span>
        ))}
      </div>

      {/* Tagline & Identity */}
      <div style={{ textAlign: "center", maxWidth: "360px" }}>
        <p
          style={{
            fontSize: "10px",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "#9E7948",
            fontWeight: 600,
            opacity: progress > 30 ? 1 : 0,
            transition: "opacity 0.5s ease",
            marginBottom: "4px",
          }}
        >
          {siteConfig.tagline}
        </p>
        <p
          style={{
            fontSize: "9px",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "#7A746C",
            opacity: progress > 50 ? 1 : 0,
            transition: "opacity 0.5s ease",
          }}
        >
          Indiranagar, Bangalore &bull; Est. 2023
        </p>
      </div>

      {/* Progress bar */}
      <div
        style={{
          width: "clamp(140px, 22vw, 220px)",
          height: "2px",
          background: "rgba(20, 19, 18, 0.08)",
          position: "relative",
          overflow: "hidden",
          borderRadius: "1px",
          marginTop: "6px",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            height: "100%",
            width: `${Math.min(progress, 100)}%`,
            background: "linear-gradient(90deg, #9E7948 0%, #C9A84C 100%)",
            transition: "width 0.12s ease",
          }}
        />
      </div>

      {/* Percentage */}
      <span
        style={{
          fontSize: "10px",
          letterSpacing: "0.2em",
          color: "#8C857B",
          fontFamily: "var(--font-sans)",
          fontWeight: 500,
        }}
      >
        {Math.round(Math.min(progress, 100))}%
      </span>
    </div>
  );
}
