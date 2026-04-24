"use client";

import { useEffect, useState, Fragment } from "react";

const MARQUEE_ITEMS = [
  "UX Design", "AI Products", "Agent Design", "Prototyping",
  "Systems Thinking", "User Research", "Design Engineering",
  "AWS", "Figma", "Claude", "Cursor", "React",
];

const HIW_BEFORE = [
  { num: "01", title: "Research (weeks)", desc: "Interviews, synthesis, affinity diagrams. Weeks of work before a single pixel." },
  { num: "02", title: "Wireframes → Reviews → Revisions", desc: "Lo-fi to hi-fi across multiple review cycles. Stakeholder feedback loops stretched timelines." },
  { num: "03", title: "Prototype in Figma", desc: "Click-through prototypes. Limited to what Figma could simulate, rarely felt real." },
  { num: "04", title: "Handoff → Wait", desc: "Handoff doc, then wait for engineering. Lost context, implementation gaps, back-and-forth." },
];

const HIW_NOW = [
  { num: "01", title: "Research + AI synthesis (hours)", desc: "Use Claude to analyze data, surface patterns, and generate research frameworks — in hours, not weeks." },
  { num: "02", title: "Explore 10× more directions", desc: "AI-assisted ideation means exploring 10 distinct concepts in the time it used to take to sketch 2." },
  { num: "03", title: "Interactive prototype, same day", desc: "Build working prototypes in code with Cursor + Claude. Real interactions, real data, same day." },
  { num: "04", title: "Design and ship together", desc: "I can close the loop myself — design, build, deploy. No handoff gap. Faster learning cycles." },
];

export default function Home() {
  const [dark, setDark] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    document.body.toggleAttribute("data-dark", dark);
  }, [dark]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeDrawer = () => setDrawerOpen(false);

  return (
    <>
      <nav className={`main-nav${scrolled ? " scrolled" : ""}`}>
        <button
          className={`nav-menu-btn${drawerOpen ? " open" : ""}`}
          onClick={() => setDrawerOpen((o) => !o)}
          aria-label="Open menu"
        >
          <span></span><span></span><span></span>
        </button>
        <a href="#" className="nav-logo">Alice Zhao</a>
        <nav className="breadcrumb">
          <span className="breadcrumb-current">Home</span>
        </nav>
        <button
          className="nav-mode-btn"
          onClick={() => setDark((d) => !d)}
          aria-label="Toggle dark mode"
        >
          <span className="mode-icon mode-icon-moon">☽</span>
          <span className="mode-icon mode-icon-sun">☀</span>
        </button>
      </nav>

      <div
        className={`drawer-overlay${drawerOpen ? " open" : ""}`}
        onClick={closeDrawer}
      ></div>
      <div className={`nav-drawer${drawerOpen ? " open" : ""}`}>
        <nav className="drawer-links">
          <a href="#" onClick={closeDrawer}>Home</a>
          <a href="#work" onClick={closeDrawer}>Projects</a>
          <a href="#about" onClick={closeDrawer}>About</a>
          <a href="#how-i-work" onClick={closeDrawer}>How I Design</a>
          <a href="#contact" onClick={closeDrawer}>Contact</a>
        </nav>
        <div className="drawer-bottom">
          <a href="https://www.linkedin.com/in/liangzhaoux/" target="_blank" rel="noreferrer">LinkedIn ↗</a>
          <a href="mailto:liangzhao0801@gmail.com">Email ↗</a>
          <a href="resume.pdf" download>Resume ↓</a>
        </div>
      </div>

      <div className="bento" id="work">
        <div className="cell-hero">
          <div className="hero-avatar-col">
            <div className="hero-avatar">photo</div>
          </div>
          <div className="hero-bio-col">
            <div className="hero-intro">
              <p className="hero-intro-text">
                <span className="hero-name-inline">Alice Zhao.</span>{" "}
                Currently building AI products for AWS, a critical part of Amazon. Senior UX Designer + Builder — amateur cook, passionate food explorer. Mostly Seattle.
              </p>
            </div>
            <div className="hero-bottom"></div>
          </div>
          <div className="hero-strip">
            <a href="resume.pdf" download className="strip-link"><span>Resume ↓</span></a>
            <a href="https://www.linkedin.com/in/liangzhaoux/" target="_blank" rel="noreferrer" className="strip-link"><span>LinkedIn ↗</span></a>
            <a href="mailto:liangzhao0801@gmail.com" className="strip-link"><span>Email ↗</span></a>
          </div>
        </div>

        <a href="#" className="cell-card cell-agent">
          <div className="card-top">
            <span className="card-year">2026</span>
            <div className="card-tags">
              <span className="tag tag-ai">AI</span>
              <span className="tag">Featured</span>
            </div>
          </div>
          <div className="card-body">
            <h2 className="card-title">Agent Opportunities<br />Across AWS Ecosystem</h2>
            <p className="card-desc">Using AI tools to discover and design agent experiences that dramatically streamline how customers interact with AWS services.</p>
            <div className="card-img">[ project screens ]</div>
          </div>
          <div className="card-footer">
            <span className="card-role">Lead UX Designer</span>
            <span className="card-arrow">↗</span>
          </div>
        </a>

        <a href="#" className="cell-card cell-s3">
          <div className="card-top">
            <span className="card-year">2025</span>
            <div className="card-tags">
              <span className="tag">Featured</span>
            </div>
          </div>
          <div className="card-body">
            <h2 className="card-title">S3 Tables:<br />0 → 1 in 8 Weeks</h2>
            <p className="card-desc">Led UX from scratch on a completely new S3 resource type — defining the full product experience on an aggressive timeline.</p>
            <div className="card-img">[ project screens ]</div>
          </div>
          <div className="card-footer">
            <span className="card-role">Lead UX Designer</span>
            <span className="card-arrow">↗</span>
          </div>
        </a>

        <a href="#" className="cell-card cell-lab1">
          <div className="card-top">
            <span className="card-year">2026</span>
            <div className="card-tags">
              <span className="tag tag-ai">AI-Built</span>
            </div>
          </div>
          <div className="card-body">
            <h2 className="card-title">This Portfolio</h2>
            <p className="card-desc">Designed and built with AI tools in a single session.</p>
            <div className="card-img">[ screenshot ]</div>
          </div>
          <div className="card-footer">
            <span className="card-role">Design + Engineering</span>
            <span className="card-arrow">↗</span>
          </div>
        </a>

        <a href="#" className="cell-card cell-lab2" style={{ cursor: "default" }}>
          <div className="card-top">
            <span className="card-year">2025</span>
            <div className="card-tags">
              <span className="tag tag-lab">Lab</span>
            </div>
          </div>
          <div className="card-body">
            <h2 className="card-title" style={{ opacity: 0.4 }}>[ Coming<br />Soon ]</h2>
            <p className="card-desc" style={{ opacity: 0.3 }}>Next AI experiment.</p>
            <div className="card-img">[ — ]</div>
          </div>
          <div className="card-footer">
            <span className="card-role" style={{ opacity: 0.3 }}>Experiment</span>
            <span className="card-arrow" style={{ opacity: 0.3 }}>—</span>
          </div>
        </a>
      </div>

      <div className="marquee">
        <div className="marquee-track">
          {[0, 1].map((dup) =>
            MARQUEE_ITEMS.map((item, i) => (
              <Fragment key={`${dup}-${i}`}>
                <span>{item}</span>
                <span className="dot">·</span>
              </Fragment>
            ))
          )}
        </div>
      </div>

      <section id="how-i-work">
        <div className="hiw-inner">
          <div className="hiw-header">
            <h2 className="hiw-title">How I Design Now</h2>
            <span className="hiw-year">The shift since 2025</span>
          </div>

          <div className="hiw-grid">
            <div className="hiw-col before">
              <div className="hiw-col-label">Before — Pre-2025</div>
              <div className="hiw-steps">
                {HIW_BEFORE.map((s) => (
                  <div className="hiw-step" key={s.num}>
                    <span className="hiw-step-num">{s.num}</span>
                    <div>
                      <div className="hiw-step-title">{s.title}</div>
                      <div className="hiw-step-desc">{s.desc}</div>
                    </div>
                  </div>
                ))}
                <div className="hiw-step">
                  <span className="hiw-step-num">→</span>
                  <div>
                    <div className="hiw-step-title" style={{ opacity: 0.5 }}>Months per feature</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="hiw-col now">
              <div className="hiw-col-label">Now — AI-Augmented</div>
              <div className="hiw-steps">
                {HIW_NOW.map((s) => (
                  <div className="hiw-step" key={s.num}>
                    <span className="hiw-step-num">{s.num}</span>
                    <div>
                      <div className="hiw-step-title">{s.title}</div>
                      <div className="hiw-step-desc">{s.desc}</div>
                    </div>
                  </div>
                ))}
                <div className="hiw-step">
                  <span className="hiw-step-num">→</span>
                  <div>
                    <div className="hiw-step-title">Days per feature</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="hiw-callout">
            <p>This portfolio is a live example — designed, built, and shipped with Claude in a single session. The work you&apos;re looking at is the process.</p>
            <span className="hiw-callout-tag">Built with Claude + Cursor</span>
          </div>
        </div>
      </section>

      <section id="about">
        <div className="about-display" aria-hidden="true">ABOUT</div>
        <div className="about-grid">
          <div className="about-bio">
            <p>I&apos;m a <strong>Senior UX Designer</strong> at Amazon Web Services, leading design for AI and cloud infrastructure products. I believe great design makes complex systems feel obvious.</p>
            <p>Since 2025 I&apos;ve made AI tools a core part of my process — not as a shortcut, but as a way to move faster, explore more, and ship better work. This portfolio is one proof point.</p>
            <p>Outside work: obsessive home cook, food culture explorer, occasional traveler.</p>
          </div>
          <div>
            <div className="detail-row">
              <span className="lbl">Currently</span>
              <span className="val">Lead UX Designer, AWS</span>
            </div>
            <div className="detail-row">
              <span className="lbl">Location</span>
              <span className="val">Mostly Seattle</span>
            </div>
            <div className="detail-row">
              <span className="lbl">Specialty</span>
              <span className="val">AI Products · Cloud UX · Agent Design</span>
            </div>
            <div className="detail-row">
              <span className="lbl">Tools</span>
              <span className="val">Figma · Claude · Cursor · React</span>
            </div>
            <div className="detail-row">
              <span className="lbl">Open to</span>
              <span className="val">Senior / Staff at AI-first companies</span>
            </div>
          </div>
        </div>
      </section>

      <section id="contact">
        <div className="contact-grid">
          <div className="contact-h">Let&apos;s<br />talk.</div>
          <div>
            <a href="https://www.linkedin.com/in/liangzhaoux/" target="_blank" rel="noreferrer" className="clink">
              <span>LinkedIn</span><span className="clink-icon">↗</span>
            </a>
            <a href="mailto:liangzhao0801@gmail.com" className="clink">
              <span>liangzhao0801@gmail.com</span><span className="clink-icon">↗</span>
            </a>
            <a href="resume.pdf" download className="clink">
              <span>Resume (PDF)</span><span className="clink-icon">↓</span>
            </a>
          </div>
        </div>
      </section>

      <footer>
        <span>Alice Zhao © 2026</span>
        <span>Senior UX Designer + Builder · Seattle</span>
      </footer>
    </>
  );
}
