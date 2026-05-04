"use client";

import { useEffect, useRef, useState } from "react";

function useScrollProgress(containerRef) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) {
      setProgress(1);
      return;
    }

    let ticking = false;

    function update() {
      const rect = container.getBoundingClientRect();
      const scrollableDistance = container.scrollHeight - window.innerHeight;
      const scrolled = -rect.top;
      const p = Math.min(1, Math.max(0, scrolled / scrollableDistance));
      setProgress(p);
      container.style.setProperty("--scroll-progress", p.toFixed(4));
      ticking = false;
    }

    function onScroll() {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    update();

    return () => window.removeEventListener("scroll", onScroll);
  }, [containerRef]);

  return progress;
}

function lerp(a, b, t) {
  return a + (b - a) * t;
}

const INTRO_BREAKPOINTS = [
  {
    maxProgress: 0.15,
    text: "I am Alice Zhao, a UX Designer currently building agentic experience at Amazon AWS. Before, I built design system at Siemens, financial applications at Morgan Stanley, and healthcare system at Insperity.",
  },
  {
    maxProgress: 0.35,
    text: "I am Alice Zhao, a UX Designer building agentic experience at Amazon AWS. Previously at Siemens, Morgan Stanley, and Insperity.",
  },
  {
    maxProgress: 0.55,
    text: "Alice Zhao, UX Designer building agentic experience at Amazon AWS.",
  },
  {
    maxProgress: 0.75,
    text: "Alice Zhao, UX Designer at AWS.",
  },
];

function getIntroText(progress) {
  for (const bp of INTRO_BREAKPOINTS) {
    if (progress <= bp.maxProgress) return bp.text;
  }
  return null;
}

export default function HomepageScroll() {
  const containerRef = useRef(null);
  const progress = useScrollProgress(containerRef);

  const vw = typeof window !== "undefined" ? window.innerWidth : 1440;
  const heroStart = Math.min(400, vw * 0.28);
  const heroEnd = Math.min(100, vw * 0.15);

  const heroSize = lerp(heroStart, heroEnd, progress);
  const padding = lerp(24, 8, progress);

  const avatarFraction = 0.35;
  const introText = getIntroText(progress);
  const hasText = introText !== null;

  const availableInner = heroSize - padding * 2;
  const gap = hasText ? lerp(16, 6, progress) : 0;
  const avatarSize = hasText
    ? Math.min(availableInner * avatarFraction, availableInner - gap - 20)
    : availableInner * 0.7;

  const textOpacity = progress > 0.65
    ? lerp(1, 0, (progress - 0.65) / 0.1)
    : 1;

  return (
    <div className="scroll-runway" ref={containerRef}>
      <div className="scroll-sticky">
        <div className="scroll-progress-debug">
          {progress.toFixed(3)}
        </div>

        <div
          className="scroll-hero-card"
          style={{
            width: heroSize,
            height: heroSize,
            padding: padding,
            gap: gap,
          }}
        >
          <div
            className="scroll-hero-avatar"
            style={{
              width: avatarSize,
              height: avatarSize,
              minWidth: avatarSize,
              minHeight: avatarSize,
            }}
          >
            photo
          </div>
          {hasText && (
            <p
              className="scroll-hero-intro"
              style={{ opacity: textOpacity }}
            >
              {introText}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
