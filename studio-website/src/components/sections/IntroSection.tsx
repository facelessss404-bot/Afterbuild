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
        <div className="intro-12-grid">

          {/* LEFT: Section label + large statement — cols 1-7 */}
          <div className="intro-col-left">
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
                color: "var(--bronze)",
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
              Founded in Bangalore in May 2023 by Mohammed Farmaan Azam K, {siteConfig.name} was born from an engineering-led belief
              that great spaces begin with understanding people. With 160+ completed projects, a skilled workforce of 75+ craftsmen,
              and 3.5+ years of dedicated spatial practice, we deliver end-to-end turnkey architectural solutions and luxury interiors
              tailored to the way you actually live and work.
            </p>

            {/* Founder Note Micro-card */}
            <div style={{
              marginTop: "clamp(24px, 3vw, 36px)",
              padding: "16px 20px",
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: "8px",
              maxWidth: "520px",
              boxShadow: "0 4px 16px rgba(20, 19, 18, 0.03)",
            }}>
              <p style={{
                fontSize: "13px",
                fontStyle: "italic",
                color: "var(--text)",
                lineHeight: 1.6,
                marginBottom: "6px",
                fontFamily: "var(--font-display)",
              }}>
                &ldquo;Designing spaces with purpose. Building experiences with intention.&rdquo;
              </p>
              <span style={{
                fontSize: "10px",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "var(--bronze)",
                fontWeight: 600,
              }}>
                Mohammed Farmaan Azam K &bull; Founder &amp; Director
              </span>
            </div>

            {/* Founded + CTA */}
            <div style={{
              marginTop: "clamp(28px, 3vw, 40px)",
              display: "flex",
              alignItems: "center",
              gap: "28px",
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
                  borderBottom: "1px solid var(--bronze)",
                  paddingBottom: "2px",
                  transition: "opacity 0.3s ease",
                  fontWeight: 600,
                }}
                onMouseEnter={e => ((e.currentTarget as HTMLElement).style.opacity = "0.7")}
                onMouseLeave={e => ((e.currentTarget as HTMLElement).style.opacity = "1")}
              >
                About Founder &amp; Studio →
              </a>
            </div>
          </div>

          {/* RIGHT: Image + counters — cols 9-12 */}
          <div className="intro-col-right" style={{
            display: "flex",
            flexDirection: "column",
            gap: "var(--space-xs)",
            overflow: "hidden",
          }}>
            {/* Tall portrait image */}
            <div
              className="intro-image-wrap"
              style={{
                position: "relative",
                aspectRatio: "3/4",
                overflow: "hidden",
                background: "var(--surface)",
                width: "100%",
                borderRadius: "6px",
              }}
            >
              <div
                className="intro-image"
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                }}
              >
                <img
                  src="/images/projects/sbr-horizon/hero.jpg"
                  alt="AfterBuild Studio luxury residential interior curation — SBR Horizon"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                  }}
                  loading="lazy"
                />
              </div>
            </div>

            {/* Counters grid with 3.5+ years experience placed directly below craftsmen */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "1px",
              background: "var(--border)",
              border: "1px solid var(--border)",
              borderRadius: "6px",
              overflow: "hidden",
            }}>
              {[
                { value: "160+", label: "Projects" },
                { value: "75+", label: "Craftsmen" },
                { value: "100%", label: "Turnkey Accountability" },
                { value: "3.5+", label: "Years Experience" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="intro-counter"
                  style={{
                    background: "var(--surface)",
                    padding: "clamp(16px, 2.5vw, 24px)",
                  }}
                >
                  <span style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(1.6rem, 2.6vw, 2.5rem)",
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
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    color: "var(--bronze)",
                    fontWeight: 600,
                  }}>
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>


    </section>
  );
}
