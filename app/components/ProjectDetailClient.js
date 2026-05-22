"use client";

import { useEffect, useRef, useState } from "react";
import { projects } from "../data/projects";
import Navigation from "./Navigation";
// import SectionNav from "./SectionNav";
import DeviceFrame from "./DeviceFrame";
import MetricsCounter from "./MetricsCounter";
import ExternalLink from "./ExternalLink";
import HeroVisual from "./HeroVisual";
import InlineImageLoop from "./InlineImageLoop";
import LetterReveal from "./LetterReveal";
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

function HighlightText({ text }) {
  const parts = text.split(/(\{img(?::[^}]*)?\})/g);
  return parts.map((part, i) => {
    const imgMatch = part.match(/^\{img:([^}]+)\}$/);
    if (imgMatch) {
      return <InlineImageLoop key={i} srcs={imgMatch[1].split(",")} />;
    }
    if (part === "{img}") {
      return <span key={i} className="inline-img" />;
    }
    return part.replace(/\{\{(.+?)\}\}/g, "$1");
  });
}

function HighlightTextReveal({ text, delayOffset = 0 }) {
  const parts = text.split(/(\{img(?::[^}]*)?\})/g);
  let charCount = delayOffset;
  return parts.map((part, i) => {
    const imgMatch = part.match(/^\{img:([^}]+)\}$/);
    if (imgMatch) {
      return <InlineImageLoop key={i} srcs={imgMatch[1].split(",")} />;
    }
    if (part === "{img}") {
      return <span key={i} className="inline-img" />;
    }
    const cleaned = part.replace(/\{\{(.+?)\}\}/g, "$1");
    const el = <LetterReveal key={i} text={cleaned} delayOffset={charCount} />;
    charCount += cleaned.length;
    return el;
  });
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
          <div key={i} className={`zigzag-row ${isLeft ? "zigzag-left" : "zigzag-right"}`}>
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

  return (
    <section id={section.id} className="project-section">
      <SectionHeading heading={section.heading} align={section.headingAlign} />
      {section.summary && <p>{section.summary}</p>}

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
      <SectionHeading heading={section.heading} />
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


function SectionHeading({ heading, align }) {
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

  const match = heading.match(/^(\d+[_.]?\s*)/);
  if (!match) {
    return (
      <h2 ref={ref} className="section-heading-reveal" style={align ? { textAlign: align } : undefined}>
        <LetterReveal text={heading} />
      </h2>
    );
  }
  const num = match[1];
  const text = heading.slice(num.length);
  return (
    <h2 ref={ref} className="section-heading-reveal" style={align ? { textAlign: align } : undefined}>
      <span className="h2-number"><LetterReveal text={num} /></span>
      <LetterReveal text={text} delayOffset={num.length} />
    </h2>
  );
}

function SectionHeadingInline({ heading }) {
  const match = heading.match(/^(\d+[_.]?\s*)/);
  if (!match) return <LetterReveal text={heading} />;
  const num = match[1];
  const text = heading.slice(num.length);
  return (
    <>
      <span className="h2-number"><LetterReveal text={num} /></span>
      <LetterReveal text={text} delayOffset={num.length} />
    </>
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

  const headingLen = section.heading.length;

  return (
    <section id={section.id} className="project-section">
      <h2 ref={ref} className="section-heading-reveal">
        <span className="h2-title"><SectionHeadingInline heading={section.heading} /></span>
        {" "}<span className="h2-lead-content"><HighlightTextReveal text={content.lead} delayOffset={headingLen} /></span>
      </h2>
      {content.subsections && content.subsections.length > 0 && (
        <div className="subsections-grid">
          {content.subsections.map((sub, i) => (
            <div key={i} className="subsection-item">
              <p className="subsection-label">{sub.label}</p>
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
  "whats-next": WhatsNextSection,
};

export default function ProjectDetailClient({ project }) {
  const nextProject = project.nextProject
    ? projects[project.nextProject]
    : null;
  const imageRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
        <header className="project-hero">
          <div className="hero-image-expand" ref={imageRef}>
            <HeroVisual
              src={project.heroImage}
              alt={project.projectTitle.main}
            />
          </div>
          <div className="hero-content">
            <HeroBottomRow project={project} className="hero-bottom-row" />
          </div>
          <div className="hero-scroll-spacer" />
        </header>

        {/* <SectionNav sections={project.sections} /> */}

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
          <NextProjectTransition project={nextProject} />
        )}
      </article>

      <Footer />
    </>
  );
}
