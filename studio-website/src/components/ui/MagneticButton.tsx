"use client";

import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  strength?: number;
  href?: string;
  as?: "button" | "a" | "div";
}

export default function MagneticButton({
  children,
  className = "",
  onClick,
  strength = 0.4,
  href,
  as: Tag = "button",
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLButtonElement | HTMLAnchorElement | HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const button = buttonRef.current;
    if (!button) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = button.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const deltaX = (e.clientX - centerX) * strength;
      const deltaY = (e.clientY - centerY) * strength;

      gsap.to(button, {
        x: deltaX,
        y: deltaY,
        duration: 0.4,
        ease: "power3.out",
      });
    };

    const handleMouseLeave = () => {
      gsap.to(button, {
        x: 0,
        y: 0,
        duration: 0.6,
        ease: "elastic.out(1, 0.4)",
      });
      setIsHovered(false);
    };

    const handleMouseEnter = () => setIsHovered(true);

    button.addEventListener("mousemove", handleMouseMove as EventListener);
    button.addEventListener("mouseleave", handleMouseLeave);
    button.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      button.removeEventListener("mousemove", handleMouseMove as EventListener);
      button.removeEventListener("mouseleave", handleMouseLeave);
      button.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [strength]);

  const commonProps = {
    ref: buttonRef as React.RefObject<HTMLButtonElement>,
    className,
    onClick,
    "data-hovered": isHovered,
  };

  if (href && Tag === "a") {
    return (
      <a
        ref={buttonRef as React.RefObject<HTMLAnchorElement>}
        href={href}
        className={className}
        data-hovered={isHovered}
      >
        {children}
      </a>
    );
  }

  return (
    <button {...commonProps}>
      {children}
    </button>
  );
}
