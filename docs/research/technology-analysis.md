# Technology Analysis

Generated: 2026-05-30

## Scope

This analysis covers the current portfolio website codebase, build system, routing model, UI architecture, animation model, assets, quality checks, and risks relevant to future UI and animation work.

Sources inspected:

- Local project files under `app/`, `public/`, root config files, `PRODUCT.md`, `design-brief.md`, `BUILD-PLAN.md`, `STRUCTURE.md`, `CLAUDE.md`, and `portfolio-rules.md`.
- Local Next.js 16 docs in `node_modules/next/dist/docs/`, after installing the locked dependencies because `node_modules/next` was initially missing.
- `npm list --depth=0`, `npx next info`, `npm audit`, `npm run lint`, `npm run build`, image metadata checks, and local asset reference checks.

## Executive Summary

The site is a static-export Next.js App Router portfolio built on Next 16.2.4, React 19.2.4, CSS Modules, global CSS, and a data-driven project system. The homepage is a custom scroll-scrubbed bento dashboard implemented in `app/components/HomepageScroll.js`. It is already the correct place for the requested avatar-eye effect because the component owns scroll progress, avatar sizing, dashboard readiness, and the final interactive card layout.

The strongest technical direction is to keep the new effect as a small Client Component or local subcomponent inside `HomepageScroll`, controlled by existing scroll progress. It should use the new `public/img/aboutMe/alice_transparent.png`, `alice_left_eye.png`, and `alice_right_eye.png` assets with CSS variables for placement and a requestAnimationFrame pointer loop. It should not add an animation library.

Key risks:

- `npm run lint` currently fails with two React hook rule errors in `ProjectDetailClient.js`.
- `npm audit` reports 3 vulnerabilities, including a high severity Next.js advisory affecting `next@16.2.4`; `npx next info` recommends `next@16.2.6`.
- A project hero references missing asset `/img/s3tables/heroimg-1.JPEG`.
- Many images use raw `<img>` tags despite the portfolio rule that product visuals should use `next/image`.
- The new eye assets are tiny relative to the final dashboard avatar size. On desktop they render around 4 to 5 CSS pixels at the current 120px end-state avatar; on mobile they render around 2px and should probably be static or disabled.

## Framework And Runtime

### Dependencies

From `package.json` and `npm list --depth=0`:

- `next@16.2.4`
- `react@19.2.4`
- `react-dom@19.2.4`
- `@lobehub/icons@5.8.0`
- `@radix-ui/react-icons@1.3.2`
- `eslint@9.39.4`
- `eslint-config-next@16.2.4`

`npx next info` reports:

- Platform: macOS arm64
- Node: `25.9.0`
- npm: `11.12.1`
- Next config: `output: export`
- Newer Next available: `16.2.6`

Next 16 local docs state:

- Node.js 20.9+ is required.
- Turbopack is stable and used by default for `next dev` and `next build`.
- App Router pages and layouts are Server Components by default.
- Browser APIs such as `window`, `sessionStorage`, `IntersectionObserver`, pointer events, and `matchMedia` must be used inside Client Components and effects.
- Static export supports App Router Server Components at build time, Client Components, dynamic routes only when generated with `generateStaticParams`, and `next/image` only with unoptimized or custom loader behavior.

### Next Config

`next.config.mjs`:

```js
const nextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};
```

Implications:

- `next build` emits a static site into `out/`.
- Dynamic project pages must be known at build time.
- Default Next image optimization is disabled, which is required for static export unless a custom image loader is configured.
- `trailingSlash: true` means routes emit folder-style paths, such as `/projects/s3-tables/`.

## Routing And Data Architecture

Routes:

- `/`: `app/page.js` renders `HomepageScroll`.
- `/about`: `app/about/page.js`.
- `/design-process`: `app/design-process/page.js`.
- `/lab`: `app/lab/page.js`.
- `/projects/[slug]`: `app/projects/[slug]/page.js`.

Project routing:

- `app/projects/[slug]/page.js` calls `generateStaticParams()` from `getAllSlugs()`.
- It awaits `params`, gets the project from `app/data/projects.js`, and renders `ProjectDetailClient`.
- Current slugs: `simplifying-data-access`, `s3-tables`, `agent-opportunities`.

Data files:

- `app/data/projects.js`: project pages and homepage project card content.
- `app/data/about.js`: biography, work experience, tool content.
- `app/data/lab.js`: lab card content.
- `app/data/design-process.js`: design process page content.

Risk:

- `getProject(slug)` can return `null`, but `ProjectDetailClient` assumes a valid project. Static params protect generated paths, but a not-found guard would be safer for unexpected routes.

## UI System

### Brand Context

`PRODUCT.md` identifies the site as a brand register portfolio for senior, principal, or staff UX/UX engineering roles. The visual direction is "ancient cartography meets modern technology": parchment substrate, grain, construction lines, precise layout, and restrained but memorable interaction.

`DESIGN.md` is absent. Existing context comes from `PRODUCT.md`, `design-brief.md`, `BUILD-PLAN.md`, and the implemented CSS.

### Fonts

Defined in `app/globals.css`:

- Satoshi variable: primary sans family.
- EB Garamond variable: display family.
- IBM Plex Mono regular: monospace accent.

All use `font-display: swap`, which matches the project rules.

### Color And Theme

Global tokens are CSS custom properties in `:root` and `[data-dark]`.

Light values currently include pure `#ffffff` backgrounds and `#000` card border/shadow values. That conflicts with the newer `PRODUCT.md` direction and the Impeccable design law that neutrals should be subtly tinted rather than pure black/white. This is a design-system debt item, not a blocker for the avatar effect.

Dark mode:

- `Navigation.js` toggles `data-dark` on `document.body`.
- CSS custom properties declared on `[data-dark]` apply from body down to descendants.
- The root `html` element does not receive `data-dark`.

### Layout Primitives

- `col-grid`: shared 8-column grid in `globals.css`.
- `--page-gutter`, `--grid-gap`, and typography tokens define the general system.
- CSS Modules are used for isolated components such as `HomepageScroll`, `Navigation`, `CursorTrail`, `LineReveal`, and project transition components.
- Global route CSS is used for project detail pages and about/lab pages.

## Animation And Interaction Architecture

### Homepage Scroll Dashboard

File: `app/components/HomepageScroll.js`.

Core model:

- Client Component.
- `useScrollProgress(containerRef)` maps a 300vh runway into normalized `progress` from 0 to 1.
- `requestAnimationFrame` throttles scroll updates.
- `sessionStorage` key `homepage-visited` scrolls returning users directly to dashboard state.
- `prefers-reduced-motion: reduce` sets `progress` to 1 and uses a static layout.
- The hero card starts large, then shrinks to `heroEnd` of 120px desktop or 60px mobile.
- Secondary cards converge into the final bento dashboard.
- Secondary cards become hoverable only at `progress >= 1`.
- Hero hover slideshow is active only while `progress < 0.75`.

Why this matters:

- The requested avatar-eye effect should use `progress >= 1` or a near-end threshold such as `progress >= 0.995`.
- The final avatar size and position are already computed in this component.
- No route-level state is needed.

### Cursor Trail

File: `app/components/CursorTrail.js`.

Behavior:

- Global Client Component mounted in `RootLayout`.
- Hides the native cursor through `body { cursor: none; }`.
- Tracks `mousemove` and renders a fixed pixel trail at `z-index: 9999`.
- Disables visible custom trail behavior under reduced motion.

Implications:

- The avatar-eye feature can add a second pointer listener, but a shared pointer store would be cleaner if more cursor-aware features are added.
- `PaperTexture` has `z-index: 10000` and `pointer-events: none`, so it visually sits above the cursor trail. That is intentional for texture but can affect perceived sharpness.

### Paper Texture

File: `app/components/PaperTexture.js`.

Behavior:

- Fixed overlay with SVG noise, drafting lines, and vignette.
- `pointer-events: none`.
- Very high stacking context at `z-index: 10000`.

The avatar-eye effect should not rely on stacking above this texture; it should live inside the avatar card.

### Project Detail Motion

File: `app/components/ProjectDetailClient.js`.

Motion patterns:

- Hero image clip-path reveal on scroll.
- Section handoff panels with scroll-linked transforms and dim overlays.
- Zigzag outcome reveal that expands a frame to full viewport.
- Heading line reveals via `LineReveal`.
- Metrics count up via `MetricsCounter`.

Risk:

- `BlockSection` returns before calling hooks when `!content.lead`, causing lint hook rule errors.
- Several effects use custom requestAnimationFrame loops. They generally clean up, but there is no shared scroll or pointer motion utility.

### Lab Motion

File: `app/lab/page.js`.

Behavior:

- Infinite panning canvas with pointer drag, wheel interaction, and parallax.
- Uses pointer events and requestAnimationFrame.
- Does not appear to honor `prefers-reduced-motion` yet.

## Asset Analysis

Public asset footprint:

- `public/`: about 70MB.
- 102 public files.
- Largest assets include `public/img/sda/sda-hero.jpg` at 6.9MB, `me-4.jpg` at 4.6MB, and `ceo.png` at 4.4MB.

New avatar assets:

| Asset | Dimensions | Notes |
|---|---:|---|
| `public/img/aboutMe/alice_transparent.png` | 750 x 750 | Transparent avatar base with empty glasses. |
| `public/img/aboutMe/alice_left_eye.png` | 27 x 25 | Eye mark layer. |
| `public/img/aboutMe/alice_right_eye.png` | 28 x 30 | Eye mark layer. |
| `public/img/aboutMe/AliceZhao-Avatar.PNG` | 750 x 750 | Current old avatar with eyes and camera. |

Current avatar usage:

- `HomepageScroll.js` renders `<img src="/img/aboutMe/AliceZhao-Avatar.PNG" alt="Alice Zhao" />`.
- The new assets are not yet used.

Broken asset reference:

- `app/data/projects.js` references `/img/s3tables/heroimg-1.JPEG` for `agent-opportunities`, but the file is missing.
- `next build` still passes because this string path is not validated against `public/` during static generation.

## Quality Checks

### Build

Command: `npm run build`

Result: Passed.

Output routes:

- `/`
- `/_not-found`
- `/about`
- `/design-process`
- `/lab`
- `/projects/simplifying-data-access`
- `/projects/s3-tables`
- `/projects/agent-opportunities`

### Lint

Command: `npm run lint`

Result: Failed with 2 errors and 17 warnings.

Blocking errors:

- `app/components/ProjectDetailClient.js:266`: `useRef` called conditionally.
- `app/components/ProjectDetailClient.js:268`: `useEffect` called conditionally.

Major warnings:

- Multiple `<img>` warnings from `@next/next/no-img-element`.
- Missing effect dependencies in `HomepageScroll.js`.
- `LineReveal.js` has a `useLayoutEffect` without dependency array that calls state setter.

### Audit

Command: `npm audit`

Result: 3 vulnerabilities.

- High severity: `next@16.2.4` advisories. `npm audit` suggests `npm audit fix --force`, which would install `next@16.2.6` outside the exact dependency range.
- Moderate: `postcss <8.5.10`.
- Moderate dev dependency: `brace-expansion`.

Command: `npm audit --omit=dev`

Result: 2 production vulnerabilities, from Next/PostCSS.

## Content And Product Risks

Dead or placeholder links:

- `app/about/page.js`: "View my resume" links to `#`.
- `app/data/about.js`: several selected work links use `#`.
- `Navigation.js`: home page name anchor uses `href="#"`, acceptable for top jump but should be intentional.
- `Navigation.js`: `resume.pdf` download target is not present in `public/`.

Copy issues:

- `HomepageScroll.js`: "Previoulsy" typo.
- `HomepageScroll.js`: "adgacent" typo in a code comment.
- `app/data/projects.js`: "allow us to draw launch boundary" should be revised.
- `agent-opportunities` contains placeholder content.

Documentation drift:

- `STRUCTURE.md` references components such as `AICallout.js` that are not present.
- `STRUCTURE.md` mentions a base path `/Alice-zhao-portfolio/`, but `next.config.mjs` currently has no `basePath`.
- `BUILD-PLAN.md` and implemented code differ in several places, which is expected for a living plan but should not be treated as ground truth.

## Recommendations

### Near-Term For Avatar Effect

1. Implement the avatar-eye effect inside `HomepageScroll.js` or a small `AvatarEyes` component imported only by it.
2. Activate only when the dashboard is assembled: `progress >= 0.995` or `progress >= 1`.
3. Render static centered eyes under `prefers-reduced-motion: reduce`.
4. Disable tracking on coarse pointers and touch-only devices.
5. Use CSS variables for eye placement and max travel so Alice can calibrate without changing JS.
6. Keep all animation in transforms and opacity. Do not animate layout properties.
7. Do not add Framer Motion, GSAP, or any other animation dependency.

### Quality Debt To Address Before Production

1. Fix the conditional hooks in `ProjectDetailClient.js`.
2. Upgrade Next to a patched version after reviewing Next 16 local docs and release notes.
3. Replace the missing `agent-opportunities` hero image path.
4. Add `public/resume.pdf` or remove the resume download link.
5. Review raw `<img>` usage. Keep decorative tiny images if justified, but use `next/image` for major content images.
6. Optimize large public images and remove duplicate `.jpg`/`.png` variants that are not used.
7. Update stale docs so future agents do not follow obsolete file maps.

