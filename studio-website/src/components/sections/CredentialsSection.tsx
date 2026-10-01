"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { stats } from "@/data/content";

gsap.registerPlugin(ScrollTrigger);

export default function CredentialsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        section.querySelectorAll(".cred-reveal"),
        { opacity: 0, y: 28 },
        {
          opacity: 1, y: 0, duration: 0.9, stagger: 0.1, ease: "power4.out",
          scrollTrigger: { trigger: section, start: "top 72%" },
        }
      );
      gsap.fromTo(
        ".cred-img",
        { clipPath: "inset(8% 8% 8% 8%)", scale: 1.06 },
        {
          clipPath: "inset(0% 0% 0% 0%)", scale: 1, duration: 1.5, ease: "power4.out",
          scrollTrigger: { trigger: ".cred-img", start: "top 80%" },
        }
      );
    }, sectionRef);
    return () => { try { ctx.revert(); } catch (_) {} };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="section-credentials"
      style={{
        background: "var(--surface-2, #161614)",
        paddingBlock: "var(--space-lg)",
        paddingInline: "var(--gutter)",
        borderTop: "1px solid var(--border)",
        overflow: "hidden",
      }}
    >
      <div style={{ maxWidth: "var(--max-w)", marginInline: "auto", width: "100%" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(12, minmax(0, 1fr))",
          gap: "var(--grid-gap)",
          alignItems: "center",
        }}>

          {/* LEFT: text — cols 1-6 */}
          <div style={{ gridColumn: "1 / 7" }}>
            <div className="cred-reveal" style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              marginBottom: "clamp(24px, 3vw, 40px)",
            }}>
              <span style={{ width: "24px", height: "1px", background: "var(--bronze)", display: "block" }} />
              <span style={{
                fontSize: "10px",
                letterSpacing: "0.28em",
                textTransform: "uppercase",
                color: "var(--bronze)",
              }}>
                Studio Credentials
              </span>
            </div>

            <h2 className="cred-reveal" style={{
              fontFamily: "var(--font-display)",
              fontSize: "var(--text-3xl)",
              fontWeight: 400,
              lineHeight: 1.05,
              letterSpacing: "-0.01em",
              color: "var(--text)",
              marginBottom: "clamp(20px, 3vw, 32px)",
            }}>
              Architecture,<br />
              <span style={{ color: "rgba(243,240,234,0.35)", fontStyle: "italic" }}>
                Interiors & Beyond.
              </span>
            </h2>

            <p className="cred-reveal" style={{
              fontSize: "var(--text-sm)",
              color: "var(--muted)",
              lineHeight: 1.8,
              maxWidth: "480px",
              marginBottom: "clamp(32px, 5vw, 56px)",
            }}>
              Our studio brings together architecture, interior design,
              and turnkey execution under one roof — delivering considered,
              complete spaces for discerning clients across India.
            </p>

            {/* Inline stat strip */}
            <div className="cred-reveal" style={{
              display: "flex",
              gap: "0",
              borderTop: "1px solid var(--border)",
              borderLeft: "1px solid var(--border)",
              flexWrap: "wrap",
            }}>
              {stats.slice(0, 3).map((stat, i) => (
                <div key={i} style={{
                  padding: "clamp(16px, 2.5vw, 28px) clamp(16px, 2.5vw, 32px)",
                  borderRight: "1px solid var(--border)",
                  borderBottom: "1px solid var(--border)",
                }}>
                  <span style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(1.8rem, 3vw, 2.5rem)",
                    fontWeight: 400,
                    color: "var(--text)",
                    display: "block",
                    lineHeight: 1,
                    marginBottom: "6px",
                  }}>
                    {stat.value}
                  </span>
                  <span style={{
                    fontSize: "9px",
                    letterSpacing: "0.25em",
                    textTransform: "uppercase",
                    color: "var(--bronze)",
                  }}>
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>

            <div className="cred-reveal" style={{ marginTop: "clamp(24px, 4vw, 40px)" }}>
              <Link href="/recognition" style={{
                fontSize: "11px",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--bronze)",
                borderBottom: "1px solid rgba(177,166,150,0.35)",
                paddingBottom: "2px",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
              }}>
                View Recognition →
              </Link>
            </div>
          </div>

          {/* RIGHT: editorial image composition — cols 7-12 */}
          <div style={{
            gridColumn: "7 / 13",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gridTemplateRows: "auto auto",
            gap: "clamp(8px, 1.2vw, 16px)",
          }}>
            {/* Tall image spanning 2 rows — left column */}
            <div
              className="cred-img"
              style={{
                gridRow: "1 / 3",
                position: "relative",
                aspectRatio: "3/5",
                overflow: "hidden",
              }}
            >
              <Image
                src="/images/projects/sbr-horizon/03.jpg"
                alt="Studio work"
                fill
                style={{ objectFit: "cover" }}
                loading="lazy"
              />
            </div>

            {/* Top right portrait */}
            <div
              className="cred-img"
              style={{
                position: "relative",
                aspectRatio: "3/4",
                overflow: "hidden",
              }}
            >
              <Image
                src="/images/projects/gk-gateway/05.jpg"
                alt="Studio work"
                fill
                style={{ objectFit: "cover" }}
                loading="lazy"
              />
            </div>

            {/* Bottom right portrait */}
            <div
              className="cred-img"
              style={{
                position: "relative",
                aspectRatio: "3/4",
                overflow: "hidden",
                marginTop: "clamp(16px, 2.5vw, 32px)",
              }}
            >
              <Image
                src="/images/projects/prestige-avalon-park/01.jpg"
                alt="Studio work"
                fill
                style={{ objectFit: "cover" }}
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          #section-credentials [style*="1 / 7"] { grid-column: 1 / -1 !important; }
          #section-credentials [style*="7 / 13"] { grid-column: 1 / -1 !important; }
          #section-credentials [style*="repeat(12"] {
            grid-template-columns: repeat(4, minmax(0, 1fr)) !important;
          }
        }
      `}</style>
    </section>
  );
}
