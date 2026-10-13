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
    duration: "0:40 min",
    videoSrc: "/videos/walkthrough-prestige.mp4",
    poster: "/images/projects/prestige-avalon-park/hero.jpg",
    description:
      "A detailed room-by-room journey highlighting precision-engineered sliding wardrobe profiles, ambient recessed ceiling troughs, and tailored bedside cabinetry designed for modern Bangalore living.",
    highlights: ["Rose-Gold Wardrobes", "Vastu Master Planning", "Acoustic Bedhead Paneling", "Soft Illumination"],
    hasVideoFile: true,
  },
  {
    id: "gk-gateway",
    number: "03",
    title: "GK Gateway — Modern Architectural Living",
    subtitle: "Spaces shaped by intention: clean architectural lines, curated materials, and complete turnkey craftsmanship.",
    location: "Bangalore",
    area: "2,800 sq.ft.",
    category: "Turnkey Architecture & Interior",
    duration: "0:53 min",
    videoSrc: "/videos/walkthrough-gk-gateway.mp4",
    poster: "/images/projects/gk-gateway/hero.jpg",
    description:
      "An end-to-end walkthrough exploring how natural light interacts with curated neutral palettes, smart storage modules, and bespoke furniture crafted by our network of 75+ artisans.",
    highlights: ["Turnkey Handover", "Curated Palette", "Smart Storage", "75+ Craftsmen Network"],
    hasVideoFile: true,
  },
  {
    id: "aryan-villa",
    number: "04",
    title: "Aryan's Villa — Luxury Electronic City Villa",
    subtitle: "Contemporary private villa architecture: multi-tier geometric elevation, custom safety louvers, and bespoke joinery.",
    location: "Electronic City, Bangalore",
    area: "3,800 sq.ft.",
    category: "Private Villa Architecture & Interior",
    duration: "1:02 min",
    videoSrc: "/videos/walkthrough-aryan-villa.mp4",
    poster: "/images/projects/aryan-villa/hero.jpg",
    description:
      "A complete private villa walkthrough in Electronic City capturing multi-tier architectural facades, textured stone cladding accents, custom safety louvers, and tailored living spaces crafted by AfterBuild Studio.",
    highlights: ["Villa Architecture", "Electronic City", "Custom Facade", "Turnkey Handover"],
    hasVideoFile: true,
  },
];

export default function VideoWalkthroughSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showCinemaControls, setShowCinemaControls] = useState(true);
  const [cinemaActionFeedback, setCinemaActionFeedback] = useState<"play" | "pause" | null>(null);

  // Card inline playback states
  const [playingCardIndex, setPlayingCardIndex] = useState<number | null>(null);
  const [cardMuted, setCardMuted] = useState(true);
  const [showCardControlsIndex, setShowCardControlsIndex] = useState<number | null>(null);

  const videoRef = useRef<HTMLVideoElement>(null);
  const cinemaControlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const cardControlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const cardVideoRefs = useRef<{ [key: number]: HTMLVideoElement | null }>({});

  const activeProject = walkthroughProjects[activeIndex];

  // Reset cinema playback when switching active project
  useEffect(() => {
    setIsPlaying(false);
    setCurrentTime(0);
    setShowCinemaControls(true);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.pause();
    }
  }, [activeIndex]);

  // Cinema Auto-Hide: When playing starts, hide controls immediately
  useEffect(() => {
    if (isPlaying) {
      setShowCinemaControls(false);
    } else {
      if (cinemaControlsTimeoutRef.current) {
        clearTimeout(cinemaControlsTimeoutRef.current);
      }
      setShowCinemaControls(true);
    }
    return () => {
      if (cinemaControlsTimeoutRef.current) clearTimeout(cinemaControlsTimeoutRef.current);
    };
  }, [isPlaying]);

  // Desktop hover/mouse move handler to momentarily preview controls while playing
  const handleCinemaMouseMove = () => {
    if (!isPlaying) return;
    if (cinemaControlsTimeoutRef.current) {
      clearTimeout(cinemaControlsTimeoutRef.current);
    }
    setShowCinemaControls(true);
    cinemaControlsTimeoutRef.current = setTimeout(() => {
      setShowCinemaControls(false);
    }, 2000);
  };

  // Play/pause toggle for Cinema player
  const toggleCinemaPlay = () => {
    if (!videoRef.current) return;
    // Stop any card video playing below
    if (playingCardIndex !== null) {
      setPlayingCardIndex(null);
    }

    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
      setShowCinemaControls(true);
      setCinemaActionFeedback("pause");
      setTimeout(() => setCinemaActionFeedback(null), 600);
    } else {
      videoRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
          setShowCinemaControls(false);
          setCinemaActionFeedback("play");
          setTimeout(() => setCinemaActionFeedback(null), 600);
        })
        .catch(() => {});
    }
  };

  const handleCinemaScreenClick = (e: React.MouseEvent) => {
    toggleCinemaPlay();
  };

  const toggleCinemaMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
    handleCinemaMouseMove();
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
    handleCinemaMouseMove();
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  // Card Inline Playback Handlers
  const resetCardControlsTimeout = (idx: number) => {
    if (cardControlsTimeoutRef.current) {
      clearTimeout(cardControlsTimeoutRef.current);
    }
    setShowCardControlsIndex(idx);
    cardControlsTimeoutRef.current = setTimeout(() => {
      setShowCardControlsIndex(null);
    }, 2200);
  };

  const handleCardClick = (idx: number) => {
    setActiveIndex(idx);

    // If main cinema player is playing, pause it so there is no audio/video collision
    if (videoRef.current && isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    }

    if (playingCardIndex === idx) {
      // Toggle pause if already playing this card
      setPlayingCardIndex(null);
      setShowCardControlsIndex(null);
    } else {
      // Start playing this card
      setPlayingCardIndex(idx);
      resetCardControlsTimeout(idx);
    }
  };

  // When card playback state changes, ensure video plays
  useEffect(() => {
    if (playingCardIndex !== null) {
      const vid = cardVideoRefs.current[playingCardIndex];
      if (vid) {
        vid.muted = cardMuted;
        vid.play().catch(() => {});
      }
    }
  }, [playingCardIndex, cardMuted]);

  // Smooth switch and scroll to cinema screen
  const playInCinemaView = (idx: number) => {
    setPlayingCardIndex(null);
    setActiveIndex(idx);
    setShowCinemaControls(true);

    const el = document.getElementById("walkthroughs");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
        videoRef.current
          .play()
          .then(() => setIsPlaying(true))
          .catch(() => {});
      }
    }, 350);
  };

  return (
    <section
      id="walkthroughs"
      style={{
        position: "relative",
        background: "var(--bg)",
        color: "var(--text)",
        paddingBlock: "clamp(80px, 10vw, 140px)",
        paddingInline: "var(--gutter)",
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
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
          background: "radial-gradient(circle, rgba(158, 121, 72, 0.08) 0%, transparent 70%)",
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
              fontWeight: 600,
            }}>
              03 / SPACES IN MOTION
            </span>
            <span style={{
              padding: "2px 8px",
              borderRadius: "4px",
              background: "rgba(158, 121, 72, 0.12)",
              border: "1px solid rgba(158, 121, 72, 0.3)",
              fontSize: "9px",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "var(--bronze)",
              fontWeight: 600,
            }}>
              {walkthroughProjects.length} Walkthrough Projects
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
                Cinematic <span style={{ color: "var(--bronze)", fontStyle: "italic" }}>Walkthroughs</span>
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
              background: "var(--surface)",
              border: "1px solid var(--border)",
              boxShadow: "0 2px 12px rgba(20, 19, 18, 0.04)",
              maxWidth: "340px",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                <span style={{ display: "inline-block", width: "6px", height: "6px", borderRadius: "50%", background: "#16a34a" }} />
                <span style={{ fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--text)", fontWeight: 600 }}>
                  Drive Walkthrough Pipeline
                </span>
              </div>
              <p style={{ fontSize: "11px", color: "var(--muted)", lineHeight: 1.5 }}>
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
            onMouseMove={handleCinemaMouseMove}
            onMouseLeave={() => isPlaying && setShowCinemaControls(false)}
            style={{
              position: "relative",
              width: "100%",
              aspectRatio: "16/9",
              maxHeight: "720px",
              background: "#050505",
              borderRadius: "12px",
              overflow: "hidden",
              border: "1px solid rgba(20, 19, 18, 0.14)",
              boxShadow: "0 24px 60px rgba(20, 19, 18, 0.2)",
              userSelect: "none",
            }}
          >
            {/* Official Brand Logo Watermark Overlay (Point 3) */}
            <div
              style={{
                position: "absolute",
                top: "16px",
                right: "16px",
                zIndex: 20,
                pointerEvents: "none",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "6px 12px 6px 8px",
                borderRadius: "8px",
                background: "rgba(14, 13, 12, 0.72)",
                backdropFilter: "blur(8px)",
                border: "1px solid rgba(229, 200, 156, 0.4)",
                boxShadow: "0 4px 16px rgba(0, 0, 0, 0.5)",
              }}
            >
              <div style={{
                position: "relative",
                width: "24px",
                height: "22px",
                borderRadius: "4px",
                overflow: "hidden",
                background: "#FFFFFF",
                padding: "1px",
              }}>
                <Image
                  src="/images/company_logo.png"
                  alt="AfterBuild Studio Watermark"
                  width={48}
                  height={44}
                  style={{ width: "100%", height: "100%", objectFit: "contain" }}
                />
              </div>
              <div style={{ display: "flex", flexDirection: "column", lineHeight: 1 }}>
                <span style={{
                  fontFamily: "var(--font-logo), 'Cinzel', serif",
                  fontSize: "9px",
                  fontWeight: 700,
                  letterSpacing: "0.14em",
                  color: "#FFFFFF",
                  textTransform: "uppercase",
                }}>
                  AFTERBUILD
                </span>
                <span style={{
                  fontSize: "7px",
                  letterSpacing: "0.22em",
                  color: "#E5C89C",
                  textTransform: "uppercase",
                  marginTop: "2px",
                }}>
                  STUDIO
                </span>
              </div>
            </div>

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
                onEnded={() => {
                  setIsPlaying(false);
                  setShowCinemaControls(true);
                }}
                onClick={handleCinemaScreenClick}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  cursor: "pointer",
                  display: "block",
                }}
              />
            )}

            {/* Poster fallback image when paused */}
            {!isPlaying && (
              <div
                onClick={toggleCinemaPlay}
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
                    Play 4K Walkthrough
                  </span>
                </div>
              </div>
            )}

            {/* Visual Touch/Click Flash Feedback */}
            {cinemaActionFeedback && (
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: "68px",
                  height: "68px",
                  borderRadius: "50%",
                  background: "rgba(10, 10, 9, 0.75)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(197, 168, 128, 0.5)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--bronze)",
                  pointerEvents: "none",
                  zIndex: 15,
                  animation: "cinemaPulse 0.5s ease-out forwards",
                }}
              >
                {cinemaActionFeedback === "play" ? (
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" style={{ marginLeft: "3px" }}>
                    <path d="M8 5v14l11-7z" />
                  </svg>
                ) : (
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                  </svg>
                )}
              </div>
            )}

            {/* Video Badges Overlay (Top) — Completely hidden while video is PLAYING */}
            <div
              style={{
                position: "absolute",
                top: "20px",
                left: "20px",
                right: "20px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                zIndex: 10,
                pointerEvents: "none",
                opacity: isPlaying ? 0 : 1,
                transform: isPlaying ? "translateY(-14px)" : "translateY(0)",
                transition: "opacity 0.35s cubic-bezier(0.16, 1, 0.3, 1), transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
              }}
            >
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
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  fontSize: "9px",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "#FFFFFF",
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

            {/* Custom Control Bar (Bottom) — Completely hidden while video is PLAYING */}
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                padding: "16px 20px",
                background: "linear-gradient(to top, rgba(10,10,9,0.94) 0%, rgba(10,10,9,0.6) 70%, transparent 100%)",
                display: "flex",
                flexDirection: "column",
                gap: "8px",
                zIndex: 10,
                pointerEvents: isPlaying ? (showCinemaControls ? "auto" : "none") : "auto",
                opacity: isPlaying ? (showCinemaControls ? 1 : 0) : 1,
                transform: isPlaying && !showCinemaControls ? "translateY(14px)" : "translateY(0)",
                transition: "opacity 0.35s cubic-bezier(0.16, 1, 0.3, 1), transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
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
                  background: "rgba(255, 255, 255, 0.25)",
                  cursor: "pointer",
                }}
              />

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "8px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                  <button
                    type="button"
                    onClick={toggleCinemaPlay}
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
                    type="button"
                    onClick={toggleCinemaMute}
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
            background: "var(--surface)",
            border: "1px solid var(--border)",
            boxShadow: "0 4px 18px rgba(20, 19, 18, 0.04)",
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
                fontWeight: 600,
              }}>
                Featured Dossier &bull; {activeProject.category}
              </span>
              <h3 style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.2rem, 2vw, 1.8rem)",
                fontWeight: 500,
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
                      background: "var(--surface-2)",
                      border: "1px solid var(--border)",
                      color: "var(--text-secondary)",
                      fontWeight: 500,
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Inquire about this specific space */}
            <div style={{ display: "flex", flexDirection: "column", gap: "10px", alignItems: "flex-start" }}>
              <span style={{ fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--muted-dark)", fontWeight: 600 }}>
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
                    color: "#FFFFFF",
                    fontSize: "11px",
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    fontWeight: 600,
                    transition: "opacity 0.3s ease",
                    boxShadow: "0 2px 10px rgba(158, 121, 72, 0.3)",
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
                    border: "1px solid var(--border)",
                    color: "var(--text)",
                    fontSize: "11px",
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    transition: "border-color 0.3s ease",
                  }}
                  onMouseEnter={e => ((e.currentTarget as HTMLElement).style.borderColor = "var(--bronze)")}
                  onMouseLeave={e => ((e.currentTarget as HTMLElement).style.borderColor = "var(--border)")}
                >
                  Full Project Gallery
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* 7-Card Selector Grid Below Video — Direct Playable Videos with Watermark */}
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
              fontWeight: 600,
            }}>
              Select Walkthrough ({walkthroughProjects.length} Projects Catalogued)
            </span>
            <span style={{
              fontSize: "10px",
              letterSpacing: "0.15em",
              color: "var(--bronze)",
              fontWeight: 600,
            }}>
              Active: {activeProject.number} / 0{walkthroughProjects.length}
            </span>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "18px",
          }}>
            {walkthroughProjects.map((item, idx) => {
              const isSelected = idx === activeIndex;
              const isCardPlaying = playingCardIndex === idx;
              const isCardControlsVisible = showCardControlsIndex === idx;

              return (
                <div
                  key={item.id}
                  id={`walkthrough-card-${item.id}`}
                  style={{
                    position: "relative",
                    borderRadius: "8px",
                    overflow: "hidden",
                    border: isSelected ? "2px solid var(--bronze)" : "1px solid var(--border)",
                    background: "var(--surface)",
                    boxShadow: isSelected ? "0 8px 24px rgba(20, 19, 18, 0.08)" : "0 2px 8px rgba(20, 19, 18, 0.03)",
                    transition: "all 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
                    transform: isSelected ? "translateY(-3px)" : "none",
                  }}
                  className="walkthrough-card-item"
                >
                  {/* Thumbnail Banner / Video Container */}
                  <div
                    style={{
                      position: "relative",
                      width: "100%",
                      aspectRatio: "16/10",
                      overflow: "hidden",
                      background: "#050505",
                      cursor: "pointer",
                    }}
                    onClick={() => handleCardClick(idx)}
                    onMouseMove={() => isCardPlaying && resetCardControlsTimeout(idx)}
                    onTouchStart={() => isCardPlaying && resetCardControlsTimeout(idx)}
                  >
                    {/* Watermark of Company Logo on Card */}
                    <div
                      style={{
                        position: "absolute",
                        top: "10px",
                        right: "10px",
                        zIndex: 14,
                        pointerEvents: "none",
                        display: "flex",
                        alignItems: "center",
                        gap: "5px",
                        padding: "3px 8px 3px 6px",
                        borderRadius: "5px",
                        background: "rgba(14, 13, 12, 0.72)",
                        backdropFilter: "blur(6px)",
                        border: "1px solid rgba(229, 200, 156, 0.4)",
                      }}
                    >
                      <div style={{ width: "14px", height: "13px", borderRadius: "2px", overflow: "hidden", background: "#FFFFFF", padding: "0.5px" }}>
                        <Image
                          src="/images/company_logo.png"
                          alt="AfterBuild Logo"
                          width={28}
                          height={26}
                          style={{ width: "100%", height: "100%", objectFit: "contain" }}
                        />
                      </div>
                      <span style={{
                        fontFamily: "var(--font-logo), 'Cinzel', serif",
                        fontSize: "7.5px",
                        fontWeight: 700,
                        letterSpacing: "0.12em",
                        color: "#FFFFFF",
                      }}>
                        AB STUDIO
                      </span>
                    </div>

                    {/* If this card is playing, mount active video */}
                    {isCardPlaying ? (
                      <video
                        ref={(el) => {
                          cardVideoRefs.current[idx] = el;
                        }}
                        src={item.videoSrc}
                        poster={item.poster}
                        playsInline
                        autoPlay
                        muted={cardMuted}
                        loop
                        onEnded={() => setPlayingCardIndex(null)}
                        style={{
                          position: "absolute",
                          inset: 0,
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          display: "block",
                        }}
                      />
                    ) : (
                      /* Poster image when NOT playing */
                      <Image
                        src={item.poster}
                        alt={item.title}
                        fill
                        style={{ objectFit: "cover" }}
                      />
                    )}

                    {/* Gradient overlay — HIDES completely while playing so video is clean */}
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        background: isSelected
                          ? "linear-gradient(to top, rgba(12,12,11,0.9) 0%, rgba(12,12,11,0.1) 60%)"
                          : "linear-gradient(to top, rgba(12,12,11,0.95) 0%, rgba(12,12,11,0.4) 60%)",
                        opacity: isCardPlaying ? 0 : 1,
                        pointerEvents: "none",
                        transition: "opacity 0.3s ease",
                      }}
                    />

                    {/* Number badge — HIDES while playing */}
                    <div
                      style={{
                        position: "absolute",
                        top: "10px",
                        left: "10px",
                        padding: "2px 7px",
                        borderRadius: "3px",
                        background: isSelected ? "var(--bronze)" : "rgba(10,10,9,0.75)",
                        color: isSelected ? "#0a0a09" : "#FFFFFF",
                        border: isSelected ? "none" : "1px solid rgba(255, 255, 255, 0.2)",
                        fontSize: "9px",
                        fontWeight: 600,
                        letterSpacing: "0.15em",
                        opacity: isCardPlaying ? 0 : 1,
                        pointerEvents: "none",
                        transition: "opacity 0.3s ease",
                      }}
                    >
                      {item.number}
                    </div>

                    {/* Duration badge — HIDES while playing */}
                    <div
                      style={{
                        position: "absolute",
                        bottom: "10px",
                        right: "10px",
                        padding: "2px 6px",
                        borderRadius: "3px",
                        background: "rgba(0,0,0,0.8)",
                        color: "rgba(243,240,234,0.8)",
                        fontSize: "9px",
                        fontFamily: "monospace",
                        opacity: isCardPlaying ? 0 : 1,
                        pointerEvents: "none",
                        transition: "opacity 0.3s ease",
                      }}
                    >
                      {item.duration}
                    </div>

                    {/* Big Center Play symbol — HIDES completely while playing! */}
                    {!isCardPlaying && (
                      <div
                        style={{
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          transform: "translate(-50%, -50%)",
                          width: "38px",
                          height: "38px",
                          borderRadius: "50%",
                          background: isSelected ? "var(--bronze)" : "rgba(12,12,11,0.75)",
                          color: isSelected ? "#0a0a09" : "#FFFFFF",
                          border: isSelected ? "none" : "1px solid rgba(197, 168, 128, 0.6)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "12px",
                          boxShadow: "0 6px 20px rgba(0,0,0,0.6)",
                          transition: "all 0.3s ease",
                        }}
                        className="play-pulse-btn"
                      >
                        <span style={{ marginLeft: "2px" }}>&#9658;</span>
                      </div>
                    )}

                    {/* While playing: sleek auto-hiding micro-bar that disappears after 2s */}
                    {isCardPlaying && (
                      <div
                        style={{
                          position: "absolute",
                          inset: 0,
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-between",
                          padding: "10px",
                          opacity: isCardControlsVisible ? 1 : 0,
                          pointerEvents: isCardControlsVisible ? "auto" : "none",
                          transition: "opacity 0.35s ease",
                          background: "linear-gradient(to bottom, rgba(10,10,9,0.55) 0%, transparent 40%, rgba(10,10,9,0.6) 100%)",
                        }}
                      >
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <span style={{
                            fontSize: "9px",
                            letterSpacing: "0.15em",
                            textTransform: "uppercase",
                            background: "rgba(10,10,9,0.85)",
                            padding: "2px 8px",
                            borderRadius: "3px",
                            color: "var(--bronze)",
                            border: "1px solid rgba(197,168,128,0.35)",
                          }}>
                            Playing Live
                          </span>

                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setCardMuted(!cardMuted);
                              if (cardVideoRefs.current[idx]) {
                                cardVideoRefs.current[idx]!.muted = !cardMuted;
                              }
                              resetCardControlsTimeout(idx);
                            }}
                            style={{
                              background: "rgba(10,10,9,0.85)",
                              border: "1px solid rgba(255, 255, 255, 0.25)",
                              color: "#FFFFFF",
                              borderRadius: "999px",
                              padding: "4px 8px",
                              fontSize: "10px",
                              cursor: "pointer",
                            }}
                          >
                            {cardMuted ? "🔇 Unmute" : "🔊 Mute"}
                          </button>
                        </div>

                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleCardClick(idx);
                            }}
                            style={{
                              background: "rgba(10,10,9,0.85)",
                              border: "1px solid rgba(197,168,128,0.4)",
                              color: "var(--text)",
                              borderRadius: "4px",
                              padding: "4px 10px",
                              fontSize: "10px",
                              cursor: "pointer",
                              letterSpacing: "0.1em",
                              textTransform: "uppercase",
                            }}
                          >
                            ❚❚ Pause
                          </button>

                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              playInCinemaView(idx);
                            }}
                            style={{
                              background: "var(--bronze)",
                              border: "none",
                              color: "#0a0a09",
                              borderRadius: "4px",
                              padding: "4px 10px",
                              fontSize: "10px",
                              fontWeight: 600,
                              cursor: "pointer",
                              letterSpacing: "0.1em",
                              textTransform: "uppercase",
                            }}
                          >
                            Cinema Screen ↑
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Text details below thumbnail */}
                  <div
                    style={{ padding: "14px 16px" }}
                  >
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
                      fontWeight: isSelected ? 600 : 500,
                      color: "var(--text)",
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
                      marginBottom: "12px",
                    }}>
                      {item.subtitle}
                    </p>

                    {/* Action buttons on the card */}
                    <div style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      paddingTop: "8px",
                      borderTop: "1px solid var(--border)",
                    }}>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCardClick(idx);
                        }}
                        style={{
                          background: isCardPlaying ? "rgba(158, 121, 72, 0.15)" : "transparent",
                          border: isCardPlaying ? "1px solid var(--bronze)" : "1px solid var(--border)",
                          color: isCardPlaying ? "var(--bronze)" : "var(--text)",
                          fontSize: "10px",
                          letterSpacing: "0.14em",
                          textTransform: "uppercase",
                          padding: "5px 12px",
                          borderRadius: "4px",
                          cursor: "pointer",
                          transition: "all 0.25s ease",
                          fontWeight: 500,
                        }}
                      >
                        {isCardPlaying ? "❚❚ Pause Video" : "▶ Play Video"}
                      </button>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          playInCinemaView(idx);
                        }}
                        style={{
                          background: "none",
                          border: "none",
                          color: "var(--bronze)",
                          fontSize: "10px",
                          letterSpacing: "0.12em",
                          textTransform: "uppercase",
                          cursor: "pointer",
                          padding: "4px 0",
                          transition: "opacity 0.2s ease",
                        }}
                        onMouseEnter={e => ((e.currentTarget as HTMLElement).style.opacity = "0.7")}
                        onMouseLeave={e => ((e.currentTarget as HTMLElement).style.opacity = "1")}
                      >
                        Cinema Screen ↑
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      <style jsx>{`
        .play-pulse-btn:hover {
          transform: translate(-50%, -50%) scale(1.1);
          border-color: #fff;
          background: rgba(197, 168, 128, 0.4);
        }
        .walkthrough-card-item:hover {
          border-color: rgba(197, 168, 128, 0.5);
          transform: translateY(-2px);
        }
        @keyframes cinemaPulse {
          0% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.7);
          }
          50% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1.05);
          }
          100% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(1.2);
          }
        }
      `}</style>
    </section>
  );
}
