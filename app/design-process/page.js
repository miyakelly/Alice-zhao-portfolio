"use client";

import { useEffect, useRef } from "react";
import Navigation from "../components/Navigation";
import LineReveal from "../components/LineReveal";
import Footer from "../components/Footer";
import Tools from "../components/Tools";
import { intro } from "../data/design-process";
import "../about/about.css";

export default function DesignProcess() {
  const headingRef = useRef(null);

  useEffect(() => {
    const el = headingRef.current;
    if (!el) return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      el.classList.add("revealed");
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("revealed");
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Navigation title="My design process" />
      <div className="about">
        <section className="about-section col-grid">
          <h2 ref={headingRef} className="section-heading-reveal">
            <LineReveal heading={intro.heading} lead="" plain />
          </h2>
        </section>

        <Tools />
      </div>
      <Footer />
    </>
  );
}
