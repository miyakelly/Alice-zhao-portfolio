---
name: release-readiness-check
description: Use before handing off UI or animation changes in this repo, especially when running build, lint, audit, git diff review, asset path checks, or separating new issues from baseline issues.
---

# Release Readiness Check

## Quick Workflow

1. Review `git diff` for scope and accidental unrelated changes.
2. Run `npm run build` for rendering and static export confidence.
3. Run `npm run lint` and separate new findings from known baseline findings.
4. Run `npm audit` only when dependency risk is relevant to the handoff.
5. Check referenced public assets exist with exact filename casing.
6. Report commands, results, new issues, existing issues, and release blockers.

## Known Baseline Issues

- `npm run lint` has pre-existing conditional hook errors in `ProjectDetailClient.js`.
- `npm audit` reports vulnerable Next/PostCSS packages.
- Some image/link/content references are known to be incomplete.
- Many images use raw `<img>` tags.

## Avatar Eye Notes

- Do not add dependencies for this effect without approval.
- Public image names are case-sensitive in deployed environments.
- The final report should clearly say whether the avatar work introduced any new failures.
