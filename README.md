# Marcus Gawronsky — portfolio

Static personal portfolio, research profile, writing index, and public CV for
[`marcusinthesky.github.io`](https://marcusinthesky.github.io).

## Start

```bash
devenv shell
just setup
just dev
```

Run `just --list` for the full command surface. The blocking local gate is:

```bash
just check
```

## Structure

- `src/typescript/apps/web` — Next.js static site, metadata, feeds, and structured-data projections.
- `src/typescript/packages/ui` — owned components, theme tokens, prose styles, and Storybook.
- `src/typescript/packages/content` — validated public profile, publication, project, and writing data.
- `src/latex/cv` — canonical, sanitized public CV and reproducible PDF build.
- `assets/heritage` — original heritage artwork behind the `ui` heritage parts.

Visual rules live in [`DESIGN.md`](DESIGN.md); boundaries and the publishing path live in [`ARCHITECTURE.md`](ARCHITECTURE.md). Merges to `main` deploy through the `Quality` workflow once every gate passes.

No visitor analytics, cookies, remote fonts, runtime API, or third-party scripts are used.
