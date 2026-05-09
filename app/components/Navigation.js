"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./Navigation.module.css";

export default function Navigation({ title, isHome }) {
  const [dark, setDark] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    document.body.toggleAttribute("data-dark", dark);
  }, [dark]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeDrawer = () => setDrawerOpen(false);

  const LinkOrAnchor = isHome ? "a" : Link;

  return (
    <>
      <nav className={`${styles.nav}${scrolled ? ` ${styles.scrolled}` : ""}`}>
        <button
          className={`${styles.menuBtn}${drawerOpen ? ` ${styles.open}` : ""}`}
          onClick={() => setDrawerOpen((o) => !o)}
          aria-label="Open menu"
        >
          <span></span><span></span><span></span>
        </button>
        {title && <span className={styles.title}>{title}</span>}
        {isHome ? (
          <a href="#" className={styles.name}>Alice Zhao</a>
        ) : (
          <Link href="/" className={styles.name}>Alice Zhao</Link>
        )}
        <button
          className={styles.modeBtn}
          onClick={() => setDark((d) => !d)}
          aria-label="Toggle dark mode"
        >
          <span className={`${styles.icon} ${styles.iconMoon}`}>☽</span>
          <span className={`${styles.icon} ${styles.iconSun}`}>☀</span>
        </button>
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
