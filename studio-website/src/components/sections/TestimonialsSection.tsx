"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { testimonials, videoTestimonials } from "@/data/testimonials";
import { siteConfig } from "@/data/site";

gsap.registerPlugin(ScrollTrigger);

export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Written testimonials state
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const totalTestimonials = testimonials.length;

  // Video testimonial player state
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(122); // 2:02 min default
  const [showVideoControls, setShowVideoControls] = useState(true);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const activeVideo = videoTestimonials[0];
  const currentQuote = testimonials[activeTestimonial];

  const nextTestimonial = () => setActiveTestimonial((p) => (p + 1) % totalTestimonials);
  const prevTestimonial = () => setActiveTestimonial((p) => (p - 1 + totalTestimonials) % totalTestimonials);

  // GSAP Reveal Animation
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        section.querySelectorAll(".test-reveal"),
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power4.out",
          scrollTrigger: { trigger: section, start: "top 78%" },
        }
      );
    }, sectionRef);
    return () => {
      try {
        ctx.revert();
      } catch (_) {}
    };
  }, []);

  // Video playback handlers
  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isVideoPlaying) {
      videoRef.current.pause();
      setIsVideoPlaying(false);
      setShowVideoControls(true);
    } else {
      videoRef.current
        .play()
        .then(() => {
          setIsVideoPlaying(true);
          resetControlsTimeout();
        })
        .catch(() => {});
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isVideoMuted;
    setIsVideoMuted(!isVideoMuted);
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
    setShowVideoControls(true);
    controlsTimeoutRef.current = setTimeout(() => {
      if (isVideoPlaying) {
        setShowVideoControls(false);
      }
    }, 2500);
  };

  const formatSeconds = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  return (
    <section
      ref={sectionRef}
      id="section-testimonials"
      style={{
        background: "var(--cream, #e8e3da)",
        paddingBlock: "clamp(80px, 9vw, 130px)",
        paddingInline: "var(--gutter)",
        borderTop: "1px solid rgba(10, 10, 9, 0.1)",
        position: "relative",
        overflow: "hidden",
      }}
      aria-label="Client Video Testimonials and Reviews"
    >
      <div style={{ maxWidth: "var(--max-w)", marginInline: "auto", width: "100%" }}>
        
        {/* Section Header */}
        <div
          className="test-reveal"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            gap: "24px",
            flexWrap: "wrap",
            marginBottom: "clamp(36px, 5vw, 60px)",
            paddingBottom: "24px",
            borderBottom: "1px solid rgba(10, 10, 9, 0.12)",
          }}
        >
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "10px" }}>
              <span style={{ width: "32px", height: "1px", background: "var(--bronze)" }} />
              <span
                style={{
                  fontSize: "11px",
                  letterSpacing: "0.26em",
                  textTransform: "uppercase",
                  color: "var(--bronze)",
                  fontWeight: 600,
                }}
              >
                07 / Verified Client Voices
              </span>
            </div>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2rem, 4.2vw, 3.8rem)",
                fontWeight: 400,
                lineHeight: 1.05,
                letterSpacing: "-0.02em",
                textTransform: "uppercase",
                color: "#0a0a09",
              }}
            >
              Client Feedback &amp;{" "}
              <span style={{ color: "var(--bronze)", fontStyle: "italic" }}>Testimonials</span>
            </h2>
            <p
              style={{
                fontSize: "clamp(13px, 1.1vw, 15px)",
                color: "#544f47",
                maxWidth: "600px",
                marginTop: "10px",
                lineHeight: 1.6,
                fontWeight: 300,
              }}
            >
              Watch genuine video walkthrough feedback from our completed handovers and read verified reviews from
              homeowners who entrusted their spaces to AfterBuild Studio.
            </p>
          </div>

          {/* Social Proof Trust Badge */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              padding: "12px 20px",
              borderRadius: "8px",
              background: "#ffffff",
              border: "1px solid rgba(10, 10, 9, 0.1)",
              boxShadow: "0 4px 18px rgba(10, 10, 9, 0.04)",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "4px", color: "var(--bronze)" }}>
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span style={{ fontSize: "12px", fontWeight: 700, color: "#0a0a09", marginLeft: "4px" }}>
                  5.0 / 5.0
                </span>
              </div>
              <span style={{ fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase", color: "#6b655b", marginTop: "2px" }}>
                160+ Completed Handovers
              </span>
            </div>
            <div style={{ width: "1px", height: "28px", background: "rgba(10, 10, 9, 0.12)" }} />
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#16a34a", display: "inline-block" }} />
              <span style={{ fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 600, color: "#0a0a09" }}>
                100% On-Time Delivery
              </span>
            </div>
          </div>
        </div>

        {/* Dual-Column Grid: Video Testimonial Column (Left) + Written Reviews Dossier (Right) */}
        <div className="testimonials-dual-grid">

          {/* ── COLUMN 1: Real Client Video Testimonial ── */}
          <div className="test-reveal test-video-column">
            <div
              style={{
                borderRadius: "12px",
                background: "#0d0c0b",
                border: "1px solid rgba(158, 121, 72, 0.35)",
                overflow: "hidden",
                boxShadow: "0 16px 48px rgba(10, 10, 9, 0.14)",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {/* Video Player Box */}
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  aspectRatio: "16/10",
                  background: "#000000",
                  overflow: "hidden",
                  cursor: "pointer",
                }}
                onClick={togglePlay}
                onMouseMove={resetControlsTimeout}
                onTouchStart={resetControlsTimeout}
              >
                {/* Brand watermark badge */}
                <div
                  style={{
                    position: "absolute",
                    top: "14px",
                    left: "14px",
                    zIndex: 10,
                    pointerEvents: "none",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "4px 10px",
                    borderRadius: "6px",
                    background: "rgba(12, 11, 10, 0.78)",
                    backdropFilter: "blur(8px)",
                    border: "1px solid rgba(229, 200, 156, 0.4)",
                  }}
                >
                  <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#22c55e" }} />
                  <span
                    style={{
                      fontSize: "9px",
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      color: "#E5C89C",
                      fontWeight: 600,
                    }}
                  >
                    Client Video Review
                  </span>
                </div>

                {/* Duration Badge */}
                <div
                  style={{
                    position: "absolute",
                    top: "14px",
                    right: "14px",
                    zIndex: 10,
                    pointerEvents: "none",
                    padding: "4px 8px",
                    borderRadius: "4px",
                    background: "rgba(12, 11, 10, 0.8)",
                    backdropFilter: "blur(8px)",
                    fontSize: "9px",
                    letterSpacing: "0.12em",
                    fontFamily: "monospace",
                    color: "#FFFFFF",
                  }}
                >
                  {activeVideo.duration}
                </div>

                {/* Video Element */}
                <video
                  ref={videoRef}
                  src={activeVideo.videoUrl}
                  poster={activeVideo.poster}
                  playsInline
                  preload="metadata"
                  muted={isVideoMuted}
                  onTimeUpdate={() => videoRef.current && setCurrentTime(videoRef.current.currentTime)}
                  onLoadedMetadata={() => videoRef.current && setDuration(videoRef.current.duration)}
                  onEnded={() => {
                    setIsVideoPlaying(false);
                    setShowVideoControls(true);
                  }}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                  }}
                />

                {/* Paused Poster + Big Center Play Button */}
                {!isVideoPlaying && (
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: "linear-gradient(to top, rgba(12, 11, 10, 0.82) 0%, rgba(12, 11, 10, 0.15) 50%, rgba(12, 11, 10, 0.45) 100%)",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "12px",
                      zIndex: 8,
                    }}
                  >
                    <div
                      style={{
                        width: "64px",
                        height: "64px",
                        borderRadius: "50%",
                        background: "rgba(158, 121, 72, 0.9)",
                        color: "#FFFFFF",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: "0 8px 30px rgba(0, 0, 0, 0.6), 0 0 0 6px rgba(158, 121, 72, 0.25)",
                        transition: "transform 0.3s ease, background 0.3s ease",
                      }}
                    >
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" style={{ marginLeft: "3px" }}>
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                    <span
                      style={{
                        fontSize: "10px",
                        letterSpacing: "0.22em",
                        textTransform: "uppercase",
                        color: "#FFFFFF",
                        background: "rgba(0, 0, 0, 0.6)",
                        padding: "4px 12px",
                        borderRadius: "999px",
                        backdropFilter: "blur(6px)",
                        fontWeight: 600,
                      }}
                    >
                      Watch Client Feedback ({activeVideo.duration})
                    </span>
                  </div>
                )}

                {/* Video Controls Bar */}
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: "12px 16px",
                    background: "linear-gradient(to top, rgba(10, 10, 9, 0.95) 0%, rgba(10, 10, 9, 0.5) 70%, transparent 100%)",
                    display: "flex",
                    flexDirection: "column",
                    gap: "6px",
                    zIndex: 12,
                    opacity: showVideoControls || !isVideoPlaying ? 1 : 0,
                    transform: showVideoControls || !isVideoPlaying ? "translateY(0)" : "translateY(8px)",
                    transition: "opacity 0.3s ease, transform 0.3s ease",
                    pointerEvents: showVideoControls || !isVideoPlaying ? "auto" : "none",
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
                        aria-label={isVideoPlaying ? "Pause video" : "Play video"}
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
                        {isVideoPlaying ? "⏸ Pause" : "▶ Play"}
                      </button>

                      <button
                        type="button"
                        onClick={toggleMute}
                        aria-label={isVideoMuted ? "Unmute sound" : "Mute sound"}
                        style={{
                          background: isVideoMuted ? "rgba(239, 68, 68, 0.2)" : "rgba(34, 197, 94, 0.2)",
                          border: `1px solid ${isVideoMuted ? "rgba(239, 68, 68, 0.4)" : "rgba(34, 197, 94, 0.4)"}`,
                          color: "#FFFFFF",
                          cursor: "pointer",
                          fontSize: "10px",
                          letterSpacing: "0.1em",
                          padding: "3px 8px",
                          borderRadius: "4px",
                        }}
                      >
                        {isVideoMuted ? "🔇 Unmute Voice" : "🔊 Sound On"}
                      </button>
                    </div>

                    <span style={{ fontSize: "10px", color: "rgba(255, 255, 255, 0.7)", fontFamily: "monospace" }}>
                      {formatSeconds(currentTime)} / {formatSeconds(duration)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Video Meta & Client Narrative Card */}
              <div style={{ padding: "24px 26px", color: "#FFFFFF" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px", marginBottom: "8px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{ fontSize: "12px", color: "var(--bronze)" }}>★★★★★</span>
                    <span style={{ fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--bronze)", fontWeight: 600 }}>
                      {activeVideo.project} Handover
                    </span>
                  </div>
                  <span
                    style={{
                      fontSize: "9px",
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      color: "rgba(255, 255, 255, 0.6)",
                      border: "1px solid rgba(255, 255, 255, 0.15)",
                      padding: "2px 8px",
                      borderRadius: "3px",
                    }}
                  >
                    {activeVideo.role}
                  </span>
                </div>

                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(1.2rem, 1.8vw, 1.5rem)",
                    fontWeight: 500,
                    lineHeight: 1.25,
                    color: "#FFFFFF",
                    marginBottom: "10px",
                  }}
                >
                  {activeVideo.quoteTitle}
                </h3>

                <p style={{ fontSize: "13px", color: "rgba(255, 255, 255, 0.75)", lineHeight: 1.65, fontWeight: 300, marginBottom: "16px" }}>
                  {activeVideo.quote}
                </p>

                {/* Handover Scope tags */}
                <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginBottom: "18px" }}>
                  {activeVideo.services.map((tag, idx) => (
                    <span
                      key={idx}
                      style={{
                        fontSize: "9px",
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                        padding: "3px 8px",
                        borderRadius: "3px",
                        background: "rgba(255, 255, 255, 0.06)",
                        border: "1px solid rgba(255, 255, 255, 0.12)",
                        color: "rgba(255, 255, 255, 0.8)",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Quick Action: Inquire for similar space */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px", borderTop: "1px solid rgba(255, 255, 255, 0.1)", paddingTop: "14px" }}>
                  <span style={{ fontSize: "11px", color: "rgba(255, 255, 255, 0.6)" }}>
                    Client: <strong style={{ color: "#FFFFFF" }}>{activeVideo.client}</strong>
                  </span>
                  <a
                    href={`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(
                      `Hi Farmaan Azam & AfterBuild Studio team, I watched your client video feedback for "${activeVideo.project}" and would love to discuss a turnkey design for my space.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                      fontSize: "10px",
                      letterSpacing: "0.16em",
                      textTransform: "uppercase",
                      color: "var(--bronze)",
                      fontWeight: 600,
                      textDecoration: "none",
                      transition: "opacity 0.2s ease",
                    }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = "0.8")}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = "1")}
                  >
                    <span>Inquire Like This</span>
                    <span>→</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* ── COLUMN 2: Written Homeowner Reviews & Quotes ── */}
          <div className="test-reveal test-quotes-column">
            <div
              style={{
                borderRadius: "12px",
                background: "#ffffff",
                border: "1px solid rgba(10, 10, 9, 0.1)",
                padding: "clamp(28px, 4vw, 44px)",
                boxShadow: "0 10px 36px rgba(10, 10, 9, 0.05)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                height: "100%",
                minHeight: "440px",
              }}
            >
              <div>
                {/* Header label in column */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
                  <span
                    style={{
                      fontSize: "10px",
                      letterSpacing: "0.22em",
                      textTransform: "uppercase",
                      color: "var(--bronze)",
                      fontWeight: 600,
                    }}
                  >
                    Homeowner Reviews &bull; {currentQuote.project}
                  </span>
                  <span
                    style={{
                      fontSize: "9px",
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      padding: "2px 8px",
                      borderRadius: "3px",
                      background: "rgba(158, 121, 72, 0.1)",
                      color: "var(--bronze)",
                      fontWeight: 600,
                    }}
                  >
                    {currentQuote.source || "Google Review"}
                  </span>
                </div>

                {/* Decorative Quotation Mark */}
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(3.5rem, 6vw, 6rem)",
                    lineHeight: 0.6,
                    color: "rgba(10, 10, 9, 0.12)",
                    marginBottom: "16px",
                  }}
                >
                  &ldquo;
                </div>

                {/* Quote Text */}
                <div style={{ minHeight: "150px", marginBottom: "28px" }}>
                  <blockquote
                    key={activeTestimonial}
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "clamp(1.15rem, 2vw, 1.7rem)",
                      fontWeight: 400,
                      lineHeight: 1.35,
                      color: "#0a0a09",
                      fontStyle: "italic",
                      margin: 0,
                      padding: 0,
                      animation: "fadeUp 0.4s ease forwards",
                    }}
                  >
                    {currentQuote.quote}
                  </blockquote>
                </div>
              </div>

              {/* Author Footer & Carousel Navigation */}
              <div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingTop: "20px",
                    borderTop: "1px solid rgba(10, 10, 9, 0.1)",
                    flexWrap: "wrap",
                    gap: "16px",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <div
                      style={{
                        width: "38px",
                        height: "38px",
                        borderRadius: "50%",
                        background: "rgba(158, 121, 72, 0.12)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "14px",
                        color: "var(--bronze)",
                        fontWeight: 600,
                      }}
                    >
                      ◆
                    </div>
                    <div>
                      <p
                        style={{
                          fontSize: "12px",
                          letterSpacing: "0.12em",
                          textTransform: "uppercase",
                          color: "#0a0a09",
                          fontWeight: 600,
                          marginBottom: "2px",
                        }}
                      >
                        {currentQuote.author}
                      </p>
                      <p
                        style={{
                          fontSize: "10.5px",
                          letterSpacing: "0.1em",
                          color: "#6b655b",
                          textTransform: "uppercase",
                        }}
                      >
                        {currentQuote.title} &bull; {currentQuote.project}
                      </p>
                    </div>
                  </div>

                  {/* Navigation Controls */}
                  <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                    <span style={{ fontSize: "11px", letterSpacing: "0.15em", color: "#4a453f", fontWeight: 600, fontFamily: "monospace" }}>
                      {String(activeTestimonial + 1).padStart(2, "0")} / {String(totalTestimonials).padStart(2, "0")}
                    </span>

                    {/* Progress line */}
                    <div
                      style={{
                        width: "60px",
                        height: "2px",
                        background: "rgba(10, 10, 9, 0.15)",
                        position: "relative",
                        borderRadius: "1px",
                        overflow: "hidden",
                      }}
                    >
                      <div
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          height: "100%",
                          width: `${((activeTestimonial + 1) / totalTestimonials) * 100}%`,
                          background: "var(--bronze)",
                          transition: "width 0.4s ease",
                        }}
                      />
                    </div>

                    {/* Arrows */}
                    <div style={{ display: "flex", gap: "6px" }}>
                      <button
                        type="button"
                        onClick={prevTestimonial}
                        aria-label="Previous testimonial"
                        style={{
                          width: "34px",
                          height: "34px",
                          borderRadius: "4px",
                          border: "1px solid rgba(10, 10, 9, 0.18)",
                          background: "transparent",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          cursor: "pointer",
                          fontSize: "14px",
                          color: "#0a0a09",
                          transition: "background 0.25s ease, border-color 0.25s ease",
                        }}
                        onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "rgba(10, 10, 9, 0.06)")}
                        onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "transparent")}
                      >
                        ←
                      </button>
                      <button
                        type="button"
                        onClick={nextTestimonial}
                        aria-label="Next testimonial"
                        style={{
                          width: "34px",
                          height: "34px",
                          borderRadius: "4px",
                          border: "1px solid rgba(10, 10, 9, 0.18)",
                          background: "transparent",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          cursor: "pointer",
                          fontSize: "14px",
                          color: "#0a0a09",
                          transition: "background 0.25s ease, border-color 0.25s ease",
                        }}
                        onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "rgba(10, 10, 9, 0.06)")}
                        onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "transparent")}
                      >
                        →
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .testimonials-dual-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(24px, 3.5vw, 40px);
          align-items: stretch;
        }

        @media (max-width: 980px) {
          .testimonials-dual-grid {
            grid-template-columns: 1fr !important;
          }
        }

        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}
