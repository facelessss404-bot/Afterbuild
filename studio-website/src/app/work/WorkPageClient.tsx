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
          <div className="work-hero-grid" style={{
            alignItems: "end",
            marginBottom: "clamp(32px, 5vw, 64px)",
          }}>
            <div className="work-hero-title">
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
                <span style={{ color: "var(--bronze)", fontStyle: "italic" }}>Works</span>
              </h1>
            </div>

            <div className="work-hero-desc" style={{ alignSelf: "end", maxWidth: "420px" }}>
              <p style={{
                fontSize: "var(--text-sm)",
                color: "var(--muted)",
                lineHeight: 1.75,
                fontWeight: 300,
                marginBottom: "12px",
              }}>
                An evolving archive of 160+ residential sanctuaries, modular kitchens,
                and architectural interiors across Bangalore and beyond.
              </p>
              <div style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "6px 12px",
                borderRadius: "4px",
                background: "rgba(197, 168, 128, 0.08)",
                border: "1px solid rgba(197, 168, 128, 0.2)",
                fontSize: "10px",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "var(--bronze)",
              }}>
                <span style={{ display: "inline-block", width: "6px", height: "6px", borderRadius: "50%", background: "#4ade80" }} />
                <span>Google Drive Live Upload Pipeline Active</span>
              </div>
            </div>
          </div>

          {/* Filter row */}
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "clamp(6px, 1.2vw, 12px)",
            flexWrap: "wrap",
            borderTop: "1px solid var(--border)",
            paddingTop: "clamp(20px, 3vw, 32px)",
          }}>
            <span style={{
              fontSize: "12px",
              fontWeight: 600,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "var(--bronze)",
              marginRight: "10px",
            }}>
              Filter:
            </span>
            {projectCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                style={{
                  fontSize: "11px",
                  fontWeight: 600,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  padding: "10px 20px",
                  borderRadius: "2px",
                  border: activeFilter === cat
                    ? "1px solid var(--text)"
                    : "1px solid rgba(20, 19, 18, 0.14)",
                  background: activeFilter === cat ? "var(--text)" : "var(--surface)",
                  color: activeFilter === cat ? "var(--bg)" : "var(--text-secondary)",
                  cursor: "pointer",
                  transition: "all 0.25s ease",
                  boxShadow: activeFilter === cat ? "0 2px 10px rgba(0,0,0,0.12)" : "0 1px 4px rgba(0,0,0,0.03)",
                }}
                onMouseEnter={e => {
                  if (activeFilter !== cat) {
                    (e.currentTarget as HTMLElement).style.borderColor = "var(--bronze)";
                    (e.currentTarget as HTMLElement).style.color = "var(--bronze)";
                  }
                }}
                onMouseLeave={e => {
                  if (activeFilter !== cat) {
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(20, 19, 18, 0.14)";
                    (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)";
                  }
                }}
              >
                {cat}
                <span style={{ marginLeft: "6px", opacity: 0.8, fontSize: "10px" }}>
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

          {/* Mixed editorial layout — alternating compositions for 5 projects */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(12, minmax(0, 1fr))",
            gap: "var(--grid-gap)",
          }}>
            {filtered.map((project, idx) => {
              // Alternating compositions: 7-col / 5-col / 5-col / 7-col / full 12-col
              const pattern = idx % 5;
              let colSpan = "1 / 8"; // default: 7 wide cols
              let aspectRatio = "16/10";
              if (pattern === 1) { colSpan = "8 / 13"; aspectRatio = "3/4"; }
              if (pattern === 2) { colSpan = "1 / 6"; aspectRatio = "3/4"; }
              if (pattern === 3) { colSpan = "6 / 13"; aspectRatio = "16/10"; }
              if (pattern === 4) { colSpan = "1 / 13"; aspectRatio = "21/9"; }

              return (
                <Link
                  key={project.id}
                  href={`/work/${project.slug}`}
                  className="wk-item"
                  data-cursor="EXPLORE"
                  style={{
                    gridColumn: colSpan,
                    display: "block",
                    marginBottom: "clamp(12px, 2vw, 24px)",
                  }}
                >
                  {/* Image — no card, just image + bottom metadata */}
                  <div style={{
                    position: "relative",
                    overflow: "hidden",
                    aspectRatio: aspectRatio,
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
                      background: "rgba(10,10,9,0.75)",
                      backdropFilter: "blur(12px)",
                      fontSize: "9px",
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      color: "var(--bronze)",
                      borderRadius: "2px",
                      border: "1px solid rgba(197, 168, 128, 0.25)",
                    }}>
                      {project.category}
                    </div>

                    {/* Walkthrough badge — top right */}
                    {project.video?.hasVideo && (
                      <div style={{
                        position: "absolute",
                        top: "16px",
                        right: "16px",
                        padding: "6px 12px",
                        background: "rgba(10,10,9,0.85)",
                        backdropFilter: "blur(12px)",
                        fontSize: "9px",
                        letterSpacing: "0.15em",
                        textTransform: "uppercase",
                        color: "#fff",
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        borderRadius: "2px",
                        border: "1px solid rgba(255, 255, 255, 0.2)",
                      }}>
                        <span style={{ color: "var(--bronze)", fontSize: "10px" }}>&#9658;</span>
                        <span>4K Walkthrough</span>
                      </div>
                    )}
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
              color: "rgba(20, 19, 18, 0.55)",
              marginRight: "48px",
              flexShrink: 0,
              fontWeight: 600,
            }}>
              {siteConfig.name}® Architecture ✦ Interior Design ✦ Turnkey Delivery ✦
            </span>
          ))}
        </div>
      </div>

      {/* Mobile & Tablet: single column override */}
      <style>{`
        @media (max-width: 1024px) {
          .wk-item {
            grid-column: 1 / -1 !important;
          }
        }
      `}</style>
    </div>
  );
}
