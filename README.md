# Walter Sophia — Clone

Pixel-perfect Next.js clone of the [Walter Sophia](https://waltersophia.com) marketing site ("No Fee Direct Sourcing"). Built with the [AI Website Cloner Template](https://github.com/JCodesMore/ai-website-cloner-template) using Claude Code.

## Tech Stack

- **Next.js 16** — App Router, React 19, TypeScript strict
- **Tailwind CSS v4** — oklch design tokens, custom `walter.css` for site-specific styles
- **shadcn/ui** — Radix primitives + `cn()` utility
- **Lenis** — smooth scrolling
- **Custom animated SVGs** — extracted from source, driven by scroll position

## Prerequisites

- Node.js 24+
- npm

## Quick Start

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Commands

```bash
npm run dev        # Dev server
npm run build      # Production build
npm run start      # Run production build
npm run lint       # ESLint
npm run typecheck  # TypeScript
npm run check      # lint + typecheck + build
```

### Docker

```bash
docker compose up app --build   # production
docker compose up dev --build   # dev on :3001
```

## Project Structure

```
src/
  app/
    page.tsx          # Single-page layout (hero → steps → footer)
    layout.tsx        # Root layout, fonts, metadata
    globals.css       # Tailwind v4 tokens
    walter.css        # Walter Sophia site styles
  components/
    Nav.tsx           # Top navigation
    AnimatedSvg.tsx   # Scroll-driven SVG renderer
    SmoothScroll.tsx  # Lenis wrapper
    svg/              # Extracted SVG assets as React components
    ui/               # shadcn primitives
public/
  images/             # Site imagery
  seo/                # Favicon, OG
docs/
  research/           # Inspection output: screenshots, SVGs, measurement scripts
  design-references/  # Visual references
scripts/              # Asset download + sync utilities
```

## How It Was Built

Generated via the `/clone-website` skill — a multi-phase pipeline:

1. **Recon** — screenshots across breakpoints (320/375/768/820/834/1024), design token extraction, scroll/hover sweep
2. **Foundation** — fonts, colors, globals, asset download
3. **Component specs** — `docs/research/` measurement scripts captured exact computed CSS, positions, scroll triggers
4. **Parallel build** — section-by-section reconstruction in git worktrees
5. **QA** — visual diff vs original, pixel polish (see recent commits)

Site instructions live in [`AGENTS.md`](AGENTS.md) / [`CLAUDE.md`](CLAUDE.md).

## Updating Agent Rules

```bash
bash scripts/sync-agent-rules.sh   # after editing AGENTS.md
node scripts/sync-skills.mjs       # after editing .claude/skills/clone-website/SKILL.md
```

## Notes

- This is a reverse-engineered clone for learning / migration purposes. Brand, logos, and copy belong to Walter Sophia. Do not deploy as a live impersonation.
- `src/app/walter.css` carries site-specific layout; do not mix with Tailwind utilities unless porting incrementally.
- Read `node_modules/next/dist/docs/` before changing routing — Next.js 16 has breaking changes vs prior versions.

## License

MIT (template). Original Walter Sophia content/branding © its owners.
