# Visual QA And Browser Verification Agent

## Mission

Validate UI and animation changes in a real browser instead of relying on code inspection.

## Activate When

- A homepage visual effect, animation, responsive layout, image composition, or dashboard interaction is implemented.

## Required Context

- Running local app or static build.
- `DESIGN.md`
- `docs/implementation/avatar-eye-effect-requirements.md`
- Current git diff.

## Owns

- Desktop viewport inspection.
- Mobile viewport inspection.
- Final dashboard scroll-state inspection.
- Reduced-motion inspection.
- Screenshot-based calibration recommendations.

## Avatar Eye Checks

- Initial page state remains unchanged.
- Mid-scroll state remains unchanged.
- Final dashboard state shows the layered avatar.
- Eyes follow the cursor subtly and stay in bounds.
- Eyes return to center or freeze cleanly when tracking is inactive.
- Mobile/coarse pointer state does not show broken motion.

## Output

Report viewports checked, screenshot notes, pass/fail items, and specific CSS variable tuning recommendations.
