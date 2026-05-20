"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { projects } from "../data/projects";
import Navigation from "./Navigation";
import SectionNav from "./SectionNav";
import DeviceFrame from "./DeviceFrame";
import MetricsCounter from "./MetricsCounter";
import ExternalLink from "./ExternalLink";
import HeroVisual from "./HeroVisual";

function HeroBottomRow({ project, className }) {
  return (
    <div className={className}>
      <div className="project-hero-heading">
        <h1>{project.cardTitle.main}</h1>
        {project.impact && (
          <span className="project-hero-subtitle">{project.impact.hero}</span>
        )}
      </div>
      <div className="project-hero-text">
        {project.heroProblem && <p>{project.heroProblem}</p>}
        {project.heroSolution && (
          <p>
            {project.externalLink
              ? project.heroSolution.split("{externalLink}").map((part, i, arr) =>
                  i < arr.length - 1 ? (
                    <span key={i}>{part}<ExternalLink href={project.externalLink.url}><svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{display:"inline", verticalAlign:"middle"}}><path d="M4 1.5H12.5V10M12.5 1.5L1.5 12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg></ExternalLink></span>
                  ) : part
                )
              : project.heroSolution}
          </p>
        )}
      </div>
    </div>
  );
}

function HighlightText({ text }) {
  const parts = text.split(/\{\{(.+?)\}\}/g);
  return parts.map((part, i) =>
    i % 2 === 1 ? (
      <mark key={i} className="scroll-highlight">{part}</mark>
    ) : (
      part
    )
  );
}

function ScrollHighlightObserver({ children }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const marks = el.querySelectorAll(".scroll-highlight");
    if (prefersReduced) {
      marks.forEach((m) => m.classList.add("highlighted"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("highlighted");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.8 }
    );
    marks.forEach((m) => observer.observe(m));
    return () => observer.disconnect();
  }, []);

  return <div ref={ref}>{children}</div>;
}

function OutcomeSection({ section, metrics }) {
  const { content, productVisuals } = section;
  const isArray = Array.isArray(content);

  return (
    <section id={section.id} className="project-section">
      <h2 style={section.headingAlign ? { textAlign: section.headingAlign } : undefined}>{section.heading}</h2>
      {section.summary && <p style={section.headingAlign ? { textAlign: section.headingAlign } : undefined}>{section.summary}</p>}

      {isArray ? (
        <>
          <MetricsCounter metrics={metrics} />
          {content.map((block, i) => (
            <div key={i} className="outcome-block">
              <h3>{block.subheading}</h3>
              <p className="outcome-summary">{block.text}</p>
              {block.productVisuals && block.productVisuals.length > 0 && (
                <div className="outcome-visuals">
                  {block.productVisuals.map((v, j) => (
                    <DeviceFrame key={j} alt={v.alt} placeholder={v.placeholder} />
                  ))}
                </div>
              )}
            </div>
          ))}
        </>
      ) : (
        <>
          {productVisuals && productVisuals.length > 0 && (
            <div className="outcome-visuals">
              {productVisuals.map((v, i) => (
                <DeviceFrame key={i} alt={v.alt} placeholder={v.placeholder} />
              ))}
            </div>
          )}
          <MetricsCounter metrics={metrics} />
          {content.summary && <p className="outcome-summary">{content.summary}</p>}
          {content.reflection && (
            <div className="outcome-reflection">
              <p>Reflection</p>
              <p>{content.reflection}</p>
            </div>
          )}
        </>
      )}
    </section>
  );
}

function RedactedBlock() {
  const [revealed, setRevealed] = useState(false);
  return (
    <span
      className={`redacted-mark${revealed ? " revealed" : ""}`}
      onClick={() => setRevealed(true)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") setRevealed(true); }}
      aria-label="Redacted content, click to reveal"
    >
      {revealed ? "[redacted]" : "                              "}
    </span>
  );
}

function WhatsNextSection({ section }) {
  const { content } = section;
  return (
    <section id={section.id} className="project-section">
      <h2 style={section.headingAlign ? { textAlign: section.headingAlign } : undefined}>{section.heading}</h2>
      {section.summary && <p style={section.headingAlign ? { textAlign: section.headingAlign } : undefined}>{section.summary}</p>}

      {content.reflection && (
        <div className="outcome-reflection">
          <p>Reflection</p>
          <p>{content.reflection}</p>
        </div>
      )}

      {content.futureImprovements && content.futureImprovements.length > 0 && (
        <div className="future-improvements">
          <p>Future Improvements</p>
          <div className="improvements-list">
            {content.futureImprovements.map((item, i) => (
              <div key={i} className="improvement-item">
                <div className="improvement-header">
                  <h3 className="improvement-title">
                    {item.redacted ? <RedactedBlock /> : item.title}
                  </h3>
                  <span className={`improvement-status${item.redacted ? " status-redacted" : ""}`}>
                    {item.redacted ? "Launching re:Invent 2025" : item.status === "launched" ? "Launched" : item.status}
                  </span>
                </div>
                <p className="improvement-desc">
                  {item.redacted ? <RedactedBlock /> : item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

const HEADING_COLS = { left: "1 / 5", center: "3 / 7", right: "5 / 9" };

function BlockSection({ section }) {
  const { content } = section;
  if (!content.blocks) return null;

  const headingCol = HEADING_COLS[section.headingAlign] || "1 / 5";

  return (
    <section id={section.id} className="project-section">
      <ScrollHighlightObserver>
        <div className="block-grid">
          <h2 style={{ gridColumn: headingCol }}>
            {section.heading}
          </h2>
          {content.blocks.map((block, i) =>
            block.type === "text" ? (
              <p key={i} style={{ gridColumn: block.cols }}>
                <HighlightText text={block.text} />
              </p>
            ) : block.type === "image" ? (
              <div key={i} className="block-image" style={{ gridColumn: block.cols }}>
                <DeviceFrame alt={block.image.alt} placeholder={block.image.placeholder} />
              </div>
            ) : null
          )}
        </div>
      </ScrollHighlightObserver>
    </section>
  );
}

const SECTION_RENDERERS = {
  problem: BlockSection,
  scoping: BlockSection,
  "design-iteration": BlockSection,
  outcome: OutcomeSection,
  "whats-next": WhatsNextSection,
};

export default function ProjectDetailClient({ project }) {
  const nextProject = project.nextProject
    ? projects[project.nextProject]
    : null;
  const imageRef = useRef(null);

  useEffect(() => {
    const image = imageRef.current;
    if (!image) return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      image.style.clipPath = "inset(0)";
      return;
    }

    function calcInitial() {
      const rem = parseFloat(getComputedStyle(document.documentElement).fontSize);
      const gutter = 3.75 * rem;
      const gap = 20;
      const vw = window.innerWidth;
      const colWidth = (vw - gutter * 2 - gap * 7) / 8;
      const side = colWidth * 2.5 + gap * 1.5;
      const imgH = image.offsetHeight;
      return {
        top: 0,
        right: vw - gutter - side,
        bottom: Math.max(0, imgH - side),
        left: gutter,
        scrollDist: window.innerHeight * 0.6,
      };
    }

    let init = calcInitial();

    let ticking = false;
    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const progress = Math.max(0, Math.min(1, window.scrollY / init.scrollDist));
        const t = init.top * (1 - progress);
        const r = init.right * (1 - progress);
        const b = init.bottom * (1 - progress);
        const l = init.left * (1 - progress);
        image.style.clipPath = `inset(${t}px ${r}px ${b}px ${l}px)`;
        ticking = false;
      });
    }

    function onResize() {
      init = calcInitial();
      onScroll();
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <>
      <Navigation title={project.navTitle || "Project"} />

      <article className="project-detail">
        <header className="project-hero">
          <div className="hero-image-expand" ref={imageRef}>
            <HeroVisual
              src={project.heroImage}
              alt={project.title}
            />
          </div>
          <div className="hero-content">
            <HeroBottomRow project={project} className="hero-bottom-row" />
          </div>
          <div className="hero-scroll-spacer" />
        </header>

        <SectionNav sections={project.sections} />

        <div className="project-content">
          {project.sections.map((section) => {
            const Renderer = SECTION_RENDERERS[section.id];
            if (!Renderer) return null;
            return (
              <Renderer
                key={section.id}
                section={section}
                metrics={section.id === "outcome" ? project.metrics : undefined}
              />
            );
          })}
        </div>

        {nextProject && (
          <div className="next-project">
            <p className="next-project-label">Next Project</p>
            <Link href={`/projects/${nextProject.slug}/`} className="next-project-link">
              {nextProject.title || nextProject.slug}
              <span className="next-project-arrow">→</span>
            </Link>
          </div>
        )}
      </article>

      <footer>
        <span>Alice Zhao © 2026</span>
        <span>Senior UX Designer + Builder · Seattle</span>
      </footer>
    </>
  );
}
