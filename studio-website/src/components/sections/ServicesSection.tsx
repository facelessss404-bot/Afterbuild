"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { services } from "@/data/services";

gsap.registerPlugin(ScrollTrigger);

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        section.querySelectorAll(".svc-row"),
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.08,
          ease: "power4.out",
          scrollTrigger: { trigger: section, start: "top 75%" },
        }
      );
    }, sectionRef);
    return () => { try { ctx.revert(); } catch (_) {} };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="section-services"
      style={{
        background: "var(--bg)",
        paddingBlock: "var(--space-lg)",
        paddingInline: "var(--gutter)",
        borderTop: "1px solid var(--border)",
      }}
    >
      <div style={{ maxWidth: "var(--max-w)", marginInline: "auto", width: "100%" }}>

        {/* Section header — 12-col grid */}
        <div className="svc-12-grid" style={{
          marginBottom: "clamp(48px, 7vw, 96px)",
          alignItems: "end",
        }}>
          <div className="svc-header-title">
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              marginBottom: "clamp(12px, 2vw, 20px)",
            }}>
              <span style={{ width: "24px", height: "1px", background: "var(--bronze)", display: "block" }} />
              <span style={{
                fontSize: "10px",
                letterSpacing: "0.28em",
                textTransform: "uppercase",
                color: "var(--bronze)",
              }}>
                02 / Services
              </span>
            </div>
            <h2 style={{
              fontFamily: "var(--font-display)",
              fontSize: "var(--text-3xl)",
              fontWeight: 400,
              lineHeight: 1.02,
              letterSpacing: "-0.01em",
              color: "var(--text)",
            }}>
              What We Design
            </h2>
          </div>

          <div className="svc-header-desc" style={{ alignSelf: "end" }}>
            <p style={{
              fontSize: "var(--text-sm)",
              color: "var(--muted)",
              lineHeight: 1.75,
              fontWeight: 300,
            }}>
              End-to-end architectural and interior spectrum —
              from concept through to turnkey delivery.
            </p>
          </div>
        </div>

        {/* Two-column layout: image left + service list right */}
        <div className="svc-12-grid" style={{ alignItems: "start" }}>

          {/* LEFT: Active service image — cols 1-5 */}
          <div
          className="svc-img-col-home svc-img-wrap"
          >
            <div style={{
              position: "relative",
              aspectRatio: "3/4",
              overflow: "hidden",
              background: "var(--surface)",
            }}>
              {services.map((service, i) => (
                <div
                  key={service.id}
                  style={{
                    position: "absolute",
                    inset: 0,
                    opacity: i === activeIndex ? 1 : 0,
                    transition: "opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1)",
                  }}
                >
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    style={{ objectFit: "cover" }}
                    loading={i === 0 ? "eager" : "lazy"}
                    sizes="(max-width: 900px) 100vw, 40vw"
                  />
                </div>
              ))}

              {/* Image caption */}
              <div style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                padding: "24px",
                background: "linear-gradient(to top, rgba(0,0,0,0.6), transparent)",
              }}>
                {activeIndex !== null && (
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{ fontSize: "10px", letterSpacing: "0.18em", color: "rgba(243,240,234,0.5)" }}>
                      {services[activeIndex]?.number}
                    </span>
                    <span style={{ fontSize: "10px", color: "rgba(243,240,234,0.3)" }}>/</span>
                    <span style={{ fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(243,240,234,0.75)" }}>
                      {services[activeIndex]?.title}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* RIGHT: Expanding service rows — cols 6-12 */}
          <div className="svc-list-col">
            {services.map((service, i) => {
              const isActive = i === activeIndex;
              return (
                <div
                  key={service.id}
                  className="svc-row"
                  onClick={() => setActiveIndex(isActive ? null : i)}
                  style={{
                    borderTop: "1px solid var(--border)",
                    cursor: "pointer",
                    transition: "background 0.3s ease",
                    background: isActive ? "rgba(243,240,234,0.02)" : "transparent",
                  }}
                >
                  {/* Row header */}
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "clamp(20px, 2.5vw, 28px) 0",
                    paddingLeft: "clamp(16px, 2vw, 24px)",
                  }}>
                    <div style={{
                      display: "flex",
                      alignItems: "baseline",
                      gap: "clamp(16px, 2.5vw, 32px)",
                    }}>
                      <span style={{
                        fontSize: "11px",
                        letterSpacing: "0.12em",
                        color: isActive ? "var(--bronze)" : "var(--muted-dark)",
                        transition: "color 0.3s ease",
                        fontFamily: "var(--font-sans)",
                        minWidth: "28px",
                      }}>
                        {service.number}
                      </span>
                      <h3 style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "clamp(1.2rem, 2.2vw, 1.9rem)",
                        fontWeight: 400,
                        color: isActive ? "var(--text)" : "var(--muted)",
                        transition: "color 0.3s ease",
                        letterSpacing: "-0.01em",
                      }}>
                        {service.title}
                      </h3>
                    </div>

                    {/* Expand icon */}
                    <span style={{
                      width: "28px",
                      height: "28px",
                      border: "1px solid var(--border)",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "14px",
                      color: "var(--muted)",
                      transition: "transform 0.35s ease, border-color 0.3s ease, color 0.3s ease",
                      transform: isActive ? "rotate(45deg)" : "none",
                      flexShrink: 0,
                      borderColor: isActive ? "var(--bronze)" : "var(--border)",
                    }}>
                      +
                    </span>
                  </div>

                  {/* Expanding content */}
                  <div style={{
                    overflow: "hidden",
                    maxHeight: isActive ? "600px" : "0",
                    transition: "max-height 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
                  }}>
                    <div className="accordion-body">
                      {/* Description */}
                      <p style={{
                        fontSize: "var(--text-sm)",
                        color: "var(--muted)",
                        lineHeight: 1.8,
                        marginBottom: "24px",
                        maxWidth: "520px",
                      }}>
                        {service.description}
                      </p>

                      {/* Tags */}
                      <div style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "8px",
                        marginBottom: "24px",
                      }}>
                        {service.tags.map((tag) => (
                          <span
                            key={tag}
                            style={{
                              fontSize: "9px",
                              letterSpacing: "0.18em",
                              textTransform: "uppercase",
                              color: "var(--muted-dark)",
                              border: "1px solid var(--border)",
                              padding: "6px 14px",
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Key features */}
                      {service.features && (
                        <div className="deliverables-grid" style={{
                          marginBottom: "28px",
                        }}>
                          {service.features.slice(0, 4).map((feat) => (
                            <div key={feat} style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "8px",
                              fontSize: "11px",
                              color: "var(--muted)",
                            }}>
                              <span style={{
                                width: "4px",
                                height: "4px",
                                borderRadius: "50%",
                                background: "var(--bronze)",
                                flexShrink: 0,
                              }} />
                              {feat}
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Mobile image */}
                      <div style={{
                        position: "relative",
                        aspectRatio: "16/9",
                        overflow: "hidden",
                        marginBottom: "20px",
                        display: "none",
                      }}
                      className="svc-mobile-img"
                      >
                        <Image
                          src={service.image}
                          alt={service.title}
                          fill
                          style={{ objectFit: "cover" }}
                        />
                      </div>

                      {/* CTA */}
                      <Link href="/services" style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "8px",
                        fontSize: "10px",
                        letterSpacing: "0.2em",
                        textTransform: "uppercase",
                        color: "var(--bronze)",
                        borderBottom: "1px solid rgba(177,166,150,0.35)",
                        paddingBottom: "2px",
                        transition: "border-color 0.3s ease",
                      }}>
                        Full Methodology →
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Last border */}
            <div style={{ borderTop: "1px solid var(--border)" }} />

            {/* Bottom link */}
            <div style={{
              paddingTop: "clamp(24px, 3vw, 36px)",
              display: "flex",
              justifyContent: "flex-end",
            }}>
              <Link href="/services" style={{
                fontSize: "11px",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--muted)",
                borderBottom: "1px solid var(--border)",
                paddingBottom: "2px",
                transition: "color 0.3s ease, border-color 0.3s ease",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.color = "var(--text)";
                (e.currentTarget as HTMLElement).style.borderColor = "var(--text)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.color = "var(--muted)";
                (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
              }}
              >
                View Full Services →
              </Link>
            </div>
          </div>
        </div>
      </div>


    </section>
  );
}
