"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects, projectCategories, type ProjectCategory } from "@/data/projects";

gsap.registerPlugin(ScrollTrigger);

export default function ProjectIndex() {
  const sectionRef = useRef<HTMLElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const [activeFilter, setActiveFilter] = useState<"ALL" | ProjectCategory>("ALL");
  const [previewSrc, setPreviewSrc] = useState(projects[0].thumbnailImage);
  const [previewVisible, setPreviewVisible] = useState(false);

  const filtered = activeFilter === "ALL" ? projects : projects.filter((p) => p.category === activeFilter);

  // Mouse-follow preview
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const handleMouseMove = (e: MouseEvent) => {
      const preview = previewRef.current;
      if (!preview) return;
      gsap.to(preview, {
        x: e.clientX + 24,
        y: e.clientY - 80,
        duration: 0.45,
        ease: "power3.out",
      });
    };

    section.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => section.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Row entrance animation when filter changes
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        section.querySelectorAll(".pi-row"),
        { x: -20, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.05,
          ease: "power4.out",
          scrollTrigger: { trigger: section, start: "top 80%", once: true },
        }
      );
    }, sectionRef);
    return () => { try { ctx.revert(); } catch (_) {} };
  }, [activeFilter]);

  return (
    <section
      ref={sectionRef}
      id="section-project-index"
      style={{
        background: "var(--cream, #e8e3da)",
        paddingBlock: "var(--space-lg)",
        paddingInline: "var(--gutter)",
        position: "relative",
      }}
    >
      {/* Floating cursor preview image (desktop only) */}
      <div
        ref={previewRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "200px",
          height: "140px",
          pointerEvents: "none",
          zIndex: 50,
          overflow: "hidden",
          opacity: previewVisible ? 1 : 0,
          transform: previewVisible ? "scale(1)" : "scale(0.9)",
          transition: "opacity 0.3s ease, transform 0.3s ease",
        }}
        className="hidden md:block"
      >
        <Image
          src={previewSrc}
          alt="Project preview"
          fill
          style={{ objectFit: "cover" }}
          sizes="200px"
        />
      </div>

      <div style={{ maxWidth: "var(--max-w)", marginInline: "auto", width: "100%" }}>

        {/* Header row */}
        <div style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          marginBottom: "clamp(32px, 5vw, 64px)",
          gap: "24px",
          flexWrap: "wrap",
        }}>
          <div>
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              marginBottom: "clamp(12px, 2vw, 20px)",
            }}>
              <span style={{ width: "24px", height: "1px", background: "#6b6762", display: "block" }} />
              <span style={{
                fontSize: "10px",
                letterSpacing: "0.28em",
                textTransform: "uppercase",
                color: "#6b6762",
              }}>
                04 / All Projects
              </span>
            </div>
            <h2 style={{
              fontFamily: "var(--font-display)",
              fontSize: "var(--text-3xl)",
              fontWeight: 400,
              lineHeight: 1.05,
              letterSpacing: "-0.01em",
              color: "#0a0a09",
            }}>
              Project Archive
            </h2>
          </div>

          {/* Filter pills */}
          <div style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "8px",
            alignItems: "center",
          }}>
            {projectCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                style={{
                  fontSize: "9px",
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  padding: "8px 16px",
                  border: activeFilter === cat
                    ? "1px solid #0a0a09"
                    : "1px solid rgba(10,10,9,0.15)",
                  background: activeFilter === cat ? "#0a0a09" : "transparent",
                  color: activeFilter === cat ? "#f3f0ea" : "#6b6762",
                  cursor: "pointer",
                  transition: "all 0.25s ease",
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Column headers */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "52px 1fr 160px 64px",
          gap: "clamp(12px, 2vw, 32px)",
          padding: "0 0 12px",
          borderBottom: "1px solid rgba(10,10,9,0.12)",
          marginBottom: "0",
        }}
        className="hidden-mobile"
        >
          <span style={{ fontSize: "9px", letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(10,10,9,0.35)" }}>No.</span>
          <span style={{ fontSize: "9px", letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(10,10,9,0.35)" }}>Project</span>
          <span style={{ fontSize: "9px", letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(10,10,9,0.35)" }}>Category</span>
          <span style={{ fontSize: "9px", letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(10,10,9,0.35)", textAlign: "right" }}>Year</span>
        </div>

        {/* Project rows */}
        <div>
          {filtered.map((project, i) => (
            <Link
              key={project.id}
              href={`/work/${project.slug}`}
              className="pi-row pi-grid-row"
              data-cursor="VIEW"
              onMouseEnter={(e) => {
                setPreviewSrc(project.thumbnailImage);
                setPreviewVisible(true);
                (e.currentTarget as HTMLElement).style.background = "rgba(10,10,9,0.03)";
              }}
              onMouseLeave={(e) => {
                setPreviewVisible(false);
                (e.currentTarget as HTMLElement).style.background = "transparent";
              }}
              style={{
                padding: "clamp(18px, 2.5vw, 26px) clamp(8px, 1vw, 16px)",
                borderBottom: "1px solid rgba(10,10,9,0.08)",
                transition: "background 0.3s ease",
              }}
            >
              {/* Number */}
              <span style={{
                fontFamily: "var(--font-sans)",
                fontSize: "11px",
                letterSpacing: "0.12em",
                color: "rgba(10,10,9,0.25)",
              }}>
                {String(i + 1).padStart(2, "0")}
              </span>

              {/* Title + mobile category */}
              <div>
                <span style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(1.1rem, 2.2vw, 1.8rem)",
                  fontWeight: 400,
                  color: "#0a0a09",
                  lineHeight: 1.2,
                  display: "block",
                  transition: "color 0.3s ease",
                }}>
                  {project.title}
                </span>
                <span style={{
                  fontSize: "9px",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "rgba(10,10,9,0.4)",
                  marginTop: "4px",
                  display: "none",
                }}
                className="pi-mobile-cat"
                >
                  {project.category} · {project.year}
                </span>
              </div>

              {/* Category (desktop) */}
              <span style={{
                fontSize: "10px",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "rgba(10,10,9,0.45)",
              }}
              className="pi-col-category hidden-mobile"
              >
                {project.category}
              </span>

              {/* Year / Arrow */}
              <div style={{ textAlign: "right" }}>
                <span style={{
                  fontSize: "11px",
                  letterSpacing: "0.12em",
                  color: "rgba(10,10,9,0.35)",
                }}
                className="hidden-mobile"
                >
                  {project.year}
                </span>
                <span style={{
                  fontSize: "13px",
                  color: "rgba(10,10,9,0.4)",
                  display: "none",
                }}
                className="pi-mobile-arrow"
                >
                  →
                </span>
              </div>
            </Link>
          ))}

          {filtered.length === 0 && (
            <div style={{ padding: "48px 0", color: "rgba(10,10,9,0.4)", fontSize: "13px" }}>
              No projects in this category.
            </div>
          )}
        </div>

        {/* Bottom row — total count */}
        <div style={{
          marginTop: "clamp(24px, 4vw, 48px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}>
          <span style={{
            fontSize: "10px",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "rgba(10,10,9,0.35)",
          }}>
            Showing {filtered.length} of {projects.length} projects
          </span>
          <Link href="/work" style={{
            fontSize: "11px",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#0a0a09",
            borderBottom: "1px solid rgba(10,10,9,0.35)",
            paddingBottom: "2px",
            transition: "border-color 0.3s ease",
          }}>
            View All Work →
          </Link>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .pi-mobile-cat { display: block !important; }
          .pi-mobile-arrow { display: inline-block !important; }
        }
      `}</style>
    </section>
  );
}
