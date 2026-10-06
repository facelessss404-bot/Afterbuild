"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/data/site";

export interface WalkthroughItem {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  location: string;
  area: string;
  category: string;
  duration: string;
  videoSrc?: string;
  poster: string;
  description: string;
  highlights: string[];
  hasVideoFile: boolean;
}

const walkthroughProjects: WalkthroughItem[] = [
  {
    id: "trifecta-retto",
    number: "01",
    title: "Trifecta Retto — Luxury 3BHK Residence",
    subtitle: "Architecture as experience: seamless fluted woodwork, ambient cove illumination, and modular culinary precision.",
    location: "Bangalore",
    area: "2,450 sq.ft.",
    category: "Residential Architecture & Interior",
    duration: "1:45 min",
    videoSrc: "/videos/walkthrough-trifecta.mp4",
    poster: "/images/projects/trifecta-retto/hero.jpg",
    description:
      "A complete walkthrough capturing the balance between ergonomic utility and sculptural beauty. Features high-gloss acrylic cabinetry, warm under-cabinet strip lighting, concealed storage, and an expansive living-dining expanse.",
    highlights: ["Modular Kitchen", "Glass Display Pantry", "Custom Sconce Illumination", "Master Joinery"],
    hasVideoFile: true,
  },
  {
    id: "prestige-avalon-park",
    number: "02",
    title: "Prestige Avalon Park — Contemporary Urban Suite",
    subtitle: "Refined living reimagined: custom rose-gold framed lacquered glass wardrobes and Vastu-aligned master suite.",
    location: "Sarjapur Road, Bangalore",
    area: "1,850 sq.ft.",
    category: "Luxury Residential Suite",
    duration: "1:20 min",
    videoSrc: "/videos/walkthrough-prestige.mp4",
    poster: "/images/projects/prestige-avalon-park/hero.jpg",
    description:
      "A detailed room-by-room journey highlighting precision-engineered sliding wardrobe profiles, ambient recessed ceiling troughs, and tailored bedside cabinetry designed for modern Bangalore living.",
    highlights: ["Rose-Gold Wardrobes", "Vastu Master Planning", "Acoustic Bedhead Paneling", "Soft Illumination"],
    hasVideoFile: true,
  },
  {
    id: "sbr-horizon",
    number: "03",
    title: "SBR Horizon — Panoramic Timber Residence",
    subtitle: "Where precision meets possibility: vertical fluted timber feature wall with warm integrated backlighting.",
    location: "Old Madras Road, Bangalore",
    area: "3,100 sq.ft.",
    category: "Premium Apartment Interior",
    duration: "2:10 min",
    videoSrc: "/videos/walkthrough-trifecta.mp4", // fallback video reel
    poster: "/images/projects/sbr-horizon/hero.jpg",
    description:
      "A walkthrough of a panoramic Bangalore residence anchored by a bespoke fluted walnut media wall, floating marble credenza, and custom crystal wall sconces casting warm geometric shadows.",
    highlights: ["Fluted Feature Wall", "Floating Credenza", "Designer Sconces", "Open-Plan Living"],
    hasVideoFile: false,
  },
  {
    id: "gk-gateway",
    number: "04",
    title: "GK Gateway — Modern Architectural Living",
    subtitle: "Spaces shaped by intention: clean architectural lines, curated materials, and complete turnkey craftsmanship.",
    location: "Bangalore",
    area: "2,800 sq.ft.",
    category: "Turnkey Architecture & Interior",
    duration: "1:55 min",
    videoSrc: "/videos/walkthrough-prestige.mp4", // fallback video reel
    poster: "/images/projects/gk-gateway/hero.jpg",
    description:
      "An end-to-end walkthrough exploring how natural light interacts with curated neutral palettes, smart storage modules, and bespoke furniture crafted by our network of 75+ artisans.",
    highlights: ["Turnkey Handover", "Curated Palette", "Smart Storage", "75+ Craftsmen Network"],
    hasVideoFile: false,
  },
  {
    id: "bhavisha-homes",
    number: "05",
    title: "Bhavisha Homes — Tailored Spatial Harmony",
    subtitle: "Home as a state of mind: calm earthy palettes, functional elegance, and tailored modular storage.",
    location: "Bangalore",
    area: "2,150 sq.ft.",
    category: "Contemporary Interior & Modular",
    duration: "1:35 min",
    videoSrc: "/videos/walkthrough-trifecta.mp4",
    poster: "/images/projects/bhavisha-homes/hero.jpg",
    description:
      "A complete room-by-room walkthrough of a light-filled Bangalore residence featuring custom modular wardrobes, ergonomic space planning, and durable textured finishes tailored for everyday family life.",
    highlights: ["Modular Storage", "Warm Palette", "Space Optimization", "Turnkey Delivery"],
    hasVideoFile: false,
  },
];

export default function VideoWalkthroughSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFullscreenModal, setIsFullscreenModal] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const activeProject = walkthroughProjects[activeIndex];

  // Reset playback when switching projects
  useEffect(() => {
    setIsPlaying(false);
    setCurrentTime(0);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.pause();
    }
  }, [activeIndex]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    setCurrentTime(videoRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    if (!videoRef.current) return;
    setDuration(videoRef.current.duration);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!videoRef.current) return;
    const targetTime = parseFloat(e.target.value);
    videoRef.current.currentTime = targetTime;
    setCurrentTime(targetTime);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <section
      id="walkthroughs"
      style={{
        position: "relative",
        background: "#0c0c0b",
        color: "var(--text)",
        paddingBlock: "clamp(80px, 10vw, 140px)",
        paddingInline: "var(--gutter)",
        borderTop: "1px solid rgba(243,240,234,0.06)",
        borderBottom: "1px solid rgba(243,240,234,0.06)",
        overflow: "hidden",
      }}
      aria-label="Recent Project Walkthroughs"
    >
      {/* Subtle ambient background glow */}
      <div
        style={{
          position: "absolute",
          top: "10%",
          right: "-10%",
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(197, 168, 128, 0.07) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      <div style={{ maxWidth: "var(--max-w)", marginInline: "auto", position: "relative", zIndex: 2 }}>
        
        {/* Section Header */}
        <div style={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          marginBottom: "clamp(36px, 5vw, 64px)",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <span style={{ width: "32px", height: "1px", background: "var(--bronze)" }} />
            <span style={{
              fontSize: "11px",
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: "var(--bronze)",
              fontWeight: 500,
            }}>
              03 / SPACES IN MOTION
            </span>
            <span style={{
              padding: "2px 8px",
              borderRadius: "4px",
              background: "rgba(197, 168, 128, 0.12)",
              border: "1px solid rgba(197, 168, 128, 0.3)",
              fontSize: "9px",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "var(--bronze)",
            }}>
              4 Featured Walkthroughs
            </span>
          </div>

          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            gap: "24px",
            flexWrap: "wrap",
          }}>
            <div>
              <h2 style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2.2rem, 4.5vw, 4.5rem)",
                fontWeight: 400,
                lineHeight: 1.02,
                letterSpacing: "-0.02em",
                textTransform: "uppercase",
                color: "var(--text)",
              }}>
                Cinematic <span style={{ color: "rgba(228, 213, 190, 0.65)", fontStyle: "italic" }}>Walkthroughs</span>
              </h2>
              <p style={{
                fontSize: "clamp(13px, 1.1vw, 15px)",
                color: "var(--muted)",
                maxWidth: "560px",
                marginTop: "10px",
                lineHeight: 1.6,
                fontWeight: 300,
              }}>
                Step inside our recently completed residential and architectural spaces across Bangalore.
                Experience how light, proportion, bespoke joinery, and materials coalesce in real motion.
              </p>
            </div>

            {/* Google Drive sync note */}
            <div style={{
              padding: "12px 18px",
              borderRadius: "8px",
              background: "rgba(255, 255, 255, 0.02)",
              border: "1px solid rgba(243, 240, 234, 0.08)",
              maxWidth: "340px",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                <span style={{ display: "inline-block", width: "6px", height: "6px", borderRadius: "50%", background: "#4ade80" }} />
                <span style={{ fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--text)" }}>
                  Drive Walkthrough Pipeline
                </span>
              </div>
              <p style={{ fontSize: "11px", color: "var(--muted-dark)", lineHeight: 1.5 }}>
                New completed project walkthroughs are continuously uploaded from our Google Drive repository and catalogued in high definition.
              </p>
            </div>
          </div>
        </div>

        {/* Main Cinema Viewport (16:9) + Dossier Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: "28px",
        }}>
          {/* Cinema Screen Container */}
          <div
            style={{
              position: "relative",
              width: "100%",
              aspectRatio: "16/9",
              maxHeight: "720px",
              background: "#050505",
              borderRadius: "12px",
              overflow: "hidden",
              border: "1px solid rgba(243, 240, 234, 0.12)",
              boxShadow: "0 24px 60px rgba(0, 0, 0, 0.6)",
            }}
          >
            {/* The Video Element */}
            {activeProject.videoSrc && (
              <video
                ref={videoRef}
                src={activeProject.videoSrc}
                poster={activeProject.poster}
                playsInline
                preload="metadata"
                muted={isMuted}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onEnded={() => setIsPlaying(false)}
                onClick={togglePlay}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  cursor: "pointer",
                }}
              />
            )}

            {/* Poster fallback image when paused or loading */}
            {!isPlaying && (
              <div
                onClick={togglePlay}
                style={{
                  position: "absolute",
                  inset: 0,
                  cursor: "pointer",
                  zIndex: 2,
                }}
              >
                <Image
                  src={activeProject.poster}
                  alt={activeProject.title}
                  fill
                  style={{ objectFit: "cover" }}
                  priority={activeIndex === 0}
                />
                <div style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(to top, rgba(12,12,11,0.85) 0%, rgba(12,12,11,0.2) 50%, rgba(12,12,11,0.5) 100%)",
                }} />

                {/* Big Center Play Trigger */}
                <div style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "14px",
                }}>
                  <div
                    style={{
                      width: "clamp(64px, 8vw, 92px)",
                      height: "clamp(64px, 8vw, 92px)",
                      borderRadius: "50%",
                      background: "rgba(12, 12, 11, 0.75)",
                      backdropFilter: "blur(12px)",
                      border: "1px solid rgba(197, 168, 128, 0.6)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "var(--text)",
                      boxShadow: "0 10px 40px rgba(0,0,0,0.5), inset 0 0 20px rgba(197,168,128,0.2)",
                      transition: "transform 0.4s ease, border-color 0.4s ease, background 0.4s ease",
                    }}
                    className="play-pulse-btn"
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" style={{ marginLeft: "4px" }}>
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                  <span style={{
                    fontSize: "11px",
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    color: "var(--text)",
                    background: "rgba(0,0,0,0.6)",
                    padding: "4px 12px",
                    borderRadius: "999px",
                    backdropFilter: "blur(8px)",
                  }}>
                    {activeProject.hasVideoFile ? "Play 4K Walkthrough" : "Preview Showcase Reel"}
                  </span>
                </div>
              </div>
            )}

            {/* Video Badges Overlay (Top) */}
            <div style={{
              position: "absolute",
              top: "20px",
              left: "20px",
              right: "20px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              zIndex: 10,
              pointerEvents: "none",
            }}>
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                <span style={{
                  padding: "4px 10px",
                  borderRadius: "4px",
                  background: "rgba(10, 10, 9, 0.8)",
                  backdropFilter: "blur(8px)",
                  border: "1px solid rgba(197, 168, 128, 0.35)",
                  fontSize: "9px",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "var(--bronze)",
                  fontWeight: 600,
                }}>
                  {activeProject.number} / {activeProject.category}
                </span>
                <span style={{
                  padding: "4px 10px",
                  borderRadius: "4px",
                  background: "rgba(10, 10, 9, 0.8)",
                  backdropFilter: "blur(8px)",
                  border: "1px solid rgba(243, 240, 234, 0.12)",
                  fontSize: "9px",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "var(--text)",
                }}>
                  {activeProject.location} &bull; {activeProject.area}
                </span>
              </div>

              <span style={{
                padding: "4px 10px",
                borderRadius: "4px",
                background: "rgba(10, 10, 9, 0.8)",
                backdropFilter: "blur(8px)",
                fontSize: "10px",
                letterSpacing: "0.12em",
                color: "var(--bronze)",
                fontFamily: "monospace",
              }}>
                {activeProject.duration}
              </span>
            </div>

            {/* Custom Control Bar (Bottom) */}
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                padding: "16px 20px",
                background: "linear-gradient(to top, rgba(10,10,9,0.92) 0%, rgba(10,10,9,0.5) 70%, transparent 100%)",
                display: "flex",
                flexDirection: "column",
                gap: "8px",
                zIndex: 10,
                transition: "opacity 0.3s ease",
              }}
            >
              {/* Scrubber bar */}
              <input
                type="range"
                min="0"
                max={duration || 100}
                value={currentTime}
                onChange={handleSeek}
                aria-label="Seek video position"
                style={{
                  width: "100%",
                  height: "3px",
                  accentColor: "var(--bronze)",
                  background: "rgba(243,240,234,0.2)",
                  cursor: "pointer",
                }}
              />

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                  <button
                    onClick={togglePlay}
                    aria-label={isPlaying ? "Pause video" : "Play video"}
                    style={{
                      background: "none",
                      border: "none",
                      color: "var(--text)",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      fontSize: "13px",
                      padding: "4px",
                    }}
                  >
                    {isPlaying ? (
                      <span style={{ letterSpacing: "0.1em", fontSize: "11px", textTransform: "uppercase" }}>&#10074;&#10074; Pause</span>
                    ) : (
                      <span style={{ letterSpacing: "0.1em", fontSize: "11px", textTransform: "uppercase" }}>&#9658; Play</span>
                    )}
                  </button>

                  <button
                    onClick={toggleMute}
                    aria-label={isMuted ? "Unmute audio" : "Mute audio"}
                    style={{
                      background: "none",
                      border: "none",
                      color: "var(--muted)",
                      cursor: "pointer",
                      fontSize: "12px",
                      padding: "4px",
                    }}
                  >
                    {isMuted ? "Unmute Audio 🔇" : "Mute Audio 🔊"}
                  </button>

                  <span style={{ fontSize: "11px", color: "var(--muted)", fontFamily: "monospace" }}>
                    {formatTime(currentTime)} / {formatTime(duration || 105)}
                  </span>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                  <span style={{ fontSize: "11px", color: "var(--bronze)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                    {activeProject.title.split("—")[0]}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Dossier Bar — Active Project Specs & Inquire Button */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "24px",
            padding: "24px 28px",
            borderRadius: "10px",
            background: "rgba(255, 255, 255, 0.02)",
            border: "1px solid rgba(243, 240, 234, 0.08)",
            alignItems: "center",
          }}>
            <div>
              <span style={{
                fontSize: "10px",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "var(--bronze)",
                display: "block",
                marginBottom: "4px",
              }}>
                Featured Dossier &bull; {activeProject.category}
              </span>
              <h3 style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.2rem, 2vw, 1.8rem)",
                fontWeight: 400,
                color: "var(--text)",
                marginBottom: "8px",
              }}>
                {activeProject.title}
              </h3>
              <p style={{ fontSize: "13px", color: "var(--muted)", lineHeight: 1.6, maxWidth: "600px" }}>
                {activeProject.description}
              </p>

              {/* Highlights tags */}
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginTop: "12px" }}>
                {activeProject.highlights.map((tag, idx) => (
                  <span
                    key={idx}
                    style={{
                      fontSize: "10px",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      padding: "3px 8px",
                      borderRadius: "3px",
                      background: "rgba(243,240,234,0.04)",
                      border: "1px solid rgba(243,240,234,0.08)",
                      color: "rgba(243,240,234,0.7)",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Inquire about this specific space */}
            <div style={{ display: "flex", flexDirection: "column", gap: "10px", alignItems: "flex-start" }}>
              <span style={{ fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--muted-dark)" }}>
                Inspired by this aesthetic?
              </span>
              <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                <a
                  href={`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(
                    `Hi Farmaan & AfterBuild Studio team, I just watched the walkthrough of "${activeProject.title}" on your website and would love to consult for my space.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "10px 20px",
                    borderRadius: "999px",
                    background: "var(--bronze)",
                    color: "#0a0a09",
                    fontSize: "11px",
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    fontWeight: 600,
                    transition: "opacity 0.3s ease",
                  }}
                  onMouseEnter={e => ((e.currentTarget as HTMLElement).style.opacity = "0.85")}
                  onMouseLeave={e => ((e.currentTarget as HTMLElement).style.opacity = "1")}
                >
                  <span>Inquire on WhatsApp</span>
                  <span style={{ fontSize: "13px" }}>&rarr;</span>
                </a>

                <Link
                  href={`/work/${activeProject.id}`}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    padding: "9px 18px",
                    borderRadius: "999px",
                    border: "1px solid rgba(243,240,234,0.2)",
                    color: "var(--text)",
                    fontSize: "11px",
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    transition: "border-color 0.3s ease",
                  }}
                  onMouseEnter={e => ((e.currentTarget as HTMLElement).style.borderColor = "var(--text)")}
                  onMouseLeave={e => ((e.currentTarget as HTMLElement).style.borderColor = "rgba(243,240,234,0.2)")}
                >
                  Full Project Gallery
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* 4-Card Selector Grid Below Video */}
        <div style={{ marginTop: "clamp(32px, 5vw, 48px)" }}>
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "18px",
          }}>
            <span style={{
              fontSize: "10px",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "var(--muted)",
            }}>
              Select Walkthrough (4 Projects)
            </span>
            <span style={{
              fontSize: "10px",
              letterSpacing: "0.15em",
              color: "var(--bronze)",
            }}>
              Active: {activeProject.number} / 04
            </span>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "18px",
          }}>
            {walkthroughProjects.map((item, idx) => {
              const isSelected = idx === activeIndex;
              return (
                <div
                  key={item.id}
                  onClick={() => setActiveIndex(idx)}
                  style={{
                    position: "relative",
                    borderRadius: "8px",
                    overflow: "hidden",
                    cursor: "pointer",
                    border: isSelected ? "2px solid var(--bronze)" : "1px solid rgba(243, 240, 234, 0.1)",
                    background: isSelected ? "rgba(197, 168, 128, 0.06)" : "rgba(255, 255, 255, 0.02)",
                    transition: "all 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
                    transform: isSelected ? "translateY(-3px)" : "none",
                  }}
                  className="walkthrough-card-item"
                >
                  {/* Thumbnail Banner */}
                  <div style={{ position: "relative", width: "100%", aspectRatio: "16/10", overflow: "hidden" }}>
                    <Image
                      src={item.poster}
                      alt={item.title}
                      fill
                      style={{ objectFit: "cover" }}
                    />
                    <div style={{
                      position: "absolute",
                      inset: 0,
                      background: isSelected
                        ? "linear-gradient(to top, rgba(12,12,11,0.9) 0%, rgba(12,12,11,0.1) 60%)"
                        : "linear-gradient(to top, rgba(12,12,11,0.95) 0%, rgba(12,12,11,0.4) 60%)",
                    }} />

                    {/* Number badge */}
                    <div style={{
                      position: "absolute",
                      top: "10px",
                      left: "10px",
                      padding: "2px 7px",
                      borderRadius: "3px",
                      background: isSelected ? "var(--bronze)" : "rgba(0,0,0,0.7)",
                      color: isSelected ? "#0a0a09" : "var(--text)",
                      fontSize: "9px",
                      fontWeight: 600,
                      letterSpacing: "0.15em",
                    }}>
                      {item.number}
                    </div>

                    {/* Duration badge */}
                    <div style={{
                      position: "absolute",
                      bottom: "10px",
                      right: "10px",
                      padding: "2px 6px",
                      borderRadius: "3px",
                      background: "rgba(0,0,0,0.8)",
                      color: "rgba(243,240,234,0.8)",
                      fontSize: "9px",
                      fontFamily: "monospace",
                    }}>
                      {item.duration}
                    </div>

                    {/* Play symbol on hover */}
                    <div style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      width: "32px",
                      height: "32px",
                      borderRadius: "50%",
                      background: isSelected ? "var(--bronze)" : "rgba(0,0,0,0.6)",
                      color: isSelected ? "#0a0a09" : "var(--text)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "11px",
                      opacity: isSelected ? 1 : 0.7,
                    }}>
                      &#9658;
                    </div>
                  </div>

                  {/* Text details */}
                  <div style={{ padding: "14px 16px" }}>
                    <div style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "baseline",
                      marginBottom: "4px",
                    }}>
                      <span style={{
                        fontSize: "9px",
                        letterSpacing: "0.2em",
                        textTransform: "uppercase",
                        color: isSelected ? "var(--bronze)" : "var(--muted-dark)",
                      }}>
                        {item.location}
                      </span>
                      <span style={{ fontSize: "9px", color: "var(--muted-dark)" }}>
                        {item.area}
                      </span>
                    </div>

                    <h4 style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "15px",
                      fontWeight: isSelected ? 500 : 400,
                      color: isSelected ? "var(--text)" : "rgba(243,240,234,0.75)",
                      lineHeight: 1.3,
                      marginBottom: "6px",
                    }}>
                      {item.title.split("—")[0]}
                    </h4>

                    <p style={{
                      fontSize: "11px",
                      color: "var(--muted)",
                      lineHeight: 1.45,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}>
                      {item.subtitle}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      <style jsx>{`
        .play-pulse-btn:hover {
          transform: scale(1.08);
          border-color: #fff;
          background: rgba(197, 168, 128, 0.4);
        }
        .walkthrough-card-item:hover {
          border-color: rgba(197, 168, 128, 0.5);
          transform: translateY(-2px);
        }
      `}</style>
    </section>
  );
}
