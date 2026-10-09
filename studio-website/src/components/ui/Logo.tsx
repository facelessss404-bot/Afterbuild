"use client";

import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/data/site";

interface LogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  showTagline?: boolean;
  showWordmark?: boolean;
  theme?: "dark" | "light";
  linkToHome?: boolean;
  variant?: "badge" | "lockup" | "card" | "raw";
  glow?: boolean;
  className?: string;
}

export default function Logo({
  size = "md",
  showTagline = true,
  showWordmark = true,
  theme = "dark",
  linkToHome = true,
  variant = "lockup",
  glow = true,
  className = "",
}: LogoProps) {
  const isLight = theme === "light";

  // Aspect ratio of official company_logo.png: 1085 / 992 = 1.09375
  const logoDimensions = {
    sm: { h: 38, w: 42, fontTitle: "12px", fontStudio: "9.5px", fontTag: "7px" },
    md: { h: 46, w: 50, fontTitle: "15px", fontStudio: "11.5px", fontTag: "8px" },
    lg: { h: 64, w: 70, fontTitle: "19px", fontStudio: "14px", fontTag: "9.5px" },
    xl: { h: 96, w: 105, fontTitle: "26px", fontStudio: "19px", fontTag: "12px" },
  }[size];

  // 1. Raw variant (unadorned official image)
  if (variant === "raw") {
    const rawContent = (
      <div
        className={`afterbuild-brand-raw ${className}`}
        style={{
          position: "relative",
          width: `${logoDimensions.w}px`,
          height: `${logoDimensions.h}px`,
          display: "inline-block",
        }}
      >
        <Image
          src="/images/company_logo.png"
          alt={`${siteConfig.name} — Luxury Architecture & Interior Design`}
          width={logoDimensions.w * 2}
          height={logoDimensions.h * 2}
          priority
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            display: "block",
          }}
        />
      </div>
    );
    if (!linkToHome) return rawContent;
    return (
      <Link href="/" aria-label={`${siteConfig.name} Home`} style={{ display: "inline-flex", textDecoration: "none" }}>
        {rawContent}
      </Link>
    );
  }

  // 2. Card variant (for Studio page or showcase)
  if (variant === "card") {
    const cardContent = (
      <div
        className={`afterbuild-brand-card ${className}`}
        style={{
          position: "relative",
          borderRadius: "10px",
          overflow: "hidden",
          border: "1px solid rgba(197, 168, 128, 0.35)",
          boxShadow: "0 24px 60px rgba(0, 0, 0, 0.65), 0 0 30px rgba(197, 168, 128, 0.12)",
          background: "radial-gradient(ellipse at center, rgba(30, 28, 26, 0.95) 0%, rgba(12, 12, 11, 0.98) 100%)",
          padding: "clamp(12px, 2vw, 20px)",
        }}
      >
        <div style={{ position: "relative", width: "100%", aspectRatio: "1085/992", overflow: "hidden", borderRadius: "6px" }}>
          <Image
            src="/images/company_logo.png"
            alt="Official AfterBuild Studio Brand Mark & Architectural Geometry"
            fill
            priority
            style={{
              objectFit: "contain",
              display: "block",
            }}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </div>
    );
    if (!linkToHome) return cardContent;
    return (
      <Link href="/" aria-label={`${siteConfig.name} Home`} style={{ display: "block", textDecoration: "none" }}>
        {cardContent}
      </Link>
    );
  }

  // 3. Default Luxury Badge & Lockup (Used in Navbar, Footer, Drawers)
  const content = (
    <div
      className={`afterbuild-brand group ${className}`}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: size === "sm" ? "10px" : "14px",
        textDecoration: "none",
        cursor: linkToHome ? "pointer" : "default",
        userSelect: "none",
      }}
    >
      {/* Official Logo Image Container with Decorlabs-style luxury pill finish */}
      <div
        className="afterbuild-logo-pill"
        style={{
          position: "relative",
          width: `${logoDimensions.w}px`,
          height: `${logoDimensions.h}px`,
          flexShrink: 0,
          borderRadius: size === "sm" ? "8px" : "10px",
          overflow: "hidden",
          border: isLight
            ? "1px solid rgba(0, 0, 0, 0.12)"
            : "1px solid rgba(197, 168, 128, 0.35)",
          background: isLight
            ? "#FFFFFF"
            : "radial-gradient(circle at 40% 40%, rgba(35, 33, 30, 0.95) 0%, rgba(14, 14, 13, 0.98) 100%)",
          boxShadow: isLight
            ? "0 2px 10px rgba(0, 0, 0, 0.08)"
            : glow
              ? "0 4px 18px rgba(0, 0, 0, 0.5), 0 0 16px rgba(197, 168, 128, 0.2)"
              : "0 4px 14px rgba(0, 0, 0, 0.4)",
          transition: "transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.35s ease, box-shadow 0.35s ease",
          padding: "2px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image
          src="/images/company_logo.png"
          alt={`${siteConfig.name} Official Logo`}
          width={logoDimensions.w * 2}
          height={logoDimensions.h * 2}
          priority
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            display: "block",
            borderRadius: size === "sm" ? "6px" : "8px",
          }}
        />
      </div>

      {/* Responsive Studio Wordmark — Visible on Desktop screens, seamlessly hidden on compact mobile/tablet */}
      {showWordmark && variant !== "badge" && (
        <div
          className="afterbuild-logo-text hidden sm:flex"
          style={{
            flexDirection: "column",
            justifyContent: "center",
            lineHeight: 1,
          }}
        >
          {/* Top Line: AFTERBUILD STUDIO */}
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: size === "sm" ? "6px" : "8px",
              whiteSpace: "nowrap",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-logo), 'Cinzel', 'Trajan Pro', Georgia, serif",
                fontSize: logoDimensions.fontTitle,
                fontWeight: 700,
                letterSpacing: "0.14em",
                color: isLight ? "#111111" : "#FFFFFF",
                textTransform: "uppercase",
                lineHeight: 1.05,
                textShadow: isLight ? "none" : "0 2px 10px rgba(0,0,0,0.6)",
              }}
            >
              AFTERBUILD
            </span>
            <span
              style={{
                fontFamily: "var(--font-logo), 'Cinzel', 'Trajan Pro', Georgia, serif",
                fontSize: logoDimensions.fontStudio,
                fontWeight: 600,
                letterSpacing: "0.22em",
                color: isLight ? "#8E6F4B" : "var(--bronze, #DFC298)",
                textTransform: "uppercase",
                lineHeight: 1.05,
              }}
            >
              STUDIO
            </span>
          </div>

          {/* Subtitle: DESIGN • INTERIORS • ARCHITECT */}
          {showTagline && (
            <span
              style={{
                fontFamily: "var(--font-sans), -apple-system, sans-serif",
                fontSize: logoDimensions.fontTag,
                fontWeight: 600,
                letterSpacing: "0.24em",
                textTransform: "uppercase",
                color: isLight ? "#666666" : "#DFC298",
                marginTop: "3px",
                whiteSpace: "nowrap",
                opacity: 0.9,
              }}
            >
              DESIGN &bull; INTERIORS &bull; ARCHITECT
            </span>
          )}
        </div>
      )}

      <style jsx>{`
        .afterbuild-brand:hover .afterbuild-logo-pill {
          transform: translateY(-1px) scale(1.03);
          border-color: rgba(197, 168, 128, 0.7);
          box-shadow: 0 6px 24px rgba(0, 0, 0, 0.6), 0 0 24px rgba(197, 168, 128, 0.35);
        }
      `}</style>
    </div>
  );

  if (!linkToHome) return content;

  return (
    <Link
      href="/"
      aria-label={`${siteConfig.name} — Luxury Architecture & Interior Design Studio, Bangalore`}
      style={{ textDecoration: "none", display: "inline-flex", alignItems: "center" }}
    >
      {content}
    </Link>
  );
}
