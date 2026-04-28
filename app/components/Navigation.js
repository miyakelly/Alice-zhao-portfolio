"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Navigation({ breadcrumb, isHome }) {
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
      <nav className={`main-nav${scrolled ? " scrolled" : ""}`}>
        <button
          className={`nav-menu-btn${drawerOpen ? " open" : ""}`}
          onClick={() => setDrawerOpen((o) => !o)}
          aria-label="Open menu"
        >
          <span></span><span></span><span></span>
        </button>
        {isHome ? (
          <a href="#" className="nav-logo">Alice (Liang) Zhao</a>
        ) : (
          <Link href="/" className="nav-logo">Alice Zhao</Link>
        )}
        <nav className="breadcrumb">
          {breadcrumb}
        </nav>
        <button
          className="nav-mode-btn"
          onClick={() => setDark((d) => !d)}
          aria-label="Toggle dark mode"
        >
          <span className="mode-icon mode-icon-moon">☽</span>
          <span className="mode-icon mode-icon-sun">☀</span>
        </button>
      </nav>

      <div className={`drawer-overlay${drawerOpen ? " open" : ""}`} onClick={closeDrawer} />
      <div className={`nav-drawer${drawerOpen ? " open" : ""}`}>
        <nav className="drawer-links">
          <LinkOrAnchor href={isHome ? "#" : "/"} onClick={closeDrawer}>Home</LinkOrAnchor>
          <LinkOrAnchor href={isHome ? "#work" : "/#work"} onClick={closeDrawer}>Projects</LinkOrAnchor>
          <LinkOrAnchor href={isHome ? "#about" : "/#about"} onClick={closeDrawer}>About</LinkOrAnchor>
          <LinkOrAnchor href={isHome ? "#how-i-work" : "/#how-i-work"} onClick={closeDrawer}>How I Design</LinkOrAnchor>
          <LinkOrAnchor href={isHome ? "#contact" : "/#contact"} onClick={closeDrawer}>Contact</LinkOrAnchor>
        </nav>
        <div className="drawer-bottom">
          <a href="https://www.linkedin.com/in/liangzhaoux/" target="_blank" rel="noreferrer">LinkedIn ↗</a>
          <a href="mailto:liangzhao0801@gmail.com">Email ↗</a>
          <a href="resume.pdf" download>Resume ↓</a>
        </div>
      </div>
    </>
  );
}
