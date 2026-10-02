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
  const touchStartX = useRef<number | null>(null);

  const goToSlide = (newIndex: number) => {
    const total = featured.length;
    const clamped = Math.max(0, Math.min(newIndex, total - 1));
    setActiveIndex(clamped);

    const section = sectionRef.current;
    if (!section) return;
    const slides = section.querySelectorAll<HTMLElement>(".fp-slide");
    slides.forEach((slide, i) => {
      slide.style.opacity = i === clamped ? "1" : "0";
      slide.style.transform = i < clamped ? "scale(0.97)" : i > clamped ? "scale(1.03)" : "scale(1)";
    });
  };

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const slides = section.querySelectorAll<HTMLElement>(".fp-slide");
    const total = slides.length;

    // Desktop scroll-driven crossfade
    const handleScroll = () => {
      if (window.innerWidth < 768) return;
      const rect = section.getBoundingClientRect();
      const maxScroll = section.offsetHeight - window.innerHeight;
      if (maxScroll <= 0) return;

      const scrolled = -rect.top;
      const progress = Math.max(0, Math.min(scrolled / maxScroll, 1));
      // Give each slide equal duration in the scroll window
      const rawIndex = progress * (total - 0.01);
      const index = Math.min(Math.floor(rawIndex), total - 1);
      setActiveIndex(index);

      slides.forEach((slide, i) => {
        const target = i === index ? 1 : 0;
        slide.style.opacity = String(target);
        slide.style.transform = i < index ? "scale(0.97)" : i > index ? "scale(1.03)" : "scale(1)";
      });
    };

    const handleResize = () => {
      if (window.innerWidth < 768) {
        slides.forEach((slide, i) => {
          slide.style.opacity = i === activeIndex ? "1" : "0";
          slide.style.transform = i === activeIndex ? "scale(1)" : i < activeIndex ? "scale(0.97)" : "scale(1.03)";
        });
      } else {
        handleScroll();
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [activeIndex]);

  // Mobile touch swipe handling
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      if (diff > 0 && activeIndex < featured.length - 1) {
        goToSlide(activeIndex + 1);
      } else if (diff < 0 && activeIndex > 0) {
        goToSlide(activeIndex - 1);
      }
    }
    touchStartX.current = null;
  };

  return (
    <section
      ref={sectionRef}
      id="section-featured"
      className="featured-section-wrap"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      style={{
        position: "relative",
        background: "var(--bg)",
      }}
    >
      {/* Sticky viewport on desktop, full screen on mobile */}
      <div className="featured-sticky-viewport">
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
                  background: "linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.1) 40%, rgba(0,0,0,0.7) 100%)",
                }} />
              </div>

              {/* Project content — bottom editorial */}
              <div style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                paddingInline: "var(--gutter)",
                paddingBottom: "clamp(32px, 6vh, 80px)",
              }}>
                <div style={{
                  maxWidth: "var(--max-w)",
                  marginInline: "auto",
                  display: "flex",
                  alignItems: "flex-end",
                  justifyContent: "space-between",
                  gap: "24px",
                  flexWrap: "wrap",
                }}>
                  {/* Left: project info */}
                  <div style={{ maxWidth: "600px", flex: "1 1 300px" }}>
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
                        fontSize: "clamp(2rem, 5.5vw, 6rem)",
                        fontWeight: 400,
                        lineHeight: 0.95,
                        letterSpacing: "-0.025em",
                        color: "var(--text)",
                        textTransform: "uppercase",
                        marginBottom: "16px",
                      }}
                    >
                      {project.title}
                    </Link>

                    <p style={{
                      fontSize: "13px",
                      color: "rgba(243,240,234,0.6)",
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
                      gap: "20px",
                      marginTop: "12px",
                    }}>
                      <span style={{
                        fontSize: "11px",
                        letterSpacing: "0.15em",
                        textTransform: "uppercase",
                        color: "rgba(243,240,234,0.45)",
                      }}>
                        {project.location}
                      </span>
                      <span style={{ width: "1px", height: "12px", background: "rgba(243,240,234,0.2)" }} />
                      <span style={{
                        fontSize: "11px",
                        letterSpacing: "0.15em",
                        textTransform: "uppercase",
                        color: "rgba(243,240,234,0.45)",
                      }}>
                        {project.year}
                      </span>
                    </div>
                  </div>

                  {/* Right: navigation controls + view link */}
                  <div style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-end",
                    gap: "20px",
                    flexShrink: 0,
                  }}>
                    {/* Controls row: prev/next arrows + counter */}
                    <div style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "16px",
                    }}>
                      <button
                        type="button"
                        onClick={() => goToSlide(activeIndex - 1)}
                        disabled={activeIndex === 0}
                        aria-label="Previous project"
                        style={{
                          width: "32px",
                          height: "32px",
                          borderRadius: "50%",
                          border: "1px solid rgba(243,240,234,0.2)",
                          background: "rgba(10,10,9,0.4)",
                          color: activeIndex === 0 ? "rgba(243,240,234,0.2)" : "var(--text)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          cursor: activeIndex === 0 ? "default" : "pointer",
                          transition: "all 0.3s ease",
                        }}
                      >
                        ←
                      </button>

                      <div style={{
                        fontSize: "11px",
                        letterSpacing: "0.15em",
                        color: "rgba(243,240,234,0.5)",
                        fontFamily: "var(--font-sans)",
                        minWidth: "44px",
                        textAlign: "center",
                      }}>
                        {String(activeIndex + 1).padStart(2, "0")} / {String(featured.length).padStart(2, "0")}
                      </div>

                      <button
                        type="button"
                        onClick={() => goToSlide(activeIndex + 1)}
                        disabled={activeIndex === featured.length - 1}
                        aria-label="Next project"
                        style={{
                          width: "32px",
                          height: "32px",
                          borderRadius: "50%",
                          border: "1px solid rgba(243,240,234,0.2)",
                          background: "rgba(10,10,9,0.4)",
                          color: activeIndex === featured.length - 1 ? "rgba(243,240,234,0.2)" : "var(--text)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          cursor: activeIndex === featured.length - 1 ? "default" : "pointer",
                          transition: "all 0.3s ease",
                        }}
                      >
                        →
                      </button>
                    </div>

                    {/* Progress dots */}
                    <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
                      {featured.map((_, di) => (
                        <button
                          key={di}
                          type="button"
                          onClick={() => goToSlide(di)}
                          aria-label={`Go to slide ${di + 1}`}
                          style={{
                            width: di === activeIndex ? "18px" : "6px",
                            height: "5px",
                            borderRadius: "3px",
                            background: di === activeIndex ? "var(--bronze)" : "rgba(243,240,234,0.25)",
                            border: "none",
                            padding: 0,
                            cursor: "pointer",
                            transition: "all 0.35s ease",
                          }}
                        />
                      ))}
                    </div>

                    {/* View arrow link */}
                    <Link
                      href={`/work/${project.slug}`}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        fontSize: "11px",
                        letterSpacing: "0.2em",
                        textTransform: "uppercase",
                        color: "var(--text)",
                        borderBottom: "1px solid rgba(243,240,234,0.3)",
                        paddingBottom: "4px",
                      }}
                    >
                      View Project
                      <span>→</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Section label & hints header row */}
        <div style={{
          position: "absolute",
          top: "clamp(72px, 10vh, 110px)",
          left: "var(--gutter)",
          right: "var(--gutter)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          zIndex: 10,
          pointerEvents: "none",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
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

          <div>
            <span className="fp-desktop-hint" style={{
              fontSize: "9px",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "rgba(243,240,234,0.35)",
            }}>
              Scroll or click arrows to explore
            </span>
            <span className="fp-mobile-hint" style={{
              fontSize: "9px",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "rgba(243,240,234,0.35)",
            }}>
              Swipe
            </span>
          </div>
        </div>
      </div>

      <style>{`
        .featured-section-wrap {
          height: 100dvh;
          min-height: 560px;
        }
        .featured-sticky-viewport {
          position: relative;
          height: 100%;
          overflow: hidden;
        }
        .fp-desktop-hint { display: none; }
        .fp-mobile-hint { display: inline-block; }
        .fp-desc { display: none; }

        @media (min-width: 768px) {
          .featured-section-wrap {
            height: ${featured.length * 100}vh;
          }
          .featured-sticky-viewport {
            position: sticky;
            top: 0;
            height: 100vh;
          }
          .fp-desktop-hint { display: inline-block; }
          .fp-mobile-hint { display: none; }
          .fp-desc { display: block; }
        }
      `}</style>
    </section>
  );
}
