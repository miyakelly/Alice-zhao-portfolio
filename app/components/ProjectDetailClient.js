"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { projects } from "../data/projects";
import Navigation from "./Navigation";
// import SectionNav from "./SectionNav";
import DeviceFrame from "./DeviceFrame";
import MetricsCounter from "./MetricsCounter";
import ExternalLink from "./ExternalLink";
import HeroVisual from "./HeroVisual";
import InlineImageLoop from "./InlineImageLoop";
import LineReveal from "./LineReveal";
import NextProjectTransition from "./NextProjectTransition";
import Footer from "./Footer";

function HeroBottomRow({ project, className }) {
  return (
    <div className={className}>
      <div className="project-hero-heading">
        <h1>{project.projectTitle.main}</h1>
        {project.projectTitle.sub && (
          <span className="project-hero-subtitle">{project.projectTitle.sub}</span>
        )}
      </div>
      <div className="project-hero-text">
        {project.heroProblem && <p>{project.heroProblem}</p>}
        {project.heroSolution && (
          <p>
            <HeroSolutionText
              text={project.heroSolution}
              externalLink={project.externalLink}
            />
          </p>
        )}
      </div>
    </div>
  );
}


function HeroSolutionText({ text, externalLink }) {
  const parts = text.split(/(\{img(?::[^}]*)?\}|\{link:[^}]+\})/g);
  return parts.map((part, i) => {
    const imgMatch = part.match(/^\{img:([^}]+)\}$/);
    if (imgMatch) {
      const loop = <InlineImageLoop key={i} srcs={imgMatch[1].split(",")} />;
      if (externalLink) {
        return <ExternalLink key={i} href={externalLink.url}>{loop}</ExternalLink>;
      }
      return loop;
    }
    const linkMatch = part.match(/^\{link:([^}]+)\}$/);
    if (linkMatch && externalLink) {
      return <ExternalLink key={i} href={externalLink.url}>{linkMatch[1]}</ExternalLink>;
    }
    return part;
  });
}


function OutcomeZigzag({ content }) {
  const expandRef = useRef(null);

  useEffect(() => {
    const img = expandRef.current;
    if (!img) return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    function getOffset() {
      const rect = img.getBoundingClientRect();
      const vw = window.innerWidth;
      const left = rect.left;
      const right = vw - rect.right;
      const top = 0;
      const bottom = 0;
      return { left, right, top, bottom };
    }

    let maxInset = getOffset();

    let ticking = false;
    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const rect = img.getBoundingClientRect();
        const vh = window.innerHeight;
        const imgCenter = rect.top + rect.height / 2;
        const distFromCenter = imgCenter - vh / 2;
        const scrollRange = vh * 0.6;
        const progress = Math.max(0, Math.min(1, 1 - distFromCenter / scrollRange));

        const l = maxInset.left * (1 - progress);
        const r = maxInset.right * (1 - progress);
        img.style.clipPath = `inset(0px ${r}px 0px ${l}px)`;
        ticking = false;
      });
    }

    function onResize() {
      img.style.clipPath = "none";
      maxInset = getOffset();
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

  const lastBlockIdx = content.length - 1;

  return (
    <div className="outcome-zigzag">
      {content.map((block, i) => {
        const isLeft = i % 2 === 0;
        const isLastBlock = i === lastBlockIdx;
        const images = block.images || [];
        const regularImages = isLastBlock ? images.slice(0, -1) : images;
        const expandImage = isLastBlock && images.length > 0 ? images[images.length - 1] : null;

        return (
          <div key={i} className={`zigzag-row col-grid ${isLeft ? "zigzag-left" : "zigzag-right"}`}>
            <div className="zigzag-text">
              <p className="subsection-label">{block.subheading}</p>
              <p className="subsection-text">{block.text}</p>
            </div>
            <div className="zigzag-images">
              {regularImages.map((img, j) => (
                <img key={j} src={img.src} alt={img.alt} className="zigzag-img" />
              ))}
            </div>
            {expandImage && (
              <img
                ref={expandRef}
                src={expandImage.src}
                alt={expandImage.alt}
                className="zigzag-expand-img"
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

function OutcomeSection({ section, metrics }) {
  const { content, productVisuals } = section;
  const isArray = Array.isArray(content);
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
    <section id={section.id} className="project-section col-grid">
      <h2 ref={headingRef} className={`section-heading-reveal${section.headingAlign === "center" ? " heading-center" : ""}`}>
        <LineReveal heading={section.heading} lead={section.summary || ""} align={section.headingAlign} />
      </h2>

      {isArray ? (
        <>
          <MetricsCounter metrics={metrics} />
          <OutcomeZigzag content={content} />
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


function BlockSection({ section }) {
  const { content } = section;
  if (!content.lead) return null;
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
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
    <section id={section.id} className="project-section col-grid">
      <h2 ref={ref} className="section-heading-reveal">
        <LineReveal heading={section.heading} lead={content.lead} />
      </h2>
      {content.subsections && content.subsections.length > 0 && (
        <div className="subsections-grid">
          {content.subsections.map((sub, i) => (
            <div key={i} className="subsection-item col-grid">
              <p className="subsection-label">{sub.label}</p>
              {sub.images?.length === 1 && (
                <img className="subsection-img subsection-img-full" src={sub.images[0].src} alt={sub.images[0].alt} />
              )}
              {sub.images?.length >= 2 && (
                <div className="subsection-img-pair">
                  <img className="subsection-img subsection-img-left" src={sub.images[0].src} alt={sub.images[0].alt} />
                  <img className="subsection-img subsection-img-right" src={sub.images[1].src} alt={sub.images[1].alt} />
                </div>
              )}
              <p className="subsection-text">{sub.text}</p>
            </div>
          ))}
        </div>
      )}
      {content.sectionImages
        ? content.sectionImages.map((img, i) => (
            <img key={i} className="section-image" src={img.src} alt={img.alt} />
          ))
        : content.sectionImage && (
            <img className="section-image" src={content.sectionImage.src} alt={content.sectionImage.alt} />
          )}
    </section>
  );
}

const SECTION_RENDERERS = {
  problem: BlockSection,
  scoping: BlockSection,
  "design-iteration": BlockSection,
  outcome: OutcomeSection,
};

const TRANSITION_SECTION_IDS = ["problem", "scoping", "design-iteration", "outcome"];

function ProjectSectionTransitionTrack({ sections, metrics, onHeroDimChange }) {
  const trackRef = useRef(null);
  const [handoff, setHandoff] = useState({ incomingIndex: null, progress: 0 });

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const panels = Array.from(track.querySelectorAll(".project-section-handoff-panel"));
    if (panels.length <= 1) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    let ticking = false;
    function updateHandoff() {
      const vh = window.innerHeight;
      let nextHandoff = { incomingIndex: null, progress: 0 };

      for (let i = 0; i < panels.length; i += 1) {
        const rect = panels[i].getBoundingClientRect();
        if (rect.top < vh * 1.25 && rect.top > -vh * 0.2) {
          const progress = Math.max(0, Math.min(1, 1 - rect.top / (vh * 1.25)));
          nextHandoff = { incomingIndex: i, progress };
        }
      }

      setHandoff((current) => {
        if (
          current.incomingIndex === nextHandoff.incomingIndex &&
          Math.abs(current.progress - nextHandoff.progress) < 0.01
        ) {
          return current;
        }
        return nextHandoff;
      });
      if (panels[0]) {
        const isMobile = window.innerWidth <= 900;
        const firstRect = panels[0].getBoundingClientRect();
        const heroProgress = isMobile
          ? Math.max(0, Math.min(1, (window.scrollY - 24) / (vh * 1.35)))
          : Math.max(0, Math.min(1, 1 - firstRect.top / (vh * 1.25)));
        const isHeroHandoff = isMobile
          ? window.scrollY > 24 && firstRect.top > -vh * 0.2
          : firstRect.top < vh * 1.25 && firstRect.top > -vh * 0.2;
        onHeroDimChange(isHeroHandoff ? heroProgress : 0);
      }
      ticking = false;
    }

    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(updateHandoff);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    updateHandoff();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [sections, onHeroDimChange]);

  if (sections.length === 0) return null;

  return (
    <div ref={trackRef} className="project-section-transition-track">
      {sections.map((section, index) => {
        const Renderer = SECTION_RENDERERS[section.id];
        if (!Renderer) return null;

        const isIncoming = handoff.incomingIndex === index;
        const isBehind = handoff.incomingIndex === index + 1;
        const panelStyle = isIncoming
          ? {
              "--handoff-progress": handoff.progress,
              "--incoming-y": `${(1 - handoff.progress) * 10}vh`,
            }
          : isBehind
            ? {
                "--panel-dim": `${handoff.progress * 50}%`,
                "--behind-y": `${handoff.progress * 48}vh`,
              }
            : undefined;

        return (
          <div
            key={section.id}
            className={`project-section-handoff-panel${isIncoming ? " is-incoming" : ""}${isBehind ? " is-behind" : ""}`}
            style={panelStyle}
          >
            <Renderer
              section={section}
              metrics={section.id === "outcome" ? metrics : undefined}
            />
          </div>
        );
      })}
    </div>
  );
}

export default function ProjectDetailClient({ project }) {
  const nextProject = project.nextProject
    ? projects[project.nextProject]
    : null;
  const imageRef = useRef(null);
  const [heroDim, setHeroDim] = useState(0);
  const transitionSections = project.sections.filter((section) =>
    TRANSITION_SECTION_IDS.includes(section.id)
  );
  const normalSections = project.sections.filter((section) =>
    !TRANSITION_SECTION_IDS.includes(section.id)
  );

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  useEffect(() => {
    const image = imageRef.current;
    if (!image) return;

    const fromTransition = sessionStorage.getItem("next-project-transition");
    if (fromTransition) {
      sessionStorage.removeItem("next-project-transition");
    }

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
        scrollDist: window.innerHeight * 0.3,
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
        <header
          className="project-hero"
          style={{
            "--hero-dim": `${heroDim * 50}%`,
            "--hero-behind-y": `${heroDim * 42}vh`,
          }}
        >
          <div className="hero-image-expand" ref={imageRef}>
            <HeroVisual
              src={project.heroImage}
              alt={project.projectTitle.main}
            />
          </div>
          <div className="hero-content">
            <HeroBottomRow project={project} className="hero-bottom-row col-grid" />
          </div>
          <div className="hero-scroll-spacer" />
        </header>

        {/* <SectionNav sections={project.sections} /> */}

        <div className="project-content">
          <ProjectSectionTransitionTrack
            sections={transitionSections}
            metrics={project.metrics}
            onHeroDimChange={setHeroDim}
          />
          {normalSections.map((section) => {
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
          <NextProjectTransition project={nextProject} />
        )}
      </article>

      {!nextProject && <Footer />}
    </>
  );
}
