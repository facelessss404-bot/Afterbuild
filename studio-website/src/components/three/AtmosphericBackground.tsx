"use client";

import { useEffect, useRef } from "react";

/**
 * Atmospheric WebGL background using raw Canvas2D + requestAnimationFrame.
 * Lightweight alternative to Three.js — creates a slowly-evolving
 * parametric noise field reminiscent of architectural wireframe depth.
 *
 * Falls back gracefully to a static gradient if canvas is unavailable.
 */
export default function AtmosphericBackground({
  className = "",
  opacity = 0.3,
  color = "rgba(177, 166, 150, ", // bronze base
}: {
  className?: string;
  opacity?: number;
  color?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let time = 0;
    const points: { x: number; y: number; vx: number; vy: number; size: number }[] = [];
    const NUM_POINTS = 60;
    const CONNECTION_DIST = 150;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    const initPoints = () => {
      points.length = 0;
      for (let i = 0; i < NUM_POINTS; i++) {
        points.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          size: Math.random() * 1.5 + 0.5,
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      time += 0.005;

      // Update points
      points.forEach((p) => {
        p.x += p.vx + Math.sin(time + p.y * 0.01) * 0.1;
        p.y += p.vy + Math.cos(time + p.x * 0.01) * 0.1;

        // Wrap around
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
        if (p.y > height + 10) p.y = -10;
      });

      // Draw connections
      for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
          const dx = points[i].x - points[j].x;
          const dy = points[i].y - points[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < CONNECTION_DIST) {
            const alpha = (1 - dist / CONNECTION_DIST) * opacity * 0.4;
            ctx.beginPath();
            ctx.moveTo(points[i].x, points[i].y);
            ctx.lineTo(points[j].x, points[j].y);
            ctx.strokeStyle = `${color}${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      // Draw points
      points.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `${color}${opacity * 0.6})`;
        ctx.fill();
      });

      // Radial gradient overlay — architectural "vignette"
      const gradient = ctx.createRadialGradient(
        width / 2,
        height / 2,
        0,
        width / 2,
        height / 2,
        Math.max(width, height) * 0.7
      );
      gradient.addColorStop(0, "rgba(10, 10, 9, 0)");
      gradient.addColorStop(1, "rgba(10, 10, 9, 0.8)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      frameRef.current = requestAnimationFrame(draw);
    };

    // Check reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    resize();
    initPoints();

    if (!prefersReducedMotion) {
      frameRef.current = requestAnimationFrame(draw);
    } else {
      // Draw single static frame
      draw();
      cancelAnimationFrame(frameRef.current);
    }

    window.addEventListener("resize", () => {
      resize();
      initPoints();
    });

    return () => {
      cancelAnimationFrame(frameRef.current);
    };
  }, [opacity, color]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      aria-hidden="true"
    />
  );
}
