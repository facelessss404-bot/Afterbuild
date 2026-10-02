"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { siteConfig } from "@/data/site";

const navLinks = [
  { label: "Work", href: "/work" },
  { label: "Services", href: "/services" },
  { label: "Studio", href: "/studio" },
  { label: "Recognition", href: "/recognition" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const overlayRef = useRef<HTMLDivElement>(null);
  const menuItemsRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setScrolled(currentY > 60);
      if (currentY > lastScrollY.current && currentY > 120) {
        setVisible(false);
      } else {
        setVisible(true);
      }
      lastScrollY.current = currentY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const overlay = overlayRef.current;
    const menuItems = menuItemsRef.current;
    if (!overlay || !menuItems) return;

    if (isOpen) {
      gsap.set(overlay, { display: "flex" });
      gsap.fromTo(overlay, { opacity: 0 }, { opacity: 1, duration: 0.4, ease: "power2.out" });
      const items = menuItems.querySelectorAll(".menu-item");
      gsap.fromTo(
        items,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: "power4.out", stagger: 0.07, delay: 0.1 }
      );
      document.body.style.overflow = "hidden";
    } else {
      gsap.to(overlay, {
        opacity: 0,
        duration: 0.35,
        ease: "power2.in",
        onComplete: () => gsap.set(overlay, { display: "none" }),
      });
      document.body.style.overflow = "";
    }
  }, [isOpen]);

  useEffect(() => { setIsOpen(false); }, [pathname]);

  return (
    <>
      {/* ── FIXED NAV ── */}
      <header
        id="main-header"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          paddingInline: "var(--gutter)",
          paddingBlock: scrolled ? "14px" : "22px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          transition: "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), padding 0.4s ease, background 0.4s ease, border-color 0.4s ease",
          transform: visible ? "translateY(0)" : "translateY(-100%)",
          background: scrolled ? "rgba(10, 10, 9, 0.88)" : "transparent",
          backdropFilter: scrolled ? "blur(24px) saturate(140%)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(24px) saturate(140%)" : "none",
          borderBottom: scrolled ? "1px solid rgba(243, 240, 234, 0.06)" : "1px solid transparent",
        }}
      >
        {/* Logo */}
        <Link
          href="/"
          aria-label={`${siteConfig.name} Home`}
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "13px",
            fontWeight: 400,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "var(--text)",
            opacity: 0.9,
            transition: "opacity 0.3s ease",
          }}
          onMouseEnter={e => (e.currentTarget.style.opacity = "1")}
          onMouseLeave={e => (e.currentTarget.style.opacity = "0.9")}
        >
          {siteConfig.name}
        </Link>

        {/* Desktop nav */}
        <nav
          className="hidden md:flex items-center"
          role="navigation"
          aria-label="Main Navigation"
          style={{ gap: "clamp(20px, 2.5vw, 40px)" }}
        >
          {navLinks.map((link) => {
            const isActive = pathname === link.href || pathname.startsWith(link.href + "/");
            return (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  fontSize: "11px",
                  fontWeight: 400,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: isActive ? "var(--text)" : "var(--muted)",
                  transition: "color 0.3s ease",
                  paddingBottom: "2px",
                  borderBottom: isActive ? "1px solid var(--bronze)" : "1px solid transparent",
                }}
                onMouseEnter={e => { if (!isActive) (e.currentTarget as HTMLElement).style.color = "var(--text)"; }}
                onMouseLeave={e => { if (!isActive) (e.currentTarget as HTMLElement).style.color = "var(--muted)"; }}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Mobile hamburger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "5px",
            background: "none",
            border: "none",
            padding: "4px",
            cursor: "pointer",
          }}
        >
          <span style={{
            display: "block", height: "1px", width: "22px",
            background: "var(--text)",
            transition: "transform 0.3s ease, opacity 0.3s ease",
            transform: isOpen ? "rotate(45deg) translate(4px, 4px)" : "none",
          }} />
          <span style={{
            display: "block", height: "1px", width: "16px",
            background: "var(--muted)",
            transition: "opacity 0.3s ease",
            opacity: isOpen ? 0 : 1,
          }} />
          <span style={{
            display: "block", height: "1px", width: "22px",
            background: "var(--text)",
            transition: "transform 0.3s ease, opacity 0.3s ease",
            transform: isOpen ? "rotate(-45deg) translate(4px, -4px)" : "none",
          }} />
        </button>
      </header>

      {/* ── FULL-SCREEN OVERLAY MENU ── */}
      <div
        ref={overlayRef}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 99,
          background: "rgba(10, 10, 9, 0.97)",
          backdropFilter: "blur(40px)",
          display: "none",
          flexDirection: "column",
          paddingInline: "var(--gutter)",
        }}
      >
        {/* Overlay top bar */}
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingBlock: "22px",
          borderBottom: "1px solid rgba(243, 240, 234, 0.06)",
        }}>
          <Link href="/" style={{
            fontFamily: "var(--font-display)",
            fontSize: "13px",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "var(--text)",
          }}>
            {siteConfig.name}
          </Link>
          <button
            onClick={() => setIsOpen(false)}
            aria-label="Close menu"
            style={{
              background: "none",
              border: "none",
              color: "var(--muted)",
              fontSize: "20px",
              cursor: "pointer",
              padding: "4px",
              lineHeight: 1,
            }}
          >
            ✕
          </button>
        </div>

        {/* Menu items */}
        <div
          ref={menuItemsRef}
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: "4px",
          }}
        >
          {navLinks.map((link, i) => (
            <div key={link.href} className="menu-item" style={{ overflow: "hidden" }}>
              <Link
                href={link.href}
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  gap: "24px",
                  paddingBlock: "clamp(10px, 1.5vw, 18px)",
                  borderBottom: "1px solid rgba(243, 240, 234, 0.05)",
                  color: "var(--text)",
                  transition: "color 0.3s ease",
                }}
                onMouseEnter={e => {
                  const num = e.currentTarget.querySelector(".menu-num") as HTMLElement;
                  const lbl = e.currentTarget.querySelector(".menu-lbl") as HTMLElement;
                  if (num) num.style.color = "var(--bronze)";
                  if (lbl) lbl.style.color = "var(--bronze)";
                }}
                onMouseLeave={e => {
                  const num = e.currentTarget.querySelector(".menu-num") as HTMLElement;
                  const lbl = e.currentTarget.querySelector(".menu-lbl") as HTMLElement;
                  if (num) num.style.color = "var(--muted-dark)";
                  if (lbl) lbl.style.color = "var(--text)";
                }}
              >
                <span className="menu-num" style={{
                  fontSize: "11px",
                  fontFamily: "var(--font-sans)",
                  letterSpacing: "0.15em",
                  color: "var(--muted-dark)",
                  transition: "color 0.3s ease",
                  minWidth: "28px",
                }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="menu-lbl" style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(2.4rem, 7vw, 5.5rem)",
                  fontWeight: 400,
                  letterSpacing: "-0.02em",
                  lineHeight: 1,
                  color: "var(--text)",
                  textTransform: "uppercase",
                  transition: "color 0.3s ease",
                }}>
                  {link.label}
                </span>
              </Link>
            </div>
          ))}

          {/* Contact info in overlay */}
          <div className="menu-item" style={{
            marginTop: "clamp(24px, 4vw, 48px)",
            display: "flex",
            gap: "32px",
            flexWrap: "wrap",
          }}>
            <a href={`mailto:${siteConfig.email}`} style={{
              fontSize: "11px",
              letterSpacing: "0.12em",
              color: "var(--muted)",
              transition: "color 0.3s ease",
              textTransform: "uppercase",
            }}
            onMouseEnter={e => (e.currentTarget.style.color = "var(--text)")}
            onMouseLeave={e => (e.currentTarget.style.color = "var(--muted)")}
            >
              {siteConfig.email}
            </a>
            <a href={siteConfig.instagram} target="_blank" rel="noopener noreferrer" style={{
              fontSize: "11px",
              letterSpacing: "0.12em",
              color: "var(--muted)",
              transition: "color 0.3s ease",
              textTransform: "uppercase",
            }}
            onMouseEnter={e => (e.currentTarget.style.color = "var(--text)")}
            onMouseLeave={e => (e.currentTarget.style.color = "var(--muted)")}
            >
              Instagram ↗
            </a>
            <a href={siteConfig.linkedin} target="_blank" rel="noopener noreferrer" style={{
              fontSize: "11px",
              letterSpacing: "0.12em",
              color: "var(--muted)",
              transition: "color 0.3s ease",
              textTransform: "uppercase",
            }}
            onMouseEnter={e => (e.currentTarget.style.color = "var(--text)")}
            onMouseLeave={e => (e.currentTarget.style.color = "var(--muted)")}
            >
              LinkedIn ↗
            </a>
          </div>
        </div>

        {/* Bottom location line */}
        <div style={{
          paddingBlock: "20px",
          borderTop: "1px solid rgba(243, 240, 234, 0.06)",
          fontSize: "10px",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "var(--muted-dark)",
        }}>
          {siteConfig.location} — Since {siteConfig.founded}
        </div>
      </div>
    </>
  );
}
