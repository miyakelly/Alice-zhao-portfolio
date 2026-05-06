# Implementation Plans

A living document tracking implementation plans for major features. Each plan stays here through build and review, then gets marked complete when shipped.

---

## Homepage Scroll Animation

**Status:** In progress — Step 3 complete, Step 4 in progress

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

**Layout:** 4-column pinwheel grid, rotationally symmetric around the center avatar.

```
| ???        | S3 Tables      | Streamlining        | Who Am I  |
|            |                |      [avatar]        |           |
| My Lab     | Agent          | My Design Process    | Links     |
```

**Columns:** sideLeft (narrow), centerLeft (wide), centerRight (wide), sideRight (narrow). Roughly 1:2:2:1 ratio.

**Height split:** 3:4 ratio per column. Side-left: ??? (3) / My Lab (4). Side-right: Who Am I (4) / Links (3). Center-left: S3 Tables (4) / Agent (3). Center-right: Streamlining (3) / My Design Process (4). Avatar gap at center intersection.

**Size pairings (rotationally symmetric):**
- ??? = Links (short)
- My Lab = Who Am I (tall)
- S3 Tables = My Design Process (tall center)
- Streamlining = Agent (short center)

**Entry directions:**

| Card | Enters from |
|---|---|
| ??? | left |
| My Lab | left |
| S3 Tables | top |
| Agent | bottom |
| Streamlining | top |
| My Design Process | bottom |
| Who Am I | right |
| Links | right |

**Sub-steps (review after each):**

##### Step 3A: Final layout only (no animation) ✅
Hardcode all 8 cards at their end-state positions using the new pinwheel grid math. Temporarily ignore scroll progress. Verify: do the positions, sizes, and proportions match the wireframe?

##### Step 3B: Hero end state ✅
Update the hero card so at progress=1 it shrinks to a small circle at the center intersection of the 4 center cards. Verify: does the avatar land in the right spot relative to the surrounding cards?

##### Step 3C: Convergence animation ✅
Wire scroll progress back up so cards enter from off-screen edges and converge into the layout from 3A. Verify: do the entry directions and timing feel right?

**Final convergence approach:**
- Center cards: positions computed from hero's CURRENT bounds (always 20px gap to hero) + off-screen transform from END-STATE bounds that lerps to 0 over progress 0-1. Cards enter diagonally from corners (S3 top-left, Streamlining top-right, Agent bottom-left, My Design Process bottom-right). Gap to hero reduces linearly from large to 20px.
- Side cards: end-state positions + off-screen transform that combines their own offset with their neighboring center card's offset. This ensures side cards enter after center cards and maintain a gap that reduces to 20px.
- Hero: positioned via JS (same coordinate system as cards), shrinks from heroStart to heroEnd over progress 0-1.

#### Step 4: Card content + styling — in progress
Fill in actual card content (project titles, tags, years, about, contact links, How I Design Now). Apply existing card styles.

**Done so far:**
- SecondaryCard component extracted with hover effect (lift up-right, shadow, slideshow) matching hero card. Hover only active at progress=1.
- Project cards (S3 Tables, Agent, Streamlining) have year, title (EB Garamond 72px), and impact placeholder (Satoshi 12px) with 20px padding.
- S3 Tables card linked to `/projects/s3-tables`.
- Each card has a `slides` array (empty, to be filled with project-specific images).

**Still to do:**
- Impact statement copy for each project
- Slideshow images for each card
- Content for non-project cards (???, My Lab, Who Am I, Links)
- Remaining card links (href)

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
