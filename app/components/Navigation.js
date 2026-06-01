"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import WaveBackground from "./WaveBackground";
import styles from "./Navigation.module.css";

export default function Navigation({ title, isHome, sections }) {
  const [dark, setDark] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(null);
  const navRef = useRef(null);

  useEffect(() => {
    document.body.toggleAttribute("data-dark", dark);
  }, [dark]);

  useEffect(() => {
    const onNavVisibility = (e) => {
      if (!navRef.current) return;
      const p = e.detail.progress;
      navRef.current.style.transform = `translateY(${-p * 60}px)`;
    };
    const onToggleDrawer = () => setDrawerOpen((o) => !o);
    const onToggleMode = () => setDark((d) => !d);
    window.addEventListener("nav-visibility", onNavVisibility);
    window.addEventListener("toggle-drawer", onToggleDrawer);
    window.addEventListener("toggle-mode", onToggleMode);
    return () => {
      window.removeEventListener("nav-visibility", onNavVisibility);
      window.removeEventListener("toggle-drawer", onToggleDrawer);
      window.removeEventListener("toggle-mode", onToggleMode);
    };
  }, []);

  useEffect(() => {
    if (!sections || sections.length === 0) return;

    const ids = sections.map((s) => s.id);
    let ticking = false;

    function update() {
      const vh = window.innerHeight;
      let current = null;
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= vh * 0.4) current = id;
      }
      setActiveSection(current);
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
  }, [sections]);

  function scrollToSection(id) {
    const el = document.getElementById(id);
    if (!el) return;
    const panel = el.closest(".project-section-handoff-panel") || el;
    const rect = panel.getBoundingClientRect();
    const navHeight = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--nav-height")) * parseFloat(getComputedStyle(document.documentElement).fontSize);
    window.scrollTo({ top: window.scrollY + rect.top - navHeight, behavior: "smooth" });
  }

  const closeDrawer = () => setDrawerOpen(false);

  return (
    <>
      <div className={styles.fixedBtns}>
        <button
          className={`${styles.menuBtn}${drawerOpen ? ` ${styles.open}` : ""}`}
          onClick={() => setDrawerOpen((o) => !o)}
          aria-label="Open menu"
          data-cursor="Sésame, ouvre-toi"
        >
          <span></span><span></span><span></span>
        </button>
        <button
          className={styles.modeBtn}
          onClick={() => setDark((d) => !d)}
          aria-label="Toggle dark mode"
        >
          <span className={`${styles.icon} ${styles.iconMoon}`}>☽</span>
          <span className={`${styles.icon} ${styles.iconSun}`}>☀</span>
        </button>
      </div>

      <nav ref={navRef} className={styles.nav}>
        {isHome ? (
          <a href="#" className={styles.name} data-cursor="Go back to the awesome homepage">Alice Zhao</a>
        ) : (
          <div className={styles.breadcrumb}>
            <Link href="/" className={styles.name} data-cursor="Go back to the awesome homepage">Alice Zhao</Link>
            {title && (
              <>
                <span className={styles.separator}>/</span>
                <span className={styles.title}>{title}</span>
              </>
            )}
          </div>
        )}
        {sections && sections.length > 0 && (
          <div className={styles.sectionNav}>
            {sections.map((sec, i) => (
              <span key={sec.id}>
                <button
                  className={`${styles.sectionLink}${activeSection === sec.id ? ` ${styles.sectionActive}` : ""}`}
                  onClick={() => scrollToSection(sec.id)}
                  data-cursor=""
                >
                  {sec.navLabel}
                </button>
                {i < sections.length - 1 && <span className={styles.sectionSep}>/</span>}
              </span>
            ))}
          </div>
        )}
      </nav>

      <div className={`${styles.drawer}${drawerOpen ? ` ${styles.open}` : ""}`}>
        {drawerOpen && <WaveBackground className={styles.drawerWaves} />}
        <nav className={styles.links}>
          <Link href="/" onClick={closeDrawer}>Back to home</Link>
          <Link href="/projects/s3-tables" onClick={closeDrawer}>AWS S3 Tables</Link>
          <Link href="/projects/simplifying-data-access" onClick={closeDrawer}>Simplifying data access</Link>
          <Link href="/projects/agent-opportunities" onClick={closeDrawer}>AWS agentic experience</Link>
          <Link href="/about" onClick={closeDrawer}>About me</Link>
          <Link href="/about#design-process" onClick={closeDrawer}>My design process</Link>
          <Link href="/lab" onClick={closeDrawer}>My lab</Link>
        </nav>
        <div className={styles.bottom}>
          <a href="https://www.linkedin.com/in/liangzhaoux/" target="_blank" rel="noreferrer">LinkedIn ↗</a>
          <a href="mailto:liangzhao0801@gmail.com">Email ↗</a>
          <a href="https://drive.google.com/file/d/1mJRSpRVt-9k0j9rOz154nCsfPWPXsa4D/view" target="_blank" rel="noreferrer">Resume ↗</a>
        </div>
      </div>
    </>
  );
}
