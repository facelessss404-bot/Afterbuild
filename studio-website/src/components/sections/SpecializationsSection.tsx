"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { services } from "@/data/services";

gsap.registerPlugin(ScrollTrigger);

export default function SpecializationsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        section.querySelectorAll(".spec-reveal"),
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.08,
          ease: "power4.out",
          scrollTrigger: { trigger: section, start: "top 78%" },
        }
      );

      gsap.fromTo(
        section.querySelectorAll(".spec-card"),
        { opacity: 0, y: 36 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.07,
          ease: "power4.out",
          scrollTrigger: { trigger: ".spec-grid", start: "top 82%" },
        }
      );
    }, sectionRef);

    return () => {
      try {
        ctx.revert();
      } catch (_) {}
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="specializations"
      style={{
        background: "var(--bg)",
        paddingBlock: "var(--space-xl)",
        paddingInline: "var(--gutter)",
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
        position: "relative",
      }}
    >
      <div style={{ maxWidth: "var(--max-w)", marginInline: "auto", width: "100%" }}>
        {/* Section Header */}
        <div
          className="spec-reveal"
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            marginBottom: "clamp(40px, 6vw, 72px)",
            gap: "24px",
            flexWrap: "wrap",
          }}
        >
          <div style={{ maxWidth: "720px" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                marginBottom: "clamp(12px, 2vw, 18px)",
              }}
            >
              <span style={{ width: "24px", height: "1px", background: "var(--bronze)", display: "block" }} />
              <span
                style={{
                  fontSize: "10px",
                  letterSpacing: "0.28em",
                  textTransform: "uppercase",
                  color: "var(--bronze)",
                  fontWeight: 600,
                }}
              >
                03 / Comprehensive Scope of Work
              </span>
            </div>

            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "var(--text-3xl)",
                fontWeight: 400,
                lineHeight: 1.05,
                letterSpacing: "-0.015em",
                color: "var(--text)",
                marginBottom: "16px",
              }}
            >
              What We Specialize In
            </h2>

            <p
              style={{
                fontSize: "var(--text-base)",
                color: "var(--muted)",
                lineHeight: 1.8,
                maxWidth: "640px",
              }}
            >
              From architectural blueprinting to bespoke interior joinery, AfterBuild Studio operates as an integrated spatial atelier. We bring design, structural engineering, craftsmanship, and single-point turnkey accountability to every square foot.
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "12px" }}>
            <div
              style={{
                padding: "8px 18px",
                borderRadius: "999px",
                border: "1px solid rgba(158, 121, 72, 0.3)",
                background: "rgba(158, 121, 72, 0.08)",
                fontSize: "11px",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "var(--bronze)",
                fontWeight: 600,
              }}
            >
              8 Core Disciplines &bull; 100% Turnkey Execution
            </div>

            <Link
              href="/services"
              style={{
                fontSize: "11px",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--text)",
                borderBottom: "1px solid var(--bronze)",
                paddingBottom: "3px",
                fontWeight: 600,
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                transition: "color 0.25s ease",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--bronze)")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--text)")}
            >
              <span>Explore Technical Specifications</span>
              <span>&rarr;</span>
            </Link>
          </div>
        </div>

        {/* 8-Card Specializations Grid */}
        <div
          className="spec-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(290px, 1fr))",
            gap: "24px",
          }}
        >
          {services.map((item, index) => (
            <div
              key={item.id}
              className="spec-card group"
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: "12px",
                padding: "clamp(24px, 3vw, 32px)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                position: "relative",
                transition: "transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.35s ease, border-color 0.35s ease",
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.03)",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.transform = "translateY(-6px)";
                el.style.borderColor = "rgba(158, 121, 72, 0.4)";
                el.style.boxShadow = "0 16px 40px rgba(0, 0, 0, 0.08), 0 0 20px rgba(158, 121, 72, 0.1)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.transform = "translateY(0)";
                el.style.borderColor = "var(--border)";
                el.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.03)";
              }}
            >
              <div>
                {/* Top Number & Tag */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: "18px",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "12px",
                      letterSpacing: "0.2em",
                      color: "var(--bronze)",
                      fontWeight: 700,
                    }}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span
                    style={{
                      fontSize: "9.5px",
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      color: "var(--muted-dark)",
                      background: "var(--surface-2)",
                      padding: "3px 10px",
                      borderRadius: "999px",
                    }}
                  >
                    Specialty
                  </span>
                </div>

                {/* Title */}
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(1.25rem, 1.8vw, 1.55rem)",
                    fontWeight: 400,
                    color: "var(--text)",
                    lineHeight: 1.25,
                    marginBottom: "12px",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {item.title}
                </h3>

                {/* Description */}
                <p
                  style={{
                    fontSize: "13.5px",
                    color: "var(--muted)",
                    lineHeight: 1.7,
                    marginBottom: "20px",
                  }}
                >
                  {item.description}
                </p>
              </div>

              {/* Scope deliverables bullets */}
              <div
                style={{
                  borderTop: "1px solid var(--border)",
                  paddingTop: "16px",
                  marginTop: "auto",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "6px",
                  }}
                >
                  {(item.deliverables || item.features || []).slice(0, 4).map((pill, pIdx) => (
                    <span
                      key={pIdx}
                      style={{
                        fontSize: "10.5px",
                        color: "var(--text-secondary)",
                        background: "var(--surface-2)",
                        padding: "4px 9px",
                        borderRadius: "4px",
                        fontWeight: 500,
                      }}
                    >
                      {pill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Note banner on Architecture & Solutions */}
        <div
          className="spec-reveal"
          style={{
            marginTop: "clamp(40px, 6vw, 64px)",
            padding: "clamp(24px, 3.5vw, 40px)",
            borderRadius: "12px",
            background: "var(--surface)",
            border: "1px solid var(--border)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "28px",
            flexWrap: "wrap",
            boxShadow: "0 8px 30px rgba(0, 0, 0, 0.04)",
          }}
        >
          <div style={{ maxWidth: "700px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
              <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "var(--bronze)" }} />
              <span
                style={{
                  fontSize: "10.5px",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "var(--bronze)",
                  fontWeight: 700,
                }}
              >
                Architectural Clarity &bull; Engineering Precision
              </span>
            </div>
            <h4
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.2rem, 2vw, 1.6rem)",
                fontWeight: 400,
                color: "var(--text)",
                marginBottom: "8px",
              }}
            >
              Need a full architectural consultation or complete turnkey proposal?
            </h4>
            <p style={{ fontSize: "13.5px", color: "var(--muted)", lineHeight: 1.6, margin: 0 }}>
              We handle every step: structural alterations, civil works, 3D architectural rendering, interior joinery, and electrical automation with on-site engineering supervision.
            </p>
          </div>

          <Link
            href="/contact"
            style={{
              padding: "14px 32px",
              background: "var(--bronze)",
              color: "#FAF8F5",
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              borderRadius: "999px",
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              transition: "transform 0.3s ease, background 0.3s ease",
              boxShadow: "0 4px 18px rgba(158, 121, 72, 0.28)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.transform = "scale(1.03)";
              (e.currentTarget as HTMLElement).style.background = "#846337";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.transform = "scale(1)";
              (e.currentTarget as HTMLElement).style.background = "var(--bronze)";
            }}
          >
            <span>Book Design Consultation</span>
            <span>&rarr;</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
