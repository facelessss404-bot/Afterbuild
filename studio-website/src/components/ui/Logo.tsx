"use client";

import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/data/site";

interface LogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  showTagline?: boolean;
  theme?: "dark" | "light";
  linkToHome?: boolean;
  variant?: "lockup" | "emblem" | "stacked";
  glow?: boolean;
  className?: string;
}

export default function Logo({
  size = "md",
  showTagline = true,
  theme = "dark",
  linkToHome = true,
  variant = "lockup",
  glow = true,
  className = "",
}: LogoProps) {
  const isLight = theme === "light";

  // Sizing definitions for Vector + Emblem Lockup
  const lockupSpecs = {
    sm: {
      emblemW: 38,
      emblemH: 24,
      gap: 10,
      fontTitle: "13px",
      fontStudio: "10px",
      fontTag: "7px",
      tagMarginTop: "2px",
    },
    md: {
      emblemW: 50,
      emblemH: 32,
      gap: 14,
      fontTitle: "17px",
      fontStudio: "12.5px",
      fontTag: "9px",
      tagMarginTop: "3px",
    },
    lg: {
      emblemW: 58,
      emblemH: 37,
      gap: 12,
      fontTitle: "19px",
      fontStudio: "14px",
      fontTag: "10px",
      tagMarginTop: "3px",
    },
    xl: {
      emblemW: 84,
      emblemH: 54,
      gap: 18,
      fontTitle: "28px",
      fontStudio: "20px",
      fontTag: "14px",
      tagMarginTop: "5px",
    },
  }[size];

  // Emblem-only dimensions
  const emblemDimensions = {
    sm: { w: 38, h: 24 },
    md: { w: 50, h: 32 },
    lg: { w: 72, h: 46 },
    xl: { w: 92, h: 59 },
  }[size];

  // Stacked dimensions
  const stackedDimensions = {
    sm: { w: 180, h: 120 },
    md: { w: 260, h: 175 },
    lg: { w: 360, h: 240 },
    xl: { w: 440, h: 295 },
  }[size];

  let logoElement: React.ReactNode = null;

  if (variant === "emblem") {
    logoElement = (
      <div
        className="afterbuild-logo-emblem-wrap"
        style={{
          position: "relative",
          width: `${emblemDimensions.w}px`,
          height: `${emblemDimensions.h}px`,
          flexShrink: 0,
          transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), filter 0.4s ease",
        }}
      >
        <Image
          src="/images/logo-emblem.png"
          alt="AfterBuild Studio Emblem"
          width={emblemDimensions.w * 2}
          height={emblemDimensions.h * 2}
          priority
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            filter: isLight
              ? "drop-shadow(0 2px 8px rgba(0,0,0,0.15))"
              : glow
                ? "drop-shadow(0 0 16px rgba(212,178,130,0.5)) drop-shadow(0 2px 8px rgba(0,0,0,0.6))"
                : "drop-shadow(0 2px 8px rgba(0,0,0,0.4))",
          }}
        />
      </div>
    );
  } else if (variant === "stacked") {
    logoElement = (
      <div
        className="afterbuild-logo-stacked-wrap"
        style={{
          position: "relative",
          width: `${stackedDimensions.w}px`,
          height: "auto",
          maxWidth: "100%",
        }}
      >
        <Image
          src={isLight ? "/images/logo-stacked-light.png" : "/images/logo-stacked-dark.png"}
          alt={`${siteConfig.name} — Architecture & Interior Design Studio`}
          width={stackedDimensions.w}
          height={stackedDimensions.h}
          priority
          style={{
            width: "100%",
            height: "auto",
            display: "block",
            objectFit: "contain",
          }}
        />
      </div>
    );
  } else {
    // Official Hybrid Lockup: Authentic Illuminated Emblem + Razor-Sharp Vector Typography
    logoElement = (
      <div
        className="afterbuild-logo-lockup-wrap"
        style={{
          position: "relative",
          display: "inline-flex",
          alignItems: "center",
          gap: `${lockupSpecs.gap}px`,
          transition: "transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease",
          userSelect: "none",
        }}
      >
        {/* Authentic Radiant Emblem */}
        <div
          style={{
            position: "relative",
            width: `${lockupSpecs.emblemW}px`,
            height: `${lockupSpecs.emblemH}px`,
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            src="/images/logo-emblem.png"
            alt="AfterBuild Studio Mark"
            width={lockupSpecs.emblemW * 2}
            height={lockupSpecs.emblemH * 2}
            priority
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
              display: "block",
              filter: isLight
                ? "drop-shadow(0 2px 6px rgba(0,0,0,0.12))"
                : glow
                  ? "drop-shadow(0 0 16px rgba(212, 178, 130, 0.55)) drop-shadow(0 2px 8px rgba(0, 0, 0, 0.7))"
                  : "drop-shadow(0 2px 8px rgba(0,0,0,0.4))",
            }}
          />
        </div>

        {/* Crisp Vector Typography */}
        <div
          style={{
            display: "flex",
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
              gap: `clamp(6px, 1vw, ${Math.max(8, parseInt(lockupSpecs.fontStudio) * 0.7)}px)`,
              whiteSpace: "nowrap",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-logo), 'Cinzel', 'Trajan Pro', Georgia, serif",
                fontSize: lockupSpecs.fontTitle,
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
                fontSize: lockupSpecs.fontStudio,
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
                fontSize: lockupSpecs.fontTag,
                fontWeight: 600,
                letterSpacing: "0.26em",
                textTransform: "uppercase",
                color: isLight ? "#666666" : "#DFC298",
                marginTop: lockupSpecs.tagMarginTop,
                whiteSpace: "nowrap",
                opacity: 0.95,
              }}
            >
              DESIGN &bull; INTERIORS &bull; ARCHITECT
            </span>
          )}
        </div>
      </div>
    );
  }

  const content = (
    <div
      className={`afterbuild-brand group ${className}`}
      style={{
        display: "inline-flex",
        alignItems: "center",
        textDecoration: "none",
        cursor: linkToHome ? "pointer" : "default",
      }}
    >
      {logoElement}

      <style jsx>{`
        .afterbuild-brand:hover .afterbuild-logo-lockup-wrap,
        .afterbuild-brand:hover .afterbuild-logo-emblem-wrap,
        .afterbuild-brand:hover .afterbuild-logo-stacked-wrap {
          transform: translateY(-1px) scale(1.02);
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
