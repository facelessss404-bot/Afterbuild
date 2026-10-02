"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { stats } from "@/data/content";

gsap.registerPlugin(ScrollTrigger);

function AnimatedNumber({ target }: { target: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const animated = useRef(false);
  const numStr = target.replace(/[^0-9]/g, "");
  const prefix = target.replace(/[0-9]+.*/, "");
  const suffix = target.replace(/.*?[0-9]+/, "");
  const num = parseInt(numStr, 10);
  const [display, setDisplay] = useState(`${prefix}0${suffix}`);

  useEffect(() => {
    const el = ref.current;
    if (!el || animated.current || isNaN(num)) return;

    const st = ScrollTrigger.create({
      trigger: el,
      start: "top 85%",
      once: true,
      onEnter: () => {
        animated.current = true;
        const obj = { val: 0 };
        gsap.to(obj, {
          val: num,
          duration: 2.2,
          ease: "power2.out",
          onUpdate: () => setDisplay(`${prefix}${Math.round(obj.val)}${suffix}`),
        });
      },
    });
    return () => st.kill();
  }, [num, prefix, suffix]);

  return <span ref={ref}>{display}</span>;
}

export default function StatsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        section.querySelectorAll(".stat-item"),
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: "power4.out",
          scrollTrigger: { trigger: section, start: "top 78%" },
        }
      );
    }, sectionRef);
    return () => { try { ctx.revert(); } catch (_) {} };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="section-metrics"
      style={{
        background: "var(--surface)",
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      {/* Full-width metric row — no extra padding wrapper, border-separated */}
      <div style={{
        maxWidth: "var(--max-w)",
        marginInline: "auto",
        paddingInline: "var(--gutter)",
      }}>
        <div className="stats-grid">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="stat-item"
              style={{
                padding: "clamp(32px, 5vw, 72px) clamp(20px, 3vw, 40px)",
                borderRight: i < stats.length - 1 ? "1px solid var(--border)" : "none",
              }}
            >
              {/* Large number */}
              <p style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2.8rem, 5vw, 5rem)",
                fontWeight: 400,
                lineHeight: 1,
                color: "var(--text)",
                marginBottom: "10px",
              }}>
                <AnimatedNumber target={stat.value} />
              </p>

              {/* Label */}
              <p style={{
                fontSize: "10px",
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                color: "var(--bronze)",
                marginBottom: "6px",
              }}>
                {stat.label}
              </p>

              {/* Description */}
              <p style={{
                fontSize: "12px",
                color: "var(--muted-dark)",
                lineHeight: 1.5,
              }}>
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile 2-column */}
      <style>{`
        @media (max-width: 700px) {
          #section-metrics [style*="repeat(4, 1fr)"] {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          #section-metrics .stat-item:nth-child(2) {
            border-right: none !important;
          }
          #section-metrics .stat-item:nth-child(3) {
            border-top: 1px solid var(--border);
            border-right: 1px solid var(--border) !important;
          }
          #section-metrics .stat-item:nth-child(4) {
            border-top: 1px solid var(--border);
          }
        }
      `}</style>
    </section>
  );
}
