"use client";

import Link from "next/link";
import { siteConfig, getDirectionsUrl } from "@/data/site";

const navLinks = [
  { label: "Work", href: "/work" },
  { label: "Services", href: "/services" },
  { label: "Studio", href: "/studio" },
  { label: "Recognition", href: "/recognition" },
  { label: "Contact", href: "/contact" },
];

export default function Footer() {
  const year = new Date().getFullYear();
  const directionsLink = getDirectionsUrl(siteConfig.contact.address);

  return (
    <footer
      id="site-footer"
      style={{
        background: "var(--surface)",
        borderTop: "1px solid var(--border)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Main footer grid */}
      <div style={{
        maxWidth: "var(--max-w)",
        marginInline: "auto",
        paddingInline: "var(--gutter)",
        paddingTop: "var(--space-md)",
      }}>
        <div className="footer-main-grid">

          {/* Studio identity — cols 1-5 desktop, col 1 tablet */}
          <div className="footer-brand">
            <Link href="/" style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1rem, 1.5vw, 1.3rem)",
              fontWeight: 400,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "var(--text)",
              display: "block",
              marginBottom: "clamp(16px, 2.5vw, 24px)",
            }}>
              {siteConfig.name}
            </Link>

            <p style={{
              fontSize: "13px",
              color: "var(--muted)",
              lineHeight: 1.75,
              maxWidth: "320px",
              marginBottom: "clamp(24px, 3.5vw, 40px)",
            }}>
              {siteConfig.tagline}.<br />
              {siteConfig.location}. Since {siteConfig.founded}.
            </p>

            {/* Social */}
            <div style={{ display: "flex", gap: "20px" }}>
              <a href={siteConfig.instagram} target="_blank" rel="noopener noreferrer"
                style={{
                  fontSize: "10px",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "var(--muted-dark)",
                  transition: "color 0.3s ease",
                }}
                onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = "var(--text)")}
                onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = "var(--muted-dark)")}
              >
                Instagram ↗
              </a>
              <a href={siteConfig.linkedin} target="_blank" rel="noopener noreferrer"
                style={{
                  fontSize: "10px",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "var(--muted-dark)",
                  transition: "color 0.3s ease",
                }}
                onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = "var(--text)")}
                onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = "var(--muted-dark)")}
              >
                LinkedIn ↗
              </a>
            </div>
          </div>

          {/* Navigation — cols 6-8 desktop, col 2 tablet */}
          <div className="footer-nav">
            <h4 style={{
              fontSize: "9px",
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: "var(--muted-dark)",
              marginBottom: "clamp(16px, 2.5vw, 24px)",
            }}>
              Navigate
            </h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "10px" }}>
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} style={{
                    fontSize: "13px",
                    color: "var(--muted)",
                    transition: "color 0.3s ease",
                  }}
                  onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = "var(--text)")}
                  onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = "var(--muted)")}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Address — cols 9-10 desktop, col 1 tablet */}
          <div className="footer-address">
            <h4 style={{
              fontSize: "9px",
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: "var(--muted-dark)",
              marginBottom: "clamp(16px, 2.5vw, 24px)",
            }}>
              Studio
            </h4>
            <address style={{
              fontStyle: "normal",
              fontSize: "13px",
              color: "var(--muted)",
              lineHeight: 1.8,
            }}>
              {siteConfig.address.line1}<br />
              {siteConfig.address.line2}<br />
              {siteConfig.address.city}, {siteConfig.address.state}<br />
              {siteConfig.address.pin}
            </address>
            <a
              href={directionsLink}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-block",
                marginTop: "12px",
                fontSize: "10px",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "var(--bronze)",
                transition: "opacity 0.3s ease",
              }}
              onMouseEnter={e => ((e.currentTarget as HTMLElement).style.opacity = "0.7")}
              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.opacity = "1")}
            >
              Get Directions ↗
            </a>
          </div>

          {/* Contact — cols 11-12 desktop, col 2 tablet */}
          <div className="footer-contact">
            <h4 style={{
              fontSize: "9px",
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: "var(--muted-dark)",
              marginBottom: "clamp(16px, 2.5vw, 24px)",
            }}>
              Contact
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div>
                <span style={{
                  fontSize: "9px",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "var(--muted-dark)",
                  display: "block",
                  marginBottom: "4px",
                }}>
                  Email
                </span>
                <a href={`mailto:${siteConfig.email}`} style={{
                  fontSize: "13px",
                  color: "var(--muted)",
                  transition: "color 0.3s ease",
                }}
                onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = "var(--text)")}
                onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = "var(--muted)")}
                >
                  {siteConfig.email}
                </a>
              </div>
              <div>
                <span style={{
                  fontSize: "9px",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "var(--muted-dark)",
                  display: "block",
                  marginBottom: "4px",
                }}>
                  Phone
                </span>
                <a href={`tel:${siteConfig.phone.replace(/\s+/g, '')}`} style={{
                  fontSize: "13px",
                  color: "var(--muted)",
                  transition: "color 0.3s ease",
                }}
                onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = "var(--text)")}
                onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = "var(--muted)")}
                >
                  {siteConfig.phone}
                </a>
              </div>
              <div>
                <span style={{
                  fontSize: "9px",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "var(--muted-dark)",
                  display: "block",
                  marginBottom: "4px",
                }}>
                  Hours
                </span>
                <p style={{ fontSize: "12px", color: "var(--muted-dark)", lineHeight: 1.6 }}>
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
          paddingBlock: "clamp(20px, 4vw, 40px)",
        }}>
          <h2
            aria-hidden="true"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(4rem, 12vw, 13rem)",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "-0.04em",
              color: "rgba(243,240,234,0.03)",
              lineHeight: 1,
              userSelect: "none",
              pointerEvents: "none",
              whiteSpace: "nowrap",
            }}
          >
            {siteConfig.name}
          </h2>
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: "1px solid var(--border)",
          paddingBlock: "clamp(16px, 2.5vw, 24px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "16px",
          flexWrap: "wrap",
        }}>
          <span style={{
            fontSize: "10px",
            letterSpacing: "0.15em",
            color: "var(--muted-dark)",
          }}>
            © {year} {siteConfig.name}. All rights reserved.
          </span>
          <span style={{
            fontSize: "10px",
            letterSpacing: "0.15em",
            color: "var(--muted-dark)",
          }}>
            Made with precision in {siteConfig.location}.
          </span>
        </div>
      </div>
    </footer>
  );
}
