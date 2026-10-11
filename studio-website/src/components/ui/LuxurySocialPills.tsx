"use client";

import { useState } from "react";
import { siteConfig } from "@/data/site";

interface SocialItem {
  id: "instagram" | "linkedin" | "facebook";
  name: string;
  subtitle: string;
  href: string;
  brandColor: string;
  glowColor: string;
  gradientBg: string;
  icon: React.ReactNode;
}

const socialPlatforms: SocialItem[] = [
  {
    id: "instagram",
    name: "Instagram",
    subtitle: "@interiors_afterbuild_studio",
    href: siteConfig.instagram,
    brandColor: "#E1306C",
    glowColor: "rgba(225, 48, 108, 0.45)",
    gradientBg: "linear-gradient(135deg, #833ab4 0%, #fd1d1d 50%, #fcb045 100%)",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5.5" ry="5.5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    subtitle: "Ocean Decor / AfterBuild",
    href: siteConfig.linkedin,
    brandColor: "#0A66C2",
    glowColor: "rgba(10, 102, 194, 0.45)",
    gradientBg: "linear-gradient(135deg, #0077b5 0%, #004182 100%)",
    icon: (
      <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.53 1.53 0 1 0 0-3.05 1.53 1.53 0 0 0 0 3.05m1.39 9.74v-8.37H5.07v8.37z" />
      </svg>
    ),
  },
  {
    id: "facebook",
    name: "Facebook",
    subtitle: "Official Studio Page",
    href: siteConfig.facebook,
    brandColor: "#1877F2",
    glowColor: "rgba(24, 119, 242, 0.45)",
    gradientBg: "linear-gradient(135deg, #1877f2 0%, #0b51b7 100%)",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95C18.05 21.45 22 17.19 22 12z" />
      </svg>
    ),
  },
];

interface Props {
  variant?: "cards" | "pills";
  layout?: "stack" | "grid" | "row";
}

export default function LuxurySocialPills({ variant = "cards", layout }: Props) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  if (variant === "pills") {
    return (
      <div
        style={{
          display: "flex",
          gap: "10px",
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        {socialPlatforms.map((item) => {
          const isHovered = hoveredId === item.id;
          return (
            <a
              key={item.id}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Visit AfterBuild on ${item.name}`}
              onMouseEnter={() => setHoveredId(item.id)}
              onMouseLeave={() => setHoveredId(null)}
              style={{
                position: "relative",
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                padding: "8px 16px",
                borderRadius: "999px",
                background: isHovered
                  ? "var(--surface)"
                  : "rgba(20, 19, 18, 0.04)",
                border: isHovered
                  ? `1px solid ${item.brandColor}`
                  : "1px solid rgba(158, 121, 72, 0.28)",
                boxShadow: isHovered
                  ? `0 6px 18px ${item.glowColor}`
                  : "0 2px 8px rgba(20, 19, 18, 0.04)",
                color: isHovered ? item.brandColor : "var(--text)",
                textDecoration: "none",
                transform: isHovered ? "translateY(-2px) scale(1.02)" : "none",
                transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                overflow: "hidden",
              }}
            >
              {/* Radial glow background on hover */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: isHovered ? item.gradientBg : "transparent",
                  opacity: isHovered ? 0.08 : 0,
                  transition: "opacity 0.35s ease",
                  pointerEvents: "none",
                }}
              />

              {/* Glowing Icon Circle */}
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "28px",
                  height: "28px",
                  borderRadius: "50%",
                  background: isHovered ? item.gradientBg : "rgba(158, 121, 72, 0.12)",
                  color: isHovered ? "#FFFFFF" : "var(--bronze)",
                  boxShadow: isHovered ? `0 0 12px ${item.glowColor}` : "none",
                  transform: isHovered ? "rotate(8deg) scale(1.08)" : "none",
                  transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
                }}
              >
                {item.icon}
              </span>

              <span
                style={{
                  fontSize: "11px",
                  fontWeight: 600,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: isHovered ? item.brandColor : "var(--text)",
                }}
              >
                {item.name}
              </span>

              <span
                style={{
                  fontSize: "12px",
                  color: "var(--bronze)",
                  transform: isHovered ? "translate(2px, -2px)" : "none",
                  transition: "all 0.25s ease",
                }}
              >
                ↗
              </span>
            </a>
          );
        })}
      </div>
    );
  }

  // "cards" variant — luxury iconic architectural dossier badges
  const isRow = layout === "row";
  const isStack = layout === "stack";

  return (
    <div
      style={{
        display: "flex",
        flexDirection: isStack ? "column" : "row",
        flexWrap: "wrap",
        gap: "10px",
        width: "100%",
        maxWidth: isStack ? "380px" : "100%",
      }}
    >
      {socialPlatforms.map((item) => {
        const isHovered = hoveredId === item.id;
        return (
          <a
            key={item.id}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Visit AfterBuild on ${item.name}`}
            onMouseEnter={() => setHoveredId(item.id)}
            onMouseLeave={() => setHoveredId(null)}
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "10px 14px",
              borderRadius: "10px",
              background: isHovered
                ? "var(--surface)"
                : "rgba(255, 255, 255, 0.85)",
              border: isHovered
                ? `1px solid ${item.brandColor}`
                : "1px solid rgba(158, 121, 72, 0.24)",
              boxShadow: isHovered
                ? `0 10px 24px ${item.glowColor}, 0 2px 8px rgba(0, 0, 0, 0.05)`
                : "0 2px 10px rgba(20, 19, 18, 0.04)",
              textDecoration: "none",
              color: "var(--text)",
              transform: isHovered ? "translateY(-2px)" : "none",
              transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
              backdropFilter: "blur(14px)",
              WebkitBackdropFilter: "blur(14px)",
              overflow: "hidden",
              flex: isRow ? "1 1 150px" : undefined,
              minWidth: isRow ? "140px" : undefined,
            }}
          >
            {/* Ambient backlight aura on hover */}
            <div
              style={{
                position: "absolute",
                top: "-50%",
                left: "-30%",
                width: "140px",
                height: "140px",
                borderRadius: "50%",
                background: isHovered ? item.gradientBg : "transparent",
                filter: "blur(26px)",
                opacity: isHovered ? 0.15 : 0,
                transition: "opacity 0.35s ease",
                pointerEvents: "none",
              }}
            />

            {/* Specular light sweep sheen */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(105deg, transparent 20%, rgba(255, 255, 255, 0.5) 50%, transparent 80%)",
                transform: isHovered ? "translateX(100%)" : "translateX(-100%)",
                transition: isHovered ? "transform 0.7s ease-in-out" : "none",
                pointerEvents: "none",
              }}
            />

            {/* Glowing Icon Medallion */}
            <div
              style={{
                position: "relative",
                zIndex: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "38px",
                height: "38px",
                borderRadius: "50%",
                background: isHovered
                  ? item.gradientBg
                  : "rgba(158, 121, 72, 0.12)",
                border: isHovered
                  ? "1px solid rgba(255, 255, 255, 0.85)"
                  : "1px solid rgba(158, 121, 72, 0.32)",
                color: isHovered ? "#FFFFFF" : "var(--bronze)",
                boxShadow: isHovered
                  ? `0 0 14px ${item.glowColor}`
                  : "none",
                transform: isHovered ? "scale(1.08)" : "none",
                transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
                flexShrink: 0,
              }}
            >
              {item.icon}
            </div>

            {/* Typography Dossier — Dark High Contrast */}
            <div style={{ position: "relative", zIndex: 2, flex: 1, minWidth: 0 }}>
              <div
                style={{
                  fontSize: "12px",
                  fontWeight: 700,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: isHovered ? item.brandColor : "var(--text)",
                  transition: "color 0.25s ease",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <span>{item.name}</span>
                <span
                  style={{
                    fontSize: "11px",
                    color: "var(--bronze)",
                    transform: isHovered ? "translate(2px, -2px)" : "none",
                    transition: "all 0.25s ease",
                  }}
                >
                  ↗
                </span>
              </div>
              <div
                style={{
                  fontSize: "11px",
                  color: "var(--muted)",
                  marginTop: "2px",
                  letterSpacing: "0.02em",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  transition: "color 0.25s ease",
                  fontWeight: 400,
                }}
              >
                {item.subtitle}
              </div>
            </div>
          </a>
        );
      })}
    </div>
  );
}
