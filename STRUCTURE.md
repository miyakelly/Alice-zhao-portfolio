# Site Structure Guide

This document explains how the app is organized, what each file does, and how they connect. Use it to find and manually update any content or styling.

## File Tree

```
app/
├── layout.js                  ← Root layout (wraps every page)
├── globals.css                ← Homepage + shared styles (nav, drawer, bento grid, etc.)
├── project.css                ← Project detail page styles (hero, section nav, cards, etc.)
├── page.js                    ← Homepage (/)
├── about/
│   └── page.js                ← About page (/about) — currently a placeholder
├── components/
│   ├── AICallout.js           ← AI tool icon + description strip
│   ├── DeviceFrame.js         ← Browser-style frame for product screenshots
│   ├── MetricsCounter.js      ← Animated count-up numbers on scroll
│   ├── Navigation.js          ← Shared nav + drawer + dark mode (used by homepage and project pages)
│   ├── ProjectDetailClient.js ← PROJECT DETAIL PAGE STRUCTURE (layout, section order, how each section renders)
│   └── SectionNav.js          ← Sticky horizontal nav with scroll-spy for project pages
├── data/
│   └── projects.js            ← ALL PROJECT CONTENT LIVES HERE (text, metrics, sections)
└── projects/
    └── [slug]/
        └── page.js            ← Thin routing wrapper — loads data from projects.js, passes to ProjectDetailClient
```

## How Content Flows

```
projects.js (content) → [slug]/page.js (routing) → ProjectDetailClient.js (rendering)
                                                      ├── SectionNav.js
                                                      ├── AICallout.js
                                                      ├── DeviceFrame.js
                                                      └── MetricsCounter.js
```

**The two most important files:**

| What you want to change | File to edit |
|---|---|
| Project text, metrics, section content | `app/data/projects.js` |
| Page layout, section order, how sections render | `app/components/ProjectDetailClient.js` |

`ProjectDetailClient.js` contains the full page structure: hero layout, section ordering, and three section renderer functions (`ProblemSection`, `DesignIterationSection`, `OutcomeSection`) that control exactly how each section type is laid out. If you want to add a new field to a section, reorder elements, or change the HTML structure of a section, this is the file.

## Where to Edit What

### To change project content (titles, descriptions, metrics, section text):

**Edit `app/data/projects.js`**

This is the single source of truth for all project data. Each project is a key in the `projects` object:

```js
"s3-tables": {
  slug: "s3-tables",           // URL: /projects/s3-tables/
  title: "...",                 // Big headline on the project detail page
  cardTitle: "...",             // Short title for homepage card (\n for line breaks)
  description: "...",           // Full product description (detail page)
  cardDescription: "...",       // Short description for homepage card
  gridClass: "cell-s3",        // CSS class for homepage grid position
  year: "2024",
  role: "Lead UX Designer",
  timeline: "Aug 2024 - Nov 2024",  // Format: <Month> <Year> - <Month> <Year>
  team: [                       // List format: each entry is "<#> <Position>"
    "2 UX Designers",
    "4 PMs",
    "~40 Engineers and SDMs",
  ],
  tags: ["Featured"],           // Displayed as tag pills
  metrics: [                    // Shown in the metrics strip (hero + outcome)
    { value: 12, suffix: ".7k", label: "Table buckets created..." },
  ],
  sections: [                   // The 3 main sections of the case study
    { id: "problem", ... },
    { id: "design-iteration", ... },
    { id: "outcome", ... },
  ],
  nextProject: "agent-opportunities",  // slug of the next project (for "Next Project" link)
}
```

**Section structure by type:**

Problem section (`id: "problem"`):
```js
{
  id: "problem",
  navLabel: "01 Problem",        // What appears in the sticky section nav
  heading: "Who, Why, and What", // Section heading
  content: {
    who: "...",                  // Displayed under "WHO" label
    why: "...",                  // Displayed under "WHY" label
    what: "...",                 // Displayed under "WHAT" label
  },
  aiCallout: {                   // The tool icon strip (set to null to hide)
    icon: "claude",              // "claude" or "kiro"
    text: "...",                 // One-sentence description
  },
  research: {
    stats: [                     // Sidebar stat boxes
      { value: "20+", label: "Enterprise customer interviews" },
    ],
  },
}
```

Design Iteration section (`id: "design-iteration"`):
```js
{
  id: "design-iteration",
  navLabel: "02 Design Iteration",
  heading: "Challenges and Iteration",
  content: {
    challenge: "...",            // "The Challenge" paragraph
    iteration: "...",            // "The Iteration" paragraph
    decisions: [                 // Before/After decision cards
      {
        before: "...",
        after: "...",
        why: "...",              // Optional — explains the reasoning
      },
    ],
  },
  aiCallout: { icon: "claude", text: "..." },  // or null
}
```

Outcome section (`id: "outcome"`):
```js
{
  id: "outcome",
  navLabel: "03 Outcome",
  heading: "Shipped Product and Results",
  content: {
    summary: "...",              // Main outcome paragraph
    reflection: "...",           // Italic reflection block (optional)
  },
  productVisuals: [              // Device frame placeholders
    { alt: "Description", placeholder: true },
    // When you have real images, replace with:
    // { alt: "Description", src: "/images/screenshot.png", placeholder: false },
  ],
}
```

### To add a new project:

1. Add a new entry in `projects.js` following the same structure
2. Add the slug to the `projectOrder` array
3. Update the `nextProject` field on the previous project to point to the new slug
4. The route `/projects/your-slug/` is automatically created on next build

### To change the homepage:

**Edit `app/page.js`**

The homepage is a single self-contained component. It includes:
- Nav bar with hamburger menu and dark mode toggle
- Drawer navigation
- Bento grid with project cards
- Marquee skills ticker
- "How I Design Now" section
- About section
- Contact section
- Footer

Homepage project cards are now driven by `projects.js` via the `projectOrder` array. Each project has card-specific fields for the homepage:

```js
cardTitle: "S3 Tables:\n0 → 1 in 8 Weeks",  // Short title for homepage card (\n = line break)
cardDescription: "Led UX from scratch...",     // Short description for homepage card
gridClass: "cell-s3",                          // CSS class controlling grid position
```

Shared fields (`year`, `tags`, `role`) are pulled directly from the project data. The "Coming Soon" card is still hardcoded in `page.js`.

### To change styles:

**`app/globals.css`** — Controls:
- CSS custom properties (colors, fonts) in `:root` and `[data-dark]`
- Nav, drawer, bento grid, project cards, marquee
- "How I Design Now" section
- About, contact, footer
- All responsive breakpoints for the homepage

**`app/project.css`** — Controls:
- Project detail page hero
- Sticky section nav
- Problem section layout (2-column grid)
- Research stats sidebar
- AI callout strip
- Decision before/after cards
- Device frames
- Metrics counter strip
- Outcome section
- Next project link
- All responsive breakpoints for project pages

### To change the root layout (metadata, fonts, global imports):

**Edit `app/layout.js`**

Currently imports `globals.css` and `project.css`. Contains the `<html>` and `<body>` tags, and the site metadata (title, description).

## Component Reference

| Component | File | What it does | Used by |
|---|---|---|---|
| **SectionNav** | `components/SectionNav.js` | Sticky horizontal nav, highlights active section on scroll, click to jump | ProjectDetailClient |
| **AICallout** | `components/AICallout.js` | Displays tool icon (Claude/Kiro) + description text | ProjectDetailClient |
| **DeviceFrame** | `components/DeviceFrame.js` | Browser-style frame with dot indicators, wraps screenshots or shows placeholder | ProjectDetailClient |
| **MetricsCounter** | `components/MetricsCounter.js` | Animates numbers counting up from 0 when scrolled into view | ProjectDetailClient |
| **ProjectDetailClient** | `components/ProjectDetailClient.js` | The full project detail page — nav, hero, sections, footer. Contains all section renderers (ProblemSection, DesignIterationSection, OutcomeSection) | `projects/[slug]/page.js` |
| **Navigation** | `components/Navigation.js` | Shared nav + drawer + dark mode toggle. Accepts `breadcrumb` (JSX) and `isHome` (bool) props | `page.js`, ProjectDetailClient |

## Build & Deploy

- **Dev server:** `npm run dev` → http://localhost:3000/Alice-zhao-portfolio/
- **Build:** `npm run build` → outputs static files to `out/`
- **Deploy:** Copy `out/` to `docs/` → push to GitHub → custom domain serves from `docs/`
- **Base path:** All URLs are prefixed with `/Alice-zhao-portfolio/` (configured in `next.config.mjs`)

## Key Config

| File | What it controls |
|---|---|
| `next.config.mjs` | Static export (`output: "export"`), base path, trailing slashes, image optimization off |
| `CLAUDE.md` | 12 implementation rules that govern all design/code decisions |
| `design-brief.md` | Visual direction, layout strategy, interaction model |
| `portfolio-rules.md` | Content standards for case studies |
