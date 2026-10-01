"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { philosophyPillars } from "@/data/content";

gsap.registerPlugin(ScrollTrigger);

export default function PhilosophySection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      section.querySelectorAll(".philo-img").forEach((el) => {
        gsap.fromTo(el,
          { clipPath: "inset(10% 10% 10% 10%)", scale: 1.06 },
          {
            clipPath: "inset(0% 0% 0% 0%)", scale: 1, duration: 1.4, ease: "power4.out",
            scrollTrigger: { trigger: el, start: "top 83%" },
          }
        );
      });
      section.querySelectorAll(".philo-text").forEach((el) => {
        gsap.fromTo(el,
          { opacity: 0, y: 20 },
          {
            opacity: 1, y: 0, duration: 0.8, ease: "power4.out",
            scrollTrigger: { trigger: el, start: "top 85%" },
          }
        );
      });
    }, sectionRef);

    return () => { try { ctx.revert(); } catch (_) {} };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="section-philosophy"
      style={{
        background: "var(--bg)",
        paddingBlock: "var(--space-lg)",
        paddingInline: "var(--gutter)",
        borderTop: "1px solid var(--border)",
      }}
    >
      <div style={{ maxWidth: "var(--max-w)", marginInline: "auto", width: "100%" }}>

        {/* Header */}
        <div className="philo-text" style={{
          display: "grid",
          gridTemplateColumns: "repeat(12, minmax(0, 1fr))",
          gap: "var(--grid-gap)",
          marginBottom: "clamp(40px, 7vw, 96px)",
          alignItems: "end",
        }}>
          <div style={{ gridColumn: "1 / 7" }}>
            <div style={{
              display: "flex", alignItems: "center", gap: "12px",
              marginBottom: "clamp(12px, 2vw, 20px)",
            }}>
              <span style={{ width: "24px", height: "1px", background: "var(--bronze)" }} />
              <span style={{ fontSize: "10px", letterSpacing: "0.28em", textTransform: "uppercase", color: "var(--bronze)" }}>
                Design Approach
              </span>
            </div>
            <h2 style={{
              fontFamily: "var(--font-display)",
              fontSize: "var(--text-3xl)",
              fontWeight: 400,
              lineHeight: 1.05,
              letterSpacing: "-0.01em",
              color: "var(--text)",
            }}>
              Our Philosophy
            </h2>
          </div>
          <blockquote className="philo-text" style={{
            gridColumn: "8 / 13",
            alignSelf: "end",
            fontFamily: "var(--font-display)",
            fontSize: "clamp(1rem, 1.5vw, 1.3rem)",
            fontStyle: "italic",
            color: "rgba(243,240,234,0.4)",
            lineHeight: 1.5,
            margin: 0,
            padding: 0,
          }}>
            "Design is not just what it looks like — design is how it works,
            how it feels, how it endures."
          </blockquote>
        </div>

        {/* 3 pillars — staggered image heights, no cards */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(12, minmax(0, 1fr))",
          gap: "var(--grid-gap)",
          alignItems: "end",
        }}>
          {philosophyPillars.map((pillar, i) => {
            const colMap = ["1 / 5", "5 / 9", "9 / 13"];
            const offsetMap = ["0px", "clamp(40px, 6vw, 96px)", "clamp(20px, 3vw, 48px)"];

            return (
              <div key={pillar.id} style={{
                gridColumn: colMap[i],
                paddingTop: offsetMap[i],
              }}>
                {/* Image — different heights for editorial rhythm */}
                <div className="philo-img img-hover" style={{
                  position: "relative",
                  aspectRatio: i === 1 ? "3/5" : "3/4",
                  overflow: "hidden",
                  marginBottom: "clamp(16px, 2.5vw, 24px)",
                  background: "var(--surface)",
                }}>
                  <Image
                    src={pillar.image}
                    alt={pillar.title}
                    fill
                    style={{ objectFit: "cover" }}
                    loading="lazy"
                    sizes="(max-width: 900px) 100vw, 33vw"
                  />
                  <div style={{
                    position: "absolute",
                    top: "16px",
                    left: "16px",
                    fontSize: "10px",
                    letterSpacing: "0.18em",
                    color: "rgba(243,240,234,0.45)",
                  }}>
                    {pillar.number}
                  </div>
                </div>

                <h3 className="philo-text" style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(1.1rem, 1.6vw, 1.4rem)",
                  fontWeight: 400,
                  color: "var(--text)",
                  marginBottom: "10px",
                  letterSpacing: "-0.005em",
                }}>
                  {pillar.title.replace("\n", " ")}
                </h3>

                <p className="philo-text" style={{
                  fontSize: "var(--text-sm)",
                  color: "var(--muted)",
                  lineHeight: 1.75,
                }}>
                  {pillar.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          #section-philosophy [style*="1 / 5"],
          #section-philosophy [style*="5 / 9"],
          #section-philosophy [style*="9 / 13"],
          #section-philosophy [style*="1 / 7"],
          #section-philosophy [style*="8 / 13"] {
            grid-column: 1 / -1 !important;
            padding-top: 0 !important;
          }
          #section-philosophy [style*="repeat(12"] {
            grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
          }
        }
        @media (max-width: 600px) {
          #section-philosophy [style*="repeat(2"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
