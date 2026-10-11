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
        height: "100svh",
        minHeight: "560px",
        overflow: "hidden",
        contain: "paint",
        background: "#0a0a09",
      }}
      aria-label="Hero"
    >
      {/* Full-bleed hero image */}
      <div style={{ position: "absolute", inset: 0, overflow: "hidden", zIndex: 2 }}>
        <div
          className="hero-img"
          style={{ position: "absolute", inset: 0 }}
        >
        <Image
          src="/images/hero-luxury.jpg"
          alt="AfterBuild Studio — Ultra-Luxury Architectural Interior Design, Bangalore"
          fill
          priority
          style={{ objectFit: "cover", objectPosition: "center" }}
          quality={95}
          sizes="100vw"
        />
        {/* Cinematic gradient overlay & localized contrast scrim */}
        <div style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to bottom, rgba(8,8,7,0.72) 0%, rgba(8,8,7,0.50) 30%, rgba(8,8,7,0.76) 68%, rgba(8,8,7,0.96) 100%)",
        }} />
        <div style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse at 25% 65%, rgba(0,0,0,0.7) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />
        </div>
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
        paddingBottom: "clamp(36px, 6vh, 64px)",
      }}>
        <div style={{ maxWidth: "var(--max-w)", width: "100%", marginInline: "auto" }}>

          {/* Eyebrow with Brand Mark */}
          <div className="hero-eyebrow" style={{
            display: "flex", alignItems: "center", gap: "14px",
            marginBottom: "clamp(16px, 2vw, 24px)",
          }}>
            <span style={{ width: "32px", height: "1px", background: "var(--bronze)", display: "block" }} />
            <span style={{
              fontSize: "10.5px",
              fontWeight: 600,
              letterSpacing: "0.26em",
              textTransform: "uppercase",
              color: "#E5C89C",
              textShadow: "0 2px 10px rgba(0,0,0,0.8)",
            }}>
              AfterBuild Studio &bull; Architecture &bull; Spatial Solutions &bull; Indiranagar, Bangalore
            </span>
          </div>

          {/* Large editorial heading with high-contrast text shadows */}
          <h1 style={{ overflow: "hidden", marginBottom: "clamp(20px, 2.5vw, 36px)" }}>
            <span style={{ display: "block", overflow: "hidden" }}>
              <span className="hero-title-line" style={{
                display: "block",
                fontFamily: "var(--font-display)",
                fontSize: "var(--text-hero)",
                fontWeight: 400,
                lineHeight: 0.9,
                letterSpacing: "-0.03em",
                color: "#FFFFFF",
                textShadow: "0 4px 28px rgba(0,0,0,0.85), 0 1px 4px rgba(0,0,0,0.9)",
                textTransform: "uppercase",
              }}>
                Spaces With Purpose.
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
                color: "#E8D5BC",
                textShadow: "0 4px 28px rgba(0,0,0,0.85)",
                fontStyle: "italic",
                textTransform: "uppercase",
              }}>
                Experiences In Motion.
              </span>
            </span>
          </h1>

          {/* Bottom row */}
          <div className="hero-bottom hero-bottom-row" style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            gap: "clamp(24px, 4vw, 48px)",
            flexWrap: "wrap",
          }}>
            <div style={{ maxWidth: "520px" }}>
              <p className="hero-sub" style={{
                fontSize: "clamp(13px, 1.15vw, 15.5px)",
                color: "rgba(255, 255, 255, 0.92)",
                lineHeight: 1.65,
                fontWeight: 300,
                marginBottom: "16px",
                textShadow: "0 2px 14px rgba(0,0,0,0.85)",
              }}>
                Designing spaces with purpose. Building experiences with intention. Turnkey architectural solutions, spatial engineering, and luxury interior design delivered across Bangalore.
              </p>

              {/* Stats badges with 3.5+ Years Experience */}
              <div style={{
                display: "flex",
                gap: "14px",
                flexWrap: "wrap",
                fontSize: "10.5px",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "#E5C89C",
                fontWeight: 600,
                textShadow: "0 2px 10px rgba(0,0,0,0.8)",
              }}>
                <span>160+ Projects</span>
                <span>&bull;</span>
                <span>75+ Craftsmen</span>
                <span>&bull;</span>
                <span>3.5+ Years Experience</span>
                <span>&bull;</span>
                <span>Turnkey Architecture</span>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "clamp(16px, 2.5vw, 32px)", flexWrap: "wrap" }}>
              {/* Highlighted Walkthrough CTA */}
              <a
                href="#walkthroughs"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "12px 24px",
                  borderRadius: "999px",
                  background: "#FFFFFF",
                  color: "#141312",
                  fontSize: "11px",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  fontWeight: 600,
                  transition: "all 0.3s ease",
                  boxShadow: "0 6px 24px rgba(0,0,0,0.5)",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.background = "#E5C89C";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.background = "#FFFFFF";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                }}
              >
                <span style={{
                  display: "inline-flex",
                  width: "18px",
                  height: "18px",
                  borderRadius: "50%",
                  background: "#141312",
                  color: "#FFFFFF",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "9px",
                }}>
                  &#9658;
                </span>
                <span>Watch 4K Walkthroughs</span>
              </a>

              <Link href="/work" style={{
                fontSize: "11px",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "#FFFFFF",
                textShadow: "0 2px 10px rgba(0,0,0,0.8)",
                borderBottom: "1px solid rgba(255,255,255,0.4)",
                paddingBottom: "3px",
                transition: "border-color 0.3s ease, color 0.3s ease",
              }}
                onMouseEnter={e => ((e.currentTarget as HTMLElement).style.borderColor = "#FFFFFF")}
                onMouseLeave={e => ((e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.4)")}
              >
                View Portfolio
              </Link>

              <Link href="/contact" style={{
                fontSize: "11px",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "#E5C89C",
                textShadow: "0 2px 10px rgba(0,0,0,0.8)",
                borderBottom: "1px solid rgba(229,200,156,0.5)",
                paddingBottom: "3px",
                transition: "border-color 0.3s ease",
              }}
                onMouseEnter={e => ((e.currentTarget as HTMLElement).style.borderColor = "#E5C89C")}
                onMouseLeave={e => ((e.currentTarget as HTMLElement).style.borderColor = "rgba(229,200,156,0.5)")}
              >
                Start a Project
              </Link>
            </div>

            <a href={siteConfig.instagram} target="_blank" rel="noopener noreferrer"
              className="hero-instagram-link hidden lg:block"
              style={{
              fontSize: "9px",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.65)",
              writingMode: "vertical-rl",
              transition: "color 0.3s ease",
            }}
              onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = "#FFFFFF")}
              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.65)")}
            >
              Instagram
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          className="hero-scroll-indicator"
          style={{
            position: "absolute",
            bottom: "clamp(24px, 4vh, 44px)",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "8px",
          }}
        >
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
