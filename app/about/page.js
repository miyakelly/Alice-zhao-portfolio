"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Navigation from "../components/Navigation";
import LineReveal from "../components/LineReveal";
import Footer from "../components/Footer";
import { bio, workExperience } from "../data/about";
import Tools from "../components/Tools";
import "./about.css";

export default function About() {
  const bioRef = useRef(null);

  useEffect(() => {
    const el = bioRef.current;
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
      <Navigation title="About" />
      <div className="about">
        {/* ── Bio ── */}
        <section className="about-section col-grid">
          <h2 ref={bioRef} className="section-heading-reveal">
            <LineReveal heading={bio.heading} lead={bio.personal} plain />
          </h2>
          <img
            className="about-bio-image"
            src={bio.image}
            alt="Alice Zhao"
          />
        </section>

        {/* ── Work experience ── */}
        <section className="about-section col-grid">
          <h2>Work experience</h2>
          <p className="about-resume-link">
            <Link href="#">View my resume</Link>
          </p>
          <div className="experience-list">
            {workExperience.map((entry, i) => (
              <div key={i} className="experience-entry col-grid">
                <p className="experience-time">{entry.time}</p>
                <div className="experience-main">
                  <p className="experience-title">
                    {entry.title} @ {entry.company}
                  </p>
                  <p className="experience-description">{entry.description}</p>
                </div>
                <div className="experience-work">
                  <p className="experience-work-label">Selected work</p>
                  <ul className="experience-work-list">
                    {entry.selectedWork.map((work, j) => (
                      <li key={j}>
                        <Link href={work.href}>{work.name}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        <Tools />
      </div>
      <Footer />
    </>
  );
}
