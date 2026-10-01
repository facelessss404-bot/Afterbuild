"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects } from "@/data/projects";

gsap.registerPlugin(ScrollTrigger);

export default function ProjectDetailClient({ slug }: { slug: string }) {
  const project = projects.find((p) => p.slug === slug);
  if (!project) return notFound();

  const nextProject = projects[(projects.indexOf(project) + 1) % projects.length];
  const pageRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const page = pageRef.current;
    if (!page) return;

    const ctx = gsap.context(() => {
      // Hero reveal
      gsap.fromTo(".pd-hero-img",
        { clipPath: "inset(10% 10% 10% 10%)", scale: 1.08 },
        { clipPath: "inset(0% 0% 0% 0%)", scale: 1, duration: 1.8, ease: "power4.inOut", delay: 0.2 }
      );
      gsap.fromTo(".pd-hero-meta",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.9, ease: "power4.out", delay: 1.0, stagger: 0.1 }
      );

      // All images reveal on scroll
      const revealImgs = page.querySelectorAll(".pd-img-reveal");
      revealImgs.forEach((img) => {
        gsap.fromTo(img,
          { clipPath: "inset(8% 8% 8% 8%)", scale: 1.06 },
          {
            clipPath: "inset(0% 0% 0% 0%)", scale: 1,
            duration: 1.4, ease: "power4.out",
            scrollTrigger: { trigger: img, start: "top 85%" },
          }
        );
      });

      // Text reveals
      page.querySelectorAll(".pd-text-reveal").forEach((el) => {
        gsap.fromTo(el,
          { opacity: 0, y: 24 },
          {
            opacity: 1, y: 0, duration: 0.8, ease: "power4.out",
            scrollTrigger: { trigger: el, start: "top 85%" },
          }
        );
      });
    }, pageRef);

    return () => { try { ctx.revert(); } catch (_) {} };
  }, []);

  // Build varied image story from project images
  const buildImageStory = () => {
    const imgs = project.images;
    const elements: React.ReactNode[] = [];
    let i = 0;

    while (i < imgs.length) {
      const mod = Math.floor(i / 1) % 5;

      if (mod === 0 && imgs[i]) {
        // Full bleed
        elements.push(
          <div key={`full-${i}`} className="pd-img-reveal" style={{
            position: "relative",
            width: "100%",
            aspectRatio: "21/9",
            overflow: "hidden",
          }}>
            <Image src={imgs[i]} alt={`${project.title} — view ${i + 1}`}
              fill style={{ objectFit: "cover" }} loading="lazy" sizes="100vw" />
          </div>
        );
        i += 1;
      } else if (mod === 1 && imgs[i] && imgs[i + 1]) {
        // 50/50 pair
        elements.push(
          <div key={`pair-${i}`} style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "var(--grid-gap)",
          }}>
            {[imgs[i], imgs[i + 1]].map((src, j) => (
              <div key={j} className="pd-img-reveal" style={{
                position: "relative", aspectRatio: "4/3", overflow: "hidden",
              }}>
                <Image src={src} alt={`${project.title} — view ${i + j + 1}`}
                  fill style={{ objectFit: "cover" }} loading="lazy" sizes="50vw" />
              </div>
            ))}
          </div>
        );
        i += 2;
      } else if (mod === 2 && imgs[i]) {
        // Left-offset 75% wide
        elements.push(
          <div key={`left-${i}`} style={{
            display: "grid",
            gridTemplateColumns: "repeat(12, minmax(0, 1fr))",
            gap: "var(--grid-gap)",
          }}>
            <div className="pd-img-reveal" style={{
              gridColumn: "1 / 10",
              position: "relative",
              aspectRatio: "16/10",
              overflow: "hidden",
            }}>
              <Image src={imgs[i]} alt={`${project.title} — view ${i + 1}`}
                fill style={{ objectFit: "cover" }} loading="lazy" sizes="75vw" />
            </div>
          </div>
        );
        i += 1;
      } else if (mod === 3 && imgs[i]) {
        // Right-offset 75% wide
        elements.push(
          <div key={`right-${i}`} style={{
            display: "grid",
            gridTemplateColumns: "repeat(12, minmax(0, 1fr))",
            gap: "var(--grid-gap)",
          }}>
            <div className="pd-img-reveal" style={{
              gridColumn: "4 / 13",
              position: "relative",
              aspectRatio: "16/10",
              overflow: "hidden",
            }}>
              <Image src={imgs[i]} alt={`${project.title} — view ${i + 1}`}
                fill style={{ objectFit: "cover" }} loading="lazy" sizes="75vw" />
            </div>
          </div>
        );
        i += 1;
      } else if (mod === 4 && imgs[i] && imgs[i + 1]) {
        // 40/60 asymmetric pair
        elements.push(
          <div key={`asym-${i}`} style={{
            display: "grid",
            gridTemplateColumns: "2fr 3fr",
            gap: "var(--grid-gap)",
            alignItems: "end",
          }}>
            <div className="pd-img-reveal" style={{
              position: "relative", aspectRatio: "3/4", overflow: "hidden",
            }}>
              <Image src={imgs[i]} alt={`${project.title} — view ${i + 1}`}
                fill style={{ objectFit: "cover" }} loading="lazy" sizes="40vw" />
            </div>
            <div className="pd-img-reveal" style={{
              position: "relative", aspectRatio: "4/3", overflow: "hidden",
            }}>
              <Image src={imgs[i + 1]} alt={`${project.title} — view ${i + 2}`}
                fill style={{ objectFit: "cover" }} loading="lazy" sizes="60vw" />
            </div>
          </div>
        );
        i += 2;
      } else {
        i += 1;
      }
    }

    return elements;
  };

  return (
    <article ref={pageRef} style={{ background: "var(--bg)" }}>

      {/* ── HERO ── */}
      <div style={{ position: "relative", height: "100dvh", overflow: "hidden" }}>
        <div className="pd-hero-img" style={{ position: "absolute", inset: 0 }}>
          <Image
            src={project.heroImage}
            alt={project.title}
            fill
            priority
            style={{ objectFit: "cover" }}
            quality={95}
            sizes="100vw"
          />
          <div style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to bottom, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0) 40%, rgba(0,0,0,0.7) 100%)",
          }} />
        </div>

        {/* Hero text — bottom editorial */}
        <div style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          paddingInline: "var(--gutter)",
          paddingBottom: "clamp(40px, 7vh, 80px)",
          zIndex: 10,
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
            <div>
              <p className="pd-hero-meta" style={{
                fontSize: "10px",
                letterSpacing: "0.28em",
                textTransform: "uppercase",
                color: "var(--bronze)",
                marginBottom: "12px",
              }}>
                {project.category} · {project.location}
              </p>
              <h1 className="pd-hero-meta" style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2.8rem, 7vw, 6.5rem)",
                fontWeight: 400,
                lineHeight: 0.93,
                letterSpacing: "-0.025em",
                color: "var(--text)",
                textTransform: "uppercase",
              }}>
                {project.title}
              </h1>
            </div>

            <div className="pd-hero-meta" style={{
              textAlign: "right",
            }}>
              <p style={{
                fontSize: "9px",
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                color: "rgba(243,240,234,0.4)",
                marginBottom: "4px",
              }}>
                Year
              </p>
              <p style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.2rem, 2vw, 1.8rem)",
                color: "var(--text)",
              }}>
                {project.year}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── PROJECT INFO ── */}
      <div style={{
        paddingBlock: "var(--space-md)",
        paddingInline: "var(--gutter)",
        borderBottom: "1px solid var(--border)",
      }}>
        <div style={{
          maxWidth: "var(--max-w)",
          marginInline: "auto",
          display: "grid",
          gridTemplateColumns: "repeat(12, minmax(0, 1fr))",
          gap: "var(--grid-gap)",
        }}>
          {/* Description — left 7 cols */}
          <div className="pd-text-reveal" style={{ gridColumn: "1 / 8" }}>
            <p style={{
              fontSize: "9px",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "var(--muted-dark)",
              marginBottom: "clamp(16px, 2.5vw, 24px)",
            }}>
              Project Overview
            </p>
            <p style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.1rem, 2.2vw, 1.7rem)",
              color: "rgba(243,240,234,0.85)",
              lineHeight: 1.55,
              fontWeight: 400,
            }}>
              {project.description}
            </p>
            {project.statement && (
              <p style={{
                fontSize: "var(--text-sm)",
                color: "var(--muted)",
                lineHeight: 1.75,
                marginTop: "clamp(16px, 2.5vw, 24px)",
                fontStyle: "italic",
                borderLeft: "2px solid var(--bronze)",
                paddingLeft: "20px",
              }}>
                "{project.statement}"
              </p>
            )}
          </div>

          {/* Facts — right 4 cols */}
          <div className="pd-text-reveal" style={{ gridColumn: "9 / 13" }}>
            <div style={{
              display: "flex",
              flexDirection: "column",
              gap: "0",
              border: "1px solid var(--border)",
            }}>
              {[
                { label: "Project", value: project.title },
                { label: "Category", value: project.category },
                { label: "Location", value: project.location },
                { label: "Year", value: project.year },
                ...(project.area ? [{ label: "Area", value: project.area }] : []),
              ].map((fact, i) => (
                <div key={i} style={{
                  padding: "clamp(12px, 1.8vw, 18px) clamp(14px, 2vw, 22px)",
                  borderBottom: "1px solid var(--border)",
                  display: "flex",
                  flexDirection: "column",
                  gap: "4px",
                }}>
                  <span style={{
                    fontSize: "9px",
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    color: "var(--muted-dark)",
                  }}>
                    {fact.label}
                  </span>
                  <span style={{
                    fontSize: "13px",
                    color: "var(--text)",
                  }}>
                    {fact.value}
                  </span>
                </div>
              ))}

              {/* Services */}
              <div style={{
                padding: "clamp(12px, 1.8vw, 18px) clamp(14px, 2vw, 22px)",
              }}>
                <span style={{
                  fontSize: "9px",
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: "var(--muted-dark)",
                  display: "block",
                  marginBottom: "8px",
                }}>
                  Services
                </span>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                  {project.services.map((s) => (
                    <span key={s} style={{
                      fontSize: "9px",
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      color: "var(--muted)",
                      border: "1px solid var(--border)",
                      padding: "5px 10px",
                    }}>
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── IMAGE STORY ── */}
      <div style={{
        paddingInline: "var(--gutter)",
        paddingBlock: "var(--space-md)",
      }}>
        <div style={{
          maxWidth: "var(--max-w)",
          marginInline: "auto",
          display: "flex",
          flexDirection: "column",
          gap: "var(--space-xs)",
        }}>
          {buildImageStory()}
        </div>
      </div>

      {/* ── NEXT PROJECT ── */}
      <Link
        href={`/work/${nextProject.slug}`}
        style={{ display: "block", position: "relative" }}
        data-cursor="NEXT"
      >
        <div style={{
          position: "relative",
          height: "60vh",
          minHeight: "400px",
          overflow: "hidden",
        }}>
          <div className="img-hover" style={{ position: "absolute", inset: 0, height: "100%" }}>
            <Image
              src={nextProject.heroImage}
              alt={`Next: ${nextProject.title}`}
              fill
              style={{ objectFit: "cover" }}
              loading="lazy"
              sizes="100vw"
            />
          </div>
          <div style={{
            position: "absolute",
            inset: 0,
            background: "rgba(10,10,9,0.6)",
          }} />
          <div style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            paddingInline: "var(--gutter)",
          }}>
            <p style={{
              fontSize: "9px",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "var(--bronze)",
              marginBottom: "16px",
            }}>
              Next Project
            </p>
            <h2 style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2rem, 5vw, 4.5rem)",
              fontWeight: 400,
              lineHeight: 1,
              letterSpacing: "-0.02em",
              color: "var(--text)",
              textTransform: "uppercase",
              marginBottom: "20px",
            }}>
              {nextProject.title}
            </h2>
            <span style={{
              fontSize: "11px",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "rgba(243,240,234,0.5)",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}>
              View Project →
            </span>
          </div>
        </div>
      </Link>

      <style>{`
        @media (max-width: 900px) {
          article [style*="1 / 8"],
          article [style*="1 / 10"],
          article [style*="4 / 13"],
          article [style*="9 / 13"] {
            grid-column: 1 / -1 !important;
          }
          article [style*="repeat(12"] {
            grid-template-columns: repeat(4, minmax(0, 1fr)) !important;
          }
          article [style*="1fr 1fr"],
          article [style*="2fr 3fr"] {
            grid-template-columns: 1fr !important;
          }
          article [style*="21/9"] {
            aspect-ratio: 16/9 !important;
          }
        }
      `}</style>
    </article>
  );
}
