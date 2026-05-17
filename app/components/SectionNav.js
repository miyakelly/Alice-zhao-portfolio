"use client";

import { useEffect, useRef, useState } from "react";

const NAV_H = 60;

export default function SectionNav({ sections }) {
  const [activeId, setActiveId] = useState(sections[0]?.id || "");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const sentinelRef = useRef(null);
  const navRef = useRef(null);

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

    function onScroll() {
      if (!sentinelRef.current || !navRef.current) return;
      const sTop = sentinelRef.current.getBoundingClientRect().top;

      let p;
      if (sTop >= NAV_H) p = 0;
      else if (sTop <= 0) p = 1;
      else p = (NAV_H - sTop) / NAV_H;

      const rounded = Math.round(p * 1000) / 1000;
      if (rounded === lastP) return;
      lastP = rounded;

      navRef.current.style.top = `${NAV_H * (1 - p)}px`;
      navRef.current.style.opacity = p;
      navRef.current.style.pointerEvents = p > 0.5 ? "auto" : "none";
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

  const activeSection = sections.find((s) => s.id === activeId);
  const activeLabel = activeSection?.navLabel || sections[0]?.navLabel || "";

  return (
    <>
      <div ref={sentinelRef} className="section-nav-sentinel" />
      <nav
        ref={navRef}
        className="section-nav"
        aria-label="Project sections"
        style={{ top: `${NAV_H}px`, opacity: 0, pointerEvents: "none" }}
      >
        <div className="section-nav-track">
          {sections.map(({ id, navLabel }) => (
            <a
              key={id}
              href={`#${id}`}
              className={`section-nav-link${activeId === id ? " active" : ""}`}
              onClick={(e) => handleClick(e, id)}
            >
              {navLabel}
            </a>
          ))}
        </div>

        <div className="section-nav-dropdown">
          <button
            className="section-nav-dropdown-trigger"
            onClick={() => setDropdownOpen((o) => !o)}
            aria-expanded={dropdownOpen}
          >
            {activeLabel}
            <span
              className={`section-nav-chevron${dropdownOpen ? " open" : ""}`}
            >
              ▾
            </span>
          </button>
          {dropdownOpen && (
            <div className="section-nav-dropdown-list">
              {sections.map(({ id, navLabel }) => (
                <a
                  key={id}
                  href={`#${id}`}
                  className={`section-nav-dropdown-item${activeId === id ? " active" : ""}`}
                  onClick={(e) => handleClick(e, id)}
                >
                  {navLabel}
                </a>
              ))}
            </div>
          )}
        </div>
      </nav>
    </>
  );
}
