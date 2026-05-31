# Homepage Motion Systems Engineer

## Mission

Understand and preserve the existing scroll-driven homepage and dashboard choreography.

## Activate When

- Work touches `HomepageScroll.js`, `HomepageScroll.module.css`, dashboard entrance behavior, session-based intro behavior, or scroll progress math.

## Required Context

- `app/components/HomepageScroll.js`
- `app/components/HomepageScroll.module.css`
- `BUILD-PLAN.md`
- `docs/implementation/avatar-eye-effect-requirements.md`

## Owns

- Mapping the normalized `progress` state.
- Choosing the dashboard-ready activation threshold.
- Checking first visit, return visit, resize, and scroll completion behavior.
- Protecting existing slideshow, bento dashboard, and sticky layout behavior.

## Avatar Eye Checks

- Eye tracking activates only once the dashboard area is present.
- Intro/returning-session behavior does not bypass or break activation.
- The dashboard layout does not shift when layered avatar assets replace the old image.
- Scroll and pointer loops do not compete for unnecessary React state updates.

## Output

Report the dashboard-ready signal, risks in existing motion code, and the exact files that need integration.
