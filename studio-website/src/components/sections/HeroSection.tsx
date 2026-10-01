"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { siteConfig } from "@/data/site";

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power4.out" },
        delay: 1.2,
      });

      // Image reveal from clip-path
      tl.fromTo(
        ".hero-img",
        { clipPath: "inset(8% 8% 8% 8%)", scale: 1.08, opacity: 0.7 },
        { clipPath: "inset(0% 0% 0% 0%)", scale: 1, opacity: 1, duration: 1.8, ease: "power4.inOut" }
      )
      .fromTo(".hero-eyebrow", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.7 }, "-=1.1")
      .fromTo(".hero-title-line", { yPercent: 110 }, { yPercent: 0, duration: 1.0, stagger: 0.1 }, "-=0.7")
      .fromTo(".hero-sub", { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.8 }, "-=0.5")
      .fromTo(".hero-bottom", { opacity: 0 }, { opacity: 1, duration: 0.6 }, "-=0.3");
    }, sectionRef);

    return () => { try { ctx.revert(); } catch (_) {} };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="section-hero"
      style={{
        position: "relative",
        height: "100dvh",
        minHeight: "600px",
        overflow: "hidden",
        background: "#0a0a09",
      }}
      aria-label="Hero"
    >
      {/* Full-bleed hero image */}
      <div
        className="hero-img"
        style={{ position: "absolute", inset: 0, zIndex: 2 }}
      >
        <Image
          src="/images/projects/sbr-horizon/hero.jpg"
          alt="AfterBuild Studio — Interior Design & Architecture, Bangalore"
          fill
          priority
          style={{ objectFit: "cover", objectPosition: "center" }}
          quality={90}
          sizes="100vw"
        />
        {/* Gradient overlay */}
        <div style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to bottom, rgba(0,0,0,0.38) 0%, rgba(0,0,0,0.04) 38%, rgba(0,0,0,0.18) 60%, rgba(0,0,0,0.78) 100%)",
        }} />
      </div>

      {/* Foreground content */}
      <div style={{
        position: "relative",
        zIndex: 10,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        paddingInline: "var(--gutter)",
        paddingBottom: "clamp(40px, 6vh, 72px)",
      }}>
        <div style={{ maxWidth: "var(--max-w)", width: "100%", marginInline: "auto" }}>

          {/* Eyebrow */}
          <div className="hero-eyebrow" style={{
            display: "flex", alignItems: "center", gap: "12px",
            marginBottom: "clamp(16px, 2vw, 28px)",
          }}>
            <span style={{ width: "32px", height: "1px", background: "var(--bronze)", display: "block" }} />
            <span style={{ fontSize: "10px", letterSpacing: "0.28em", textTransform: "uppercase", color: "var(--bronze)" }}>
              Architecture & Interior Design
            </span>
          </div>

          {/* Large editorial heading */}
          <h1 style={{ overflow: "hidden", marginBottom: "clamp(20px, 3vw, 40px)" }}>
            <span style={{ display: "block", overflow: "hidden" }}>
              <span className="hero-title-line" style={{
                display: "block",
                fontFamily: "var(--font-display)",
                fontSize: "var(--text-hero)",
                fontWeight: 400,
                lineHeight: 0.9,
                letterSpacing: "-0.03em",
                color: "var(--text)",
                textTransform: "uppercase",
              }}>
                Spaces
              </span>
            </span>
            <span style={{ display: "block", overflow: "hidden" }}>
              <span className="hero-title-line" style={{
                display: "block",
                fontFamily: "var(--font-display)",
                fontSize: "var(--text-hero)",
                fontWeight: 400,
                lineHeight: 0.9,
                letterSpacing: "-0.03em",
                color: "rgba(243,240,234,0.45)",
                fontStyle: "italic",
                textTransform: "uppercase",
              }}>
                That Endure.
              </span>
            </span>
          </h1>

          {/* Bottom row */}
          <div className="hero-bottom" style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            gap: "24px",
            flexWrap: "wrap",
          }}>
            <p className="hero-sub" style={{
              fontSize: "clamp(13px, 1.1vw, 16px)",
              color: "rgba(243,240,234,0.58)",
              lineHeight: 1.6,
              maxWidth: "360px",
              fontWeight: 300,
            }}>
              Transforming spaces with purpose,<br />craftsmanship and care — Bangalore.
            </p>

            <div style={{ display: "flex", alignItems: "center", gap: "clamp(20px, 3vw, 40px)" }}>
              <Link href="/work" style={{
                fontSize: "11px",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--text)",
                borderBottom: "1px solid rgba(243,240,234,0.25)",
                paddingBottom: "2px",
                transition: "border-color 0.3s ease",
              }}
                onMouseEnter={e => ((e.currentTarget as HTMLElement).style.borderColor = "rgba(243,240,234,0.8)")}
                onMouseLeave={e => ((e.currentTarget as HTMLElement).style.borderColor = "rgba(243,240,234,0.25)")}
              >
                View Work
              </Link>
              <Link href="/contact" style={{
                fontSize: "11px",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--bronze)",
                borderBottom: "1px solid rgba(177,166,150,0.3)",
                paddingBottom: "2px",
                transition: "border-color 0.3s ease",
              }}
                onMouseEnter={e => ((e.currentTarget as HTMLElement).style.borderColor = "var(--bronze)")}
                onMouseLeave={e => ((e.currentTarget as HTMLElement).style.borderColor = "rgba(177,166,150,0.3)")}
              >
                Start a Project
              </Link>
            </div>

            <a href={siteConfig.instagram} target="_blank" rel="noopener noreferrer" style={{
              fontSize: "9px",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "rgba(243,240,234,0.35)",
              writingMode: "vertical-rl",
              transition: "color 0.3s ease",
            }}
              onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = "var(--text)")}
              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = "rgba(243,240,234,0.35)")}
            >
              Instagram
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{
          position: "absolute",
          bottom: "clamp(24px, 4vh, 44px)",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "8px",
        }}>
          <span style={{
            fontSize: "9px",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "rgba(243,240,234,0.3)",
            writingMode: "vertical-rl",
          }}>Scroll</span>
          <div style={{
            width: "1px",
            height: "52px",
            background: "rgba(243,240,234,0.12)",
            position: "relative",
            overflow: "hidden",
          }}>
            <div style={{
              position: "absolute",
              inset: 0,
              background: "var(--bronze)",
              transformOrigin: "top",
              animation: "scrollPulse 2.2s ease-in-out infinite 1.8s",
            }} />
          </div>
        </div>
      </div>
    </section>
  );
}
