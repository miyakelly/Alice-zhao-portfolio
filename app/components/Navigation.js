"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import styles from "./Navigation.module.css";

export default function Navigation({ title, isHome }) {
  const [dark, setDark] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
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

  const closeDrawer = () => setDrawerOpen(false);

  const LinkOrAnchor = isHome ? "a" : Link;

  return (
    <>
      <div className={styles.fixedBtns}>
        <button
          className={`${styles.menuBtn}${drawerOpen ? ` ${styles.open}` : ""}`}
          onClick={() => setDrawerOpen((o) => !o)}
          aria-label="Open menu"
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
        {title && <span className={styles.title}>{title}</span>}
        {isHome ? (
          <a href="#" className={styles.name}>Alice Zhao</a>
        ) : (
          <Link href="/" className={styles.name}>Alice Zhao</Link>
        )}
      </nav>

      <div className={`${styles.overlay}${drawerOpen ? ` ${styles.open}` : ""}`} onClick={closeDrawer} />
      <div className={`${styles.drawer}${drawerOpen ? ` ${styles.open}` : ""}`}>
        <nav className={styles.links}>
          <LinkOrAnchor href={isHome ? "#" : "/"} onClick={closeDrawer}>Home</LinkOrAnchor>
          <LinkOrAnchor href={isHome ? "#work" : "/#work"} onClick={closeDrawer}>Projects</LinkOrAnchor>
          <LinkOrAnchor href={isHome ? "#about" : "/#about"} onClick={closeDrawer}>About</LinkOrAnchor>
          <LinkOrAnchor href={isHome ? "#how-i-work" : "/#how-i-work"} onClick={closeDrawer}>How I Design</LinkOrAnchor>
          <LinkOrAnchor href={isHome ? "#contact" : "/#contact"} onClick={closeDrawer}>Contact</LinkOrAnchor>
        </nav>
        <div className={styles.bottom}>
          <a href="https://www.linkedin.com/in/liangzhaoux/" target="_blank" rel="noreferrer">LinkedIn ↗</a>
          <a href="mailto:liangzhao0801@gmail.com">Email ↗</a>
          <a href="resume.pdf" download>Resume ↓</a>
        </div>
      </div>
    </>
  );
}
