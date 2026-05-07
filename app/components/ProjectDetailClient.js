"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { projects } from "../data/projects";
import Navigation from "./Navigation";
import navStyles from "./Navigation.module.css";
import SectionNav from "./SectionNav";
import AICallout from "./AICallout";
import DeviceFrame from "./DeviceFrame";
import MetricsCounter from "./MetricsCounter";
import {
  DiagramImagine,
  DiagramProblem,
  DiagramSolution,
} from "./S3TablesProblemDiagrams";
import {
  DiagramScopingChaos,
  DiagramScopingOrganized,
  DiagramScopingPrioritized,
  DiagramIntegrationChallenge,
  DiagramIntegrationOptions,
  DiagramIntegrationSolution,
} from "./S3TablesIterationDiagrams";

const DIAGRAM_COMPONENTS = {
  imagine: DiagramImagine,
  problem: DiagramProblem,
  solution: DiagramSolution,
  "scoping-chaos": DiagramScopingChaos,
  "scoping-organized": DiagramScopingOrganized,
  "scoping-prioritized": DiagramScopingPrioritized,
  "integration-challenge": DiagramIntegrationChallenge,
  "integration-options": DiagramIntegrationOptions,
  "integration-solution": DiagramIntegrationSolution,
};

function ResearchStats({ stats }) {
  if (!stats || stats.length === 0) return null;
  return (
    <div className="research-stats">
      {stats.map((s, i) => (
        <div key={i} className="research-stat">
          <span className="research-stat-value">{s.value}</span>
          <span className="research-stat-label">{s.label}</span>
        </div>
      ))}
    </div>
  );
}

function DecisionCard({ before, after, why }) {
  return (
    <div className="decision-card">
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

function ProblemSectionScrollable({ content }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const partRefs = useRef([]);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const observers = [];
    partRefs.current.forEach((el, i) => {
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveIndex(i);
        },
        { rootMargin: "-40% 0px -40% 0px" }
      );
      observer.observe(el);
      observers.push(observer);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, [content]);

  return (
    <div className="problem-scroll-layout">
      <div className="problem-scroll-text">
        {content.map((part, i) => (
          <div
            key={i}
            ref={(el) => (partRefs.current[i] = el)}
            className="problem-scroll-part"
          >
            <span className="problem-part-label">{part.label}</span>
            <p>{part.text}</p>
          </div>
        ))}
      </div>
      <div className="problem-scroll-diagrams">
        <div className="problem-scroll-diagrams-sticky">
          {content.map((part, i) => {
            const DiagramComp = part.diagram && DIAGRAM_COMPONENTS[part.diagram];
            return (
              <div
                key={i}
                className={`problem-scroll-diagram ${activeIndex === i ? "active" : ""}`}
              >
                {DiagramComp ? <DiagramComp /> : null}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function ProblemSection({ section }) {
  const { content, aiCallout, research } = section;
  const hasDiagrams = content.some((part) => part.diagram);

  return (
    <section id={section.id} className="project-section">
      <h2 className="section-heading">{section.heading}</h2>
      {hasDiagrams ? (
        <>
          <ProblemSectionScrollable content={content} />
          {research && (
            <div className="problem-research-below">
              <ResearchStats stats={research.stats} />
            </div>
          )}
        </>
      ) : (
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
      )}
      {aiCallout && <AICallout icon={aiCallout.icon} text={aiCallout.text} />}
    </section>
  );
}

function DesignIterationSection({ section }) {
  const { content, aiCallout } = section;
  const isArray = Array.isArray(content);
  const hasDiagrams = isArray && content.some((part) => part.diagram);

  return (
    <section id={section.id} className="project-section">
      <h2 className="section-heading">{section.heading}</h2>
      {isArray && hasDiagrams ? (
        <ProblemSectionScrollable content={content} />
      ) : isArray ? (
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
      {aiCallout && <AICallout icon={aiCallout.icon} text={aiCallout.text} />}
    </section>
  );
}

function OutcomeSection({ section, metrics }) {
  const { content, productVisuals } = section;
  const isArray = Array.isArray(content);

  return (
    <section id={section.id} className="project-section">
      <h2 className="section-heading">{section.heading}</h2>

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
      <h2 className="section-heading">{section.heading}</h2>

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

  return (
    <>
      <Navigation
        breadcrumb={
          <>
            <Link href="/">Home</Link>
            <span className={navStyles.sep}>/</span>
            <span className={navStyles.current}>
              {project.description
                ? project.description.split(" ").slice(0, 4).join(" ") + "…"
                : "Project"}
            </span>
          </>
        }
      />

      <article className="project-detail">
        <header className="project-hero">
          <div className="project-hero-inner">
            <div className="project-meta-row">
              <span className="project-year">{project.year}</span>
              <div className="project-tags">
                {project.tags.map((t) => (
                  <span key={t} className={`tag${t === "AI" ? " tag-ai" : ""}`}>{t}</span>
                ))}
              </div>
            </div>
            <h1 className="project-title">{project.title}</h1>
            <p className="project-description">{project.description}</p>
            <div className="project-meta-details">
              <div className="meta-detail">
                <span className="meta-label">Role</span>
                <span className="meta-value">{project.role}</span>
              </div>
              {project.timeline && (
                <div className="meta-detail">
                  <span className="meta-label">Timeline</span>
                  <span className="meta-value">{project.timeline}</span>
                </div>
              )}
              {project.team && project.team.length > 0 && (
                <div className="meta-detail">
                  <span className="meta-label">Team</span>
                  <ul className="meta-team-list">
                    {project.team.map((member, i) => (
                      <li key={i}>{member}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            {project.keynote && (
              <a
                href={project.keynote.url}
                target="_blank"
                rel="noopener noreferrer"
                className="keynote-callout"
              >
                <span className="keynote-label">{project.keynote.label}</span>
                <span className="keynote-icon">↗</span>
              </a>
            )}
            <MetricsCounter metrics={project.metrics} />
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
