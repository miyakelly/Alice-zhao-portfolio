---
name: homepage-scroll-motion
description: Use when changing the Alice Zhao portfolio homepage scroll choreography, dashboard activation, sticky layout behavior, session intro behavior, or scroll-linked animation timing.
---

# Homepage Scroll Motion

## Quick Workflow

1. Inspect `app/components/HomepageScroll.js`.
2. Inspect `app/components/HomepageScroll.module.css`.
3. Identify the current progress source, thresholds, and session behavior.
4. Choose the smallest integration point that preserves the existing dashboard choreography.
5. Verify first visit, returning visit, resize, final scroll state, and reduced-motion behavior.

## Rules

- Preserve the bento dashboard layout and current scroll narrative.
- Use transforms and opacity for motion wherever possible.
- Avoid adding React state for per-frame details unless it already exists and is low-frequency.
- Keep global listeners scoped to active states and clean them up.
- Respect existing `sessionStorage` behavior around the homepage intro.

## Avatar Eye Notes

- The effect should activate only when the interactive dashboard area is present.
- A practical activation signal is a dashboard-ready threshold near final progress, not initial page load.
- The avatar image swap or layering must not resize the dashboard avatar container.
