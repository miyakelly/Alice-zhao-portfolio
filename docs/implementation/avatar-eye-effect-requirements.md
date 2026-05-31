# Avatar Eye Effect Requirements

Generated: 2026-05-30

## Goal

Add a dashboard-only avatar interaction on the homepage. Once the scroll animation reaches the interactive dashboard, Alice's avatar should use the new transparent base image and separately placeable left and right eye layers. The eyes follow the cursor with a subtle, bounded motion.

## Non-Goals

- Do not rebuild the homepage scroll system.
- Do not add a motion library.
- Do not change project detail page behavior.
- Do not make the effect depend on a server or runtime API.
- Do not make the effect required for mobile.

## Files To Change

Primary:

- `app/components/HomepageScroll.js`
- `app/components/HomepageScroll.module.css`

Optional if the code feels too large:

- `app/components/AvatarEyes.js`
- `app/components/AvatarEyes.module.css`

No config changes should be required.

## Assets

Use these image paths:

```txt
/img/aboutMe/alice_transparent.png
/img/aboutMe/alice_left_eye.png
/img/aboutMe/alice_right_eye.png
```

Fallback or pre-dashboard image:

```txt
/img/aboutMe/AliceZhao-Avatar.PNG
```

## Activation Rules

The effect starts only when the dashboard is assembled.

Use the existing `progress` value from `HomepageScroll`:

```js
const dashboardReady = progress >= 0.995;
```

The effect should be active only when all conditions are true:

```js
const canTrackEyes =
  dashboardReady &&
  hasFinePointer &&
  !prefersReducedMotion;
```

Recommended behavior by state:

| State | Avatar behavior |
|---|---|
| `progress < 0.995` | Current old static avatar, or new avatar with centered static eyes. No tracking. |
| `progress >= 0.995` | New transparent avatar plus left and right eye layers. Eyes track pointer. |
| Reduced motion | Static dashboard with centered eyes or old avatar. No tracking loop. |
| Coarse pointer | Static centered eyes or old avatar. No tracking loop. |
| Pointer leaves window | Eyes return to centered offsets. |

## Placement Controls

Eye placement must be controlled by CSS variables so Alice can tune the art direction without editing JavaScript.

Initial values:

```css
.leftEye {
  --eye-x: 33.8%;
  --eye-y: 59.8%;
  --eye-w: 3.6%;
}

.rightEye {
  --eye-x: 54.67%;
  --eye-y: 64%;
  --eye-w: 3.73%;
}
```

These values come from matching the new eye files against the old avatar in the shared 750 x 750 source coordinate space.

## Motion Requirements

The movement must be subtle and bounded:

- Use `transform`, not `left` or `top`, for eye movement.
- Use `requestAnimationFrame` to write CSS variables.
- Avoid React state updates on every pointer move.
- Clamp each eye to a max radius so it stays inside the glasses.
- Use simple ease-out smoothing, no bounce and no elastic motion.

Suggested starting values:

```js
const MAX_TRAVEL_DESKTOP = 3;
const EASE = 0.22;
```

Responsive max travel:

```js
const maxTravel = Math.min(4, Math.max(1, avatarRect.width * 0.025));
```

## Implementation Algorithm

1. Add an avatar layer structure inside `.heroAvatar`.
2. Make `.heroAvatar` `position: relative`.
3. Render the current old avatar before dashboard readiness.
4. Render the transparent base and eye layers at dashboard readiness.
5. Store a ref on the avatar root.
6. On `pointermove`, store latest pointer coordinates in a ref.
7. Start a requestAnimationFrame loop only when tracking is enabled.
8. In each frame:
   - Read avatar bounding rect.
   - Compute each eye's center from `--eye-x` and `--eye-y`.
   - Compute direction from eye center to pointer.
   - Clamp to `maxTravel`.
   - Smooth current offset toward target offset.
   - Write `--left-eye-dx`, `--left-eye-dy`, `--right-eye-dx`, `--right-eye-dy`.
9. On cleanup, cancel animation frame and remove pointer listeners.
10. Under reduced motion, skip the listener and loop.

## CSS Structure

Recommended CSS module additions:

```css
.heroAvatar {
  position: relative;
}

.avatarBase,
.avatarStatic {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.avatarEye {
  position: absolute;
  left: var(--eye-x);
  top: var(--eye-y);
  width: var(--eye-w);
  height: auto;
  pointer-events: none;
  transform: translate(calc(-50% + var(--eye-dx, 0px)), calc(-50% + var(--eye-dy, 0px)));
  will-change: transform;
}

.leftEye {
  --eye-x: 33.8%;
  --eye-y: 59.8%;
  --eye-w: 3.6%;
  --eye-dx: var(--left-eye-dx, 0px);
  --eye-dy: var(--left-eye-dy, 0px);
}

.rightEye {
  --eye-x: 54.67%;
  --eye-y: 64%;
  --eye-w: 3.73%;
  --eye-dx: var(--right-eye-dx, 0px);
  --eye-dy: var(--right-eye-dy, 0px);
}
```

## Hook Shape

If extracted, use a hook like:

```js
function useAvatarEyeTracking(avatarRef, enabled) {
  useEffect(() => {
    if (!enabled) return;
    // pointer listener plus requestAnimationFrame loop
  }, [avatarRef, enabled]);
}
```

Keep browser API access inside `useEffect`.

## Accessibility Requirements

- The base avatar image keeps `alt="Alice Zhao"`.
- Eye images use `alt=""` because they are decorative.
- The effect must not create focusable elements.
- The effect must not block links or pointer events.
- `prefers-reduced-motion: reduce` disables tracking.
- Touch users must not lose any core navigation or content.

## Performance Requirements

- No per-frame React state.
- No layout reads after DOM writes in the same frame, except initial calibration if unavoidable.
- No global listener when the dashboard is not ready.
- Cleanup must cancel animation frames.
- The effect should not increase homepage bundle dependencies.

## Acceptance Criteria

- The old dashboard still assembles exactly as before.
- The new effect is not visible as tracking motion before dashboard readiness.
- At dashboard readiness, the transparent avatar and eyes are visible.
- Eye positions are independently adjustable through CSS variables.
- Eye movement follows the cursor anywhere in the viewport on desktop/fine pointer.
- Eyes stay inside the glasses.
- The effect is static under reduced motion.
- `npm run build` passes.
- `npm run lint` has no new warnings or errors from the avatar work.
- Browser QA covers desktop, mobile, reduced motion, and returning-session dashboard state.

## Suggested Implementation Order

1. Create static layered avatar in the dashboard state.
2. Add CSS placement variables and calibrate the two eye positions.
3. Add the pointer tracking hook.
4. Gate tracking by `dashboardReady`, fine pointer, and reduced motion.
5. Test returning session behavior.
6. Run lint and build.
7. Tune movement radius in browser.

