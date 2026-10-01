"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { siteConfig } from "@/data/site";
import { stats, timeline, philosophyPillars, team } from "@/data/content";

gsap.registerPlugin(ScrollTrigger);

export default function StudioPage() {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const page = pageRef.current;
    if (!page) return;

    const ctx = gsap.context(() => {
      // Hero text reveal
      gsap.fromTo(".st-hero-line",
        { yPercent: 110 },
        { yPercent: 0, duration: 1.1, ease: "power4.out", stagger: 0.1, delay: 0.5 }
      );

      // Image reveals on scroll
      page.querySelectorAll(".st-img-reveal").forEach((el) => {
        gsap.fromTo(el,
          { clipPath: "inset(8% 8% 8% 8%)", scale: 1.06 },
          {
            clipPath: "inset(0% 0% 0% 0%)", scale: 1, duration: 1.4, ease: "power4.out",
            scrollTrigger: { trigger: el, start: "top 82%" },
          }
        );
      });

      // Text blocks
      page.querySelectorAll(".st-text-reveal").forEach((el) => {
        gsap.fromTo(el,
          { opacity: 0, y: 28 },
          {
            opacity: 1, y: 0, duration: 0.9, ease: "power4.out",
            scrollTrigger: { trigger: el, start: "top 85%" },
          }
        );
      });

      // Timeline items
      page.querySelectorAll(".st-timeline-item").forEach((el, i) => {
        gsap.fromTo(el,
          { opacity: 0, x: i % 2 === 0 ? -24 : 24 },
          {
            opacity: 1, x: 0, duration: 0.8, ease: "power4.out",
            scrollTrigger: { trigger: el, start: "top 85%" },
          }
        );
      });
    }, pageRef);

    return () => { try { ctx.revert(); } catch (_) {} };
  }, []);

  const founder = team[0];

  return (
    <div ref={pageRef} style={{ background: "var(--bg)", color: "var(--text)", minHeight: "100vh" }}>

      {/* ── 01. HERO ── */}
      <section style={{
        paddingTop: "clamp(100px, 14vh, 160px)",
        paddingBottom: "var(--space-md)",
        paddingInline: "var(--gutter)",
        borderBottom: "1px solid var(--border)",
      }}>
        <div style={{ maxWidth: "var(--max-w)", marginInline: "auto", width: "100%" }}>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(12, minmax(0, 1fr))",
            gap: "var(--grid-gap)",
            alignItems: "center",
          }}>
            {/* Text — left 6 cols */}
            <div style={{ gridColumn: "1 / 7" }}>
              <div style={{
                display: "flex", alignItems: "center", gap: "12px",
                marginBottom: "clamp(24px, 4vw, 48px)",
              }}>
                <span style={{ width: "24px", height: "1px", background: "var(--bronze)" }} />
                <span style={{ fontSize: "10px", letterSpacing: "0.28em", textTransform: "uppercase", color: "var(--bronze)" }}>
                  About the Studio
                </span>
              </div>

              <h1 style={{ overflow: "hidden", marginBottom: "clamp(24px, 4vw, 48px)" }}>
                <span style={{ display: "block", overflow: "hidden" }}>
                  <span className="st-hero-line" style={{
                    display: "block",
                    fontFamily: "var(--font-display)",
                    fontSize: "var(--text-4xl)",
                    fontWeight: 400,
                    lineHeight: 0.93,
                    letterSpacing: "-0.025em",
                    textTransform: "uppercase",
                  }}>
                    Our
                  </span>
                </span>
                <span style={{ display: "block", overflow: "hidden" }}>
                  <span className="st-hero-line" style={{
                    display: "block",
                    fontFamily: "var(--font-display)",
                    fontSize: "var(--text-4xl)",
                    fontWeight: 400,
                    lineHeight: 0.93,
                    letterSpacing: "-0.025em",
                    textTransform: "uppercase",
                    color: "rgba(243,240,234,0.3)",
                    fontStyle: "italic",
                  }}>
                    Story
                  </span>
                </span>
              </h1>

              <p className="st-text-reveal" style={{
                fontSize: "var(--text-base)",
                color: "var(--muted)",
                lineHeight: 1.8,
                maxWidth: "480px",
                marginBottom: "clamp(24px, 4vw, 40px)",
              }}>
                {siteConfig.name} is a premier interior design and architecture studio
                based in Indiranagar, {siteConfig.address.city}. Our journey began in May 2023,
                and since then we have successfully completed 160+ residential and commercial
                projects — earning our clients&apos; trust through quality craftsmanship, thoughtful
                design, and reliable execution.
              </p>

              {/* Quick metrics */}
              <div className="st-text-reveal" style={{
                display: "flex",
                gap: "32px",
                flexWrap: "wrap",
              }}>
                {[
                  { value: "160+", label: "Projects" },
                  { value: "3+", label: "Years" },
                  { value: "75+", label: "Craftsmen" },
                ].map((m, i) => (
                  <div key={i}>
                    <span style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "clamp(1.5rem, 2.5vw, 2.2rem)",
                      fontWeight: 400,
                      color: "var(--text)",
                      display: "block",
                      lineHeight: 1,
                      marginBottom: "4px",
                    }}>
                      {m.value}
                    </span>
                    <span style={{
                      fontSize: "9px",
                      letterSpacing: "0.22em",
                      textTransform: "uppercase",
                      color: "var(--bronze)",
                    }}>
                      {m.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Founder Image — right 5 cols */}
            <div style={{ gridColumn: "8 / 13" }}>
              <div className="st-img-reveal" style={{
                position: "relative",
                aspectRatio: "4/5",
                overflow: "hidden",
              }}>
                <Image
                  src="/images/founder.jpg"
                  alt="Mohammed Farmaan Azam K — Founder & Director, AfterBuild Studio"
                  fill
                  priority
                  style={{ objectFit: "cover", objectPosition: "center top" }}
                  sizes="(max-width: 900px) 100vw, 40vw"
                />
                {/* Founder label overlay */}
                <div style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: "clamp(16px, 2.5vw, 24px)",
                  background: "linear-gradient(to top, rgba(10,10,10,0.85) 0%, transparent 100%)",
                }}>
                  <p style={{
                    fontSize: "9px",
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    color: "var(--bronze)",
                    marginBottom: "4px",
                  }}>
                    Founder & Director
                  </p>
                  <p style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(0.9rem, 1.4vw, 1.1rem)",
                    fontWeight: 400,
                    color: "var(--text)",
                    letterSpacing: "0.01em",
                  }}>
                    Mohammed Farmaan Azam K
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 02. PHILOSOPHY STATEMENT ── */}
      <section style={{
        paddingBlock: "var(--space-md)",
        paddingInline: "var(--gutter)",
        background: "var(--surface)",
        borderBottom: "1px solid var(--border)",
      }}>
        <div style={{ maxWidth: "var(--max-w)", marginInline: "auto", width: "100%" }}>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(12, minmax(0, 1fr))",
            gap: "var(--grid-gap)",
          }}>
            <div style={{ gridColumn: "1 / 3" }}>
              <span className="st-text-reveal" style={{
                fontSize: "10px", letterSpacing: "0.28em",
                textTransform: "uppercase", color: "var(--bronze)",
                display: "block", paddingTop: "8px",
              }}>
                Philosophy
              </span>
            </div>
            <div style={{ gridColumn: "3 / 13" }}>
              <blockquote className="st-text-reveal" style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.4rem, 3vw, 2.8rem)",
                fontWeight: 400,
                lineHeight: 1.35,
                color: "var(--text)",
                fontStyle: "italic",
                letterSpacing: "-0.01em",
                borderLeft: "none",
                margin: 0,
                padding: 0,
              }}>
                &ldquo;A well-designed space should feel effortless. We believe interior design
                begins long before choosing colours, finishes or furniture. It begins with
                understanding how a space should function, flow and feel.&rdquo;
              </blockquote>
              <div className="st-text-reveal" style={{
                marginTop: "clamp(20px, 3vw, 32px)",
                display: "flex",
                alignItems: "center",
                gap: "16px",
              }}>
                <span style={{ width: "32px", height: "1px", background: "var(--bronze)" }} />
                <span style={{
                  fontSize: "10px",
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: "var(--muted-dark)",
                }}>
                  Mohammed Farmaan Azam K — Founder & Director
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 03. THREE PILLARS / WHY US ── */}
      <section style={{
        paddingBlock: "var(--space-md)",
        paddingInline: "var(--gutter)",
        borderBottom: "1px solid var(--border)",
      }}>
        <div style={{ maxWidth: "var(--max-w)", marginInline: "auto", width: "100%" }}>
          <div className="st-text-reveal" style={{ marginBottom: "clamp(32px, 5vw, 64px)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
              <span style={{ width: "24px", height: "1px", background: "var(--bronze)" }} />
              <span style={{ fontSize: "10px", letterSpacing: "0.28em", textTransform: "uppercase", color: "var(--bronze)" }}>
                Why Choose Us
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
              Our Core Commitments
            </h2>
          </div>

          {/* 3 pillars */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(12, minmax(0, 1fr))",
            gap: "var(--grid-gap)",
          }}>
            {philosophyPillars.map((pillar, i) => (
              <div key={pillar.id} style={{
                gridColumn: i === 0 ? "1 / 5" : i === 1 ? "5 / 9" : "9 / 13",
              }}>
                <div className="st-img-reveal" style={{
                  position: "relative",
                  aspectRatio: "3/4",
                  overflow: "hidden",
                  marginBottom: "clamp(16px, 2.5vw, 24px)",
                }}>
                  <Image src={pillar.image} alt={pillar.title}
                    fill style={{ objectFit: "cover" }} loading="lazy"
                    sizes="(max-width: 900px) 100vw, 33vw"
                  />
                  <div style={{
                    position: "absolute",
                    top: "16px",
                    left: "16px",
                    fontSize: "10px",
                    letterSpacing: "0.18em",
                    color: "rgba(243,240,234,0.5)",
                  }}>
                    {pillar.number}
                  </div>
                </div>

                <h3 className="st-text-reveal" style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(1.1rem, 1.8vw, 1.5rem)",
                  fontWeight: 400,
                  color: "var(--text)",
                  marginBottom: "10px",
                  letterSpacing: "-0.005em",
                }}>
                  {pillar.title.replace("\n", " ")}
                </h3>
                <p className="st-text-reveal" style={{
                  fontSize: "13px",
                  color: "var(--muted)",
                  lineHeight: 1.7,
                }}>
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 04. METRICS ── */}
      <section style={{
        borderBottom: "1px solid var(--border)",
        background: "var(--surface)",
      }}>
        <div style={{
          maxWidth: "var(--max-w)",
          marginInline: "auto",
          paddingInline: "var(--gutter)",
        }}>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
          }}>
            {stats.map((stat, i) => (
              <div key={i} className="st-text-reveal" style={{
                padding: "clamp(32px, 5vw, 72px) clamp(20px, 3vw, 40px)",
                borderRight: i < stats.length - 1 ? "1px solid var(--border)" : "none",
              }}>
                <span style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(2.8rem, 5vw, 5rem)",
                  fontWeight: 400,
                  lineHeight: 1,
                  color: "var(--text)",
                  display: "block",
                  marginBottom: "10px",
                }}>
                  {stat.value}
                </span>
                <span style={{
                  fontSize: "10px",
                  letterSpacing: "0.25em",
                  textTransform: "uppercase",
                  color: "var(--bronze)",
                  display: "block",
                  marginBottom: "6px",
                }}>
                  {stat.label}
                </span>
                <span style={{ fontSize: "12px", color: "var(--muted-dark)" }}>
                  {stat.description}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 05. FOUNDER SECTION ── */}
      {founder && (
        <section style={{
          paddingBlock: "var(--space-md)",
          paddingInline: "var(--gutter)",
          borderBottom: "1px solid var(--border)",
        }}>
          <div style={{ maxWidth: "var(--max-w)", marginInline: "auto", width: "100%" }}>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(12, minmax(0, 1fr))",
              gap: "var(--grid-gap)",
              alignItems: "start",
            }}>
              {/* Image — left 5 cols */}
              <div style={{ gridColumn: "1 / 6" }}>
                <div className="st-img-reveal" style={{
                  position: "relative",
                  aspectRatio: "3/4",
                  overflow: "hidden",
                }}>
                  <Image
                    src="/images/founder.jpg"
                    alt="Mohammed Farmaan Azam K — Founder & Director, AfterBuild Studio"
                    fill
                    style={{ objectFit: "cover", objectPosition: "center top" }}
                    loading="lazy"
                    sizes="(max-width: 900px) 100vw, 42vw"
                  />
                </div>
              </div>

              {/* Content — right 7 cols */}
              <div style={{ gridColumn: "6 / 13", paddingLeft: "clamp(0px, 3vw, 40px)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "clamp(20px, 3vw, 36px)" }}>
                  <span style={{ width: "24px", height: "1px", background: "var(--bronze)" }} />
                  <span style={{ fontSize: "10px", letterSpacing: "0.28em", textTransform: "uppercase", color: "var(--bronze)" }}>
                    Meet the Founder
                  </span>
                </div>

                <h2 className="st-text-reveal" style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "var(--text-3xl)",
                  fontWeight: 400,
                  lineHeight: 1.05,
                  letterSpacing: "-0.01em",
                  color: "var(--text)",
                  marginBottom: "8px",
                }}>
                  {founder.name}
                </h2>
                <p className="st-text-reveal" style={{
                  fontSize: "10px",
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: "var(--bronze)",
                  marginBottom: "clamp(20px, 3vw, 32px)",
                }}>
                  {founder.role}
                </p>

                <p className="st-text-reveal" style={{
                  fontSize: "var(--text-base)",
                  color: "var(--muted)",
                  lineHeight: 1.85,
                  marginBottom: "clamp(16px, 2.5vw, 24px)",
                }}>
                  {founder.bio}
                </p>

                <p className="st-text-reveal" style={{
                  fontSize: "var(--text-sm)",
                  color: "var(--muted)",
                  lineHeight: 1.85,
                  marginBottom: "clamp(24px, 4vw, 48px)",
                }}>
                  These experiences shaped a fundamental belief that continues to guide his work today:{" "}
                  <em style={{ color: "var(--text)", fontStyle: "italic" }}>
                    Great spaces begin with understanding people.
                  </em>
                </p>

                {/* Founder note */}
                <div className="st-text-reveal" style={{
                  borderLeft: "2px solid var(--bronze)",
                  paddingLeft: "clamp(16px, 2.5vw, 24px)",
                  marginBottom: "clamp(24px, 4vw, 40px)",
                }}>
                  <p style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(1rem, 1.6vw, 1.25rem)",
                    fontWeight: 400,
                    fontStyle: "italic",
                    color: "var(--text)",
                    lineHeight: 1.6,
                    marginBottom: "12px",
                  }}>
                    &ldquo;A well-designed space should feel effortless.&rdquo;
                  </p>
                  <p style={{
                    fontSize: "12px",
                    color: "var(--muted)",
                    lineHeight: 1.7,
                  }}>
                    Your home is one of the most personal spaces you will ever create.
                    It should reflect your lifestyle, your personality and the way you want
                    to experience everyday life. Our approach is rooted in thoughtful space
                    planning, practical design and attention to detail.
                  </p>
                </div>

                <div className="st-text-reveal" style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                }}>
                  <span style={{ width: "32px", height: "1px", background: "var(--bronze)" }} />
                  <span style={{
                    fontSize: "10px",
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    color: "var(--muted-dark)",
                  }}>
                    {siteConfig.name}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── 06. TIMELINE / JOURNEY ── */}
      <section style={{
        paddingBlock: "var(--space-md)",
        paddingInline: "var(--gutter)",
        borderBottom: "1px solid var(--border)",
        background: "var(--surface)",
      }}>
        <div style={{ maxWidth: "var(--max-w)", marginInline: "auto", width: "100%" }}>
          <div className="st-text-reveal" style={{
            display: "flex", alignItems: "center", gap: "12px",
            marginBottom: "clamp(40px, 6vw, 80px)",
          }}>
            <span style={{ width: "24px", height: "1px", background: "var(--bronze)" }} />
            <span style={{ fontSize: "10px", letterSpacing: "0.28em", textTransform: "uppercase", color: "var(--bronze)" }}>
              Studio Journey
            </span>
          </div>

          {/* Timeline — alternating editorial */}
          <div style={{ position: "relative" }}>
            {/* Center spine */}
            <div style={{
              position: "absolute",
              left: "50%",
              top: 0,
              bottom: 0,
              width: "1px",
              background: "var(--border)",
              transform: "translateX(-50%)",
              display: "none",
            }} className="st-timeline-spine" />

            <div style={{
              display: "flex",
              flexDirection: "column",
              gap: "clamp(32px, 5vw, 64px)",
            }}>
              {timeline.map((event, idx) => {
                const isEven = idx % 2 === 0;
                return (
                  <div key={idx} className="st-timeline-item" style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(12, minmax(0, 1fr))",
                    gap: "var(--grid-gap)",
                    alignItems: "center",
                  }}>
                    {/* Year */}
                    <div style={{
                      gridColumn: isEven ? "1 / 3" : "11 / 13",
                      textAlign: isEven ? "left" : "right",
                      order: isEven ? 0 : 2,
                    }}>
                      <span style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "clamp(1.5rem, 2.5vw, 2.2rem)",
                        fontWeight: 400,
                        color: "var(--bronze)",
                        display: "block",
                      }}>
                        {event.year}
                      </span>
                    </div>

                    {/* Center dot */}
                    <div style={{
                      gridColumn: isEven ? "3 / 5" : "9 / 11",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      order: 1,
                    }}>
                      <div style={{
                        width: "8px",
                        height: "8px",
                        borderRadius: "50%",
                        background: "var(--bronze)",
                        flexShrink: 0,
                      }} />
                    </div>

                    {/* Content */}
                    <div style={{
                      gridColumn: isEven ? "5 / 13" : "1 / 9",
                      order: isEven ? 2 : 0,
                    }}>
                      <div style={{
                        padding: "clamp(20px, 3vw, 32px)",
                        border: "1px solid var(--border)",
                        background: "var(--bg)",
                      }}>
                        <h3 style={{
                          fontSize: "11px",
                          fontWeight: 500,
                          letterSpacing: "0.18em",
                          textTransform: "uppercase",
                          color: "var(--text)",
                          marginBottom: "10px",
                        }}>
                          {event.title}
                        </h3>
                        <p style={{
                          fontSize: "13px",
                          color: "var(--muted)",
                          lineHeight: 1.7,
                        }}>
                          {event.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── 07. MISSION & VISION ── */}
      <section style={{
        paddingBlock: "var(--space-md)",
        paddingInline: "var(--gutter)",
        borderBottom: "1px solid var(--border)",
      }}>
        <div style={{ maxWidth: "var(--max-w)", marginInline: "auto", width: "100%" }}>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(12, minmax(0, 1fr))",
            gap: "var(--grid-gap)",
          }}>
            {/* Mission */}
            <div style={{ gridColumn: "1 / 7" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px" }}>
                <span style={{ width: "24px", height: "1px", background: "var(--bronze)" }} />
                <span style={{ fontSize: "10px", letterSpacing: "0.28em", textTransform: "uppercase", color: "var(--bronze)" }}>
                  Our Mission
                </span>
              </div>
              <p className="st-text-reveal" style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.1rem, 2vw, 1.6rem)",
                fontWeight: 400,
                lineHeight: 1.5,
                color: "var(--text)",
                fontStyle: "italic",
              }}>
                To deliver exceptional interior and architectural solutions that combine
                aesthetics, functionality, durability, and affordability while building
                lasting relationships with our clients.
              </p>
            </div>

            {/* Vision */}
            <div style={{ gridColumn: "7 / 13", paddingLeft: "clamp(0px, 3vw, 40px)", borderLeft: "1px solid var(--border)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px" }}>
                <span style={{ width: "24px", height: "1px", background: "var(--bronze)" }} />
                <span style={{ fontSize: "10px", letterSpacing: "0.28em", textTransform: "uppercase", color: "var(--bronze)" }}>
                  Our Vision
                </span>
              </div>
              <p className="st-text-reveal" style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.1rem, 2vw, 1.6rem)",
                fontWeight: 400,
                lineHeight: 1.5,
                color: "var(--text)",
                fontStyle: "italic",
              }}>
                To become a trusted name in the interior design and architecture industry,
                recognised for innovative designs, dependable service, superior craftsmanship,
                and customer satisfaction.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 08. CTA ── */}
      <section style={{
        paddingBlock: "var(--space-md)",
        paddingInline: "var(--gutter)",
      }}>
        <div style={{ maxWidth: "var(--max-w)", marginInline: "auto", width: "100%" }}>
          <div className="st-text-reveal" style={{ textAlign: "center" }}>
            <h2 style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.5rem, 6vw, 6rem)",
              fontWeight: 400,
              lineHeight: 0.92,
              letterSpacing: "-0.03em",
              color: "var(--text)",
              textTransform: "uppercase",
              marginBottom: "clamp(24px, 4vw, 40px)",
            }}>
              Let&apos;s Build<br />
              <span style={{ color: "rgba(243,240,234,0.3)", fontStyle: "italic" }}>Something Beautiful</span>
            </h2>

            <p style={{
              fontSize: "var(--text-base)",
              color: "var(--muted)",
              lineHeight: 1.8,
              maxWidth: "540px",
              marginInline: "auto",
              marginBottom: "clamp(24px, 4vw, 40px)",
            }}>
              Whether you&apos;re planning a new home, renovating an existing space, or designing
              a commercial property, we&apos;re here to bring your vision to life.
            </p>

            <div style={{ display: "flex", justifyContent: "center", gap: "16px", flexWrap: "wrap" }}>
              <Link href="/work" style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                padding: "14px 36px",
                background: "var(--text)",
                color: "var(--bg)",
                fontSize: "11px",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                transition: "background 0.3s ease",
              }}
              onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = "var(--bronze)")}
              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = "var(--text)")}
              >
                Explore Work →
              </Link>
              <Link href="/contact" style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                padding: "13px 35px",
                background: "transparent",
                color: "var(--text)",
                fontSize: "11px",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                border: "1px solid var(--border-light)",
                transition: "border-color 0.3s ease",
              }}
              onMouseEnter={e => ((e.currentTarget as HTMLElement).style.borderColor = "var(--bronze)")}
              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.borderColor = "var(--border-light)")}
              >
                Contact Studio
              </Link>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 900px) {
          [style*="1 / 7"],
          [style*="8 / 13"],
          [style*="1 / 3"],
          [style*="3 / 13"],
          [style*="1 / 5"],
          [style*="1 / 6"],
          [style*="6 / 13"],
          [style*="5 / 9"],
          [style*="9 / 13"],
          [style*="1 / 7"],
          [style*="7 / 13"] {
            grid-column: 1 / -1 !important;
          }
          [style*="repeat(4, 1fr)"] {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          [style*="borderLeft: \"1px solid var(--border)\""] {
            border-left: none !important;
            padding-left: 0 !important;
          }
        }
        @media (min-width: 768px) {
          .st-timeline-spine { display: block !important; }
        }
        @media (max-width: 767px) {
          .st-timeline-item > div:nth-child(1),
          .st-timeline-item > div:nth-child(2) {
            display: none !important;
          }
          .st-timeline-item > div:nth-child(3) {
            grid-column: 1 / -1 !important;
            order: 0 !important;
          }
        }
      `}</style>
    </div>
  );
}
