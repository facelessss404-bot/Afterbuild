"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { projects, projectCategories, type ProjectCategory } from "@/data/projects";
import { siteConfig } from "@/data/site";

export default function WorkPageClient() {
  const [activeFilter, setActiveFilter] = useState<"ALL" | ProjectCategory>("ALL");
  const gridRef = useRef<HTMLDivElement>(null);

  const filtered =
    activeFilter === "ALL" ? projects : projects.filter((p) => p.category === activeFilter);

  useEffect(() => {
    if (!gridRef.current) return;
    const items = gridRef.current.querySelectorAll(".wk-item");
    gsap.fromTo(
      items,
      { opacity: 0, y: 32 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.07, ease: "power4.out" }
    );
  }, [activeFilter]);

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)", color: "var(--text)" }}>

      {/* Page hero header */}
      <div style={{
        paddingTop: "clamp(100px, 14vh, 160px)",
        paddingBottom: "clamp(48px, 7vw, 96px)",
        paddingInline: "var(--gutter)",
        borderBottom: "1px solid var(--border)",
      }}>
        <div style={{ maxWidth: "var(--max-w)", marginInline: "auto", width: "100%" }}>

          {/* 12-col grid: heading left, desc right */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(12, minmax(0, 1fr))",
            gap: "var(--grid-gap)",
            alignItems: "end",
            marginBottom: "clamp(32px, 5vw, 64px)",
          }}>
            <div style={{ gridColumn: "1 / 8" }}>
              <div style={{
                display: "flex", alignItems: "center", gap: "12px",
                marginBottom: "clamp(12px, 2vw, 24px)",
              }}>
                <span style={{ width: "24px", height: "1px", background: "var(--bronze)" }} />
                <span style={{
                  fontSize: "10px", letterSpacing: "0.28em",
                  textTransform: "uppercase", color: "var(--bronze)",
                }}>
                  Portfolio & Archive
                </span>
              </div>
              <h1 style={{
                fontFamily: "var(--font-display)",
                fontSize: "var(--text-4xl)",
                fontWeight: 400,
                lineHeight: 0.95,
                letterSpacing: "-0.025em",
                color: "var(--text)",
                textTransform: "uppercase",
              }}>
                Selected<br />
                <span style={{ color: "rgba(243,240,234,0.3)", fontStyle: "italic" }}>Works</span>
              </h1>
            </div>

            <div style={{ gridColumn: "9 / 13", alignSelf: "end" }}>
              <p style={{
                fontSize: "var(--text-sm)",
                color: "var(--muted)",
                lineHeight: 1.75,
                fontWeight: 300,
              }}>
                An evolving curation of bespoke residential
                sanctuaries, architectural landmarks, and
                tactile interiors.
              </p>
            </div>
          </div>

          {/* Filter row */}
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "clamp(4px, 1vw, 8px)",
            flexWrap: "wrap",
            borderTop: "1px solid var(--border)",
            paddingTop: "clamp(20px, 3vw, 32px)",
          }}>
            <span style={{
              fontSize: "9px",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "var(--muted-dark)",
              marginRight: "8px",
            }}>
              Filter:
            </span>
            {projectCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                style={{
                  fontSize: "9px",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  padding: "8px 16px",
                  border: activeFilter === cat
                    ? "1px solid var(--text)"
                    : "1px solid var(--border)",
                  background: activeFilter === cat ? "var(--text)" : "transparent",
                  color: activeFilter === cat ? "var(--bg)" : "var(--muted)",
                  cursor: "pointer",
                  transition: "all 0.25s ease",
                }}
              >
                {cat}
                <span style={{ marginLeft: "6px", opacity: 0.5 }}>
                  ({cat === "ALL" ? projects.length : projects.filter(p => p.category === cat).length})
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Projects editorial grid */}
      <div
        ref={gridRef}
        style={{
          paddingBlock: "var(--space-md)",
          paddingInline: "var(--gutter)",
        }}
      >
        <div style={{ maxWidth: "var(--max-w)", marginInline: "auto", width: "100%" }}>

          {/* Mixed editorial layout — alternating compositions */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(12, minmax(0, 1fr))",
            gap: "var(--grid-gap)",
          }}>
            {filtered.map((project, idx) => {
              // Alternating compositions: wide / narrow / narrow / wide
              const pattern = idx % 4;
              let colSpan = "1 / 8"; // default: 7 wide cols
              if (pattern === 1) colSpan = "8 / 13";   // 5 cols right
              if (pattern === 2) colSpan = "1 / 6";     // 5 cols left
              if (pattern === 3) colSpan = "6 / 13";    // 7 cols right

              return (
                <Link
                  key={project.id}
                  href={`/work/${project.slug}`}
                  className="wk-item"
                  data-cursor="EXPLORE"
                  style={{
                    gridColumn: colSpan,
                    display: "block",
                    marginBottom: "clamp(8px, 1.5vw, 16px)",
                  }}
                >
                  {/* Image — no card, just image + bottom metadata */}
                  <div style={{
                    position: "relative",
                    overflow: "hidden",
                    aspectRatio: pattern % 2 === 0 ? "16/10" : "3/4",
                    background: "var(--surface)",
                    marginBottom: "16px",
                  }}
                  className="img-hover"
                  >
                    <Image
                      src={project.heroImage}
                      alt={project.title}
                      fill
                      style={{ objectFit: "cover" }}
                      sizes="(max-width: 768px) 100vw, 60vw"
                      priority={idx < 2}
                    />

                    {/* Category pill — top left */}
                    <div style={{
                      position: "absolute",
                      top: "16px",
                      left: "16px",
                      padding: "6px 14px",
                      background: "rgba(10,10,9,0.7)",
                      backdropFilter: "blur(12px)",
                      fontSize: "9px",
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      color: "var(--bronze)",
                    }}>
                      {project.category}
                    </div>
                  </div>

                  {/* Below-image metadata — editorial style */}
                  <div style={{
                    display: "flex",
                    alignItems: "baseline",
                    justifyContent: "space-between",
                    gap: "16px",
                    paddingTop: "4px",
                  }}>
                    <div>
                      <p style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "clamp(1.1rem, 2vw, 1.6rem)",
                        fontWeight: 400,
                        color: "var(--text)",
                        lineHeight: 1.2,
                        marginBottom: "6px",
                        letterSpacing: "-0.01em",
                      }}>
                        {project.title}
                      </p>
                      <p style={{
                        fontSize: "11px",
                        color: "var(--muted-dark)",
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                      }}>
                        {project.location} — {project.year}
                      </p>
                    </div>

                    <span style={{
                      fontSize: "12px",
                      color: "var(--muted-dark)",
                      flexShrink: 0,
                    }}>
                      →
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>

          {filtered.length === 0 && (
            <div style={{ padding: "96px 0", textAlign: "center" }}>
              <p style={{ fontSize: "13px", color: "var(--muted-dark)" }}>
                No projects in this category.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Marquee strip */}
      <div style={{
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
        overflow: "hidden",
        paddingBlock: "clamp(12px, 1.5vw, 20px)",
        background: "var(--surface)",
      }}>
        <div style={{
          display: "flex",
          animation: "marquee 40s linear infinite",
          whiteSpace: "nowrap",
        }}>
          {Array.from({ length: 6 }).map((_, i) => (
            <span key={i} style={{
              fontSize: "11px",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "rgba(243,240,234,0.12)",
              marginRight: "48px",
              flexShrink: 0,
            }}>
              {siteConfig.name}® Architecture ✦ Interior Design ✦ Turnkey Delivery ✦
            </span>
          ))}
        </div>
      </div>

      {/* Mobile: single column override */}
      <style>{`
        @media (max-width: 800px) {
          .wk-item {
            grid-column: 1 / -1 !important;
          }
        }
        @media (max-width: 900px) {
          [style*="gridColumn: \"9 / 13\""],
          [style*="gridColumn: \"1 / 8\""] {
            grid-column: 1 / -1 !important;
          }
        }
      `}</style>
    </div>
  );
}
