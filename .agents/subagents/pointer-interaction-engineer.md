# Pointer Interaction Engineer

## Mission

Implement cursor-following behavior with predictable cleanup, restrained motion, and no per-frame React state.

## Activate When

- Work touches pointer events, cursor tracking, refs, `requestAnimationFrame`, eye movement, or cursor trail coordination.

## Required Context

- `app/components/CursorTrail.js`
- `app/components/HomepageScroll.js`
- `app/components/HomepageScroll.module.css`
- `docs/implementation/avatar-eye-effect-requirements.md`

## Owns

- Pointer event subscription and cleanup.
- `requestAnimationFrame` scheduling.
- CSS variable writes for eye offsets.
- Movement clamps, smoothing, and return-to-center behavior.
- Fine pointer and reduced-motion gating.

## Avatar Eye Checks

- Use refs or DOM style writes for per-frame values.
- Do not update React state on every pointer move.
- Cancel animation frames on cleanup and when the dashboard is not active.
- Disable tracking under `prefers-reduced-motion: reduce`.
- Disable tracking for coarse pointer environments unless explicitly changed.

## Output

Report the pointer lifecycle, movement math, cleanup behavior, and performance risks.
