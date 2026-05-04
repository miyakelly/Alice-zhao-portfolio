# Implementation Plans

A living document tracking implementation plans for major features. Each plan stays here through build and review, then gets marked complete when shipped.

---

## Homepage Scroll Animation

**Status:** In progress — Step 1 complete

### Overview

A scroll-driven homepage animation that replaces the current static bento grid. Starts with a single centered hero card (avatar + intro text). As the user scrolls, the hero shrinks and secondary cards converge from all four edges, assembling into a bento grid.

### Key Decisions

- **Layout:** Same bento grid layout on all screen sizes, proportionally scaled. No single-column reflow on mobile.
- **Animation:** Scroll-driven (scrubbing, not triggered). Normalized 0-1 progress. Scrolling backward reverses everything.
- **Mobile:** Same animation, same card origins from all edges. Grid scales proportionally.
- **Reduced motion:** Only case where animation is removed. Static bento grid renders immediately with a 200ms fade-in.
- **Loading view:** Compass-construction sequence (~900ms): crosshair lines draw in, avatar circle traces via compass arc, card border rules itself, text fades in. Fits the ancient cartography visual direction.

### Architecture

- **Scroll container:** `height: 300vh` div provides scroll runway. Inside: `position: sticky; top: 60px; height: calc(100vh - 60px)` child holds all cards.
- **`useScrollProgress` hook:** Passive scroll listener + `requestAnimationFrame`. Returns 0-1 progress. Sets `--scroll-progress` CSS custom property.
- **Card interpolation:** Each card has a start state (position, size) and end state (final grid slot). JS interpolates `transform` and dimensions based on progress.
- **Gap constraint:** Secondary cards are clamped so they never get closer than the grid gap (3px) to the hero card's current bounds.
- **Per-card easing:** Cards closer to center arrive slightly earlier; edge cards arrive slightly later.
- **No animation libraries.** CSS animations for loading view, JS scroll listener + CSS transforms for scroll animation.

### End-State Grid (from Figma)

| Cell | Content | Position |
|---|---|---|
| Hero (small, ~100px) | Avatar | Center |
| S3 Tables | Project card | Left, row 1 (tall) |
| Simplifying Data Access | Project card | Center-right, row 1 (wide) |
| Agent Opportunities | Project card | Center-left, row 2 |
| How I Design Now | Section card | Center-right, row 2 (large) |
| About (???) | About section | Far-left, row 1 |
| My Lab | Lab/experiments | Far-left, row 2 |
| Who Am I | Bio detail | Far-right, row 1 (tall) |
| LinkedIn / Resume / Email | Contact links | Far-right, row 2 (stacked) |

### Incremental Build Steps

#### Step 1: Sticky scroll container + progress hook
Build the empty `HomepageScroll` wrapper with the sticky section and `useScrollProgress` hook. No cards yet, just a visible progress indicator so we can verify scroll runway length, sticky behavior, and progress calculation on desktop and mobile.

**Review checkpoint:** Does the scroll distance feel right? Is the sticky behavior correct? Does progress go smoothly from 0 to 1?

#### Step 2: Hero card start and end states
Add the hero card (avatar + intro text) inside the sticky container. At progress=0 it's large and centered. At progress=1 it's shrunk to its final bento position. Verify interpolation, avatar anchoring, and sizing at both extremes.

**Review checkpoint:** Does the hero size/position feel right at both ends? Is the shrink smooth? Does the avatar stay stable?

#### Step 3: Secondary cards positioning and convergence
Add all secondary cards with off-screen start positions and final bento grid end positions. Wire up progress-driven interpolation. No real content inside cards yet, just colored/labeled rectangles to verify spacing, gaps, convergence paths, and the no-overlap constraint.

**Review checkpoint:** Do cards come from the right edges? Do they stop at the right positions? Any overlap? Does the assembled grid match the Figma?

#### Step 4: Card content + styling
Fill in actual card content (project titles, tags, years, about, contact links, How I Design Now). Apply existing card styles.

**Review checkpoint:** Does the content layout inside each card work at both the start (progress=0) and end (progress=1) sizes?

#### Step 5: Loading view
Add the compass-construction loading sequence. Crosshairs draw, avatar circle traces, card border appears, text fades in. Transitions into the scroll-ready state.

**Review checkpoint:** Does the loading feel right? Too fast/slow? Does it connect to the cartography aesthetic?

#### Step 6: Reduced motion + polish
Add `prefers-reduced-motion` fallback (static grid, no animation). Final polish: easing curves, timing adjustments, edge cases (fast scrolling, browser resize mid-scroll).

**Review checkpoint:** Final pass. Everything working together.

### Files

| File | Action |
|---|---|
| `app/components/HomepageScroll.js` | New |
| `app/components/HomepageLoading.js` | New |
| `app/page.js` | Modified |
| `app/globals.css` | Modified |

### Constraints

- No animation libraries (CSS + vanilla JS only)
- `prefers-reduced-motion: reduce` kills all animation
- `overflow-x: hidden` on scroll container to clip off-screen cards on mobile
- All transforms use GPU-composited properties (transform, opacity)
- SVGs below the fold don't animate until viewport entry (IntersectionObserver)
