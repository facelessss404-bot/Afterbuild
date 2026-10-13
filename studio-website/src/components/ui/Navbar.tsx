"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import Logo from "@/components/ui/Logo";
import LuxurySocialPills from "@/components/ui/LuxurySocialPills";
import { siteConfig } from "@/data/site";

const navLinks = [
  { label: "Work", href: "/work" },
  { label: "Walkthroughs", href: "/#walkthroughs" },
  { label: "Services", href: "/services" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Studio", href: "/studio" },
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

  const isDarkHero = pathname === "/" && !scrolled;

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
          background: isDarkHero ? "transparent" : (scrolled ? "rgba(250, 248, 245, 0.94)" : "rgba(250, 248, 245, 0.85)"),
          backdropFilter: isDarkHero ? "none" : "blur(24px) saturate(140%)",
          WebkitBackdropFilter: isDarkHero ? "none" : "blur(24px) saturate(140%)",
          borderBottom: isDarkHero ? "1px solid transparent" : "1px solid rgba(20, 19, 18, 0.08)",
        }}
      >
        {/* Logo */}
        <Logo size={scrolled ? "sm" : "md"} showTagline={!scrolled} theme={isDarkHero ? "dark" : "light"} />

        {/* Desktop nav & CTA (>= 1024px) */}
        <div className="hidden lg:flex items-center" style={{ gap: "clamp(20px, 2.5vw, 40px)" }}>
          <nav
            role="navigation"
            aria-label="Main Navigation"
            style={{ display: "flex", alignItems: "center", gap: "clamp(16px, 2vw, 32px)" }}
          >
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href + "/"));
              const defaultColor = isDarkHero
                ? (isActive ? "#FFFFFF" : "rgba(255, 255, 255, 0.78)")
                : (isActive ? "var(--text)" : "var(--muted)");
              const hoverColor = isDarkHero ? "#FFFFFF" : "var(--text)";

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{
                    fontSize: "11px",
                    fontWeight: 500,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: defaultColor,
                    transition: "color 0.3s ease",
                    paddingBottom: "2px",
                    borderBottom: isActive ? "1px solid var(--bronze)" : "1px solid transparent",
                    textShadow: isDarkHero ? "0 1px 6px rgba(0,0,0,0.5)" : "none",
                  }}
                  onMouseEnter={e => { if (!isActive) (e.currentTarget as HTMLElement).style.color = hoverColor; }}
                  onMouseLeave={e => { if (!isActive) (e.currentTarget as HTMLElement).style.color = defaultColor; }}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <Link
            href="/contact"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "8px 18px",
              borderRadius: "999px",
              border: isDarkHero ? "1px solid rgba(229, 200, 156, 0.6)" : "1px solid rgba(158, 121, 72, 0.4)",
              background: isDarkHero ? "rgba(0, 0, 0, 0.35)" : "rgba(158, 121, 72, 0.08)",
              fontSize: "10px",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: isDarkHero ? "#E5C89C" : "var(--bronze)",
              fontWeight: 600,
              transition: "all 0.3s ease",
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.background = "var(--bronze)";
              (e.currentTarget as HTMLElement).style.color = "#FAF8F5";
              (e.currentTarget as HTMLElement).style.borderColor = "var(--bronze)";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.background = isDarkHero ? "rgba(0, 0, 0, 0.35)" : "rgba(158, 121, 72, 0.08)";
              (e.currentTarget as HTMLElement).style.color = isDarkHero ? "#E5C89C" : "var(--bronze)";
              (e.currentTarget as HTMLElement).style.borderColor = isDarkHero ? "rgba(229, 200, 156, 0.6)" : "rgba(158, 121, 72, 0.4)";
            }}
          >
            <span>Start a Project</span>
            <span style={{ fontSize: "11px" }}>&rarr;</span>
          </Link>
        </div>

        {/* Mobile & Tablet hamburger (< 1024px) */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex lg:hidden flex-col justify-center items-center"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          style={{
            background: isDarkHero ? "rgba(0, 0, 0, 0.45)" : "rgba(20, 19, 18, 0.04)",
            border: isDarkHero ? "1px solid rgba(229, 200, 156, 0.4)" : "1px solid rgba(158, 121, 72, 0.35)",
            borderRadius: "8px",
            width: "44px",
            height: "44px",
            padding: "10px",
            cursor: "pointer",
            gap: "5px",
          }}
        >
          <span style={{
            display: "block", height: "1.5px", width: "22px",
            background: isDarkHero ? "#FFFFFF" : "var(--text)",
            transition: "transform 0.3s ease, opacity 0.3s ease",
            transform: isOpen ? "rotate(45deg) translate(4px, 4px)" : "none",
          }} />
          <span style={{
            display: "block", height: "1.5px", width: "16px",
            background: "var(--bronze)",
            transition: "opacity 0.3s ease",
            opacity: isOpen ? 0 : 1,
          }} />
          <span style={{
            display: "block", height: "1.5px", width: "22px",
            background: isDarkHero ? "#FFFFFF" : "var(--text)",
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
          background: "rgba(250, 248, 245, 0.98)",
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
          borderBottom: "1px solid rgba(20, 19, 18, 0.08)",
        }}>
          <Logo size="sm" showTagline={false} theme="light" />
          <button
            onClick={() => setIsOpen(false)}
            aria-label="Close menu"
            style={{
              background: "none",
              border: "none",
              color: "var(--text)",
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
                  borderBottom: "1px solid rgba(20, 19, 18, 0.08)",
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
            <div style={{ marginTop: "6px" }}>
              <LuxurySocialPills variant="pills" />
            </div>
          </div>
        </div>

        {/* Bottom location line */}
        <div style={{
          paddingBlock: "20px",
          borderTop: "1px solid rgba(20, 19, 18, 0.08)",
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
