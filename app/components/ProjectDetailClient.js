"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { projects } from "../data/projects";
import Navigation from "./Navigation";
import SectionNav from "./SectionNav";
import DeviceFrame from "./DeviceFrame";
import MetricsCounter from "./MetricsCounter";
import HeroText from "./HeroText";
import ProjectLogistics from "./ProjectLogistics";
import MetricStack from "./MetricStack";
import HeroVisual from "./HeroVisual";

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
        <span className="decision-label">Before</span>
        <p>{before}</p>
      </div>
      <div className="decision-after">
        <span className="decision-label">After</span>
        <p>{after}</p>
      </div>
      {why && (
        <div className="decision-why">
          <span className="decision-label">Why</span>
          <p>{why}</p>
        </div>
      )}
    </div>
  );
}

const VISUAL_COLUMNS = ["S3 Tables", "Integration", "Engine"];

function ProblemSectionSticky({ heading, summary, content }) {
  const runwayRef = useRef(null);
  const frameRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isReduced, setIsReduced] = useState(false);
  const numSteps = content.length;

  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    setIsReduced(reduced);
    if (reduced) return;

    function onScroll() {
      if (!runwayRef.current || !frameRef.current) return;
      const rect = runwayRef.current.getBoundingClientRect();
      const stickyTop = 60;
      const scrolled = stickyTop - rect.top;
      const frameH = frameRef.current.offsetHeight;
      const scrollable = runwayRef.current.offsetHeight - frameH;
      if (scrollable <= 0) return;
      const progress = Math.max(0, Math.min(0.999, scrolled / scrollable));
      setActiveIndex(
        Math.min(numSteps - 1, Math.floor(progress * numSteps))
      );
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    requestAnimationFrame(onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [numSteps]);

  const headerEl = (heading || summary) && (
    <div className="ps-header">
      {heading && <h2 className="section-heading">{heading}</h2>}
      {summary && <p className="section-summary">{summary}</p>}
    </div>
  );

  if (isReduced) {
    return (
      <div>
        {headerEl}
        {content.map((part, i) => (
          <div key={i} className="ps-fallback-part">
            <span className="problem-part-label">{part.label}</span>
            <p>{part.text}</p>
          </div>
        ))}
      </div>
    );
  }

  function slideOffset(i) {
    if (i < activeIndex) return -100;
    if (i > activeIndex) return 100;
    return 0;
  }

  return (
    <div
      ref={runwayRef}
      className="ps-runway"
      style={{ height: `${numSteps * 100}vh` }}
    >
      <div ref={frameRef} className="ps-frame">
        {headerEl}
        <div className="ps-rule" />
        <div className="ps-grid">
          <div className="ps-text">
            <div className="ps-label-area">
              {content.map((part, i) => (
                <span
                  key={i}
                  className="ps-label-slide problem-part-label"
                  style={{ transform: `translateY(${slideOffset(i)}%)` }}
                >
                  {part.label}
                </span>
              ))}
            </div>
            <div className="ps-body-area">
              {content.map((part, i) => (
                <p
                  key={i}
                  className="ps-body-slide ps-body"
                  style={{ transform: `translateY(${slideOffset(i)}%)` }}
                >
                  {part.text}
                </p>
              ))}
            </div>
          </div>
          <div className="ps-visuals">
            {VISUAL_COLUMNS.map((_, ci) => (
              <div key={ci} className="ps-rect">
                {content.map((_, si) => {
                  const hue = (ci * 120 + si * 40) % 360;
                  return (
                    <div
                      key={si}
                      className="ps-rect-slide"
                      style={{
                        transform: `translateY(${slideOffset(si)}%)`,
                        background: `hsl(${hue}, 30%, 80%)`,
                      }}
                    />
                  );
                })}
              </div>
            ))}
          </div>
        </div>
        <div className="ps-rule" />
      </div>
    </div>
  );
}

function ProblemSection({ section }) {
  const { content, research } = section;
  const isArray = Array.isArray(content);
  const hasDiagrams = isArray && content.some((part) => part.diagram);

  return (
    <section id={section.id} className="project-section">
      {hasDiagrams ? (
        <>
          <ProblemSectionSticky heading={section.heading} summary={section.summary} content={content} />
          {research && (
            <div className="problem-research-below">
              <ResearchStats stats={research.stats} />
            </div>
          )}
        </>
      ) : isArray ? (
        <>
        <div className="ps-header">
          <h2 className="section-heading">{section.heading}</h2>
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
  const isArray = Array.isArray(content);
  const hasDiagrams = isArray && content.some((part) => part.diagram);

  return (
    <section id={section.id} className="project-section">
      {isArray && hasDiagrams ? (
        <ProblemSectionSticky heading={section.heading} summary={section.summary} content={content} />
      ) : (
        <>
          <div className="ps-header">
            <h2 className="section-heading">{section.heading}</h2>
            {section.summary && <p className="section-summary">{section.summary}</p>}
          </div>
          {isArray ? (
            <div className="problem-narrative">
              {content.map((part, i) => (
                <div key={i} className="problem-part">
                  <span className="problem-part-label">{part.label}</span>
                  <p>{part.text}</p>
                </div>
              ))}
            </div>
          ) : (
            <>
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
            </>
          )}
        </>
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
        <h2 className="section-heading">{section.heading}</h2>
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
              <span className="reflection-label">Reflection</span>
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
        <h2 className="section-heading">{section.heading}</h2>
        {section.summary && <p className="section-summary">{section.summary}</p>}
      </div>

      {content.reflection && (
        <div className="outcome-reflection">
          <span className="reflection-label">Reflection</span>
          <p>{content.reflection}</p>
        </div>
      )}

      {content.futureImprovements && content.futureImprovements.length > 0 && (
        <div className="future-improvements">
          <span className="reflection-label">Future Improvements</span>
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

const SECTION_RENDERERS = {
  problem: ProblemSection,
  "design-iteration": DesignIterationSection,
  outcome: OutcomeSection,
  "whats-next": WhatsNextSection,
};

export default function ProjectDetailClient({ project }) {
  const nextProject = project.nextProject
    ? projects[project.nextProject]
    : null;

  const imageRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const PARALLAX = 0.5;

    function onScroll() {
      const scrollY = window.scrollY;

      if (imageRef.current) {
        imageRef.current.style.transform = `translateY(${scrollY * PARALLAX}px)`;
      }

      if (imageRef.current && textRef.current) {
        const imageBottom = imageRef.current.getBoundingClientRect().bottom;
        const paragraphs = textRef.current.querySelectorAll("p");
        paragraphs.forEach((p) => {
          const overlap = Math.max(0, imageBottom - p.getBoundingClientRect().top);
          p.style.setProperty("--overlap", `${overlap}px`);
        });
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    requestAnimationFrame(onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <Navigation title={project.navTitle || "Project"} />

      <article className="project-detail">
        <header className="project-hero">
          <div className="project-hero-inner">
            <div ref={imageRef} style={{ willChange: "transform" }}>
              <HeroVisual
                src={project.heroImage}
                alt={project.title}
              />
            </div>
            <div ref={textRef}>
              <HeroText
                problem={project.heroProblem}
                solution={project.heroSolution}
                keynote={project.keynote}
              />
            </div>
            <ProjectLogistics
              role={project.role}
              timeline={project.timeline}
              team={project.team}
            />
            <MetricStack
              metrics={project.metrics}
              direction="vertical"
            />
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
            <span className="next-project-label">Next Project</span>
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
