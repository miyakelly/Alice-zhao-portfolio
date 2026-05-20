"use client";

import { useEffect, useRef, useState } from "react";
import s from "./SectionNav.module.css";

const NAV_H = 60;
const MAX_LINE_GAP = 8;

export default function SectionNav({ sections }) {
  const [activeId, setActiveId] = useState(sections[0]?.id || "");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const sentinelRef = useRef(null);
  const linesRef = useRef(null);

  useEffect(() => {
    const observers = [];
    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveId(id);
        },
        { rootMargin: "-20% 0px -60% 0px" }
      );
      observer.observe(el);
      observers.push(observer);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, [sections]);

  useEffect(() => {
    let lastP = -1;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function onScroll() {
      if (!sentinelRef.current || !linesRef.current) return;
      const sTop = sentinelRef.current.getBoundingClientRect().top;

      let p;
      if (sTop >= NAV_H) p = 0;
      else if (sTop <= 0) p = 1;
      else p = (NAV_H - sTop) / NAV_H;

      const rounded = Math.round(p * 1000) / 1000;
      if (rounded === lastP) return;
      lastP = rounded;

      const gap = prefersReduced ? 0 : MAX_LINE_GAP * (1 - p);
      linesRef.current.style.gap = `${gap}px`;

      window.dispatchEvent(
        new CustomEvent("nav-visibility", { detail: { progress: p } })
      );
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    requestAnimationFrame(onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!dropdownOpen) return;
    const close = () => setDropdownOpen(false);
    window.addEventListener("scroll", close, { passive: true, once: true });
    return () => window.removeEventListener("scroll", close);
  }, [dropdownOpen]);

  const handleClick = (e, id) => {
    e.preventDefault();
    setDropdownOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const activeSection = sections.find((sec) => sec.id === activeId);
  const activeLabel = activeSection?.navLabel || sections[0]?.navLabel || "";

  return (
    <>
      <div ref={sentinelRef} className={s.sentinel} />
      <div className={s.wrapper}>
        <div ref={linesRef} className={s.lines} style={{ gap: `${MAX_LINE_GAP}px` }}>
          <div className={`${s.line} ${s.line1}`} />
          <div className={`${s.line} ${s.line2}`} />
          <div className={`${s.line} ${s.line3}`} />
        </div>
        <nav className={s.nav} aria-label="Project sections">
          <div className={s.track}>
            {sections.map(({ id, navLabel }) => (
              <a
                key={id}
                href={`#${id}`}
                className={`${s.link}${activeId === id ? ` ${s.linkActive}` : ""}`}
                onClick={(e) => handleClick(e, id)}
              >
                {navLabel}
              </a>
            ))}
          </div>

          <div className={s.dropdown}>
            <button
              className={s.dropdownTrigger}
              onClick={() => setDropdownOpen((o) => !o)}
              aria-expanded={dropdownOpen}
            >
              {activeLabel}
              <span className={`${s.chevron}${dropdownOpen ? ` ${s.chevronOpen}` : ""}`}>
                ▾
              </span>
            </button>
            {dropdownOpen && (
              <div className={s.dropdownList}>
                {sections.map(({ id, navLabel }) => (
                  <a
                    key={id}
                    href={`#${id}`}
                    className={`${s.dropdownItem}${activeId === id ? ` ${s.dropdownItemActive}` : ""}`}
                    onClick={(e) => handleClick(e, id)}
                  >
                    {navLabel}
                  </a>
                ))}
              </div>
            )}
          </div>
        </nav>
      </div>
    </>
  );
}
