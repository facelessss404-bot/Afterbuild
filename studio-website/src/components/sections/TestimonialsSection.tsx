"use client";

import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { testimonials } from "@/data/testimonials";

gsap.registerPlugin(ScrollTrigger);

export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const total = testimonials.length;

  const next = () => setActive((p) => (p + 1) % total);
  const prev = () => setActive((p) => (p - 1 + total) % total);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        section.querySelectorAll(".test-reveal"),
        { opacity: 0, y: 28 },
        {
          opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power4.out",
          scrollTrigger: { trigger: section, start: "top 75%" },
        }
      );
    }, sectionRef);
    return () => { try { ctx.revert(); } catch (_) {} };
  }, []);

  const current = testimonials[active];

  return (
    <section
      ref={sectionRef}
      id="section-testimonials"
      style={{
        background: "var(--cream, #e8e3da)",
        paddingBlock: "var(--space-md)",
        paddingInline: "var(--gutter)",
        borderTop: "1px solid rgba(10,10,9,0.08)",
      }}
    >
      <div style={{ maxWidth: "var(--max-w)", marginInline: "auto", width: "100%" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(12, minmax(0, 1fr))",
          gap: "var(--grid-gap)",
          alignItems: "start",
        }}>

          {/* Label — col 1-2 */}
          <div className="test-reveal" style={{ gridColumn: "1 / 3" }}>
            <div style={{
              display: "flex", alignItems: "center", gap: "12px",
              marginBottom: "12px",
            }}>
              <span style={{ width: "24px", height: "1px", background: "#6b6762" }} />
              <span style={{
                fontSize: "10px", letterSpacing: "0.28em",
                textTransform: "uppercase", color: "#6b6762",
              }}>
                Clients
              </span>
            </div>
            <span style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.4rem, 2.5vw, 2.2rem)",
              fontWeight: 400,
              color: "#0a0a09",
              display: "block",
              lineHeight: 1.1,
              position: "sticky",
              top: "100px",
            }}>
              What<br />They<br />Say
            </span>
          </div>

          {/* Quote area — cols 3-12 */}
          <div style={{ gridColumn: "3 / 13" }}>

            {/* Decorative open quote */}
            <div className="test-reveal" style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(4rem, 10vw, 9rem)",
              lineHeight: 0.7,
              color: "rgba(10,10,9,0.08)",
              marginBottom: "clamp(8px, 1.5vw, 16px)",
            }}>
              "
            </div>

            {/* Quote text — animates on change */}
            <div style={{ minHeight: "clamp(160px, 18vw, 240px)", marginBottom: "clamp(28px, 4vw, 48px)" }}>
              <blockquote
                key={active}
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(1.2rem, 3vw, 2.2rem)",
                  fontWeight: 400,
                  lineHeight: 1.3,
                  color: "#0a0a09",
                  fontStyle: "italic",
                  margin: 0,
                  padding: 0,
                  animation: "fadeUp 0.5s ease forwards",
                }}
              >
                {current.quote}
              </blockquote>
            </div>

            {/* Author */}
            <div className="test-reveal" style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              paddingTop: "clamp(16px, 2.5vw, 28px)",
              borderTop: "1px solid rgba(10,10,9,0.12)",
              flexWrap: "wrap",
              gap: "24px",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                <div style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  background: "rgba(10,10,9,0.08)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "16px",
                  color: "rgba(10,10,9,0.3)",
                }}>
                  ◆
                </div>
                <div>
                  <p style={{
                    fontSize: "11px",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: "#0a0a09",
                    fontWeight: 500,
                    marginBottom: "2px",
                  }}>
                    {current.author}
                  </p>
                  {current.source && (
                    <p style={{
                      fontSize: "10px",
                      letterSpacing: "0.12em",
                      color: "rgba(10,10,9,0.45)",
                      textTransform: "uppercase",
                    }}>
                      {current.source}
                    </p>
                  )}
                </div>
              </div>

              {/* Navigation */}
              <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                {/* Counter */}
                <span style={{
                  fontSize: "10px",
                  letterSpacing: "0.15em",
                  color: "rgba(10,10,9,0.4)",
                }}>
                  {String(active + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
                </span>

                {/* Progress */}
                <div style={{
                  width: "80px",
                  height: "1px",
                  background: "rgba(10,10,9,0.12)",
                  position: "relative",
                }}>
                  <div style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    height: "100%",
                    width: `${((active + 1) / total) * 100}%`,
                    background: "#6b6762",
                    transition: "width 0.5s ease",
                  }} />
                </div>

                {/* Arrows */}
                <div style={{ display: "flex", gap: "8px" }}>
                  <button
                    onClick={prev}
                    aria-label="Previous testimonial"
                    style={{
                      width: "36px",
                      height: "36px",
                      border: "1px solid rgba(10,10,9,0.15)",
                      background: "transparent",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      fontSize: "16px",
                      color: "#0a0a09",
                      transition: "background 0.3s ease, border-color 0.3s ease",
                    }}
                    onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = "rgba(10,10,9,0.06)")}
                    onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = "transparent")}
                  >
                    ←
                  </button>
                  <button
                    onClick={next}
                    aria-label="Next testimonial"
                    style={{
                      width: "36px",
                      height: "36px",
                      border: "1px solid rgba(10,10,9,0.15)",
                      background: "transparent",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      fontSize: "16px",
                      color: "#0a0a09",
                      transition: "background 0.3s ease",
                    }}
                    onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = "rgba(10,10,9,0.06)")}
                    onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = "transparent")}
                  >
                    →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #section-testimonials [style*="1 / 3"],
          #section-testimonials [style*="3 / 13"] {
            grid-column: 1 / -1 !important;
          }
          #section-testimonials [style*="repeat(12"] {
            grid-template-columns: repeat(4, minmax(0, 1fr)) !important;
          }
        }
      `}</style>
    </section>
  );
}
