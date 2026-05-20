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
import MetricCard from "./MetricCard";

function ResearchStats({ stats }) {
  if (!stats || stats.length === 0) return null;
  return (
    <div className="research-stats">
      {stats.map((s, i) => (
        <div key={i} className="research-stat hover-card">
          <span className="research-stat-value">{s.value}</span>
          <span className="research-stat-label">{s.label}</span>
        </div>
      ))}
    </div>
  );
}

function DecisionCard({ before, after, why }) {
  return (
    <div className="decision-card hover-card">
      <div className="decision-before">
        <span className="micro-label">Before</span>
        <p>{before}</p>
      </div>
      <div className="decision-after">
        <span className="micro-label">After</span>
        <p>{after}</p>
      </div>
      {why && (
        <div className="decision-why">
          <span className="micro-label">Why</span>
          <p>{why}</p>
        </div>
      )}
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

function ProblemSection({ section }) {
  const { content, research } = section;
  const isArray = Array.isArray(content);
  const hasParagraphs = !isArray && content.paragraphs;

  return (
    <section id={section.id} className="project-section">
      {hasParagraphs ? (
        <ScrollHighlightObserver>
          <div className="problem-paragraphs">
            <h2>{section.heading}</h2>
            {content.paragraphs.map((para, i) => (
              <p key={i} className="section-summary">
                <HighlightText text={para} />
              </p>
            ))}
          </div>
          {content.image && (
            <div className="problem-image">
              <DeviceFrame alt={content.image.alt} placeholder={content.image.placeholder} />
            </div>
          )}
          {research && (
            <div className="problem-research-below">
              <ResearchStats stats={research.stats} />
            </div>
          )}
        </ScrollHighlightObserver>
      ) : isArray ? (
        <>
        <div className="ps-header">
          <h2>{section.heading}</h2>
          {section.summary && <p className="section-summary">{section.summary}</p>}
        </div>
        <div className="problem-grid">
          <div className="problem-narrative">
            {content.map((part, i) => (
              <div key={i} className="problem-part">
                <span className="problem-part-label">{part.label}</span>
                <p>{part.text}</p>
              </div>
            ))}
          </div>
          <div className="problem-sidebar">
            {research && <ResearchStats stats={research.stats} />}
          </div>
        </div>
        </>
      ) : null}
    </section>
  );
}

function DesignIterationSection({ section }) {
  const { content } = section;

  if (content.paragraphs) return <ProblemSection section={section} />;

  return (
    <section id={section.id} className="project-section">
      <div className="ps-header">
        <h2>{section.heading}</h2>
        {section.summary && <p className="section-summary">{section.summary}</p>}
      </div>
      {content.challenge && (
        <div className="iteration-block">
          <h3 className="iteration-subhead">The Challenge</h3>
          <p>{content.challenge}</p>
        </div>
      )}
      {content.iteration && (
        <div className="iteration-block">
          <h3 className="iteration-subhead">The Iteration</h3>
          <p>{content.iteration}</p>
        </div>
      )}
      {content.decisions && content.decisions.length > 0 && (
        <div className="decisions-grid">
          {content.decisions.map((d, i) => (
            <DecisionCard key={i} {...d} />
          ))}
        </div>
      )}
    </section>
  );
}

function OutcomeSection({ section, metrics }) {
  const { content, productVisuals } = section;
  const isArray = Array.isArray(content);

  return (
    <section id={section.id} className="project-section">
      <div className="ps-header">
        <h2>{section.heading}</h2>
        {section.summary && <p className="section-summary">{section.summary}</p>}
      </div>

      {isArray ? (
        <>
          <MetricsCounter metrics={metrics} />
          {content.map((block, i) => (
            <div key={i} className="outcome-block">
              <h3 className="iteration-subhead">{block.subheading}</h3>
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
              <span className="micro-label">Reflection</span>
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
      <div className="ps-header">
        <h2>{section.heading}</h2>
        {section.summary && <p className="section-summary">{section.summary}</p>}
      </div>

      {content.reflection && (
        <div className="outcome-reflection">
          <span className="micro-label">Reflection</span>
          <p>{content.reflection}</p>
        </div>
      )}

      {content.futureImprovements && content.futureImprovements.length > 0 && (
        <div className="future-improvements">
          <span className="micro-label">Future Improvements</span>
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
  if (!content.blocks) {
    if (content.challenge || content.decisions) return <DesignIterationSection section={section} />;
    return <ProblemSection section={section} />;
  }

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
              <p key={i} className="block-text" style={{ gridColumn: block.cols }}>
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
  const heroRef = useRef(null);
  const metricsRef = useRef(null);

  useEffect(() => {
    const hero = heroRef.current;
    const metrics = metricsRef.current;
    if (!hero || !metrics) return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      metrics.style.transform = "translateY(0)";
      return;
    }

    let ticking = false;
    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        const heroHeight = hero.offsetHeight;
        const progress = Math.max(0, Math.min(1, scrollY / heroHeight));
        const metricsHeight = metrics.offsetHeight;
        const travel = metricsHeight; // how far the metrics should travel up
        const startOffset = metricsHeight * 0.6; // how far below to start
        const y = startOffset - travel * progress;
        metrics.style.transform = `translateY(${y}px)`;
        ticking = false;
      });
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <Navigation title={project.navTitle || "Project"} />

      <article className="project-detail">
        <header className="project-hero" ref={heroRef}>
          <div className="project-hero-inner">
            <div className="project-hero-heading">
              <h1>{project.cardTitle.main}</h1>
              {project.impact && (
                <p className="project-hero-subtitle">{project.impact.hero}</p>
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
            <div className="hero-image-container">
              <HeroVisual
                src={project.heroImage}
                alt={project.title}
              />
              {project.metrics && project.metrics.length > 0 && (
                <div className="hero-metrics" ref={metricsRef}>
                  {project.metrics.map((m, i) => (
                    <MetricCard key={i} value={`${m.value}${m.suffix || ""}`} label={m.label} />
                  ))}
                </div>
              )}
            </div>
          </div>
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
            <span className="micro-label next-project-label">Next Project</span>
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
