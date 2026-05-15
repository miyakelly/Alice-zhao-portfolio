"use client";

import { useEffect, useRef, useState, startTransition } from "react";

const PIXEL_COUNT = 30;
const PIXEL_SIZE = 12;
const TRAIL_SPACING = 15;
const STIFFNESS = 0.2;
const DAMPING = 0.5;
const IDLE_FADE_DURATION = 5;

export default function CursorTrail() {
  const [trail, setTrail] = useState([]);
  const [trailColor, setTrailColor] = useState("#0A0D10");
  const cursorPos = useRef({ x: -1000, y: -1000 });
  const lastCursorPos = useRef({ x: -1000, y: -1000 });
  const lastMoveTime = useRef(Date.now());
  const activityLevel = useRef(1);
  const animationFrameId = useRef(null);
  const prefersReducedMotion = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    prefersReducedMotion.current = mql.matches;
    const onChange = (e) => { prefersReducedMotion.current = e.matches; };
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const readColor = () => {
      const ink = getComputedStyle(document.documentElement)
        .getPropertyValue("--ink")
        .trim();
      if (ink) setTrailColor(ink);
    };

    readColor();

    const observer = new MutationObserver(readColor);
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["data-dark"],
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleMouseMove = (e) => {
      cursorPos.current = { x: e.clientX, y: e.clientY };
      const dx = e.clientX - lastCursorPos.current.x;
      const dy = e.clientY - lastCursorPos.current.y;
      if (Math.sqrt(dx * dx + dy * dy) > 0.5) {
        lastMoveTime.current = Date.now();
      }
      lastCursorPos.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const initial = [];
    for (let i = 0; i < PIXEL_COUNT; i++) {
      initial.push({ x: cursorPos.current.x, y: cursorPos.current.y, vx: 0, vy: 0 });
    }
    setTrail(initial);

    const animate = () => {
      if (prefersReducedMotion.current) {
        animationFrameId.current = requestAnimationFrame(animate);
        return;
      }

      const timeSinceMove = Date.now() - lastMoveTime.current;
      const isMoving = timeSinceMove < 100;
      const targetLevel = isMoving ? 1 : 0;
      const step = isMoving ? 0.016 / 0.2 : 0.016 / IDLE_FADE_DURATION;

      if (activityLevel.current < targetLevel) {
        activityLevel.current = Math.min(targetLevel, activityLevel.current + step);
      } else if (activityLevel.current > targetLevel) {
        activityLevel.current = Math.max(targetLevel, activityLevel.current - step);
      }

      startTransition(() => {
        setTrail((prev) => {
          const next = prev.map((p) => ({ ...p }));

          if (next.length > 0) {
            const dx = cursorPos.current.x - next[0].x;
            const dy = cursorPos.current.y - next[0].y;
            next[0].vx += dx * STIFFNESS;
            next[0].vy += dy * STIFFNESS;
            next[0].vx *= DAMPING;
            next[0].vy *= DAMPING;
            next[0].x += next[0].vx;
            next[0].y += next[0].vy;
          }

          for (let i = 1; i < next.length; i++) {
            const prev = next[i - 1];
            const curr = next[i];
            const dx = prev.x - curr.x;
            const dy = prev.y - curr.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            curr.vx += dx * STIFFNESS;
            curr.vy += dy * STIFFNESS;
            curr.vx *= DAMPING;
            curr.vy *= DAMPING;
            curr.x += curr.vx;
            curr.y += curr.vy;

            if (dist > TRAIL_SPACING) {
              const ratio = (dist - TRAIL_SPACING) / dist;
              curr.x += dx * ratio * 0.5;
              curr.y += dy * ratio * 0.5;
            }
          }

          return next;
        });
      });

      animationFrameId.current = requestAnimationFrame(animate);
    };

    animationFrameId.current = requestAnimationFrame(animate);
    return () => {
      if (animationFrameId.current !== null) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);

  if (typeof document === "undefined") return null;

  const fade = activityLevel.current;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        zIndex: 9999,
      }}
    >
      {trail.map((point, i) => {
        const progress = i / PIXEL_COUNT;
        let opacity = (1 - progress) * fade;
        let scale = (1 - progress * 0.5) * fade;

        if (opacity < 0.01) return null;

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${point.x}px`,
              top: `${point.y}px`,
              width: `${PIXEL_SIZE * scale}px`,
              height: `${PIXEL_SIZE * scale}px`,
              backgroundColor: trailColor,
              opacity,
              transform: "translate(-50%, -50%)",
              imageRendering: "pixelated",
            }}
          />
        );
      })}
    </div>
  );
}
