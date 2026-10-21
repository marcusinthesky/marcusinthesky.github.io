# Public CV

This directory is the canonical source for the deliberately public CV. It was reconstructed from the supplied private archive; the archive and its rendered PDFs must never be added to this repository.

The source intentionally excludes direct contact details and professional references. Update the typed website projection in `packages/content` in the same change.

Build from the repository root with `just cv-build`; validate privacy and typography with `just cv-check`.

The PDF must remain two A4 pages. Run `just cv-links` to check its embedded
link destinations using the repository `lychee.toml`. LinkedIn blocks automated
checks and is excluded; review its profile destination manually. HTTP success
alone does not establish that a paper link points to the intended title and authors.
