"use client";

import Link from "next/link";
import { projects } from "../data/projects";
import Navigation from "./Navigation";
import SectionNav from "./SectionNav";
import AICallout from "./AICallout";
import DeviceFrame from "./DeviceFrame";
import MetricsCounter from "./MetricsCounter";

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

function ProblemSection({ section }) {
  const { content, aiCallout, research } = section;
  return (
    <section id={section.id} className="project-section">
      <h2 className="section-heading">{section.heading}</h2>
      <div className="problem-grid">
        <div className="problem-narrative">
          <div className="problem-part">
            <span className="problem-part-label">Who</span>
            <p>{content.who}</p>
          </div>
          <div className="problem-part">
            <span className="problem-part-label">Why</span>
            <p>{content.why}</p>
          </div>
          <div className="problem-part">
            <span className="problem-part-label">What</span>
            <p>{content.what}</p>
          </div>
        </div>
        <div className="problem-sidebar">
          {research && <ResearchStats stats={research.stats} />}
        </div>
      </div>
      {aiCallout && <AICallout icon={aiCallout.icon} text={aiCallout.text} />}
    </section>
  );
}

function DesignIterationSection({ section }) {
  const { content, aiCallout } = section;
  return (
    <section id={section.id} className="project-section">
      <h2 className="section-heading">{section.heading}</h2>
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
      {aiCallout && <AICallout icon={aiCallout.icon} text={aiCallout.text} />}
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
  return (
    <section id={section.id} className="project-section">
      <h2 className="section-heading">{section.heading}</h2>
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
    </section>
  );
}

const SECTION_RENDERERS = {
  problem: ProblemSection,
  "design-iteration": DesignIterationSection,
  outcome: OutcomeSection,
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
            <span className="breadcrumb-sep">/</span>
            <span className="breadcrumb-current">
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
