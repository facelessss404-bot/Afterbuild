"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { siteConfig } from "@/data/site";
import { projects } from "@/data/projects";

gsap.registerPlugin(ScrollTrigger);

const feedImages = [
  projects[0]?.images[1],
  projects[2]?.images[3],
  projects[4]?.images[2],
  projects[1]?.images[1],
  projects[0]?.images[5],
  projects[2]?.images[7],
].filter(Boolean) as string[];

export default function SocialSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      section.querySelectorAll(".social-img").forEach((el) => {
        gsap.fromTo(el,
          { opacity: 0, scale: 1.04 },
          {
            opacity: 1, scale: 1, duration: 0.7, ease: "power4.out",
            scrollTrigger: { trigger: el, start: "top 85%" },
          }
        );
      });
    }, sectionRef);

    return () => { try { ctx.revert(); } catch (_) {} };
  }, []);

  const handle = siteConfig.instagram.split("/").pop() || "ideaseternal";

  return (
    <section
      ref={sectionRef}
      id="section-social"
      style={{
        background: "var(--bg)",
        paddingBlock: "var(--space-md)",
        paddingInline: "var(--gutter)",
        borderTop: "1px solid var(--border)",
      }}
    >
      <div style={{ maxWidth: "var(--max-w)", marginInline: "auto", width: "100%" }}>

        {/* Header row */}
        <div style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          marginBottom: "clamp(24px, 4vw, 48px)",
          gap: "16px",
          flexWrap: "wrap",
        }}>
          <div>
            <div style={{
              display: "flex", alignItems: "center", gap: "12px",
              marginBottom: "clamp(10px, 1.5vw, 16px)",
            }}>
              <span style={{ width: "24px", height: "1px", background: "var(--bronze)" }} />
              <span style={{
                fontSize: "10px", letterSpacing: "0.28em",
                textTransform: "uppercase", color: "var(--bronze)",
              }}>
                Follow the Journey
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
              @{handle}
            </h2>
          </div>

          <a
            href={siteConfig.instagram}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              fontSize: "11px",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--muted)",
              border: "1px solid var(--border)",
              padding: "12px 24px",
              transition: "color 0.3s ease, border-color 0.3s ease",
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.color = "var(--text)";
              (e.currentTarget as HTMLElement).style.borderColor = "var(--border-light)";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.color = "var(--muted)";
              (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
            }}
          >
            View on Instagram ↗
          </a>
        </div>

        {/* Image grid — asymmetric editorial */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(12, minmax(0, 1fr))",
          gap: "var(--grid-gap)",
        }}>
          {/* Large left image — col 1-5, 2 rows tall */}
          {feedImages[0] && (
            <a
              href={siteConfig.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="social-img img-hover"
              data-cursor="VIEW"
              style={{
                gridColumn: "1 / 6",
                gridRow: "1 / 3",
                position: "relative",
                aspectRatio: "3/4",
                overflow: "hidden",
                display: "block",
              }}
            >
              <Image src={feedImages[0]} alt="Studio Instagram" fill style={{ objectFit: "cover" }} loading="lazy" sizes="40vw" />
              <div style={{
                position: "absolute", inset: 0,
                background: "rgba(0,0,0,0)",
                transition: "background 0.4s ease",
              }}
              onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = "rgba(10,10,9,0.3)")}
              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = "rgba(0,0,0,0)")}
              />
            </a>
          )}

          {/* 4 small squares — cols 6-12 */}
          {feedImages.slice(1, 5).map((img, i) => (
            <a
              key={i}
              href={siteConfig.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="social-img img-hover"
              data-cursor="VIEW"
              style={{
                gridColumn: i % 2 === 0 ? "6 / 9" : "9 / 13",
                position: "relative",
                aspectRatio: "1/1",
                overflow: "hidden",
                display: "block",
              }}
            >
              <Image src={img} alt={`Studio work ${i + 2}`} fill style={{ objectFit: "cover" }} loading="lazy" sizes="33vw" />
            </a>
          ))}

          {/* Bottom wide — col 6-12 full */}
          {feedImages[5] && (
            <a
              href={siteConfig.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="social-img img-hover"
              data-cursor="VIEW"
              style={{
                gridColumn: "6 / 13",
                position: "relative",
                aspectRatio: "21/9",
                overflow: "hidden",
                display: "block",
              }}
            >
              <Image src={feedImages[5]} alt="Studio Instagram" fill style={{ objectFit: "cover" }} loading="lazy" sizes="60vw" />
            </a>
          )}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #section-social .social-img[style*="1 / 6"] {
            grid-column: 1 / -1 !important;
            grid-row: auto !important;
          }
          #section-social .social-img[style*="6 / 9"],
          #section-social .social-img[style*="9 / 13"] {
            grid-column: span 2 !important;
          }
          #section-social .social-img[style*="6 / 13"] {
            grid-column: 1 / -1 !important;
          }
          #section-social [style*="repeat(12"] {
            grid-template-columns: repeat(4, minmax(0, 1fr)) !important;
          }
        }
      `}</style>
    </section>
  );
}
