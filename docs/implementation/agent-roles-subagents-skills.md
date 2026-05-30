# Agent Roles, Sub-Agents, And Skills

Generated: 2026-05-30

## Purpose

This document defines the targeted agent setup needed to handle UI and animation work on this portfolio, especially the dashboard-only avatar-eye effect. The site is a crafted brand portfolio, so the agents must protect design intent while respecting the Next.js 16 static-export architecture.

## Primary Agent Role

### Portfolio UI Animation Lead

Mission:

Own the end-to-end implementation of UI motion and interaction details while preserving the portfolio's "ancient cartography meets modern technology" direction.

Responsibilities:

- Read `PRODUCT.md`, `design-brief.md`, `CLAUDE.md`, local Next 16 docs, and the relevant component code before changing UI.
- Keep animation scoped, purposeful, and consistent with the 90/10 craft rule.
- Use existing CSS Modules and vanilla browser APIs before adding abstractions.
- Coordinate sub-agents and merge their findings into a small, shippable implementation.
- Ensure `prefers-reduced-motion` is a first-class state.
- Run lint/build/browser checks before handoff.

Decision authority:

- Can choose component boundaries.
- Can tune motion values after browser inspection.
- Cannot add animation libraries without explicit approval.
- Cannot widen the feature beyond the homepage dashboard without explicit approval.

## Sub-Agent 1: Next 16 Static Export Architect

Mission:

Protect compatibility with Next.js 16 App Router and static export.

Required skills:

- Next.js 16 App Router routing and file conventions.
- Server Component vs Client Component boundaries.
- Static export constraints.
- `next/image` behavior with `images.unoptimized`.
- Turbopack default behavior in Next 16.

Inputs:

- `AGENTS.md`
- `next.config.mjs`
- `package.json`
- `node_modules/next/dist/docs/01-app/`
- Target files under `app/components/`

Outputs:

- Confirmed component boundary plan.
- Any Next-specific risks, such as browser API usage outside effects.
- Build compatibility notes.

For avatar-eye work, this sub-agent should confirm:

- The effect stays in a Client Component.
- `window`, `matchMedia`, and pointer events are accessed only inside effects.
- No dynamic route or server-only behavior is introduced.
- Static export still passes.

## Sub-Agent 2: Homepage Motion Systems Engineer

Mission:

Understand and preserve the existing scroll-driven dashboard choreography.

Required skills:

- Scroll progress normalization.
- `requestAnimationFrame` throttling.
- Sticky layout math.
- CSS transform performance.
- React hook dependency hygiene.
- Session state behavior with `sessionStorage`.

Inputs:

- `app/components/HomepageScroll.js`
- `app/components/HomepageScroll.module.css`
- `BUILD-PLAN.md` homepage section

Outputs:

- Integration plan for `dashboardReady`.
- Motion risk assessment.
- Verification checklist for first visit, returning visit, resize, and reduced motion.

For avatar-eye work, this sub-agent should own:

- Choosing the activation threshold.
- Ensuring the hero slideshow and eye tracking do not conflict.
- Ensuring returning sessions activate correctly.
- Keeping the existing dashboard layout unchanged.

## Sub-Agent 3: Avatar Asset Compositor

Mission:

Layer, calibrate, and tune the new avatar image assets.

Required skills:

- Image coordinate systems.
- CSS absolute positioning.
- CSS custom property calibration.
- Asset sizing and responsive scaling.
- Decorative image accessibility.

Inputs:

- `public/img/aboutMe/alice_transparent.png`
- `public/img/aboutMe/alice_left_eye.png`
- `public/img/aboutMe/alice_right_eye.png`
- `public/img/aboutMe/AliceZhao-Avatar.PNG`
- `docs/research/avatar-eye-effect-research.md`

Outputs:

- CSS placement variables for each eye.
- Static layered avatar implementation.
- Calibration notes for future tuning.

Initial calibration:

- Left eye center: `33.8% 59.8%`
- Right eye center: `54.67% 64%`
- Left eye width: `3.6%`
- Right eye width: `3.73%`

For avatar-eye work, this sub-agent should own:

- Whether the old avatar remains before dashboard or the new layered avatar appears earlier with static eyes.
- Browser calibration of eye placement.
- Ensuring eyes stay inside the glasses.

## Sub-Agent 4: Pointer Interaction Engineer

Mission:

Implement cursor-following behavior with high performance and predictable cleanup.

Required skills:

- Pointer and mouse event handling.
- `requestAnimationFrame` loops.
- DOM refs and CSS variable writes.
- Motion smoothing and clamping.
- Fine pointer vs coarse pointer detection.
- Cleanup of global listeners and animation frames.

Inputs:

- `CursorTrail.js` behavior.
- `HomepageScroll.js` avatar refs.
- Reduced-motion requirements.

Outputs:

- Pointer tracking hook or local effect.
- Movement clamp and smoothing values.
- Cleanup-safe implementation.

For avatar-eye work, this sub-agent should own:

- Avoiding per-frame React state.
- Using `pointermove` or `mousemove` consistently.
- Returning eyes to center on pointer leave.
- Avoiding duplicate motion loops when inactive.

## Sub-Agent 5: Accessibility And Reduced Motion Reviewer

Mission:

Ensure the interaction is decorative, non-blocking, and safe for motion-sensitive users.

Required skills:

- WCAG Level A basics.
- Reduced motion implementation.
- Decorative image semantics.
- Touch and keyboard equivalence.
- Focus and pointer event safety.

Inputs:

- `PRODUCT.md` accessibility section.
- `CLAUDE.md` rules.
- Implemented avatar component.

Outputs:

- Accessibility review notes.
- Reduced-motion test results.
- Mobile/coarse-pointer behavior recommendation.

For avatar-eye work, this sub-agent should verify:

- `alt="Alice Zhao"` remains on the avatar base.
- Eye layers use empty alt text.
- Eye layers are not focusable.
- Pointer events are disabled on decorative layers.
- Tracking is disabled under reduced motion.

## Sub-Agent 6: Visual QA And Browser Verification Agent

Mission:

Validate the effect in real rendered states rather than relying on code inspection.

Required skills:

- Running local Next dev or static build.
- Desktop and mobile viewport checks.
- Screenshot review.
- Scroll-state reproduction.
- Reduced-motion emulation.
- Regression detection around existing dashboard layout.

Inputs:

- Running local app.
- Feature branch diff.
- Requirements in `avatar-eye-effect-requirements.md`.

Outputs:

- Screenshot notes.
- Pass/fail checklist.
- Specific CSS variable tuning recommendations.

For avatar-eye work, this sub-agent should verify:

- Start state.
- Mid-scroll state.
- Final dashboard state.
- Returning session state.
- Reduced motion state.
- Mobile state.

## Sub-Agent 7: Code Quality And Release Readiness Reviewer

Mission:

Make sure the feature does not worsen existing lint, build, performance, or deploy risks.

Required skills:

- ESLint triage.
- Next build output review.
- npm audit interpretation.
- Asset reference checks.
- Dead link checks.
- Git diff review.

Inputs:

- `npm run lint`
- `npm run build`
- `npm audit`
- `git diff`

Outputs:

- Release readiness report.
- New vs pre-existing issue separation.
- Follow-up issue list.

For avatar-eye work, this sub-agent should verify:

- No new lint errors.
- Build passes.
- No new dependencies.
- No accidental changes to unrelated files.
- Existing known issues are documented separately.

## Skill Inventory Required

### Next.js 16 App Router Skill

Must know:

- Pages and layouts are Server Components by default.
- Interactivity requires a `"use client"` boundary.
- Browser APIs belong inside Client Component effects.
- Static export needs known dynamic params.
- Next 16 uses Turbopack by default.

### CSS Modules And Token Skill

Must know:

- Existing component styles live in `.module.css` files.
- Global tokens are in `app/globals.css`.
- Dark mode flows through body-level `data-dark`.
- Existing dashboard dimensions are JS-computed inline styles plus CSS classes.

### Scroll And Pointer Motion Skill

Must know:

- Use transforms and opacity.
- Use requestAnimationFrame for scroll and pointer updates.
- Avoid React state for per-frame pointer motion.
- Clamp and smooth small decorative movements.
- Respect `prefers-reduced-motion`.

### Avatar Compositing Skill

Must know:

- Work in the 750 x 750 source coordinate system.
- Convert source coordinates to percentages.
- Keep independent CSS variables for each eye.
- Use empty alt text for decorative eye layers.
- Calibrate visually after implementation.

### Accessibility Skill

Must know:

- Decorative motion cannot be required for comprehension.
- Reduced motion disables tracking.
- Coarse pointer users need a static equivalent.
- The avatar remains one accessible image, not multiple announced fragments.

### Performance Skill

Must know:

- Avoid repeated layout reads after writes.
- Keep global listeners inactive when the dashboard is not ready.
- Cancel animation frames on cleanup.
- Avoid adding dependencies.
- Keep large image and cursor effects from competing unnecessarily.

### Visual Craft Skill

Must know:

- This is a portfolio where craft is evidence.
- The effect must be subtle, intentional, and slightly playful.
- Avoid generic cursor gimmicks.
- Preserve the bento dashboard and cartographic paper direction.

## Recommended Agent Workflow For Avatar Eye Feature

1. Next 16 Static Export Architect confirms the browser API boundary.
2. Homepage Motion Systems Engineer identifies the exact `dashboardReady` state.
3. Avatar Asset Compositor creates the static layered avatar and calibrates placement.
4. Pointer Interaction Engineer adds tracking and smoothing.
5. Accessibility And Reduced Motion Reviewer verifies fallback behavior.
6. Visual QA Agent checks rendered states and tunes CSS variables.
7. Code Quality Reviewer runs lint, build, diff review, and documents pre-existing issues separately.

## Handoff Template

Each sub-agent should report:

```txt
Scope:
Files inspected:
Files changed:
Findings:
Risks:
Verification:
Follow-ups:
```

For this repo, always distinguish:

- New issues introduced by the avatar feature.
- Pre-existing issues already present in lint, audit, or content.

## Current Known Baseline Issues

These are pre-existing and should not block a scoped avatar feature unless touched:

- `npm run lint` fails with conditional hook errors in `ProjectDetailClient.js`.
- `npm audit` reports vulnerable Next/PostCSS packages.
- `agent-opportunities` references missing image `/img/s3tables/heroimg-1.JPEG`.
- Several links use `#`.
- `resume.pdf` is referenced but not present.
- Many images use raw `<img>` tags.

