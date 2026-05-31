"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Navigation from "../components/Navigation";
import LineReveal from "../components/LineReveal";
import Footer from "../components/Footer";
import Tools from "../components/Tools";
import ToolPill from "../components/ToolPill";
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
        <section id="design-process" className="about-section">
          <h2 className="process-heading">My AI-empowered design process</h2>
          <div className="process-steps">
            {processSteps.map((step, i) => (
              <div key={step.id}>
                <div className="process-card">
                  <div className="process-card-content">
                    <h3 className="process-card-title">{step.id} {step.title}</h3>
                    <p className="process-card-desc">{step.description}</p>
                    <div className="process-card-divider" />
                    <p className="process-card-ai">{step.ai}</p>
                    <div className="process-card-tools">
                      {step.tools.map((tool, j) => (
                        <ToolPill key={j} name={tool.name} icon={tool.icon} />
                      ))}
                    </div>
                  </div>
                  <div className="process-card-visual">
                    <img
                      src={`/img/aboutMe/design-process/${step.id}.svg`}
                      alt={step.title}
                      className="process-card-svg"
                    />
                  </div>
                </div>
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
