# Architecture

## Boundaries

The repository has one deployable application and two reusable TypeScript packages. `ui` owns visual semantics and contains no profile data. `content` owns public facts and contains no Next.js routing. The web app combines them and owns SEO, feeds, JSON-LD, and deployment concerns.

The public CV deliberately remains LaTeX-first. Its HTML representation is a curated projection because parsing template-specific LaTeX into a durable web schema would create more fragile tooling than it removes. Reviewers update the typed projection and LaTeX source together.

## Component hierarchy

Dense semantic hierarchy, shallow runtime hierarchy: a page is conceptually built from many layers, but the DOM does not carry a wrapper per layer.

```text
foundation   tokens, type, layout utilities, motion        packages/ui/src/foundation
    ↓
primitives   action recipe, ButtonLink, Badge               packages/ui/src/primitives
heritage     Motif, parts, HeritageMark, ornaments          packages/ui/src/heritage
    ↓
patterns     Card, Record, Specimen, WorkingPage,           packages/ui/src/patterns
             PageHeader, SectionHeader, Timeline
    ↓
compositions EmblemPlate (Specimen + Motif)                 packages/ui/src/heritage/compositions
    ↓
domain       ProjectCard, PublicationRecord, WritingRecord, apps/web/src/components/domain
             MethodRecord, CirculationRecord
    ↓
routes       pages, metadata, feeds                         apps/web/src/app
```

Nothing points upward. `packages/ui/.oxlintrc.json` enforces the direction inside the UI package, with `import/no-cycle` behind it.

| Question | Where it belongs |
| --- | --- |
| A raw colour, type, spacing or motion rule? | `ui/foundation` |
| Only reusable visual styling? | A CSS utility, not a component |
| Reusable semantics or interaction? | `ui/primitives` |
| A reusable arrangement of primitives? | `ui/patterns` |
| Specific to the heritage visual language? | `ui/heritage` |
| Knows a Project, Publication or Writing schema? | `apps/web/src/components/domain` |
| A bespoke scientific figure? | `apps/web/src/components/figures/<name>/`, with a colocated CSS Module |
| Knows Next routing, metadata or external services? | `apps/web` (`site/`, `integrations/`, `app/`) |
| Unique to one route? | That route, until reuse appears |

Variants describe presentation (`aspect="wide"`), never domain (`variant="publication"`). Optional content arrives through composable parts (`CardFooter`, `RecordNote`), not flag props.

The UI package publishes explicit subpaths, `@marcusinthesky/ui/primitives`, `/patterns`, `/heritage` and `/globals.css`, so imports say which layer they use. Internal SVG parts are not exported.

Content names figures by id (`figureIds` in `packages/content`) because content cannot import React; `apps/web/src/components/figures/index.ts` maps each id to its component and its place on the site.

## Tool responsibilities

| Tool | Responsibility |
| --- | --- |
| devenv | Pinned system and language tools |
| just | Human-facing commands |
| Bun | JavaScript runtime and package manager |
| Turbo | TypeScript workspace task graph |
| prek | Repository-wide Git quality gates |
| Next.js | Static HTML application and metadata |
| Fumadocs MDX | Typed future local writing collections |
| Tectonic | Reproducible public CV PDF |

## Performance model

Remote services are publishing inputs, not page-load dependencies. All routes export as files, two self-hosted variable font families (Fraunces, Inter) are served from the export via `next/font` with no third-party font requests, content pages contain no authored client JavaScript, and optional heavy capabilities such as browser Python, TTS, search, and video platforms are deferred until real content requires them.

## Publishing topology

This repository is the only source for the portfolio, and GitHub serves it at `https://marcusinthesky.github.io/`. The `Quality` workflow runs every gate against the static export; on `main` only, its `deploy` job then publishes that same export with `actions/deploy-pages`. Pull requests never publish.

The site is served from the root of the user site, so it has no `basePath` and root-relative URLs are correct as written. The `marcusinthesky/marcusinthesky` repository holds only the GitHub profile README and its refresh automation; it links here and must not publish a site of its own. `audit:export` rejects a base path, a second or unchecked publisher, and a push to a Pages branch, and it resolves every exported link, asset, canonical URL, and feed entry against the root.
