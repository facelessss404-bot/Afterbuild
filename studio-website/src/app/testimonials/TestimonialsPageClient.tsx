"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  testimonials,
  videoTestimonials,
  testimonialCategories,
  type TestimonialCategory,
} from "@/data/testimonials";
import { siteConfig } from "@/data/site";

gsap.registerPlugin(ScrollTrigger);

export default function TestimonialsPageClient() {
  const pageRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Category filter state
  const [activeFilter, setActiveFilter] = useState<TestimonialCategory>("ALL");

  // Video testimonial playback state
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(122); // 2:02 min
  const [showControls, setShowControls] = useState(true);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const activeVideo = videoTestimonials[0];

  // Filtered testimonials
  const filteredTestimonials = testimonials.filter((t) => {
    if (activeFilter === "ALL") return true;
    if (activeFilter === "Video Reviews") return t.hasVideo;
    return t.category === activeFilter;
  });

  // Entrance animations
  useEffect(() => {
    const page = pageRef.current;
    if (!page) return;

    const ctx = gsap.context(() => {
      // Fade in reveals
      page.querySelectorAll(".reveal-fade").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power4.out",
            scrollTrigger: { trigger: el, start: "top 88%" },
          }
        );
      });

      // Cards staggered entrance
      page.querySelectorAll(".review-card-item").forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 32 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: (i % 3) * 0.1,
            ease: "power3.out",
            scrollTrigger: { trigger: card, start: "top 90%" },
          }
        );
      });
    }, pageRef);

    return () => {
      try {
        ctx.revert();
      } catch (_) {}
    };
  }, [activeFilter]);

  // Video player controls
  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
      setShowControls(true);
    } else {
      videoRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
          resetControlsTimeout();
        })
        .catch(() => {});
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
    resetControlsTimeout();
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!videoRef.current) return;
    const target = parseFloat(e.target.value);
    videoRef.current.currentTime = target;
    setCurrentTime(target);
    resetControlsTimeout();
  };

  const resetControlsTimeout = () => {
    if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    setShowControls(true);
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) {
        setShowControls(false);
      }
    }, 2400);
  };

  const formatSeconds = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  return (
    <div ref={pageRef} style={{ background: "var(--bg)", color: "var(--text)", minHeight: "100vh" }}>

      {/* ── 01. PAGE HERO HEADER ─────────────────────────────────── */}
      <section
        style={{
          paddingTop: "clamp(110px, 15vh, 170px)",
          paddingBottom: "clamp(48px, 7vw, 96px)",
          paddingInline: "var(--gutter)",
          borderBottom: "1px solid var(--border)",
          background: "linear-gradient(180deg, var(--surface) 0%, var(--bg) 100%)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Subtle architectural ambient background glow */}
        <div
          style={{
            position: "absolute",
            top: "-10%",
            right: "5%",
            width: "550px",
            height: "550px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(158, 121, 72, 0.09) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        <div style={{ maxWidth: "var(--max-w)", marginInline: "auto", position: "relative", zIndex: 2 }}>
          
          {/* Overline label */}
          <div className="reveal-fade" style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
            <span style={{ width: "28px", height: "1px", background: "var(--bronze)" }} />
            <span
              style={{
                fontSize: "11px",
                letterSpacing: "0.28em",
                textTransform: "uppercase",
                color: "var(--bronze)",
                fontWeight: 600,
              }}
            >
              Client Endorsements &amp; Proof
            </span>
            <span
              style={{
                fontSize: "10px",
                padding: "2px 8px",
                borderRadius: "4px",
                background: "rgba(158, 121, 72, 0.12)",
                border: "1px solid rgba(158, 121, 72, 0.3)",
                color: "var(--bronze)",
                fontWeight: 600,
              }}
            >
              160+ Handovers
            </span>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: "24px",
            }}
          >
            <div>
              <h1
                className="reveal-fade"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(2.6rem, 6.2vw, 5.8rem)",
                  fontWeight: 400,
                  lineHeight: 0.96,
                  letterSpacing: "-0.025em",
                  textTransform: "uppercase",
                  color: "var(--text)",
                }}
              >
                Voices of <span style={{ color: "var(--bronze)", fontStyle: "italic" }}>Trust</span>
                <br />
                &amp; Handover
              </h1>
              <p
                className="reveal-fade"
                style={{
                  fontSize: "clamp(14px, 1.2vw, 17px)",
                  color: "var(--muted)",
                  maxWidth: "680px",
                  marginTop: "18px",
                  lineHeight: 1.65,
                  fontWeight: 300,
                }}
              >
                Authentic stories, verified room-by-room video walkthrough reviews, and direct feedback from
                Bangalore homeowners who entrusted their architectural and luxury interior dreams to AfterBuild Studio.
              </p>
            </div>

            {/* Trust Metrics Strip */}
            <div
              className="reveal-fade"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: "16px",
                marginTop: "clamp(24px, 3.5vw, 40px)",
                padding: "20px 24px",
                borderRadius: "10px",
                background: "var(--surface)",
                border: "1px solid var(--border)",
                boxShadow: "0 4px 20px rgba(20, 19, 18, 0.04)",
              }}
            >
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <span style={{ fontFamily: "var(--font-display)", fontSize: "28px", color: "var(--text)", fontWeight: 500 }}>
                    5.0
                  </span>
                  <span style={{ color: "var(--bronze)", fontSize: "14px" }}>★★★★★</span>
                </div>
                <span style={{ fontSize: "11px", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--muted-dark)" }}>
                  Google Rating (160+ Reviews)
                </span>
              </div>

              <div>
                <span style={{ fontFamily: "var(--font-display)", fontSize: "28px", color: "var(--text)", fontWeight: 500, display: "block" }}>
                  100%
                </span>
                <span style={{ fontSize: "11px", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--muted-dark)" }}>
                  On-Time Delivery Track Record
                </span>
              </div>

              <div>
                <span style={{ fontFamily: "var(--font-display)", fontSize: "28px", color: "var(--text)", fontWeight: 500, display: "block" }}>
                  75+
                </span>
                <span style={{ fontSize: "11px", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--muted-dark)" }}>
                  Master Artisans Network
                </span>
              </div>

              <div>
                <span style={{ fontFamily: "var(--font-display)", fontSize: "28px", color: "var(--text)", fontWeight: 500, display: "block" }}>
                  10 Yrs
                </span>
                <span style={{ fontSize: "11px", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--muted-dark)" }}>
                  Hardware &amp; Structural Warranty
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 02. FEATURED VIDEO TESTIMONIAL SHOWCASE ──────────────── */}
      <section
        style={{
          paddingBlock: "clamp(64px, 8vw, 110px)",
          paddingInline: "var(--gutter)",
          borderBottom: "1px solid var(--border)",
          background: "var(--bg)",
          position: "relative",
        }}
      >
        <div style={{ maxWidth: "var(--max-w)", marginInline: "auto" }}>
          
          <div className="reveal-fade" style={{ marginBottom: "clamp(24px, 3.5vw, 40px)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
              <span style={{ width: "24px", height: "1px", background: "var(--bronze)" }} />
              <span style={{ fontSize: "10px", letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--bronze)", fontWeight: 600 }}>
                02 / Featured Client Video Walkthrough
              </span>
            </div>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.8rem, 3.5vw, 3rem)",
                fontWeight: 400,
                textTransform: "uppercase",
                letterSpacing: "-0.01em",
                color: "var(--text)",
              }}
            >
              Handover Story &bull;{" "}
              <span style={{ color: "var(--bronze)", fontStyle: "italic" }}>Trifecta Retto</span>
            </h2>
            <p style={{ fontSize: "13px", color: "var(--muted)", maxWidth: "560px", marginTop: "6px" }}>
              Watch the homeowners review their completed 3BHK residence, from bespoke high-gloss modular kitchen
              cabinetry to lighting details and seamless turnkey execution.
            </p>
          </div>

          {/* Video Feature Grid */}
          <div
            className="reveal-fade"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(12, minmax(0, 1fr))",
              gap: "clamp(24px, 3vw, 40px)",
              alignItems: "center",
              borderRadius: "14px",
              background: "#0c0b0a",
              border: "1px solid rgba(158, 121, 72, 0.35)",
              overflow: "hidden",
              boxShadow: "0 24px 64px rgba(10, 10, 9, 0.16)",
            }}
          >
            {/* Left 7 cols: Interactive Video Player */}
            <div
              className="featured-video-container"
              style={{
                gridColumn: "1 / 8",
                position: "relative",
                width: "100%",
                aspectRatio: "16/10",
                background: "#000",
                cursor: "pointer",
                overflow: "hidden",
              }}
              onClick={togglePlay}
              onMouseMove={resetControlsTimeout}
              onTouchStart={resetControlsTimeout}
            >
              {/* Top Watermark / Status Badge */}
              <div
                style={{
                  position: "absolute",
                  top: "16px",
                  left: "16px",
                  zIndex: 10,
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "5px 12px",
                  borderRadius: "6px",
                  background: "rgba(12, 11, 10, 0.8)",
                  backdropFilter: "blur(8px)",
                  border: "1px solid rgba(229, 200, 156, 0.4)",
                  pointerEvents: "none",
                }}
              >
                <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#22c55e" }} />
                <span style={{ fontSize: "9.5px", letterSpacing: "0.18em", textTransform: "uppercase", color: "#E5C89C", fontWeight: 600 }}>
                  Client Video Review
                </span>
              </div>

              <div
                style={{
                  position: "absolute",
                  top: "16px",
                  right: "16px",
                  zIndex: 10,
                  padding: "4px 8px",
                  borderRadius: "4px",
                  background: "rgba(12, 11, 10, 0.8)",
                  backdropFilter: "blur(8px)",
                  fontSize: "9px",
                  letterSpacing: "0.12em",
                  fontFamily: "monospace",
                  color: "#FFFFFF",
                  pointerEvents: "none",
                }}
              >
                {activeVideo.duration}
              </div>

              {/* Video Tag */}
              <video
                ref={videoRef}
                src={activeVideo.videoUrl}
                poster={activeVideo.poster}
                playsInline
                preload="metadata"
                muted={isMuted}
                onTimeUpdate={() => videoRef.current && setCurrentTime(videoRef.current.currentTime)}
                onLoadedMetadata={() => videoRef.current && setDuration(videoRef.current.duration)}
                onEnded={() => {
                  setIsPlaying(false);
                  setShowControls(true);
                }}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
              />

              {/* Poster Overlay with Center Play Pulse */}
              {!isPlaying && (
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(to top, rgba(12, 11, 10, 0.82) 0%, rgba(12, 11, 10, 0.1) 50%, rgba(12, 11, 10, 0.4) 100%)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "14px",
                    zIndex: 8,
                  }}
                >
                  <div
                    style={{
                      width: "68px",
                      height: "68px",
                      borderRadius: "50%",
                      background: "rgba(158, 121, 72, 0.9)",
                      color: "#FFFFFF",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: "0 10px 30px rgba(0, 0, 0, 0.6), 0 0 0 6px rgba(158, 121, 72, 0.25)",
                      transition: "transform 0.3s ease",
                    }}
                  >
                    <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" style={{ marginLeft: "4px" }}>
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                  <span
                    style={{
                      fontSize: "10.5px",
                      letterSpacing: "0.22em",
                      textTransform: "uppercase",
                      color: "#FFFFFF",
                      background: "rgba(0, 0, 0, 0.65)",
                      padding: "4px 14px",
                      borderRadius: "999px",
                      backdropFilter: "blur(8px)",
                      fontWeight: 600,
                    }}
                  >
                    Watch Homeowner Feedback ({activeVideo.duration})
                  </span>
                </div>
              )}

              {/* Video Scrubber & Play Bar */}
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: "12px 18px",
                  background: "linear-gradient(to top, rgba(10, 10, 9, 0.95) 0%, rgba(10, 10, 9, 0.5) 70%, transparent 100%)",
                  display: "flex",
                  flexDirection: "column",
                  gap: "6px",
                  zIndex: 12,
                  opacity: showControls || !isPlaying ? 1 : 0,
                  transform: showControls || !isPlaying ? "translateY(0)" : "translateY(8px)",
                  transition: "opacity 0.3s ease, transform 0.3s ease",
                  pointerEvents: showControls || !isPlaying ? "auto" : "none",
                }}
                onClick={(e) => e.stopPropagation()}
              >
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
                    background: "rgba(255, 255, 255, 0.3)",
                    cursor: "pointer",
                  }}
                />

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <button
                      type="button"
                      onClick={togglePlay}
                      aria-label={isPlaying ? "Pause video" : "Play video"}
                      style={{
                        background: "none",
                        border: "none",
                        color: "#FFFFFF",
                        cursor: "pointer",
                        fontSize: "11px",
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                        padding: "2px",
                      }}
                    >
                      {isPlaying ? "⏸ Pause" : "▶ Play"}
                    </button>

                    <button
                      type="button"
                      onClick={toggleMute}
                      aria-label={isMuted ? "Unmute voice" : "Mute sound"}
                      style={{
                        background: isMuted ? "rgba(239, 68, 68, 0.2)" : "rgba(34, 197, 94, 0.2)",
                        border: `1px solid ${isMuted ? "rgba(239, 68, 68, 0.4)" : "rgba(34, 197, 94, 0.4)"}`,
                        color: "#FFFFFF",
                        cursor: "pointer",
                        fontSize: "10px",
                        letterSpacing: "0.1em",
                        padding: "3px 8px",
                        borderRadius: "4px",
                      }}
                    >
                      {isMuted ? "🔇 Unmute Voice" : "🔊 Sound On"}
                    </button>
                  </div>

                  <span style={{ fontSize: "10px", color: "rgba(255, 255, 255, 0.7)", fontFamily: "monospace" }}>
                    {formatSeconds(currentTime)} / {formatSeconds(duration)}
                  </span>
                </div>
              </div>
            </div>

            {/* Right 5 cols: Story Dossier & Details */}
            <div
              className="featured-video-dossier"
              style={{
                gridColumn: "8 / 13",
                padding: "clamp(24px, 3.5vw, 40px)",
                color: "#FFFFFF",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                <span style={{ fontSize: "13px", color: "var(--bronze)" }}>★★★★★</span>
                <span style={{ fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--bronze)", fontWeight: 600 }}>
                  Turnkey Handover Review
                </span>
              </div>

              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(1.4rem, 2.2vw, 2rem)",
                  fontWeight: 500,
                  lineHeight: 1.2,
                  color: "#FFFFFF",
                  marginBottom: "12px",
                }}
              >
                {activeVideo.quoteTitle}
              </h3>

              <p style={{ fontSize: "13px", color: "rgba(255, 255, 255, 0.78)", lineHeight: 1.7, fontWeight: 300, marginBottom: "20px" }}>
                {activeVideo.quote}
              </p>

              {/* Scope Tags */}
              <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginBottom: "24px" }}>
                {activeVideo.services.map((svc, idx) => (
                  <span
                    key={idx}
                    style={{
                      fontSize: "9.5px",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      padding: "4px 9px",
                      borderRadius: "3px",
                      background: "rgba(255, 255, 255, 0.08)",
                      border: "1px solid rgba(255, 255, 255, 0.15)",
                      color: "rgba(255, 255, 255, 0.85)",
                    }}
                  >
                    {svc}
                  </span>
                ))}
              </div>

              {/* Action Links */}
              <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", alignItems: "center" }}>
                <a
                  href={`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(
                    `Hi Farmaan Azam & AfterBuild Studio team, I watched your client video feedback for "${activeVideo.project}" on the testimonials page and would love to consult for my home.`
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
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    fontWeight: 600,
                    textDecoration: "none",
                    boxShadow: "0 4px 14px rgba(158, 121, 72, 0.4)",
                  }}
                >
                  <span>Inquire for Similar Handover</span>
                  <span>&rarr;</span>
                </a>

                <Link
                  href={`/work/${activeVideo.projectSlug}`}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    padding: "9px 18px",
                    borderRadius: "999px",
                    border: "1px solid rgba(255, 255, 255, 0.25)",
                    color: "#FFFFFF",
                    fontSize: "11px",
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    textDecoration: "none",
                  }}
                >
                  View Full Project Dossier
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 03. FILTERABLE CLIENT REVIEWS ARCHIVE ────────────────── */}
      <section
        style={{
          paddingBlock: "clamp(64px, 8vw, 110px)",
          paddingInline: "var(--gutter)",
          borderBottom: "1px solid var(--border)",
          background: "var(--cream, #e8e3da)",
          color: "#0a0a09",
        }}
      >
        <div style={{ maxWidth: "var(--max-w)", marginInline: "auto" }}>
          
          {/* Header & Filter Tabs */}
          <div
            className="reveal-fade"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              gap: "24px",
              flexWrap: "wrap",
              marginBottom: "clamp(32px, 4vw, 52px)",
              paddingBottom: "20px",
              borderBottom: "1px solid rgba(10, 10, 9, 0.12)",
            }}
          >
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
                <span style={{ width: "24px", height: "1px", background: "var(--bronze)" }} />
                <span style={{ fontSize: "10px", letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--bronze)", fontWeight: 600 }}>
                  03 / Verified Reviews Archive
                </span>
              </div>
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(2rem, 3.8vw, 3.4rem)",
                  fontWeight: 400,
                  textTransform: "uppercase",
                  color: "#0a0a09",
                }}
              >
                Homeowner <span style={{ color: "var(--bronze)", fontStyle: "italic" }}>Stories</span> &amp; Notes
              </h2>
            </div>

            {/* Category Filter Pills */}
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              {testimonialCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  style={{
                    fontSize: "11px",
                    fontWeight: 600,
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    padding: "8px 16px",
                    borderRadius: "4px",
                    border: activeFilter === cat ? "1px solid #0a0a09" : "1px solid rgba(10, 10, 9, 0.15)",
                    background: activeFilter === cat ? "#0a0a09" : "transparent",
                    color: activeFilter === cat ? "#FAF8F5" : "#48433d",
                    cursor: "pointer",
                    transition: "all 0.25s ease",
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Testimonials 3-Column Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "24px",
            }}
          >
            {filteredTestimonials.map((item) => (
              <div
                key={item.id}
                className="review-card-item"
                style={{
                  borderRadius: "10px",
                  background: "#ffffff",
                  border: "1px solid rgba(10, 10, 9, 0.08)",
                  padding: "28px 30px",
                  boxShadow: "0 4px 18px rgba(10, 10, 9, 0.04)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                }}
              >
                <div>
                  {/* Rating + Source Header */}
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
                    <div style={{ display: "flex", gap: "2px", color: "var(--bronze)", fontSize: "13px" }}>
                      {[...Array(item.rating)].map((_, i) => (
                        <span key={i}>★</span>
                      ))}
                    </div>
                    <span
                      style={{
                        fontSize: "9px",
                        letterSpacing: "0.15em",
                        textTransform: "uppercase",
                        padding: "2px 8px",
                        borderRadius: "3px",
                        background: "rgba(158, 121, 72, 0.1)",
                        color: "var(--bronze)",
                        fontWeight: 600,
                      }}
                    >
                      {item.source}
                    </span>
                  </div>

                  {/* Quote */}
                  <blockquote
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "clamp(1.1rem, 1.4vw, 1.35rem)",
                      lineHeight: 1.45,
                      fontStyle: "italic",
                      color: "#1a1918",
                      margin: 0,
                      marginBottom: "20px",
                    }}
                  >
                    &ldquo;{item.quote}&rdquo;
                  </blockquote>

                  {/* Scope Pills */}
                  <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginBottom: "20px" }}>
                    {item.scope.map((tag, sIdx) => (
                      <span
                        key={sIdx}
                        style={{
                          fontSize: "8.5px",
                          letterSpacing: "0.12em",
                          textTransform: "uppercase",
                          padding: "3px 7px",
                          borderRadius: "2px",
                          background: "rgba(10, 10, 9, 0.04)",
                          border: "1px solid rgba(10, 10, 9, 0.08)",
                          color: "#5a554e",
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Author Info & Verified Stamp */}
                <div
                  style={{
                    borderTop: "1px solid rgba(10, 10, 9, 0.08)",
                    paddingTop: "16px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "12px",
                  }}
                >
                  <div>
                    <h4
                      style={{
                        fontSize: "12px",
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                        fontWeight: 700,
                        color: "#0a0a09",
                        marginBottom: "2px",
                      }}
                    >
                      {item.author}
                    </h4>
                    <p style={{ fontSize: "10px", letterSpacing: "0.1em", textTransform: "uppercase", color: "#6b655b" }}>
                      {item.title} &bull; {item.project} ({item.location.split(",")[0]})
                    </p>
                  </div>

                  {item.hasVideo && (
                    <Link
                      href="/#walkthroughs"
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "4px",
                        fontSize: "9px",
                        letterSpacing: "0.14em",
                        textTransform: "uppercase",
                        color: "var(--bronze)",
                        fontWeight: 600,
                        textDecoration: "none",
                      }}
                    >
                      <span>▶ Video</span>
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>

          {filteredTestimonials.length === 0 && (
            <div style={{ padding: "64px 0", textAlign: "center" }}>
              <p style={{ fontSize: "13px", color: "var(--muted)" }}>
                No reviews found in this category.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ── 04. FOUR CLIENT COMMITMENTS ─────────────────────────── */}
      <section
        style={{
          paddingBlock: "clamp(64px, 8vw, 110px)",
          paddingInline: "var(--gutter)",
          borderBottom: "1px solid var(--border)",
          background: "var(--bg)",
        }}
      >
        <div style={{ maxWidth: "var(--max-w)", marginInline: "auto" }}>
          
          <div className="reveal-fade" style={{ marginBottom: "clamp(28px, 4vw, 48px)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
              <span style={{ width: "24px", height: "1px", background: "var(--bronze)" }} />
              <span style={{ fontSize: "10px", letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--bronze)", fontWeight: 600 }}>
                04 / The AfterBuild Standard
              </span>
            </div>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2rem, 4vw, 3.4rem)",
                fontWeight: 400,
                textTransform: "uppercase",
                letterSpacing: "-0.01em",
                color: "var(--text)",
              }}
            >
              Why Homeowners <span style={{ color: "var(--bronze)", fontStyle: "italic" }}>Trust Us</span>
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "24px",
            }}
          >
            {[
              {
                num: "01",
                title: "Zero Hidden Escalations",
                desc: "Every material specification, brand grade, and finish tolerance is locked before construction begins. You never receive unbudgeted surprise invoices.",
              },
              {
                num: "02",
                title: "Factory-Direct Precision",
                desc: "Bespoke modular joinery engineered with German computerized machinery and finished by our network of 75+ master artisans across Bangalore.",
              },
              {
                num: "03",
                title: "Contractual Timeline Guarantee",
                desc: "We operate with strict penalty-backed delivery deadlines. Daily WhatsApp photo and video log updates keep you informed every step of the journey.",
              },
              {
                num: "04",
                title: "10-Year Post-Handover Care",
                desc: "Complete structural, joinery, and hinge warranty accompanied by bi-annual complimentary maintenance checkups for enduring peace of mind.",
              },
            ].map((pillar) => (
              <div
                key={pillar.num}
                className="reveal-fade"
                style={{
                  padding: "32px 28px",
                  borderRadius: "10px",
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  boxShadow: "0 2px 12px rgba(20, 19, 18, 0.03)",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "24px",
                    color: "var(--bronze)",
                    fontWeight: 400,
                    display: "block",
                    marginBottom: "12px",
                  }}
                >
                  {pillar.num}
                </span>
                <h3
                  style={{
                    fontSize: "14px",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    fontWeight: 600,
                    color: "var(--text)",
                    marginBottom: "8px",
                  }}
                >
                  {pillar.title}
                </h3>
                <p style={{ fontSize: "12.5px", color: "var(--muted)", lineHeight: 1.6, fontWeight: 300 }}>
                  {pillar.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 05. CALL TO ACTION ───────────────────────────────────── */}
      <section
        style={{
          paddingBlock: "clamp(80px, 10vw, 140px)",
          paddingInline: "var(--gutter)",
          background: "linear-gradient(180deg, var(--bg) 0%, var(--surface-2) 100%)",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: "680px", marginInline: "auto" }}>
          <span
            style={{
              fontSize: "10px",
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: "var(--bronze)",
              fontWeight: 600,
              display: "block",
              marginBottom: "12px",
            }}
          >
            Begin Your Spatial Journey
          </span>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.2rem, 5vw, 4.2rem)",
              fontWeight: 400,
              lineHeight: 1.05,
              textTransform: "uppercase",
              color: "var(--text)",
              marginBottom: "16px",
            }}
          >
            Ready to Build Your <span style={{ color: "var(--bronze)", fontStyle: "italic" }}>Sanctuary?</span>
          </h2>
          <p style={{ fontSize: "14px", color: "var(--muted)", lineHeight: 1.65, fontWeight: 300, marginBottom: "32px" }}>
            Join 160+ Bangalore families who transformed their residences with architectural precision and timeless bespoke interiors.
          </p>

          <div style={{ display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" }}>
            <a
              href={`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(
                "Hi Farmaan Azam & AfterBuild Studio team, I explored your client testimonials and would love to schedule a consultation for my home."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "12px 28px",
                borderRadius: "999px",
                background: "var(--bronze)",
                color: "#FFFFFF",
                fontSize: "11px",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                fontWeight: 600,
                textDecoration: "none",
                boxShadow: "0 6px 20px rgba(158, 121, 72, 0.35)",
              }}
            >
              <span>Schedule WhatsApp Consultation</span>
              <span>&rarr;</span>
            </a>

            <Link
              href="/contact"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                padding: "11px 24px",
                borderRadius: "999px",
                border: "1px solid var(--border)",
                color: "var(--text)",
                fontSize: "11px",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                textDecoration: "none",
              }}
            >
              Direct Studio Contact
            </Link>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 900px) {
          .featured-video-container {
            grid-column: 1 / -1 !important;
          }
          .featured-video-dossier {
            grid-column: 1 / -1 !important;
          }
        }
      `}</style>
    </div>
  );
}
