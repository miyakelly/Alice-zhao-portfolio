"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import styles from "./NextProjectTransition.module.css";

export default function NextProjectTransition({ project }) {
  const sectionRef = useRef(null);
  const barRef = useRef(null);
  const lineRef = useRef(null);
  const labelRef = useRef(null);
  const titleRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const bar = barRef.current;
    const line = lineRef.current;
    const label = labelRef.current;
    const title = titleRef.current;
    if (!section || !bar || !line || !label || !title) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      bar.style.width = "100%";
      return;
    }

    let ticking = false;
    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const rect = section.getBoundingClientRect();
        const vh = window.innerHeight;
        const sectionH = section.offsetHeight;
        const scrolled = vh - rect.top;
        const scrollRange = sectionH * 0.6;
        const barProgress = Math.max(0, Math.min(1, scrolled / scrollRange));

        bar.style.width = `${barProgress * 100}%`;

        const postProgress = barProgress >= 1
          ? Math.min(1, (scrolled - scrollRange) / (sectionH * 0.3))
          : 0;

        line.style.opacity = barProgress >= 1 ? `${1 - postProgress}` : "1";
        label.style.opacity = `${1 - postProgress}`;
        title.style.transform = `translateX(${-postProgress * 100}%)`;

        ticking = false;
      });
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className={styles.section} ref={sectionRef}>
      <Link href={`/projects/${project.slug}/`} className={styles.sectionLink}>
        <div className={styles.lineWrap} ref={lineRef}>
          <div className={styles.lineBg} />
          <div className={styles.lineBar} ref={barRef} />
        </div>

        <div className={styles.content}>
          <div className={styles.label} ref={labelRef}>
            <span className={styles.labelText}>Next project</span>
            <span className={styles.labelArrow}>→</span>
          </div>

          <div className={styles.titleBlock} ref={titleRef}>
            <h1 className={styles.title}>{project.projectTitle.main}</h1>
            {project.projectTitle.sub && (
              <span className={styles.subtitle}>{project.projectTitle.sub}</span>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
}
