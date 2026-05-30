---
name: accessibility-reduced-motion
description: Use when reviewing or implementing decorative motion, reduced-motion fallbacks, pointer-only interactions, image overlay semantics, or keyboard/touch accessibility for this portfolio.
---

# Accessibility And Reduced Motion

## Quick Workflow

1. Decide whether the feature is content, control, or decoration.
2. For decoration, make it non-focusable and non-blocking.
3. Add or preserve meaningful alt text only on the semantic image.
4. Respect `prefers-reduced-motion: reduce`.
5. Provide a static fallback for coarse pointer and keyboard-only users.
6. Verify that the page communicates the same information without motion.

## Rules

- Decorative layers should not be announced by assistive tech.
- Decorative layers should not intercept pointer events.
- Motion cannot be required to understand the interface.
- Reduced-motion users should not receive cursor-following animation.
- Touch users should not see broken or jittery pointer states.

## Avatar Eye Notes

- The base avatar remains the accessible image.
- Left and right eye layers use empty alt text if rendered as images.
- Eye layers should use `pointer-events: none`.
- Static eyes are the fallback state.
