"use client";

import { useEffect, useRef, useState } from "react";
import s from "./MetricStack.module.css";

function AnimatedValue({ value, suffix }) {
  const ref = useRef(null);
  const [display, setDisplay] = useState(0);

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
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const duration = 1200;
        const start = performance.now();
        function tick(now) {
          const t = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - t, 3);
          setDisplay(Math.round(eased * value));
          if (t < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [value]);

  return (
    <span ref={ref} className={s.value}>
      {display}
      {suffix && <span className={s.suffix}>{suffix}</span>}
    </span>
  );
}

export default function MetricStack({ metrics, direction = "vertical" }) {
  if (!metrics || metrics.length === 0) return null;

  return (
    <div
      className={`${s.stack} ${direction === "horizontal" ? s.horizontal : s.vertical}`}
    >
      {metrics.map((m, i) => (
        <div key={i} className={`${s.metric} hover-card`}>
          <AnimatedValue value={m.value} suffix={m.suffix} />
          <span className={s.label}>{m.label}</span>
        </div>
      ))}
    </div>
  );
}
