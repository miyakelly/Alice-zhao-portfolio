"use client";

import { useEffect, useState } from "react";

export default function SectionNav({ sections }) {
  const [activeId, setActiveId] = useState(sections[0]?.id || "");

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

  const handleClick = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="section-nav" aria-label="Project sections">
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
    </nav>
  );
}
