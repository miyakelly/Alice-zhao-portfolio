@AGENTS.md
@portfolio-rules.md
@design-brief.md

# Portfolio Implementation Rules

1. **No animation libraries.** CSS animations and transitions only. No Framer Motion, no GSAP. If we hit something CSS genuinely can't do, revisit on a case-by-case basis.

2. **`prefers-reduced-motion: reduce` kills all animation.** Site must be fully functional and visually complete as a static layout. Motion is progressive enhancement.

3. **Every hover state needs a touch equivalent defined in the same PR.** No hover-only interactions ship without a mobile plan.

4. **SVGs below the fold don't animate until viewport entry.** Use IntersectionObserver. No ambient animations running offscreen.

5. **90/10 craft rule.** 90% of the site is structured and restrained — clean grids, quiet typography, functional motion. 10% is ambitious and surprising — generative SVGs, scroll-driven reveals, interactions that demonstrate real technical skill. The restraint is what makes the bold moments land. Specific "wow" zones:
   - Homepage first load (hero animation)
   - Project card hover (signature interaction, not just a color swap)
   - "How I Design" section (interactive diagrams, scroll-driven storytelling)
   - One standout visual moment per case study

   Everything else (nav, footer, contact, about, body text, metadata) stays clean and utility-focused.

6. **Project detail first viewport: title + metadata + section nav all visible.** No full-bleed heroes that push content below the fold. The section nav appearing immediately is more valuable than a dramatic title reveal.

7. **Sticky horizontal section nav on project detail pages.** Shows all project phases as clickable labels (e.g., 01 Discovery / 02 Define / 03 Design / 04 Ship / 05 Outcome). Scroll-spy tracks active section. Click jumps with smooth scroll. Horizontally scrollable on mobile.

8. **Product visuals inside styled device frames, not raw images.** Use Next.js `<Image>` with automatic optimization, WebP, and lazy loading for all raster visuals.

9. **"How I Design" section is visual, not text-heavy.** This is a "wow" zone. Must use diagrams, motion, and interactive elements to demonstrate process — not paragraphs describing it. Also carries the design philosophy/point of view.

10. **Dead `href="#"` links are OK during development.** Flag all of them before any production deploy. A dead link seen by a hiring manager is worse than no link.

11. **All SVGs run through SVGO before commit.** Strip metadata, minimize paths. Inline SVGs for animation control.

12. **If a monospace accent font is added, use `font-display: swap`.** No invisible text during font load.
