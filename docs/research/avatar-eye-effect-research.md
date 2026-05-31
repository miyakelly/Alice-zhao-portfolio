# Avatar Eye Effect Research

Generated: 2026-05-30

## Requirement Restatement

The new avatar effect should use the new image files:

- `public/img/aboutMe/alice_transparent.png`
- `public/img/aboutMe/alice_left_eye.png`
- `public/img/aboutMe/alice_right_eye.png`

The effect should happen only after the user scrolls down to the interactive dashboard area. At that point, the left and right eye layers should be placeable and should follow the cursor as it moves around the site.

## Current Integration Point

The right integration point is `app/components/HomepageScroll.js`.

Reasons:

- It owns the homepage scroll state.
- It already computes `progress` from 0 to 1.
- It owns the hero/avatar size, position, and dashboard end state.
- It determines when cards become interactive.
- It currently renders the old avatar image at line-level usage: `/img/aboutMe/AliceZhao-Avatar.PNG`.

Current state behavior:

- `progress < 0.75`: hero hover slideshow can run.
- `progress >= 1`: secondary cards become hoverable.
- `prefers-reduced-motion: reduce`: progress is forced to 1 and the static dashboard renders immediately.
- Returning sessions are scrolled to the dashboard using `sessionStorage` key `homepage-visited`.

Best activation point:

```js
const dashboardReady = progress >= 0.995;
```

Use `0.995` rather than strict `1` if the effect feels unreliable because scroll math and viewport rounding can land at `0.9999`.

## Asset Measurements

Measured from local files:

| Asset | Size |
|---|---:|
| `alice_transparent.png` | 750 x 750 |
| `alice_left_eye.png` | 27 x 25 |
| `alice_right_eye.png` | 28 x 30 |
| `AliceZhao-Avatar.PNG` | 750 x 750 |

The base and old avatar share the same 750 x 750 coordinate space, which makes percentage placement reliable.

Template matching the separate eye images against the old avatar gives these starting anchors:

| Eye asset | Source center x | Source center y | Percent x | Percent y |
|---|---:|---:|---:|---:|
| `alice_left_eye.png` | 253.5 | 448.5 | 33.80% | 59.80% |
| `alice_right_eye.png` | 410.0 | 480.0 | 54.67% | 64.00% |

Recommended initial CSS variables:

```css
.leftEye {
  --eye-x: 33.8%;
  --eye-y: 59.8%;
}

.rightEye {
  --eye-x: 54.67%;
  --eye-y: 64%;
}
```

These should be treated as calibrated defaults, not permanent magic numbers. Final adjustment should happen in browser at the dashboard end state.

## Size Implications

The current dashboard avatar end size is:

- Desktop: `heroEnd = 120px`
- Mobile: `heroEnd = 60px`

At 120px, the eye assets scale to roughly:

- Left eye: 4.3 x 4.0 CSS pixels
- Right eye: 4.5 x 4.8 CSS pixels

At 60px, they scale to roughly 2 CSS pixels. That means the effect is a desktop/fine-pointer detail. On mobile and coarse pointers, render centered static eyes or keep the current old avatar.

## Interaction Constraints

### Pointer Input

Use `pointermove` or `mousemove` on `window`. The site already uses `mousemove` in `CursorTrail.js`. A second listener is acceptable for this scoped feature, but a future shared pointer store would be cleaner.

Recommended behavior:

- Track only when `dashboardReady`.
- Track only on fine pointers: `window.matchMedia("(pointer: fine)").matches`.
- Stop tracking or freeze centered eyes when the dashboard is not ready.
- Use `requestAnimationFrame` to batch DOM writes.
- Write CSS variables to the avatar element rather than setting React state every frame.

### Reduced Motion

The site rules require `prefers-reduced-motion: reduce` to disable animation. Eye following is motion, so reduced motion should:

- Render the dashboard.
- Show the avatar with eyes centered, or show the old static avatar.
- Avoid requestAnimationFrame tracking loops.

### Cursor Trail

The global cursor trail:

- Hides the native cursor with `body { cursor: none; }`.
- Renders at `z-index: 9999`.
- Uses `mixBlendMode: difference`.

The eye-following effect should respond to pointer position, not the rendered trail position. It should not try to visually align to the trailing pixels.

### Stacking

The avatar layers should live inside `.heroAvatar`:

1. Base transparent avatar.
2. Left eye layer.
3. Right eye layer.

The parent should become `position: relative`. Eye layers should be `position: absolute` and `pointer-events: none`.

## Proposed Mental Model

Before dashboard:

- Preserve the current old avatar image or render the new base with static eyes.
- No eye tracking.
- Hero hover slideshow behavior remains unchanged.

At dashboard:

- Fade to the transparent base plus eye layers.
- Eye layers follow the cursor inside a very small travel radius.
- When pointer leaves the window, eyes ease or snap back to center.

## Motion Model

Recommended eye calculation:

1. Measure each eye center from the avatar bounding rect and CSS variables.
2. Compute vector from eye center to cursor.
3. Normalize the vector.
4. Limit travel to a small max radius.
5. Apply transform via CSS variables.

Suggested max travel:

- Desktop default: `maxTravel = clamp(1px, avatarSize * 0.025, 4px)`.
- Since the marks are tiny at 120px, start at 3px and adjust in browser.

Suggested smoothing:

- Interpolate current offset toward target with `0.18` to `0.25` per frame.
- Use no bounce or elastic easing.

## Implementation Shape

Candidate component:

```jsx
function AvatarEyes({ active, avatarSize }) {
  return (
    <div className={s.avatarFace}>
      <img className={s.avatarBase} src="/img/aboutMe/alice_transparent.png" alt="Alice Zhao" />
      <img className={`${s.avatarEye} ${s.leftEye}`} src="/img/aboutMe/alice_left_eye.png" alt="" />
      <img className={`${s.avatarEye} ${s.rightEye}`} src="/img/aboutMe/alice_right_eye.png" alt="" />
    </div>
  );
}
```

Candidate CSS:

```css
.heroAvatar {
  position: relative;
}

.avatarBase {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.avatarEye {
  position: absolute;
  left: var(--eye-x);
  top: var(--eye-y);
  width: var(--eye-w);
  height: auto;
  transform: translate(calc(-50% + var(--eye-dx, 0px)), calc(-50% + var(--eye-dy, 0px)));
  pointer-events: none;
  will-change: transform;
}
```

Use CSS variable widths based on source proportions:

- Left eye width: `3.6%` of avatar width, because 27 / 750 = 3.6%.
- Right eye width: `3.73%` of avatar width, because 28 / 750 = 3.73%.

## Browser QA Needs

Test these states:

- Desktop, first visit: avatar starts old/static, transitions to eye effect only at dashboard.
- Desktop, returning session: dashboard starts ready and the effect works immediately.
- Desktop, pointer idle: eyes rest centered.
- Desktop, pointer near corners: eyes clamp and do not leave glasses.
- Desktop, hero slideshow hover before dashboard: no conflict with the effect.
- Reduced motion: no eye tracking loop.
- Mobile or coarse pointer: no hover-only dependency.
- Dark mode: eye and avatar visibility still works with the paper texture overlay.

## Open Questions

1. Should the avatar visually swap from old avatar to new transparent-eye avatar only at dashboard, or should the new avatar render from the start with static eyes?
2. Should the eyes follow the cursor across the whole viewport, or only while the cursor is within the dashboard area?
3. Should mobile show a static centered-eye version, or keep the current old avatar because the eye layers are too small?
4. Should the cursor trail eventually share pointer position with the avatar eyes to avoid duplicate global listeners?

