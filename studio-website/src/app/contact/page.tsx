"use client";

import { useState } from "react";
import Image from "next/image";
import { siteConfig, getDirectionsUrl } from "@/data/site";

type FormState = "idle" | "loading" | "success" | "error";

// ── Form field style ──────────────────────────────────────────
const fieldStyle: React.CSSProperties = {
  width: "100%",
  background: "transparent",
  border: "none",
  borderBottom: "1px solid rgba(243,240,234,0.12)",
  padding: "12px 0",
  fontSize: "var(--text-sm)",
  color: "var(--text)",
  outline: "none",
  transition: "border-color 0.3s ease",
  fontFamily: "var(--font-sans)",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: "9px",
  letterSpacing: "0.28em",
  textTransform: "uppercase",
  color: "rgba(243,240,234,0.35)",
  marginBottom: "6px",
};

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    category: "Residential Curation or Luxury Villa",
    details: "",
  });
  const [state, setState] = useState<FormState>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [focused, setFocused] = useState<string | null>(null);

  const validate = () => {
    const err: Record<string, string> = {};
    if (!form.name.trim()) err.name = "Full name is required";
    if (!form.email.trim()) err.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) err.email = "Enter a valid email";
    if (!form.details.trim()) err.details = "Please describe your project";
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setState("loading");
    try {
      const formData = new URLSearchParams();
      formData.append("form-name", "contact");
      formData.append("name", form.name);
      formData.append("email", form.email);
      formData.append("phone", form.phone);
      formData.append("category", form.category);
      formData.append("details", form.details);

      const res = await fetch("/__forms.html", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: formData.toString(),
      });

      if (res.ok) {
        setState("success");
      } else {
        setState("error");
      }
    } catch {
      setState("error");
    }
  };

  const mapEmbedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(
    siteConfig.contact.address
  )}&t=&z=16&ie=UTF8&iwloc=&output=embed`;

  const directionsLink = getDirectionsUrl(siteConfig.contact.address);

  return (
    <div style={{ background: "var(--bg)", color: "var(--text)", minHeight: "100vh" }}>

      {/* ── 01. HERO ─────────────────────────────────────────── */}
      <section style={{
        paddingTop: "clamp(100px, 14vh, 160px)",
        paddingBottom: "clamp(48px, 7vw, 96px)",
        paddingInline: "var(--gutter)",
        borderBottom: "1px solid var(--border)",
      }}>
        <div style={{ maxWidth: "var(--max-w)", marginInline: "auto", width: "100%" }}>

          {/* Label */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "clamp(24px, 4vw, 48px)" }}>
            <span style={{ width: "24px", height: "1px", background: "var(--bronze)" }} />
            <span style={{ fontSize: "10px", letterSpacing: "0.28em", textTransform: "uppercase" as const, color: "var(--bronze)" }}>
              Get In Touch
            </span>
          </div>

          {/* 12-col hero grid with responsive classes */}
          <div className="contact-hero-grid">
            {/* Left: headline */}
            <div className="contact-hero-left">
              <h1 style={{
                fontFamily: "var(--font-display)",
                fontSize: "var(--text-4xl)",
                fontWeight: 400,
                lineHeight: 0.92,
                letterSpacing: "-0.02em",
                color: "var(--text)",
                textTransform: "uppercase",
                marginBottom: "clamp(20px, 3vw, 36px)",
              }}>
                Let's Create<br />
                <em style={{ color: "rgba(243,240,234,0.3)", fontStyle: "italic" }}>Together</em>
              </h1>
              <p style={{
                fontSize: "var(--text-base)",
                color: "var(--muted)",
                lineHeight: 1.75,
                maxWidth: "480px",
              }}>
                Whether you want to build a modern dream residence or consult on
                commercial spatial curation, our designers are ready to translate
                your ideas into habitable art.
              </p>
            </div>

            {/* Right: portrait image */}
            <div className="contact-hero-img">
              <Image
                src="/images/projects/sbr-horizon/hero.jpg"
                alt="AfterBuild Studio Interior Design"
                fill
                priority
                style={{ objectFit: "cover" }}
                sizes="(max-width: 900px) 100vw, 42vw"
              />
              <div style={{
                position: "absolute", inset: 0,
                background: "linear-gradient(to top, rgba(10,10,9,0.5) 0%, transparent 60%)",
              }} />
            </div>
          </div>
        </div>
      </section>

      {/* ── 02. MAIN CONTENT (STUDIO INFO + MAP + FORM) ────── */}
      <section style={{
        paddingBlock: "var(--space-md)",
        paddingInline: "var(--gutter)",
      }}>
        <div style={{ maxWidth: "var(--max-w)", marginInline: "auto", width: "100%" }}>
          <div className="contact-layout-grid">

            {/* ── Block A: Studio information ── */}
            <div className="contact-info-block">
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "clamp(24px, 3vw, 40px)" }}>
                <span style={{ width: "24px", height: "1px", background: "var(--bronze)" }} />
                <span style={{ fontSize: "10px", letterSpacing: "0.28em", textTransform: "uppercase" as const, color: "var(--bronze)" }}>
                  Studio Information
                </span>
              </div>

              {/* Exact Address block */}
              <div style={{ marginBottom: "clamp(28px, 3.5vw, 44px)", paddingBottom: "clamp(24px, 3vw, 36px)", borderBottom: "1px solid var(--border)" }}>
                <span style={{ fontSize: "9px", letterSpacing: "0.25em", textTransform: "uppercase" as const, color: "var(--muted-dark)", display: "block", marginBottom: "10px" }}>
                  Location & Address
                </span>
                <h2 style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(1.3rem, 2vw, 1.8rem)",
                  fontWeight: 400,
                  color: "var(--text)",
                  marginBottom: "12px",
                  lineHeight: 1.2,
                }}>
                  {siteConfig.name}
                </h2>
                <address style={{
                  fontStyle: "normal",
                  fontSize: "var(--text-sm)",
                  color: "var(--muted)",
                  lineHeight: 1.85,
                  marginBottom: "16px",
                  maxWidth: "420px",
                }}>
                  {siteConfig.address.line1}<br />
                  {siteConfig.address.line2}<br />
                  {siteConfig.address.line3}<br />
                  {siteConfig.address.city}, {siteConfig.address.state} — {siteConfig.address.pin}
                </address>
                <a
                  href={directionsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    fontSize: "10px",
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: "var(--bronze)",
                    borderBottom: "1px solid rgba(177,166,150,0.35)",
                    paddingBottom: "2px",
                    transition: "border-color 0.3s ease",
                  }}
                  onMouseEnter={e => ((e.currentTarget as HTMLElement).style.borderColor = "var(--bronze)")}
                  onMouseLeave={e => ((e.currentTarget as HTMLElement).style.borderColor = "rgba(177,166,150,0.35)")}
                >
                  Get Directions ↗
                </a>
              </div>

              {/* Contact info block */}
              <div style={{ marginBottom: "clamp(28px, 3.5vw, 44px)", paddingBottom: "clamp(24px, 3vw, 36px)", borderBottom: "1px solid var(--border)" }}>
                <span style={{ fontSize: "9px", letterSpacing: "0.25em", textTransform: "uppercase" as const, color: "var(--muted-dark)", display: "block", marginBottom: "10px" }}>
                  Direct Inquiries
                </span>
                <div style={{ marginBottom: "16px" }}>
                  <a href={`mailto:${siteConfig.email}`} style={{
                    fontSize: "var(--text-sm)",
                    color: "var(--text)",
                    display: "block",
                    marginBottom: "8px",
                    transition: "color 0.3s ease",
                  }}
                    onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = "var(--bronze)")}
                    onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = "var(--text)")}
                  >
                    {siteConfig.email}
                  </a>
                  <a href={`tel:${siteConfig.phone.replace(/\s+/g, '')}`} style={{
                    fontSize: "var(--text-sm)",
                    color: "var(--text-secondary)",
                    display: "block",
                    marginBottom: "4px",
                    transition: "color 0.3s ease",
                  }}
                    onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = "var(--text)")}
                    onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = "var(--text-secondary)")}
                  >
                    {siteConfig.phone}
                  </a>
                  {siteConfig.secondaryPhone && (
                    <a href={`tel:${siteConfig.secondaryPhone.replace(/\s+/g, '')}`} style={{
                      fontSize: "var(--text-sm)",
                      color: "var(--muted)",
                      display: "block",
                      transition: "color 0.3s ease",
                    }}
                      onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = "var(--text)")}
                      onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = "var(--muted)")}
                    >
                      {siteConfig.secondaryPhone}
                    </a>
                  )}
                </div>
                <a
                  href={`https://wa.me/${siteConfig.whatsapp}?text=Hi%20${encodeURIComponent(siteConfig.name)}%2C%20I%20would%20like%20to%20discuss%20a%20project.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    fontSize: "10px",
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: "#25D366",
                    borderBottom: "1px solid rgba(37,211,102,0.3)",
                    paddingBottom: "2px",
                  }}
                >
                  Chat on WhatsApp →
                </a>
              </div>

              {/* Operating Hours */}
              <div>
                <span style={{ fontSize: "9px", letterSpacing: "0.25em", textTransform: "uppercase" as const, color: "var(--muted-dark)", display: "block", marginBottom: "10px" }}>
                  Studio Hours
                </span>
                <p style={{ fontSize: "var(--text-sm)", color: "var(--muted)", lineHeight: 1.8 }}>
                  {siteConfig.hours}<br />
                  <span style={{ color: "var(--muted-dark)" }}>{siteConfig.hoursNote}</span>
                </p>
              </div>
            </div>

            {/* ── Block B: Interactive Google Map ── */}
            <div className="contact-map-block">
              <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "16px",
                flexWrap: "wrap",
                gap: "12px",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <span style={{ width: "16px", height: "1px", background: "var(--bronze)" }} />
                  <span style={{ fontSize: "9px", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--bronze)" }}>
                    Interactive Studio Map
                  </span>
                </div>
                <a
                  href={directionsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontSize: "10px",
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: "var(--text)",
                    border: "1px solid var(--border)",
                    padding: "8px 16px",
                    transition: "border-color 0.3s ease, background 0.3s ease",
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = "var(--bronze)";
                    (e.currentTarget as HTMLElement).style.color = "var(--bronze)";
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
                    (e.currentTarget as HTMLElement).style.color = "var(--text)";
                  }}
                >
                  Get Directions ↗
                </a>
              </div>

              {/* Map Container: 100% width, responsive height, no half-box crop */}
              <div className="map-frame-container">
                <iframe
                  title="AfterBuild Studio Location"
                  src={mapEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{
                    border: 0,
                    width: "100%",
                    height: "100%",
                    filter: "invert(92%) hue-rotate(180deg) contrast(90%) grayscale(25%)",
                    display: "block",
                  }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              <div style={{ marginTop: "10px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "10px", color: "var(--muted-dark)", letterSpacing: "0.1em" }}>
                  Indiranagar, Bengaluru · Behind Leela Palace Rd
                </span>
                <a
                  href={directionsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ fontSize: "10px", color: "var(--bronze)", letterSpacing: "0.15em", textTransform: "uppercase" }}
                >
                  Directions →
                </a>
              </div>
            </div>

            {/* ── Block C: Form ──────────────────────────────── */}
            <div className="contact-form-block">
              <div style={{ marginBottom: "clamp(28px, 4vw, 44px)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "clamp(12px, 2vw, 20px)" }}>
                  <span style={{ width: "24px", height: "1px", background: "var(--bronze)" }} />
                  <span style={{ fontSize: "10px", letterSpacing: "0.28em", textTransform: "uppercase" as const, color: "var(--bronze)" }}>
                    Project Enquiry
                  </span>
                </div>
                <h2 style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "var(--text-3xl)",
                  fontWeight: 400,
                  letterSpacing: "-0.01em",
                  lineHeight: 1.05,
                  color: "var(--text)",
                  marginBottom: "10px",
                }}>Start a Project</h2>
                <p style={{ fontSize: "var(--text-sm)", color: "var(--muted)", lineHeight: 1.7 }}>
                  Tell us about your spatial requirements, timeline, and architectural aspirations.
                </p>
              </div>

              {state === "success" ? (
                <div style={{ paddingBlock: "clamp(48px, 8vw, 96px)", textAlign: "center" }}>
                  <div style={{
                    width: "64px", height: "64px", borderRadius: "50%",
                    border: "1px solid var(--bronze)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    margin: "0 auto 24px",
                    fontSize: "24px", color: "var(--bronze)",
                  }}>✓</div>
                  <h3 style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(1.4rem, 2vw, 1.8rem)",
                    fontWeight: 400,
                    color: "var(--text)",
                    marginBottom: "12px",
                  }}>Inquiry Received</h3>
                  <p style={{ fontSize: "var(--text-sm)", color: "var(--muted)", lineHeight: 1.7, maxWidth: "400px", margin: "0 auto 28px" }}>
                    Thank you for reaching out. Our design principal will review your submission and contact you within 24 hours.
                  </p>
                  <button
                    onClick={() => { setState("idle"); setForm({ name: "", email: "", phone: "", category: "Residential Curation or Luxury Villa", details: "" }); }}
                    style={{
                      fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase",
                      color: "var(--muted)", border: "1px solid var(--border)", padding: "12px 28px",
                      background: "transparent", cursor: "pointer", transition: "color 0.3s ease",
                      fontFamily: "var(--font-sans)",
                    }}
                  >
                    Send Another Inquiry
                  </button>
                </div>
              ) : (
                <form
                  name="contact"
                  method="POST"
                  onSubmit={handleSubmit}
                  noValidate
                  style={{ display: "flex", flexDirection: "column", gap: "clamp(20px, 3vw, 32px)" }}
                >
                  <input type="hidden" name="form-name" value="contact" />

                  {/* Full Name */}
                  <div>
                    <label style={labelStyle} htmlFor="contact-name">Full Name *</label>
                    <input
                      id="contact-name"
                      type="text"
                      value={form.name}
                      onChange={e => setForm({ ...form, name: e.target.value })}
                      onFocus={() => setFocused("name")}
                      onBlur={() => setFocused(null)}
                      placeholder="e.g. Anand Sharma"
                      style={{ ...fieldStyle, borderBottomColor: focused === "name" ? "var(--bronze)" : errors.name ? "rgba(239,68,68,0.6)" : "rgba(243,240,234,0.12)" }}
                    />
                    {errors.name && <p style={{ fontSize: "10px", color: "rgba(239,68,68,0.8)", marginTop: "6px", letterSpacing: "0.05em" }}>{errors.name}</p>}
                  </div>

                  {/* Email + Phone — single column on mobile */}
                  <div className="contact-two-col">
                    <div>
                      <label style={labelStyle} htmlFor="contact-email">Email Address *</label>
                      <input
                        id="contact-email"
                        type="email"
                        value={form.email}
                        onChange={e => setForm({ ...form, email: e.target.value })}
                        onFocus={() => setFocused("email")}
                        onBlur={() => setFocused(null)}
                        placeholder="e.g. anand@example.com"
                        style={{ ...fieldStyle, borderBottomColor: focused === "email" ? "var(--bronze)" : errors.email ? "rgba(239,68,68,0.6)" : "rgba(243,240,234,0.12)" }}
                      />
                      {errors.email && <p style={{ fontSize: "10px", color: "rgba(239,68,68,0.8)", marginTop: "6px" }}>{errors.email}</p>}
                    </div>
                    <div>
                      <label style={labelStyle} htmlFor="contact-phone">Phone Number</label>
                      <input
                        id="contact-phone"
                        type="tel"
                        value={form.phone}
                        onChange={e => setForm({ ...form, phone: e.target.value })}
                        onFocus={() => setFocused("phone")}
                        onBlur={() => setFocused(null)}
                        placeholder="e.g. +91 98765 43210"
                        style={{ ...fieldStyle, borderBottomColor: focused === "phone" ? "var(--bronze)" : "rgba(243,240,234,0.12)" }}
                      />
                    </div>
                  </div>

                  {/* Project Category */}
                  <div>
                    <label style={labelStyle} htmlFor="contact-category">Project Category</label>
                    <select
                      id="contact-category"
                      value={form.category}
                      onChange={e => setForm({ ...form, category: e.target.value })}
                      style={{
                        ...fieldStyle,
                        cursor: "pointer",
                        appearance: "none",
                        WebkitAppearance: "none",
                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='rgba(243,240,234,0.3)' strokeWidth='1.5' fill='none'/%3E%3C/svg%3E")`,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "right 0 center",
                        paddingRight: "20px",
                        borderBottomColor: focused === "category" ? "var(--bronze)" : "rgba(243,240,234,0.12)",
                      }}
                      onFocus={() => setFocused("category")}
                      onBlur={() => setFocused(null)}
                    >
                      <option value="Residential Curation or Luxury Villa">Residential Curation or Luxury Villa</option>
                      <option value="Commercial Architecture">Commercial / Corporate Workspace</option>
                      <option value="Bespoke Interior Curation">Bespoke Interior & Millwork Design</option>
                      <option value="Turnkey Architectural Delivery">Complete Turnkey Architecture & Delivery</option>
                      <option value="Consulting Advisory">Design Consulting & Advisory</option>
                    </select>
                  </div>

                  {/* Project Details */}
                  <div>
                    <label style={labelStyle} htmlFor="contact-details">Describe Your Project *</label>
                    <textarea
                      id="contact-details"
                      rows={4}
                      value={form.details}
                      onChange={e => setForm({ ...form, details: e.target.value })}
                      onFocus={() => setFocused("details")}
                      onBlur={() => setFocused(null)}
                      placeholder="Tell us about the property location, built-up area, desired style, and expected timeline..."
                      style={{
                        ...fieldStyle,
                        resize: "none",
                        borderBottomColor: focused === "details" ? "var(--bronze)" : errors.details ? "rgba(239,68,68,0.6)" : "rgba(243,240,234,0.12)",
                      }}
                    />
                    {errors.details && <p style={{ fontSize: "10px", color: "rgba(239,68,68,0.8)", marginTop: "6px" }}>{errors.details}</p>}
                  </div>

                  {/* Submit buttons */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "12px", paddingTop: "8px" }}>
                    <button
                      type="submit"
                      disabled={state === "loading"}
                      style={{
                        width: "100%",
                        padding: "16px",
                        background: state === "loading" ? "rgba(243,240,234,0.7)" : "var(--text)",
                        color: "var(--bg)",
                        border: "none",
                        fontSize: "11px",
                        letterSpacing: "0.2em",
                        textTransform: "uppercase",
                        cursor: state === "loading" ? "wait" : "pointer",
                        transition: "background 0.3s ease",
                        fontFamily: "var(--font-sans)",
                        fontWeight: 500,
                      }}
                      onMouseEnter={e => state !== "loading" && ((e.currentTarget as HTMLElement).style.background = "var(--bronze)")}
                      onMouseLeave={e => state !== "loading" && ((e.currentTarget as HTMLElement).style.background = "var(--text)")}
                    >
                      {state === "loading" ? "Submitting Inquiry…" : "Submit Project Inquiry →"}
                    </button>

                    <a
                      href={`https://wa.me/${siteConfig.whatsapp}?text=Hi%20${encodeURIComponent(siteConfig.name)}%2C%20I%20would%20like%20to%20discuss%20a%20project.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        width: "100%",
                        padding: "15px",
                        border: "1px solid rgba(37,211,102,0.25)",
                        color: "#25D366",
                        fontSize: "11px",
                        letterSpacing: "0.2em",
                        textTransform: "uppercase",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "8px",
                        transition: "background 0.3s ease, border-color 0.3s ease",
                        fontFamily: "var(--font-sans)",
                      }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(37,211,102,0.08)"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(37,211,102,0.4)"; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "transparent"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(37,211,102,0.25)"; }}
                    >
                      Connect via WhatsApp
                    </a>
                  </div>
                </form>
              )}
            </div>

          </div>
        </div>

        <style>{`
          .contact-layout-grid {
            display: grid;
            grid-template-columns: repeat(12, minmax(0, 1fr));
            gap: var(--grid-gap);
            align-items: start;
          }
          .contact-info-block {
            grid-column: 1 / 6;
            grid-row: 1;
          }
          .contact-form-block {
            grid-column: 6 / 13;
            grid-row: 1;
            padding-left: clamp(24px, 4vw, 56px);
            border-left: 1px solid var(--border);
          }
          .contact-map-block {
            grid-column: 1 / 13;
            grid-row: 2;
            margin-top: clamp(40px, 6vw, 80px);
            padding-top: clamp(32px, 5vw, 64px);
            border-top: 1px solid var(--border);
          }
          .map-frame-container {
            width: 100%;
            height: clamp(300px, 40vh, 460px);
            overflow: hidden;
            border: 1px solid var(--border);
            position: relative;
            background: #111110;
          }
          .contact-two-col {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: clamp(16px, 3vw, 32px);
          }

          @media (max-width: 900px) {
            .contact-layout-grid {
              display: flex !important;
              flex-direction: column !important;
              gap: 36px !important;
            }
            .contact-info-block {
              order: 1 !important;
              width: 100% !important;
            }
            .contact-map-block {
              order: 2 !important;
              width: 100% !important;
              margin-top: 0 !important;
              padding-top: 24px !important;
            }
            .map-frame-container {
              height: clamp(260px, 45vw, 340px) !important;
            }
            .contact-form-block {
              order: 3 !important;
              width: 100% !important;
              padding-left: 0 !important;
              border-left: none !important;
              border-top: 1px solid var(--border) !important;
              padding-top: 36px !important;
            }
            .contact-two-col {
              grid-template-columns: 1fr !important;
              gap: 20px !important;
            }
          }
        `}</style>
      </section>
    </div>
  );
}
