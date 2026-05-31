---
name: avatar-eye-compositing
description: Use when layering, calibrating, or tuning the Alice avatar transparent base image and separate left/right eye assets for cursor-following animation.
---

# Avatar Eye Compositing

## Quick Workflow

1. Use `alice_transparent.png` as the base image.
2. Layer `alice_left_eye.png` and `alice_right_eye.png` above the base with absolute positioning.
3. Work from the `750 x 750` source coordinate system.
4. Express eye anchors and sizes as percentages so the avatar can scale.
5. Store anchors, sizes, and movement offsets in CSS custom properties.
6. Calibrate in browser after implementation.

## Initial Values

- Left eye center: `33.8% 59.8%`.
- Right eye center: `54.67% 64%`.
- Left eye width: `3.6%`.
- Right eye width: `3.73%`.

## Rules

- Keep base and eye layers in one stable avatar wrapper.
- Eye overlays are decorative and should not intercept pointer events.
- Use centered positioning with `translate(-50%, -50%)` plus small movement offsets.
- Keep movement subtle enough to stay inside the glasses.
- Static centered eyes must look acceptable when motion is disabled.

## Verification

- Check desktop dashboard state.
- Check mobile/coarse pointer state.
- Check reduced-motion state.
- Tune CSS variables only after seeing rendered output.
