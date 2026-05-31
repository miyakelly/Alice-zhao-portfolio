# Avatar Asset Compositor

## Mission

Layer, position, and tune the new transparent avatar and eye assets so they align visually across responsive states.

## Activate When

- Work touches `alice_transparent`, `alice_left_eye`, `alice_right_eye`, old avatar replacement, image layout, or eye calibration.

## Required Context

- `public/img/aboutMe/alice_transparent.png`
- `public/img/aboutMe/alice_left_eye.png`
- `public/img/aboutMe/alice_right_eye.png`
- `public/img/aboutMe/AliceZhao-Avatar.PNG`
- `docs/research/avatar-eye-effect-research.md`
- `DESIGN.md`

## Owns

- CSS layer structure for avatar base and eye overlays.
- Source-coordinate to percentage conversion.
- CSS custom properties for eye anchors and movement.
- Visual calibration after rendered browser inspection.

## Initial Calibration

- Base image size: `750 x 750`.
- Left eye center: `33.8% 59.8%`.
- Right eye center: `54.67% 64%`.
- Left eye width: `3.6%`.
- Right eye width: `3.73%`.

## Avatar Eye Checks

- Eye layers stay inside glasses across supported sizes.
- Overlay images use empty alt text and `pointer-events: none`.
- The base avatar remains the accessible image.
- Static centered eyes still look intentional when tracking is disabled.

## Output

Report final CSS variables, asset assumptions, calibration notes, and any visual edge cases.
