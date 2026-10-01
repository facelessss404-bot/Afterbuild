"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { siteConfig } from "@/data/site";

gsap.registerPlugin(ScrollTrigger);

export default function IntroSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const triggers: ReturnType<typeof ScrollTrigger.create>[] = [];

    const ctx = gsap.context(() => {
      // Large statement lines — blur-to-sharp scrub
      const lines = section.querySelectorAll(".intro-line");
      lines.forEach((line) => {
        const t = ScrollTrigger.create({
          trigger: line,
          start: "top 88%",
          end: "top 55%",
          scrub: 0.8,
          onUpdate: (self) => {
            gsap.set(line, {
              opacity: 0.1 + self.progress * 0.9,
              y: 20 - self.progress * 20,
              filter: `blur(${6 - self.progress * 6}px)`,
            });
          },
        });
        triggers.push(t);
        gsap.set(line, { opacity: 0.1, y: 20, filter: "blur(6px)" });
      });

      // Sub paragraph fade in
      gsap.fromTo(
        ".intro-paragraph",
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power4.out",
          scrollTrigger: { trigger: ".intro-paragraph", start: "top 85%" },
        }
      );

      // Right image reveal
      gsap.fromTo(
        ".intro-image",
        { clipPath: "inset(10% 10% 10% 10%)", scale: 1.08 },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          scale: 1,
          duration: 1.6,
          ease: "power4.out",
          scrollTrigger: { trigger: ".intro-image", start: "top 80%" },
        }
      );

      // Counter numbers
      const counters = section.querySelectorAll(".intro-counter");
      counters.forEach((counter) => {
        gsap.fromTo(
          counter,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power4.out",
            scrollTrigger: { trigger: counter, start: "top 85%" },
          }
        );
      });
    }, sectionRef);

    return () => {
      triggers.forEach(t => { try { t.kill(); } catch (_) {} });
      try { ctx.revert(); } catch (_) {}
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="section-studio-intro"
      style={{
        background: "var(--bg)",
        paddingBlock: "var(--space-lg)",
        paddingInline: "var(--gutter)",
        position: "relative",
      }}
    >
      <div style={{ maxWidth: "var(--max-w)", marginInline: "auto", width: "100%" }}>

        {/* 12-column editorial grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(12, minmax(0, 1fr))",
          gap: "var(--grid-gap)",
          alignItems: "start",
        }}>

          {/* LEFT: Section label + large statement — cols 1-7 */}
          <div style={{
            gridColumn: "1 / 8",
          }}>
            {/* Section label */}
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              marginBottom: "clamp(32px, 4vw, 56px)",
            }}>
              <span style={{ width: "24px", height: "1px", background: "var(--bronze)", display: "block" }} />
              <span style={{
                fontSize: "10px",
                letterSpacing: "0.28em",
                textTransform: "uppercase",
                color: "var(--bronze)",
              }}>
                01 / Studio
              </span>
            </div>

            {/* Large editorial statement */}
            <div style={{ marginBottom: "clamp(32px, 5vw, 64px)" }}>
              <p className="intro-line" style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2rem, 4.5vw, 5rem)",
                fontWeight: 400,
                lineHeight: 1.0,
                letterSpacing: "-0.02em",
                color: "var(--text)",
                marginBottom: "0.05em",
              }}>
                We Create Spaces
              </p>
              <p className="intro-line" style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2rem, 4.5vw, 5rem)",
                fontWeight: 400,
                lineHeight: 1.0,
                letterSpacing: "-0.02em",
                color: "var(--text)",
                marginBottom: "0.05em",
              }}>
                That Become
              </p>
              <p className="intro-line" style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2rem, 4.5vw, 5rem)",
                fontWeight: 400,
                lineHeight: 1.0,
                letterSpacing: "-0.02em",
                color: "rgba(243,240,234,0.4)",
                fontStyle: "italic",
              }}>
                Experiences.
              </p>
            </div>

            {/* Description paragraph — controlled width */}
            <p
              className="intro-paragraph"
              style={{
                fontSize: "var(--text-base)",
                color: "var(--muted)",
                lineHeight: 1.8,
                maxWidth: "520px",
                fontWeight: 300,
              }}
            >
              Founded in Bangalore in May 2023, {siteConfig.name} was born from a belief
              that great design should be purposeful, accessible and deeply personal.
              With 160+ completed projects and a skilled workforce of 75+ craftsmen,
              we deliver end-to-end interior and architectural solutions built around
              the way you actually live and work.
            </p>

            {/* Founded + CTA */}
            <div style={{
              marginTop: "clamp(32px, 4vw, 52px)",
              display: "flex",
              alignItems: "center",
              gap: "32px",
              flexWrap: "wrap",
            }}>
              <span style={{
                fontSize: "10px",
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                color: "var(--muted-dark)",
              }}>
                Designing since {siteConfig.founded}
              </span>
              <span style={{
                width: "1px",
                height: "16px",
                background: "var(--border)",
                display: "block",
              }} />
              <a
                href="/studio"
                style={{
                  fontSize: "11px",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "var(--bronze)",
                  borderBottom: "1px solid rgba(177,166,150,0.35)",
                  paddingBottom: "2px",
                  transition: "border-color 0.3s ease",
                }}
                onMouseEnter={e => ((e.currentTarget as HTMLElement).style.borderColor = "var(--bronze)")}
                onMouseLeave={e => ((e.currentTarget as HTMLElement).style.borderColor = "rgba(177,166,150,0.35)")}
              >
                About the Studio →
              </a>
            </div>
          </div>

          {/* RIGHT: Image + counters — cols 9-12 */}
          <div style={{
            gridColumn: "9 / 13",
            display: "flex",
            flexDirection: "column",
            gap: "var(--space-xs)",
            paddingTop: "clamp(48px, 8vw, 120px)",
          }}>
            {/* Tall portrait image */}
            <div
              className="intro-image"
              style={{
                position: "relative",
                aspectRatio: "3/4",
                overflow: "hidden",
                background: "var(--surface)",
              }}
            >
              <img
                src="/images/projects/gk-gateway/05.jpg"
                alt="Studio work"
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
                loading="lazy"
              />
            </div>

            {/* Two counters below image */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "1px",
              background: "var(--border)",
              border: "1px solid var(--border)",
            }}>
              {[
                { value: "160+", label: "Projects" },
                { value: "75+", label: "Craftsmen" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="intro-counter"
                  style={{
                    background: "var(--bg)",
                    padding: "clamp(16px, 2.5vw, 28px)",
                  }}
                >
                  <span style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(1.8rem, 3vw, 2.8rem)",
                    fontWeight: 400,
                    color: "var(--text)",
                    display: "block",
                    lineHeight: 1,
                    marginBottom: "6px",
                  }}>
                    {item.value}
                  </span>
                  <span style={{
                    fontSize: "9px",
                    letterSpacing: "0.25em",
                    textTransform: "uppercase",
                    color: "var(--bronze)",
                  }}>
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile layout override */}
      <style>{`
        @media (max-width: 900px) {
          #section-studio-intro [style*="grid-column: 1 / 8"] {
            grid-column: 1 / -1 !important;
          }
          #section-studio-intro [style*="grid-column: 9 / 13"] {
            grid-column: 1 / -1 !important;
            padding-top: 0 !important;
          }
          #section-studio-intro [style*="grid-template-columns: repeat(12"] {
            grid-template-columns: repeat(4, minmax(0, 1fr)) !important;
          }
        }
      `}</style>
    </section>
  );
}
