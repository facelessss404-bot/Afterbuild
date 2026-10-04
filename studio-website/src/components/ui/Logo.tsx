"use client";

import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/data/site";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  showTagline?: boolean;
  theme?: "dark" | "light";
  linkToHome?: boolean;
  className?: string;
}

export default function Logo({
  size = "md",
  showTagline = true,
  theme = "dark",
  linkToHome = true,
  className = "",
}: LogoProps) {
  const isLight = theme === "light";

  // Dimensions based on size
  const markDimensions = {
    sm: { w: 32, h: 24, fontSizeTitle: "11px", fontSizeSub: "8px", gap: "10px" },
    md: { w: 42, h: 32, fontSizeTitle: "14px", fontSizeSub: "9px", gap: "14px" },
    lg: { w: 64, h: 48, fontSizeTitle: "20px", fontSizeSub: "11px", gap: "18px" },
  }[size];

  const content = (
    <div
      className={`afterbuild-brand-lockup group flex items-center ${className}`}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: markDimensions.gap,
        textDecoration: "none",
        cursor: linkToHome ? "pointer" : "default",
      }}
    >
      {/* Architectural Emblem Mark */}
      <div
        style={{
          position: "relative",
          width: `${markDimensions.w}px`,
          height: `${markDimensions.h}px`,
          flexShrink: 0,
          transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), filter 0.4s ease",
        }}
        className="logo-mark-wrap"
      >
        <Image
          src="/images/logo-mark-clean.png"
          alt="AfterBuild Studio Emblem"
          width={markDimensions.w * 2}
          height={markDimensions.h * 2}
          priority
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            filter: isLight
              ? "drop-shadow(0 2px 8px rgba(0,0,0,0.15))"
              : "drop-shadow(0 2px 10px rgba(197,168,128,0.25))",
          }}
        />
      </div>

      {/* Typography Wordmark */}
      <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.1 }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: "6px" }}>
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontSize: markDimensions.fontSizeTitle,
              fontWeight: 500,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: isLight ? "#111110" : "var(--text)",
              transition: "color 0.3s ease",
            }}
          >
            AFTERBUILD
          </span>
          <span
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: markDimensions.fontSizeSub,
              fontWeight: 400,
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: "var(--bronze)",
            }}
          >
            STUDIO
          </span>
        </div>

        {showTagline && size !== "sm" && (
          <span
            style={{
              fontSize: "7.5px",
              fontWeight: 300,
              letterSpacing: "0.26em",
              textTransform: "uppercase",
              color: isLight ? "rgba(0,0,0,0.45)" : "rgba(243,240,234,0.45)",
              marginTop: "3px",
            }}
          >
            DESIGN &bull; INTERIORS &bull; ARCHITECT
          </span>
        )}
      </div>

      <style jsx>{`
        .afterbuild-brand-lockup:hover .logo-mark-wrap {
          transform: translateY(-1px) scale(1.04);
        }
      `}</style>
    </div>
  );

  if (!linkToHome) return content;

  return (
    <Link href="/" aria-label={`${siteConfig.name} — Home`} style={{ textDecoration: "none" }}>
      {content}
    </Link>
  );
}
