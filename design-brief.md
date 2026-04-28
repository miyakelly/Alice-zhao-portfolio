# Design Brief: Alice Zhao Portfolio

## 1. Feature Summary
A portfolio site for a Senior UX Designer at Amazon targeting senior/staff designer and UX engineer roles at high-paying tech companies. The site must demonstrate Alice's ability to use AI tools to design and build real products. Limited product visuals (UI screenshots, mockups) means motion, SVG art, and typographic treatments carry significant visual weight — making the craft of the site itself a portfolio piece. Scanability is the top priority: a few scrolls on any page should deliver a complete picture. Needs to ship fast and feel complete.

## 2. Primary User Action
**Click into the first case study.** The homepage is a scrollable impression-builder — HMs scan, get the vibe ("she's senior, she's technical, she ships"), then click into a featured project for proof. Resume download and contact are secondary but always accessible.

## 3. Core Principle: Scanability First

Everything is designed for a hiring manager who has 30 seconds.

**Homepage:** A few scrolls = complete picture of who Alice is, what she's worked on, and what makes her different. No section should require reading to understand — the layout, type hierarchy, and visual rhythm communicate before the words do.

**Project detail pages:** A section nav bar (modern, sticky, minimal) lets HMs jump to any phase of the project without scrolling through everything. Sections represent the actions/steps taken to build the product (e.g., Discovery, Define, Design, Ship). The nav makes the full scope of work visible at a glance — you see the process before you read any of it.

**What this means for design:**
- Dense information, not dense text. Use spatial layout to show structure.
- Every section earns its scroll. No filler, no padding-heavy empty space.
- Visual hierarchy does the work — a scan of headlines, metrics, and tags should tell the story even if you read zero body copy.

## 4. Design Direction

Based on six reference sites (Overwatch, OCI, Ledger, Beings, Wodniack, VWLab), the shared DNA is:

- **Clean + techy, not flashy.** Restrained palettes, generous whitespace, monospace accents for technical credibility (Overwatch, Ledger)
- **Contained framing.** Bracketed corners, thin borders, grid cells that feel like a HUD or dashboard — not cards floating in space (Ledger, Overwatch)
- **Typography as hero content.** Oversized split-line headers, generous letter-spacing, code motifs. Type itself becomes the visual, not a label on top of an image (Wodniack)
- **Systematic numbering as design language.** Project codes, numbered sections, sequential IDs. Reinforces "this person thinks in systems" (Wodniack, VWLab, OCI)
- **Motion as proof of craft.** When product visuals are limited, animation IS the portfolio. Scroll-driven reveals, SVG morphing, interactive data visualizations demonstrate technical skill (VWLab)
- **Sequential reveal.** Content that builds as you scroll — text that types in, elements that fade into position, not everything visible at once (Overwatch)
- **Substance over decoration.** High-quality content carries the weight, not gradients or glow effects (Beings)

**Tone:** Like a well-designed developer tool's marketing page — precise, confident, unhurried. Not a Dribbble shot. Not a startup landing page.

## 5. Visual Strategy: Limited Product Visuals

**Clarification on terminology:** "Product visuals" = UI screenshots, mockups, and design artifacts from projects Alice has built. Not photography. Alice has some product visuals but not enough to fill every space, so the site must be creative about visual density.

**Strategy:**

1. **Use product visuals strategically** — The UI screenshots and mockups that do exist should be displayed prominently inside styled device frames or contained panels. These are the highest-value visual assets and should be placed where they have maximum impact (project heroes, key decision moments).

2. **Animated SVG illustrations fill the gaps** — Abstract geometric compositions per project (circuit-like patterns, node graphs, flow diagrams). Each project card gets a unique SVG that hints at the project's nature. These animate on hover.

3. **Typographic hero treatments** — Project detail pages lead with massive type (title + a key metric or quote) alongside whatever product visual exists. Type does the heavy lifting.

4. **Interactive data moments** — Animated diagrams of information architecture, user flows as interactive SVGs, metrics that count up. These demonstrate the thinking, not just the output.

5. **Code/terminal motifs** — Subtle nods to the technical: monospace snippets, blinking cursors, command-line-style status indicators. The "How I Design Now" section already does this conceptually — extend it visually.

6. **Scroll-driven storytelling** — As users scroll through a case study, elements build on screen: process steps reveal sequentially, metrics count up. The scroll IS the presentation.

**What to avoid:**
- Generic stock illustrations or abstract blobs
- Lottie animations that feel like a SaaS landing page
- Placeholder gray boxes — every space should feel intentional
- Parallax that feels like a theme template
- Cursor followers, particle effects, anything that screams "I found a cool library"

## 6. Layout Strategy

### Homepage (refine what exists)
- Keep the bento grid — it signals systems thinking
- Hero cell: avatar + bio + quick links (already good)
- Project cards: replace placeholder areas with animated SVG compositions + strategic product visuals where available + magnetic hover states
- "How I Design Now" section: strong concept, keep it, enhance with scroll-triggered sequential reveals
- About + Contact: already solid, minor polish
- **Total scrolls to full picture: ~3-4 max.** Every viewport should deliver value

### Project Detail Pages (new)

**Section nav bar (key feature):**
- Sticky, horizontal, minimal — sits below the main nav on scroll
- Shows all project phases as clickable labels: 01 Problem / 02 Design Iteration / 03 Outcome
- Active section highlights as you scroll
- Click to jump to any section instantly
- On mobile: horizontally scrollable, compact
- This makes the entire project process visible without any scrolling — HMs see scope of work immediately

**Page structure:**

| Section | Purpose | Format |
|---|---|---|
| **Title** | One sentence: I [action] that [customer impact]. Value statement, not a project name. | Oversized type, Wodniack-style |
| **00 Overview** | One-sentence product description + role, timeline, team size, 2-3 key metrics. All visible in first viewport with section nav. | Product description + metadata + metrics strip |
| **01 Problem** | Three-part narrative: **Who** — the customers and their context. **Why** — the pain, the business gap, why this needed to exist. AI process callout: used AI tools to synthesize research data, surface market insights, identify pain points and opportunities. Shows tool icons (Claude, Kiro) inline with one-sentence description of what AI did + speed/quality gain. **What** — the product shape that emerged from AI-augmented discovery. | Customer context → problem framing → AI research callout with tool icons → product shape visual |
| **02 Design Iteration** | The challenges and how you solved them. AI process callout: used AI tools to build interactive prototypes rapidly, tested with users, iterated based on feedback. Shows tool icons inline. Show trade-offs, directions explored, what feedback changed. | AI prototyping callout with tool icons → before/after pairs → annotated decisions. "Wow" zone — animated SVG flow diagrams. |
| **03 Outcome** | Final shipped product showcase (polished visuals in device frames) + metrics with count-up animation + strategic framing: what this validated, what happened next. Optional 2-sentence reflection. | Product visuals in device frames + count-up metrics + strategic framing |

**AI tool callout component:**
A compact inline strip used once per section: `[Tool icon] + one-sentence description + speed/quality gain`. Examples:
- `[Claude icon] Synthesized 30+ survey responses → surfaced 4 key pain points in hours`
- `[Kiro icon] Built 3 interactive prototypes in 2 days → tested with real interactions`
Tool icons paired with tool name in small text on first appearance per page; icon alone after that.

- "Next project" link at bottom to keep HMs moving

### Visual hierarchy, top to bottom (homepage):
1. Name + one-line positioning (instant context)
2. Featured project card (magnetic, demands a click)
3. Secondary projects (supporting evidence)
4. How I Design Now (differentiator — AI-augmented process)
5. About (personal depth)
6. Contact (always reachable via nav)

## 7. Key States

| State | What the user sees/feels |
|---|---|
| **First load** | Staggered entrance — elements fade/slide in over ~600ms, SVG elements draw in via stroke animation, not all at once |
| **Scrolling** | Sections enter with fade+translate, SVG elements draw progressively, metrics count up |
| **Card hover** | SVG art transforms/accelerates + background shift + subtle depth (translateY -2px) + arrow slides. ~200ms smooth easing |
| **Card idle** | SVG compositions have subtle ambient animation — slow rotation, gentle pulse, breathing |
| **Dark/light toggle** | Current implementation is good, transition feels smooth |
| **Project detail** | Typographic hero, then section nav becomes sticky. Scroll-driven content build. Active section updates in nav |
| **Section nav** | Sticky below main nav. Active state follows scroll position. Click jumps to section with smooth scroll |
| **"How I Design Now"** | Steps reveal sequentially on scroll with connecting lines that draw between them |
| **Empty project** | "Coming Soon" card (already exists) — keep as-is, signals ambition |
| **Mobile** | Single-column stack, touch-friendly tap targets, drawer nav (already exists). Section nav becomes horizontally scrollable. Animations simplified for performance |

## 8. Interaction Model

| Element | Interaction |
|---|---|
| **Project card SVGs** | Idle: subtle ambient animation (slow rotation, pulse). Hover: accelerates or morphs |
| **Section entrances** | Staggered fade+translate, SVG elements drawing in (stroke-dashoffset animation) |
| **Project section nav** | Sticky on scroll, active state tracks scroll position, click-to-jump with smooth scroll |
| **"How I Design Now" grid** | Steps reveal sequentially on scroll, with connecting lines that draw between them |
| **Hero bio** | Name types in or assembles from fragments on first load |
| **Project detail pages** | Key metrics count up when scrolled into view. Diagrams build progressively |
| **Nav drawer links** | Staggered slide-in, each link 40ms after the previous |
| **Marquee** | Existing is fine. Pause on hover |
| **Card hover** | SVG art transforms + background shift + subtle depth |
| **Page transitions** | Smooth fade between homepage and project detail pages |

## 9. Content Requirements

**Homepage (exists, needs polish):**
- Real avatar photo (currently placeholder)
- Project card SVG compositions + product visuals replacing `[ project screens ]` placeholders
- Bio copy is strong, keep it

**Project detail pages (new, content provided later):**
- Title: one sentence, "I [action] that [customer impact]" format
- Overview: one-sentence product description + role, timeline, team size, 2-3 key metrics
- 01 Problem: Who → Why → What arc, AI research callout with tool icons, ends with product shape visual
- 02 Design Iteration: challenges + AI prototyping callout with tool icons + before/after + annotated decisions
- 03 Outcome: final shipped product visuals in device frames + count-up metrics + strategic framing
- AI tool callout component: `[tool icon] + one sentence + speed/quality gain`, used once per section
- "Next project" CTA

**Microcopy:**
- Strip link labels are good (Resume, LinkedIn, Email)
- Card roles are good (Lead UX Designer)
- "How I Design Now" copy is strong
- Section nav labels should be short and action-oriented

## 10. Recommended Implementation Approach

- **Motion/animation:** Scroll-triggered entrances (IntersectionObserver), staggered reveals, SVG stroke animations, hover micro-interactions — keep them purposeful
- **SVG art:** Custom per-project compositions. Circuit/node patterns for the agent project, structured grid/table motifs for S3 Tables, meta/recursive pattern for the portfolio card
- **Section nav:** Sticky horizontal nav with scroll-spy behavior. CSS `scroll-margin-top` for jump targets. Active state via IntersectionObserver
- **Spatial design:** Bento grid is strong. Project detail pages need clear rhythm of heading → visual → short text, kept tight to minimize scrolling
- **Typography:** Current Helvetica Neue stack works for body. Add a monospace accent font for labels, tags, project codes, and terminal motifs. Oversized type (80-120px) for project detail heroes
- **Performance:** Animations should use CSS transforms and opacity only (GPU-composited). SVGs should be inline for animation control. Reduce motion for `prefers-reduced-motion`

## 11. Resolved Questions

1. **Product visuals:** Alice has UI screenshots, mockups, and flow diagrams for all projects. Flow diagrams will be rebuilt as SVG flowcharts in code. Product visuals go in styled device frames; SVG diagrams fill remaining visual space.
2. **Bold type:** Go aggressive — Wodniack-style oversized "W O R K" treatment. Try it first, dial back if needed.
3. **Case study structure:** Finalized. Title (value statement) → 00 Overview (product description + metadata + metrics) → 01 Problem (Who → Why → What with AI research callout) → 02 Design Iteration (challenges + AI prototyping callout + decisions) → 03 Outcome (shipped product visuals + metrics + strategic framing). AI process woven into sections via tool icon callout component, not a separate section.
4. **Projects at launch:** 3 projects — Simplifying Data Access (unified console for S3/FSx/EFS/on-prem), S3 Tables, Agent Opportunities. No meta "this portfolio" card. Personal projects will be added later.
5. **Resume:** `resume.pdf` does not exist in the project yet. Must be added before deploy.
6. **Domain:** Custom domain already linked via GitHub. Build outputs to `docs/` folder.
7. **Section nav labels:** Default set is: 01 Problem / 02 Design Iteration / 03 Outcome. Individual projects may adjust labels as needed.

## 12. Remaining Open Items

- Case study content for all 3 projects (Alice to provide, will work together)
- Product visuals / UI screenshots for each project (Alice to provide)
- Avatar photo (currently placeholder)
- Resume PDF (must be added before deploy)
- Tool icons for AI callout component (Claude, Kiro)
