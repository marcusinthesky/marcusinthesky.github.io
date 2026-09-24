# UI

Owned, server-compatible components and the replaceable visual-language layer. The package is configured for shadcn on Base UI, but installs no headless behaviour dependency because every component is presentational or CSS-only.

## Layers

| Folder                      | Holds                                                                                                                                            | Import from                      |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------- |
| `src/foundation`            | Theme tokens (`theme.css`), type scale and `label-*`/`caption` utilities (`typography.css`), `page-shell`/`reading-shell` (`layout.css`), motion | `@marcusinthesky/ui/globals.css` |
| `src/primitives`            | `actionClass` recipe, `ButtonLink`, `Badge`                                                                                                      | `@marcusinthesky/ui/primitives`  |
| `src/heritage`              | `Motif`, parts, `HeritageMark`, ornaments, institutional devices                                                                                 | `@marcusinthesky/ui/heritage`    |
| `src/patterns`              | `Card` anatomy, `Record`, `Specimen`, `WorkingPage`, `PageHeader`, `SectionHeader`, `Timeline`                                                   | `@marcusinthesky/ui/patterns`    |
| `src/heritage/compositions` | `EmblemPlate`: a motif mounted as a specimen                                                                                                     | `@marcusinthesky/ui/heritage`    |

Dependencies point down the table; `.oxlintrc.json` rejects upward imports. See `ARCHITECTURE.md` for the full hierarchy.

The design language is isolated in `src/foundation/theme.css`, which uses the standard shadcn/ui variable names. To change the look, replace that file with any theme exported from [tweakcn](https://tweakcn.com) or [shadcn/ui themes](https://ui.shadcn.com/themes). Components only reference semantic tokens (`bg-card`, `text-primary`, `border-border`, …). Prose rhythm is isolated in `typography.css`.

## Stories

Each public component has its own story file beside it; the Storybook tree mirrors the folders. Stories are the component's contract, covering its states, long content and keyboard focus, and `bun run test` runs them in Chromium with axe set to fail on any violation.
