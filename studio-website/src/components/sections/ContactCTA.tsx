"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { siteConfig } from "@/data/site";

gsap.registerPlugin(ScrollTrigger);

export default function ContactCTA() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        section.querySelectorAll(".cta-reveal"),
        { opacity: 0, y: 32 },
        {
          opacity: 1, y: 0, duration: 1, stagger: 0.12, ease: "power4.out",
          scrollTrigger: { trigger: section, start: "top 78%" },
        }
      );
      gsap.fromTo(
        ".cta-img",
        { scale: 1.06 },
        {
          scale: 1, duration: 1.6, ease: "power4.out",
          scrollTrigger: { trigger: ".cta-img", start: "top 80%" },
        }
      );
    }, sectionRef);
    return () => { try { ctx.revert(); } catch (_) {} };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="section-cta"
      style={{
        background: "var(--bg)",
        paddingBlock: "var(--space-lg)",
        paddingInline: "var(--gutter)",
        borderTop: "1px solid var(--border)",
      }}
    >
      <div style={{ maxWidth: "var(--max-w)", marginInline: "auto", width: "100%" }}>
        <div className="cta-12-grid">

          {/* LEFT: Text — cols 1-7 */}
          <div className="cta-col-text">
            <div className="cta-reveal" style={{
              display: "flex", alignItems: "center", gap: "12px",
              marginBottom: "clamp(24px, 3.5vw, 44px)",
            }}>
              <span style={{ width: "24px", height: "1px", background: "var(--bronze)" }} />
              <span style={{
                fontSize: "10px", letterSpacing: "0.28em",
                textTransform: "uppercase", color: "var(--bronze)",
              }}>
                Start a Project
              </span>
            </div>

            <h2 className="cta-reveal" style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(3rem, 7vw, 7.5rem)",
              fontWeight: 400,
              lineHeight: 0.92,
              letterSpacing: "-0.03em",
              color: "var(--text)",
              textTransform: "uppercase",
              marginBottom: "clamp(24px, 4vw, 48px)",
            }}>
              Let's Create<br />
              <span style={{ color: "var(--bronze)", fontStyle: "italic" }}>Together.</span>
            </h2>

            <p className="cta-reveal" style={{
              fontSize: "clamp(16px, 1.4vw, 20px)",
              color: "var(--muted)",
              lineHeight: 1.75,
              maxWidth: "480px",
              marginBottom: "clamp(32px, 5vw, 56px)",
              fontWeight: 400,
            }}>
              Collaborate with AfterBuild Studio to bring your bespoke residential interior,
              turnkey architecture, or luxury modular sanctuary to life.
            </p>

            <div className="cta-reveal" style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              flexWrap: "wrap",
            }}>
              <Link href="/contact" style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                padding: "16px 40px",
                background: "var(--bronze)",
                color: "#FAF8F5",
                fontSize: "13px",
                fontWeight: 700,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                transition: "all 0.3s ease",
                boxShadow: "0 0 25px rgba(158, 121, 72, 0.25)",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.background = "#141312";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 0 30px rgba(0, 0, 0, 0.2)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.background = "var(--bronze)";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 0 25px rgba(158, 121, 72, 0.25)";
              }}
              >
                Contact Us →
              </Link>

              <a
                href={`https://wa.me/${siteConfig.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "15px 36px",
                  background: "transparent",
                  color: "var(--text)",
                  fontSize: "13px",
                  fontWeight: 600,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  border: "1px solid rgba(158, 121, 72, 0.4)",
                  transition: "border-color 0.3s ease, color 0.3s ease, background 0.3s ease",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = "var(--bronze)";
                  (e.currentTarget as HTMLElement).style.color = "var(--bronze)";
                  (e.currentTarget as HTMLElement).style.background = "rgba(158, 121, 72, 0.08)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(158, 121, 72, 0.4)";
                  (e.currentTarget as HTMLElement).style.color = "var(--text)";
                  (e.currentTarget as HTMLElement).style.background = "transparent";
                }}
              >
                WhatsApp Direct ↗
              </a>
            </div>

            <p className="cta-reveal" style={{
              marginTop: "24px",
              fontSize: "12px",
              fontWeight: 600,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "var(--muted-dark)",
            }}>
              Indiranagar, Bangalore &bull; Pan-India Execution
            </p>
          </div>

          {/* RIGHT: Image — cols 9-12 */}
          <div className="cta-col-img">
            <div
              className="cta-img"
              style={{
                position: "relative",
                aspectRatio: "3/4",
                overflow: "hidden",
                border: "1px solid rgba(212, 178, 130, 0.2)",
              }}
            >
              <Image
                src="/images/projects/sbr-horizon/hero.jpg"
                alt="Start a project with AfterBuild Studio — Luxury Interior Living"
                fill
                style={{ objectFit: "cover" }}
                loading="lazy"
                sizes="(max-width: 900px) 100vw, 33vw"
              />
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          #section-cta [style*="1 / 8"] { grid-column: 1 / -1 !important; }
          #section-cta [style*="9 / 13"] { grid-column: 1 / -1 !important; margin-top: 32px; }
          #section-cta [style*="repeat(12"] {
            grid-template-columns: repeat(4, minmax(0, 1fr)) !important;
          }
        }
      `}</style>
    </section>
  );
}
