---
name: Alice Zhao Portfolio
description: A precise, playful UX portfolio built like a modern interface on aged paper.
colors:
  parchment: "#ffffff"
  parchment-panel: "#ffffff"
  ink: "#0A0D10"
  muted-blue-gray: "#6F7F8A"
  signal-blue: "#2936CF"
  ruled-border: "#D0DBDF"
  carbon-card: "#101316"
  carbon-card-raised: "#181C1F"
  drafting-blue: "#738B9E"
  dark-leather: "#110F0B"
  dark-panel: "#1A1712"
  dark-ink: "#F0EADD"
  dark-muted: "#6B6358"
  dark-border: "#2A2620"
typography:
  display:
    fontFamily: "EB Garamond, Georgia, Times New Roman, serif"
    fontSize: "clamp(1.25rem, 2.5vw, 2.25rem)"
    fontWeight: 400
    lineHeight: 1.2
    letterSpacing: "-0.03em"
  headline:
    fontFamily: "Satoshi, Helvetica Neue, Helvetica, Arial, sans-serif"
    fontSize: "clamp(2.5rem, 4vw, 4rem)"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "clamp(0.001rem, 0.2vw, 0.0025rem)"
  title:
    fontFamily: "EB Garamond, Georgia, Times New Roman, serif"
    fontSize: "clamp(1.125rem, 4vw, 3rem)"
    fontWeight: 400
    lineHeight: 1
  body:
    fontFamily: "Satoshi, Helvetica Neue, Helvetica, Arial, sans-serif"
    fontSize: "clamp(0.5rem, 2vw, 1.3rem)"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "IBM Plex Mono, SF Mono, Fira Code, monospace"
    fontSize: "clamp(0.5625rem, 1vw, 0.6875rem)"
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: "0.08em"
rounded:
  none: "0"
  hairline: "2px"
  image: "4px"
  inline-pill: "0.6em"
spacing:
  grid-gap: "20px"
  nav-height: "3.75rem"
  nav-height-mobile: "2.5rem"
  page-gutter: "3.75rem"
  page-gutter-mobile: "2.5rem"
  card-padding: "20px"
  metric-padding: "24px"
  section-y: "6rem"
components:
  dashboard-card:
    backgroundColor: "{colors.parchment-panel}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "{spacing.card-padding}"
  metric-card:
    backgroundColor: "{colors.parchment}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "{spacing.metric-padding}"
  nav-control:
    backgroundColor: "{colors.carbon-card}"
    textColor: "{colors.dark-ink}"
    rounded: "{rounded.none}"
    height: "{spacing.nav-height}"
    width: "{spacing.nav-height}"
  inline-image-loop:
    backgroundColor: "{colors.muted-blue-gray}"
    rounded: "{rounded.inline-pill}"
    width: "2.5em"
    height: "1.2em"
---

# Design System: Alice Zhao Portfolio

## Overview

**Creative North Star: "The Cartographer's Workbench"**

The portfolio should feel like a precise modern interface drafted on archival paper. The current system combines hard-edged digital geometry, bento-grid utility, scroll-scrubbed motion, and a low-opacity paper substrate with grain, ruled construction lines, compass marks, and faint annotations. The result should read as technical and handmade at the same time.

The product voice is precise, confident, and fun. Hiring managers should understand Alice's seniority, technical fluency, and shipped impact in a few scrolls. Every viewport needs a strong scan path: project title, impact, metric, visual evidence, or interaction craft. Decoration is allowed only when it reinforces the idea that the site itself is a portfolio artifact.

The system rejects generic template aesthetics, SaaS landing page energy, gradient blobs, Lottie-style filler, beauty-first portfolios with no strategic thinking, process theater, walls of text, and anything that looks like unedited AI output.

**Key Characteristics:**

- Parchment substrate with modern interface precision.
- Thin ruled borders, square corners, and hard grid geometry.
- Restrained surfaces with rare signal-blue accents.
- Display serif moments used for warmth and character, not generic editorial styling.
- Motion as evidence of craft, disabled cleanly under reduced motion.
- Dense, scannable information hierarchy built for a 30-second hiring-manager pass.

## Colors

The palette is currently a restrained light system with one saturated blue signal color, plus a warm dark mode that shifts from paper to leather.

### Primary

- **Signal Blue** (`#2936CF`): The only saturated accent. Use for high-value emphasis, active states, and moments that need a clear technical signal. Keep it rare so it still feels intentional.

### Neutral

- **Parchment** (`#ffffff`): Current light page background. The intended material role is aged paper, with texture supplied by the fixed paper overlay.
- **Parchment Panel** (`#ffffff`): Current secondary surface for dashboard cards and panels.
- **Ink** (`#0A0D10`): Primary text, borders for strong containers, metric card outlines, and structural rules.
- **Muted Blue Gray** (`#6F7F8A`): Metadata, tags, secondary copy, and lower-priority labels.
- **Ruled Border** (`#D0DBDF`): Light-mode construction-line border color.
- **Carbon Card** (`#101316`): Navigation controls and dark interface blocks.
- **Carbon Card Raised** (`#181C1F`): Secondary dark control surface.
- **Drafting Blue** (`#738B9E`): Low-opacity paper-line graphics and cartographic construction marks.
- **Dark Leather** (`#110F0B`): Dark-mode page background.
- **Dark Panel** (`#1A1712`): Dark-mode panel surface.
- **Dark Ink** (`#F0EADD`): Dark-mode foreground and warm light marks.
- **Dark Muted** (`#6B6358`): Dark-mode metadata and low-priority copy.
- **Dark Border** (`#2A2620`): Dark-mode ruled borders.

### Named Rules

**The Rare Signal Rule.** Signal Blue should stay under roughly 10% of any viewport. It is for active decisions and emphasis, not general decoration.

**The Material First Rule.** Texture and ruled marks create atmosphere; do not replace them with gradient blobs, glass panels, or generic abstract fills.

**The Warm Dark Rule.** Dark mode is aged leather and vellum, not cool slate or neon-on-black.

## Typography

**Display Font:** EB Garamond (with Georgia and Times New Roman fallbacks)  
**Body Font:** Satoshi (with Helvetica Neue, Helvetica, Arial fallbacks)  
**Label/Mono Font:** IBM Plex Mono (with SF Mono and Fira Code fallbacks)

**Character:** Satoshi provides the product-design precision and dense readability. EB Garamond adds the archival, hand-authored warmth. IBM Plex Mono is used as a small technical annotation layer, not as a generic developer costume.

### Hierarchy

- **Headline** (Satoshi; 700-800; token `--t-h1`; line-height `1.1`): Project page h1, major section titles, and high-confidence structural headings.
- **Display** (EB Garamond; 400; hero and narrative clamps; line-height `1-1.2`): Homepage hero copy, project hero narrative, next-project label, large link blocks, and warm expressive moments.
- **Title** (EB Garamond; 400; token `--t-h2` or card title clamp; line-height `1`): Dashboard card titles and contact-style expressive links.
- **Body** (Satoshi; 400; token `--t-p`; line-height `1.4-1.5`): Case study prose, about copy, card impact statements, and explanatory text.
- **Label** (IBM Plex Mono or small Satoshi; 400-800; `0.5625rem-0.875rem`; uppercase when used as metadata): Tags, card labels, hints, section metadata, and tool annotations.

### Named Rules

**The Scan First Rule.** Use type size, weight, and grid position so a viewer can understand the page before reading body text.

**The Warmth In Small Doses Rule.** EB Garamond should create moments of voice. Do not let it turn the portfolio into a generic editorial magazine layout.

**The Mono Annotation Rule.** Monospace belongs in short labels, tags, and technical annotations. Do not use it for long body copy.

## Elevation

The system is flat by default. Depth comes from borders, sticky layering, clip-path reveals, paper texture, and hard offset shadows that appear as interaction response. There is no soft card elevation vocabulary. Resting surfaces should feel printed or ruled onto the page.

### Shadow Vocabulary

- **Dashboard Lift Shadow** (`box-shadow: -8px 8px 0 #000`): Hard offset shadow used when hoverable dashboard cards lift with `translate(8px, -8px)`.
- **Touch Lift Shadow** (`box-shadow: -4px 4px 0 #000`): Smaller hard offset response for touch-active states.
- **Overlay Dim** (`color-mix(in srgb, var(--ink) var(--panel-dim), transparent)`): Scroll handoff dimming layer used for project section transitions.

### Named Rules

**The Flat At Rest Rule.** Cards, nav, and content panels are flat until interaction or scroll state creates hierarchy.

**The Hard Shadow Rule.** If depth is needed, use the existing hard offset language. Avoid soft neumorphic, glassy, or diffuse SaaS shadows.

## Components

### Buttons

Buttons are square, utilitarian controls rather than pill-shaped marketing CTAs.

- **Shape:** Square corners (`0` radius). Nav controls are perfect squares using `var(--nav-height)`.
- **Primary:** Dark carbon background (`#101316`) with warm light icon strokes (`#F4F3EF`), used for menu and mode controls.
- **Hover / Focus:** Background shifts to Signal Blue (`#2936CF`) with fast `0.18s` background transition. Focus states should be visible and should not rely on color alone.
- **Motion:** Hamburger lines rotate and fade over `0.22s`; mode icons rotate and scale over `0.3s`.

### Chips

Tags are annotation marks, not pills.

- **Style:** Small monospace or small Satoshi text, muted color, loose spacing, no filled background by default.
- **State:** If a tag needs emphasis, prefer a thin full border or Signal Blue text. Do not use large rounded badges.

### Cards / Containers

Cards are ruled interface cells with hover response, not soft marketing cards.

- **Corner Style:** Square (`0` radius) for dashboard and metric cards. Image thumbnails may use `4px`; inline image loops use `0.6em`.
- **Background:** `var(--bg)` or `var(--bg2)` in light mode; `var(--card)` and `var(--card2)` in dark controls.
- **Shadow Strategy:** No resting shadow. Hoverable dashboard cards move `translate(8px, -8px)` while a hard offset shadow appears behind.
- **Border:** Dashboard cards use `var(--card-border)`. Metric cards use `1px solid var(--ink)`.
- **Internal Padding:** Dashboard cards use `20px` desktop and `12px` mobile. Metric cards use `24px`.

### Inputs / Fields

The current site has no canonical form field system. If inputs are introduced, derive them from the ruled interface language:

- **Style:** Square corners, `1px solid var(--border)`, `var(--bg)` background, Satoshi body text.
- **Focus:** Full-border color shift to Signal Blue plus a visible outline. Do not use glow or glass blur.
- **Error / Disabled:** Error states should use a full border and text label. Avoid side-stripe alert patterns.

### Navigation

Navigation is fixed, quiet, and highly functional.

- **Top Controls:** Menu and mode buttons sit fixed at the viewport corners above content.
- **Name / Title Bar:** Centered name, optional route title at left, `13px` Satoshi, dark-on-paper.
- **Drawer:** Fullscreen black drawer below the nav height, revealed with `clip-path` over `0.35s cubic-bezier(0.4, 0, 0.2, 1)`.
- **Drawer Links:** Large Satoshi links, `clamp(36px, 5vw, 64px)`, heavy weight, white at 85% opacity, pure white on hover.
- **Section Nav:** Sticky dark strip with horizontal scroll on desktop and dropdown treatment on mobile.

### Signature Component: Scroll Dashboard

The homepage dashboard is the signature component. It starts as a centered hero avatar card, then uses scroll progress to shrink the hero and assemble eight surrounding cards into a bento-like dashboard. The final state turns cards hoverable; before that, motion is scroll-scrubbed rather than autonomous. Any new effect in this region must respect the dashboard readiness state and reduced-motion fallback.

### Signature Component: Paper Texture

The fixed texture overlay supplies the cartographic material layer. It combines SVG turbulence grain, drafted construction lines, small annotations, and a soft vignette at low opacity. It should stay subtle: felt more than seen.

## Do's and Don'ts

### Do:

- **Do** preserve the "ancient cartography meets modern technology" contrast: precise modern grids over warm, archival material.
- **Do** keep every viewport scannable for hiring managers making a fast decision.
- **Do** use Signal Blue sparingly for true emphasis, active states, or high-value interaction details.
- **Do** use square cards, thin borders, and hard offset hover shadows for dashboard-like surfaces.
- **Do** disable animation under `prefers-reduced-motion: reduce`; static layouts must remain complete.
- **Do** make hover interactions available through a touch or static equivalent.
- **Do** use transform and opacity for motion where possible.
- **Do** keep paper texture, construction lines, and compass marks between 3% and 6% perceived opacity.
- **Do** document and calibrate signature motion values when adding new interaction work.

### Don't:

- **Don't** use generic template aesthetics: effects or layouts that look dropped in without thought.
- **Don't** add SaaS landing page energy: gradient blobs, Lottie animations, hero-metric templates, or decorative glassmorphism.
- **Don't** create beauty-first portfolio sections that reveal no strategic thinking.
- **Don't** show process theater, especially generic double-diamond diagrams disconnected from actual decisions.
- **Don't** create walls of text without visual hierarchy.
- **Don't** introduce AI slop: anything that looks like an unedited generated landing page.
- **Don't** use large rounded icon cards, nested cards, or repeated same-size feature-card grids.
- **Don't** use colored side-stripe borders as accents. Use full borders, small labels, icons, or restrained background shifts.
- **Don't** make dark mode cool blue/slate or neon. Keep it warm, leathery, and quiet.
- **Don't** add animation libraries unless a specific effect cannot be built with the existing CSS and browser APIs.
