"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Navigation from "../components/Navigation";
import LineReveal from "../components/LineReveal";
import Footer from "../components/Footer";
import Tools from "../components/Tools";
import { bio, workExperience, designPhilosophy, processSteps, toolsHeading, tools } from "../data/about";
import "./about.css";

export default function About() {
  const bioRef = useRef(null);
  const philRef = useRef(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    [bioRef, philRef].forEach((ref) => {
      const el = ref.current;
      if (!el) return;
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
    });
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

        {/* ── Design philosophy ── */}
        <section className="about-section col-grid">
          <h2 ref={philRef} className="section-heading-reveal">
            <LineReveal heading={designPhilosophy.heading} lead="" plain />
          </h2>
        </section>

        {/* ── AI-empowered design process ── */}
        <section id="design-process" className="about-section col-grid">
          <h2>My AI-empowered design process</h2>
          <div className="process-steps">
            {processSteps.map((step, i) => (
              <div key={step.id} className="process-step" style={{ "--step-i": i }}>
                <div className="process-step-header">
                  <span className="process-step-id">{step.id}</span>
                  <span className="process-step-signal">{step.signal}</span>
                </div>
                <p className="process-step-label">{step.label}</p>
                <p className="process-step-desc">{step.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── AI toolkit ── */}
        <div id="ai-toolkit">
          <Tools heading={toolsHeading} items={tools} />
        </div>
      </div>
      <Footer />
    </>
  );
}
