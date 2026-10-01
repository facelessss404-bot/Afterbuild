"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { awards, pressItems } from "@/data/content";
import { siteConfig } from "@/data/site";

gsap.registerPlugin(ScrollTrigger);

// ─── marquee items ───────────────────────────────────────────
const marqueeItems = [
  "ARCHITECTURAL DIGEST",
  "FORBES INDIA",
  "ELLE DECOR",
  "GOOD HOMES",
  "TRENDS MAGAZINE",
  "DESIGN+ARCHITECTURE",
];

export default function RecognitionPage() {
  const pageRef = useRef<HTMLDivElement>(null);
  const [activeAward, setActiveAward] = useState<string | null>(null);

  useEffect(() => {
    const page = pageRef.current;
    if (!page) return;

    const ctx = gsap.context(() => {
      page.querySelectorAll(".reveal-fade").forEach((el) => {
        gsap.fromTo(el,
          { opacity: 0, y: 28 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power4.out",
            scrollTrigger: { trigger: el, start: "top 87%" } }
        );
      });
      page.querySelectorAll(".reveal-img").forEach((el) => {
        gsap.fromTo(el,
          { clipPath: "inset(8% 8% 8% 8%)", scale: 1.05 },
          { clipPath: "inset(0% 0% 0% 0%)", scale: 1, duration: 1.3, ease: "power4.out",
            scrollTrigger: { trigger: el, start: "top 85%" } }
        );
      });
    }, pageRef);

    return () => { try { ctx.revert(); } catch (_) {} };
  }, []);

  const S = {
    // Shared layout tokens
    page: {
      background: "var(--bg)",
      color: "var(--text)",
      minHeight: "100vh",
    } as React.CSSProperties,
    shell: {
      maxWidth: "var(--max-w)",
      marginInline: "auto",
      width: "100%",
      paddingInline: "var(--gutter)",
    } as React.CSSProperties,
    section: {
      paddingBlock: "var(--space-md)",
      paddingInline: "var(--gutter)",
      borderBottom: "1px solid var(--border)",
    } as React.CSSProperties,
    label: {
      display: "flex",
      alignItems: "center",
      gap: "12px",
      marginBottom: "clamp(24px, 3.5vw, 48px)",
    } as React.CSSProperties,
    labelLine: { width: "24px", height: "1px", background: "var(--bronze)", flexShrink: 0 } as React.CSSProperties,
    labelText: { fontSize: "10px", letterSpacing: "0.28em", textTransform: "uppercase" as const, color: "var(--bronze)" },
    grid12: {
      display: "grid",
      gridTemplateColumns: "repeat(12, minmax(0,1fr))",
      gap: "var(--grid-gap)",
    } as React.CSSProperties,
  };

  return (
    <div ref={pageRef} style={S.page}>

      {/* ── 01. HERO ──────────────────────────────────────── */}
      <section style={{
        paddingTop: "clamp(100px, 14vh, 160px)",
        paddingBottom: "clamp(56px, 8vw, 112px)",
        paddingInline: "var(--gutter)",
        borderBottom: "1px solid var(--border)",
      }}>
        <div style={S.shell}>
          {/* Label */}
          <div className="reveal-fade" style={S.label}>
            <span style={S.labelLine} />
            <span style={S.labelText}>Accolades & Recognition</span>
          </div>

          {/* Headline grid: big left / descriptor right */}
          <div style={{ ...S.grid12, alignItems: "flex-end" }}>
            <div style={{ gridColumn: "1 / 8" }}>
              <h1 className="reveal-fade" style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(3.5rem, 8vw, 7rem)",
                fontWeight: 400,
                lineHeight: 0.92,
                letterSpacing: "-0.02em",
                color: "var(--text)",
                textTransform: "uppercase",
              }}>
                Recognition<br />
                <em style={{ color: "rgba(243,240,234,0.35)", fontStyle: "italic" }}>& Honors</em>
              </h1>
            </div>

            <div className="reveal-fade" style={{
              gridColumn: "9 / 13",
              paddingBottom: "8px",
            }}>
              <p style={{
                fontSize: "var(--text-sm)",
                color: "var(--muted)",
                lineHeight: 1.75,
              }}>
                Honoring our pursuit of spatial mastery, material authenticity,
                and fluid architectural compositions. Recognized across national
                design forums and architectural press.
              </p>

              <div style={{
                marginTop: "28px",
                display: "flex",
                gap: "24px",
                alignItems: "center",
              }}>
                <div style={{ textAlign: "center" }}>
                  <span style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(1.8rem, 2.5vw, 2.4rem)",
                    fontWeight: 400,
                    color: "var(--text)",
                    display: "block",
                    lineHeight: 1,
                  }}>{awards.length}+</span>
                  <span style={{ fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--bronze)" }}>
                    Awards
                  </span>
                </div>
                <span style={{ width: "1px", height: "32px", background: "var(--border)" }} />
                <div style={{ textAlign: "center" }}>
                  <span style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(1.8rem, 2.5vw, 2.4rem)",
                    fontWeight: 400,
                    color: "var(--text)",
                    display: "block",
                    lineHeight: 1,
                  }}>{pressItems.length}</span>
                  <span style={{ fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--bronze)" }}>
                    Features
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <style>{`
          @media (max-width: 900px) {
            #recog-hero-grid > div:first-child { grid-column: 1 / -1 !important; }
            #recog-hero-grid > div:last-child { grid-column: 1 / -1 !important; padding-top: 24px; }
          }
        `}</style>
      </section>

      {/* ── 02. AWARDS — Editorial row list ──────────────── */}
      <section style={{
        paddingBlock: "var(--space-md)",
        paddingInline: "var(--gutter)",
        borderBottom: "1px solid var(--border)",
      }}>
        <div style={{ maxWidth: "var(--max-w)", marginInline: "auto", width: "100%" }}>

          {/* Section header */}
          <div className="reveal-fade" style={{
            ...S.grid12,
            alignItems: "end",
            marginBottom: "clamp(40px, 6vw, 80px)",
          }}>
            <div style={{ gridColumn: "1 / 7" }}>
              <div style={S.label}>
                <span style={S.labelLine} />
                <span style={S.labelText}>Selected Awards</span>
              </div>
              <h2 style={{
                fontFamily: "var(--font-display)",
                fontSize: "var(--text-3xl)",
                fontWeight: 400,
                letterSpacing: "-0.01em",
                lineHeight: 1.05,
                color: "var(--text)",
              }}>Industry Recognition</h2>
            </div>
            <p style={{
              gridColumn: "8 / 13",
              fontSize: "var(--text-sm)",
              color: "var(--muted)",
              lineHeight: 1.7,
              paddingBottom: "4px",
            }}>
              Each accolade reflects our commitment to precision, innovation and the pursuit of spatial excellence.
            </p>
          </div>

          {/* Award rows — editorial list, not cards */}
          <div style={{ borderTop: "1px solid var(--border)" }}>
            {awards.map((award, i) => (
              <div
                key={award.id}
                className="reveal-fade"
                onMouseEnter={() => setActiveAward(award.id)}
                onMouseLeave={() => setActiveAward(null)}
                style={{
                  display: "grid",
                  gridTemplateColumns: "80px 1fr auto",
                  gap: "clamp(16px, 3vw, 40px)",
                  alignItems: "start",
                  padding: "clamp(28px, 4vw, 48px) 0",
                  borderBottom: "1px solid var(--border)",
                  transition: "background 0.3s ease",
                  background: activeAward === award.id ? "rgba(243,240,234,0.025)" : "transparent",
                  cursor: "default",
                }}
              >
                {/* Year */}
                <div>
                  <span style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(1rem, 1.5vw, 1.3rem)",
                    fontWeight: 400,
                    color: "var(--bronze)",
                    letterSpacing: "-0.01em",
                  }}>{award.year}</span>
                </div>

                {/* Content */}
                <div>
                  <div style={{ marginBottom: "8px", display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
                    <span style={{
                      fontSize: "9px",
                      letterSpacing: "0.22em",
                      textTransform: "uppercase",
                      color: "var(--muted-dark)",
                    }}>{award.organization}</span>
                    <span style={{ width: "3px", height: "3px", borderRadius: "50%", background: "var(--border)" }} />
                    <span style={{
                      fontSize: "9px",
                      letterSpacing: "0.22em",
                      textTransform: "uppercase",
                      color: "var(--muted-dark)",
                    }}>{award.category}</span>
                  </div>

                  <h3 style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(1.1rem, 2vw, 1.7rem)",
                    fontWeight: 400,
                    color: "var(--text)",
                    letterSpacing: "-0.01em",
                    lineHeight: 1.1,
                    marginBottom: "12px",
                    transition: "color 0.3s ease",
                  }}>{award.title}</h3>

                  <p style={{
                    fontSize: "var(--text-sm)",
                    color: "var(--muted)",
                    lineHeight: 1.7,
                    maxWidth: "600px",
                  }}>{award.description}</p>
                </div>

                {/* Award image — hover reveals */}
                {award.image && (
                  <div style={{
                    width: "clamp(80px, 10vw, 140px)",
                    aspectRatio: "3/4",
                    position: "relative",
                    overflow: "hidden",
                    flexShrink: 0,
                    opacity: activeAward === award.id ? 1 : 0.4,
                    transition: "opacity 0.4s ease",
                  }}>
                    <Image
                      src={award.image}
                      alt={award.title}
                      fill
                      style={{ objectFit: "cover" }}
                      sizes="140px"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <style>{`
          @media (max-width: 768px) {
            .award-row { grid-template-columns: 64px 1fr !important; }
            .award-img { display: none !important; }
          }
        `}</style>
      </section>

      {/* ── 03. PRESS MARQUEE BAND ─────────────────────────── */}
      <div style={{
        paddingBlock: "clamp(16px, 2vw, 24px)",
        borderBottom: "1px solid var(--border)",
        overflow: "hidden",
        background: "rgba(243,240,234,0.02)",
      }}>
        <div style={{
          display: "flex",
          whiteSpace: "nowrap",
          animation: "marqueeScroll 36s linear infinite",
        }}>
          {[...marqueeItems, ...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={i} style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "clamp(24px, 3vw, 48px)",
              paddingInline: "clamp(24px, 3vw, 48px)",
              fontSize: "clamp(11px, 1.1vw, 14px)",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "rgba(243,240,234,0.22)",
              fontFamily: "var(--font-sans)",
            }}>
              {item}
              <span style={{ color: "var(--bronze)", opacity: 0.5 }}>✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── 04. PRESS & PUBLICATIONS ─────────────────────── */}
      <section style={{
        paddingBlock: "var(--space-md)",
        paddingInline: "var(--gutter)",
        borderBottom: "1px solid var(--border)",
        background: "rgba(0,0,0,0.2)",
      }}>
        <div style={{ maxWidth: "var(--max-w)", marginInline: "auto", width: "100%" }}>

          {/* Header */}
          <div className="reveal-fade" style={{
            ...S.grid12,
            alignItems: "end",
            marginBottom: "clamp(40px, 6vw, 80px)",
          }}>
            <div style={{ gridColumn: "1 / 7" }}>
              <div style={S.label}>
                <span style={S.labelLine} />
                <span style={S.labelText}>Editorials</span>
              </div>
              <h2 style={{
                fontFamily: "var(--font-display)",
                fontSize: "var(--text-3xl)",
                fontWeight: 400,
                letterSpacing: "-0.01em",
                lineHeight: 1.05,
                color: "var(--text)",
              }}>Press & Publications</h2>
            </div>
            <p style={{
              gridColumn: "8 / 13",
              fontSize: "var(--text-sm)",
              color: "var(--muted)",
              lineHeight: 1.7,
              paddingBottom: "4px",
            }}>
              Featured across India's leading architectural and lifestyle media.
            </p>
          </div>

          {/* 2-column asymmetric press grid */}
          <div style={{ ...S.grid12 }}>
            {pressItems.map((item, i) => {
              const isLarge = i === 0;
              const col = isLarge ? "1 / 7" : i === 1 ? "7 / 13" : i === 2 ? "1 / 5" : "5 / 9";
              return (
                <div
                  key={item.id}
                  className="reveal-img"
                  style={{
                    gridColumn: col,
                    position: "relative",
                    overflow: "hidden",
                    aspectRatio: isLarge ? "3/4" : "4/5",
                    cursor: "pointer",
                  }}
                  onMouseEnter={e => (e.currentTarget.querySelector(".press-overlay") as HTMLElement)!.style.opacity = "1"}
                  onMouseLeave={e => (e.currentTarget.querySelector(".press-overlay") as HTMLElement)!.style.opacity = "0"}
                >
                  <Image
                    src={item.coverImage}
                    alt={item.publication}
                    fill
                    style={{ objectFit: "cover", transition: "transform 0.7s ease" }}
                    sizes="(max-width:768px) 100vw, 50vw"
                    onMouseEnter={e => (e.currentTarget as HTMLImageElement).style.transform = "scale(1.05)"}
                    onMouseLeave={e => (e.currentTarget as HTMLImageElement).style.transform = "scale(1)"}
                  />
                  {/* Gradient overlay */}
                  <div style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(to top, rgba(10,10,9,0.88) 0%, rgba(10,10,9,0.3) 50%, transparent 100%)",
                  }} />

                  {/* Hover overlay */}
                  <div className="press-overlay" style={{
                    position: "absolute",
                    inset: 0,
                    background: "rgba(10,10,9,0.45)",
                    opacity: 0,
                    transition: "opacity 0.4s ease",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}>
                    <span style={{
                      fontSize: "11px",
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      color: "var(--text)",
                      border: "1px solid rgba(243,240,234,0.3)",
                      padding: "10px 24px",
                    }}>View Feature →</span>
                  </div>

                  {/* Text at bottom */}
                  <div style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: "clamp(20px, 3vw, 32px)",
                  }}>
                    <span style={{
                      fontSize: "9px",
                      letterSpacing: "0.22em",
                      textTransform: "uppercase",
                      color: "var(--bronze)",
                      display: "block",
                      marginBottom: "8px",
                    }}>{item.tagline}</span>
                    <p style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "clamp(1rem, 1.4vw, 1.2rem)",
                      fontStyle: "italic",
                      color: "var(--text)",
                      lineHeight: 1.3,
                      marginBottom: "12px",
                    }}>"{item.quote}"</p>
                    <span style={{
                      fontSize: "9px",
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      color: "rgba(243,240,234,0.4)",
                    }}>Archived Feature</span>
                  </div>

                  {/* Publication name — top left */}
                  <div style={{
                    position: "absolute",
                    top: "clamp(16px, 2.5vw, 28px)",
                    left: "clamp(16px, 2.5vw, 28px)",
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(0.85rem, 1.2vw, 1rem)",
                    color: "var(--text)",
                    letterSpacing: "0.02em",
                  }}>{item.publication}</div>
                </div>
              );
            })}
          </div>
        </div>

        <style>{`
          @media (max-width: 900px) {
            .press-grid-cell { grid-column: 1 / -1 !important; }
          }
        `}</style>
      </section>

      {/* ── 05. BOTTOM CTA — editorial full-width ─────────── */}
      <section style={{
        paddingBlock: "var(--space-md)",
        paddingInline: "var(--gutter)",
      }}>
        <div style={{ maxWidth: "var(--max-w)", marginInline: "auto", width: "100%" }}>
          <div className="reveal-fade" style={{
            ...S.grid12,
            alignItems: "center",
            paddingBlock: "clamp(48px, 8vw, 96px)",
            borderTop: "1px solid var(--border)",
            borderBottom: "1px solid var(--border)",
          }}>
            <div style={{ gridColumn: "1 / 8" }}>
              <div style={S.label}>
                <span style={S.labelLine} />
                <span style={S.labelText}>Collaborate With Excellence</span>
              </div>
              <h2 style={{
                fontFamily: "var(--font-display)",
                fontSize: "var(--text-3xl)",
                fontWeight: 400,
                lineHeight: 1.05,
                letterSpacing: "-0.02em",
                color: "var(--text)",
                textTransform: "uppercase",
                marginBottom: "20px",
              }}>Create Award-Caliber Spaces</h2>
              <p style={{
                fontSize: "var(--text-sm)",
                color: "var(--muted)",
                lineHeight: 1.75,
                maxWidth: "500px",
                marginBottom: "clamp(28px, 4vw, 48px)",
              }}>
                Partner with {siteConfig.name} on your forthcoming architectural residence, commercial workspace, or luxury turnkey interior.
              </p>
              <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
                <Link href="/contact" style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  fontSize: "11px",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "var(--bg)",
                  background: "var(--text)",
                  padding: "14px 32px",
                  transition: "background 0.3s ease, color 0.3s ease",
                }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "var(--bronze)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "var(--text)"; }}
                >
                  Inquire With Our Studio →
                </Link>
                <Link href="/work" style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  fontSize: "11px",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "var(--muted)",
                  border: "1px solid var(--border)",
                  padding: "14px 32px",
                  transition: "color 0.3s ease, border-color 0.3s ease",
                }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "var(--text)"; (e.currentTarget as HTMLElement).style.borderColor = "var(--border-light)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "var(--muted)"; (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"; }}
                >
                  View Selected Projects
                </Link>
              </div>
            </div>

            {/* Right: large project image */}
            <div style={{
              gridColumn: "8 / 13",
              position: "relative",
              aspectRatio: "4/5",
              overflow: "hidden",
            }}>
              <Image
                src="/images/projects/prestige-avalon-park/hero.jpg"
                alt="Award winning architecture"
                fill
                style={{ objectFit: "cover" }}
                sizes="40vw"
              />
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes marqueeScroll {
          from { transform: translateX(0); }
          to { transform: translateX(-33.333%); }
        }
        @media (max-width: 900px) {
          .reveal-fade[style*="1 / 7"],
          .reveal-fade[style*="1 / 8"] { grid-column: 1 / -1 !important; }
          .reveal-fade[style*="8 / 13"],
          .reveal-fade[style*="9 / 13"] { grid-column: 1 / -1 !important; }
          .reveal-img { grid-column: 1 / -1 !important; }
        }
      `}</style>
    </div>
  );
}
