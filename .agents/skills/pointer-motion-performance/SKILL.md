---
name: pointer-motion-performance
description: Use when implementing pointer-driven UI motion, cursor-following effects, requestAnimationFrame loops, DOM refs, CSS variable writes, or cleanup-sensitive animation code.
---

# Pointer Motion Performance

## Quick Workflow

1. Gate the feature before subscribing to global pointer events.
2. Store pointer and animation values in refs or local variables.
3. Use `requestAnimationFrame` to batch DOM writes.
4. Write transforms or CSS custom properties instead of setting React state per frame.
5. Clamp and smooth movement.
6. Remove listeners and cancel frames on cleanup.

## Rules

- Do not run pointer loops while the feature is inactive.
- Do not update React state on every pointer move.
- Avoid repeated layout reads after style writes.
- Prefer `pointermove` when pointer type matters.
- Return decorative motion to a neutral state when tracking stops.

## Avatar Eye Notes

- Track only after the dashboard is ready.
- Disable for `prefers-reduced-motion: reduce`.
- Disable for coarse pointers unless the requirement changes.
- Keep eye offsets small and independent for left and right layers.
