"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { services } from "@/data/services";
import { projects } from "@/data/projects";
import { siteConfig } from "@/data/site";

const workflowSteps = [
  {
    step: "01",
    phase: "Discovery & Site Feasibility",
    duration: "Week 1 – 2",
    description:
      "In-depth analysis of site topography, solar orientation, microclimate, and spatial ergonomics tailored around your lifestyle requirements.",
    deliverables: ["Site Microclimate Study", "Programmatic Matrix", "Feasibility Dossier"],
  },
  {
    step: "02",
    phase: "3D Spatial & Material Curation",
    duration: "Week 3 – 5",
    description:
      "Computational massing, photorealistic 3D visualization, and physical material sampling — feeling the raw stones, veneers, and fabrics under natural light.",
    deliverables: ["Photorealistic 3D Renders", "Material Moodboard", "Space Flow Schemes"],
  },
  {
    step: "03",
    phase: "Engineering & Working Drawings",
    duration: "Week 6 – 8",
    description:
      "Precision BIM detailing, MEP coordination, structural sign-offs, and millimeter-accurate shop drawings for custom millwork.",
    deliverables: ["CAD Working Blueprints", "MEP & Electrical Circuits", "Full Itemized BOQ"],
  },
  {
    step: "04",
    phase: "Precision Fabrication & Fitout",
    duration: "Week 9 – 16",
    description:
      "On-site civil execution and off-site joinery fabrication by master craftsmen, with rigorous weekly milestone audits.",
    deliverables: ["Bespoke Millwork Assembly", "Quality Milestone Audits", "Weekly Progress Logs"],
  },
  {
    step: "05",
    phase: "White-Glove Handover",
    duration: "Final Week",
    description:
      "Comprehensive snagging audits, deep cleaning, architectural styling, and formal handover with warranty dossier and maintenance manual.",
    deliverables: ["Snag-Free As-Built Space", "Warranty Portfolio", "Operations & Care Manual"],
  },
];

const faqs = [
  {
    q: "What is the typical timeline for an architectural or full interior project?",
    a: "Luxury residential interiors typically span 60 to 90 working days from final design freeze. Complete ground-up villa architecture generally spans 9 to 14 months depending on structural scale, municipal approvals, and bespoke finishes.",
  },
  {
    q: "Do you provide turnkey execution or purely design consultancy?",
    a: "We offer both models. Our Turnkey Delivery provides a single point of accountability covering end-to-end design, procurement, artisan execution, and handover with fixed budgets. Alternatively, our Design Consultancy delivers complete drawing packages and site supervision.",
  },
  {
    q: "How do you guarantee budget integrity and prevent cost overruns?",
    a: "Prior to physical work beginning, we lock an exhaustive Bill of Quantities (BOQ) with fixed line-item pricing and pre-approved material schedules. Any design adjustments during execution require formal client sign-off.",
  },
  {
    q: "Do you undertake projects pan-India or outside Bangalore?",
    a: "Yes. While headquartered in Bangalore, our studio has executed luxury residences across Karnataka, Andhra Pradesh, Tamil Nadu, and West Bengal through our digital BIM pipelines and weekly on-site inspection protocol.",
  },
  {
    q: "How closely will the executed space match the initial 3D designs?",
    a: "We produce 1:1 photorealistic renders using physically based materials and actual vendor catalog selections. What you approve in visualization is what is manufactured, assembled, and unveiled on site.",
  },
];

export default function ServicesPage() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const activeService = services[activeIdx] || services[0];

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)", color: "var(--text)" }}>

      {/* ── 01. HERO HEADER ── */}
      <div style={{
        paddingTop: "clamp(100px, 14vh, 160px)",
        paddingBottom: "var(--space-md)",
        paddingInline: "var(--gutter)",
        borderBottom: "1px solid var(--border)",
      }}>
        <div style={{ maxWidth: "var(--max-w)", marginInline: "auto", width: "100%" }}>
        <div className="svcp-12-grid" style={{ alignItems: "end" }}>
            <div className="svcp-hero-title">
              <div style={{
                display: "flex", alignItems: "center", gap: "12px",
                marginBottom: "clamp(20px, 3vw, 36px)",
              }}>
                <span style={{ width: "24px", height: "1px", background: "var(--bronze)" }} />
                <span style={{ fontSize: "10px", letterSpacing: "0.28em", textTransform: "uppercase", color: "var(--bronze)" }}>
                  02 / Services & Methodology
                </span>
              </div>

              <h1 style={{
                fontFamily: "var(--font-display)",
                fontSize: "var(--text-4xl)",
                fontWeight: 400,
                lineHeight: 0.93,
                letterSpacing: "-0.025em",
                color: "var(--text)",
                textTransform: "uppercase",
              }}>
                Spaces<br />
                <span style={{ color: "rgba(243,240,234,0.3)", fontStyle: "italic" }}>We Create.</span>
              </h1>
            </div>

            <div className="svcp-hero-desc" style={{ alignSelf: "end" }}>
              <p style={{
                fontSize: "var(--text-sm)",
                color: "var(--muted)",
                lineHeight: 1.75,
              }}>
                End-to-end architectural and interior spectrum — from initial
                computational sketches to precision turnkey execution.
              </p>

              <div style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "8px",
                marginTop: "20px",
              }}>
                {["5 Disciplines", "100% Turnkey", "Pan-India"].map((tag) => (
                  <span key={tag} style={{
                    fontSize: "9px",
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: "var(--muted-dark)",
                    border: "1px solid var(--border)",
                    padding: "6px 14px",
                  }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── 02. SERVICES ACCORDION ── */}
      <div style={{
        paddingBlock: "var(--space-md)",
        paddingInline: "var(--gutter)",
        borderBottom: "1px solid var(--border)",
      }}>
        <div style={{ maxWidth: "var(--max-w)", marginInline: "auto", width: "100%" }}>
          <div className="svcp-12-grid" style={{ alignItems: "start" }}>
            {/* Left: Sticky image */}
            <div
            className="svcp-img-col"
            >
              <div style={{
                position: "relative",
                aspectRatio: "3/4",
                overflow: "hidden",
                background: "var(--surface)",
              }}>
                {services.map((service, i) => (
                  <div key={service.id} style={{
                    position: "absolute",
                    inset: 0,
                    opacity: i === activeIdx ? 1 : 0,
                    transition: "opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1)",
                  }}>
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      style={{ objectFit: "cover" }}
                      loading={i === 0 ? "eager" : "lazy"}
                      sizes="40vw"
                    />
                  </div>
                ))}

                {/* Image caption strip */}
                <div style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: "24px",
                  background: "linear-gradient(to top, rgba(0,0,0,0.6), transparent)",
                }}>
                  <p style={{
                    fontSize: "9px",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "rgba(243,240,234,0.6)",
                  }}>
                    {activeService.number} / {activeService.title}
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Accordion */}
            <div className="svcp-list-col">
              {services.map((service, idx) => {
                const isActive = activeIdx === idx;
                const relatedProject = projects.find((p) =>
                  p.services.some((s) => s.toLowerCase().includes(service.title.toLowerCase().split(" ")[0]))
                ) || projects[idx % projects.length];

                return (
                  <div
                    key={service.id}
                    style={{
                      borderTop: "1px solid var(--border)",
                      cursor: "pointer",
                    }}
                    onClick={() => setActiveIdx(idx)}
                  >
                    {/* Row header */}
                    <div style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "clamp(20px, 2.5vw, 28px) clamp(16px, 2vw, 24px)",
                    }}>
                      <div style={{
                        display: "flex",
                        alignItems: "baseline",
                        gap: "clamp(16px, 2.5vw, 32px)",
                      }}>
                        <span style={{
                          fontSize: "11px",
                          letterSpacing: "0.12em",
                          color: isActive ? "var(--bronze)" : "var(--muted-dark)",
                          transition: "color 0.3s ease",
                          minWidth: "28px",
                        }}>
                          {service.number}
                        </span>
                        <h2 style={{
                          fontFamily: "var(--font-display)",
                          fontSize: "clamp(1.2rem, 2.2vw, 1.9rem)",
                          fontWeight: 400,
                          color: isActive ? "var(--text)" : "var(--muted)",
                          transition: "color 0.3s ease",
                          letterSpacing: "-0.01em",
                        }}>
                          {service.title}
                        </h2>
                      </div>

                      <span style={{
                        width: "28px",
                        height: "28px",
                        border: `1px solid ${isActive ? "var(--bronze)" : "var(--border)"}`,
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "14px",
                        color: isActive ? "var(--bronze)" : "var(--muted)",
                        transform: isActive ? "rotate(45deg)" : "none",
                        transition: "all 0.35s ease",
                        flexShrink: 0,
                      }}>
                        +
                      </span>
                    </div>

                    {/* Expanded content */}
                    <div style={{
                      overflow: "hidden",
                      maxHeight: isActive ? "800px" : "0",
                      transition: "max-height 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
                    }}>
                      <div className="accordion-body">
                        {/* Mobile image */}
                        <div style={{
                          position: "relative",
                          aspectRatio: "16/9",
                          overflow: "hidden",
                          marginBottom: "20px",
                          display: "none",
                        }}
                        className="svc-mobile-img"
                        >
                          <Image
                            src={service.image}
                            alt={service.title}
                            fill style={{ objectFit: "cover" }}
                          />
                        </div>

                        <p style={{
                          fontSize: "var(--text-sm)",
                          color: "var(--muted)",
                          lineHeight: 1.8,
                          marginBottom: "24px",
                          maxWidth: "520px",
                        }}>
                          {service.description}
                        </p>

                        {/* Tags */}
                        <div style={{
                          display: "flex",
                          flexWrap: "wrap",
                          gap: "8px",
                          marginBottom: "24px",
                        }}>
                          {service.tags.map((tag) => (
                            <span key={tag} style={{
                              fontSize: "9px",
                              letterSpacing: "0.18em",
                              textTransform: "uppercase",
                              color: "var(--muted-dark)",
                              border: "1px solid var(--border)",
                              padding: "5px 12px",
                            }}>
                              {tag}
                            </span>
                          ))}
                        </div>

                        {/* Deliverables */}
                        <div style={{
                          paddingTop: "20px",
                          borderTop: "1px solid var(--border)",
                          marginBottom: "20px",
                        }}>
                          <p style={{
                            fontSize: "9px",
                            letterSpacing: "0.25em",
                            textTransform: "uppercase",
                            color: "var(--bronze)",
                            marginBottom: "12px",
                          }}>
                            Key Deliverables
                          </p>
                          <div className="deliverables-grid">
                            {service.features.map((feat) => (
                              <div key={feat} style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "8px",
                                fontSize: "12px",
                                color: "var(--muted)",
                              }}>
                                <span style={{
                                  width: "4px", height: "4px",
                                  borderRadius: "50%",
                                  background: "var(--bronze)",
                                  flexShrink: 0,
                                }} />
                                {feat}
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Related project link */}
                        {relatedProject && (
                          <div style={{
                            paddingTop: "20px",
                            borderTop: "1px solid var(--border)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                          }}>
                            <span style={{
                              fontSize: "9px",
                              letterSpacing: "0.2em",
                              textTransform: "uppercase",
                              color: "var(--muted-dark)",
                            }}>
                              Representative Project
                            </span>
                            <Link href={`/work/${relatedProject.slug}`} style={{
                              fontSize: "11px",
                              letterSpacing: "0.15em",
                              textTransform: "uppercase",
                              color: "var(--text)",
                              display: "flex",
                              alignItems: "center",
                              gap: "8px",
                              transition: "color 0.3s ease",
                            }}>
                              {relatedProject.title} →
                            </Link>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
              <div style={{ borderTop: "1px solid var(--border)" }} />
            </div>
          </div>
        </div>
      </div>

      {/* ── 03. 5-STAGE LIFECYCLE ── */}
      <div style={{
        paddingBlock: "var(--space-md)",
        paddingInline: "var(--gutter)",
        borderBottom: "1px solid var(--border)",
        background: "var(--surface)",
      }}>
        <div style={{ maxWidth: "var(--max-w)", marginInline: "auto", width: "100%" }}>
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
                display: "flex", alignItems: "center", gap: "12px",
                marginBottom: "clamp(12px, 2vw, 20px)",
              }}>
                <span style={{ width: "24px", height: "1px", background: "var(--bronze)" }} />
                <span style={{ fontSize: "10px", letterSpacing: "0.28em", textTransform: "uppercase", color: "var(--bronze)" }}>
                  Execution Pipeline
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
                From Blueprint to Sanctuary.
              </h2>
            </div>
            <p style={{
              fontSize: "var(--text-sm)",
              color: "var(--muted)",
              maxWidth: "380px",
              lineHeight: 1.7,
            }}>
              Every spatial engagement is managed through a rigorous 5-stage lifecycle
              to eliminate risk and deliver turnkey perfection.
            </p>
          </div>

          {/* Workflow steps — numbered horizontal */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(5, 1fr)",
            gap: "0",
          }}
          className="workflow-grid"
          >
            {workflowSteps.map((ws, i) => (
              <div key={ws.step} style={{
                padding: "clamp(24px, 3vw, 40px) clamp(16px, 2vw, 24px)",
                borderRight: i < workflowSteps.length - 1 ? "1px solid var(--border)" : "none",
                borderTop: "2px solid transparent",
                transition: "border-color 0.3s ease",
              }}
              onMouseEnter={e => (e.currentTarget.style.borderTopColor = "var(--bronze)")}
              onMouseLeave={e => (e.currentTarget.style.borderTopColor = "transparent")}
              >
                <div style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  marginBottom: "16px",
                }}>
                  <span style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(1.5rem, 2vw, 2rem)",
                    fontWeight: 400,
                    color: "var(--bronze)",
                    lineHeight: 1,
                  }}>
                    {ws.step}
                  </span>
                  <span style={{
                    fontSize: "9px",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: "var(--muted-dark)",
                  }}>
                    {ws.duration}
                  </span>
                </div>

                <h3 style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(0.9rem, 1.2vw, 1.1rem)",
                  fontWeight: 400,
                  color: "var(--text)",
                  marginBottom: "10px",
                  lineHeight: 1.3,
                }}>
                  {ws.phase}
                </h3>

                <p style={{
                  fontSize: "11px",
                  color: "var(--muted)",
                  lineHeight: 1.7,
                  marginBottom: "16px",
                }}>
                  {ws.description}
                </p>

                <div style={{
                  paddingTop: "12px",
                  borderTop: "1px solid var(--border)",
                }}>
                  {ws.deliverables.map((item) => (
                    <div key={item} style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      fontSize: "10px",
                      color: "rgba(243,240,234,0.6)",
                      marginBottom: "5px",
                    }}>
                      <span style={{
                        width: "3px", height: "3px",
                        borderRadius: "50%",
                        background: "var(--bronze)",
                      }} />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── 04. FAQ ── */}
      <div style={{
        paddingBlock: "var(--space-md)",
        paddingInline: "var(--gutter)",
        borderBottom: "1px solid var(--border)",
      }}>
        <div style={{ maxWidth: "var(--max-w)", marginInline: "auto", width: "100%" }}>
          <div className="svcp-12-grid" style={{ alignItems: "start" }}>
            {/* Label — cols 1-3 */}
            <div className="svcp-faq-label">
              <div style={{
                display: "flex", alignItems: "center", gap: "12px",
                marginBottom: "16px",
              }}>
                <span style={{ width: "24px", height: "1px", background: "var(--bronze)" }} />
                <span style={{ fontSize: "10px", letterSpacing: "0.28em", textTransform: "uppercase", color: "var(--bronze)" }}>
                  FAQ
                </span>
              </div>
              <h2 style={{
                fontFamily: "var(--font-display)",
                fontSize: "var(--text-2xl)",
                fontWeight: 400,
                lineHeight: 1.1,
                letterSpacing: "-0.01em",
                color: "var(--text)",
                position: "sticky",
                top: "100px",
              }}>
                Client<br />Guidance
              </h2>
            </div>

            {/* FAQ list — cols 4-12 */}
            <div className="svcp-faq-list">
              {faqs.map((faq, fIdx) => {
                const isOpen = openFaq === fIdx;
                return (
                  <div
                    key={faq.q}
                    style={{
                      borderTop: "1px solid var(--border)",
                      cursor: "pointer",
                    }}
                    onClick={() => setOpenFaq(isOpen ? null : fIdx)}
                  >
                    <div style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "clamp(18px, 2.5vw, 24px) 0",
                      gap: "16px",
                    }}>
                      <span style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "clamp(1rem, 1.5vw, 1.3rem)",
                        fontWeight: 400,
                        color: "var(--text)",
                        lineHeight: 1.35,
                        transition: "color 0.3s ease",
                      }}>
                        {faq.q}
                      </span>
                      <span style={{
                        width: "26px",
                        height: "26px",
                        border: `1px solid ${isOpen ? "var(--bronze)" : "var(--border)"}`,
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "13px",
                        color: isOpen ? "var(--bronze)" : "var(--muted)",
                        transform: isOpen ? "rotate(45deg)" : "none",
                        transition: "all 0.35s ease",
                        flexShrink: 0,
                      }}>
                        +
                      </span>
                    </div>

                    <div style={{
                      overflow: "hidden",
                      maxHeight: isOpen ? "400px" : "0",
                      transition: "max-height 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
                    }}>
                      <p style={{
                        fontSize: "var(--text-sm)",
                        color: "var(--muted)",
                        lineHeight: 1.8,
                        paddingBottom: "clamp(18px, 2.5vw, 28px)",
                        maxWidth: "640px",
                      }}>
                        {faq.a}
                      </p>
                    </div>
                  </div>
                );
              })}
              <div style={{ borderTop: "1px solid var(--border)" }} />
            </div>
          </div>
        </div>
      </div>

      {/* ── 05. BOTTOM CTA ── */}
      <div style={{
        paddingBlock: "var(--space-md)",
        paddingInline: "var(--gutter)",
        background: "var(--bg)",
      }}>
        <div style={{ maxWidth: "var(--max-w)", marginInline: "auto", width: "100%" }}>
          <div className="svcp-12-grid" style={{ alignItems: "center" }}>
            <div className="svcp-cta-text">
              <h2 style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(3rem, 7vw, 7rem)",
                fontWeight: 400,
                lineHeight: 0.92,
                letterSpacing: "-0.03em",
                color: "var(--text)",
                textTransform: "uppercase",
                marginBottom: "clamp(24px, 4vw, 40px)",
              }}>
                Let's Shape<br />
                <span style={{ color: "rgba(243,240,234,0.25)", fontStyle: "italic" }}>Your Environment</span>
              </h2>

              <div style={{
                display: "flex",
                alignItems: "center",
                gap: "16px",
                flexWrap: "wrap",
              }}>
                <Link href="/contact" style={{
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
                  Inquire Now →
                </Link>
                <a
                  href={`https://wa.me/${siteConfig.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
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
                  WhatsApp
                </a>
              </div>
            </div>

            <div className="svcp-cta-image">
              <div style={{
                position: "relative",
                aspectRatio: "3/4",
                overflow: "hidden",
              }}>
                <Image
                  src="/images/projects/trifecta-retto/hero.jpg"
                  alt="Architecture studio"
                  fill
                  style={{ objectFit: "cover" }}
                  loading="lazy"
                  sizes="33vw"
                />
              </div>
            </div>
          </div>
        </div>
      </div>


    </div>
  );
}
