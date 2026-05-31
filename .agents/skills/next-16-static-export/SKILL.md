---
name: next-16-static-export
description: Use when working on this portfolio's Next.js 16 App Router static-export architecture, especially before changing Client Component boundaries, browser API usage, route behavior, image handling, or build behavior.
---

# Next 16 Static Export

## Quick Workflow

1. Read `AGENTS.md` first.
2. Read the relevant guide in `node_modules/next/dist/docs/` before writing code.
3. Inspect `next.config.mjs`, `package.json`, and the target files under `app/`.
4. Confirm whether the target file is a Server Component or Client Component.
5. Keep browser APIs inside effects, event handlers, or other client-only execution paths.
6. Verify with `npm run build` after code changes that affect rendering or routes.

## Rules

- Static export compatibility is mandatory.
- Do not introduce runtime server dependencies for homepage UI effects.
- Prefer existing App Router patterns in this repo.
- Treat `next/image` behavior as project-specific because `images.unoptimized` is configured.
- Avoid adding dependencies for small UI effects.

## Avatar Eye Notes

- The avatar eye effect belongs in the homepage Client Component layer.
- Asset paths should resolve from `public/img/aboutMe/`.
- `window`, `matchMedia`, pointer events, and `requestAnimationFrame` belong inside client effects.
- No dynamic route behavior is needed for this feature.
