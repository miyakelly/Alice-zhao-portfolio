"use client";

import { useEffect, useRef, useState } from "react";
import s from "./MetricCard.module.css";

function AnimatedValue({ value, suffix, duration = 1200 }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) {
      setDisplay(value);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const start = performance.now();
          const animate = (now) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setDisplay(Math.round(eased * value));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [value, duration]);

  return (
    <span ref={ref} className={s.value}>
      {display}
      {suffix && <span className={s.suffix}>{suffix}</span>}
    </span>
  );
}

export default function MetricsCounter({ metrics }) {
  if (!metrics || metrics.length === 0) return null;

  return (
    <div className="metrics-strip">
      {metrics.map((m, i) => (
        <div key={i} className={`${s.card} metric-item`}>
          <AnimatedValue value={m.value} suffix={m.suffix || ""} />
          <span className={s.label}>{m.label}</span>
        </div>
      ))}
    </div>
  );
}
