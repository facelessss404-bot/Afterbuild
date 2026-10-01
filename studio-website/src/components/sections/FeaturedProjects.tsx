"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects } from "@/data/projects";

gsap.registerPlugin(ScrollTrigger);

const featured = projects.filter((p) => p.featured);

export default function FeaturedProjects() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Use CSS sticky + IntersectionObserver instead of GSAP pin (avoids removeChild crash)
    const slides = section.querySelectorAll<HTMLElement>(".fp-slide");
    const total = slides.length;

    // Simple opacity crossfade driven by scroll position — NO pin
    const handleScroll = () => {
      const rect = section.getBoundingClientRect();
      const sectionH = section.offsetHeight;
      // Each "virtual slide" occupies 100vh within the sticky section
      const scrolled = -rect.top;
      const progress = Math.max(0, Math.min(scrolled / sectionH, 1));
      const rawIndex = progress * total;
      const index = Math.min(Math.floor(rawIndex), total - 1);
      setActiveIndex(index);

      slides.forEach((slide, i) => {
        const target = i === index ? 1 : 0;
        slide.style.opacity = String(target);
        slide.style.transform = i < index ? "scale(0.97)" : i > index ? "scale(1.03)" : "scale(1)";
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="section-featured"
      style={{
        position: "relative",
        height: `${featured.length * 100}vh`,
        background: "#000",
      }}
    >
      {/* Sticky viewport — NO GSAP pin, pure CSS sticky */}
      <div style={{
        position: "sticky",
        top: 0,
        height: "100vh",
        overflow: "hidden",
      }}>
        {/* Project slides — all stacked absolutely */}
        <div style={{ position: "absolute", inset: 0 }}>
          {featured.map((project, i) => (
            <div
              key={project.id}
              className="fp-slide"
              style={{
                position: "absolute",
                inset: 0,
                opacity: i === 0 ? 1 : 0,
                transition: "opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1)",
              }}
            >
              {/* Full-bleed image */}
              <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
                <div
                  className="fp-img-inner"
                  style={{
                    position: "absolute",
                    inset: "-10% 0",
                    willChange: "transform",
                  }}
                >
                  <Image
                    src={project.heroImage}
                    alt={project.title}
                    fill
                    style={{ objectFit: "cover" }}
                    quality={90}
                    priority={i === 0}
                    sizes="100vw"
                  />
                </div>

                {/* Gradient overlay */}
                <div style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.1) 40%, rgba(0,0,0,0.65) 100%)",
                }} />
              </div>

              {/* Project content — bottom left editorial */}
              <div style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                paddingInline: "var(--gutter)",
                paddingBottom: "clamp(40px, 7vh, 80px)",
              }}>
                <div style={{
                  maxWidth: "var(--max-w)",
                  marginInline: "auto",
                  display: "flex",
                  alignItems: "flex-end",
                  justifyContent: "space-between",
                  gap: "24px",
                }}>
                  {/* Left: project info */}
                  <div>
                    <p style={{
                      fontSize: "10px",
                      letterSpacing: "0.28em",
                      textTransform: "uppercase",
                      color: "var(--bronze)",
                      marginBottom: "12px",
                    }}>
                      {String(i + 1).padStart(2, "0")} / {project.category}
                    </p>

                    <Link
                      href={`/work/${project.slug}`}
                      data-cursor="EXPLORE"
                      style={{
                        display: "block",
                        fontFamily: "var(--font-display)",
                        fontSize: "clamp(2.5rem, 6vw, 6rem)",
                        fontWeight: 400,
                        lineHeight: 0.92,
                        letterSpacing: "-0.025em",
                        color: "var(--text)",
                        textTransform: "uppercase",
                        marginBottom: "20px",
                      }}
                    >
                      {project.title}
                    </Link>

                    <p style={{
                      fontSize: "13px",
                      color: "rgba(243,240,234,0.55)",
                      maxWidth: "460px",
                      lineHeight: 1.6,
                    }}
                    className="fp-desc"
                    >
                      {project.description}
                    </p>

                    {/* Meta row */}
                    <div style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "24px",
                      marginTop: "12px",
                    }}>
                      <span style={{
                        fontSize: "11px",
                        letterSpacing: "0.15em",
                        textTransform: "uppercase",
                        color: "rgba(243,240,234,0.4)",
                      }}>
                        {project.location}
                      </span>
                      <span style={{ width: "1px", height: "12px", background: "rgba(243,240,234,0.2)" }} />
                      <span style={{
                        fontSize: "11px",
                        letterSpacing: "0.15em",
                        textTransform: "uppercase",
                        color: "rgba(243,240,234,0.4)",
                      }}>
                        {project.year}
                      </span>
                    </div>
                  </div>

                  {/* Right: progress indicator + view link */}
                  <div style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-end",
                    gap: "24px",
                    flexShrink: 0,
                  }}>
                    {/* Slide counter */}
                    <div style={{
                      fontSize: "11px",
                      letterSpacing: "0.15em",
                      color: "rgba(243,240,234,0.35)",
                      fontFamily: "var(--font-sans)",
                    }}>
                      {String(activeIndex + 1).padStart(2, "0")} / {String(featured.length).padStart(2, "0")}
                    </div>

                    {/* Progress dots */}
                    <div style={{ display: "flex", gap: "6px" }}>
                      {featured.map((_, di) => (
                        <span key={di} style={{
                          width: "5px",
                          height: "5px",
                          borderRadius: "50%",
                          background: di === activeIndex ? "var(--bronze)" : "rgba(243,240,234,0.2)",
                          transition: "background 0.4s ease",
                        }} />
                      ))}
                    </div>

                    {/* View arrow */}
                    <Link
                      href={`/work/${project.slug}`}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        fontSize: "10px",
                        letterSpacing: "0.2em",
                        textTransform: "uppercase",
                        color: "var(--text)",
                        borderBottom: "1px solid rgba(243,240,234,0.25)",
                        paddingBottom: "2px",
                      }}
                    >
                      View Project
                      <span>→</span>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Scroll hint — first slide only */}
              {i === 0 && (
                <div style={{
                  position: "absolute",
                  top: "clamp(80px, 12vh, 120px)",
                  right: "var(--gutter)",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}>
                  <span style={{
                    fontSize: "9px",
                    letterSpacing: "0.25em",
                    textTransform: "uppercase",
                    color: "rgba(243,240,234,0.3)",
                  }}>
                    Scroll to explore
                  </span>
                  <span style={{ fontSize: "12px", color: "rgba(243,240,234,0.3)" }}>↓</span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Section label — top left */}
        <div style={{
          position: "absolute",
          top: "clamp(80px, 12vh, 120px)",
          left: "var(--gutter)",
          display: "flex",
          alignItems: "center",
          gap: "12px",
          zIndex: 10,
        }}>
          <span style={{ width: "24px", height: "1px", background: "var(--bronze)" }} />
          <span style={{
            fontSize: "10px",
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            color: "var(--bronze)",
          }}>
            03 / Featured Work
          </span>
        </div>
      </div>

      <style>{`
        .fp-desc { display: none; }
        @media (min-width: 768px) {
          .fp-desc { display: block; }
        }
      `}</style>
    </section>
  );
}
