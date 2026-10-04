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
        {/* Cinematic gradient overlay */}
        <div style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to bottom, rgba(10,10,9,0.55) 0%, rgba(10,10,9,0.12) 35%, rgba(10,10,9,0.3) 65%, rgba(10,10,9,0.92) 100%)",
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
              fontSize: "10px",
              fontWeight: 500,
              letterSpacing: "0.26em",
              textTransform: "uppercase",
              color: "var(--bronze)",
            }}>
              AfterBuild Studio &bull; Indiranagar, Bangalore &bull; Est. 2023
            </span>
          </div>

          {/* Large editorial heading */}
          <h1 style={{ overflow: "hidden", marginBottom: "clamp(20px, 2.5vw, 36px)" }}>
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
                color: "rgba(228, 213, 190, 0.7)",
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
            <div style={{ maxWidth: "460px" }}>
              <p className="hero-sub" style={{
                fontSize: "clamp(13px, 1.1vw, 15px)",
                color: "rgba(243,240,234,0.72)",
                lineHeight: 1.65,
                fontWeight: 300,
                marginBottom: "16px",
              }}>
                Designing spaces with purpose. Building experiences with intention. Over 160+ residential and commercial projects delivered across Bangalore with engineering-led craft.
              </p>

              {/* Stats badges */}
              <div style={{
                display: "flex",
                gap: "18px",
                flexWrap: "wrap",
                fontSize: "10px",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "var(--bronze)",
              }}>
                <span>160+ Projects</span>
                <span>&bull;</span>
                <span>75+ Craftsmen</span>
                <span>&bull;</span>
                <span>Turnkey Execution</span>
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
                  background: "var(--text)",
                  color: "#0a0a09",
                  fontSize: "11px",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  fontWeight: 600,
                  transition: "all 0.3s ease",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.background = "var(--bronze)";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.background = "var(--text)";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                }}
              >
                <span style={{
                  display: "inline-flex",
                  width: "18px",
                  height: "18px",
                  borderRadius: "50%",
                  background: "#0a0a09",
                  color: "var(--text)",
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
                color: "var(--text)",
                borderBottom: "1px solid rgba(243,240,234,0.3)",
                paddingBottom: "3px",
                transition: "border-color 0.3s ease",
              }}
                onMouseEnter={e => ((e.currentTarget as HTMLElement).style.borderColor = "var(--text)")}
                onMouseLeave={e => ((e.currentTarget as HTMLElement).style.borderColor = "rgba(243,240,234,0.3)")}
              >
                View Portfolio
              </Link>

              <Link href="/contact" style={{
                fontSize: "11px",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--bronze)",
                borderBottom: "1px solid rgba(197,168,128,0.4)",
                paddingBottom: "3px",
                transition: "border-color 0.3s ease",
              }}
                onMouseEnter={e => ((e.currentTarget as HTMLElement).style.borderColor = "var(--bronze)")}
                onMouseLeave={e => ((e.currentTarget as HTMLElement).style.borderColor = "rgba(197,168,128,0.4)")}
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
              color: "rgba(243,240,234,0.4)",
              writingMode: "vertical-rl",
              transition: "color 0.3s ease",
            }}
              onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = "var(--text)")}
              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = "rgba(243,240,234,0.4)")}
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
