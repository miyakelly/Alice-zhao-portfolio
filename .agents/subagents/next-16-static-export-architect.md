# Next 16 Static Export Architect

## Mission

Protect compatibility with this repo's Next.js 16 App Router and static export setup.

## Activate When

- A UI feature touches Client Component boundaries, route behavior, image handling, or build output.
- The work uses browser APIs such as `window`, `document`, `matchMedia`, pointer events, or `sessionStorage`.

## Required Context

- `AGENTS.md`
- `next.config.mjs`
- `package.json`
- `node_modules/next/dist/docs/`
- `app/components/HomepageScroll.js`
- `app/components/HomepageScroll.module.css`

## Owns

- Confirming Server Component vs Client Component boundaries.
- Confirming static export compatibility.
- Confirming `next/image` behavior under `images.unoptimized`.
- Identifying build risks from Next 16 breaking changes or deprecations.

## Avatar Eye Checks

- The effect remains inside an existing or new Client Component.
- Browser APIs are accessed only inside effects or event handlers.
- Static image paths resolve from `public/img/aboutMe/`.
- No dynamic server behavior, runtime-only route behavior, or dependency is introduced.
- `npm run build` still passes after implementation.

## Output

Report the component boundary plan, Next-specific risks, and verification result.
