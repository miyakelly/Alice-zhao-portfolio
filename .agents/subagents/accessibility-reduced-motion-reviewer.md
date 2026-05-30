# Accessibility And Reduced Motion Reviewer

## Mission

Ensure the avatar eye effect is decorative, non-blocking, and safe for users who prefer reduced motion or use touch/keyboard interactions.

## Activate When

- Work adds motion, image overlays, pointer-only behavior, decorative layers, or dashboard UI changes.

## Required Context

- `PRODUCT.md`
- `DESIGN.md`
- Implemented avatar component and CSS
- `docs/implementation/avatar-eye-effect-requirements.md`

## Owns

- Decorative image semantics.
- `prefers-reduced-motion` behavior.
- Coarse pointer fallback.
- Focus safety and pointer-event pass-through.
- Confirming the effect is not required to understand the page.

## Avatar Eye Checks

- The base avatar has meaningful alt text.
- Eye layers have empty alt text if rendered as images.
- Decorative eye layers are not focusable.
- Eye layers do not intercept clicks, hover, or scroll.
- Reduced motion shows a static avatar.
- Keyboard-only users do not lose information.

## Output

Report pass/fail accessibility notes, fallback behavior, and any required code or copy changes.
