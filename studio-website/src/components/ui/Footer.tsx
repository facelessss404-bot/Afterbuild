"use client";

import Link from "next/link";
import Logo from "@/components/ui/Logo";
import LuxurySocialPills from "@/components/ui/LuxurySocialPills";
import { siteConfig, getDirectionsUrl } from "@/data/site";

const navLinks = [
  { label: "Selected Works", href: "/work" },
  { label: "4K Walkthroughs", href: "/#walkthroughs" },
  { label: "Design Services", href: "/services" },
  { label: "Our Studio", href: "/studio" },
  { label: "Contact & Consult", href: "/contact" },
];

export default function Footer() {
  const year = new Date().getFullYear();
  const directionsLink = getDirectionsUrl(siteConfig.contact.address);

  return (
    <footer
      id="site-footer"
      style={{
        background: "var(--surface-2)",
        borderTop: "1px solid var(--border)",
        position: "relative",
        overflow: "hidden",
        color: "var(--text)",
      }}
    >
      {/* Ambient background architectural glow */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0,
          left: "15%",
          width: "500px",
          height: "350px",
          background: "radial-gradient(circle, rgba(158, 121, 72, 0.08) 0%, transparent 70%)",
          pointerEvents: "none",
          filter: "blur(60px)",
        }}
      />

      {/* Main footer grid */}
      <div style={{
        maxWidth: "var(--max-w)",
        marginInline: "auto",
        paddingInline: "var(--gutter)",
        paddingTop: "clamp(48px, 6vw, 72px)",
        position: "relative",
        zIndex: 2,
      }}>
        <div className="footer-main-grid">

          {/* Studio identity — cols 1-5 desktop */}
          <div className="footer-brand">
            {/* Illuminated Brand Plate */}
            <div
              style={{
                display: "inline-block",
                position: "relative",
                padding: "8px 16px",
                borderRadius: "8px",
                background: "var(--surface)",
                border: "1px solid rgba(158, 121, 72, 0.25)",
                boxShadow: "0 4px 18px rgba(0, 0, 0, 0.05)",
                marginBottom: "clamp(20px, 2.5vw, 28px)",
                maxWidth: "100%",
              }}
            >
              <Logo size="lg" glow={false} showTagline={true} theme="light" />
            </div>

            <p style={{
              fontSize: "14.5px",
              color: "var(--text)",
              lineHeight: 1.75,
              maxWidth: "380px",
              marginBottom: "clamp(22px, 3vw, 32px)",
              fontWeight: 400,
            }}>
              Designing spaces with purpose. Building experiences with intention.
              <span style={{
                display: "block",
                marginTop: "12px",
                color: "var(--bronze)",
                fontSize: "12.5px",
                fontWeight: 600,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
              }}>
                Mohammed Farmaan Azam K &bull; Founder &amp; Director
              </span>
              <span style={{
                display: "block",
                marginTop: "6px",
                color: "var(--muted)",
                fontSize: "12.5px",
                fontWeight: 400,
              }}>
                160+ Projects &bull; 75+ Craftsmen &bull; 3.5+ Years &bull; Indiranagar, Bangalore
              </span>
            </p>

            {/* Social Links — Luxury Iconic Badges (Horizontal) */}
            <div style={{ marginTop: "clamp(18px, 2.5vw, 26px)", width: "100%" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  marginBottom: "12px",
                }}
              >
                <span style={{ width: "18px", height: "1px", background: "var(--bronze)" }} />
                <span
                  style={{
                    fontSize: "11px",
                    fontWeight: 700,
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    color: "var(--bronze)",
                  }}
                >
                  Official Channels
                </span>
              </div>
              <LuxurySocialPills variant="cards" layout="row" />
            </div>
          </div>

          {/* Navigation — cols 6-8 desktop */}
          <div className="footer-nav">
            <h4 style={{
              fontSize: "12px",
              fontWeight: 700,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "var(--text)",
              marginBottom: "8px",
            }}>
              Navigate
            </h4>
            <div style={{ width: "24px", height: "2px", background: "var(--bronze)", marginBottom: "clamp(18px, 2.5vw, 24px)" }} />

            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "12px", padding: 0, margin: 0 }}>
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    style={{
                      fontSize: "14px",
                      color: "var(--text-secondary)",
                      fontWeight: 500,
                      textDecoration: "none",
                      transition: "color 0.25s ease, transform 0.25s ease",
                      display: "inline-block",
                    }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLElement).style.color = "var(--bronze)";
                      (e.currentTarget as HTMLElement).style.transform = "translateX(4px)";
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)";
                      (e.currentTarget as HTMLElement).style.transform = "translateX(0)";
                    }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Studio Address — cols 9-10 desktop */}
          <div className="footer-address">
            <h4 style={{
              fontSize: "12px",
              fontWeight: 700,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "var(--text)",
              marginBottom: "8px",
            }}>
              Studio
            </h4>
            <div style={{ width: "24px", height: "2px", background: "var(--bronze)", marginBottom: "clamp(18px, 2.5vw, 24px)" }} />

            <address style={{
              fontStyle: "normal",
              fontSize: "14px",
              color: "var(--muted)",
              lineHeight: 1.8,
            }}>
              <strong style={{ color: "var(--text)", fontWeight: 600 }}>{siteConfig.name}</strong><br />
              {siteConfig.address.line1}<br />
              {siteConfig.address.line2}<br />
              {siteConfig.address.city}, {siteConfig.address.state}<br />
              PIN — {siteConfig.address.pin}
            </address>

            <a
              href={directionsLink}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                marginTop: "16px",
                fontSize: "12px",
                fontWeight: 600,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "var(--bronze)",
                textDecoration: "none",
                borderBottom: "1px solid rgba(158, 121, 72, 0.4)",
                paddingBottom: "3px",
                transition: "opacity 0.3s ease, border-color 0.3s ease",
              }}
              onMouseEnter={e => ((e.currentTarget as HTMLElement).style.opacity = "0.75")}
              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.opacity = "1")}
            >
              Get Directions ↗
            </a>
          </div>

          {/* Contact / Inquiries — cols 11-12 desktop */}
          <div className="footer-contact">
            <h4 style={{
              fontSize: "12px",
              fontWeight: 700,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "var(--text)",
              marginBottom: "8px",
            }}>
              Inquiries
            </h4>
            <div style={{ width: "24px", height: "2px", background: "var(--bronze)", marginBottom: "clamp(18px, 2.5vw, 24px)" }} />

            <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
              <div>
                <span style={{
                  fontSize: "10px",
                  fontWeight: 600,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "var(--bronze)",
                  display: "block",
                  marginBottom: "4px",
                }}>
                  Direct Phone
                </span>
                <a
                  href={`tel:${siteConfig.phone.replace(/\s+/g, '')}`}
                  style={{
                    fontSize: "15px",
                    fontWeight: 600,
                    color: "var(--text)",
                    textDecoration: "none",
                    letterSpacing: "0.02em",
                    transition: "color 0.25s ease",
                    display: "inline-block",
                  }}
                  onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = "var(--bronze)")}
                  onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = "var(--text)")}
                >
                  {siteConfig.phone}
                </a>
              </div>

              <div>
                <span style={{
                  fontSize: "10px",
                  fontWeight: 600,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "var(--bronze)",
                  display: "block",
                  marginBottom: "4px",
                }}>
                  Studio Email
                </span>
                <a
                  href={`mailto:${siteConfig.email}`}
                  style={{
                    fontSize: "14px",
                    fontWeight: 500,
                    color: "var(--text)",
                    textDecoration: "none",
                    transition: "color 0.25s ease",
                    wordBreak: "break-all",
                    display: "inline-block",
                  }}
                  onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = "var(--bronze)")}
                  onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = "var(--text)")}
                >
                  {siteConfig.email}
                </a>
              </div>

              <div>
                <span style={{
                  fontSize: "10px",
                  fontWeight: 600,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "var(--bronze)",
                  display: "block",
                  marginBottom: "4px",
                }}>
                  Operating Hours
                </span>
                <p style={{
                  fontSize: "13px",
                  color: "var(--muted)",
                  lineHeight: 1.6,
                  margin: 0,
                }}>
                  {siteConfig.hours}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Large wordmark watermark */}
        <div style={{
          position: "relative",
          overflow: "hidden",
          width: "100%",
          maxWidth: "100%",
          paddingBlock: "clamp(24px, 4.5vw, 48px)",
        }}>
          <h2
            aria-hidden="true"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(3.5rem, 11vw, 12rem)",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "-0.03em",
              color: "rgba(20, 19, 18, 0.12)",
              WebkitTextStroke: "1.5px rgba(20, 19, 18, 0.22)",
              lineHeight: 1,
              userSelect: "none",
              pointerEvents: "none",
              whiteSpace: "nowrap",
              margin: 0,
            }}
          >
            {siteConfig.name}
          </h2>
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: "1px solid var(--border)",
          paddingBlock: "clamp(18px, 2.5vw, 26px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "16px",
          flexWrap: "wrap",
        }}>
          <span style={{
            fontSize: "12px",
            letterSpacing: "0.08em",
            color: "var(--muted)",
          }}>
            &copy; {year} {siteConfig.name}. All rights reserved.
          </span>
          <span style={{
            fontSize: "12px",
            letterSpacing: "0.08em",
            color: "var(--bronze)",
            fontWeight: 500,
          }}>
            Crafted with precision &bull; Indiranagar, Bangalore
          </span>
        </div>
      </div>
    </footer>
  );
}
